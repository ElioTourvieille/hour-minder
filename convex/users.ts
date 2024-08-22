import { internalMutation, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

export const getUserByClerkId = query({
    args: {
        clerkId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .filter((q)=> q.eq(q.field("clerkId"), args.clerkId))
        .unique()

        return user;
    }
});



export const createUser = internalMutation({
    args: {
        clerkId: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("users", {
            clerkId: args.clerkId,
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
        });
    }
});

export const updateUser = internalMutation({
    args: {
        clerkId: v.string(),
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        email: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .filter((q)=> q.eq(q.field("clerkId"), args.clerkId))
        .unique()

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(user._id, {
            clerkId: args.clerkId,
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
        });
    }
});

export const deleteUser = internalMutation({
    args: {
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .filter((q)=> q.eq(q.field("clerkId"), args.clerkId))
        .unique()

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.delete(user._id);
    }
});