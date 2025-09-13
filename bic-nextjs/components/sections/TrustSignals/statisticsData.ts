import { Users, Trophy, Globe, Briefcase, LucideIcon } from "lucide-react";

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  percentage: number;
  icon: LucideIcon;
  color: string;
  description?: string;
}

export const statisticsData: Statistic[] = [
  {
    id: "students",
    label: "Students Enrolled",
    value: 15000,
    suffix: "+",
    percentage: 85,
    icon: Users,
    color: "text-blue-500",
    description: "Active students across all programs",
  },
  {
    id: "ranking",
    label: "Ranking in Busan",
    value: 1,
    prefix: "#",
    percentage: 100,
    icon: Trophy,
    color: "text-yellow-500",
    description: "Leading university in the region",
  },
  {
    id: "countries",
    label: "International Presence",
    value: 45,
    suffix: "+ Countries",
    percentage: 75,
    icon: Globe,
    color: "text-green-500",
    description: "Students from around the world",
  },
  {
    id: "employment",
    label: "Employment Rate",
    value: 95,
    suffix: "%",
    percentage: 95,
    icon: Briefcase,
    color: "text-purple-500",
    description: "Graduates employed within 6 months",
  },
];
