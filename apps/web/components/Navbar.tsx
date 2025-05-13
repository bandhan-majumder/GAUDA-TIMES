"use client";
import Link from "next/link";
import { Button } from "@repo/ui";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
// import UserAccountDropDown from "./UserAccountDropDown";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

export const Appbar = () => {
  const { status, data } = useSession();
  console.log("Status", status);

  return (
    <nav className="sticky mx-auto wrapper top-0 z-50 flex items-center gap-2 py-6 w-full">
      <div className="flex w-[90vw] justify-between mx-auto shadow-lg shadow-neutral-600/5 backdrop-blur-lg border p-3 rounded-2xl md:w-[50vw]">
        <Link href={"/"} className="flex items-center gap-4 cursor-pointer">
          <Image
            src={'/hero.png'}
            alt="Logo"
            width={300}
            height={200}
            className="rounded-full size-10"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-[#9B87F5] text-foreground hidden md:block">
            T G T
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* <ModeToggle /> */}
          {(status === "unauthenticated") ? (
            <Button
              size="lg"
              className="p-2 rounded-xl text-sm  cursor-pointer transform hover:scale-125 hover:opacity-80 transition ease-out duration-300"
              onClick={async () => {
                await signIn();
              }}
            >
              Login
            </Button>
          ) : (
            null
            /* <UserAccountDropDown /> */
          )}
        </div>
      </div>
    </nav>
  );
};