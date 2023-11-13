import React from 'react';
import Header from '../CoreComponents/Header';
import TodayClass from './components/TodayClass';
import KonfirmasiPresensi from './components/KonfirmasiPresensi';
import Footer from '../CoreComponents/Footer';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import DashboardDosenMahasiswa from './DashboardDosenMahasiswa';
import DashboardAdmin from './DashboardAdmin';

const Dashboard = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  return (
    <div className='w-full h-screen'>
      <Header role={session.user.role} nama={session.user.name} />
      <div className='w-full flex flex-row-reverse'>
        <div className=' w-full calculated-width'>
          <div className='w-full flex flex-col py-4 px-2 space-y-4'>
            <div className='w-full flex justify-center md:justify-start'>
              <div className='bg-white w-fit rounded-3xl px-4 py-2'>
                <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left'>
                  Selamat Datang, di{' '}
                  <span className='text-custom-gradient'>Si Hadir</span>
                  <span className='text-yellow-400'>.</span>
                </h1>
              </div>
            </div>
            {session.user.role === 3 ||
            session.user.role === 2 ||
            session.user.role === 1 ? (
              <DashboardDosenMahasiswa />
            ) : null}
            {session.user.role === 0 && <DashboardAdmin />}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
