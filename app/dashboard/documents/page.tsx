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
import ImgDocument from "@/public/assets/img/document.webp";

export default function Home() {
  const { currentUser } = useCurrentUser();

  const documents = useQuery(api.documents.getDocuments, {
    userId: currentUser?._id,
  });

  return (
    <main className="w-full space-y-8 mobile:text-center">
      <BackgroundShapeTop />
      <div className="flex justify-between items-center mobile:flex-col mobile:gap-6">
        <h1 className="text-4xl font-bold">Mes documents</h1>
        {documents && documents.length > 0 && <CreateDocumentButton />}
      </div>

      {!documents && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card key={i} className="h-[200px] p-6 flex flex-col justify-between">
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
            src={ImgDocument}
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
          />
          <h2 className="text-2xl">Vous n&apos;avez pas encore de documents</h2>
          <CreateDocumentButton />
        </div>
      )}

      {documents && documents.length > 0 && (
        <div className="grid grid-cols-3 gap-8 mobile:grid-cols-1 mobile:gap-6">
          {documents?.map((doc) => <DocumentCard key={doc._id} document={doc} />)}
        </div>
      )}
      <BackgroundShapeBottom />
    </main>
  );
}