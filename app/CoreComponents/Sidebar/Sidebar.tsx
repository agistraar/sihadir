import Image from 'next/image';
import { Monitor, Clock, Calendar, User, Users, BookOpen } from 'react-feather';
import SideMenu from './components/SideMenu';
import clsx from 'clsx';
import React from 'react';

type sidebar = {
  visible: boolean;
  isFull: boolean;
  role: string;
};

const Sidebar = ({ visible, isFull, role }: sidebar) => {
  return (
    <div
      className={`w-[250px] bottom-0 transition-all duration-300  ${
        visible ? 'left-0' : '-left-[242px]'
      } md:left-0 ${isFull ? 'h-[90%]' : 'h-screen '} p-4 fixed z-20`}
    >
      <div className='w-full h-full relative rounded-xl shadow shadow-gray-400 box-border bg-white pt-2 pl-4 overflow-hidden'>
        <div
          className={clsx(
            'w-full h-12 pl-4 transition-all duration-300 ',
            isFull ? '-mt-[48px]' : 'mt-0'
          )}
        >
          <div className='w-36 h-12 relative'>
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
        <div className='w-full h-full mt-2 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div>
            <ul>
              <SideMenu
                icons={<Monitor className='w-5 h-5' />}
                label='Dashboard'
                link='/Dashboard'
                role={role}
              />
              <SideMenu
                icons={<Clock className='w-5 h-5' />}
                label='Presensi'
                link='/Presensi'
                role={role}
              />
              <SideMenu
                icons={<Calendar className='w-5 h-5' />}
                label='Jadwal'
                link='/Jadwal'
                role={role}
              />
              {role !== 'mahasiswa' && (
                <SideMenu
                  icons={<User className='w-5 h-5' />}
                  label='Mahasiswa'
                  link='/Mahasiswa'
                  role={role}
                />
              )}
              {role === 'admin' || role === 'kaprodi' ? (
                <SideMenu
                  icons={<Users className='w-5 h-5' />}
                  label='Dosen'
                  link='/Dosen'
                  role={role}
                />
              ) : null}
              {role !== 'admin' && (
                <SideMenu
                  icons={<BookOpen className='w-5 h-5' />}
                  label='Kelas'
                  link='/Kelas'
                  role={role}
                />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
