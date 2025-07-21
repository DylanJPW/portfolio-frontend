export interface ProjectImage {
  imageUrl: string;
  altText?: string;
}

export interface Project {
  name: string;
  description: string;
  image?: ProjectImage;
  repoLink?: string;
  tags?: string[];
}
