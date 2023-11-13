'use client';
import React from 'react';
import TableDosen from './tables/TableDosen';
import { useSearchParams } from 'next/navigation';
import TableMahasiswa from './tables/TableMahasiswa';

type KelasTableParams = {
  role: number;
};

const KelasTable = ({ role }: KelasTableParams) => {
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-semibold mb-4'>Data Presensi</h1>
      {role === 2 || role === 1 ? <TableDosen /> : null}
      {role === 3 && <TableMahasiswa />}
    </div>
  );
};

export default KelasTable;
