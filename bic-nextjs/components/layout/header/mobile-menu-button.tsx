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
      className="text-foreground hover:text-primary hover:bg-accent focus:ring-primary inline-flex items-center justify-center rounded-md p-2 transition-colors duration-200 focus:ring-2 focus:outline-none focus:ring-inset lg:hidden"
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
      aria-controls="mobile-navigation"
    >
      {isOpen ? (
        <X className="h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
}
