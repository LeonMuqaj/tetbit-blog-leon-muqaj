import { NextRequest, NextResponse } from 'next/server';
import type { Post } from '@/types/blog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');
    
    const start = (page - 1) * limit;
    
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`
    );
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
    
    const posts: Post[] = await response.json();
     
    const totalPosts = 75;
    const totalPages = Math.ceil(totalPosts / limit);
    
    return NextResponse.json({ 
      success: true, 
      data: posts,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
