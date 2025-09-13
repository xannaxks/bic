"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSlideData {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
  ctaPrimary?: {
    text: string;
    url: string;
  };
  ctaSecondary?: {
    text: string;
    url: string;
  };
  order: number;
  isActive: boolean;
}

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
  priority?: boolean;
}

export function HeroSlide({
  slide,
  isActive,
  priority = false,
}: HeroSlideProps) {
  return (
    <div
      className={`absolute inset-0 h-full w-full transition-opacity duration-[600ms] ease-in-out ${
        isActive ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
      aria-hidden={!isActive}
    >
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={slide.image.url}
          alt={slide.image.alternativeText}
          fill
          className="object-cover"
          priority={priority}
          sizes="100vw"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent backdrop-blur-[2px]" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            {/* Main Heading */}
            <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight drop-shadow-lg md:text-4xl lg:text-5xl">
              {slide.title}
            </h1>

            {/* Sub-heading */}
            <h2 className="mb-6 text-lg font-medium text-white/90 drop-shadow-md md:text-xl">
              {slide.subtitle}
            </h2>

            {/* Description */}
            {slide.description && (
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 drop-shadow-sm md:text-lg">
                {slide.description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              {slide.ctaPrimary && (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <Link href={slide.ctaPrimary.url}>
                    {slide.ctaPrimary.text}
                  </Link>
                </Button>
              )}

              {slide.ctaSecondary && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white shadow-lg backdrop-blur-sm transition-all duration-150 hover:bg-white hover:text-black hover:shadow-xl"
                >
                  <Link href={slide.ctaSecondary.url}>
                    {slide.ctaSecondary.text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
