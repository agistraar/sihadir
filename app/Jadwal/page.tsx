import React from 'react';
import Header from '../CoreComponents/Header';
import Footer from '../CoreComponents/Footer';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { notFound, redirect } from 'next/navigation';
import CardJadwal from './components/CardJadwal';
import TodayJadwal from './components/TodayJadwal';
import SemesterJadwal from './components/SemesterJadwal';

const Jadwal = async () => {
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
        <div className='w-full calculated-width '>
          <div className='w-full flex flex-col py-4 px-2 space-y-4'>
            <TodayJadwal />
            <SemesterJadwal />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Jadwal;
