import { HiOutlineHome } from "react-icons/hi";
import { GrNotes } from "react-icons/gr";
import { BsCalculator } from "react-icons/bs";

import { BiMobileAlt } from "react-icons/bi";

export const Navlinks: any[] = [
  {
    name: "Home",
    href: "/",
    icon: <HiOutlineHome className="w-6 h-6" />,
  },
  {
    name: "Rent Bikes",
    href: "/explore",
    icon: <GrNotes className="w-6 h-6" />,
  },
  {
    name: "List Vehicle",
    href: "/listvehicle",
    icon: <BsCalculator className="w-6 h-6" />,
  },
  {
    name: "About",
    href: "/about",
    icon: <BiMobileAlt className="w-6 h-6" />,
  },
];
