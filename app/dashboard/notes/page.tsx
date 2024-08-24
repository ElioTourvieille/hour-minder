"use client";

import { useQuery } from "convex/react";
import CreateNoteButton from "@/components/create-note-button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BackgroundShapeBottom, BackgroundShapeTop } from "@/components/backgroundShape";
import NotesIllustration from "@/public/assets/img/Notebook-amico.svg";
import SideNavMobile from "@/components/mobile-nav";

export default function NotesPage() {
  const { currentUser } = useCurrentUser();
  const notes = useQuery(api.notes.getNotes, {
    userId: currentUser?._id,
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="w-full space-y-8">
      <BackgroundShapeTop />
      <div className="flex justify-between items-center tablet:flex-col tablet:gap-8">
      <SideNavMobile />
        <h1 className="text-4xl font-bold">Notes</h1>
        {notes && notes.length > 0 && <CreateNoteButton />}
      </div>

      {!notes && (
        <div className="flex gap-12">
          <div className="w-[200px] space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>

          <div className="flex-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div>
          <div className="py-12 flex flex-col justify-center items-center gap-8">
            <Image
              src={NotesIllustration}
              width="200"
              height="200"
              alt="Une fille qui prend une note"
            />
            <h2 className="text-2xl">Vous n&apos;avez pas encore créé de note</h2>
            <CreateNoteButton />
          </div>
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="flex gap-12">
          <ul className="space-y-2 w-[300px]">
            {notes?.map((note) => (
              <li
                key={note._id}
                className={cn(
                  "p-4 min-h-32 border-2 border-slate-300 text-center rounded-md text-base hover:text-blue-300 dark:hover:text-cyan-100",
                  {
                    "text-cyan-300": note._id === noteId,
                  }
                )}
              >
                <Link href={`/dashboard/notes/${note._id}`}>
                  <h3 className="text-xl font-bold">{note.title}</h3>
                  <p className="text-md italic">{note.text.substring(0, 60) + "..."}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <BackgroundShapeBottom />
    </main>
  );
}