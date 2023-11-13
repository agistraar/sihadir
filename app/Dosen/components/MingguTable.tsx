import React from 'react';
import TableMingguan from './tables/TableMingguan';

const MingguTable = () => {
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-semibold mb-4'>Rekap Presensi Per-Minggu</h1>
      <TableMingguan />
    </div>
  );
};

export default MingguTable;
