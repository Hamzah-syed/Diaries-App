import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//interface
import { Diary } from "../../interfaces/diary.interface";

export const diaries = createSlice({
  name: "diaries",
  initialState: [] as Diary[],
  reducers: {
    addDiary(state, { payload }: PayloadAction<Diary[]>) {
      const diarySave = payload.filter((diary) => {
        //   since this condition will retrun -1 because if it will not find any  index with following condition it will return -1
        return state.findIndex((item) => item.id === diary.id) === -1;
      });
      state.push(...diarySave);
    },

    updateDiary(state, { payload }: PayloadAction<Diary>) {
      //it will return whole object but we need id to get index number of object which needs to be update
      const { id } = payload;
      //to find index of object whose id === payload.id
      const diaryIndex = state.findIndex((diary) => diary.id === id);

      // it will not return -1
      if (diaryIndex !== -1) {
        //this function will edit state
        //first parameter contain a number of index
        //second parameter contains number of elements need to be replace in this condition it is 1
        //third parameter contain object which will replace existing object
        state.splice(diaryIndex, 1, payload);
      }
    },
  },
});

export const { addDiary, updateDiary } = diaries.actions;
