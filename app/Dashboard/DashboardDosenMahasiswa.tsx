import React from 'react';
import TodayClass from './components/TodayClass';
import KonfirmasiPresensi from './components/KonfirmasiPresensi';

const DashboardDosenMahasiswa = () => {
  return (
    <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 box-border'>
      <TodayClass />
      <KonfirmasiPresensi />
    </div>
  );
};

export default DashboardDosenMahasiswa;
