import { NextResponse } from 'next/server'
import type { Comment } from '@/types/blog'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * GET /api/posts/[id]/comments
 * Fetches all comments for a specific post from JSONPlaceholder API
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

    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`)

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`)
    }

    const comments: Comment[] = await response.json()

    return NextResponse.json({
      success: true,
      data: comments,
      total: comments.length,
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch comments',
      },
      { status: 500 }
    )
  }
}

