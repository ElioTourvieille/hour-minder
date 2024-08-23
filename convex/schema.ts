import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { title } from "process";

export default defineSchema({
    users: defineTable({
        clerkId: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
    }).index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"]),

    documents: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        tokenIdentifier: v.optional(v.string()),
        fileId: v.id("_storage"),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),
   
    notes: defineTable({
        text: v.string(),
        title: v.string(),
        tokenIdentifier: v.optional(v.string()),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),
    
    hours: defineTable({
        startTime: v.string(),
        endTime: v.string(),
        date: v.string(),
        month: v.number(),
        year: v.number(),
        userId: v.optional(v.id("users")),
        comments: v.optional(v.string()),
        duration: v.optional(v.number()),
    }).index("by_userId", ["userId"])
});