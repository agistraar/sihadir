import Button from '@/app/CoreComponents/Button';
import React from 'react';

type ListKonfirMahasiswaParams = {
  matkul: string;
  tanggal: string;
  jam: string;
};

const ListKonfirMahasiswa = ({
  matkul,
  tanggal,
  jam,
}: ListKonfirMahasiswaParams) => {
  return (
    <div className='bg-gray-300 rounded-xl flex text-base font-medium relative'>
      <div className='w-[20%] md:w-[11%] rounded-l-xl flex items-center justify-center bg-red-400'>
        <h2 className='font-bold'>Alpa</h2>
      </div>
      <div className='flex flex-col space-y-1 px-2 py-1 '>
        <h1>{matkul}</h1>
        <h1>{tanggal}</h1>
        <h1>{jam + ' jam'}</h1>
      </div>
      <div className='absolute right-2 bottom-2 w-fit h-fit'>
        <Button>Update Kehadiran</Button>
      </div>
    </div>
  );
};

export default ListKonfirMahasiswa;
