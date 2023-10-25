import React from 'react';
import Header from '../CoreComponents/Header';
import { notFound } from 'next/navigation';

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
      <div className='h-[200%]'></div>
    </div>
  );
};

export default Dosen;
