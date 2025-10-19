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

// Quick Actions - Links to Official TU Website Pages
export const quickActions: QuickAction[] = [
  {
    id: "undergraduate",
    label: "Undergraduate",
    subtitle: "Bachelor Programs",
    icon: GraduationCap,
    href: "https://www.tu.ac.kr/english/sub02_02.do",
    external: true,
  },
  {
    id: "graduate",
    label: "Graduate",
    subtitle: "Master & PhD",
    icon: BookOpen,
    href: "https://www.tu.ac.kr/english/sub02_11_01.do",
    external: true,
  },
  {
    id: "international",
    label: "International Students",
    subtitle: "Global Programs",
    icon: Globe,
    href: "https://www.tu.ac.kr/ic/index.do",
    external: true,
  },
  {
    id: "current",
    label: "Current Students",
    subtitle: "Student Portal",
    icon: Users,
    href: "https://my.tu.ac.kr/por/ln?sso=ok",
    external: true,
  },
  {
    id: "faculty",
    label: "Faculty & Staff",
    subtitle: "Employee Resources",
    icon: UserCheck,
    href: "https://www.tu.ac.kr/ic/sub02_10.do?mode=list&article.offset=0",
    external: true,
  },
  {
    id: "about",
    label: "About TU",
    subtitle: "University Info",
    icon: Building,
    href: "https://www.tu.ac.kr/english/sub01_04.do",
    external: true,
  },
  {
    id: "news",
    label: "News & Events",
    subtitle: "Latest Updates",
    icon: Newspaper,
    href: "https://www.tu.ac.kr/english/sub05_03.do",
    external: true,
  },
  {
    id: "career",
    label: "Career Services",
    subtitle: "Job Placement",
    icon: Briefcase,
    href: "https://www.tu.ac.kr/english/sub05_02.do",
    external: true,
  },
];
