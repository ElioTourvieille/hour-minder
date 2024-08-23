import { v } from "convex/values";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { action } from "./_generated/server";

export const searchAction = action({
    args: {
      search: v.string(),
      userId: v.optional(v.id("users")),
    },
    handler: async (ctx, args) => {
      const user = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
  
      if (!user) {
        return null;
      }
  
      // Call the query for notes
      const notes = await ctx.runQuery(api.notes.getNotesByUserAndSearch, {
        user,
        search: args.search,
      });
  
      // Call the query for documents
      const documents = await ctx.runQuery(api.documents.getDocumentsByUserAndSearch, {
        user,
        search: args.search,
      });
  
      // Combine the results
      const records: (
        | { type: "notes"; record: Doc<"notes"> }
        | { type: "documents"; record: Doc<"documents"> }
      )[] = [];
  
      notes?.forEach((note) => {
        records.push({ type: "notes", record: note });
      });
  
      documents?.forEach((document) => {
        records.push({ type: "documents", record: document });
      });
  
      return records;
    },
  });