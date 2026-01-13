import { placeholderImages } from "@/assets/PaginationPhotos/HomePhotos";
import { fetchAuthors } from "@/utils/authorUtils";
import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const urlSlug = resolvedParams.slug || "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });
    if (response.ok) {
      const posts: Post[] = await response.json();
      const post = posts.find((p) => generateSlug(p.title) === urlSlug);

      if (post) {
        const description = post.body.split(". ")[0] + ".";
        const postTypes = [
          "Finance",
          "Health",
          "Business",
          "Food",
          "Travel",
          "Lifestyle",
          "Tech",
        ];
        const postType = postTypes[(post.id - 1) % postTypes.length];

        const imageIndex = (post.id - 1) % placeholderImages.length;

        return {
          title: post.title,
          description: description,
          keywords: [postType.toLowerCase(), "article", "tetbit", "blog"],
          openGraph: {
            type: "article",
            title: post.title,
            description: description,
            url: `/blog/${urlSlug}`,
            images: [
              {
                url: placeholderImages[imageIndex] || "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: post.title,
            description: description,
            images: [placeholderImages[imageIndex] || "/og-image.jpg"],
          },
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch post for metadata:", error);
  }

  return {
    title: "Blog Post",
    description: "Read this interesting blog post on Tetbit Blog.",
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const resolvedParams = await params;

  const urlSlug = resolvedParams.slug || "";
  const postTypes = [
    "Finance",
    "Health",
    "Business",
    "Food",
    "Travel",
    "Lifestyle",
    "Tech",
  ];

  let post: Post | null = null;
  let allPosts: Post[] = [];

  try {
    const allPostsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts`,
      { cache: "no-store" }
    );

    if (allPostsResponse.ok) {
      allPosts = await allPostsResponse.json();
      post = allPosts.find((p) => generateSlug(p.title) === urlSlug) || null;
    }
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }

  const postType = post ? postTypes[(post.id - 1) % postTypes.length] : "";
  const imageIndex = post ? (post.id - 1) % placeholderImages.length : 0;
  const postImage = placeholderImages[imageIndex] || placeholderImages[0];

  const generatePublishDate = (id: number) => {
    const baseDate = new Date(2024, 0, 1);
    baseDate.setDate(baseDate.getDate() + id * 7);
    const day = String(baseDate.getDate()).padStart(2, "0");
    const month = String(baseDate.getMonth() + 1).padStart(2, "0");
    const year = baseDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const publishDate = post ? generatePublishDate(post.id) : "";

  const typeLabels: Record<string, string> = {
    Blog: "Blog",
    News: "News",
    Tutorial: "Tutorial",
    Opinion: "Opinion",
  };

  const relatedPosts = post
    ? allPosts
        .filter((p) => {
          const pType = postTypes[(p.id - 1) % postTypes.length];
          return pType === postType && p.id !== post.id;
        })
        .slice(0, 3)
        .map((relatedPost) => {
          const relatedImageIndex =
            (relatedPost.id - 1) % placeholderImages.length;
          const relatedImage =
            placeholderImages[relatedImageIndex] || placeholderImages[0];
          const relatedType =
            postTypes[(relatedPost.id - 1) % postTypes.length];

          return {
            id: relatedPost.id,
            title: relatedPost.title,
            body: relatedPost.body,
            type: relatedType,
            image: relatedImage,
            userId: relatedPost.userId,
            slug: generateSlug(relatedPost.title),
          };
        })
    : [];

  const newerPostData =
    post && post.id < 75
      ? allPosts.find((p) => p.id === post!.id + 1) || null
      : null;
  const olderPostData = post
    ? allPosts.find((p) => p.id === post!.id - 1) || null
    : null;

  const getPostSummary = (p: Post | null | undefined) => {
    if (!p) return null;
    const pImageIndex = (p.id - 1) % placeholderImages.length;
    return {
      id: p.id,
      title: p.title,
      slug: generateSlug(p.title),
      image: placeholderImages[pImageIndex] || placeholderImages[0],
    };
  };

  const previousPostSummary = getPostSummary(newerPostData);
  const nextPostSummary = getPostSummary(olderPostData);

  const previousPost = previousPostSummary;
  const nextPost = nextPostSummary;

  const translations = {
    postNotFound: "Post not found",
    postNotFoundMessage:
      "The blog post you're looking for doesn't exist or has been removed.",
    minRead: "5 min read",
    publishedOn: "Published on",
    copyLink: "Copy link",
    relatedBlogs: "Related Blogs",
    typeLabel: post ? typeLabels[postType] : "",
  };

  const authors = await fetchAuthors();

  return (
    <BlogPostContent
      post={post}
      postType={postType}
      postImage={postImage}
      publishDate={publishDate}
      relatedPosts={relatedPosts}
      translations={translations}
      authors={authors}
      previousPost={previousPost}
      nextPost={nextPost}
    />
  );
}
