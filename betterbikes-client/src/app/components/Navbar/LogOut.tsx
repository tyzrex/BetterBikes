"use client";
import { signOut } from "next-auth/react";

interface ChildComponentProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function LogOutButton({ className }: ChildComponentProps) {
  return (
    <>
      <button
        className={className}
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        Sign Out
      </button>
    </>
  );
}
