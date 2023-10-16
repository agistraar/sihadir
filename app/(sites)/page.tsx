import React from 'react';
import AuthForm from './components/AuthForm';
import Image from 'next/image';

const Login = () => {
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='w-full sm:w-4/6 h-3/6 sm:h-full custom-gradient flex flex-col items-center sm:items-start justify-center pb-24 sm:pb-0 sm:pt-20 sm:pl-20'>
        <Image
          alt='Logo'
          height='220'
          width='220'
          src='/img/sihadir-putih.svg'
          className='sm:absolute left-2 -top-16'
        />
        <h1 className='text-white text-2xl max-w-2xl hidden sm:block'>
          <span className='font-bold'>Aplikasi</span> Absensi Mahasiswa Program
          Studi Teknik Informatika yang Bisa Diakses Secara Online
        </h1>
        <Image
          alt='Logo'
          height='650'
          width='650'
          src='/img/log-chara.svg'
          className='hidden sm:block'
        />
      </div>
      <div className='absolute z-10 bottom-0 sm:right-0 bg-white w-full sm:w-2/5 h-4/6 sm:h-full rounded-t-3xl sm:rounded-r-none sm:rounded-l-3xl flex items-center justify-center'>
        <Image
          alt='Logo'
          height='120'
          width='120'
          src='/img/sihadir-warna.svg'
          className='absolute right-4 -top-8 hidden sm:block'
        />
        <div className='w-5/6 flex flex-col'>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
