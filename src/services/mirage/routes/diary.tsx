import { Request, Response } from "miragejs";
//date genrator
import dayjs from "dayjs";
// interface
import { Diary } from "../../../interfaces/diary.interface";
import { User } from "../../../interfaces/user.interface";
//for handling error
import { handleError } from "../server";

export const create = (
  schema: any,
  req: Request
): { user: User; diary: Diary } | Response => {
  try {
    const { title, type, userId } = JSON.parse(req.requestBody) as Partial<
      Diary
    >;
    const exUser = schema.users.findBy({ id: userId });
    if (!exUser) {
      return handleError(null, "No such user exists.");
    }
    const now = dayjs().format();
    const diary = exUser.createDiary({
      title,
      type,
      createdAt: now,
      updatedAt: now,
    });
    return {
      user: {
        ...exUser.attrs,
      },
      diary: diary.attrs,
    };
  } catch (error) {
    return handleError(error, "Failed to create Diary.");
  }
};
