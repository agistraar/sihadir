'use client';
import React from 'react';
import KompenTable from '../KompenTable';
import clsx from 'clsx';
import MingguTable from '../MingguTable';
import SemesterTable from '../SemesterTable';
import KonfirmasiTable from '../KonfirmasiTable';
import { useSession } from 'next-auth/react';

const TableList = () => {
  const { data } = useSession();

  const [kompenVisible, setKompenVisible] = React.useState(true);
  const [mingguanVisible, setMingguanVisible] = React.useState(false);
  const [semesterVisible, setSemesterVisible] = React.useState(false);
  const [konfirmasiVisible, setKonfirmasiVisible] = React.useState(true);
  return (
    <div className='w-full flex flex-col py-4 space-y-4 px-2'>
      <div className='flex w-full bg-white justify-center font-semibold sm:justify-start rounded-2xl px-4'>
        {data?.user.role !== 0 && (
          <div
            className={clsx(
              'px-3 py-2 cursor-pointer menu-gradient hover:text-white',
              konfirmasiVisible
                ? 'custom-gradient text-white'
                : ' text-black bg-white border-x-[1px]'
            )}
            onClick={() => setKonfirmasiVisible(!konfirmasiVisible)}
          >
            Konfirmasi
          </div>
        )}
        <div
          className={clsx(
            'px-3 py-2 cursor-pointer menu-gradient hover:text-white',
            mingguanVisible
              ? 'custom-gradient text-white'
              : ' text-black bg-white border-x-[1px]'
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
              : ' text-black bg-white border-x-[1px]'
          )}
          onClick={() => setKompenVisible(!kompenVisible)}
        >
          Kompensasi
        </div>
      </div>
      {konfirmasiVisible && data?.user.role !== 0 && <KonfirmasiTable />}
      {mingguanVisible && <MingguTable />}
      {semesterVisible && <SemesterTable />}
      {kompenVisible && <KompenTable />}
    </div>
  );
};

export default TableList;
