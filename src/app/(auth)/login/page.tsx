import Login from '@/components/pages/Login';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata(
  { title: 'Login' },
  { withSuffix: true }
);

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
