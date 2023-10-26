import React from 'react';
import Header from '../CoreComponents/Header';
import MatkulTable from './components/MatkulTable/MatkulTable';
import TokenContainer from './components/TokenContainer';
import KelasTable from './components/KelasTable/KelasTable';
import { notFound } from 'next/navigation';
import Footer from '../CoreComponents/Footer';

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
    <div className='w-full h-screen'>
      <Header />
      <div className='absolute w-full calculated-width md:right-0'>
        <div className='w-full h-full flex flex-col space-y-4'>
          <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 mt-4 md:space-y-0 px-2 box-border'>
            <MatkulTable />
            <TokenContainer />
          </div>
          <div className='w-full px-2'>
            <KelasTable />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Kelas;
