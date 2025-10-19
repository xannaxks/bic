"use client";

import * as React from "react";
import Link from "next/link";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { NAVIGATION_SECTIONS } from "@/lib/constants/navigation";

function ListItem({
  title,
  href,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-md p-3 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-100 hover:shadow-md dark:hover:bg-slate-800"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-green-600" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function NavigationMenuDemo() {
  return (
    <nav
      className="relative hidden w-full lg:block"
      aria-label="Main navigation"
      role="navigation"
    >
      <div className="relative flex h-16 w-full items-center justify-center">
        {/* Centered navigation menu */}
        <div>
          <NavigationMenuPrimitive.Root className="relative z-10 flex max-w-max flex-1 items-center justify-center">
            <NavigationMenuList>
              {NAVIGATION_SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <NavigationMenuItem key={section.id}>
                    <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 rounded-md bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                        {section.items.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                            icon={Icon}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenuPrimitive.Root>
        </div>
      </div>
    </nav>
  );
}
