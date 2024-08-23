"use client"

import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'react-datepicker/dist/react-datepicker.css';
import { FormData } from "@/lib/types";
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

function AddHoursForm({ onSubmit }: { onSubmit: (formData: FormData) => Promise<void> }) {
  const loadSavedStartTime = () => {
    const savedStartTime = localStorage.getItem("startTime");
    return savedStartTime ? dayjs(savedStartTime) : dayjs();
  };

  // Charger l'état du verrouillage depuis localStorage
  const loadLockStartTime = () => {
    const savedLockStartTime = localStorage.getItem("lockStartTime");
    return savedLockStartTime ? JSON.parse(savedLockStartTime) : false;
  };

  const [lockStartTime, setLockStartTime] = useState<boolean>(loadLockStartTime());
  const savedStartTime = loadSavedStartTime();

  const { control, register, handleSubmit, setValue, setError, getValues, reset } = useForm<FormData>({
    defaultValues: {
      date: new Date(),
      startTime: dayjs(localStorage.getItem("startTime") || dayjs()),
      endTime: undefined,
    },
  });

   // Sauvegarder l'état du verrouillage et startTime dans localStorage
   useEffect(() => {
    const startTime = getValues('startTime')?.toISOString();
    localStorage.setItem("lockStartTime", JSON.stringify(lockStartTime));
    if (lockStartTime && startTime) {
      localStorage.setItem("startTime", getValues('startTime')?.toISOString() );
    }
  }, [lockStartTime, getValues]);

  const handleChecked = (checked: boolean) => {
    setLockStartTime(checked);
    if (checked) {
      const currentStartTime = getValues('startTime')?.toISOString() || dayjs().toISOString();
      localStorage.setItem("startTime", currentStartTime);
    } else {
      localStorage.removeItem("startTime");
    }
  };

  const onFormSubmit = (data: FormData) => {
    const startTime = data.startTime ;
    const endTime = data.endTime ; 

    if (!startTime) {
      setError('startTime', { type: 'manual', message: 'Veuillez remplir le champ heure de début' });
      toast.error('Veuillez remplir le champ heure de début');
      return;
    }

    if (!endTime) {
      setError('endTime', { type: 'manual', message: 'Veuillez remplir le champ heure de fin' });
      toast.error('Veuillez remplir le champ heure de fin');
      return;
    }

    const date = new Date();
    const month = date.getMonth()
    const year = date.getFullYear()
    
    const formData = {
      ...data,
      startTime, 
      endTime, 
      month,
      year,
    };
    onSubmit(formData);
    handleChecked(false);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg max-w-lg dark:bg-gray-900 tablet:mx-auto mobile:m-0">
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 dark:text-white">Date :</label>
        <Controller
          name="date"
          control={control}
          render={({ field: { value, onChange } }) => (
        <DatePicker
          selected={getValues('date')}
          onChange={(date: Date | null) => date && setValue('date', date)}
          dateFormat="yyyy-MM-dd"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
          />
        )}
      />
    </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-white">Heure de début :</label>
          <Controller
            name="startTime"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TimePicker
                label="Sélectionner l'heure de début"
                value={value}
                onChange={(newValue) => setValue("startTime", newValue || savedStartTime)}
                ampm={false}
                className="dark:bg-gray-100 rounded-md"
                disabled={lockStartTime}
              />
            )}
          />
        </div>

        <div className="flex items-center mt-4">
        <Checkbox
          id="lockStartTime"
          checked={lockStartTime}
          onCheckedChange={handleChecked}
          className="mr-2"
        />
        <label htmlFor="lockStartTime" className="text-gray-700 dark:text-white">
          Valider l&apos;heure de début
        </label>
      </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-700 dark:text-white">Heure de fin :</label>
          <TimePicker
            label="Sélectionner l'heure de fin"
            value={getValues('endTime')}
            onChange={(newValue) => setValue('endTime', newValue || dayjs())}
            ampm={false}
            className="dark:bg-gray-100 rounded-md"
          />
        </div>
      </LocalizationProvider>

      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 dark:text-white">Commentaires :</label>
        <textarea
          {...register('comments')}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700"
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
