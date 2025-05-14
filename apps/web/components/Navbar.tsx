"use client";
import Link from "next/link";
import { Button } from "@repo/ui";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
// import UserAccountDropDown from "./UserAccountDropDown";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import UserAccountDropDown from "./UserAccountDropDown";

export const Appbar = () => {
  const { status, data } = useSession();
  const router = useRouter();

  return (
    <nav className="sticky mx-auto wrapper top-0 z-50 flex items-center gap-2 py-6 w-full">
      <div className="flex w-[90vw] justify-between mx-auto shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-600 p-3 rounded-2xl md:w-[50vw]">
        <Link href={"/"} className="flex items-center gap-4 cursor-pointer">
          <Image
            src={'/hero.png'}
            alt="Logo"
            width={300}
            height={200}
            className="rounded-full size-10"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-[#9B87F5] text-foreground hidden md:block">
            The Gauda Times
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {/* <ModeToggle /> */}
          {(status === "unauthenticated") ? (
            <Button
              size="lg"
              variant={"default"}
              className="p-2 bg-[#665499] hover:bg-[#464472] text-white rounded-xl  cursor-pointer transform hover:scale-125 hover:opacity-80 transition ease-out duration-300 text-md"
              onClick={async () => {
                await signIn();
                router.push('/');
              }}
            >
              Login
            </Button>
          ) : (
            <UserAccountDropDown />
          )}
        </div>
      </div>
    </nav>
  );
};