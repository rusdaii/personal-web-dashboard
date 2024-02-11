import { SuccessResponseData } from '@/types/response';

export type Skill = {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetSkillsResponse = SuccessResponseData<Skill[]>;

export type SkillResponse = SuccessResponseData<Skill>;
