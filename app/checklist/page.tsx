'use client'

import { useState, useEffect } from 'react'
import './checklist.css'

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  completed: boolean
  hint?: string
  example?: string
  resources?: string[]
  whyItMatters?: string
}

const initialChecklist: ChecklistItem[] = [
  // Project Setup
  {
    id: 'setup-1',
    title: 'Initialize Next.js project with TypeScript',
    description: 'Run `npx create-next-app@latest` and select TypeScript, App Router, and ESLint options.',
    category: 'Project Setup',
    completed: false,
    hint: 'When prompted, choose: TypeScript ✓, App Router ✓, ESLint ✓, Tailwind CSS (optional), src/ directory (optional)',
    example: 'npx create-next-app@latest tetbit-blog',
    resources: [
      'https://nextjs.org/docs/getting-started/installation',
      'https://nextjs.org/docs/app/building-your-application/routing'
    ],
    whyItMatters: 'TypeScript catches errors at compile-time, and the App Router is Next.js\'s modern routing system with better performance and developer experience.'
  },
  {
    id: 'setup-2',
    title: 'Set up project structure',
    description: 'Create folders: app/, types/, components/, lib/, and organize files properly.',
    category: 'Project Setup',
    completed: false,
    hint: 'The app/ folder is for App Router pages. Keep types/ for TypeScript interfaces, components/ for reusable UI, and lib/ for utility functions.',
    example: 'mkdir -p app/api/posts types components lib',
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/colocating-files'
    ],
    whyItMatters: 'A well-organized structure makes code easier to find, maintain, and scale as your project grows.'
  },
  {
    id: 'setup-3',
    title: 'Configure TypeScript',
    description: 'Set up tsconfig.json with proper paths, strict mode, and Next.js plugin.',
    category: 'Project Setup',
    completed: false,
    hint: 'Enable strict mode for better type safety. Add path aliases like "@/*" to avoid relative imports like "../../../".',
    example: 'Check tsconfig.json for "strict": true and "paths" configuration',
    resources: [
      'https://www.typescriptlang.org/tsconfig#strict',
      'https://nextjs.org/docs/app/building-your-application/configuring/typescript'
    ],
    whyItMatters: 'Strict TypeScript catches more bugs early and path aliases make imports cleaner and less error-prone.'
  },
  {
    id: 'setup-4',
    title: 'Set up environment variables',
    description: 'Create .env.local file and configure any API keys or environment-specific settings.',
    category: 'Project Setup',
    completed: false,
    hint: 'For this project, you might not need env vars since JSONPlaceholder is public, but it\'s good practice to set up the structure.',
    example: '# .env.local\n# API_BASE_URL=https://jsonplaceholder.typicode.com',
    resources: [
      'https://nextjs.org/docs/app/building-your-application/configuring/environment-variables'
    ],
    whyItMatters: 'Environment variables keep sensitive data and configuration out of your codebase and allow different settings for dev/staging/production.'
  },

  // API Implementation
  {
    id: 'api-1',
    title: 'Create API route for fetching all posts',
    description: 'Implement GET /api/posts route that fetches posts from JSONPlaceholder API.',
    category: 'API Implementation',
    completed: false,
    hint: 'Create app/api/posts/route.ts. Use Next.js Route Handlers. Fetch from https://jsonplaceholder.typicode.com/posts',
    example: `// app/api/posts/route.ts
export async function GET() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  return NextResponse.json({ success: true, data: posts });
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/route-handlers',
      'https://jsonplaceholder.typicode.com/'
    ],
    whyItMatters: 'API routes act as a backend layer, allowing you to add logic, transform data, and handle errors before sending to the frontend.'
  },
  {
    id: 'api-2',
    title: 'Create API route for fetching single post',
    description: 'Implement GET /api/posts/[id] route with proper error handling for invalid IDs.',
    category: 'API Implementation',
    completed: false,
    hint: 'Use dynamic route segments: app/api/posts/[id]/route.ts. Access params.id. Validate the ID is a number before fetching.',
    example: `// app/api/posts/[id]/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const postId = params.id;
  if (isNaN(Number(postId))) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }
  // ... fetch post
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes'
    ],
    whyItMatters: 'Dynamic routes allow flexible URLs. Validation prevents errors and provides better user feedback.'
  },
  {
    id: 'api-3',
    title: 'Create API route for post comments',
    description: 'Implement GET /api/posts/[id]/comments route to fetch comments for a post.',
    category: 'API Implementation',
    completed: false,
    hint: 'Nested dynamic routes: app/api/posts/[id]/comments/route.ts. Use the same postId validation pattern.',
    example: `// app/api/posts/[id]/comments/route.ts
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${params.id}/comments\`);
  // ...
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#nested-dynamic-routes'
    ],
    whyItMatters: 'Nested routes organize related endpoints logically and follow RESTful API conventions.'
  },
  {
    id: 'api-4',
    title: 'Add pagination support',
    description: 'Add query parameters (limit, start) to the posts API route for pagination.',
    category: 'API Implementation',
    completed: false,
    hint: 'Use URL.searchParams to get query params. Parse limit and start, then slice the array. Return total count for frontend pagination.',
    example: `const { searchParams } = new URL(request.url);
const limit = searchParams.get('limit');
const start = searchParams.get('start');
// Apply pagination logic
return NextResponse.json({ data: paginatedPosts, total: allPosts.length });`,
    resources: [
      'https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams'
    ],
    whyItMatters: 'Pagination improves performance by loading data in chunks and provides better UX for large datasets.'
  },
  {
    id: 'api-5',
    title: 'Implement error handling',
    description: 'Add proper try-catch blocks, error responses, and status codes to all API routes.',
    category: 'API Implementation',
    completed: false,
    hint: 'Wrap fetch calls in try-catch. Return appropriate HTTP status codes: 400 (bad request), 404 (not found), 500 (server error).',
    example: `try {
  const response = await fetch(url);
  if (!response.ok) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  // ...
} catch (error) {
  return NextResponse.json({ error: 'Server error' }, { status: 500 });
}`,
    resources: [
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
      'https://nextjs.org/docs/app/api-reference/functions/next-response'
    ],
    whyItMatters: 'Proper error handling prevents crashes, provides useful feedback, and follows HTTP standards for better debugging.'
  },
  {
    id: 'api-6',
    title: 'Add TypeScript types for API responses',
    description: 'Create interfaces for Post, Comment, User in types/blog.ts and use them in API routes.',
    category: 'API Implementation',
    completed: false,
    hint: 'Define interfaces matching JSONPlaceholder data structure. Import and use them in route handlers for type safety.',
    example: `// types/blog.ts
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// In route.ts
import type { Post } from '@/types/blog';
const post: Post = await response.json();`,
    resources: [
      'https://www.typescriptlang.org/docs/handbook/2/objects.html',
      'https://jsonplaceholder.typicode.com/'
    ],
    whyItMatters: 'TypeScript types catch errors early, provide autocomplete in your editor, and serve as documentation for your API.'
  },
  {
    id: 'api-7',
    title: 'Test API routes',
    description: 'Test all API endpoints using browser, Postman, or curl to verify they work correctly.',
    category: 'API Implementation',
    completed: false,
    hint: 'Visit http://localhost:3000/api/posts in your browser. Test with different IDs, invalid IDs, and query parameters. Check error responses.',
    example: `# Test in browser or terminal:
curl http://localhost:3000/api/posts
curl http://localhost:3000/api/posts/1
curl http://localhost:3000/api/posts/1/comments
curl http://localhost:3000/api/posts?limit=5&start=10`,
    resources: [
      'https://www.postman.com/',
      'https://curl.se/'
    ],
    whyItMatters: 'Testing ensures your API works correctly, handles edge cases, and returns expected data formats before building the frontend.'
  },

  // Frontend Development
  {
    id: 'frontend-1',
    title: 'Create blog posts listing page',
    description: 'Build a page that displays all blog posts fetched from /api/posts.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Create app/blog/page.tsx. Use async/await in Server Components. Fetch from /api/posts and map over results to display.',
    example: `// app/blog/page.tsx
export default async function BlogPage() {
  const res = await fetch('http://localhost:3000/api/posts');
  const { data } = await res.json();
  return <div>{data.map(post => <article key={post.id}>...</article>)}</div>;
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/data-fetching',
      'https://nextjs.org/docs/app/building-your-application/rendering/server-components'
    ],
    whyItMatters: 'Server Components fetch data on the server, reducing client-side JavaScript and improving initial load time.'
  },
  {
    id: 'frontend-2',
    title: 'Create individual post detail page',
    description: 'Build a dynamic route [slug]/page.tsx that displays a single post with its content.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Create app/blog/[id]/page.tsx. Use params.id to fetch from /api/posts/[id]. Display title, body, and format nicely.',
    example: `// app/blog/[id]/page.tsx
export default async function PostPage({ params }: { params: { id: string } }) {
  const res = await fetch(\`http://localhost:3000/api/posts/\${params.id}\`);
  const { data } = await res.json();
  return <article><h1>{data.title}</h1><p>{data.body}</p></article>;
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes'
    ],
    whyItMatters: 'Dynamic routes allow one component to handle multiple URLs, making your code DRY and maintainable.'
  },
  {
    id: 'frontend-3',
    title: 'Add loading states',
    description: 'Implement loading.tsx files and loading UI for better user experience.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Create loading.tsx in the same directory as your page. Next.js automatically shows it while the page loads.',
    example: `// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>;
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming'
    ],
    whyItMatters: 'Loading states improve perceived performance and provide visual feedback, preventing users from thinking the app is frozen.'
  },
  {
    id: 'frontend-4',
    title: 'Add error handling UI',
    description: 'Create error.tsx files and display user-friendly error messages.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Create error.tsx with error and reset props. Use it to catch and display errors gracefully.',
    example: `// app/blog/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return <div>Something went wrong! <button onClick={reset}>Try again</button></div>;
}`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/error-handling'
    ],
    whyItMatters: 'Error boundaries prevent entire app crashes and give users a way to recover, improving reliability and UX.'
  },
  {
    id: 'frontend-5',
    title: 'Implement pagination UI',
    description: 'Add pagination controls to the posts listing page using the API pagination.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Use query parameters in the URL (?page=1). Create a Client Component for pagination buttons. Update URL and refetch data.',
    example: `// Client component for pagination
const [page, setPage] = useState(1);
const res = await fetch(\`/api/posts?limit=10&start=\${(page-1)*10}\`);`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/data-fetching/search-params'
    ],
    whyItMatters: 'Pagination improves performance and UX by loading manageable chunks of data instead of everything at once.'
  },
  {
    id: 'frontend-6',
    title: 'Add comments section',
    description: 'Display comments for each post using the /api/posts/[id]/comments endpoint.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Fetch comments in the post detail page. Display them in a list below the post content. Style them nicely.',
    example: `const commentsRes = await fetch(\`/api/posts/\${id}/comments\`);
const { data: comments } = await commentsRes.json();`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/data-fetching'
    ],
    whyItMatters: 'Comments add interactivity and demonstrate fetching related data, a common pattern in real applications.'
  },
  {
    id: 'frontend-7',
    title: 'Style the application',
    description: 'Add CSS modules, Tailwind, or styled-components to make the blog visually appealing.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Use CSS modules (.module.css) for component-specific styles, or add Tailwind CSS. Focus on typography, spacing, and colors.',
    example: `// styles.module.css
.post { padding: 1rem; border: 1px solid #e0e0e0; }
// In component: import styles from './styles.module.css'`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/styling/css-modules',
      'https://tailwindcss.com/docs'
    ],
    whyItMatters: 'Good styling improves readability, user engagement, and makes your application look professional.'
  },
  {
    id: 'frontend-8',
    title: 'Make it responsive',
    description: 'Ensure the blog works well on mobile, tablet, and desktop devices.',
    category: 'Frontend Development',
    completed: false,
    hint: 'Use CSS media queries, flexbox/grid with responsive units, and test on different screen sizes. Mobile-first approach works well.',
    example: `@media (max-width: 768px) {
  .container { padding: 1rem; }
  .grid { grid-template-columns: 1fr; }
}`,
    resources: [
      'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries',
      'https://nextjs.org/docs/app/building-your-application/styling/css-modules'
    ],
    whyItMatters: 'Responsive design ensures your app works for all users regardless of device, which is essential in modern web development.'
  },

  // Best Practices
  {
    id: 'best-1',
    title: 'Add code comments',
    description: 'Document complex logic, API routes, and component functionality with clear comments.',
    category: 'Best Practices',
    completed: false,
    hint: 'Comment the "why" not the "what". Explain business logic, edge cases, and non-obvious decisions. Use JSDoc for functions.',
    example: `/**
 * Fetches posts with pagination support
 * @param limit - Maximum number of posts to return
 * @param start - Starting index for pagination
 */
export async function GET(request: Request) { ... }`,
    resources: [
      'https://jsdoc.app/',
      'https://google.github.io/styleguide/jsguide.html#jsdoc'
    ],
    whyItMatters: 'Good comments help future you and teammates understand code quickly, reducing debugging time and onboarding effort.'
  },
  {
    id: 'best-2',
    title: 'Follow Next.js conventions',
    description: 'Use App Router properly: layouts, loading states, error boundaries, and metadata.',
    category: 'Best Practices',
    completed: false,
    hint: 'Use layout.tsx for shared UI, loading.tsx for loading states, error.tsx for errors, and metadata export for SEO.',
    example: `// app/blog/layout.tsx - shared layout
// app/blog/loading.tsx - loading UI
// app/blog/error.tsx - error boundary
// app/blog/page.tsx - main content`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts',
      'https://nextjs.org/docs/app/api-reference/functions/generate-metadata'
    ],
    whyItMatters: 'Following conventions makes code predictable, leverages Next.js optimizations, and makes it easier for others to understand your code.'
  },
  {
    id: 'best-3',
    title: 'Optimize performance',
    description: 'Use Next.js Image component, implement proper caching, and optimize API calls.',
    category: 'Best Practices',
    completed: false,
    hint: 'Use next/image for images, add revalidate to fetch calls for caching, and consider using React.memo for expensive components.',
    example: `import Image from 'next/image';
// In fetch: { next: { revalidate: 3600 } } // Cache for 1 hour`,
    resources: [
      'https://nextjs.org/docs/app/building-your-application/optimizing/images',
      'https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating'
    ],
    whyItMatters: 'Performance optimizations improve user experience, reduce server costs, and improve SEO rankings.'
  },
  {
    id: 'best-4',
    title: 'Set up ESLint and fix linting errors',
    description: 'Configure ESLint rules and ensure all code passes linting checks.',
    category: 'Best Practices',
    completed: false,
    hint: 'Run npm run lint. Fix warnings and errors. ESLint catches bugs, enforces style, and improves code quality.',
    example: 'npm run lint',
    resources: [
      'https://nextjs.org/docs/app/building-your-application/configuring/eslint',
      'https://eslint.org/docs/latest/use/getting-started'
    ],
    whyItMatters: 'Linting catches errors early, enforces consistent code style across the team, and prevents common bugs.'
  },
  {
    id: 'best-5',
    title: 'Add proper TypeScript types',
    description: 'Ensure all functions, components, and API responses have proper TypeScript types.',
    category: 'Best Practices',
    completed: false,
    hint: 'Type all function parameters and return values. Use interfaces for objects. Avoid "any" type - use "unknown" if type is truly unknown.',
    example: `function fetchPost(id: number): Promise<Post> { ... }
interface Props { title: string; count?: number; }`,
    resources: [
      'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
      'https://react-typescript-cheatsheet.netlify.app/'
    ],
    whyItMatters: 'Strong typing catches errors at compile-time, provides better IDE autocomplete, and serves as living documentation.'
  },
  {
    id: 'best-6',
    title: 'Test the application',
    description: 'Manually test all features: navigation, API calls, error states, and edge cases.',
    category: 'Best Practices',
    completed: false,
    hint: 'Test happy paths, error cases (invalid IDs, network failures), edge cases (empty lists, very long text), and different screen sizes.',
    example: 'Test checklist: ✓ Valid post ID, ✓ Invalid post ID (404), ✓ Pagination, ✓ Loading states, ✓ Error states, ✓ Mobile view',
    resources: [
      'https://nextjs.org/docs/app/building-your-application/testing',
      'https://playwright.dev/'
    ],
    whyItMatters: 'Thorough testing catches bugs before users do, improves confidence in deployments, and documents expected behavior.'
  },
  {
    id: 'best-7',
    title: 'Review and refactor code',
    description: 'Review your code for improvements, remove unused code, and refactor for clarity.',
    category: 'Best Practices',
    completed: false,
    hint: 'Look for: duplicate code (extract to functions), long functions (break into smaller ones), unclear variable names, unused imports.',
    example: 'Ask: Can I extract this into a reusable function? Is this function doing too much? Are variable names clear?',
    resources: [
      'https://refactoring.guru/refactoring',
      'https://github.com/ryanmcdermott/clean-code-javascript'
    ],
    whyItMatters: 'Refactoring improves code maintainability, reduces bugs, and makes future changes easier and safer.'
  },
]

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  // Load checklist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('intern-checklist')
    if (saved) {
      try {
        setChecklist(JSON.parse(saved))
      } catch {
        setChecklist(initialChecklist)
      }
    } else {
      setChecklist(initialChecklist)
    }
  }, [])

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (checklist.length > 0) {
      localStorage.setItem('intern-checklist', JSON.stringify(checklist))
    }
  }, [checklist])

  const toggleItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const resetChecklist = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setChecklist(initialChecklist)
      localStorage.removeItem('intern-checklist')
    }
  }

  const categories = ['all', 'Project Setup', 'API Implementation', 'Frontend Development', 'Best Practices']
  const filteredChecklist =
    filter === 'all'
      ? checklist
      : checklist.filter((item) => item.category === filter)

  const completedCount = checklist.filter((item) => item.completed).length
  const totalCount = checklist.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="checklist-container">
      <header className="checklist-header">
        <h1>Next.js TypeScript Blog - Intern Checklist</h1>
        <p className="subtitle">
          A comprehensive guide to building a blog application with Next.js, TypeScript, and the App Router
        </p>
        <div className="intro-box">
          <h2>📖 How to Use This Checklist</h2>
          <ul className="intro-list">
            <li>
              <strong>Click the checkbox</strong> to mark tasks as complete. Your progress is automatically saved!
            </li>
            <li>
              <strong>Click "Show Details"</strong> on any task to see hints, code examples, resources, and why it matters.
            </li>
            <li>
              <strong>Filter by category</strong> to focus on specific areas (Project Setup, API, Frontend, Best Practices).
            </li>
            <li>
              <strong>Track your progress</strong> with the progress bar at the top.
            </li>
            <li>
              <strong>Test your API</strong> using the examples in the footer section below.
            </li>
          </ul>
          <p className="intro-note">
            💡 <strong>Pro Tip:</strong> Start with "Project Setup" tasks, then move to "API Implementation" before building the frontend. 
            This follows a logical development flow!
          </p>
        </div>
      </header>

      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="progress-text">
          {completedCount} of {totalCount} tasks completed ({Math.round(progressPercentage)}%)
        </p>
      </div>

      <div className="controls">
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
            >
              {category === 'all' ? 'All Tasks' : category}
            </button>
          ))}
        </div>
        <button onClick={resetChecklist} className="reset-btn">
          Reset Progress
        </button>
      </div>

      <div className="checklist-content">
        {filteredChecklist.length === 0 ? (
          <p className="no-items">No items in this category.</p>
        ) : (
          <div className="checklist-items">
            {filteredChecklist.map((item) => {
              const isExpanded = expandedItems.has(item.id)
              return (
                <div
                  key={item.id}
                  className={`checklist-item ${item.completed ? 'completed' : ''}`}
                >
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleItem(item.id)}
                      className="checkbox-input"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="checkbox-custom" />
                    <div className="item-content">
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-description">{item.description}</p>
                      <span className="item-category">{item.category}</span>
                      
                      {(item.hint || item.example || item.resources || item.whyItMatters) && (
                        <button
                          className="expand-btn"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleExpanded(item.id)
                          }}
                        >
                          {isExpanded ? '▼ Hide Details' : '▶ Show Details'}
                        </button>
                      )}
                      
                      {isExpanded && (
                        <div className="item-details">
                          {item.whyItMatters && (
                            <div className="detail-section">
                              <strong className="detail-label">💡 Why This Matters:</strong>
                              <p className="detail-content">{item.whyItMatters}</p>
                            </div>
                          )}
                          {item.hint && (
                            <div className="detail-section">
                              <strong className="detail-label">💡 Hint:</strong>
                              <p className="detail-content">{item.hint}</p>
                            </div>
                          )}
                          {item.example && (
                            <div className="detail-section">
                              <strong className="detail-label">📝 Example Code:</strong>
                              <pre className="code-example"><code>{item.example}</code></pre>
                            </div>
                          )}
                          {item.resources && item.resources.length > 0 && (
                            <div className="detail-section">
                              <strong className="detail-label">📚 Resources:</strong>
                              <ul className="resources-list">
                                {item.resources.map((resource, idx) => (
                                  <li key={idx}>
                                    <a
                                      href={resource}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="resource-link"
                                    >
                                      {resource}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <footer className="checklist-footer">
        <div className="footer-section">
          <h3>🔌 API Endpoints Available</h3>
          <ul>
            <li>
              <code>GET /api/posts</code> - Fetch all posts (supports ?limit=10&start=0)
            </li>
            <li>
              <code>GET /api/posts/[id]</code> - Fetch a single post by ID
            </li>
            <li>
              <code>GET /api/posts/[id]/comments</code> - Fetch comments for a post
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>🧪 Test Your API</h3>
          <p>Try these examples in your browser, Postman, or terminal:</p>
          <div className="test-examples">
            <div className="test-example">
              <strong>Get all posts:</strong>
              <code>http://localhost:3000/api/posts</code>
            </div>
            <div className="test-example">
              <strong>Get posts with pagination:</strong>
              <code>http://localhost:3000/api/posts?limit=5&start=10</code>
            </div>
            <div className="test-example">
              <strong>Get single post:</strong>
              <code>http://localhost:3000/api/posts/1</code>
            </div>
            <div className="test-example">
              <strong>Get post comments:</strong>
              <code>http://localhost:3000/api/posts/1/comments</code>
            </div>
            <div className="test-example">
              <strong>Test error handling (invalid ID):</strong>
              <code>http://localhost:3000/api/posts/99999</code>
            </div>
          </div>
          <p className="test-note">
            💡 <strong>Tip:</strong> Open these URLs in your browser while the dev server is running to see the JSON responses.
          </p>
        </div>

        <div className="footer-section">
          <h3>📚 API Source</h3>
          <p>
            This project uses <strong>JSONPlaceholder</strong> - a free fake REST API for testing and prototyping.
          </p>
          <p>
            <a
              href="https://jsonplaceholder.typicode.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit JSONPlaceholder Documentation →
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

