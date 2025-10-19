"use client";

import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="text-foreground hover:text-primary hover:bg-accent focus:ring-primary inline-flex items-center justify-center rounded-md p-2 transition-all duration-300 focus:ring-2 focus:outline-none focus:ring-inset lg:hidden"
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
      aria-controls="mobile-navigation"
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center">
        <Menu
          className={`h-6 w-6 absolute transition-all duration-500 ${
            isOpen
              ? 'opacity-0 scale-0 rotate-90'
              : 'opacity-100 scale-100 rotate-0'
          }`}
          aria-hidden="true"
        />
        <X
          className={`h-6 w-6 absolute transition-all duration-500 ${
            isOpen
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-0 rotate-90'
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
