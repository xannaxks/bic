"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  disabled?: boolean;
}

export function CarouselControls({
  onPrevious,
  onNext,
  disabled = false,
}: CarouselControlsProps) {
  if (disabled) return null;

  return (
    <>
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-4 z-30 -translate-y-1/2 border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/20"
        onClick={onPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-4 z-30 -translate-y-1/2 border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/20"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </>
  );
}
