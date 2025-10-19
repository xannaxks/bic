"use client";

import { useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NavigationMenuDemo } from "./navigation-menu";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileMenu } from "./mobile-menu";

export function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { shouldShowNavigation } = useScrollPosition();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

      {/* Mobile Menu with Accordion Navigation */}
      {shouldShowNavigation && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
      )}

      {/* Spacer for fixed navigation - smooth transition */}
      <div
        className="transition-all duration-500 ease-in-out"
        style={{ height: shouldShowNavigation ? "64px" : "0px" }}
      />
    </>
  );
}
