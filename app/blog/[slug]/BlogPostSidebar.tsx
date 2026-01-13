import React, { RefObject } from "react";
import Link from "next/link";
import { postTypes } from "@/utils/authorUtils";
import ShareButtons from "@/components/ShareButtons";
import { StaticImageData } from "next/image";

interface Post {
  id: number;
  title: string;
  body: string;
  type: string;
  image: string;
  userId: number;
  slug: string;
}

interface BlogPostSidebarProps {
  postTitle: string;
  translations: {
    copyLink: string;
    minRead: string;
  };
  authorName: string;
  authorImage: StaticImageData;
  featuredPost?: Post;
  recentPosts: Post[];
  authors: string[];
  sidebarRef?: RefObject<HTMLElement | null>;
  sidebarStyle?: React.CSSProperties;
}

const BlogPostSidebar: React.FC<BlogPostSidebarProps> = ({
  postTitle,
  translations,
  authorName,
  authorImage,
  featuredPost,
  recentPosts,
  authors,
  sidebarRef,
  sidebarStyle,
}) => {
  const getAuthorForPost = (type: string) => {
    return authors[postTypes.indexOf(type)] || authors[0];
  };

  return (
    <aside
      className="blog-post__sidebar"
      ref={sidebarRef as React.RefObject<HTMLElement>}
      style={sidebarStyle}
    >
      {/* Share Widget */}
      <div className="blog-post__sidebar-widget">
        <h3 className="blog-post__sidebar-title">Share post</h3>
        <ShareButtons
          postTitle={postTitle}
          copyLinkText={translations.copyLink}
        />
      </div>

      {/* Author Widget */}
      <div className="blog-post__sidebar-widget">
        <h3 className="blog-post__sidebar-title">Author info</h3>
        <div className="blog-post__author-card">
          <img
            src={authorImage.src}
            alt={authorName}
            className="blog-post__author-image"
          />
          <div className="blog-post__author-details">
            <span className="blog-post__author-name-large">{authorName}</span>
            <span className="blog-post__author-role">
              Founder & Editor-In-Chief
            </span>
            <div className="blog-post__author-socials"></div>
          </div>
        </div>
      </div>

      {featuredPost && (
        <div className="blog-post__sidebar-widget">
          <h3 className="blog-post__sidebar-title">Featured post</h3>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="blog-post__featured-card"
          >
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="blog-post__featured-image"
            />
            <div className="blog-post__featured-content">
              <h4 className="blog-post__featured-title">
                {featuredPost.title}
              </h4>
              <div className="blog-post__featured-meta">
                <span>by {getAuthorForPost(featuredPost.type)}</span>
                <span className="blog-post__featured-separator">|</span>
                <span>7 min read</span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Recent Posts Widget */}
      {recentPosts.length > 0 && (
        <div className="blog-post__sidebar-widget">
          <h3 className="blog-post__sidebar-title">Recent posts</h3>
          <ul className="blog-post__recent-list">
            {recentPosts.map((recentPost) => (
              <li key={recentPost.id} className="blog-post__recent-item">
                <Link
                  href={`/blog/${recentPost.slug}`}
                  className="blog-post__recent-link"
                >
                  <h4 className="blog-post__recent-title">
                    {recentPost.title}
                  </h4>
                  <div className="blog-post__recent-meta">
                    <span>by {getAuthorForPost(recentPost.type)}</span>
                    <span className="blog-post__recent-separator">|</span>
                    <span>{(recentPost.id % 5) + 4} min read</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default BlogPostSidebar;
