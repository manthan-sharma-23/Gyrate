import { PiChatCircleBold, PiGlobeHemisphereEast } from "react-icons/pi";
import {
  MessageSquareDot,
  MessagesSquare,
  Search,
  Sun,
  User,
} from "lucide-react";

export const navItems = [
  {
    href: "/global",
    icon: PiGlobeHemisphereEast,
    name: "Global",
  },
  {
    href: "/chat",
    icon: PiChatCircleBold,
    name: "Chat",
  },
];

export const sideIcons = [
  {
    name: "Forums",
    icon: MessagesSquare,
    href: "/global/forums",
  },
  {
    name: "Find mates",
    icon: Search,
    href: "/global/find",
  },
  {
    name: "Events",
    icon: Sun,
    href: "/global/events",
  },
  {
    name: "Invites",
    icon: MessageSquareDot,
    href: "/global/invites",
  },
  {
    name: "Profile",
    icon: User,
    href: "/global/profile",
  },
];
