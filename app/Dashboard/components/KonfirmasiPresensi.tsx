import React from 'react';
import Link from 'next/link';
import ListKonfirDosen from './ListKonfirDosen';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import ListKonfirMahasiswa from './ListKonfirMahasiswa';

const KonfirmasiPresensi = async () => {
  const session = await getServerSession(options);

  const pathKonfirmasi = session?.user.role === 3 ? 'Presensi' : 'Mahasiswa';
  return (
    <div className='w-full md:w-3/5 h-fit bg-white rounded-2xl'>
      {session?.user.role === 2 && <ListKonfirDosen />}
      {session?.user.role === 3 && <ListKonfirMahasiswa />}
      <div className='w-full flex justify-end py-2 px-4'>
        <Link
          href={{ pathname: pathKonfirmasi }}
          className='text-xs font-medium text-blue-500 underline'
        >
          Lihat Lebih Banyak
        </Link>
      </div>
    </div>
  );
};

export default KonfirmasiPresensi;
