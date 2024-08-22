"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import AddHoursForm from "./add-hours-forms";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FormData } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BackgroundShapeBottom,
  BackgroundShapeTop,
} from "@/components/backgroundShape";
import { HoursResume } from "@/components/hoursResume";
import { ConvexError } from "convex/values";
import SideNavMobile from "@/components/mobile-nav";

export default function DashboardHoursPage() {
  const { user } = useClerk();
  const clerkId = user?.id;

  const addHours = useMutation(api.hours.addHours);
  const getUser = useQuery(api.users.getUserByClerkId, { clerkId });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddHours = async (formData: FormData) => {
    try {
      const { date, startTime, endTime, comments } = formData;

      const durationInMinutes = endTime.diff(startTime, "minute");

      // Assurer que startTime et endTime sont des chaînes de caractères non nulles
      const formattedData = {
        startTime: startTime.format("HH:mm"),
        endTime: endTime.format("HH:mm"),
        date: dayjs(date).format("YYYY-MM-DD"),
        month: date.getMonth(),
        year: date.getFullYear(),
        duration: durationInMinutes,
        userId: getUser?._id,
        comments,
      };

      // Appel à l'API ou à la fonction de mutation
      await addHours(formattedData);
      toast.success("Heures ajoutées avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout des heures :", error);

      const errorMessage = error instanceof ConvexError
      ? // Access data and cast it to the type we expect
        (error.data)
      : // Handle other errors
        "Une erreur est survenue, veuillez réessayer.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-4">
      <BackgroundShapeTop />
      <div className="w-full flex laptop:flex-col laptop:gap-8">
        <SideNavMobile />
        {/* Formulaire d'Ajout d'Heures */}
        <div className="flex-1">
          {isClient ? (
            <AddHoursForm onSubmit={handleAddHours} />
          ) : (
            <Card className="h-[60vh] max-w-lg py-10 px-6 flex flex-col justify-between">
              <Skeleton className="h-[5vh] rounded" />
              <Skeleton className="h-[5vh] rounded" />
              <Skeleton className="h-[5vh] rounded" />
              <Skeleton className="w-full h-[15vh] rounded" />
            </Card>
          )}
        </div>

        {/* Résumé des Heures */}
        <div className="flex-1">
          <HoursResume />
        </div>
      </div>
      <BackgroundShapeBottom />
    </section>
  );
}
