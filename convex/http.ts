import { httpAction } from "./_generated/server"
import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import {Webhook} from 'svix';

const handleClerkWebhook = httpAction(async (ctx, request) => {
    const event = await validateRequest(request);
    if (!event) {
        return new Response("Invalid request", { status: 400 });
    }

    try {
        switch (event.type) {
            case "user.created":
                await ctx.runMutation(internal.users.createUser, {
                    clerkId: event.data.id,
                    firstName: event.data.first_name || "",
                    lastName: event.data.last_name || "",
                    email: event.data.email_addresses[0]?.email_address || "",
                });
                break;
            case "user.updated":
                await ctx.runMutation(internal.users.updateUser, {
                    clerkId: event.data.id,
                    firstName: event.data.first_name || "",
                    lastName: event.data.last_name || "",
                    email: event.data.email_addresses[0]?.email_address || "",
                });
                break;
            case "user.deleted":
                await ctx.runMutation(internal.users.deleteUser, {
                    clerkId: event.data.id as string,
                });
            break;
        } 
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error("Error handling webhook event", error);
        return new Response("Internal server error", { status: 500 });
    }
});

const http = httpRouter();

http.route({
    method: "POST",
    path: "/clerk",
    handler: handleClerkWebhook,
})

const validateRequest = async (
    request: Request
): Promise<WebhookEvent | undefined> => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
        throw new Error("CLERK_WEBHOOK_SECRET is not defined");
    }
    const payloadString = await request.text();
    const headerPayload = request.headers
    const svixHeaders = {
        "svix-signature": headerPayload.get("svix-signature")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-id": headerPayload.get("svix-id")!,
    };
    try{
        const wh = new Webhook(webhookSecret);
        const event = await wh.verify(payloadString, svixHeaders);
        return event as unknown as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook signature", error);
        return undefined;
    }
};

export default http ;