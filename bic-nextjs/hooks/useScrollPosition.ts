"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollState {
  scrollY: number;
  shouldShowNavigation: boolean;
}

// Unused throttle function removed - using inline throttling in the component instead

export function useScrollPosition(): ScrollState {
  const [scrollY, setScrollY] = useState(0);
  const [hasHydrated, setHasHydrated] = useState(false);
  const throttleRef = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    if (!hasHydrated) return;

    const currentScrollY = window.scrollY;

    // Always update immediately when reaching top (scrollY = 0)
    if (currentScrollY === 0) {
      setScrollY(currentScrollY);
      return;
    }

    // Throttle other scroll updates
    if (!throttleRef.current) {
      setScrollY(currentScrollY);
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 100);
    }
  }, [hasHydrated]);

  useEffect(() => {
    // Delay hydration to prevent mismatch
    const timer = setTimeout(() => {
      setHasHydrated(true);
      setScrollY(window.scrollY);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, hasHydrated]);

  return {
    scrollY,
    shouldShowNavigation: hasHydrated && scrollY > 0,
  };
}
