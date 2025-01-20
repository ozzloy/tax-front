import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

import { api } from "./authSlice.js";

export const addTheme = createAsyncThunk(
  "theme/create",
  async (themeData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/theme/", themeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTheme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTheme.fulfilled, (state, action) => {
        (state.status = "succeeded"),
          (state.theme = merge(
            {},
            state.theme,
            action.payload.theme,
          ));
      })
      .addCase(addTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default themeSlice.reducer;
