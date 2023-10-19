'use client';
import { memo } from 'react';
import { CellContext } from '@tanstack/react-table';
import { DataKelas } from '@/app/utils/fakeData';
import clsx from 'clsx';
import Button from '@/app/CoreComponents/Button';
import { CheckCircle } from 'react-feather';

type colData = {
  val: CellContext<DataKelas, unknown>;
};

export const CachedNim = memo(function CachedNim({ val }: colData) {
  return (
    <div className='w-full flex justify-center px-2'>
      <p>{String(val.getValue())}</p>
    </div>
  );
});

export const CachedNama = memo(function CachedNama({ val }: colData) {
  return (
    <div className='w-full flex justify-end'>
      <div className='w-full md:w-[70%]'>
        <p className='text-left'>{String(val.getValue())}</p>
      </div>
    </div>
  );
});

export const CachedStatus = memo(function CachedStatus({ val }: colData) {
  let status;
  switch (Number(val.getValue)) {
    case 1:
      status = 'Hadir';
      break;
    case 2:
      status = 'Izin';
      break;
    case 3:
      status = 'Sakit';
      break;
    default:
      status = 'Alpa';
  }
  return (
    <div className='w-full flex justify-center px-2'>
      <div
        className={clsx(
          'px-5 py-2 rounded-xl w-fit text-white text-xs font-medium hover:-translate-y-[1px] duration-200 cursor-pointer',
          Number(val.getValue()) === 1 && 'bg-green-400',
          Number(val.getValue()) === 2 && 'bg-blue-400',
          Number(val.getValue()) === 3 && 'bg-orange-400',
          Number(val.getValue()) !== 1 || 2 || 3 ? 'bg-red-400' : ''
        )}
      >
        {status}
      </div>
    </div>
  );
});

export const CachedDetail = memo(function CachedDetail() {
  return (
    <div className='w-full flex justify-center px-2'>
      <Button>Edit</Button>
    </div>
  );
});

export const CachedConfirm = memo(function CachedConfirm() {
  return (
    <div className='w-full flex justify-center hover:-translate-y-[1px] duration-200 cursor-pointer'>
      <CheckCircle />
    </div>
  );
});
