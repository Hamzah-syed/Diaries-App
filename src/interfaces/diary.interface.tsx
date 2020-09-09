export interface Diary {
  id?: string;
  title: string;
  description?: string;
  type: "private" | "public";
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  entryIds: string[] | null;
}
