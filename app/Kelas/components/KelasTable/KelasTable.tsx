'use client';
import React from 'react';
import TableDosen from './tables/TableDosen';
import { useSearchParams } from 'next/navigation';
import TableMahasiswa from './tables/TableMahasiswa';

const KelasTable = () => {
  const role = useSearchParams().get('role');
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-semibold mb-4'>Data Presensi</h1>
      {role === 'dosen' || role === 'kaprodi' ? <TableDosen /> : null}
      {role === 'mahasiswa' && <TableMahasiswa />}
    </div>
  );
};

export default KelasTable;
