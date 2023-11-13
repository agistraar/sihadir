import React from 'react';
import TableSemester from './tables/TableSemester';

const SemesterTable = () => {
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-semibold mb-4'>
        Rekap Presensi Per-Semester
      </h1>
      <TableSemester />
    </div>
  );
};

export default SemesterTable;
