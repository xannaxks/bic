"use client";

import { Button } from "@/components/ui/button";

interface CarouselIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

export function CarouselIndicators({
  totalSlides,
  currentSlide,
  onSlideSelect,
}: CarouselIndicatorsProps) {
  if (totalSlides <= 1) return null;

  return (
    <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
      <div className="flex gap-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`h-3 w-3 rounded-full p-0 transition-all duration-200 hover-shadow-drop-fast ${
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => onSlideSelect(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
}
