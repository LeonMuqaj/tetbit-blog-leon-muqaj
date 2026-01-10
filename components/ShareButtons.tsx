"use client";

import React, { useState } from "react";
import CopyLinkIcon from "@/assets/icons/CopyLinkIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import EmailIcon from "@/assets/icons/EmailIcon";

interface ShareButtonsProps {
  postTitle: string;
  copyLinkText: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  postTitle,
  copyLinkText,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyLink = async () => {
    const url = window.location.href;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }
    } catch (err) {
      console.log("Clipboard API failed, using fallback");
    }

    try {
      const textArea = document.createElement("textarea");
      textArea.value = url;

      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);

      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        textArea.setSelectionRange(0, url.length);
      } else {
        textArea.select();
      }

      document.execCommand("copy");
      document.body.removeChild(textArea);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (fallbackErr) {
      console.error("Failed to copy link:", fallbackErr);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <div className="blog-post__share-buttons">
        <button className="blog-post__copy-link-btn" onClick={handleCopyLink}>
          <CopyLinkIcon size={18} />
          <span>{copyLinkText}</span>
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-post__share-icon"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon size={20} />
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-post__share-icon"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon size={20} />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-post__share-icon"
          aria-label="Share on Facebook"
        >
          <FacebookIcon size={20} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-post__share-icon"
          aria-label="Share on Instagram"
        >
          <InstagramIcon size={20} />
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(
            postTitle
          )}&body=${encodeURIComponent(currentUrl)}`}
          className="blog-post__share-icon"
          aria-label="Share via Email"
        >
          <EmailIcon size={20} />
        </a>
      </div>

      <div className={`copy-toast ${showToast ? "copy-toast--visible" : ""}`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>Link copied to your clipboard</span>
      </div>
    </>
  );
};

export default ShareButtons;
