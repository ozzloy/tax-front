import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

import { api } from "./authSlice.js";

export const createForm1040 = createAsyncThunk(
  "form1040/create",
  async (form1040Data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/form_1040/",
        form1040Data,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const readForm1040 = createAsyncThunk(
  "form1040/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/form_1040/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
    /*
      {'form1040': {'1': {'created': '2025-01-18T01:33:12.661973',
                         'id': 1,
                         'street': '123 fake street',
                         'king_id': 1,
                         'city': 'bobville',
                         'state': 'CA',
                         'zip': '90210',
                         'updated': '2025-01-18T01:33:12.661983'},
                   '2': {'created': '2025-01-18T01:33:12.663992',
                         'id': 2,
                         'street': '321 real boulevard',
                         'king_id': 1,
                         'city': 'lauramont',
                         'state': 'WA',
                         'zip': '90210',
                         'updated': '2025-01-18T01:33:12.663995'}}}
      */
  },
);

export const updateForm1040 = createAsyncThunk(
  "form1040/update",
  async ({ id, ...form1040Data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/form_1040/${id}`,
        form1040Data,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteForm1040 = createAsyncThunk(
  "form1040/delete",
  async ({ id, ...form1040Data }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/form_1040/${id}`,
        form1040Data,
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
  form1040: {},
};

const form1040Slice = createSlice({
  name: "form1040",
  initialState,
  reducers: {
    updateForm1040Field: (slice, action) => {
      slice.form1040 = merge(
        {},
        slice.form1040,
        action.payload.form1040,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createForm1040.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createForm1040.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.form1040 = merge(
          {},
          state.form1040,
          action.payload.form1040,
        );
      })
      .addCase(createForm1040.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(readForm1040.fulfilled, (state, action) => {
        state.form1040 = merge(
          {},
          state.form1040,
          action.payload.form1040,
        );
      })
      .addCase(updateForm1040.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateForm1040.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.form1040 = merge(
          {},
          state.form1040,
          action.payload.form1040,
        );
      })
      .addCase(updateForm1040.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteForm1040.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.form1040 = Object.fromEntries(
          Object.entries(
            merge({}, state.form1040, action.payload.form1040),
          ).filter(([, value]) => value !== null),
        );
      })
      .addCase(deleteForm1040.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateForm1040Field } = form1040Slice.actions;
export default form1040Slice.reducer;
