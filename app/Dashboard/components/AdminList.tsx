import { makeKompenAdmin } from '@/app/utils/fakeData';
import clsx from 'clsx';
import Link from 'next/link';
import React, { memo } from 'react';

type ListDataParams = {
  val: { nama: string; jam: number };
};

type StatusParams = {
  val: number;
};

const AdminList = () => {
  const dataKompen = makeKompenAdmin(12);
  return (
    <div className='w-full h-fit md:w-2/5 bg-white px-2 py-4 rounded-2xl relative pb-12 mb-4 md:mb-0'>
      <h1 className='text-xl font-bold px-2 mb-4'>
        Perkembangan Data Kompensasi
      </h1>
      <table className='w-full'>
        <thead className='w-full border-b-2 border-black'>
          <tr className='w-full'>
            <th className='w-[40%]'>Nama Mahasiswa</th>
            <th className='w-[35%]'>Jumlah</th>
            <th className='w-[25%]'>Status</th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {dataKompen.map((val, index) => (
            <ListData key={index} val={val} />
          ))}
        </tbody>
      </table>
      <Link
        href={{ pathname: 'Mahasiswa' }}
        className='text-xs font-medium text-blue-500 underline absolute bottom-2 right-2'
      >
        Lihat Lebih Banyak
      </Link>
    </div>
  );
};

const ListData = ({ val }: ListDataParams) => {
  return (
    <tr className='w-full border-b-2'>
      <td className='w-[40%] text-start pl-6 py-1.5'>{val.nama}</td>
      <td className='w-[35%] text-center py-1.5'>{val.jam + ' jam'}</td>
      <td className='w-[25%] text-center py-1.5'>
        <CachedStatus val={val.jam} />
      </td>
    </tr>
  );
};

export const CachedStatus = memo(function CachedStatus({ val }: StatusParams) {
  let status;
  let warna;
  if (val < 16) {
    return <p className='text-center mx-2'>-</p>;
  } else {
    if (val >= 16 && val < 32) {
      status = 'SP1';
      warna = 'bg-yellow-500';
    } else if (val >= 32 && val < 38) {
      status = 'SP2';
      warna = 'bg-orange-500';
    } else if (val >= 38 && val < 46) {
      status = 'SP3';
      warna = 'bg-red-500';
    } else if (val >= 46) {
      status = 'DO';
      warna = 'bg-gray-700';
    }
  }
  return (
    <div className='w-full flex justify-center px-2'>
      <div
        className={clsx(
          'px-5 py-2 rounded-xl w-fit text-white text-xs text-center font-medium hover:-translate-y-[1px] duration-200 cursor-pointer',
          warna
        )}
      >
        {status}
      </div>
    </div>
  );
});

export default AdminList;
