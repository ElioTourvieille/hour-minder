import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTotalHoursByYear = query({
  args: { userId: v.optional(v.id("users")), year: v.number() },
  handler: async (ctx, args) => {
    const totalHoursByYear = [];
    const currentYear = new Date().getFullYear();

    const hours = await ctx.db
      .query("hours")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("year"), currentYear))
      .collect();

    const totalDuration = hours.reduce((sum, entry) => sum + (entry.duration ?? 0), 0);

    const hoursPart = Math.floor(totalDuration / 60);
    const minutesPart = totalDuration % 60;

    const daysWorked = hours.length;

    totalHoursByYear.push({
      currentYear,
      daysWorked,
      totalHours: hoursPart,
      totalMinutes: minutesPart,
      totalDuration: `${hoursPart}h ${minutesPart}m`, // Format d'affichage
    });

    return totalHoursByYear;
  }
});

export const getTotalHoursByMonth = query({
  args: { userId: v.optional(v.id("users")), year: v.number(), month: v.number() },
  handler: async (ctx, args) => {
    const totalHoursByMonth = [];
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const hours = await ctx.db
      .query("hours")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("month"), currentMonth))
      .filter((q) => q.eq(q.field("year"), currentYear))
      .collect();

    const totalMinutes = hours.reduce((sum, entry) => sum + (entry.duration ?? 0), 0);

    const hoursPart = Math.floor(totalMinutes / 60);
    const minutesPart = totalMinutes % 60;

    const daysWorked = hours.length;

    totalHoursByMonth.push({
      currentMonth,
      totalHours: hoursPart,
      totalMinutes: minutesPart,
      daysWorked,
      totalDuration: `${hoursPart}h ${minutesPart}m`, // Format d'affichage
    });
    return totalHoursByMonth;
  }
});

export const addHours = mutation({
  args: {
    startTime: v.string(),
    endTime: v.string(),
    date: v.string(),
    month: v.number(),
    year: v.number(),
    userId: v.optional(v.id("users")),
    comments: v.optional(v.string()),
    duration: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const existingEntry = await ctx.db
      .query("hours")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();

      if (existingEntry.length > 0) {
        throw new ConvexError('Un horaire pour cette date existe déjà.');
      }

    await ctx.db.insert("hours", {
      startTime: args.startTime,
      endTime: args.endTime,
      date: args.date,
      month: args.month + 1,
      year: args.year,
      userId: args.userId,
      comments: args.comments,
      duration: args.duration,
    });
  },
});