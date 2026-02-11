import type { ImageObject } from "../../types";

export interface Project {
  id: number;
  name: string;
  description: string;
  image?: ImageObject;
  repoLink?: string;
  tags?: string[];
}
