import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const api = axios.create({
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    king: null,
    csrfToken: null,
  },
  reducers: {
    logout: (state) => {
      state.king = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.csrfToken = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.king = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
