"use client"

import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.css';

// Définir les types pour les données du formulaire
interface FormData {
  date: Date;
  startTime: dayjs.Dayjs | null;
  endTime: dayjs.Dayjs | null;
  comments?: string;
}

function AddHoursForm({ onSubmit }: { onSubmit: (formData: FormData) => void }) {
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      date: new Date(),
      startTime: null,
      endTime: null,
    },
  });

  // Fonction pour gérer la soumission du formulaire
  const onFormSubmit = (data: FormData) => {
    // Formater la date en chaîne de caractères
    const formData = {
      ...data,
    };
    onSubmit(formData); // Appel de la fonction onSubmit pour gérer l'ajout des heures
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Date :</label>
        <DatePicker
          selected={getValues('date')}
          onChange={(date: Date | null) => date && setValue('date', date)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Heure de début :</label>
          <TimePicker
            label="Sélectionner l'heure de début"
            value={getValues('startTime')}
            onChange={(newValue) => setValue('startTime', newValue)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700">Heure de fin :</label>
          <TimePicker
            label="Sélectionner l'heure de fin"
            value={getValues('endTime')}
            onChange={(newValue) => setValue('endTime', newValue)}
          />
        </div>
      </LocalizationProvider>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Commentaires :</label>
        <textarea
          {...register('comments')}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Ajouter
      </button>
    </form>
  );
}

export default AddHoursForm;
