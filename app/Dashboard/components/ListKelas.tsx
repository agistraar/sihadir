import Button from '@/app/CoreComponents/Button';
import React from 'react';

type ListKelasParams = {
  waktu: string;
  matkul: string;
  kelas: string;
  ruang: string;
  jam: string;
};

const ListKelas = ({ waktu, matkul, kelas, ruang, jam }: ListKelasParams) => {
  return (
    <div className='w-full flex flex-col space-y-3 text-base rounded-2xl font-medium shadow-sm shadow-gray-400 border-gray-400 p-1.5 py-3'>
      <div className='w-full font-bold rounded-2xl flex items-center justify-between custom-gradient px-3 py-2 text-white'>
        <div className='w-1/2 text-start'>
          <h2>{matkul}</h2>
        </div>
        <div className='w-1/2 text-end'>
          <h2>{waktu}</h2>
        </div>
      </div>
      <div className='flex flex-col space-y-2 pl-2'>
        <h2>Kelas : {kelas}</h2>
        <h2>Ruang : {ruang}</h2>
        <h2>Total Jam : {jam} Jam</h2>
      </div>
      <div className='w-full flex justify-end pr-2'>
        <Button>Mulai</Button>
      </div>
    </div>
  );
};

export default ListKelas;
