import { Request, Response } from "miragejs";
//date genrator
import dayjs from "dayjs";
// interface
import { Diary } from "../../../interfaces/diary.interface";
import { User } from "../../../interfaces/user.interface";
//for handling error
import { handleError } from "../server";

export const createDiary = (
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
    const diary = exUser.create({
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

export const updateDiary = (schema: any, req: Request): Diary | Response => {
  try {
    const diary = schema.diaries.findBy(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Diary>;

    const now = dayjs().format();

    diary.update({
      ...data,
      updatedAt: now,
    });

    return diary.attrs as Diary;
  } catch (error) {
    return handleError(error, "Failed to update Diary.");
  }
};

export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
  try {
    const user = schema.diaries.find(req.params.id);
    return user.diary as Diary[];
  } catch (error) {
    return handleError(error, "Could not get user diaries.");
  }
};
