import Button from '@/app/CoreComponents/Button';
import clsx from 'clsx';
import React from 'react';

type ListKonfirParams = {
  tipe: string;
  nama: string;
  nim: string;
  semester: string;
  kelas: string;
};

const ListKonfirDosen = ({
  tipe,
  nama,
  nim,
  semester,
  kelas,
}: ListKonfirParams) => {
  return (
    <div className='bg-gray-300 rounded-xl flex text-base font-medium relative'>
      <div
        className={clsx(
          'w-[20%] md:w-[11%] rounded-l-xl flex items-center justify-center',
          tipe === 'Izin' ? 'bg-yellow-400' : 'bg-blue-400'
        )}
      >
        <h2 className='font-bold'>{tipe}</h2>
      </div>
      <div className='flex flex-col space-y-1 px-2 py-1 '>
        <h1>{nama}</h1>
        <h1>{nim}</h1>
        <h1>
          {semester}/{kelas}
        </h1>
      </div>
      <div className='absolute right-2 bottom-2 w-fit h-fit'>
        <Button>Detail</Button>
      </div>
    </div>
  );
};

export default ListKonfirDosen;
