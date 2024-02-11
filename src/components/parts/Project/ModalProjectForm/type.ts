import { File } from 'buffer';

import { MultiValue } from 'react-select';

export type ProjectPayload = {
  name: string | '';
  description: string;
  image: [File] | '';
  github: string;
  demo: string;
  skills: MultiValue<Skill>;
};

export type Skill = {
  value: string;
  label: string;
};
