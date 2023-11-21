'use client';
import { memo } from 'react';
import { CellContext } from '@tanstack/react-table';
import {
  DataKompen,
  DataPresensiDosenMingguan,
  DataPresensiDosenSemester,
} from '@/app/utils/fakeData';
import clsx from 'clsx';

type colData = {
  val:
    | CellContext<DataPresensiDosenMingguan, unknown>
    | CellContext<DataPresensiDosenSemester, unknown>;
};

export const CachedNim = memo(function CachedNim({ val }: colData) {
  return <p className='text-center mx-2'>{String(val.getValue())}</p>;
});

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
