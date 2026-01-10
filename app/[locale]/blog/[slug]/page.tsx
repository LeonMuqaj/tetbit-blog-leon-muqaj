import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { placeholderImages } from "@/assets/PaginationPhotos/HomePhotos";
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
  params: Promise<{ locale: string; slug: string }>;
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
        const postTypes = ["Blog", "News", "Tutorial", "Opinion"];
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
            url: `/${resolvedParams.locale}/blog/${urlSlug}`,
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
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ id?: string }>;
}

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const resolvedParams = await params;

  const t = await getTranslations("blogPost");
  const tPostCard = await getTranslations("postCard");

  const urlSlug = resolvedParams.slug || "";
  const postTypes = ["Blog", "News", "Tutorial", "Opinion"];

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

  const relatedPosts = post
    ? allPosts
        .filter((p) => {
          const pType = postTypes[(p.id - 1) % postTypes.length];
          return pType === postType && p.id !== post.id;
        })
        .slice(0, 2)
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
          };
        })
    : [];

  const translations = {
    postNotFound: t("postNotFound"),
    postNotFoundMessage: t("postNotFoundMessage", {
      defaultValue:
        "The blog post you're looking for doesn't exist or has been removed.",
    }),
    minRead: t("minRead"),
    publishedOn: t("publishedOn"),
    copyLink: t("copyLink"),
    relatedBlogs: t("relatedBlogs"),
    typeLabel: post ? tPostCard(`types.${postType}`) : "",
  };

  return (
    <BlogPostContent
      post={post}
      postType={postType}
      postImage={postImage}
      publishDate={publishDate}
      relatedPosts={relatedPosts}
      translations={translations}
    />
  );
}
