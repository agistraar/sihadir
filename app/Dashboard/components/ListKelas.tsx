import Button from '@/app/CoreComponents/Button';
import React from 'react';

type ListKelasParams = {
  waktu: string;
  matkul: string;
  ruang: string;
  jam: string;
};

const ListKelas = ({ waktu, matkul, ruang, jam }: ListKelasParams) => {
  return (
    <div className='w-full flex flex-col space-y-3 text-base font-medium '>
      <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent' />
      <div className='w-full rounded-2xl flex items-center justify-between custom-gradient px-3 py-1.5 text-white'>
        <h2>{waktu}</h2>
      </div>
      <div className='flex flex-col space-y-2 pl-2'>
        <h2>{matkul}</h2>
        <h2>Ruang {ruang}</h2>
        <h2>{jam} Jam</h2>
      </div>
      <div className='w-full flex justify-end'>
        <Button>Mulai</Button>
      </div>
    </div>
  );
};

export default ListKelas;
