import Link from "next/link";
import { sidebarItems } from "./SidebarData";

export default function Sidebar() {
  return (
    <>
      <aside
        id="sidebar"
        className="fixed z-20 h-full xl:top-0 left-0 xl:pt-16 flex flex-shrink-0 flex-col w-16 xl:w-60 transition-width ease-in-out duration-500"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0 ">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-1 xl:px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 ml-2 pb-2">
                {sidebarItems.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        prefetch={false}
                        href="#"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                      >
                        <div className="w-6 h-6 text-accent-1 flex-shrink-0 group-hover:text-gray-900 transition duration-75">
                          {item.icon}
                        </div>
                        <span className="ml-3 xl:block hidden">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
