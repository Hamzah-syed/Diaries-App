import { Request, Response } from "miragejs";
//interfaces
import { Entry } from "../../../interfaces/entry.interface";
import { Diary } from "../../../interfaces/diary.interface";
//date genrator
import dayjs from "dayjs";
//handle error funtion comming from server
import { handleError } from "../server";

//to add entry
export const addEntry = (
  schema: any,
  req: Request
): { diary: Diary; entry: Entry } | Response => {
  try {
    // finding diary
    const diary = schema.diaries.find(req.params.id);
    // entry provided by user
    const { title, content } = JSON.parse(req.requestBody) as Partial<Entry>;

    //genrating date
    const now = dayjs().format();

    //object which is going to be added
    const data = diary.createEntry({
      title,
      content,
      createdAt: now,
      updatedAt: now,
    });

    return {
      diary: {
        ...diary.attrs,
      },
      entry: data.attrs,
    };
  } catch (error) {
    return handleError(error, "Failed to save entry.");
  }
};

//to update entry
export const updateEntry = (schema: any, req: Request): Entry | Response => {
  try {
    const entry = schema.entries.find(req.params.id);
    const data = JSON.parse(req.requestBody) as Partial<Entry>;

    const now = dayjs().format();

    entry.update({
      ...data,
      updatedAt: now,
    });

    return entry.attrs as Entry;
  } catch (error) {
    return handleError(error, "Failed to update entry.");
  }
};

//get all entries
export const getEntries = (schema: any, req: Request): Entry[] | Response => {
  try {
    const diary = schema.diaries.find(req.params.id);
    return diary.entry as Entry[];
  } catch (error) {
    return handleError(error, "Failed to get Diary entries.");
  }
};
