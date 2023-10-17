import Image from 'next/image';
import { Monitor, Clock, Calendar, User, Users, BookOpen } from 'react-feather';
import SideMenu from './components/SideMenu';
import clsx from 'clsx';
import React from 'react';

type sidebar = {
  visible: boolean;
  isFull: boolean;
};

const Sidebar = ({ visible, isFull }: sidebar) => {
  return (
    <div
      className={`w-3/5 sm:w-[250px] bottom-0 ${
        visible ? 'left-0' : '-left-[242px]'
      } sm:left-0 transition-all ${
        isFull ? 'h-[90%]' : 'h-screen'
      } p-4 fixed z-20`}
    >
      <div className='w-full h-full relative rounded-xl shadow shadow-gray-400 box-border bg-white pt-2 pl-4 overflow-hidden'>
        <div
          className={clsx(
            'w-full h-[6%] sm:h-[10%] pl-4',
            isFull ? 'hidden' : 'block'
          )}
        >
          <div className='w-[50%] sm:w-[70%] h-full relative'>
            <Image
              alt='Logo'
              fill
              priority
              src='/img/sihadir-warna.svg'
              className='w-full h-auto'
              sizes='100%'
            />
          </div>
        </div>
        <div className='w-full h-full overflow-x-hidden overflow-y-hidden hover:overflow-y-auto hover:scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div>
            <ul>
              <SideMenu
                icons={<Monitor />}
                label='Dashboard'
                link='/Dashboard'
              />
              <SideMenu icons={<Clock />} label='Absensi' link='/Absensi' />
              <SideMenu icons={<Calendar />} label='Jadwal' link='/Jadwal' />
              <SideMenu icons={<User />} label='Mahasiswa' link='/Mahasiswa' />
              <SideMenu icons={<Users />} label='Kelas' link='/Kelas' />
              <SideMenu icons={<BookOpen />} label='Dosen' link='/Dosen' />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
