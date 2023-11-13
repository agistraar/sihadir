import React from 'react';
import Header from '../CoreComponents/Header';
import Footer from '../CoreComponents/Footer';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { notFound, redirect } from 'next/navigation';
import MahasiswaTable from './components/MahasiswaTable';

const Presensi = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  if (session.user.role === 0) {
    return notFound();
  }
  return (
    <div className='w-full h-screen '>
      <Header role={session.user.role} nama={session.user.name} />
      <div className='w-full flex flex-row-reverse'>
        <div className='w-full calculated-width'>
          {session.user.role === 3 && <MahasiswaTable />}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Presensi;
