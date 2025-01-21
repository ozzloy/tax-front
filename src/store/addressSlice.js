import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

import { api } from "./authSlice.js";

export const createAddress = createAsyncThunk(
  "address/create",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/address/", addressData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const readAddress = createAsyncThunk(
  "address/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/address/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
    /*
      {'address': {'1': {'created': '2025-01-18T01:33:12.661973',
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

export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, ...addressData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/address/${id}`,
        addressData,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({ id, ...addressData }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/api/address/${id}`,
        addressData,
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
  address: {},
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    updateAddressField: (slice, action) => {
      slice.address = merge(
        {},
        slice.address,
        action.payload.address,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = merge(
          {},
          state.address,
          action.payload.address,
        );
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(readAddress.fulfilled, (state, action) => {
        state.address = merge(
          {},
          state.address,
          action.payload.address,
        );
      })
      .addCase(updateAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = merge(
          {},
          state.address,
          action.payload.address,
        );
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = Object.fromEntries(
          Object.entries(
            merge({}, state.address, action.payload.address),
          ).filter(([, value]) => value !== null),
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateAddressField } = addressSlice.actions;
export default addressSlice.reducer;
