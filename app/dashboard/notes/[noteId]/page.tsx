"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { DeleteNoteButton } from "../../../../components/delete-note-button";

export default function NotePage() {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, {
    noteId: noteId,
  });

  if (!note) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8">
    <h1 className="text-4xl mb-10 font-bold">{note?.title}</h1>
    <div className="max-w-[60vw] relative dark:bg-slate-800 bg-slate-200 rounded p-4 w-full tablet:max-w-[80vw] mobile:max-w-full">
      <DeleteNoteButton noteId={note._id} />
    
      <p className="max-w-fit pr-3 whitespace-pre-line object-contain">{note?.text}</p>
    </div>
    </div>
  );
}