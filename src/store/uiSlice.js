import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModal: null,
  activeThemeId: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveThemeId: (slice, action) => {
      slice.activeThemeId = action.payload;
    },
    setCurrentModal: (slice, action) => {
      slice.currentModal = action.payload;
    },
  },
});

export const { setCurrentModal, setActiveThemeId } = uiSlice.actions;
export default uiSlice.reducer;
