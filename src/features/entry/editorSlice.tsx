import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//interce
import { Entry } from "../../interfaces/entry.interface";

interface EditorState {
  canEdit: boolean;
  currentlyEditting: Entry | null;
  activeDiaryId: string | null;
}

const initialState: EditorState = {
  canEdit: false,
  currentlyEditting: null,
  activeDiaryId: null,
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
    setActiveDiary(state, { payload }: PayloadAction<string | null>) {
      state.activeDiaryId = payload;
    },
  },
});

export const {
  setCanEdit,
  setcurrentlyEditting,
  setActiveDiary,
} = editor.actions;

export default editor.reducer;
