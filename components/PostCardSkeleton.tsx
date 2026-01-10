"use client";

import React from "react";
import "@/styles/components/PostCardSkeleton.scss";

function PostCardSkeleton() {
  return (
    <div className="post-card-skeleton">
      <div className="post-card-skeleton__image-container">
        <div className="post-card-skeleton__image" />
      </div>

      <div className="post-card-skeleton__content">
        <div className="post-card-skeleton__tags">
          <div className="post-card-skeleton__tag post-card-skeleton__tag--type" />
          <div className="post-card-skeleton__tag post-card-skeleton__tag--time" />
        </div>

        <div className="post-card-skeleton__title-row">
          <div className="post-card-skeleton__title" />
        </div>

        <div className="post-card-skeleton__paragraph">
          <div className="post-card-skeleton__line" />
          <div className="post-card-skeleton__line post-card-skeleton__line--short" />
        </div>
      </div>
    </div>
  );
}

export default PostCardSkeleton;
