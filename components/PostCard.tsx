"use client";

import React from "react";
import { Link } from "@/src/i18n/navigation";
import { useTranslations } from "next-intl";
import "@/styles/components/PostCard.scss";
import ArrowIcon from "@/assets/icons/ArrowIcon";

interface PostCardProps {
  id: number;
  image: string;
  postType: string;
  readTime: string;
  title: string;
  paragraph: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function PostCard({
  id,
  image,
  postType,
  readTime,
  title,
  paragraph,
}: PostCardProps) {
  const t = useTranslations("postCard");
  const slug = generateSlug(title);

  const translatedType = t(`types.${postType}`);

  return (
    <Link href={`/blog/${slug}`} className="post-card-link">
      <div className="post-card">
        <div className="post-card__image-container">
          <img src={image} alt={title} className="post-card__image" />
        </div>

        <div className="post-card__content">
          <div className="post-card__tags">
            <span className="post-card__tag post-card__tag--type">
              {translatedType}
            </span>
            <span className="post-card__tag post-card__tag--time">
              {t("minRead")}
            </span>
          </div>

          <div className="post-card__title-row">
            <h3 className="post-card__title">{title}</h3>
            <ArrowIcon className="post-card__arrow" width={20} height={20} />
          </div>

          <p className="post-card__paragraph">{paragraph}</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
