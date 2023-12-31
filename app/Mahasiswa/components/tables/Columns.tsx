'use client';
import { memo } from 'react';
import { CellContext } from '@tanstack/react-table';
import {
  DataKompen,
  DataKonfirmasiAbsen,
  DataMingguan,
} from '@/app/utils/fakeData';
import clsx from 'clsx';
import Button from '@/app/CoreComponents/Button';

type colData = {
  val:
    | CellContext<DataKompen, unknown>
    | CellContext<DataMingguan, unknown>
    | CellContext<DataKonfirmasiAbsen, unknown>;
};

type buttonParams = {
  setIsVisible: Function;
  setData: Function;
  nim: string;
  nama: string;
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

export const CachedButton = memo(function CachedButton({
  setIsVisible,
  setData,
  nim,
  nama,
}: buttonParams) {
  return (
    <div className='w-full flex justify-center px-2'>
      <Button
        onClick={() => {
          setIsVisible(true);
          setData({ nim: nim, nama: nama });
        }}
      >
        Detail
      </Button>
    </div>
  );
});

export const CachedStatusKonf = memo(function CachedStatusKonf({ val }: any) {
  return (
    <div className='w-full flex justify-center px-2'>
      <div
        className={clsx(
          'px-5 py-2 rounded-xl w-fit text-white text-xs text-center font-medium hover:-translate-y-[1px] duration-200 cursor-pointer',
          String(val.getValue()) === 'Izin' ? 'bg-yellow-500' : 'bg-blue-500'
        )}
      >
        {String(val.getValue())}
      </div>
    </div>
  );
});

export const CachedStatus = memo(function CachedStatus({ val }: any) {
  let status;
  let warna;
  if (val < 16) {
    return <p className='text-center mx-2'>-</p>;
  } else {
    if (val >= 16 && val < 32) {
      status = 'SP1';
      warna = 'bg-yellow-500';
    } else if (val >= 32 && val < 38) {
      status = 'SP2';
      warna = 'bg-orange-500';
    } else if (val >= 38 && val < 46) {
      status = 'SP3';
      warna = 'bg-red-500';
    } else if (val >= 46) {
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
