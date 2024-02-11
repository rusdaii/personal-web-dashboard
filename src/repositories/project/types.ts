import { SuccessResponseData } from '@/types/response';

export type ProjectSkills = {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  skills: ProjectSkills[];
};

export type getProjectsResponse = SuccessResponseData<Project[]>;
