import { api } from "@/convex/_generated/api";
import { useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";

export function useCurrentUser() {
  const { user } = useClerk();

  const currentUser = useQuery(api.users.getUserByClerkId, { clerkId: user?.id });

  return { isLoading: false, currentUser };
}
