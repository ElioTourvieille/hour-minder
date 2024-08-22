"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/public/assets/img/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useConvexAuth } from "convex/react";
import { BackgroundShapeBottom, BackgroundShapeTop } from "@/components/backgroundShape";

export default function LandingPage() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <main className="w-full flex flex-col justify-center items-center gap-16 px-8 py-24">
      <BackgroundShapeTop />
        <h2 className="text-4xl flex flex-col items-center gap-2 font-bold mobile:text-center">
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
        <BackgroundShapeBottom />
    </main>
  );
}
