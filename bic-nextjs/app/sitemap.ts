import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tongmyong.ac.kr";

  // Define supported locales
  const locales = ["en", "ko", "zh"];

  // Define main routes with their properties
  const routes = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "daily" as const,
    },
    {
      path: "/about",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/admissions",
      priority: 0.9,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/admissions/undergraduate",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/admissions/graduate",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/international",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/academics",
      priority: 0.8,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/academics/programs",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/academics/colleges",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/student-life",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/research",
      priority: 0.7,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/news",
      priority: 0.6,
      changeFrequency: "daily" as const,
    },
    {
      path: "/career-services",
      priority: 0.6,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/faculty-staff",
      priority: 0.5,
      changeFrequency: "monthly" as const,
    },
  ];

  // Generate sitemap entries for all routes and locales
  const sitemapEntries = routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );

  // Add default language entries (without locale prefix)
  const defaultEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...defaultEntries, ...sitemapEntries];
}
