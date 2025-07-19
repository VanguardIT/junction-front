import { Home, BarChart3, AlertTriangle, FileText } from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    isActive: true,
  },
  {
    title: "Ponds Management",
    url: "/dashboard/ponds",
    icon: BarChart3,
    isActive: false,
  },
  {
    title: "Alerts",
    url: "/dashboard/alerts",
    icon: AlertTriangle,
    isActive: false,
  },
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: FileText,
    isActive: false,
  },
];
