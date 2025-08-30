import React, { JSX } from "react";
import { getNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage(): Promise<JSX.Element> {
  const initialNotes = await getNotes({ page: 1, search: "" });
  return <NotesClient initialNotes={initialNotes} />;
}