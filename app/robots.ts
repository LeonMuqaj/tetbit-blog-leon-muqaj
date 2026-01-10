import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checklist/"],
      },
    ],
    sitemap: "https://tetbit-blog.com/sitemap.xml",
  };
}
