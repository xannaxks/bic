"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NAVIGATION_SECTIONS } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed top-30 right-0 left-0 z-30 border-t backdrop-blur lg:hidden transition-all duration-700 max-h-[calc(100vh-7.5rem)] overflow-y-auto",
        isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <Accordion type="single" collapsible className="w-full">
          {NAVIGATION_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-b border-border/40"
              >
                <AccordionTrigger className="text-base font-semibold min-h-[44px] hover:no-underline hover:bg-accent/50 rounded-md px-3 -mx-3 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{section.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-8 pr-3 space-y-1 pt-2">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block py-3 px-3 rounded-md text-sm min-h-[44px] flex items-center transition-colors duration-300",
                            isActive
                              ? "bg-accent text-accent-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                          )}
                          onClick={onClose}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
