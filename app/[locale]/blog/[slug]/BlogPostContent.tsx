"use client";

import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import ErrorState from "@/components/ErrorState";
import ShareButtons from "@/components/ShareButtons";
import "@/styles/pages/blogPost/blogPost.scss";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
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
}

export default function BlogPostContent({
  post,
  postType,
  postImage,
  publishDate,
  relatedPosts,
  translations,
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

  const generateContent = (body: string) => {
    const paragraphs = body.split("\n").filter((p) => p.trim());
    return paragraphs;
  };

  const contentParagraphs = generateContent(post.body);

  return (
    <>
      <Navbar />
      <article className="blog-post">
        <div className="blog-post__container">
          <div className="blog-post__header">
            <div className="blog-post__tags">
              <span className="blog-post__tag blog-post__tag--type">
                {translations.typeLabel}
              </span>
              <span className="blog-post__tag blog-post__tag--time">
                {translations.minRead}
              </span>
            </div>

            <h1 className="blog-post__title">{post.title}</h1>

            <p className="blog-post__intro">{firstSentence}</p>
          </div>

          <div className="blog-post__image-section">
            <div className="blog-post__hero">
              <img
                src={postImage}
                alt={post.title}
                className="blog-post__hero-image"
              />
            </div>

            <div className="blog-post__share-wrapper">
              <div className="blog-post__published">
                <span className="blog-post__published-label">
                  {translations.publishedOn}
                </span>
                <span className="blog-post__published-date">{publishDate}</span>
              </div>
              <ShareButtons
                postTitle={post.title}
                copyLinkText={translations.copyLink}
              />
            </div>
          </div>

          <div className="blog-post__content">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index} className="blog-post__paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {relatedPosts.length > 0 && (
            <div className="blog-post__related">
              <h2 className="blog-post__related-title">
                {translations.relatedBlogs}
              </h2>
              <div className="blog-post__related-list">
                {relatedPosts.map((relatedPost) => {
                  const relatedFirstSentence =
                    relatedPost.body.split(". ")[0] + ".";

                  return (
                    <PostCard
                      key={relatedPost.id}
                      id={relatedPost.id}
                      image={relatedPost.image}
                      postType={relatedPost.type}
                      readTime="5 min read"
                      title={relatedPost.title}
                      paragraph={relatedFirstSentence}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
