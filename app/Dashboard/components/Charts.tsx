import React from 'react';
import ChartPresensi from './ChartPresensi';
import ChartAbsensi from './ChartAbsensi';

const Charts = () => {
  return (
    <div className='w-full md:w-3/5 bg-white px-2 py-4 rounded-2xl custom-gradient space-y-4'>
      <ChartPresensi />
      <ChartAbsensi />
    </div>
  );
};

export default Charts;
