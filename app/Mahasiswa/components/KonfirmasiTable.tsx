import React from 'react';
import TableKonfirmasi from './tables/TableKonfirmasi';

const KonfirmasiTable = () => {
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-semibold mb-4'>
        Konfirmasi Absensi Mahasiswa Anda
      </h1>
      <TableKonfirmasi />
    </div>
  );
};

export default KonfirmasiTable;
