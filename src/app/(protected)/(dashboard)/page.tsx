import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import Home from '@/components/pages/Home';
import { ROLE } from '@/lib/constants/common';
import generateMetadata from '@/lib/metadata';
import { pageAuthorization } from '@/lib/pageAuthorization';
import { getQueryClient } from '@/lib/queryClient';

export const metadata = generateMetadata(
  { title: 'Home' },
  { withSuffix: true }
);

const HomePage = async () => {
  const queryClient = getQueryClient();

  await pageAuthorization(ROLE.ADMIN);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
};

export default HomePage;
