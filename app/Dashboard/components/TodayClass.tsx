import React from 'react';
import ListKelas from './ListKelas';
import Link from 'next/link';

const TodayClass = () => {
  const date = new Date(Date.now()).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const data = [
    {
      waktu: '07.00-12.00',
      matkul: 'Pemrograman Web',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '6',
    },
    {
      waktu: '13.00-18.00',
      matkul: 'Project Based Learning',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '6',
    },
  ];
  return (
    <div className='w-full md:w-2/5 bg-white px-6 pb-10 pt-4 rounded-2xl space-y-4 relative'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-md md:text-lg font-bold'>
          Jadwal Kelas Anda Hari Ini
        </h2>
        <p className='text-sm md:text-base font-bold'>{date}</p>
      </div>
      <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent' />
      {data.map((val, index) => (
        <ListKelas
          key={index}
          waktu={val.waktu}
          matkul={val.matkul}
          kelas={val.kelas}
          ruang={val.ruang}
          jam={val.jam}
        />
      ))}
      <Link
        href={{ pathname: 'Jadwal' }}
        className='text-xs font-medium text-blue-500 underline absolute bottom-2 right-2'
      >
        Lihat Lebih Banyak
      </Link>
    </div>
  );
};

export default TodayClass;
