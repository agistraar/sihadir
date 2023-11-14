import React from 'react';
import AdminList from './components/AdminList';
import Charts from './components/Charts';

const DashboardAdmin = () => {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row md:space-x-4 box-border'>
      <Charts />
      <AdminList />
    </div>
  );
};

export default DashboardAdmin;
