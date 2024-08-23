"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNoteForm from "./create-note-form";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export default function CreateNoteButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button >
          <PlusIcon /> Créer une note
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="mb-4">Créer une note</DialogTitle>
          <CreateNoteForm
            onNoteCreated={() => {
              setIsOpen(false);
            toast.success("Votre note a été créée avec succès!");
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}