import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkAPI } from "../config/store";
import axios from "axios";

const requestURL = "api/cv";

export const uploadCV = createAsyncThunk<any, File, IThunkAPI>(
  "cv/uploadCV",
  async (cvFile, { signal }) => {
    const formData = new FormData();
    formData.append("file", cvFile);

    return axios.post(requestURL + "/upload", formData, {
      signal,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
);
