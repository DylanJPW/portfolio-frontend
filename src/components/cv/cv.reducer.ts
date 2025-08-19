import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";
import axios from "axios";
import { IThunkAPI } from "../../config/store";
import { CVObject, SkillType } from "./types";
import mockCVData from "./mock-cv-info.json"

const mockCV: CVObject = {
  ...mockCVData,
  skillList: mockCVData.skillList.map((skill) => ({
    ...skill,
    type: skill.type as SkillType,
  })),
  uploadDate: new Date(mockCVData.uploadDate),
};

interface CVInitialState {
  loaded: boolean;
  selectedCV: CVObject;
}

const initialState: CVInitialState  = {
  loaded: true,
  selectedCV: mockCV as CVObject,
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

export const getCVById = createAsyncThunk<any, number, IThunkAPI>(
  "cv/getCV",
  async (cvId, {signal}) => axios.get(requestURL + `/getCV/${cvId}`, {signal})
);

export const getLatestCV = createAsyncThunk<any, void, IThunkAPI>(
  "cv/getCV",
  async (_, {signal}) => axios.get(requestURL + `/getLatestCV`, {signal})
);

export const CVSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getCVById, getLatestCV), (state) => {
        state.loaded = false;
        state.selectedCV = {} as CVObject;
      })
      .addMatcher(isFulfilled(getCVById, getLatestCV), (state, action) => {
        state.loaded = true;
        state.selectedCV = action.payload.data;
      })
      .addMatcher(isRejected(getCVById, getLatestCV), (state) => {
        state.loaded = false;
        state.selectedCV = mockCV as CVObject;
      });
  },
});

export default CVSlice.reducer;
