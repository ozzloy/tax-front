import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

const getKingFromState = (state) => {
  if (!("current_king_id" in state && "king" in state)) return null;
  const king = state.king[state["current_king_id"]];
  return king;
};

export const fetchCsrfToken = createAsyncThunk(
  "auth/fetchCsrfToken",
  async () => {
    const response = await api.get("/api/csrf-token");
    api.defaults.headers.common["X-CSRF-TOKEN"] =
      response.data.csrf_token;
    return response.data.csrf_token;
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (kingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/king/", kingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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

export const getKing = createAsyncThunk(
  "auth/getKing",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/king/");
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
      await api.delete("/api/session/");
      localStorage.removeItem("king");
      return null;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const getInitialState = () => {
  const king = localStorage.getItem("king");
  return {
    king: king ? JSON.parse(king) : null,
    csrfToken: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.csrfToken = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.king = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.king = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.king = null;
      })
      .addCase(getKing.fulfilled, (state, action) => {
        const king = getKingFromState(action.payload);
        state.king = king;
        localStorage.setItem("king", JSON.stringify(king));
      })
      .addCase(getKing.rejected, (state) => {
        state.king = null;
      });
  },
});

export default authSlice.reducer;
