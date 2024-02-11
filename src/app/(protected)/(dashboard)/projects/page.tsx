import Projects from '@/components/pages/Projects';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Projects' },
  { withSuffix: true }
);

const ProjectsPage = () => {
  return <Projects />;
};

export default ProjectsPage;
