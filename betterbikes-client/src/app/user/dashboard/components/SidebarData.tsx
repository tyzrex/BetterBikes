import { AiOutlineSetting } from "react-icons/ai";
import { BiSolidDashboard, BiCategory, BiUserCircle } from "react-icons/bi";
import { BsBox, BsCartDash } from "react-icons/bs";

interface ISidebarItem {
  icon: JSX.Element;
  label: string;
  href: string;
  rightIcon?: JSX.Element;
}

export const sidebarItems: ISidebarItem[] = [
  {
    icon: <BiSolidDashboard className="w-6 h-6" />,
    label: "Dasboard",
    href: "/dashboard",
  },
  {
    icon: <BsBox className="w-6 h-6" />,
    label: "Products",
    href: "/dashboard/products",
  },
  {
    icon: <BiCategory className="w-6 h-6" />,
    label: "Categories",
    href: "/dashboard/categories",
  },
  {
    icon: <BsCartDash className="w-6 h-6" />,
    label: "Orders",
    href: "/dashboard/orders",
  },
  {
    icon: <BiUserCircle className="w-6 h-6" />,
    label: "Users",
    href: "/dashboard/users",
  },
  {
    icon: <AiOutlineSetting className="w-6 h-6" />,
    label: "Settings",
    href: "/dashboard/settings",
  },
];
