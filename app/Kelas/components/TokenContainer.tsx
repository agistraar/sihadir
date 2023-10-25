'use client';
import Button from '@/app/CoreComponents/Button';
import Input from '@/app/CoreComponents/Input';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const TokenContainer = () => {
  const role = useSearchParams().get('role');
  return (
    <div className='relative w-full md:w-[40%] custom-gradient rounded-2xl '>
      {role === 'dosen' || role == 'kaprodi' ? <DosenView /> : null}
      {role === 'mahasiswa' && <MahasiswaView />}
    </div>
  );
};

const DosenView = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-4 pb-12 sm:pb-4'>
      <h1 className='font-medium text-xl text-white'>Token Presensi</h1>
      <h3 className='font-semibold text-xl tracking-widest text-white'>
        34L5I9
      </h3>
      <div className='absolute bottom-3 right-3'>
        <Button white>Tutup Kelas</Button>
      </div>
    </div>
  );
};

const MahasiswaView = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FieldValues>({
    defaultValues: {
      tokenAbsen: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-4 space-y-2'>
      <h1 className='font-medium text-xl text-white'>Absen Sekarang</h1>
      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            id='tokenAbsen'
            label='Token Absen'
            register={register}
            required
            errors={errors}
            type='text'
          />
          {errors.tokenAbsen?.type === 'required' && (
            <p className='text-xs text-red-500'>Token Harus Diisi</p>
          )}
        </div>
        <div className=' w-full flex justify-center'>
          <Button type='submit' white>
            Absen
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TokenContainer;
