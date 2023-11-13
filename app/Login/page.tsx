import React from 'react';
import AuthForm from './components/AuthForm';
import Image from 'next/image';

const Login = () => {
  return (
    <div className='w-full h-screen flex flex-col '>
      <div className='w-full sm:w-4/6 h-3/6 sm:h-full custom-gradient flex flex-col items-center sm:items-start justify-center pb-24 sm:pb-0 sm:pt-24'>
        <div className='w-4/6 h-3/6 sm:w-[12%] sm:h-1/6  sm:absolute left-2 top-0 relative'>
          <Image
            priority
            alt='Logo'
            fill
            src='/img/sihadir-putih.svg'
            className='w-full h-auto'
          />
        </div>
        <h1 className='text-white text-2xl max-w-2xl ml-20 hidden sm:block'>
          <span className='font-bold'>Aplikasi</span> Presensi Mahasiswa Program
          Studi Teknik Informatika yang Bisa Diakses Secara Online
        </h1>
        <div className='hidden sm:block w-5/6 h-5/6 relative '>
          <Image
            priority
            alt='Logo'
            fill
            src='/img/log-chara.svg'
            className='w-full h-auto'
          />
        </div>
      </div>
      <div className='absolute z-10 bottom-0 sm:right-0 bg-white w-full sm:w-2/5 h-4/6 sm:h-full rounded-t-3xl sm:rounded-r-none sm:rounded-l-3xl flex items-center justify-center shadow-lg shadow-gray-400'>
        <div className='w-[20%] h-[6%] absolute right-4 top-2 hidden sm:block '>
          <Image
            priority
            alt='Logo'
            fill
            src='/img/sihadir-warna.svg'
            className='w-full h-auto'
          />
        </div>
        <div className='w-5/6 sm:w-4/6 flex flex-col'>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
