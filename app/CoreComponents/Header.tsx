'use client';
import React from 'react';
import { Menu, Bell, ArrowUpCircle } from 'react-feather';
import Image from 'next/image';
import Sidebar from './Sidebar/Sidebar';
import useOnScreen from '../CustomHooks/useOnScreen';

const Header = () => {
  const [visibleSidebar, setVisibleSidebar] = React.useState(true);

  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div
      ref={ref}
      className='w-full h-[10%] custom-gradient flex items-center px-4'
    >
      <Sidebar visible={visibleSidebar} isFull={isVisible} />
      <div className='h-full w-1/2 flex flex-row items-center space-x-2'>
        <Menu
          className='block sm:hidden'
          color='#ffffff'
          onClick={() => setVisibleSidebar(!visibleSidebar)}
        />
        <div className='h-1/3 w-3/6 sm:w-1/6 sm:h-1/2 relative'>
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
        <h2 className='text-base font-bold text-white hidden sm:block mr-2'>
          <span className='text-yellow-400'>Hi</span>, Agistra Arifur Rahman
        </h2>
        <Bell color='#ffffff' />
        <div className='h-10 w-10 relative'>
          <Image
            alt='foto'
            fill
            src='/img/user-sample.jpg'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full h-auto rounded-full'
          />
        </div>
      </div>
      {!isVisible && (
        <ArrowUpCircle
          size={36}
          className='absolute bottom-2 right-2'
          onClick={() => document.body.scrollTo(0, 0)}
        />
      )}
    </div>
  );
};

export default Header;
