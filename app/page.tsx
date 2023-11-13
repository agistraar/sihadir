import React from 'react';
import Login from './Login/page';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

async function page() {
  const session = await getServerSession(options);

  if (session) {
    redirect('Dashboard');
  }

  return <Login />;
}

export default page;
