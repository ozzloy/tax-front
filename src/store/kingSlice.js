import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api, login, logout } from "./authSlice";
import { merge } from "lodash";

export const selectCurrentKing = (state) => {
  const currentKingId = state.king.current_king_id;
  const kings = state.king.king;
  return currentKingId && kings ? kings[currentKingId] : null;
};

export const createKing = createAsyncThunk(
  "king/create",
  async (kingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/king/", kingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const readKing = createAsyncThunk(
  "king/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/king/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateKing = createAsyncThunk(
  "king/update",
  async (kingData, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/king/", kingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const deleteKing = createAsyncThunk(
  "king/delete",
  async (kingData, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/king/", kingData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const fulfilled = (slice, action) => {
  const payload = action.payload;
  const king = payload.king;
  const current_king_id = payload.current_king_id;
  slice.king = merge({}, slice.king, king);
  slice.current_king_id = current_king_id;
  localStorage.setItem("king.king", JSON.stringify(king));
  localStorage.setItem(
    "king.current_king_id",
    JSON.stringify(current_king_id),
  );
};

const getInitialState = () => {
  const king = JSON.parse(localStorage.getItem("king.king") || "{}");
  const current_king_id = JSON.parse(
    localStorage.getItem("king.current_king_id") || "null",
  );
  return { king, current_king_id };
};

const kingSlice = createSlice({
  name: "king",
  initialState: getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, fulfilled)
      .addCase(logout.fulfilled, fulfilled)
      .addCase(createKing.fulfilled, fulfilled)
      .addCase(readKing.fulfilled, fulfilled)
      .addCase(updateKing.fulfilled, fulfilled)
      .addCase(deleteKing.fulfilled, fulfilled);
  },
});

export default kingSlice.reducer;
