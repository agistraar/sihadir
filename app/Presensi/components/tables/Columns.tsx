'use client';
import { memo } from 'react';
import { CellContext } from '@tanstack/react-table';
import { DataPresensiMingguan } from '@/app/utils/fakeData';
import clsx from 'clsx';

type colData = {
  val: CellContext<DataPresensiMingguan, unknown>;
};

type statusData = {
  val: number;
};

export const CachedNum = memo(function CachedNum({ val }: colData) {
  return <p className='text-center mx-2'>{String(val.getValue())}</p>;
});

export const CachedJum = memo(function CachedJum({ val }: colData) {
  return <p className='text-center mx-2'>{String(val.getValue()) + ' jam'}</p>;
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

export const CachedStatus = memo(function CachedStatus({ val }: statusData) {
  let status;
  let warna;
  if (val == 4) {
    return <p className='text-center mx-2'>-</p>;
  } else {
    if (val == 0) {
      status = 'SP1';
      warna = 'bg-yellow-500';
    } else if (val == 1) {
      status = 'SP2';
      warna = 'bg-orange-500';
    } else if (val == 2) {
      status = 'SP3';
      warna = 'bg-red-500';
    } else if (val == 3) {
      status = 'Drop Out';
      warna = 'bg-gray-700';
    }
  }
  return (
    <div className='w-full flex justify-center px-2'>
      <div
        className={clsx(
          'px-5 py-2 rounded-xl w-fit text-white text-xs text-center font-medium hover:-translate-y-[1px] duration-200 cursor-pointer',
          warna
        )}
      >
        {status}
      </div>
    </div>
  );
});
