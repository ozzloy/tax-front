import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});
