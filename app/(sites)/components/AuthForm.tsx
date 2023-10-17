'use client';
import Button from '@/app/CoreComponents/Button';
import Input from '@/app/CoreComponents/Input';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'react-feather';

const AuthForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
            <div>
              <Input
                id='noInduk'
                label='Nomor Induk'
                register={register}
                required
                errors={errors}
                type='text'
                autoComplete='on'
              />
              {errors.noInduk?.type === 'required' && (
                <p className='text-xs text-red-500'>Nomor Induk Harus Diisi</p>
              )}
            </div>
            <div>
              <div className='relative'>
                <Input
                  id='password'
                  label='Password'
                  register={register}
                  required
                  errors={errors}
                  type={isVisible ? 'text' : 'password'}
                  autoComplete='off'
                />
                <div
                  className='absolute right-2 top-1/2 transform -translate-y-1/2'
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <EyeOff color='#555555' />
                  ) : (
                    <Eye color='#555555' />
                  )}
                </div>
              </div>
              {errors.password?.type === 'required' && (
                <p className='text-xs text-red-500'>Password Harus Diisi</p>
              )}
            </div>
            <div className='mt-6'>
              <Button
                type='submit'
                fullWidth
                large
                onClick={() => {
                  if (isValid) {
                    router.replace('Dashboard');
                  }
                }}
              >
                Masuk
              </Button>
            </div>
          </form>
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
