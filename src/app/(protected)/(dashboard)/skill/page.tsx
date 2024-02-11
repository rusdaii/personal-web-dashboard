import Skills from '@/components/pages/Skills';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Skills' },
  { withSuffix: true }
);

const SkillPage = () => {
  return <Skills />;
};

export default SkillPage;
