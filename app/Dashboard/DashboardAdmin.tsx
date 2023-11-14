import React from 'react';
import AdminList from './components/AdminList';
import ChartPresensi from './components/ChartPresensi';
import ChartAbsensi from './components/ChartAbsensi';

const DashboardAdmin = () => {
  return (
    <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 box-border'>
      <AdminList />
      <div className='w-full md:w-3/5 bg-white px-2 py-4 rounded-2xl custom-gradient space-y-4'>
        <ChartPresensi />
        <ChartAbsensi />
      </div>
    </div>
  );
};

export default DashboardAdmin;
