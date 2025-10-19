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
// URL Pattern: https://www.tu.ac.kr/english/sub01_{position}.do
export const aboutTU: NavigationItem[] = [
  {
    title: "Educational Philosophy",
    href: "https://www.tu.ac.kr/english/sub01_01.do",
    description: "Our core educational philosophy and values",
  },
  {
    title: "Vision",
    href: "https://www.tu.ac.kr/english/sub01_02.do",
    description: "Tongmyong University's vision for the future",
  },
  {
    title: "President's Greeting",
    href: "https://www.tu.ac.kr/english/sub01_03.do",
    description: "Welcome message from our university president",
  },
  {
    title: "History",
    href: "https://www.tu.ac.kr/english/sub01_04.do",
    description: "The history and development of Tongmyong University",
  },
  {
    title: "Symbol",
    href: "https://www.tu.ac.kr/english/sub01_05.do",
    description: "University symbol, logo, and brand identity",
  },
  {
    title: "Global Networks",
    href: "https://www.tu.ac.kr/english/sub01_06.do",
    description: "Our international partnerships and global connections",
  },
  {
    title: "Public Relations Videos",
    href: "https://www.tu.ac.kr/english/sub01_07.do",
    description: "Promotional videos and multimedia content",
  },
  {
    title: "Campus Map",
    href: "https://www.tu.ac.kr/english/sub01_08.do",
    description: "Navigate our campus with interactive maps",
  },
  {
    title: "TU School Shuttle Bus Schedule",
    href: "https://www.tu.ac.kr/english/sub01_09.do",
    description: "School shuttle bus routes and timetables",
  },
];

// Admission Navigation Items
// URL Pattern: https://www.tu.ac.kr/english/sub02_{position}.do
export const admission: NavigationItem[] = [
  {
    title: "Admission Office / Contact Us",
    href: "https://www.tu.ac.kr/english/sub02_01.do",
    description: "Get in touch with our admission office",
  },
  {
    title: "Undergraduate Admissions",
    href: "https://www.tu.ac.kr/english/sub02_02.do",
    description: "Information for prospective undergraduate students",
  },
  {
    title: "Graduate School",
    href: "https://www.tu.ac.kr/english/sub02_03.do",
    description: "Apply for graduate programs and advanced degrees",
  },
  {
    title: "Tuition",
    href: "https://www.tu.ac.kr/english/sub02_04.do",
    description: "Tuition fees and payment information",
  },
  {
    title: "Scholarships",
    href: "https://www.tu.ac.kr/english/sub02_05.do",
    description: "Scholarship opportunities and financial assistance",
  },
  {
    title: "Admission Guideline",
    href: "https://www.tu.ac.kr/english/sub02_06.do",
    description: "Complete guide to the admission process",
  },
  {
    title: "Global Education Center",
    href: "https://www.tu.ac.kr/english/sub02_07.do",
    description: "International education programs and support",
  },
  {
    title: "Dormitory",
    href: "https://www.tu.ac.kr/english/sub02_08.do",
    description: "On-campus housing and dormitory information",
  },
];

// Academics Navigation Items
// URL Pattern: https://www.tu.ac.kr/english/sub03_{position}.do
export const academics: NavigationItem[] = [
  {
    title: "College of ICT Convergence",
    href: "https://www.tu.ac.kr/english/sub03_01.do",
    description: "Information and Communication Technology programs",
  },
  {
    title: "College of Companion Animal",
    href: "https://www.tu.ac.kr/english/sub03_02.do",
    description: "Companion animal care and veterinary programs",
  },
  {
    title: "College of Business Administration",
    href: "https://www.tu.ac.kr/english/sub03_03.do",
    description: "Business, management, and entrepreneurship programs",
  },
  {
    title: "College of Health, Welfare and Education",
    href: "https://www.tu.ac.kr/english/sub03_04.do",
    description: "Health sciences, social welfare, and education programs",
  },
  {
    title: "College of Beauty Art",
    href: "https://www.tu.ac.kr/english/sub03_05.do",
    description: "Beauty, cosmetics, and aesthetic arts programs",
  },
  {
    title: "College of Architecture and Design",
    href: "https://www.tu.ac.kr/english/sub03_06.do",
    description: "Architecture, interior design, and urban planning",
  },
  {
    title: "College of Media",
    href: "https://www.tu.ac.kr/english/sub03_07.do",
    description: "Media, broadcasting, and communication programs",
  },
  {
    title: "College of Future Multidisciplinary Studies",
    href: "https://www.tu.ac.kr/english/sub03_08.do",
    description: "Interdisciplinary and future-oriented programs",
  },
  {
    title: "Busan International College",
    href: "https://www.tu.ac.kr/english/sub03_09.do",
    description: "International programs and global education",
  },
];

// Special Joint Program Navigation Items
// URL Pattern: https://www.tu.ac.kr/english/sub04_{position}.do
export const specialJointProgram: NavigationItem[] = [
  {
    title: "Huanghuai University China",
    href: "https://www.tu.ac.kr/english/sub04_01.do",
    description: "Joint program with Huanghuai University in China",
  },
  {
    title: "HCMUT VN",
    href: "https://www.tu.ac.kr/english/sub04_02.do",
    description: "Partnership with Ho Chi Minh City University of Technology",
  },
  {
    title: "VLUTE VN",
    href: "https://www.tu.ac.kr/english/sub04_03.do",
    description: "Collaboration with Vietnam-Korea University of ICT",
  },
  {
    title: "HCMUTE VN",
    href: "https://www.tu.ac.kr/english/sub04_04.do",
    description:
      "Partnership with Ho Chi Minh City University of Technology and Education",
  },
  {
    title: "International Track",
    href: "https://www.tu.ac.kr/english/sub04_05.do",
    description: "International track programs and opportunities",
  },
  {
    title: "Campus Activities of INTL. Students",
    href: "https://www.tu.ac.kr/english/sub04_06.do",
    description: "Activities and events for international students",
  },
];

// International Student Support Navigation Items
// URL Pattern: https://www.tu.ac.kr/english/sub05_{position}.do
export const internationalSupport: NavigationItem[] = [
  {
    title: "Main Library",
    href: "https://www.tu.ac.kr/english/sub05_01.do",
    description: "Access library resources and study facilities",
  },
  {
    title: "TU Career Support",
    href: "https://www.tu.ac.kr/english/sub05_02.do",
    description: "Career guidance and job placement services",
  },
  {
    title: "News and Events",
    href: "https://www.tu.ac.kr/english/sub05_03.do",
    description: "Latest news and upcoming events for students",
  },
  {
    title: "Busan is Good",
    href: "https://www.tu.ac.kr/english/sub05_04.do",
    description: "Discover the city of Busan and local attractions",
  },
  {
    title: "Student Support and Advocacy Center",
    href: "https://www.tu.ac.kr/english/sub05_05.do",
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
