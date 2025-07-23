import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Project } from "./types";
import axios from "axios";
import { IThunkAPI } from "../../config/store";

export interface ProjectsPageState {
  loaded: boolean;
  projects: Project[];
}

const initialState: ProjectsPageState = {
  loaded: false,
  projects: [] as Project[],
}

const requestURL = 'api/projects';

export const getProjects = createAsyncThunk<any, void, IThunkAPI>(
  "projects/getProjects",
  async (_, { signal }) => axios.get(requestURL + '/getAllProjects', { signal }),
)

export const addProject = createAsyncThunk<any, Project, IThunkAPI>(
  "projects/addProject",
  async(project, {signal}) => axios.post(requestURL + '/addProject', project, {signal}),
)

export const deleteProject = createAsyncThunk<any, number, IThunkAPI>(
  "projects/deleteProjects",
  async(id, {signal}) => axios.delete(requestURL + `/deleteProject/${id}`, {signal}),
)

export const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loaded = true;
        state.projects = action.payload.data;
      })
      .addCase(getProjects.rejected, (state) => {
        state.loaded = false;
        state.projects = [];
      });
  }
});

export default ProjectsSlice.reducer;