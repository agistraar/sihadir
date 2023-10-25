'use client';
import React from 'react';
import { Menu, Bell, ArrowUpCircle, Info, LogOut } from 'react-feather';
import Image from 'next/image';
import Sidebar from './Sidebar/Sidebar';
import useOnScreen from '../CustomHooks/useOnScreen';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const Header = () => {
  const [visibleSidebar, setVisibleSidebar] = React.useState(false);
  const [profileVisible, setProfileVisible] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  const router = useRouter();
  const role = useSearchParams().get('role');

  return (
    <div
      ref={ref}
      className='w-full h-[10%] min-h-[50px] custom-gradient flex items-center px-4 relative'
    >
      <Sidebar visible={visibleSidebar} isFull={isVisible} role={role!} />
      <div className='h-full w-1/2 flex flex-row items-center space-x-2'>
        <Menu
          className='block md:hidden'
          color='#ffffff'
          onClick={() => setVisibleSidebar(!visibleSidebar)}
        />
        <div className='h-1/3 w-3/6 md:w-1/6 md:h-1/2 relative'>
          <Image
            priority
            alt='Logo'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src='/img/sihadir-putih.svg'
            className='w-full h-auto'
          />
        </div>
      </div>
      <div className='h-full w-1/2 flex flex-row items-center justify-end space-x-2 tracking-wider'>
        <h2 className='text-base font-bold text-white hidden md:block mr-2'>
          <span className='text-yellow-400'>Hi</span>, Agistra Arifur Rahman
        </h2>
        <Bell color='#ffffff' />
        <div className='h-10 w-10 relative flex-col'>
          <Image
            alt='foto'
            fill
            src='/img/user-sample.jpg'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full h-auto rounded-full '
            onClick={() => setProfileVisible(!profileVisible)}
          />
          <div
            className={clsx(
              'z-50 w-52 bg-white rounded-lg shadow absolute right-0 top-12 transition-all ease-in duration-300',
              profileVisible ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className='flex flex-col px-4 py-2 custom-gradient rounded-t-lg'>
              <p className='text-sm font-bold text-white'>
                Agistra Arifur Rahman
              </p>
              <p className='text-xs text-white'>Mahasiswa</p>
            </div>
            <ul
              className={clsx(
                'my-2 px-2 space-y-2',
                profileVisible ? 'block' : 'hidden'
              )}
            >
              <Link href={'#'}>
                <li className='flex flex-row items-center space-x-4 hover:bg-gray-200 py-3 px-4 text-sm font-medium rounded-lg'>
                  <Info className='w-5 h-5' />
                  <p>Profil</p>
                </li>
              </Link>
              <li
                className='flex flex-row cursor-pointer items-center space-x-4 hover:bg-gray-200 py-3 px-4 text-sm font-medium rounded-lg'
                onClick={() => router.replace('/')}
              >
                <LogOut className='w-5 h-5' />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* {!isVisible && (
        <ArrowUpCircle
          size={36}
          className='absolute bottom-2 right-2'
          onClick={() => document.body.scrollTo(0, 0)}
        />
      )} */}
    </div>
  );
};

export default Header;
