"use client";

import { usePathname } from "next/navigation";
import { AiOutlineRight } from "react-icons/ai";

export default function BreadCrumbs() {
  const path = usePathname();
  const arr = path.split("/");

  return (
    <nav className="max-w-layout">
      {arr.map((item, index) => {
        if (item === "") {
          return (
            <span key={index} className="text-gray-400 mr-2">
              Home
            </span>
          );
        } else {
          return (
            <span key={index} className="text-gray-400">
              <AiOutlineRight className="inline-block" /> {item}
            </span>
          );
        }
      })}
    </nav>
  );
}
