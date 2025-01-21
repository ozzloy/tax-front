import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const api = axios.create({
  withCredentials: true,
});

export const fetchCsrfToken = createAsyncThunk(
  "auth/fetchCsrfToken",
  async () => {
    const response = await api.get("/api/csrf-token");
    api.defaults.headers.common["X-CSRF-TOKEN"] =
      response.data.csrf_token;
    return response.data.csrf_token;
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/session/", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/session/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: { csrfToken: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (slice, action) => {
        slice.csrfToken = action.payload;
      })
      .addCase(logout.fulfilled, (slice) => {
        slice.csrfToken = null;
      });
  },
});

export default authSlice.reducer;
