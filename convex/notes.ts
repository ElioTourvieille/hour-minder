import { ConvexError, v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getNote = query({
    args: {
        noteId: v.id("notes"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            return null;
        }

        const note = await ctx.db.get(args.noteId);

        if (!note) {
            return null;
        }

        if (note.tokenIdentifier !== userId) {
            return null;
        }

        return note;
    },
});

export const getNotes = query({
    args: {
        userId: v.optional(v.id("users")),
    },
    async handler(ctx, args) {
        const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!user) {
            return undefined;
        }

        return await ctx.db
            .query("notes")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", user))
            .order("desc")
            .collect();
    }
});

export const createNote = mutation({
    args: {
        text: v.string(),
        title: v.string(),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("Vous devez être connecté pour créer une note");
        }

        let noteId: Id<"notes">;

        noteId = await ctx.db.insert("notes", {
            text: args.text,
            title: args.title,
            tokenIdentifier: userId,
        });

    }
});

export const deleteNote = mutation({
    args: {
        noteId: v.id("notes"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!userId) {
            throw new ConvexError("Vous devez être connecté pour supprimer une note");
        }

        const note = await ctx.db.get(args.noteId);

        if (!note) {
            throw new ConvexError("Note introuvable");
        }

        await assertAccessToNote(ctx, note);

        await ctx.db.delete(args.noteId);
    },
});

async function assertAccessToNote(
    ctx: QueryCtx | MutationCtx,
    note: Doc<"notes">
) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
        throw new ConvexError("Vous devez être connecté pour créer une note");
    }

    if (note.tokenIdentifier !== userId) {
        throw new ConvexError("Vous n'avez pas accès à cette note");
    }
}