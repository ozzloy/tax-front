import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

import { api } from "./authSlice.js";

export const createTheme = createAsyncThunk(
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

export const readTheme = createAsyncThunk(
  "theme/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/theme/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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

export const updateTheme = createAsyncThunk(
  "theme/update",
  async ({ id, ...themeData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/theme/${id}`, themeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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
      .addCase(createTheme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTheme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.theme = merge({}, state.theme, action.payload.theme);
      })
      .addCase(createTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(readTheme.fulfilled, (state, action) => {
        state.theme = merge({}, state.theme, action.payload.theme);
      })
      .addCase(updateTheme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.theme = merge({}, state.theme, action.payload.theme);
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateThemeField } = themeSlice.actions;
export default themeSlice.reducer;
