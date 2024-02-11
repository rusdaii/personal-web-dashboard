export type User = {
  id: string;
  email: string;
  name: string;
  about: string;
  role: string;
  avatar: string;
  resume: string;
};

export type getUserResponse = {
  data: User;
};
