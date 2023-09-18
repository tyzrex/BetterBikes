import Link from "next/link";
import Image from "next/image";
import LogOutButton from "@/app/components/Navbar/LogOut";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <>
      <nav className="bg-white top-0 border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link
                prefetch={false}
                href="/user/dashboard"
                className="text-xl font-bold flex items-center lg:ml-2.5"
              >
                <h1 className="text-2xl font-bold text-main-foreground">
                  BETTER
                  <span className="text-main-accent">B</span>
                  IKES
                </h1>
              </Link>
              <form
                action="#"
                method="GET"
                className="hidden lg:block lg:pl-20"
              >
                <label htmlFor="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="mt-1 relative lg:w-64">
                  <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none"></div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center">
              <button
                id="toggleSidebarMobileSearch"
                type="button"
                className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
              >
                <span className="sr-only">Search</span>
              </button>
              <>
                {session && (
                  <div className="flex-center gap-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        {session?.user?.image ? (
                          <Image
                            src={session?.user?.image}
                            alt="User Image"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        ) : (
                          <>
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                              <span className="text-gray-700 font-medium text-lg leading-none">
                                {session?.user?.name?.charAt(0)}
                              </span>
                            </div>
                          </>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-auto">
                        <DropdownMenuLabel className="flex flex-col">
                          <span>{session?.user?.name}</span>
                          <span>{session?.user?.email}</span>
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem className="md:hidden">
                          <LogOutButton />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <LogOutButton className="accent-btn hidden md:block" />
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
