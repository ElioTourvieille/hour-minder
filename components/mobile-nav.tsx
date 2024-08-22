// SideNavMobile.tsx
"use client";

import { cn } from "@/lib/utils";
import { CalendarClock, ClipboardPen, FilesIcon, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavMobile() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-row justify-around p-4 tablet:flex tablet:p-0 mobile:justify-center">
      <ul className="flex flex-row gap-4 mobile:flex-wrap">
        <li>
          <Link
            className={cn(
              "font-medium flex gap-2 items-center text-lg hover:text-blue-400 dark:hover:text-blue-200",
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
              "font-medium flex gap-2 items-center text-lg hover:text-blue-400 dark:hover:text-blue-200",
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
              "font-medium flex gap-2 items-center text-lg hover:text-blue-400 dark:hover:text-blue-200",
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
              "font-medium flex gap-2 items-center text-lg hover:text-blue-400 dark:hover:text-blue-200",
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
