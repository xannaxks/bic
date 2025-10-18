"use client";

import * as React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Building2,
  BookOpen,
  Globe,
  Users,
} from "lucide-react";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

// Navigation data structure
const aboutTU = [
  {
    title: "Educational Philosophy",
    href: "/about/philosophy",
    description: "Our core educational philosophy and values",
  },
  {
    title: "Vision",
    href: "/about/vision",
    description: "Tongmyong University's vision for the future",
  },
  {
    title: "President's Greeting",
    href: "/about/president",
    description: "Welcome message from our university president",
  },
  {
    title: "History",
    href: "/about/history",
    description: "The history and development of Tongmyong University",
  },
  {
    title: "Symbol",
    href: "/about/symbol",
    description: "University symbol, logo, and brand identity",
  },
  {
    title: "Global Networks",
    href: "/about/global-networks",
    description: "Our international partnerships and global connections",
  },
  {
    title: "Public Relations Videos",
    href: "/about/videos",
    description: "Promotional videos and multimedia content",
  },
  {
    title: "Campus Map",
    href: "/about/campus-map",
    description: "Navigate our campus with interactive maps",
  },
  {
    title: "TU School Shuttle Bus Schedule",
    href: "/about/shuttle",
    description: "School shuttle bus routes and timetables",
  },
];

const admission = [
  {
    title: "Admission Office / Contact Us",
    href: "/admission/contact",
    description: "Get in touch with our admission office",
  },
  {
    title: "Undergraduate Admissions",
    href: "/admission/undergraduate",
    description: "Information for prospective undergraduate students",
  },
  {
    title: "Graduate School",
    href: "/admission/graduate",
    description: "Apply for graduate programs and advanced degrees",
  },
  {
    title: "Tuition",
    href: "/admission/tuition",
    description: "Tuition fees and payment information",
  },
  {
    title: "Scholarships",
    href: "/admission/scholarships",
    description: "Scholarship opportunities and financial assistance",
  },
  {
    title: "Admission Guideline",
    href: "/admission/guideline",
    description: "Complete guide to the admission process",
  },
  {
    title: "Global Education Center",
    href: "/admission/global-education",
    description: "International education programs and support",
  },
  {
    title: "Dormitory",
    href: "/admission/dormitory",
    description: "On-campus housing and dormitory information",
  },
];

const academics = [
  {
    title: "College of ICT Convergence",
    href: "/academics/ict-convergence",
    description: "Information and Communication Technology programs",
  },
  {
    title: "College of Companion Animal",
    href: "/academics/companion-animal",
    description: "Companion animal care and veterinary programs",
  },
  {
    title: "College of Business Administration",
    href: "/academics/business",
    description: "Business, management, and entrepreneurship programs",
  },
  {
    title: "College of Health, Welfare and Education",
    href: "/academics/health-welfare-education",
    description: "Health sciences, social welfare, and education programs",
  },
  {
    title: "College of Beauty Art",
    href: "/academics/beauty-art",
    description: "Beauty, cosmetics, and aesthetic arts programs",
  },
  {
    title: "College of Architecture and Design",
    href: "/academics/architecture-design",
    description: "Architecture, interior design, and urban planning",
  },
  {
    title: "College of Media",
    href: "/academics/media",
    description: "Media, broadcasting, and communication programs",
  },
  {
    title: "College of Future Multidisciplinary Studies",
    href: "/academics/future-studies",
    description: "Interdisciplinary and future-oriented programs",
  },
  {
    title: "Busan International College",
    href: "/academics/busan-international",
    description: "International programs and global education",
  },
];

const specialJointProgram = [
  {
    title: "Huanghuai University China",
    href: "/special-joint-program/huanghuai",
    description: "Joint program with Huanghuai University in China",
  },
  {
    title: "HCMUT VN",
    href: "/special-joint-program/hcmut",
    description: "Partnership with Ho Chi Minh City University of Technology",
  },
  {
    title: "VLUTE VN",
    href: "/special-joint-program/vlute",
    description: "Collaboration with Vietnam-Korea University of ICT",
  },
  {
    title: "HCMUTE VN",
    href: "/special-joint-program/hcmute",
    description: "Partnership with Ho Chi Minh City University of Technology and Education",
  },
  {
    title: "International Track",
    href: "/special-joint-program/international-track",
    description: "International track programs and opportunities",
  },
  {
    title: "Campus Activities of INTL. Students",
    href: "/special-joint-program/campus-activities",
    description: "Activities and events for international students",
  },
];

const internationalSupport = [
  {
    title: "Main Library",
    href: "/international/library",
    description: "Access library resources and study facilities",
  },
  {
    title: "TU Career Support",
    href: "/international/career",
    description: "Career guidance and job placement services",
  },
  {
    title: "News and Events",
    href: "/international/news",
    description: "Latest news and upcoming events for students",
  },
  {
    title: "Busan is Good",
    href: "/international/busan",
    description: "Discover the city of Busan and local attractions",
  },
  {
    title: "Student Support and Advocacy Center",
    href: "/international/support-center",
    description: "Comprehensive support services for all students",
  },
];

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
              {/* About TU */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>About TU</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 rounded-md bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                    {aboutTU.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={Building2}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Admission */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Admission</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 rounded-md bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                    {admission.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={GraduationCap}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Academics */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 rounded-md bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                    {academics.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={BookOpen}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Special Joint Program */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Special Joint Program
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 rounded-md bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                    {specialJointProgram.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={Globe}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* International Student Support */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  International Student Support
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 rounded-md bg-white p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-slate-900">
                    {internationalSupport.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={Users}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenuPrimitive.Root>
        </div>
      </div>
    </nav>
  );
}
