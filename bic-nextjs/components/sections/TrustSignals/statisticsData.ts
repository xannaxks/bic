import { Users, Trophy, Globe, Briefcase, LucideIcon } from "lucide-react";

export interface Statistic {
  id: string;
  label: string;
  value: number | string; // Support both numeric and text-based statistics
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
    value: 6000,
    suffix: "+",
    percentage: 85,
    icon: Users,
    color: "text-blue-500",
    description: "Active students across all programs",
  },
  {
    id: "ranking",
    label: "QS Stars Rating",
    value: "5 stars",
    prefix: "",
    percentage: 100,
    icon: Trophy,
    color: "text-yellow-500",
    description: "QS World University Rankings recognition",
  },
  {
    id: "countries",
    label: "International Presence",
    value: 25,
    suffix: "+ Countries",
    percentage: 75,
    icon: Globe,
    color: "text-green-500",
    description: "Students from around the world",
  },
  {
    id: "employment",
    label: "Graduate Employment Rating",
    value: "AAA",
    suffix: "",
    percentage: 95,
    icon: Briefcase,
    color: "text-purple-500",
    description: "In the Korean Ministry of Education's 'University Innovation Support Project' evaluation, the university achieved an 'AAA' rating for two consecutive years — the only institution in the Busan region to do so.",
  },
];
