'use client';
import React from 'react';
import ListKelas from './ListKelas';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const TodayClass = () => {
  const role = useSearchParams().get('role');
  const date = new Date(Date.now()).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const data = {
    waktu: '07.00-12.00',
    matkul: 'Pemrograman Web',
    ruang: '12',
    jam: '6',
  };
  // const data = [
  //   {
  //     waktu: '07.00-12.00',
  //     matkul: 'Pemrograman Web',
  //     ruang: '12',
  //     jam: '6',
  //   },
  //   {
  //     waktu: '13.00-18.00',
  //     matkul: 'Project Based Learning',
  //     ruang: '12',
  //     jam: '6',
  //   },
  //   {
  //     waktu: '18.00-21.00',
  //     matkul: 'Rekayasa Perangkat Lunak',
  //     ruang: '12',
  //     jam: '6',
  //   },
  // ];
  return (
    <div className='w-full md:w-2/5 bg-white px-4 pb-10 pt-4 rounded-2xl space-y-4 relative'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-lg font-semibold'>Jadwal Kelas Anda Hari Ini</h2>
        <p className='text-base font-semibold'>{date}</p>
      </div>
      <ListKelas
        waktu={data.waktu}
        matkul={data.matkul}
        ruang={data.ruang}
        jam={data.jam}
      />

      {/* {data.map((val, index) => (
          <ListKelas
            key={index}
            waktu={val.waktu}
            matkul={val.matkul}
            ruang={val.ruang}
            jam={val.jam}
          />
        ))} */}
      <Link
        href={{ pathname: 'Jadwal', query: { role: role } }}
        className='text-xs font-medium text-blue-500 underline absolute bottom-2 right-2'
      >
        Lihat Lebih Banyak
      </Link>
    </div>
  );
};

export default TodayClass;
