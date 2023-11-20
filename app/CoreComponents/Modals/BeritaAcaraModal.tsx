'use client';
import clsx from 'clsx';
import React from 'react';
import Button from '../Button';
import { X } from 'react-feather';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

type BAParams = {
  isVisible: boolean;
  setIsVisible: Function;
};

const BeritaAcaraModal = ({ isVisible, setIsVisible }: BAParams) => {
  const showAlert = () => {
    withReactContent(Swal)
      .fire({
        title: <p>Simpan Berita Acara?</p>,
        icon: 'question',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Simpan',
        denyButtonText: `Periksa Kembali`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Berhasil Disimpan',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            willClose: () => {
              document.forms['0'].reset();
              setIsVisible(!isVisible);
            },
          });
        }
      });
  };

  return (
    <div
      className={clsx(
        isVisible ? 'block' : 'hidden',
        'absolute left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center p-5 md:py-10 md:px-20 transition-opacity ease-in'
      )}
    >
      <div className='w-full sm:w-3/6 h-full bg-white rounded-2xl flex flex-col items-center px-6 py-3 space-y-6 relative pb-12'>
        <div className='flex w-full items-center justify-between border-b-2 py-4'>
          <h1 className='font-semibold text-xl'>Berita Acara Perkuliahan</h1>
          <X
            className='cursor-pointer'
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
        <div className='w-full overflow-y-auto scrollbar-thin px-2'>
          <form id='beritaAcara'>
            <p className='mt-2 font-medium'>Pokok Bahasan</p>
            <textarea
              name='pokbas'
              id='pokbas'
              rows={5}
              className='form-input block w-full rounded-xl border-0 py-3 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6'
            />
            <p className='mt-2 font-medium'>Sub Pokok Bahasan</p>
            <textarea
              name='subpokbas'
              id='subpokbas'
              rows={5}
              className='form-input block w-full rounded-xl border-0 py-3 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6'
            />
            <p className='mt-2 font-medium'>Media Yang Digunakan</p>
            <textarea
              name='media'
              id='media'
              rows={5}
              className='form-input block w-full rounded-xl border-0 py-3 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6'
            />
          </form>
        </div>
        <div className='w-full absolute flex justify-end bottom-3 right-3'>
          <Button onClick={showAlert}>Simpan</Button>
        </div>
      </div>
    </div>
  );
};

export default BeritaAcaraModal;
