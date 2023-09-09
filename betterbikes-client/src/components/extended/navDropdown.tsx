import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Image from "next/image";

interface Props {
  session: Session | null;
  content: {
    label: string;
    separator: string;
    items: string[];
  };
}

export default function NavDropdown(props: Props) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src={props.session?.user?.image || "/assets/user.svg"}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
