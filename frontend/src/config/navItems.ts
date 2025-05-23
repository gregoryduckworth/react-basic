import { Dashboard, Person, Settings } from "@mui/icons-material";
import React, { ReactNode } from "react";

export interface NavItem {
  labelKey: string;
  href: string;
  icon: ReactNode;
  match: string[];
}

export const navItems: NavItem[] = [
  {
    labelKey: "dashboard.dashboard_title",
    href: "/dashboard",
    icon: React.createElement(Dashboard, { fontSize: "small" }),
    match: ["/dashboard"],
  },
  {
    labelKey: "profile.profile_title",
    href: "/profile",
    icon: React.createElement(Person, { fontSize: "small" }),
    match: ["/profile"],
  },
  {
    labelKey: "settings.settings_title",
    href: "/settings",
    icon: React.createElement(Settings, { fontSize: "small" }),
    match: ["/settings"],
  },
];
