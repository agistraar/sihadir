import React from 'react';
import Header from '../CoreComponents/Header';
import { notFound } from 'next/navigation';
import Footer from '../CoreComponents/Footer';
import KompenTable from './KompenTable/KompenTable';

const Mahasiswa = ({
  params,
  searchParams,
}: {
  params: { role: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const role = searchParams?.role;

  if (role === 'mahasiswa') {
    return notFound();
  }
  return (
    <div className='w-full h-screen '>
      <Header />
      <div className='absolute w-full calculated-width md:right-0 '>
        <div className='w-full h-full flex flex-col space-y-4'>
          <KompenTable />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Mahasiswa;
