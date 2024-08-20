import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
        userId: v.optional(v.id("users")),
        tokenIdentifier: v.optional(v.string()),
        embedding: v.optional(v.array(v.float64())),
        fileId: v.id("_storage"),
    }).index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_userId", ["userId"]),
    notes: defineTable({
        text: v.string(),
        userId: v.optional(v.id("users")),
        embedding: v.optional(v.array(v.float64())),
        tokenIdentifier: v.optional(v.string()),
    }).index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_userId", ["userId"]),
});