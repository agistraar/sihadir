import Button from '@/app/CoreComponents/Button';
import React from 'react';

const TokenContainer = () => {
  return (
    <div className='relative w-full md:w-[40%] custom-gradient rounded-2xl flex flex-col items-center justify-center p-4 pb-12 sm:pb-4'>
      <h1 className='font-medium text-xl text-white'>Token Absen</h1>
      <h3 className='font-semibold text-xl tracking-widest text-white'>
        34L5I9
      </h3>
      <div className='absolute bottom-3 right-3'>
        <Button white>Tutup Kelas</Button>
      </div>
    </div>
  );
};

export default TokenContainer;
