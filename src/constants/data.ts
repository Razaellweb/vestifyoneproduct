import { SideBarItem } from "@/types";
export const navItems: SideBarItem[] = [
  { title: "Overview", url: "/dashboard", icon: "dashboard", isActive: true },
  { title: "Savings", url: "/dashboard/savings", icon: "product" },
  { title: "Investments", url: "/dashboard/investments", icon: "pizza" },
  { title: "Loans", url: "/dashboard/loans", icon: "billing" },
  { title: "Groups", url: "/dashboard/groups", icon: "user2" },
  { title: "Settings", url: "/dashboard/settings", icon: "settings" },
];
