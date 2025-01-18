import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModal: null,
  theme: {
    active: 1,
    1: {
      background_color: "#111",
      created: "2025-01-18T01:33:12.661973",
      id: 1,
      king_id: null,
      name: "night",
      text_color: "chartreuse",
      updated: "2025-01-18T01:33:12.661983",
    },
    2: {
      background_color: "black",
      created: "2025-01-18T01:33:12.663992",
      id: 2,
      king_id: null,
      name: "light",
      text_color: "#111111",
      updated: "2025-01-18T01:33:12.663995",
    },
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentModal: (state, action) => {
      state.currentModal = action.payload;
    },
    setActiveTheme: (state, action) => {
      state.activeTheme = action.payload;
    },
  },
});

export const { setCurrentModal, setActiveTheme } = uiSlice.actions;
export default uiSlice.reducer;
