import React from 'react';
import Header from '../CoreComponents/Header';
import { notFound } from 'next/navigation';
import Footer from '../CoreComponents/Footer';

const Dosen = ({
  params,
  searchParams,
}: {
  params: { role: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const role = searchParams?.role;

  if (role === 'mahasiswa' || role === 'dosen') {
    return notFound();
  }
  return (
    <div className='w-full h-screen '>
      <Header />
      <div className='absolute w-full h-full calculated-width md:right-0 '>
        <div className='w-full h-full flex flex-col'>{/* Konten */}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Dosen;
