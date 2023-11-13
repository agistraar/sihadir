import React from 'react';
import Header from '../CoreComponents/Header';
import MatkulTable from './components/MatkulTable/MatkulTable';
import TokenContainer from './components/TokenContainer';
import KelasTable from './components/KelasTable/KelasTable';
import { notFound, redirect } from 'next/navigation';
import Footer from '../CoreComponents/Footer';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

const Kelas = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  if (session.user.role === 0) {
    return notFound();
  }

  return (
    <div className='w-full h-screen'>
      <Header role={session.user.role} nama={session.user.name} />
      <div className='w-full flex flex-row-reverse'>
        <div className='w-full calculated-width'>
          <div className='w-full h-full flex flex-col space-y-4'>
            <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 mt-4 md:space-y-0 px-2 box-border'>
              <MatkulTable />
              <TokenContainer role={session.user.role} />
            </div>
            <div className='w-full px-2'>
              <KelasTable role={session.user.role} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Kelas;
