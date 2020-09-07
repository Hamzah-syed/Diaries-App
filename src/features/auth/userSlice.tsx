import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//interface
import { User } from "../../interfaces/user.interface";

export const user = createSlice({
  name: "setUser",
  initialState: null as User | null,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      return (state = payload != null ? payload : null);
    },
  },
});

export const { setUser } = user.actions;
export default user.reducer;
