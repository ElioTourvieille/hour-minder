import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex justify-between shadow-md shadow-slate-900 border-t-2 border-slate-300 items-center py-10 px-16">
      <p className="text-md font-semibold">
        © {new Date().getFullYear()} HourMinder. Tous droits réservés.
      </p>

      <p className="text-md font-semibold">
        Conçu et réalisé par 
        <Link className="underline hover:text-blue-700" href="https://erict-dev.vercel.app"> Eric Tourvieille de Labrouhe</Link>
      </p>
    </footer>
  );
};

export default Footer;
