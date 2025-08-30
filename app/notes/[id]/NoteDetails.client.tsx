"use client";

import { useQuery } from "@tanstack/react-query";
import { getNoteById } from "../../../lib/api";
import { Note } from "../../../types/note";
import Loader from "../../../components/Loader/Loader";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  noteId: string;
}

export default function NoteDetails({ noteId }: NoteDetailsProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
    refetchOnMount: false, // ✅ уникаємо зайвого перезапиту
  });

  if (isLoading) return <Loader />;
  if (isError || !note) return <ErrorMessage message="Note not found" />;

  const { title, content, tag, createdAt, updatedAt } = note;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{title}</h1>
      <p className={css.tag}>#{tag}</p>
      <p className={css.content}>{content}</p>

      <div className={css.meta}>
        <p>
          <strong>Created:</strong> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}