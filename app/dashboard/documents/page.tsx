"use client"

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react"

export default function DashboardDocumentsPage() {
    const documents = useQuery(api.documents.getDocument, {
        userId: "erictdev.vercel.app",
    });

    return (
        <div>
            Mes documents
        </div>
    );
}