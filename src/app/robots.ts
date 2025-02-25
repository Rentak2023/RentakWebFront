import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile", "/dashboard"],
    },
    sitemap: "https://rentakapp.com/sitemap.xml",
  };
}
