export interface ProjectImage {
  imageUrl?: string;
  altText?: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  image?: ProjectImage;
  repoLink?: string;
  tags?: string[];
}
