import {
  GraduationCap,
  BookOpen,
  Globe,
  Users,
  UserCheck,
  Building,
  Newspaper,
  Briefcase,
  LucideIcon,
} from "lucide-react";

export interface QuickAction {
  id: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon;
  href: string;
  external?: boolean;
  color?: string;
}

export const quickActions: QuickAction[] = [
  {
    id: "undergraduate",
    label: "Undergraduate",
    subtitle: "Bachelor Programs",
    icon: GraduationCap,
    href: "/admissions/undergraduate",
  },
  {
    id: "graduate",
    label: "Graduate",
    subtitle: "Master & PhD",
    icon: BookOpen,
    href: "/admissions/graduate",
  },
  {
    id: "international",
    label: "International Students",
    subtitle: "Global Programs",
    icon: Globe,
    href: "/international",
  },
  {
    id: "current",
    label: "Current Students",
    subtitle: "Student Portal",
    icon: Users,
    href: "/students",
  },
  {
    id: "faculty",
    label: "Faculty & Staff",
    subtitle: "Employee Resources",
    icon: UserCheck,
    href: "/faculty-staff",
  },
  {
    id: "about",
    label: "About TU",
    subtitle: "University Info",
    icon: Building,
    href: "/about",
  },
  {
    id: "news",
    label: "News & Events",
    subtitle: "Latest Updates",
    icon: Newspaper,
    href: "/news",
  },
  {
    id: "career",
    label: "Career Services",
    subtitle: "Job Placement",
    icon: Briefcase,
    href: "/career-services",
  },
];
