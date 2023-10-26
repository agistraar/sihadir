import React from 'react';
import Header from '../CoreComponents/Header';
import Footer from '../CoreComponents/Footer';

const Jadwal = () => {
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

export default Jadwal;
