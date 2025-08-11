import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IThunkAPI } from "../../config/store";
import { CVObject } from "./types";

interface CVInitialState {
  loaded: boolean;
  cv: CVObject;
}

const initialState: CVInitialState  = {
  loaded: false,
  cv: {} as CVObject,
}

const requestURL = "api/cv";

export const uploadCV = createAsyncThunk<any, File, IThunkAPI>(
  "cv/uploadCV",
  async (cvFile, { signal }) => {
    const formData = new FormData();
    formData.append("file", cvFile);

    return axios.post(requestURL + "/uploadCV", formData, {
      signal,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
);

export const getCV = createAsyncThunk<any, number, IThunkAPI>(
  "cv/getCV",
  async (cvId, {signal}) => axios.get(requestURL + `/getCV/${cvId}`, {signal})
);

export const CVSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCV.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getCV.fulfilled, (state, action) => {
        state.loaded = true;
        state.cv = action.payload.data;
      })
      .addCase(getCV.rejected, (state) => {
        state.loaded = false;
        state.cv = {} as CVObject;
      });
  },
});

export default CVSlice.reducer;
