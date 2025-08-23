import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkAPI } from "../../config/store";
import { CVObject, SkillType } from "./types";
import mockCVData from "./mock-cv-info.json";

const mockCV: CVObject = {
  ...mockCVData,
  skillList: mockCVData.skillList.map((skill) => ({
    ...skill,
    type: skill.type as SkillType,
  })),
  uploadDate: new Date(mockCVData.uploadDate),
};

interface PageContentInitialState {
  parsedCVLoaded: boolean;
  pageContentLoaded: boolean;
  parsedCV: CVObject;
  pageContent: CVObject;
}

const initialState: PageContentInitialState = {
  parsedCVLoaded: true,
  pageContentLoaded: false,
  parsedCV: {} as CVObject,
  pageContent: {} as CVObject,
};

const requestURL = "api/cv";

export const getParsedCV = createAsyncThunk<any, File, ThunkAPI>(
  "editPage/getParsedCV",
  async (cvFile, { signal }) => {
    const formData = new FormData();
    formData.append("file", cvFile);

    return axios.post(requestURL + "/parseCVFile", formData, {
      signal,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
);

export const saveCV = createAsyncThunk<any, CVObject, ThunkAPI>(
  "editPage/saveCV",
  async (cv, { signal }) => axios.post(requestURL + "/saveCV", cv, { signal }),
);

export const getCVById = createAsyncThunk<any, number, ThunkAPI>(
  "editPage/getCVById",
  async (cvId, { signal }) =>
    axios.get(requestURL + `/getCV/${cvId}`, { signal }),
);

export const getLatestCV = createAsyncThunk<any, void, ThunkAPI>(
  "editPage/getLatestCV",
  async (_, { signal }) => axios.get(requestURL + `/getLatestCV`, { signal }),
);

export const CVSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    setPageContent: (state, action) => {
      state.pageContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isPending(getCVById, getLatestCV, getParsedCV),
        (state, action) => {
          switch (action.type) {
            case "editPage/getLatestCV/pending":
              state.pageContentLoaded = false;
              state.pageContent = {} as CVObject;
              break;
            case "editPage/getParsedCV/pending":
              state.parsedCVLoaded = false;
              state.parsedCV = {} as CVObject;
              break;
            default:
            // do nothing
          }
        },
      )
      .addMatcher(
        isFulfilled(getCVById, getLatestCV, getParsedCV),
        (state, action) => {
          switch (action?.type) {
            case "editPage/getLatestCV/fulfilled":
              state.pageContentLoaded = true;
              state.pageContent = action.payload?.data;
              break;
            case "editPage/getParsedCV/fulfilled":
              state.parsedCVLoaded = true;
              state.parsedCV = action.payload?.data;
              break;
            default:
            // do nothing
          }
        },
      )
      .addMatcher(isRejected(getCVById, getLatestCV), (state, action) => {
        switch (action.type) {
          case "editPage/getLatestCV/rejected":
            state.pageContentLoaded = true;
            state.pageContent = mockCV as CVObject;
            break;
          case "editPage/getParsedCV/rejected":
            state.parsedCVLoaded = true;
            state.parsedCV = mockCV as CVObject;
            break;
          default:
          // do nothing
        }
      });
  },
});

export const { setPageContent } = CVSlice.actions;
export default CVSlice.reducer;
