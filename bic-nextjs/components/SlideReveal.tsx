'use client';

import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function SlideReveal({
  children,
  className,
  delay = 0,
  stagger = false
}: SlideRevealProps) {
  const { ref, isInView } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const baseClass = stagger ? 'slide-top-stagger' : 'slide-top-scroll';

  return (
    <div
      ref={ref}
      className={cn(
        baseClass,
        isInView && 'in-view',
        className
      )}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}