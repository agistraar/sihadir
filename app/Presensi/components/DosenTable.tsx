import React from 'react';
import TableMingguan from './tables/Dosen/TableMingguan';
import TableSemester from './tables/Dosen/TableSemester';

const DosenTable = () => {
  return (
    <div className='w-full flex flex-col space-y-4 px-2 py-4'>
      <div className='w-full bg-white rounded-2xl px-6 py-4'>
        <h1 className='text-lg font-semibold mb-4'>
          Rekap Presensi Per-Minggu
        </h1>
        <TableMingguan />
      </div>
      <div className='w-full bg-white rounded-2xl px-6 py-4'>
        <h1 className='text-lg font-semibold mb-4'>
          Rekap Presensi Per-Semester
        </h1>
        <TableSemester />
      </div>
    </div>
  );
};

export default DosenTable;
