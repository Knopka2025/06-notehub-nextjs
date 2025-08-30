import axios from "axios";
import { Note, NewNote } from "../types/note";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
});

export async function getNotes({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<{ notes: Note[]; totalPages: number }> {
  const res = await instance.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    { params: { page, search } }
  );
  return res.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const res = await instance.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const res = await instance.post<Note>("/notes", note);
  return res.data;
}

export async function updateNote(
  id: string,
  note: Partial<NewNote>
): Promise<Note> {
  const res = await instance.patch<Note>(`/notes/${id}`, note);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await instance.delete<Note>(`/notes/${id}`);
  return res.data;
}