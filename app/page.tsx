import { Button } from "@/components/ui/button";
import Logo from "@/public/assets/img/logo.png";
import { Link } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full text-center flex-center flex-col gap-2 px-8 pb-10">
      <h1 className="text-4xl font-bold">
        <Image src={Logo} alt="Logo Hour Minder" width={100} height={100} />
      </h1>
      <p className="text-center text-lg mt-4 max-w-prose">
        HourMinder est une application de décompte d'heures simple et efficace
        pour vous aider à vous organiser et à vous concentrer.
      </p>

      <Button size="lg" variant="default">
        <Link href="/signin" className="mr-2" />
        Se connecter
      </Button>
    </section>
  );
}
