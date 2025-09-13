"use client";

import { useCallback, useEffect, useState } from "react";

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function useSmoothScroll() {
  const scrollToTop = useCallback(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToElement = useCallback((elementId: string, offset = 80) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const targetPosition = element.offsetTop - offset;

    if (reducedMotion) {
      window.scrollTo(0, targetPosition);
      return;
    }

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      scrollToElement(sectionId);

      // Update URL without triggering page reload
      if (window.history.pushState) {
        window.history.pushState({}, "", `#${sectionId}`);
      }
    },
    [scrollToElement]
  );

  return { scrollToTop, scrollToElement, scrollToSection };
}
