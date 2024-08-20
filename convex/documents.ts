import { Id } from "./_generated/dataModel";
import { internalQuery, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";


export async function hasAccessToDocument(
    ctx: MutationCtx | QueryCtx,
    documentId: Id<"documents">,
) {
    const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!user) {
        return null;
    }

    const document = await ctx.db.get(documentId);

    if (!document) {
        return null;
    }

    return {
        user,
        document,
    };
}

export const hasAccessToDocumentQuery = internalQuery({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        return await hasAccessToDocument(ctx, args.documentId);
    }
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const getDocument = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!user) {
            return undefined;
        }

        return await ctx.db
        .query("documents")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", user))
        .collect()
    }
});

export const createDocument = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        userId: v.string(),
        fileId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

        if (!user) {
            throw new Error("Not Authenticated");
        }

        let documentId: Id<"documents">;

        documentId = await ctx.db.insert("documents", {
            title: args.title,
            description: "",
            tokenIdentifier: user,
            fileId: args.fileId,
        });
    }
});

export const deleteDocument = mutation({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const accessObj = await hasAccessToDocument(ctx, args.documentId);

        if (!accessObj) {
            throw new Error("You do not have access to this document");
        }

        await ctx.storage.delete(accessObj.document.fileId);
        await ctx.db.delete(args.documentId);
    }
});