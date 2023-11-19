import clsx from 'clsx';
import React from 'react';
import { X } from 'react-feather';
import Button from '../Button';

type EditPresensiParams = {
  isVisible: boolean;
  // nim: string;
  setIsVisible: Function;
};

const EditPresensi = ({ isVisible, setIsVisible }: EditPresensiParams) => {
  return (
    <div
      className={clsx(
        isVisible ? 'block' : 'hidden',
        'absolute left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center p-5 md:py-10 md:px-20 transition-opacity ease-in'
      )}
    >
      <div className='w-full sm:w-2/6 h-full bg-white rounded-2xl flex flex-col items-center px-6 py-3 space-y-6 relative'>
        <div className='flex w-full items-center justify-between border-b-2 py-4'>
          <h1 className='font-semibold text-xl'>Edit Presensi</h1>
          <X
            className='cursor-pointer'
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
        <div className='w-full custom-gradient rounded-xl px-4 py-4 space-y-2 text-white font-medium'>
          <p>Muhammad Fajar</p>
          <p>3202116025</p>
        </div>
        <div className='w-full flex flex-col px-2 space-y-2'>
          <p>Keterangan Presensi</p>
          <form id='keteranganEditPresensi' className='px-1 space-y-2 flex-col'>
            <div className='flex space-x-2 items-center'>
              <input type='radio' name='ket' id='masuk' />
              <label htmlFor='masuk'>Masuk</label>
            </div>
            <div className='flex space-x-2 items-center'>
              <input type='radio' name='ket' id='keluar' />
              <label htmlFor='keluar'>Keluar</label>
            </div>
          </form>
        </div>
        <div className='w-full flex flex-col px-2 space-y-2'>
          <p>Status</p>
          <form id='statusEditPresensi' className='px-1 space-y-2 flex-col'>
            <div className='flex space-x-2 items-center'>
              <input type='radio' name='stat' id='alpa' />
              <label htmlFor='alpa'>Alpa</label>
            </div>
            <div className='flex space-x-2 items-center'>
              <input type='radio' name='stat' id='izin' />
              <label htmlFor='izin'>Izin</label>
            </div>
            <div className='flex space-x-2 items-center'>
              <input type='radio' name='stat' id='sakit' />
              <label htmlFor='sakit'>Sakit</label>
            </div>
          </form>
        </div>
        <div className='w-full flex flex-col px-2 space-y-2'>
          <p>Status</p>
          <form id='jamEditPresensi' className='px-1 space-y-2 flex-col'>
            <select
              name='jam'
              id='jumlahjam'
              className=' border border-gray-300 text-black text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-1/6 px-2 py-1'
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
            </select>
          </form>
        </div>
        <div className='w-full absolute flex justify-end bottom-3 right-3'>
          <Button onClick={() => setIsVisible(false)}>Simpan</Button>
        </div>
      </div>
    </div>
  );
};

export default EditPresensi;
