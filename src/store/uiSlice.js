import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentModal: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentModal: (slice, action) => {
      slice.currentModal = action.payload;
    },
  },
});

export const { setCurrentModal } = uiSlice.actions;
export default uiSlice.reducer;
