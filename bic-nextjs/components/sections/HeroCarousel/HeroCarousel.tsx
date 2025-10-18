"use client";

import { useState, useEffect, useCallback } from "react";
import { HeroSlide } from "./HeroSlide";
import { CarouselControls } from "./CarouselControls";
import { CarouselIndicators } from "./CarouselIndicators";

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

// Mock data - will be replaced with CMS data
const mockSlides: HeroSlideData[] = [
  {
    id: "1",
    title: "CREATE POSITIVE CHANGE",
    subtitle: "Leading Innovation in Higher Education",
    description:
      "Join Tongmyong University and be part of a community that shapes the future",
    image: {
      url: "/images/hero/slide1.jpg",
      alternativeText: "Students collaborating on campus",
      width: 1920,
      height: 1080,
    },
    ctaPrimary: {
      text: "Apply Now",
      url: "/admissions",
    },
    ctaSecondary: {
      text: "Learn More",
      url: "/about",
    },
    order: 1,
    isActive: true,
  },
  {
    id: "2",
    title: "EXCELLENCE IN EDUCATION",
    subtitle: "World-Class Faculty and Research",
    description:
      "Discover cutting-edge research and innovative teaching methods",
    image: {
      url: "/images/hero/slide2.jpg",
      alternativeText: "Modern university campus",
      width: 1920,
      height: 1080,
    },
    ctaPrimary: {
      text: "Explore Programs",
      url: "/academics",
    },
    ctaSecondary: {
      text: "Research",
      url: "/research",
    },
    order: 2,
    isActive: true,
  },
  {
    id: "3",
    title: "GLOBAL OPPORTUNITIES",
    subtitle: "International Student Community",
    description: "Connect with students from over 45 countries worldwide",
    image: {
      url: "/images/hero/slide3.jpg",
      alternativeText: "International students on campus",
      width: 1920,
      height: 1080,
    },
    ctaPrimary: {
      text: "International Programs",
      url: "/international",
    },
    ctaSecondary: {
      text: "Student Life",
      url: "/student-life",
    },
    order: 3,
    isActive: true,
  },
  {
    id: "4",
    title: "INNOVATION HUB",
    subtitle: "Technology and Entrepreneurship",
    description:
      "Experience state-of-the-art facilities and startup incubation programs",
    image: {
      url: "/images/hero/slide4.jpg",
      alternativeText: "Innovation and technology center",
      width: 1920,
      height: 1080,
    },
    ctaPrimary: {
      text: "Innovation Center",
      url: "/innovation",
    },
    ctaSecondary: {
      text: "Programs",
      url: "/programs",
    },
    order: 4,
    isActive: true,
  },
  {
    id: "5",
    title: "FUTURE LEADERS",
    subtitle: "Preparing Tomorrow's Innovators",
    description: "95% employment rate with industry-leading career services",
    image: {
      url: "/images/hero/slide5.jpg",
      alternativeText: "Graduates at commencement",
      width: 1920,
      height: 1080,
    },
    ctaPrimary: {
      text: "Career Services",
      url: "/career-services",
    },
    ctaSecondary: {
      text: "Alumni Network",
      url: "/alumni",
    },
    order: 5,
    isActive: true,
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const activeSlides = mockSlides
    .filter((slide) => slide.isActive)
    .sort((a, b) => a.order - b.order);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + activeSlides.length) % activeSlides.length
    );
  }, [activeSlides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying, isPaused]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prevSlide();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextSlide();
        break;
      case "Escape":
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
        break;
    }
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ backgroundColor: '#000000' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero image carousel"
    >
      {/* Slides */}
      {activeSlides.map((slide, index) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          isActive={index === currentSlide}
          priority={index === 0}
        />
      ))}

      {/* Navigation Controls */}
      <CarouselControls
        onPrevious={prevSlide}
        onNext={nextSlide}
        disabled={activeSlides.length <= 1}
      />

      {/* Slide Indicators */}
      <CarouselIndicators
        totalSlides={activeSlides.length}
        currentSlide={currentSlide}
        onSlideSelect={goToSlide}
      />

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {activeSlides.length}:{" "}
        {activeSlides[currentSlide]?.title}
      </div>
    </div>
  );
}
