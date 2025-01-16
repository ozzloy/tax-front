import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModal: null,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentModal: (state, action) => {
      state.currentModal = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { setCurrentModal, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
