"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import PostCard from "@/components/PostCard";
import PostCardSkeleton from "@/components/PostCardSkeleton";
import ErrorState from "@/components/ErrorState";
import { placeholderImages } from "@/assets/PaginationPhotos/HomePhotos";
import "@/styles/pages/homepage.scss";

interface PostWithType {
  id: number;
  title: string;
  body: string;
  userId: number;
  type: string;
  originalIndex: number;
}

interface HomepageClientProps {
  initialPosts: PostWithType[];
  allPosts: PostWithType[];
  selectedTypes: string[];
  searchQuery: string;
  translations: {
    noPostsTitle: string;
    noPostsMessage: string;
    searchNotFoundWithQuery: string;
  };
  isSearchTriggered?: boolean;
  authors: string[];
}

function HomepageClient({
  initialPosts,
  allPosts,
  selectedTypes,
  searchQuery,
  translations,
  isSearchTriggered = false,
  authors,
}: HomepageClientProps) {
  const postsPerPage = 15;

  const [loadedPosts, setLoadedPosts] = useState<PostWithType[]>(
    isSearchTriggered ? [] : initialPosts
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < allPosts.length);
  const [isSearching, setIsSearching] = useState(isSearchTriggered);

  const loadedPostsLengthRef = useRef(loadedPosts.length);
  const loadingRef = useRef(false);

  useEffect(() => {
    loadedPostsLengthRef.current = loadedPosts.length;
  }, [loadedPosts.length]);

  useEffect(() => {
    loadingRef.current = loadingMore;
  }, [loadingMore]);

  useEffect(() => {
    if (isSearchTriggered && isSearching) {
      const timer = setTimeout(() => {
        setLoadedPosts(initialPosts);
        setHasMore(initialPosts.length < allPosts.length);
        setIsSearching(false);

        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.delete("t");
          window.history.replaceState({}, "", url.toString());
        }
      }, 500);
      return () => clearTimeout(timer);
    } else if (!isSearchTriggered) {
      setLoadedPosts(initialPosts);
      setHasMore(initialPosts.length < allPosts.length);
    }
  }, [isSearchTriggered, isSearching, initialPosts, allPosts]);
  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMore) return;

    setLoadingMore(true);
    loadingRef.current = true;

    const currentLength = loadedPostsLengthRef.current;
    const nextPosts = allPosts.slice(
      currentLength,
      currentLength + postsPerPage
    );

    setTimeout(() => {
      setLoadedPosts((prev) => {
        const newPosts = [...prev, ...nextPosts];
        const newHasMore = newPosts.length < allPosts.length;
        setHasMore(newHasMore);
        return newPosts;
      });
      setLoadingMore(false);
      loadingRef.current = false;
    }, 500);
  }, [hasMore, allPosts, postsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const threshold = document.documentElement.offsetHeight - 500;

      if (scrollPosition >= threshold && !loadingRef.current && hasMore) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, hasMore]);

  const renderSkeletons = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <PostCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <div className="homepage">
      <div className="homepage__grid">
        {isSearching ? (
          renderSkeletons(6)
        ) : loadedPosts.length === 0 ? (
          <div className="homepage__empty-state">
            <ErrorState
              type={searchQuery.trim() ? "search-not-found" : "generic"}
              title={searchQuery.trim() ? undefined : translations.noPostsTitle}
              message={
                searchQuery.trim()
                  ? translations.searchNotFoundWithQuery.replace(
                      "[[query]]",
                      searchQuery
                    )
                  : translations.noPostsMessage
              }
              showHomeButton={false}
              showRetryButton={false}
            />
          </div>
        ) : (
          <>
            {loadedPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                image={
                  placeholderImages[post.originalIndex] || placeholderImages[0]
                }
                postType={post.type}
                readTime="5 min read"
                title={post.title}
                paragraph={post.body}
              />
            ))}
            {loadingMore && renderSkeletons(3)}
          </>
        )}
      </div>
    </div>
  );
}

export default HomepageClient;
