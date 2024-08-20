"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/public/assets/img/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useConvexAuth } from "convex/react";


export default function LandingPage() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <main className="w-full flex flex-col items-center gap-16 px-8 pb-10">
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80bbff] to-[#1505f5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <h2 className="text-4xl flex flex-col items-center gap-2 font-bold">
          <Image src={Logo} alt="Logo Hour Minder" width={150} height={150} />
          Gérer vos heures en toute simplicité
        </h2>
        <p className="text-center text-lg mt-4 max-w-prose">
          HourMinder est une application de décompte d'heures simple et efficace
          pour vous aider à vous organiser et à vous concentrer.
        </p>
  
        <Button size="lg" variant="default">
          <Link href="/signin" className="mr-2">
          {isAuthenticated ? "Démarrer" : "Se connecter"}
          </Link>
        </Button>
    </main>
  );
}
