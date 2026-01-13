import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomepageClient from "@/components/HomepageClient";
import Navbar from "@/components/navbar";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostWithType extends Post {
  type: string;
  originalIndex: number;
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
    categories?: string;
    search?: string;
    t?: string;
  }>;
}

import { fetchAuthors, postTypes } from "@/utils/authorUtils";

const totalPostsLimit = 75;
const postsPerPage = 15;

async function fetchPosts(): Promise<PostWithType[]> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${totalPostsLimit}`,
      { cache: "no-store" }
    );
    if (response.ok) {
      const posts: Post[] = await response.json();

      return posts.map((post, index) => ({
        ...post,
        type: postTypes[index % postTypes.length],
        originalIndex: index,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }
  return [];
}

export default async function Home({ searchParams }: PageProps) {
  const queryParams = await searchParams;

  const selectedTypes = queryParams.categories
    ? queryParams.categories.split(",")
    : [];
  const searchQuery = queryParams.search || "";
  const isSearchTriggered = !!queryParams.t;

  const allPostsWithTypes = (await fetchPosts()).reverse();
  const authors = await fetchAuthors();

  let filteredPosts =
    selectedTypes.length === 0
      ? allPostsWithTypes
      : allPostsWithTypes.filter((post) => selectedTypes.includes(post.type));

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredPosts = filteredPosts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }

  const initialPosts = filteredPosts.slice(0, postsPerPage);

  const translations = {
    noPostsTitle: "No Posts Available",
    noPostsMessage: "There are no posts matching your selected filters.",
    searchNotFoundWithQuery: `No posts found for "[[query]]". Try different keywords.`,
  };

  return (
    <>
      <Navbar />
      <Hero selectedTypes={selectedTypes} />
      <HomepageClient
        key={`${selectedTypes.join(",")}-${searchQuery}-${queryParams.t || ""}`}
        initialPosts={initialPosts}
        allPosts={filteredPosts}
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        translations={translations}
        isSearchTriggered={isSearchTriggered}
        authors={authors}
      />
      <Footer />
    </>
  );
}
