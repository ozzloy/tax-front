import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import kingReducer from "./kingSlice";
import themeReducer from "./themeSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    king: kingReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});
