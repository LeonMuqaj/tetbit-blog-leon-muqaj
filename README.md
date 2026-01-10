# Tetbit Blog - Intern Development Project

A Next.js TypeScript blog application built with the App Router. This project serves as a learning exercise for interns to practice building a full-stack blog application.

## 🎯 Project Overview

This project demonstrates:
- Next.js 14 App Router architecture
- TypeScript for type safety
- API Routes for backend functionality
- Integration with external APIs (JSONPlaceholder)
- Modern React patterns and best practices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- A code editor (VS Code recommended)
- **Git** (for version control)

## 🔧 Initial Setup (For Instructors)

If you're setting up this repository for the first time:

```bash
# Initialize git repository (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Next.js TypeScript blog with intern checklist"

# Add remote repository (replace with your actual repository URL)
git remote add origin <repository-url>

# Push to remote
git push -u origin main
```

**Note:** Make sure to replace `<repository-url>` with your actual Git repository URL.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tetbit-blog
```

Replace `<repository-url>` with the actual repository URL (e.g., `https://github.com/your-org/tetbit-blog.git`)

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 4. View the Checklist

Navigate to [http://localhost:3000/checklist](http://localhost:3000/checklist) to see the interactive development checklist.

## 📁 Project Structure

```
tetbit-blog/
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts              # GET /api/posts
│   │       └── [id]/
│   │           ├── route.ts          # GET /api/posts/[id]
│   │           └── comments/
│   │               └── route.ts       # GET /api/posts/[id]/comments
│   ├── checklist/
│   │   ├── page.tsx                  # Checklist page component
│   │   └── checklist.css             # Checklist styles
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
├── types/
│   └── blog.ts                       # TypeScript interfaces
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🔌 API Endpoints

The following API endpoints are available:

### Get All Posts
```
GET /api/posts
Query Parameters:
  - limit (optional): Number of posts to return
  - start (optional): Starting index for pagination

Example: /api/posts?limit=10&start=0
```

### Get Single Post
```
GET /api/posts/[id]

Example: /api/posts/1
```

### Get Post Comments
```
GET /api/posts/[id]/comments

Example: /api/posts/1/comments
```

All endpoints return JSON responses with the following structure:
```json
{
  "success": true,
  "data": [...],
  "total": 100
}
```

## 🎓 Learning Objectives

By completing this project, you will learn:

1. **Next.js App Router**
   - File-based routing
   - Server and Client Components
   - API Routes
   - Layouts and nested routes

2. **TypeScript**
   - Type definitions
   - Interface design
   - Type safety in API routes

3. **API Integration**
   - Fetching data from external APIs
   - Error handling
   - Pagination
   - Response formatting

4. **React Patterns**
   - Hooks (useState, useEffect)
   - Client-side state management
   - Local storage persistence

5. **Best Practices**
   - Code organization
   - Error handling
   - Performance optimization
   - Responsive design

## 📝 Development Checklist

The interactive checklist is available at `/checklist` and includes:

- ✅ Project Setup (4 tasks)
- ✅ API Implementation (7 tasks)
- ✅ Frontend Development (8 tasks)
- ✅ Best Practices (7 tasks)

**Total: 26 tasks**

Your progress is automatically saved to localStorage, so you can continue where you left off!

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📚 Resources

### Next.js Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### API Reference
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors
Make sure all files have proper type definitions. Check `types/blog.ts` for available interfaces.

### API Not Working
- Verify your internet connection
- Check that JSONPlaceholder API is accessible: https://jsonplaceholder.typicode.com
- Check browser console for error messages

## 🎯 Next Steps

After completing the checklist, consider:

1. Adding more features (search, filtering, user profiles)
2. Implementing authentication
3. Adding a database (PostgreSQL, MongoDB)
4. Deploying to Vercel or another platform
5. Adding unit tests with Jest/React Testing Library
6. Implementing dark mode
7. Adding animations and transitions

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

This is an intern learning project. Follow the checklist and best practices outlined in the codebase.

---

**Happy Coding! 🚀**

