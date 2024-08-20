"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/img/logo.png";
import ToggleTheme from "./toggleTheme";
import { UserButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

const Navbar = () => {
  const { isAuthenticated } = useConvexAuth();

  return (
    <nav className="w-full flex justify-between items-center mb-8 px-16 py-8">
      <Link href="/" className="flex-center gap-2">
        <Image src={Logo} alt="Logo Hour Minder" width={50} height={50} />
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500">
          HourMinder
        </h1>
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "size-12",
              },
            }}
          />
        )}
        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Navbar;
