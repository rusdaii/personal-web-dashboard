import { SuccessResponseData } from '@/types/response';

export type User = {
  id: string;
  name: string;
  role: string;
};

export type AuthPayload = {
  email: string;
  password: string;
};

export type LoginResponse = SuccessResponseData<{
  user: User;
  accessToken: string;
}>;
