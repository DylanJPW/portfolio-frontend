import { useEffect, useState } from "react";
import axios from "axios";
import { type Project } from "./types";

const requestURL = "api/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getProjects = async () => {
    try {
      setLoaded(false);
      const res = await axios.get(requestURL + "/getAllProjects");
      setProjects(res.data);
      setLoaded(true);
    } catch (e) {
      setError("Failed to load projects");
      setLoaded(true);
    }
  };

  const addProject = async (project: Project) => {
    await axios.post(requestURL + "/addProject", project);
  };

  const deleteProject = async (id: number) => {
    await axios.delete(requestURL + `/deleteProject/${id}`);
  };

  const updateProject = async (project: Project) => {
    await axios.put(requestURL + `/updateProject/${project.id}`, project);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return {
    projects,
    loaded,
    error,
    getProjects,
    addProject,
    deleteProject,
    updateProject,
  };
}
