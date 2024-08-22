import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-white flex justify-between shadow-md shadow-slate-900 border-t-2 border-slate-300 items-center py-8 px-24
     mobile:px-4 mobile:flex-col mobile:gap-4 dark:bg-slate-900 dark:shadow-none">
      <p className="text-md font-semibold mobile:text-center">
        © {new Date().getFullYear()} HourMinder. Tous droits réservés.
      </p>

      <p className="text-md font-semibold mobile:text-center">
        Conçu et réalisé par 
        <Link className="underline hover:text-blue-700" href="https://erict-dev.vercel.app"> Eric Tourvieille de Labrouhe</Link>
      </p>
    </footer>
  );
};

export default Footer;
