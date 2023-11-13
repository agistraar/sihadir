import React from 'react';
import Header from '../CoreComponents/Header';
import { notFound, redirect } from 'next/navigation';
import Footer from '../CoreComponents/Footer';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import MingguTable from './components/MingguTable';
import SemesterTable from './components/SemesterTable';

const Dosen = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }
  if (session.user.role === 3 || session.user.role === 2) {
    return notFound();
  }

  return (
    <div className='w-full h-screen '>
      <Header role={session.user.role} nama={session.user.name} />
      <div className='w-full flex flex-row-reverse'>
        <div className='w-full calculated-width'>
          <div className='w-full flex flex-col px-2 py-4 space-y-2'>
            <MingguTable />
            <SemesterTable />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dosen;
