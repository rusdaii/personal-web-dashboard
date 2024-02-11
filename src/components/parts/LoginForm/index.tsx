'use client';
import { useCallback } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  Link,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { setAccessToken } from '@/lib/cookies';
import { login } from '@/repositories/auth';
import { AuthPayload } from '@/repositories/auth/types';

const LoginForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AuthPayload>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async ({ data }) => {
      const signInResponse = await signIn('credentials', {
        redirect: false,
        id: data.user.id,
        accessToken: data.accessToken,
        role: data.user.role,
      });

      if (signInResponse && signInResponse.error) {
        toast.error('Something went wrong');
        return;
      }

      toast.success('Login successful');

      setAccessToken(data.accessToken);

      router.push('/');
    },
  });

  const onSubmit = useCallback(
    (data: AuthPayload) => {
      loginMutation.mutate(data);
    },
    [loginMutation]
  );

  return (
    <Card className="p-10 max-w-[1000px]">
      <CardHeader>
        <h1>Sign In</h1>
      </CardHeader>
      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            aria-label="Email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
            })}
          />

          <Input
            type="password"
            label="Password"
            aria-label="Password"
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
            })}
          />

          <div className="flex py-2 px-1 gap-10 justify-between">
            <Checkbox
              classNames={{
                label: 'text-small',
              }}
            >
              Remember me
            </Checkbox>
            <Link color="primary" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
        </CardBody>

        <CardFooter>
          <Button
            type="submit"
            color="primary"
            isDisabled={loginMutation.isPending}
            isLoading={loginMutation.isPending}
            className="w-full"
          >
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
