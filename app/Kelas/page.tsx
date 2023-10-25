import React from 'react';
import Header from '../CoreComponents/Header';
import MatkulTable from './components/MatkulTable/MatkulTable';
import TokenContainer from './components/TokenContainer';
import KelasTable from './components/KelasTable/KelasTable';
import { notFound } from 'next/navigation';

const Kelas = ({
  params,
  searchParams,
}: {
  params: { role: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const role = searchParams?.role;

  if (role === 'admin') {
    return notFound();
  }

  return (
    <div className='w-full h-screen '>
      <Header />
      <div className='absolute w-full calculated-width md:right-0 py-4 px-2 flex flex-col space-y-4'>
        <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 box-border'>
          <MatkulTable />
          <TokenContainer />
        </div>
        <KelasTable />
      </div>
    </div>
  );
};

export default Kelas;
