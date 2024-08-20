import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTotalHoursByYear = query({
    args: { userId: v.id("users"), year: v.number() },
    handler: async (ctx, args) => {
    const startDate = new Date(args.year, 0, 1).toISOString(); // 1er Janvier de l'année
    const endDate = new Date(args.year + 1, 0, 1).toISOString(); // 1er Janvier de l'année suivante
  
    const hours = await ctx.db
      .query("hours")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.gte(q.field("date"), startDate))
      .filter((q) => q.lt(q.field("date"), endDate))
      .collect();
  
    const totalDuration = hours.reduce((sum, entry) => sum + (entry.duration ?? 0), 0);
    return totalDuration;
  }
});

export const getTotalHoursByMonth = query({
    args: { userId: v.id("users"), year: v.number() },
    handler: async (ctx, args) => {
    const totalHoursByMonth = [];
  
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(args.year, month, 1).toISOString(); // Premier jour du mois
      const endDate = new Date(args.year, month + 1, 1).toISOString(); // Premier jour du mois suivant
  
      const hours = await ctx.db
        .query("hours")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .filter((q) => q.gte(q.field("date"), startDate))
        .filter((q) => q.lt(q.field("date"), endDate))
        .collect();
  
      const totalDuration = hours.reduce((sum, entry) => sum + (entry.duration ?? 0), 0);
      totalHoursByMonth.push({ month, totalDuration });
    }
  
    return totalHoursByMonth;
  }
});

export const addHours = mutation({
    args: {
        startTime: v.string(),
        endTime: v.string(),
        date: v.string(),
        userId: v.optional(v.id("users")),
        comments: v.optional(v.string()),
        duration: v.optional(v.float64()),
    },
    handler: async (ctx, args) => {
        const duration = calculateDuration(args.startTime, args.endTime)

        function calculateDuration(startTime:string, endTime:string) {
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);
          
            const start = new Date();
            start.setHours(startHours, startMinutes);
          
            const end = new Date();
            end.setHours(endHours, endMinutes);
          
            const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Différence en heures
            return diff;
          }

        await ctx.db.insert("hours", {
            startTime: args.startTime,
            endTime: args.endTime,
            date: args.date,
            userId: args.userId,
            comments: args.comments,
            duration: duration,
        });
    },
});