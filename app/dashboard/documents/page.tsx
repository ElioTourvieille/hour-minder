"use client"

import { FileUpload } from "@/components/ui/file-upload";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react"
import { useState } from "react";

export default function DashboardDocumentsPage() {
    const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
 
  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}