'use client';
import Button from '@/app/CoreComponents/Button';
import Input from '@/app/CoreComponents/Input';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      noInduk: '',
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className='sm:mx-auto w-full flex flex-col justify-center'>
      <h2 className='mt-6 text-2xl font-bold tracking-tight text-black'>
        Login to your account
      </h2>
      <h3 className='text-base text-gray-500 tracking-tight mt-2'>
        Masukkan nomor induk dan password untuk melanjutkan
      </h3>
      <div>
        <div className='bg-white py-2 sm;rounded-lg'>
          <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
            <Input
              id='email'
              label='Email'
              register={register}
              errors={errors}
              type='email'
            />
            <Input
              id='password'
              label='Password'
              register={register}
              errors={errors}
              type='password'
            />
          </form>
          <div className='mt-6'>
            <Button
              type='submit'
              fullWidth
              large
              onClick={() => router.replace('Dashboard')}
            >
              Masuk
            </Button>
          </div>
          <div className='text-sm text-gray-500 tracking-tight mt-4 flex justify-center'>
            Jika akun bermasalah hubungi
            <span className='primary-blue ml-1'>
              <a href='#' className='font-semibold'>
                Admin
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
