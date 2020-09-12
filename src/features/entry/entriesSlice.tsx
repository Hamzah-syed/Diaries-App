import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//interface
import { Entry } from "../../interfaces/entry.interface";

const Entries = createSlice({
  name: "Enteies",
  initialState: [] as Entry[],
  reducers: {
    addEntry(state, { payload }: PayloadAction<Entry[] | null>) {
      return (state = payload != null ? payload : []);
    },

    updateEntry(state, { payload }: PayloadAction<Entry>) {
      const { id } = payload;
      const entryIndex = state.findIndex((entry) => entry.id === id);
      if (entryIndex !== -1) {
        state.splice(entryIndex, 1, payload);
      }
    },
  },
});

export const { addEntry, updateEntry } = Entries.actions;
export default Entries.reducer;
