"use client";

import { useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NavigationMenuDemo } from "./navigation-menu";
import { MobileMenuButton } from "./mobile-menu-button";

export function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { shouldShowNavigation } = useScrollPosition();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className="fixed top-14 right-0 left-0 z-40 transition-all duration-300"
        style={{
          display: shouldShowNavigation ? "block" : "none",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="relative flex h-16 items-center justify-center">
            <NavigationMenuDemo />
            <div className="absolute right-0">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onToggle={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Basic structure for future implementation */}
      {isMobileMenuOpen && shouldShowNavigation && (
        <div
          id="mobile-navigation"
          className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-30 right-0 left-0 z-30 border-t backdrop-blur lg:hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <p className="text-muted-foreground text-sm">
              Mobile menu will be implemented in Epic 3
            </p>
          </div>
        </div>
      )}

      {/* Spacer for fixed navigation - only when navigation is shown */}
      {shouldShowNavigation && <div className="h-16" />}
    </>
  );
}
