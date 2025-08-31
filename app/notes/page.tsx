import React, { JSX } from "react";
import { getNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";


export const revalidate = 0;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => getNotes({ page: 1, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
