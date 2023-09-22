import Link from "next/link";
import { Navlinks } from "./Navbardata";

import MobileMenu from "./MobileMenu";
import { getServerSession } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import LogOutButton from "./LogOut";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className="bg-white py-4">
      <div
        id="navbar"
        className="relative z-1 justify-center items-center text-main-foreground py-2 hidden lg:flex"
      >
        <div className="max-w-layout flex justify-center w-full items-center">
          <div className="flex justify-between items-center w-full">
            <div className="logo flex justify-center items-center gap-4">
              <Link prefetch={false} href="/">
                <h1 className="text-2xl font-bold text-main-foreground">
                  BETTER
                  <span className="text-main-accent">B</span>
                  IKES
                </h1>
              </Link>
            </div>

            <div
              className="menu-items 
            flex justify-center items-center gap-7 "
            >
              <div className="hidden lg:flex justify-center items-center gap-8 cursor-pointer top-0 ">
                {Navlinks?.map((item: any, index: number) => {
                  return (
                    <Link prefetch={false} href={item.href} key={index}>
                      <div
                        className="font-medium text-md lg:text-lg text-gray-700 hover:text-accent-1 color-transition rounded-lg transition duration-300 ease-in-out nav-links
                        "
                      >
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {session ? (
              <>
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
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={"/user/dashboard"}>
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOutButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="font-medium flex-center gap-2">
                <Link prefetch={false} href="/login">
                  <button className="text-main-foreground hover:text-main-accent font-bold py-2 px-4 rounded-full color-transition">
                    Login
                  </button>
                </Link>

                <Link prefetch={false} href="/register">
                  <button className="accent-btn">Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <MobileMenu className="block lg:hidden" />
    </nav>
  );
};

export default Navbar;
