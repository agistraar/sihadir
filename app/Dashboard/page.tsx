import React from 'react';
import Header from '../CoreComponents/Header';
import TodayClass from './components/TodayClass';
import KonfirmasiPresensi from './components/KonfirmasiPresensi';
import Footer from '../CoreComponents/Footer';

const Dashboard = () => {
  return (
    <div className='w-full h-screen'>
      <Header />
      <div className='absolute w-full h-full calculated-width md:right-0 '>
        <div className='w-full h-full flex flex-col py-4 px-2 space-y-4'>
          <div className='w-full flex justify-center md:justify-start'>
            <div className='bg-white w-fit rounded-3xl px-4 py-2'>
              <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left'>
                Selamat Datang, di{' '}
                <span className='text-custom-gradient'>Si Hadir</span>
                <span className='text-yellow-400'>.</span>
              </h1>
            </div>
          </div>
          <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 box-border'>
            <TodayClass />
            <KonfirmasiPresensi />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
