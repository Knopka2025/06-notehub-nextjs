import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.item}>
          <Link href={`/notes/${id}`} className={css.link}>
            <h2>{title}</h2>
          </Link>
          <p>{content}</p>
          <span>{tag}</span>
          <button className={css.delete} onClick={() => mutation.mutate(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
