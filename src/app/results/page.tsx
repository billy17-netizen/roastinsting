'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface InstagramPost {
  caption?: string;
  imageUrl?: string;
  text?: string;
  [key: string]: any;
}

interface InstagramData {
  username: string;
  fullName: string;
  biography: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  profilePictureUrl: string;
  latestPosts: InstagramPost[];
  isVerified: boolean;
}

export default function ResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(1);
  const [error, setError] = useState('');
  const [instagramData, setInstagramData] = useState<InstagramData | null>(null);
  const [roast, setRoast] = useState('');

  // Function to get caption text from post (different scraper actors use different fields)
  const getPostCaption = (post: InstagramPost): string => {
    return post.caption || post.text || 'No caption';
  };

  // Function to proxy Instagram image URLs through our own API to avoid CORS issues
  const getProxiedImageUrl = (originalUrl: string) => {
    if (!originalUrl) return '';
    // URL encode the Instagram image URL and pass it to our proxy
    return `/api/proxy?url=${encodeURIComponent(originalUrl)}`;
  };

  useEffect(() => {
    if (!username) {
      router.push('/');
      return;
    }

    const fetchRoast = async () => {
      setLoading(true);
      setLoadingStep(1);
      setError('');
      
      try {
        // Step 1: Fetching Instagram profile data
        setLoadingStep(1);
        
        const response = await fetch('/api/roast', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: username.trim() }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'An error occurred');
        }

        // Step 2: Processing profile data
        setLoadingStep(2);
        
        setInstagramData(data.instagramData);
        
        // Step 3: Generating the roast
        setLoadingStep(3);
        
        setRoast(data.roast);
        
        // Step 4: Preparing results
        setLoadingStep(4);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRoast();
  }, [username, router]);
  
  const getLoadingStepMessage = () => {
    switch(loadingStep) {
      case 1: 
        return "Mengambil data profil Instagram...";
      case 2: 
        return "Memproses informasi profil...";
      case 3: 
        return "Membuat roast yang brutal...";
      case 4: 
        return "Menyiapkan hasil...";
      default: 
        return "Memuat...";
    }
  };

  // Format large numbers to be more readable
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'Jt';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'Rb';
    }
    return num.toString();
  };

  return (
    <main className="min-h-screen bg-[#FFDE59] text-black p-3 md:p-8 font-mono relative overflow-hidden">
      {/* Modern Neo-Brutalist Background */}
      <div className="fixed inset-0 z-0 neo-grid-bg">
        <style jsx>{`
          .neo-grid-bg {
            background-size: 40px 40px;
            background-image: 
              linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
            background-position: top left;
            overflow: hidden;
            animation: gridMove 20s linear infinite;
          }
          .neo-grid-bg::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8), transparent 30%);
            z-index: 0;
          }
          
          @keyframes gridMove {
            from { background-position: 0 0; }
            to { background-position: 40px 40px; }
          }
        `}</style>
      </div>

      {/* Large bold geometric shapes in background */}
      <div className="fixed left-[-10%] top-[-10%] w-[40%] h-[40%] bg-[#75F4F4] opacity-40 rounded-full z-0 animate-float"></div>
      <div className="fixed right-[-5%] bottom-[-15%] w-[35%] h-[50%] bg-[#FF5757] opacity-30 rounded-full z-0 animate-float-reverse"></div>
      <div className="fixed right-[15%] top-[20%] w-[10%] h-[30%] bg-[#9747FF] opacity-30 z-0 transform rotate-45 animate-spin-slow"></div>
      
      {/* Neo Brutalist pixel-style decorative elements */}
      <div className="absolute top-[5%] left-[20%] w-8 h-8 bg-black z-0 animate-bounce-slow"></div>
      <div className="absolute bottom-[10%] left-[15%] w-16 h-4 bg-black z-0 animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-[30%] right-[10%] w-4 h-16 bg-black z-0 animate-bounce-slow" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-[25%] right-[25%] w-8 h-8 bg-black z-0 animate-bounce-slow" style={{ animationDelay: '0.3s' }}></div>
      
      {/* Random decorative elements for visual interest */}
      <div className="absolute top-[15%] right-[25%] w-12 h-12 border-4 border-black bg-[#FF5757] z-0 transform rotate-12 animate-float"></div>
      <div className="absolute bottom-[35%] left-[30%] w-10 h-16 border-4 border-black bg-[#75F4F4] z-0 transform -rotate-6 animate-float-reverse"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block bg-white border-4 border-black p-4 md:p-6 transform -rotate-1 relative mb-4 neo-glitch animate-float"
               data-text="RoastInsting"
               style={{ boxShadow: '8px 8px 0px #000' }}>
            <style jsx global>{`
              @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
              }
              .neo-glitch {
                position: relative;
                overflow: hidden;
              }
              .neo-glitch::before {
                content: attr(data-text);
                position: absolute;
                left: 2px;
                text-shadow: -1px 0 red;
                overflow: hidden;
                clip: rect(0, 900px, 0, 0);
                animation: glitch 2s infinite linear alternate-reverse;
              }
              .neo-glitch::after {
                content: attr(data-text);
                position: absolute;
                left: -2px;
                text-shadow: 1px 0 blue;
                overflow: hidden;
                clip: rect(0, 900px, 0, 0);
                animation: glitch 3s infinite linear alternate-reverse;
              }
              
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }
              
              @keyframes float-reverse {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px); }
              }
              .animate-float-reverse {
                animation: float-reverse 7s ease-in-out infinite;
              }
              
              @keyframes bounce-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
              }
              .animate-bounce-slow {
                animation: bounce-slow 4s ease-in-out infinite;
              }
              
              @keyframes spin-slow {
                0% { transform: rotate(45deg); }
                100% { transform: rotate(405deg); }
              }
              .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
              }
              
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              .animate-fade-in {
                animation: fadeIn 0.8s ease-out forwards;
              }
              
              @keyframes slideIn {
                from { transform: translateX(-30px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .animate-slide-in {
                animation: slideIn 0.8s ease-out forwards;
              }
              
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
              .animate-pulse-slow {
                animation: pulse 3s ease-in-out infinite;
              }
              
              @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(0.5deg); }
                75% { transform: rotate(-0.5deg); }
              }
              .animate-shake {
                animation: shake 3s ease-in-out infinite;
              }
              
              .neo-scanner-line {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background-color: rgba(255, 255, 255, 0.5);
                z-index: 5;
                animation: scanner 4s infinite linear;
              }
              @keyframes scanner {
                0% { top: 0; }
                100% { top: 100%; }
              }
            `}</style>
            <div className="neo-scanner-line"></div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-0 relative" 
                style={{ 
                  textShadow: '4px 4px 0px #FF5757', 
                  transform: 'translate(-4px, -4px)'
                }}>
              Hasil
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#75F4F4] border-2 border-black animate-pulse-slow"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#FF5757] border-2 border-black animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/" 
              className={`inline-block mt-2 py-2 px-6 border-4 border-black font-bold transition-colors animate-shake ${
                loading 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70' 
                  : 'bg-black text-white hover:bg-[#FF5757] hover:text-black'
              }`}
              style={{ boxShadow: loading ? 'none' : '4px 4px 0px #000' }}
              onClick={(e) => loading && e.preventDefault()}
            >
              ← Kembali ke Beranda
            </Link>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 left-0 w-10 h-10 bg-[#FF5757] border-4 border-black transform rotate-12 hidden md:block"></div>
          <div className="absolute top-12 right-4 w-6 h-16 bg-[#75F4F4] border-4 border-black transform -rotate-6 hidden md:block"></div>
        </header>

        {error && (
          <div className="bg-[#FF5757] text-white p-4 border-4 border-black mb-8 font-bold transform rotate-1" 
               style={{ boxShadow: '6px 6px 0px #000' }}>
            <span className="inline-block border-b-4 border-white">ERROR:</span> {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12 relative">
            <div className="bg-white border-4 border-black p-6 relative mb-8"
                 style={{ boxShadow: '8px 8px 0px #000' }}>
              <div className="flex justify-center mb-6">
                <div className="custom-loader"></div>
              </div>
              <style jsx>{`
                .custom-loader {
                  width: 60px;
                  height: 60px;
                  margin: 0 auto;
                  background: 
                    linear-gradient(#000 0 0) center/100% 8px,
                    linear-gradient(#000 0 0) center/8px 100%;
                  background-repeat: no-repeat;
                  position: relative;
                  animation: rotateBlade 1s linear infinite;
                }
                
                .custom-loader::before {
                  content: "";
                  position: absolute;
                  inset: 0;
                  margin: auto;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #FF5757;
                  border: 4px solid #000;
                }
                
                @keyframes rotateBlade {
                  to { transform: rotate(90deg); }
                }
                
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.02); }
                }
              `}</style>
              
              <p className="text-xl font-bold uppercase tracking-wider mb-8">
                {getLoadingStepMessage()}
              </p>
              
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`h-3 border-2 border-black ${step <= loadingStep ? 'bg-[#FF5757]' : 'bg-gray-200'}`}
                       style={{ 
                         transition: 'all 0.3s ease'
                       }}></div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
                <div className={loadingStep >= 1 ? "font-bold" : ""}>Langkah 1</div>
                <div className={loadingStep >= 2 ? "font-bold" : ""}>Langkah 2</div>
                <div className={loadingStep >= 3 ? "font-bold" : ""}>Langkah 3</div>
                <div className={loadingStep >= 4 ? "font-bold" : ""}>Langkah 4</div>
              </div>
              
              <div className="mt-6 text-sm border-t-2 border-dashed border-black pt-4">
                <p>Mengambil data untuk <span className="font-bold">@{username}</span>...</p>
                <p>Ini mungkin membutuhkan waktu, harap tunggu sementara kami bekerja dengan sihir AI!</p>
              </div>
            </div>
          </div>
        )}

        {instagramData && !loading && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-12 gap-6 animate-none">
            <div className="md:col-span-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white border-4 border-black p-6 h-full relative" 
                   style={{ boxShadow: '8px 8px 0px #000' }}>
                {/* Header with user icon */}
                <div className="flex items-center mb-4 border-b-2 border-black pb-2">
                  <div className="w-7 h-7 flex items-center justify-center bg-[#FF5757] rounded-full border-2 border-black">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="ml-2 font-bold">Profil @{instagramData.username}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  {/* Profile Picture */}
                  <div className="relative mb-4 w-40 h-40 mx-auto animate-float">
                    <div className="w-full h-full border-4 border-black bg-gray-200 overflow-hidden">
                      {instagramData.profilePictureUrl ? (
                        <img 
                          src={getProxiedImageUrl(instagramData.profilePictureUrl)} 
                          alt={instagramData.username}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://via.placeholder.com/128?text=X";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#75F4F4]">
                          <span className="text-black text-5xl font-black">
                            {instagramData.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Corner decorations */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#75F4F4] border-2 border-black"></div>
                  </div>
                  
                  {/* Username and Fullname */}
                  <div className="text-center mb-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
                    <h2 className="text-2xl font-black mb-1">@{instagramData.username}</h2>
                    {instagramData.fullName && (
                      <p className="text-gray-600">{instagramData.fullName}</p>
                    )}
                  </div>
                  
                  {/* Biography */}
                  {instagramData.biography && (
                    <div className="w-full mb-6 bg-[#000000] text-white p-4 border-2 border-black animate-slide-in" style={{ animationDelay: '0.4s' }}>
                      <p className="text-sm leading-snug break-words">"{instagramData.biography}"</p>
                    </div>
                  )}
                  
                  {/* Stats */}
                  <div className="w-full grid grid-cols-3 gap-2 animate-slide-in" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-[#000000] text-white border-2 border-black p-3 flex flex-col items-center justify-center hover:opacity-90 transition-opacity animate-pulse-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="font-bold text-lg md:text-xl text-white">{formatNumber(instagramData.postsCount)}</div>
                      <div className="text-xs uppercase font-medium text-gray-200">Postingan</div>
                    </div>
                    <div className="bg-[#000000] text-white border-2 border-black p-3 flex flex-col items-center justify-center hover:opacity-90 transition-opacity animate-pulse-slow" style={{ animationDelay: '0.2s' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="font-bold text-lg md:text-xl text-white">{formatNumber(instagramData.followersCount)}</div>
                      <div className="text-xs uppercase font-medium text-gray-200">Pengikut</div>
                    </div>
                    <div className="bg-[#000000] text-white border-2 border-black p-3 flex flex-col items-center justify-center hover:opacity-90 transition-opacity animate-pulse-slow" style={{ animationDelay: '0.4s' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <div className="font-bold text-lg md:text-xl text-white">{formatNumber(instagramData.followingCount)}</div>
                      <div className="text-xs uppercase font-medium text-gray-200">Mengikuti</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white border-4 border-black p-0 h-full transform rotate-0 relative" 
                   style={{ boxShadow: '8px 8px 0px #000' }}>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-[#FF5757] border-2 border-black rotate-0 animate-pulse-slow"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#75F4F4] border-2 border-black rotate-0 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                
                <div className="bg-[#9747FF] border-b-4 border-black p-4 relative">
                  <h3 className="text-3xl font-black text-white text-center tracking-widest">
                    ROAST BRUTAL
                  </h3>
                  {/* Flame icons for extra flair */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF5757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#FF5757]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                  </div>
                </div>
                
                <div className="p-6 relative noise-bg min-h-[300px]">
                  {/* Add noise texture with CSS instead of image */}
                  <style jsx>{`
                    .noise-bg {
                      background-color: white;
                      position: relative;
                    }
                    .noise-bg::before {
                      content: "";
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      opacity: 0.05;
                      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                      z-index: 0;
                    }
                  `}</style>
                  
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4 border-black"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-t-4 border-r-4 border-black"></div>
                  
                  <div className="space-y-4 text-lg leading-relaxed font-medium relative z-10" 
                       style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>
                    {roast.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                      <p key={i} className={i % 2 === 0 ? "transform rotate-0 bg-[#FFFF0010] p-2 animate-slide-in" : "transform rotate-0 bg-[#FF57570A] p-2 animate-slide-in"} style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 relative z-10">
          <div className="bg-white border-4 border-black p-3 md:p-4 w-full animate-fade-in"
               style={{ boxShadow: '6px 6px 0px #000', animationDelay: '0.6s' }}>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="bg-black text-white py-2 px-3 md:px-4 relative mb-4 sm:mb-0 w-full sm:w-auto text-center sm:text-left">
                <span className="font-bold text-sm md:text-base">Dibuat oleh Billstein M. Lelatobur</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#9747FF] border-1 border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#FF5757] border-1 border-white"></div>
              </div>
              
              <div className="flex items-center gap-3 md:gap-4">
                {/* GitHub Icon and Link */}
                <a href="https://github.com/billy17-netizen/roastinsting" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center bg-[#FF5757] text-black p-2 md:p-3 border-2 border-black hover:bg-[#ff7a7a] transition-colors animate-pulse-slow"
                   style={{ boxShadow: '3px 3px 0px #000', animationDelay: '0.1s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                
                {/* Instagram Icon and Link */}
                <a href="https://instagram.com/billy__ll" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center bg-[#75F4F4] text-black p-2 md:p-3 border-2 border-black hover:bg-[#a7f8f8] transition-colors animate-pulse-slow"
                   style={{ boxShadow: '3px 3px 0px #000', animationDelay: '0.3s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <p className="text-xs md:text-sm text-center sm:text-right mt-3 md:mt-4">
              API keys untuk Apify & Gemini diperlukan. Tidak ada data yang disimpan.
            </p>
          </div>
      </footer>
      </div>
    </main>
  );
} 