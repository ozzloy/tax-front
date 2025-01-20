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

export const fetchThemes = createAsyncThunk(
  "theme/fetchThemes",
  async () => {
    const response = await fetch("/api/theme/");
    const json = await response.json();
    if (!json) throw json;
    return json;
    /*
      {'theme': {'1': {'background_color': '#111',
                      'created': '2025-01-18T01:33:12.661973',
                      'id': 1,
                      'king_id': None,
                      'name': 'night',
                      'foreground_color': 'chartreuse',
                      'updated': '2025-01-18T01:33:12.661983'},
                '2': {'background_color': 'black',
                      'created': '2025-01-18T01:33:12.663992',
                      'id': 2,
                      'king_id': None,
                      'name': 'light',
                      'foreground_color': '#111111',
                      'updated': '2025-01-18T01:33:12.663995'}}}
      */
  },
);

const initialState = {
  status: "idle",
  error: null,
  theme: {
    1: {
      background_color: "#111",
      created: "2025-01-18T01:33:12.661973",
      id: 1,
      king_id: null,
      name: "night",
      foreground_color: "chartreuse",
      updated: "2025-01-18T01:33:12.661983",
    },
    2: {
      background_color: "whitesmoke",
      created: "2025-01-18T01:33:12.663992",
      id: 2,
      king_id: null,
      name: "light",
      foreground_color: "#111",
      updated: "2025-01-18T01:33:12.663995",
    },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeField: (slice, action) => {
      slice.theme = merge({}, slice.theme, action.payload.theme);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTheme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTheme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.theme = merge({}, state.theme, action.payload.theme);
      })
      .addCase(addTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchThemes.fulfilled, (state, action) => {
        state.theme = merge({}, state.theme, action.payload.theme);
      });
  },
});

export const { updateThemeField } = themeSlice.actions;
export default themeSlice.reducer;
