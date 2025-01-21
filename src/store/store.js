import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import addressReducer from "./addressSlice";
import form1040Reducer from "./form1040Slice";
import humanReducer from "./humanSlice";
import kingReducer from "./kingSlice";
import themeReducer from "./themeSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    address: addressReducer,
    auth: authReducer,
    form1040: form1040Reducer,
    human: humanReducer,
    king: kingReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});
