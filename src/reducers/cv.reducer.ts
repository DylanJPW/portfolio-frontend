import { createAsyncThunk } from "@reduxjs/toolkit";
import { IThunkAPI } from "../config/store";
import axios from "axios";

const requestURL = 'api/cv';

export const uploadCV = createAsyncThunk<any, File, IThunkAPI>(
  "cv/uploadCV",
  async(cvFile, {signal}) => {
    axios.post(requestURL + '/upload', cvFile, {signal})
  }
);