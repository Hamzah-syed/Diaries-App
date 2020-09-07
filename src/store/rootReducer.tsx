import { combineReducers } from "@reduxjs/toolkit";
//reducers
import AuthReducer from "../features/auth/authSlice";
import UserReducer from "../features/auth/userSlice";
import DiaryReducer from "../features/diary/diariesSlice";
import EntryReducer from "../features/entry/entriesSlice";
import EditorReducer from "../features/entry/editorSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  diaries: UserReducer,
  entries: DiaryReducer,
  user: EntryReducer,
  editor: EditorReducer,
});

export type rootState = ReturnType<typeof rootReducer>;
export default rootReducer;
