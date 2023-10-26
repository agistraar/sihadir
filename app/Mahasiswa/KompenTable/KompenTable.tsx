import React from 'react';
import TableKompen from './tables/TableKompen';

const KompenTable = () => {
  return (
    <div className='w-full bg-white rounded-2xl px-6 py-4'>
      <h1 className='text-lg font-semibold mb-4'>Data Kompensasi</h1>
      <TableKompen />
    </div>
  );
};

export default KompenTable;
