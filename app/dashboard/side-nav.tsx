"use client";

import { cn } from "@/lib/utils";
import { CalendarClock, ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-6">
      <li>
          <Link
            className={cn(
              "font-medium flex gap-2 items-center text-xl hover:text-blue-400 dark:hover:text-blue-200",
              {
                "text-blue-700": pathname.endsWith("/search"),
              }
            )}
            href="/dashboard/hours"
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
