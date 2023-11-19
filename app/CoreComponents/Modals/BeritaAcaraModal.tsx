import clsx from 'clsx';
import React from 'react';
import Button from '../Button';
import { X } from 'react-feather';

type BAParams = {
  isVisible: boolean;
  setIsVisible: Function;
};

const BeritaAcaraModal = ({ isVisible, setIsVisible }: BAParams) => {
  return (
    <div
      className={clsx(
        isVisible ? 'block' : 'hidden',
        'absolute left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center p-5 md:py-10 md:px-20 transition-opacity ease-in'
      )}
    >
      <div className='w-full sm:w-4/6 h-full bg-white rounded-2xl flex flex-col items-center px-6 py-3 space-y-6 relative'>
        <div className='flex w-full items-center justify-between border-b-2 py-4'>
          <h1 className='font-semibold text-xl'>Berita Acara Perkuliahan</h1>
          <X
            className='cursor-pointer'
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>

        <div className='w-full absolute flex justify-end bottom-3 right-3'>
          <Button onClick={() => setIsVisible(false)}>Simpan</Button>
        </div>
      </div>
    </div>
  );
};

export default BeritaAcaraModal;
