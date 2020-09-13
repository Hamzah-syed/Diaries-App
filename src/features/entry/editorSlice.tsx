import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Diary } from "../../interfaces/diary.interface";
//interce
import { Entry } from "../../interfaces/entry.interface";

interface EditorState {
  canEdit: boolean;
  currentlyEditting: Entry | null;
  activeDiary: Diary | null;
}

const initialState: EditorState = {
  canEdit: false,
  currentlyEditting: null,
  activeDiary: null,
};

const editor = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCanEdit(state, { payload }: PayloadAction<boolean>) {
      state.canEdit = payload != null ? payload : !state.canEdit;
    },
    setcurrentlyEditting(state, { payload }: PayloadAction<Entry | null>) {
      state.currentlyEditting = payload;
    },
    //diary data which is editing
    setActiveDiary(state, { payload }: PayloadAction<Diary | null>) {
      state.activeDiary = payload;
    },
  },
});

export const {
  setCanEdit,
  setcurrentlyEditting,
  setActiveDiary,
} = editor.actions;

export default editor.reducer;
