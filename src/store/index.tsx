import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), customMiddleware],
});
