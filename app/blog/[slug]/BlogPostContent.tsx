"use client";

import Link from "next/link";
import { postTypes } from "@/utils/authorUtils";
import ErrorState from "@/components/ErrorState";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import BlogPostSidebar from "./BlogPostSidebar";
import LoremIpsum from "@/components/LoremIpsum";
import author1 from "@/assets/Author images/author-1.jpg";
import author2 from "@/assets/Author images/author-2.jpg";
import author3 from "@/assets/Author images/author-3.jpg";
import author4 from "@/assets/Author images/author-4.jpg";
import author5 from "@/assets/Author images/author-5.jpg";
import author6 from "@/assets/Author images/author-6.jpg";
import author7 from "@/assets/Author images/author-7.jpg";
import { useStickyScroll } from "@/hooks/useStickyScroll";
import "@/styles/pages/blogPost/blogPost.scss";

const authorImages = [
  author1,
  author2,
  author3,
  author4,
  author5,
  author6,
  author7,
];

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface BlogPostContentProps {
  post: Post | null;
  postType: string;
  postImage: string;
  publishDate: string;
  relatedPosts: {
    id: number;
    title: string;
    body: string;
    type: string;
    image: string;
    userId: number;
    slug: string;
  }[];
  translations: {
    postNotFound: string;
    postNotFoundMessage: string;
    minRead: string;
    publishedOn: string;
    copyLink: string;
    relatedBlogs: string;
    typeLabel: string;
  };
  authors: string[];
  previousPost: {
    id: number;
    title: string;
    slug: string;
    image: string;
  } | null;
  nextPost: { id: number; title: string; slug: string; image: string } | null;
}

export default function BlogPostContent({
  post,
  postType,
  postImage,
  publishDate,
  relatedPosts,
  translations,
  authors,
  previousPost,
  nextPost,
}: BlogPostContentProps) {
  if (!post) {
    return (
      <>
        <Navbar />
        <div className="blog-post">
          <div className="blog-post__container">
            <ErrorState
              type="404"
              title={translations.postNotFound}
              message={translations.postNotFoundMessage}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const firstSentence = post.body.split(". ")[0] + ".";
  // Get author based on post type to match homepage logic
  const typeIndex = postTypes.indexOf(postType);
  const authorName = authors[typeIndex] || authors[0];
  const authorImage = authorImages[typeIndex] || authorImages[0];

  const generateContent = (body: string) => {
    const paragraphs = body.split("\n").filter((p) => p.trim());
    return paragraphs;
  };

  const contentParagraphs = generateContent(post.body);
  const featuredPost = relatedPosts[0];
  const recentPosts = relatedPosts.slice(1, 3);

  // Sticky sidebar scroll behavior
  const { sidebarRef, containerRef, sidebarStyle } = useStickyScroll(40);

  return (
    <>
      <Navbar />
      <article className="blog-post">
        <div className="blog-post__container">
          {/* Header Section */}
          <div className="blog-post__header">
            <div className="blog-post__breadcrumbs">
              <span>Home</span>
              <span className="blog-post__breadcrumbs-separator">&gt;</span>
              <span>All blogs</span>
            </div>

            <h1 className="blog-post__title">{post.title}</h1>

            <p className="blog-post__intro">{firstSentence}</p>

            <div className="blog-post__meta-simple">
              <span className="blog-post__by">by </span>
              <span className="blog-post__author-name">{authorName}</span>
              <span className="blog-post__meta-separator">|</span>
              <span className="blog-post__time">{translations.minRead}</span>
            </div>
          </div>

          <div
            className="blog-post__body-grid"
            ref={containerRef as React.RefObject<HTMLDivElement>}
          >
            {/* Left Column: Content */}
            <div className="blog-post__main-content">
              <div className="blog-post__hero">
                <img
                  src={postImage}
                  alt={post.title}
                  className="blog-post__hero-image"
                />
              </div>

              <div className="blog-post__content">
                {contentParagraphs.map((paragraph, index) => (
                  <p key={index} className="blog-post__paragraph">
                    {paragraph}
                  </p>
                ))}
                <LoremIpsum />

                {/* Navigation Section */}
                <div className="blog-post__navigation">
                  <div className="blog-post__navigation-separator"></div>
                  <div className="blog-post__navigation-buttons">
                    {/* Previous Button (Newer Post: ID + 1) - Only if it exists */}
                    <div className="blog-post__nav-wrapper blog-post__nav-wrapper--prev">
                      {previousPost ? (
                        <Link
                          href={`/blog/${previousPost.slug}`}
                          className="blog-post__nav-link blog-post__nav-link--prev"
                        >
                          <div className="blog-post__nav-content">
                            <span className="blog-post__nav-label">
                              Previous blog
                            </span>
                            <img
                              src={previousPost.image}
                              alt="Previous blog"
                              className="blog-post__nav-image"
                            />
                          </div>
                        </Link>
                      ) : (
                        <div className="blog-post__nav-placeholder" />
                      )}
                    </div>

                    {/* Next Button (Older Post: ID - 1) - Only if it exists */}
                    <div className="blog-post__nav-wrapper blog-post__nav-wrapper--next">
                      {nextPost ? (
                        <Link
                          href={`/blog/${nextPost.slug}`}
                          className="blog-post__nav-link blog-post__nav-link--next"
                        >
                          <div className="blog-post__nav-content">
                            <span className="blog-post__nav-label">
                              Next blog
                            </span>
                            <img
                              src={nextPost.image}
                              alt="Next blog"
                              className="blog-post__nav-image"
                            />
                          </div>
                        </Link>
                      ) : (
                        <div className="blog-post__nav-placeholder" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BlogPostSidebar
              postTitle={post.title}
              translations={translations}
              authorName={authorName}
              authorImage={authorImage}
              featuredPost={featuredPost}
              recentPosts={recentPosts}
              authors={authors}
              sidebarRef={sidebarRef}
              sidebarStyle={sidebarStyle}
            />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
