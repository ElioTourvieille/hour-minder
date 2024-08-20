"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import AddHoursForm from "./add-hours-forms";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface FormData {
  date: Date;
  startTime: string;
  endTime: string;
  comments?: string;
}

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
      
      // Assurer que startTime et endTime sont des chaînes de caractères non nulles
      const formattedData = {
        startTime: startTime ? dayjs(startTime).toISOString() : '00:00:00Z',
        endTime: endTime ? dayjs(endTime).toISOString() : '00:00:00Z',
        date: dayjs(date).format('YYYY-MM-DD'),
        userId: getUser?._id,
        comments,
      };
  
      // Appel à l'API ou à la fonction de mutation
      await addHours(formattedData);
      toast.success('Heures ajoutées avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout des heures :', error);
      toast.error('Une erreur est survenue, veuillez réessayer.');
    }
  };

  return (
    <div>
      <h1>Ajouter des heures</h1>
      {isClient ? (
        <AddHoursForm onSubmit={handleAddHours} />
      ) : (
        <p>Chargement du formulaire...</p>
      )}
    </div>
  );
}
