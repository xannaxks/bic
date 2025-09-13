"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useSmoothScroll, useReducedMotion } from "@/hooks/useSmoothScroll";

export function BackToTopButton() {
  const { isVisible } = useScrollPosition(300);
  const { scrollToTop } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    scrollToTop();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`bg-primary text-primary-foreground focus:ring-primary fixed right-6 bottom-6 z-50 rounded-full p-3 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:outline-none md:right-8 md:bottom-8 ${prefersReducedMotion ? "transition-none" : ""} ${
        isVisible
          ? prefersReducedMotion
            ? "opacity-100"
            : "animate-in fade-in-0 zoom-in-95 scale-100 opacity-100"
          : prefersReducedMotion
            ? "opacity-0"
            : "animate-out fade-out-0 zoom-out-95 scale-95 opacity-0"
      } `}
      size="icon"
      aria-label="Scroll to top of page"
      title="Back to top"
    >
      <ChevronUp className="h-5 w-5" />
    </Button>
  );
}
