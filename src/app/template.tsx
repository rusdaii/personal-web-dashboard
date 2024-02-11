import React, { Suspense } from 'react';

import Nprogress from '@/components/parts/Nprogress';

const Template: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Suspense>
      <Nprogress />
      {children}
    </Suspense>
  );
};

export default Template;
