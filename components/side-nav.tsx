"use client";

import { cn } from "@/lib/utils";
import { CalendarClock, ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="mx-20 border-r-2 pr-10 border-slate-300 max-w-1/3 laptop:mx-10 tablet:hidden">
      <ul className="space-y-8">
      <li>
          <Link
            className={cn(
              "font-medium flex gap-2 items-center text-xl hover:text-blue-400 dark:hover:text-blue-200",
              {
                "text-blue-700": pathname.endsWith("/search"),
              }
            )}
            href="/dashboard/search"
          >
            <Search />
            Recherche
          </Link>
        </li>

        <li>
          <Link
            className={cn(
              "font-medium flex gap-2 items-center text-xl hover:text-blue-400 dark:hover:text-blue-200",
              {
                "text-blue-700": pathname.endsWith("/hours"),
              }
            )}
            href="/dashboard/hours"
          >
            <CalendarClock />
            Heures
          </Link>
        </li>

        <li>
          <Link
            className={cn(
              "font-medium flex gap-2 items-center text-xl hover:text-blue-400 dark:hover:text-blue-200",
              {
                "text-blue-700": pathname.endsWith("/documents"),
              }
            )}
            href="/dashboard/documents"
          >
            <FilesIcon />
            Documents
          </Link>
        </li>

        <li>
          <Link
            className={cn(
              "font-medium flex gap-2 items-center text-xl hover:text-blue-400 dark:hover:text-blue-200",
              {
                "text-blue-700": pathname.endsWith("/notes"),
              }
            )}
            href="/dashboard/notes"
          >
            <ClipboardPen />
            Notes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
