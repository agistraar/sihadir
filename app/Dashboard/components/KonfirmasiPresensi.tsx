'use client';
import React from 'react';
import ListKonfir from './ListKonfir';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const KonfirmasiPresensi = () => {
  const role = useSearchParams().get('role');
  const data = [
    {
      tipe: 'Izin',
      nama: 'Muhammad Fajar',
      nim: '3202116025',
      semester: '5',
      kelas: 'C',
    },
    {
      tipe: 'Sakit',
      nama: 'Agistra Arifur Rahman',
      nim: '3202116023',
      semester: '5',
      kelas: 'C',
    },
    // {
    //   tipe: 'Sakit',
    //   nama: 'Haafizhar Alfathan Syauqi',
    //   nim: '3202116132',
    //   semester: '5',
    //   kelas: 'B',
    // },
    // {
    //   tipe: 'Izin',
    //   nama: 'Azlinya Asyifa',
    //   nim: '3202116010',
    //   semester: '5',
    //   kelas: 'C',
    // },
    // {
    //   tipe: 'Izin',
    //   nama: 'Muhammad Resky Maulana',
    //   nim: '3202116135',
    //   semester: '5',
    //   kelas: 'B',
    // },
    // {
    //   tipe: 'Izin',
    //   nama: 'Falah Bintang',
    //   nim: '3202116003',
    //   semester: '5',
    //   kelas: 'A',
    // },
    // {
    //   tipe: 'Sakit',
    //   nama: 'Muhammad Hayyunaji',
    //   nim: '3202116096',
    //   semester: '5',
    //   kelas: 'B',
    // },
  ];
  return (
    <div className='w-full md:w-3/5 bg-white px-4 pb-10 pt-4 rounded-2xl space-y-4 relative'>
      <h2 className='text-lg font-semibold'>
        Konfirmasi Kehadiran Mahasiswa Anda
      </h2>
      {data.map((val, index) => (
        <ListKonfir
          key={index}
          tipe={val.tipe}
          nama={val.nama}
          nim={val.nim}
          semester={val.semester}
          kelas={val.kelas}
        />
      ))}
      <Link
        href={{ pathname: 'Mahasiswa', query: { role: role } }}
        className='text-xs text-blue-500 underline absolute bottom-2 right-2'
      >
        Liat Lebih Banyak
      </Link>
    </div>
  );
};

export default KonfirmasiPresensi;
