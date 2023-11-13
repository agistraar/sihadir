import React from 'react';
import Header from '../CoreComponents/Header';
import { notFound, redirect } from 'next/navigation';
import Footer from '../CoreComponents/Footer';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import TableList from './components/TableList/TableList';

const Mahasiswa = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server');
  }

  if (session.user.role === 3) {
    return notFound();
  }
  return (
    <div className='w-full h-screen '>
      <Header role={session.user.role} nama={session.user.name} />
      <div className='w-full flex flex-row-reverse'>
        <div className=' w-full calculated-width '>
          <TableList />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Mahasiswa;
