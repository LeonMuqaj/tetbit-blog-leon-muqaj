import { NextResponse } from 'next/server'
import type { Post } from '@/types/blog'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * GET /api/posts/[id]
 * Fetches a single blog post by ID from JSONPlaceholder API
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id

    if (!postId || isNaN(Number(postId))) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid post ID',
        },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_BASE_URL}/posts/${postId}`)

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          {
            success: false,
            error: 'Post not found',
          },
          { status: 404 }
        )
      }
      throw new Error(`Failed to fetch post: ${response.statusText}`)
    }

    const post: Post = await response.json()

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch post',
      },
      { status: 500 }
    )
  }
}

