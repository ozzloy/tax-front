import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

import { api } from "./authSlice.js";

export const createHuman = createAsyncThunk(
  "human/create",
  async (humanData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/human/", humanData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const readHuman = createAsyncThunk(
  "human/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/human/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
    /*
      {'human': {'1': {'created': '2025-01-18T01:33:12.661973',
                       'id': 1,
                       'first_name': 'bob',
                       'king_id': 1,
                       'last_name': 'bobert',
                       'middle_initial': 'b',
                       'updated': '2025-01-18T01:33:12.661983'},
                 '2': {'created': '2025-01-18T01:33:12.663992',
                       'id': 2,
                       'first_name': 'laura',
                       'king_id': 1,
                       'last_name': 'bobert',
                       'middle_initial': 'k',
                       'updated': '2025-01-18T01:33:12.663995'}}}
      */
  },
);

export const updateHuman = createAsyncThunk(
  "human/update",
  async ({ id, ...humanData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/human/${id}`, humanData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteHuman = createAsyncThunk(
  "human/delete",
  async ({ id, ...humanData }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/human/${id}`,
        humanData,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const initialState = {
  status: "idle",
  error: null,
  human: {},
};

const humanSlice = createSlice({
  name: "human",
  initialState,
  reducers: {
    updateHumanField: (slice, action) => {
      slice.human = merge({}, slice.human, action.payload.human);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHuman.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHuman.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.human = merge({}, state.human, action.payload.human);
      })
      .addCase(createHuman.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(readHuman.fulfilled, (state, action) => {
        state.human = merge({}, state.human, action.payload.human);
      })
      .addCase(updateHuman.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateHuman.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.human = merge({}, state.human, action.payload.human);
      })
      .addCase(updateHuman.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteHuman.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.human = Object.fromEntries(
          Object.entries(
            merge({}, state.human, action.payload.human),
          ).filter(([, value]) => value !== null),
        );
      })
      .addCase(deleteHuman.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateHumanField } = humanSlice.actions;
export default humanSlice.reducer;
