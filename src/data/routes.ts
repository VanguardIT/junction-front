import { Home, BarChart3 } from "lucide-react";

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
];
