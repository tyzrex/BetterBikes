import { AiOutlineSetting } from "react-icons/ai";
import {
  BiSolidDashboard,
  BiCategory,
  BiUserCircle,
  BiLogoMessenger,
} from "react-icons/bi";
import { BsCartDash } from "react-icons/bs";
import { PiPersonSimpleBikeFill, PiMessengerLogo } from "react-icons/pi";

interface ISidebarItem {
  icon: JSX.Element;
  label: string;
  href: string;
  rightIcon?: JSX.Element;
}

export const sidebarItems: ISidebarItem[] = [
  {
    icon: <BiCategory className="w-6 h-6 text-main-accent" />,
    label: "Dasboard",
    href: "/user/dashboard",
  },
  {
    icon: <PiPersonSimpleBikeFill className="w-6 h-6 text-main-accent" />,
    label: "List Vehicle",
    href: "/user/listvehicle",
  },
  {
    icon: <BiCategory className="w-6 h-6 text-main-accent" />,
    label: "My Vehicles",
    href: "/user/dashboard/Listings",
  },
  {
    icon: <BsCartDash className="w-6 h-6 text-main-accent" />,
    label: "Rent Requests",
    href: "/user/rent-requests",
  },
  {
    icon: <PiMessengerLogo className="w-6 h-6 text-main-accent" />,
    label: "Messenger",
    href: "/user/messenger",
  },
  {
    icon: <BiUserCircle className="w-6 h-6 text-main-accent" />,
    label: "Explore",
    href: "/user/dashboard/explore",
  },
  {
    icon: <AiOutlineSetting className="w-6 h-6 text-main-accent" />,
    label: "Settings",
    href: "/dashboard/settings",
  },
];
