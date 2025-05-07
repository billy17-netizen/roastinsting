'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import Image from 'next/image'; // Image component might not be strictly Neubrutalist, using <img> for simplicity

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

const NEUBRUTALIST_ACCENT_COLOR = 'bg-yellow-400';
const NEUBRUTALIST_ACCENT_TEXT_COLOR = 'text-black';
const NEUBRUTALIST_BORDER_COLOR = 'border-black';
const NEUBRUTALIST_BACKGROUND_COLOR = 'bg-[#F5F5F5]'; // Off-white
const NEUBRUTALIST_CARD_BACKGROUND = 'bg-white';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Mohon masukkan username Instagram');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Navigate to results page with username as query parameter
      router.push(`/results?username=${encodeURIComponent(username.trim())}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setLoading(false);
    }
  };

  const neubrutalistBoxShadow = '4px 4px 0px #000';

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
        `}</style>
      </div>

      {/* Large bold geometric shapes in background */}
      <div className="fixed left-[-10%] top-[-10%] w-[40%] h-[40%] bg-[#75F4F4] opacity-40 rounded-full z-0"></div>
      <div className="fixed right-[-5%] bottom-[-15%] w-[35%] h-[50%] bg-[#FF5757] opacity-30 rounded-full z-0"></div>
      <div className="fixed right-[15%] top-[20%] w-[10%] h-[30%] bg-[#9747FF] opacity-30 z-0 transform rotate-45"></div>
      
      {/* Neo Brutalist pixel-style decorative elements */}
      <div className="absolute top-[5%] left-[20%] w-8 h-8 bg-black z-0"></div>
      <div className="absolute bottom-[10%] left-[15%] w-16 h-4 bg-black z-0"></div>
      <div className="absolute top-[30%] right-[10%] w-4 h-16 bg-black z-0"></div>
      <div className="absolute bottom-[25%] right-[25%] w-8 h-8 bg-black z-0"></div>
      
      {/* Original decorative elements */}
      <div className="absolute top-[10%] left-[5%] w-20 h-20 bg-[#FF5757] border-4 border-black rotate-12 z-0" 
        style={{ boxShadow: '5px 5px 0px #000' }}></div>
      <div className="absolute bottom-[15%] right-[10%] w-16 h-16 bg-[#75F4F4] border-4 border-black -rotate-6 z-0"
        style={{ boxShadow: '5px 5px 0px #000' }}></div>
      <div className="absolute top-[30%] right-[15%] w-10 h-24 bg-[#9747FF] border-4 border-black rotate-45 z-0"
        style={{ boxShadow: '5px 5px 0px #000' }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-16">
          {/* Add random digital "glitches" as small animated decorative elements */}
          <style jsx global>{`
            @keyframes glitch {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 2px); }
              40% { transform: translate(-2px, -2px); }
              60% { transform: translate(2px, 2px); }
              80% { transform: translate(2px, -2px); }
              100% { transform: translate(0); }
            }
            @keyframes flicker {
              0% { opacity: 1; }
              50% { opacity: 0.8; }
              100% { opacity: 1; }
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
            
            /* New animations */
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .float-animation {
              animation: float 6s ease-in-out infinite;
            }
            
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .pulse-animation {
              animation: pulse 3s ease-in-out infinite;
            }
            
            @keyframes shake {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(1deg); }
              75% { transform: rotate(-1deg); }
            }
            .shake-animation {
              animation: shake 3s ease-in-out infinite;
            }
            
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
            .bounce-animation {
              animation: bounce 1.5s ease-in-out infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .spin-animation {
              animation: spin 12s linear infinite;
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .fade-in-up {
              animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes borderFlash {
              0%, 100% { border-color: black; }
              50% { border-color: #FF5757; }
            }
            .border-flash {
              animation: borderFlash 2s infinite;
            }
          `}</style>

          <div className="inline-block bg-white border-4 border-black p-4 md:p-6 transform rotate-0 relative mb-2 neo-glitch float-animation"
               data-text="RoastInsting"
               style={{ boxShadow: '8px 8px 0px #000' }}>
            <div className="neo-scanner-line"></div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-0 relative" 
                style={{ 
                  textShadow: '4px 4px 0px #FF5757', 
                  transform: 'translate(-4px, -4px)'
                }}>
              RoastInsting
            </h1>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#75F4F4] border-2 border-black"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#FF5757] border-2 border-black"></div>
          </div>
          <p className="text-xl font-bold bg-black text-white py-2 px-4 inline-block transform rotate-0 shake-animation"
             style={{ boxShadow: '4px 4px 0px #9747FF' }}>
            ROAST BRUTAL DIDUKUNG OLEH AI
          </p>
        </header>

        <div className="bg-white border-4 border-black p-6 mb-12 transform rotate-0 fade-in-up" 
             style={{ boxShadow: '8px 8px 0px #000' }}>
          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="username" className="block text-lg font-bold mb-2 uppercase">Username Instagram:</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow transform translate-x-2 translate-y-2">
                <input
                  id="username"
                  type="text"
                  placeholder="Masukkan @username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-3 md:px-4 md:py-4 border-4 border-black text-lg md:text-xl bg-[#F3F3F3] focus:outline-none focus:bg-white focus:border-[#9747FF] placeholder-gray-500 transform -translate-x-2 -translate-y-2 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-4 md:px-6 py-3 md:py-4 bg-[#FF5757] border-4 border-black font-black text-lg md:text-xl uppercase hover:bg-black hover:text-[#FF5757] transition-all focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed pulse-animation"
                style={{ boxShadow: '6px 6px 0px #000', animationPlayState: loading ? 'paused' : 'running' }}
              >
                {loading ? 'Memuat...' : 'Roast'}
              </button>
            </div>
          </form>

          {error && (
            <div className="bg-[#FF5757] text-white p-4 border-4 border-black mb-6 font-bold transform rotate-0" 
                 style={{ boxShadow: '6px 6px 0px #000' }}>
              <span className="inline-block border-b-4 border-white">ERROR:</span> {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-16 relative">
              <div className="custom-loader"></div>
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
              `}</style>
              <p className="text-xl font-bold mt-8 uppercase tracking-wider">Mengalihkan ke hasil...</p>
            </div>
          )}
        </div>

        {/* How to Use Section */}
        <div className="mb-12">
          <div className="bg-white border-4 border-black p-6 transform rotate-0 relative fade-in-up"
               style={{ boxShadow: '8px 8px 0px #000', animationDelay: '0.2s' }}>
            
            <h2 className="text-3xl font-black mb-6 inline-block transform rotate-0 relative"
                style={{ textShadow: '2px 2px 0px #9747FF' }}>
              <span className="bg-black text-white py-1 px-4">CARA PENGGUNAAN</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF5757]"></div>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#FFDE59] border-4 border-black flex items-center justify-center bounce-animation">
                  <span className="font-black text-xl">1</span>
                </div>
                <div className="border-4 border-black p-3 pl-8 md:p-4 md:pl-10">
                  <p className="font-bold text-base md:text-lg">Masukkan username Instagram di form di atas</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#FF5757] border-4 border-black flex items-center justify-center bounce-animation" style={{ animationDelay: '0.2s' }}>
                  <span className="font-black text-xl">2</span>
                </div>
                <div className="border-4 border-black p-3 pl-8 md:p-4 md:pl-10">
                  <p className="font-bold text-base md:text-lg">Klik tombol "Dapatkan Roast" untuk memulai proses</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#75F4F4] border-4 border-black flex items-center justify-center bounce-animation" style={{ animationDelay: '0.4s' }}>
                  <span className="font-black text-xl">3</span>
                </div>
                <div className="border-4 border-black p-3 pl-8 md:p-4 md:pl-10">
                  <p className="font-bold text-base md:text-lg">Anda akan dibawa ke halaman hasil di mana AI akan mengambil profil</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#9747FF] border-4 border-black flex items-center justify-center bounce-animation" style={{ animationDelay: '0.6s' }}>
                  <span className="font-black text-xl">4</span>
                </div>
                <div className="border-4 border-black p-3 pl-8 md:p-4 md:pl-10">
                  <p className="font-bold text-base md:text-lg">Lihat roast brutal yang dihasilkan AI dari profil tersebut</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <div className="bg-black text-white py-2 px-4 transform rotate-0 max-w-lg text-center shake-animation">
                <p className="font-bold">PERINGATAN: Roast dihasilkan oleh AI dan dimaksudkan untuk hiburan saja. Hasil mungkin bervariasi dalam kualitas dan akurasi.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 relative z-10">
          <div className="bg-white border-4 border-black p-3 md:p-4 w-full fade-in-up"
               style={{ boxShadow: '6px 6px 0px #000', animationDelay: '0.4s' }}>
            
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
                   className="flex items-center justify-center bg-[#FF5757] text-black p-2 md:p-3 border-2 border-black hover:bg-[#ff7a7a] transition-colors pulse-animation"
                   style={{ boxShadow: '3px 3px 0px #000', animationDelay: '0.1s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="bevel">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                
                {/* Instagram Icon and Link */}
                <a href="https://instagram.com/billy__ll" 
          target="_blank"
          rel="noopener noreferrer"
                   className="flex items-center justify-center bg-[#75F4F4] text-black p-2 md:p-3 border-2 border-black hover:bg-[#a7f8f8] transition-colors pulse-animation"
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
