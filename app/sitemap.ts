import { MetadataRoute } from "next";

const BASE_URL = "https://tetbit-blog.com";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/de`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=75",
      { cache: "no-store" }
    );
    if (response.ok) {
      const posts: { id: number; title: string }[] = await response.json();
      blogPosts = posts.flatMap((post) => {
        const slug = generateSlug(post.title);
        return [
          {
            url: `${BASE_URL}/en/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          {
            url: `${BASE_URL}/de/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
        ];
      });
    }
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
  }

  return [...staticPages, ...blogPosts];
}
