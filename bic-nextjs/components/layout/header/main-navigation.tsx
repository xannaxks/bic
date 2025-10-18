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
        className={`fixed top-14 right-0 left-0 z-40 w-full bg-transparent backdrop-blur border-b transition-all duration-500 ease-in-out ${
          shouldShowNavigation
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full px-6">
          <div className="relative flex h-16 items-center justify-center">
            <NavigationMenuDemo />
            <div className="absolute right-6">
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onToggle={toggleMobileMenu}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Basic structure for future implementation */}
      <div
        id="mobile-navigation"
        className={`bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-30 right-0 left-0 z-30 border-t backdrop-blur lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen && shouldShowNavigation
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <p className="text-muted-foreground text-sm">
            Mobile menu will be implemented in Epic 3
          </p>
        </div>
      </div>

      {/* Spacer for fixed navigation - smooth transition */}
      <div
        className="transition-all duration-500 ease-in-out"
        style={{ height: shouldShowNavigation ? "64px" : "0px" }}
      />
    </>
  );
}
