"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,

  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/loading-button";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const formSchema = z.object({
  search: z.string().min(3, { message: "Veuillez saisir au moins 3 caractères" }).max(250),
});

export function SearchForm({
  setResults,
}: {
  setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
  const { currentUser } = useCurrentUser();
  const searchAction = useAction(api.search.searchAction);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await searchAction({
      search: values.search,
      userId: currentUser?._id,
    }).then(setResults);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 gap-2 mobile:flex-col"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Rechercher dans toutes vos notes et documents"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          isLoading={form.formState.isSubmitting}
          loadingText="Recherche en cours..."
        >
          Rechercher
        </LoadingButton>
      </form>
    </Form>
  );
}