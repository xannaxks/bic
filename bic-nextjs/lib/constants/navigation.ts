import {
  GraduationCap,
  Building2,
  BookOpen,
  Globe,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface NavigationSection {
  id: string;
  title: string;
  icon: LucideIcon;
  items: NavigationItem[];
}

// About TU Navigation Items
export const aboutTU: NavigationItem[] = [
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

// Admission Navigation Items
export const admission: NavigationItem[] = [
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

// Academics Navigation Items
export const academics: NavigationItem[] = [
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

// Special Joint Program Navigation Items
export const specialJointProgram: NavigationItem[] = [
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
    description:
      "Partnership with Ho Chi Minh City University of Technology and Education",
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

// International Student Support Navigation Items
export const internationalSupport: NavigationItem[] = [
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

// Complete Navigation Structure
export const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    id: "about",
    title: "About TU",
    icon: Building2,
    items: aboutTU,
  },
  {
    id: "admission",
    title: "Admission",
    icon: GraduationCap,
    items: admission,
  },
  {
    id: "academics",
    title: "Academics",
    icon: BookOpen,
    items: academics,
  },
  {
    id: "special-joint-program",
    title: "Special Joint Program",
    icon: Globe,
    items: specialJointProgram,
  },
  {
    id: "international",
    title: "International Student Support",
    icon: Users,
    items: internationalSupport,
  },
];
