'use client'

import { useState, useEffect } from 'react'
import type { Post } from '@/types/blog'

/**
 * Example page demonstrating how to use the API routes
 * This is a reference implementation for interns to learn from
 */
export default function ApiExamplePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Example: Fetch posts with pagination
      const response = await fetch('/api/posts?limit=5')
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const data = await response.json()
      
      if (data.success) {
        setPosts(data.data)
      } else {
        throw new Error(data.error || 'Unknown error')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button 
          onClick={fetchPosts}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>API Usage Example</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        This page demonstrates how to fetch and display data from the API routes.
        Check the code in <code>app/api-example/page.tsx</code> to see the implementation.
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={fetchPosts}
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Refresh Posts
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              {post.title}
            </h2>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              Post ID: {post.id} | User ID: {post.userId}
            </p>
            <p style={{ lineHeight: '1.6' }}>{post.body}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>💡 Learning Points:</h3>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Use <code>useState</code> to manage component state (posts, loading, error)</li>
          <li>Use <code>useEffect</code> to fetch data when component mounts</li>
          <li>Handle loading and error states for better UX</li>
          <li>Use TypeScript types (<code>Post[]</code>) for type safety</li>
          <li>Call API routes using <code>fetch('/api/posts')</code></li>
          <li>Parse and validate the response before using the data</li>
        </ul>
      </div>
    </div>
  )
}

