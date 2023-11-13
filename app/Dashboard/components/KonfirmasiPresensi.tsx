import React from 'react';
import Link from 'next/link';
import ListKonfirDosen from './ListKonfirDosen';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ListKonfirMahasiswa from './ListKonfirMahasiswa';

const KonfirmasiPresensi = async () => {
  const session = await getServerSession(options);

  const dataDosen = [
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
    {
      tipe: 'Sakit',
      nama: 'Haafizhar Alfathan Syauqi',
      nim: '3202116132',
      semester: '5',
      kelas: 'B',
    },
    {
      tipe: 'Izin',
      nama: 'Azlinya Asyifa',
      nim: '3202116010',
      semester: '5',
      kelas: 'C',
    },
  ];

  const dataMahasiswa = [
    {
      matkul: 'Pemrograman Web',
      tanggal: '13/11/2023',
      jam: '6',
    },
    {
      matkul: 'Rekayasa Perangkat Lunak',
      tanggal: '13/11/2023',
      jam: '6',
    },
    {
      matkul: 'Jaringan Lanjutan',
      tanggal: '12/11/2023',
      jam: '5',
    },
    {
      matkul: 'Etika Profesi',
      tanggal: '11/11/2023',
      jam: '4',
    },
  ];
  return (
    <div className='w-full md:w-3/5 bg-white px-4 pb-10 pt-4 rounded-2xl space-y-4 relative'>
      <h2 className='text-lg font-semibold'>
        Konfirmasi Kehadiran Mahasiswa Anda
      </h2>
      {session?.user.role === 2 &&
        dataDosen.map((val, index) => (
          <ListKonfirDosen
            key={index}
            tipe={val.tipe}
            nama={val.nama}
            nim={val.nim}
            semester={val.semester}
            kelas={val.kelas}
          />
        ))}
      {session?.user.role === 3 &&
        dataMahasiswa.map((val, index) => (
          <ListKonfirMahasiswa
            key={index}
            matkul={val.matkul}
            tanggal={val.tanggal}
            jam={val.jam}
          />
        ))}
      <Link
        href={{ pathname: 'Mahasiswa' }}
        className='text-xs font-medium text-blue-500 underline absolute bottom-2 right-2'
      >
        Lihat Lebih Banyak
      </Link>
    </div>
  );
};

export default KonfirmasiPresensi;
