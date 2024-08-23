"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import CreateDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BackgroundShapeBottom, BackgroundShapeTop } from "@/components/backgroundShape";

export default function Home() {
  const { currentUser } = useCurrentUser();

  const documents = useQuery(api.documents.getDocument, {
    userId: currentUser?._id,
  });

  return (
    <main className="w-full space-y-8">
      <BackgroundShapeTop />
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Mes documents</h1>
        <CreateDocumentButton />
      </div>

      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card className="h-[200px] p-6 flex flex-col justify-between">
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 && (
        <div className="py-12 flex flex-col justify-center items-center gap-8">
          <Image
            src="/assets/images/documents.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-2xl">Vous n'avez pas encore de documents</h2>
          <CreateDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
        </div>
      )}
      <BackgroundShapeBottom />
    </main>
  );
}