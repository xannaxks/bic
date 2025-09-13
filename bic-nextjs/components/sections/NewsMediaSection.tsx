"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlideReveal } from "@/components/SlideReveal";

// Mock data - will be replaced with CMS data
const mockNews = [
  {
    id: "1",
    title: "Tongmyong University Ranks #1 in Regional Innovation Index",
    excerpt:
      "Latest research excellence and innovation initiatives place TU at the forefront of higher education in Busan region.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVwQ7b8HFI4elhssuTUti5BME9cxV8ZR96Q&s",
    date: "2025-01-10",
    category: "University News",
    readTime: "3 min read",
    href: "/news/innovation-ranking",
  },
  {
    id: "2",
    title: "New International Exchange Program with 15 Global Universities",
    excerpt:
      "Expanded partnership opportunities for students to experience world-class education across Asia, Europe, and Americas.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVwQ7b8HFI4elhssuTUti5BME9cxV8ZR96Q&s",
    date: "2025-01-08",
    category: "International",
    readTime: "5 min read",
    href: "/news/exchange-program",
  },
  {
    id: "3",
    title: "State-of-the-Art AI Research Center Opens This Spring",
    excerpt:
      "Cutting-edge facilities and equipment to support next-generation artificial intelligence research and development.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVwQ7b8HFI4elhssuTUti5BME9cxV8ZR96Q&s",
    date: "2025-01-05",
    category: "Research",
    readTime: "4 min read",
    href: "/news/ai-research-center",
  },
];

const mockVideos = [
  {
    id: "1",
    title: "Campus Life at Tongmyong University",
    description: "Discover student life, facilities, and opportunities at TU",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVwQ7b8HFI4elhssuTUti5BME9cxV8ZR96Q&s",
    duration: "3:45",
    href: "/videos/campus-life",
    embedId: "dQw4w9WgXcQ", // Mock YouTube ID
  },
  {
    id: "2",
    title: "Research Excellence and Innovation",
    description:
      "Explore our groundbreaking research projects and achievements",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVwQ7b8HFI4elhssuTUti5BME9cxV8ZR96Q&s",
    duration: "5:20",
    href: "/videos/research-excellence",
    embedId: "dQw4w9WgXcQ", // Mock YouTube ID
  },
];

export function NewsMediaSection() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Latest News & Media</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Stay updated with the latest developments, achievements, and stories
          from our university community
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* News Articles */}
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">University News</h3>
            <Button variant="outline" asChild>
              <Link href="/news">View All News</Link>
            </Button>
          </div>

          <div className="space-y-6">
            {mockNews.map((article, index) => (
              <SlideReveal key={article.id} delay={index * 150}>
                <article
                  className="group bg-card flex flex-col gap-4 rounded-lg border p-4 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hover:scale-[1.015] hover:shadow-xl hover:border-green-500/30 md:flex-row"
                >
                {/* Article Image */}
                <div className="md:w-48 md:flex-shrink-0">
                  <div className="bg-muted relative aspect-video overflow-hidden rounded-md md:aspect-square">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover slow-zoom-image"
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className="flex flex-1 flex-col">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="text-xs transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:bg-green-100 group-hover:text-green-700 dark:group-hover:bg-green-900/30 dark:group-hover:text-green-400"
                    >
                      {article.category}
                    </Badge>
                    <div className="text-muted-foreground flex items-center text-xs transition-colors duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-600 dark:group-hover:text-green-400">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                    <div className="text-muted-foreground flex items-center text-xs transition-colors duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-600 dark:group-hover:text-green-400">
                      <Clock className="mr-1 h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>

                  <h4 className="mb-2 line-clamp-2 text-lg font-semibold">
                    <Link
                      href={article.href}
                      className="transition-colors duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-600 dark:group-hover:text-green-400"
                    >
                      {article.title}
                    </Link>
                  </h4>

                  <p className="text-muted-foreground line-clamp-2 flex-1 text-sm transition-colors duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-700 dark:group-hover:text-green-300">
                    {article.excerpt}
                  </p>

                  <div className="mt-3">
                    <Link
                      href={article.href}
                      className="text-primary text-sm font-medium transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-600 hover:text-green-500 dark:group-hover:text-green-400"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
                </article>
              </SlideReveal>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="lg:col-span-1">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Featured Videos</h3>
            <Button variant="outline" asChild size="sm">
              <Link href="/videos">View All</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {mockVideos.map((video, index) => (
              <SlideReveal key={video.id} delay={index * 150}>
                <div
                  className="group bg-card cursor-pointer overflow-hidden rounded-lg border transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) hover:shadow-2xl hover:scale-[1.015] hover:border-green-500/30"
                >
                <Link href={video.href}>
                  <div className="bg-muted relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover slow-zoom-image-large"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:bg-black/40">
                      <div className="rounded-full bg-white/90 p-3 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-[1.15] hover:bg-white">
                        <Play
                          className="ml-0.5 h-6 w-6 text-black"
                          fill="currentColor"
                        />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute right-2 bottom-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="mb-2 line-clamp-2 font-semibold transition-colors duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-600 dark:group-hover:text-green-400">
                      {video.title}
                    </h4>
                    <p className="text-muted-foreground line-clamp-2 text-sm transition-colors duration-700 cubic-bezier(0.4, 0, 0.2, 1) group-hover:text-green-700 dark:group-hover:text-green-300">
                      {video.description}
                    </p>
                  </div>
                </Link>
                </div>
              </SlideReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
