import { AiOutlineSetting } from "react-icons/ai";
import { BiSolidDashboard, BiCategory, BiUserCircle } from "react-icons/bi";
import { BsCartDash } from "react-icons/bs";
import { PiPersonSimpleBikeFill } from "react-icons/pi";
interface ISidebarItem {
  icon: JSX.Element;
  label: string;
  href: string;
  rightIcon?: JSX.Element;
}

export const sidebarItems: ISidebarItem[] = [
  {
    icon: <BiCategory className="w-6 h-6" />,
    label: "Dasboard",
    href: "/user/dashboard",
  },
  {
    icon: <PiPersonSimpleBikeFill className="w-6 h-6" />,
    label: "List Vehicle",
    href: "/user/listvehicle",
  },
  {
    icon: <BiCategory className="w-6 h-6" />,
    label: "My Vehicles",
    href: "/user/dashboard/Listings",
  },
  {
    icon: <BsCartDash className="w-6 h-6" />,
    label: "Rent Requests",
    href: "/user/dashboard/Bookings",
  },
  {
    icon: <BsCartDash className="w-6 h-6" />,
    label: "My Bookings",
    href: "/user/dashboard/Bookings",
  },
  {
    icon: <BiUserCircle className="w-6 h-6" />,
    label: "Explore",
    href: "/user/dashboard/explore",
  },
  {
    icon: <AiOutlineSetting className="w-6 h-6" />,
    label: "Settings",
    href: "/dashboard/settings",
  },
];
