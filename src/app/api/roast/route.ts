import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Apify client with improved configuration
const apifyClient = new ApifyClient({
  token: process.env.APIFY_API_TOKEN || '',
  maxRetries: 8,
  minDelayBetweenRetriesMillis: 500,
  timeoutSecs: 120 // 2 minutes timeout
});

// Initialize Google AI
const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    
    if (!username) {
      return NextResponse.json({ error: 'Username dibutuhkan' }, { status: 400 });
    }
    
    // Fetch Instagram data using Apify
    const instagramData = await fetchInstagramData(username);
    
    if (!instagramData) {
      return NextResponse.json({ error: 'Tidak ada data instagram yang ditemukan' }, { status: 404 });
    }

    // Add small delay to simulate processing time (helps with showing loading states on frontend)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate roast using Gemini AI
    const roast = await generateRoast(instagramData);

    return NextResponse.json({ 
      instagramData, 
      roast 
    });
    
  } catch (error) {
    console.error('Server error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') }, { status: 500 });
  }
}

interface InstagramPost {
  caption?: string;
  text?: string;
  [key: string]: unknown;
}

interface InstagramUserData {
  username: string;
  fullName?: string;
  biography?: string;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
  followers?: number;
  following?: number;
  postsCount?: number;
  profilePicUrl?: string;
  profilePicture?: string;
  profileImageUrl?: string;
  latestPosts?: InstagramPost[];
  posts?: InstagramPost[];
  isVerified?: boolean;
  name?: string;
  followsCount?: number;
  profilePicUrlHD?: string;
  [key: string]: unknown;
}

interface ApifyRunResult {
  defaultDatasetId: string;
}

async function fetchInstagramData(username: string): Promise<InstagramUserData | null> {
  try {
    // Using the specific Actor ID provided in the example
    const run = await apifyClient.actor("dSCLg0C3YEZ83HzYX").call({
      usernames: [username],
      // Additional options to improve scraping success
      proxy: {
        useApifyProxy: true,
        apifyProxyGroups: ['RESIDENTIAL']
      }
    }) as unknown as ApifyRunResult;
    
    const dataset = await apifyClient.dataset(run.defaultDatasetId).listItems();
    
    if (!dataset.items.length) {
      return null;
    }

    const rawUserData = dataset.items[0];
    
    // Transform data to match our app's expected format
    const userData: InstagramUserData = {
      username: String(rawUserData.username || username),
      fullName: String(rawUserData.fullName || rawUserData.name || ''),
      biography: String(rawUserData.biography || rawUserData.bio || ''),
      followersCount: Number(rawUserData.followersCount || rawUserData.followers || 0),
      followingCount: Number(rawUserData.followsCount || rawUserData.following || 0),
      postsCount: Number(rawUserData.postsCount || (Array.isArray(rawUserData.posts) ? rawUserData.posts.length : 0)),
      // Profile pic could be in different fields depending on the actor
      profilePictureUrl: String(rawUserData.profilePicUrl || rawUserData.profilePicUrlHD || rawUserData.profileImageUrl || ''),
      latestPosts: (Array.isArray(rawUserData.latestPosts) ? rawUserData.latestPosts : 
                   Array.isArray(rawUserData.posts) ? rawUserData.posts.slice(0, 5) : []) as InstagramPost[],
      isVerified: Boolean(rawUserData.isVerified || false),
    };
    
    return userData;
  } catch (error) {
    console.error("Error fetching Instagram data:", error instanceof Error ? error.message : "Unknown error");
    return null;
  }
}

async function generateRoast(instagramData: InstagramUserData): Promise<string> {
  try {
    // Fix the model name to use a valid Gemini model
    const model = googleAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
      Buatlah roast yang pedas tapi menghibur tentang akun Instagram ini. Gunakan humor cerdas dan satir yang tajam untuk mengkritik profil mereka dengan cara yang lucu. Analisis secara kocak semua aspek - dari foto yang (mungkin) overposed, jumlah followers yang mencurigakan, bio yang (mungkin) sok deep, sampai caption yang (mungkin) cringe. Buat roastingnya pedas tapi tetap mengundang tawa, bukan untuk menyakiti. Berikut data profil:
      
      Username: ${instagramData.username}
      Full Name: ${instagramData.fullName}
      Bio: ${instagramData.biography}
      Followers: ${instagramData.followersCount}
      Following: ${instagramData.followingCount}
      Posts: ${instagramData.postsCount}
      Verified: ${instagramData.isVerified ? 'Yes' : 'No'}
      
      Latest Post Captions:
      ${instagramData.latestPosts?.map((post: InstagramPost) => post.caption || post.text || 'No caption').join('\n') || 'No posts found'}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating roast:", error instanceof Error ? error.message : "Unknown error");
    return "Maaf, saya tidak dapat membuat roast untuk akun ini. Silakan coba lagi nanti.";
  }
} 