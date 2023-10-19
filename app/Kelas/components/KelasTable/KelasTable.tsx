import React from 'react';
import TableDosen from './tables/TableDosen';

const KelasTable = () => {
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-bold mb-4'>Data Absensi</h1>
      <TableDosen />
    </div>
  );
};

export default KelasTable;
