'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type listProps = {
  icons: JSX.Element;
  label: string;
  link: string;
  role: string;
};

const SideMenu = ({ icons, label, link, role }: listProps) => {
  const pathName = usePathname();
  return (
    <Link href={{ pathname: link, query: { role: role } }}>
      <li
        className={clsx(
          'flex flex-row items-center space-x-4 menu-gradient rounded-l-full p-4 px-6 mb-4 hover:text-white text-sm font-medium hover:font-semibold',
          pathName === link && 'custom-gradient text-white font-semibold '
        )}
      >
        {icons}
        <p>{label}</p>
      </li>
    </Link>
  );
};

export default SideMenu;
