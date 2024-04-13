import { PiChatCircleBold, PiGlobeHemisphereEast } from "react-icons/pi";
import { MessageSquareDot, MessagesSquare, Search, Sun } from "lucide-react";
import { MdOutlinePerson2 } from "react-icons/md";
import { GiCloudUpload } from "react-icons/gi";
import { AiFillInteraction } from "react-icons/ai";

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
];
export const ProfilePageSideIcons = [
  {
    name: "Account",
    icon: MdOutlinePerson2,
  },
  {
    name: "Uploads",
    icon: GiCloudUpload,
  },
  {
    name: "Interactions",
    icon: AiFillInteraction,
  },
];
