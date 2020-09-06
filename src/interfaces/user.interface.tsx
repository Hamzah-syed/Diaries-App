export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  diaryId: string[] | null;
}
