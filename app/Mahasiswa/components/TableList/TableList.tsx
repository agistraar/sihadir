'use client';
import React from 'react';
import KompenTable from '../KompenTable';
import clsx from 'clsx';
import MingguTable from '../MingguTable';
import SemesterTable from '../SemesterTable';

const TableList = () => {
  const [kompenVisible, setKompenVisible] = React.useState(false);
  const [mingguanVisible, setMingguanVisible] = React.useState(true);
  const [semesterVisible, setSemesterVisible] = React.useState(false);
  return (
    <div className='w-full flex flex-col py-4 space-y-4 px-2'>
      <div className='flex w-full bg-white justify-center font-semibold sm:justify-start rounded-2xl px-4'>
        <div
          className={clsx(
            'px-3 py-2 cursor-pointer menu-gradient hover:text-white',
            mingguanVisible
              ? 'custom-gradient text-white'
              : ' text-black bg-white border-l-[1px]'
          )}
          onClick={() => setMingguanVisible(!mingguanVisible)}
        >
          Mingguan
        </div>
        <div
          className={clsx(
            'px-3 py-2 cursor-pointer menu-gradient hover:text-white',
            semesterVisible
              ? 'custom-gradient text-white'
              : ' text-black bg-white border-x-[1px]'
          )}
          onClick={() => setSemesterVisible(!semesterVisible)}
        >
          Semester
        </div>
        <div
          className={clsx(
            'px-3 py-2 cursor-pointer menu-gradient hover:text-white',
            kompenVisible
              ? 'custom-gradient text-white'
              : ' text-black bg-white border-r-[1px]'
          )}
          onClick={() => setKompenVisible(!kompenVisible)}
        >
          Kompensasi
        </div>
      </div>
      {mingguanVisible && <MingguTable />}
      {semesterVisible && <SemesterTable />}
      {kompenVisible && <KompenTable />}
    </div>
  );
};

export default TableList;
