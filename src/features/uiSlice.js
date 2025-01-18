import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { merge } from "lodash";

export const fetchThemes = createAsyncThunk(
  "ui/fetchThemes",
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
  currentModal: null,
  activeThemeId: 1,
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

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentModal: (slice, action) => {
      slice.currentModal = action.payload;
    },
    setActiveThemeId: (slice, action) => {
      slice.activeThemeId = action.payload;
    },
    updateThemeField: (slice, action) => {
      slice.theme = merge({}, slice.theme, action.payload.theme);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchThemes.fulfilled, (state, action) => {
      state.theme = merge({}, state.theme, action.payload.theme);
    });
  },
});

export const { setCurrentModal, setActiveThemeId, updateThemeField } =
  uiSlice.actions;
export default uiSlice.reducer;
