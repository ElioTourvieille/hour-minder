"use client";

import { WobbleCard } from "./ui/wobble-card";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function HoursResume() {
  const { currentUser } = useCurrentUser();
  const currentMonth = new Date().getMonth() + 1; 
  const year = new Date().getFullYear();

  const totalHoursByMonth = useQuery(api.hours.getTotalHoursByMonth, { userId: currentUser?._id, year: year, month: currentMonth});
  const currentMonthData = totalHoursByMonth?.find(
    (entry) => entry.currentMonth === currentMonth
  ) || { totalHours: 0, totalMinutes: 0, totalDuration: '0h 0m', daysWorked: 0 };

  const totalHoursByYear = useQuery(api.hours.getTotalHoursByYear, { userId: currentUser?._id, year: year});
  const currentYearData = totalHoursByYear?.find(
    (entry) => entry.currentYear === year
  ) || { totalHours: 0, totalMinutes: 0, totalDuration: '0h 0m', daysWorked: 0 };

  return (
    <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
      {/* Heures Travaillées ce Mois */}
      <WobbleCard
        containerClassName="col-span-2 h-full bg-pink-800 min-h-[200px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-3xl font-semibold tracking-[-0.015em] text-white">
            Heures travaillées ce mois
          </h2>
          <p className="my-4 text-left text-base/4 text-neutral-200">
            Total : {currentMonthData.totalDuration}
          </p>
          <p className="text-left text-base/4 text-neutral-200">
            Jours travaillés : {currentMonthData.daysWorked}
          </p>
        </div>
      </WobbleCard>

      {/* Heures Travaillées cette Année */}
      <WobbleCard containerClassName="col-span-2 min-h-[200px]">
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-3xl font-semibold tracking-[-0.015em] text-white">
            Heures travaillées cette année
          </h2>
          <p className="my-4 text-left text-base/6 text-neutral-200">
            Total : {currentYearData.totalDuration}
          </p>
          <p className="text-left text-base/4 text-neutral-200">
            Jours travaillés : {currentYearData.daysWorked}
          </p>
        </div>
      </WobbleCard>

      {/* Heures Restantes */}
      <WobbleCard containerClassName="col-span-4 bg-blue-900 min-h-[250px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-3xl font-semibold tracking-[-0.015em] text-white">
            Heures restantes
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
