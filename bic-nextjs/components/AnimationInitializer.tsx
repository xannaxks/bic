"use client";

import { useEffect } from "react";

export function AnimationInitializer() {
  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          // Optional: unobserve after animation to improve performance
          if (entry.target.classList.contains("animate-once")) {
            observer.unobserve(entry.target);
          }
        } else if (!entry.target.classList.contains("animate-once")) {
          entry.target.classList.remove("in-view");
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    // Add stagger delay to children
    const staggerContainers = document.querySelectorAll(".stagger-children");
    staggerContainers.forEach((container) => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        (child as HTMLElement).style.animationDelay = `${index * 100}ms`;
      });
    });

    // Cleanup
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}
