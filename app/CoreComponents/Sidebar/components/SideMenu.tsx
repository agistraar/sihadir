'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type listProps = {
  icons: JSX.Element;
  label: string;
  link: string;
};

const SideMenu = ({ icons, label, link }: listProps) => {
  const pathName = usePathname();
  return (
    <Link href={link}>
      <li
        className={clsx(
          'flex flex-row items-center space-x-4 menu-gradient rounded-l-full p-4 px-6 hover:text-white',
          pathName === link && 'custom-gradient text-white '
        )}
      >
        {icons}
        <p className='text-sm font-medium'>{label}</p>
      </li>
    </Link>
  );
};

export default SideMenu;
