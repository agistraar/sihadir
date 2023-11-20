'use client';
import React from 'react';
import Button from '../Button';
import clsx from 'clsx';
import { FilePlus, X } from 'react-feather';
import { FileUploader } from 'react-drag-drop-files';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

type UpdateKehadiranParams = {
  isVisible: boolean;
  setIsVisible: Function;
  matkul: string;
  tanggal: string;
};

const fileTypes = ['JPG', 'PNG', 'PDF'];

const UpdateKehadiran = ({
  isVisible,
  setIsVisible,
  matkul,
  tanggal,
}: UpdateKehadiranParams) => {
  const [file, setFile] = React.useState<File>();
  const handleChange = (file: File) => {
    setFile(file);
    console.log(file.name);
  };

  const showAlert = () => {
    withReactContent(Swal)
      .fire({
        title: <p>Unggah Berkas Konfirmasi Absensi?</p>,
        icon: 'question',
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'Unggah',
        denyButtonText: `Periksa Kembali`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Berhasil Diunggah',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            willClose: () => {
              setFile(undefined);
              setIsVisible(!isVisible);
            },
          });
        }
      });
  };

  const handleErrorType = () => {
    withReactContent(Swal).fire({
      title: <p>Tipe File Tidak Diizinkan</p>,
      text: 'Harap Upload file bertipe pdf, png, atau jpg',
      showConfirmButton: false,
      icon: 'error',
      timer: 3000,
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
          <h1 className='font-semibold text-xl'>Pembaruan Kehadiran</h1>
          <X
            className='cursor-pointer'
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>
        <div className='w-full overflow-y-auto scrollbar-thin px-2'>
          <form id='updateKehadiran'>
            <div className='w-full font-semibold mb-4 custom-gradient text-white rounded-xl p-2'>
              <div className='w-full flex'>
                <div className='w-[19%]'>Mata Kuliah</div>
                <div className='w-[1%]'>:</div>
                <div className='w-[80%]'>{matkul}</div>
              </div>
              <div className='w-full flex'>
                <div className='w-[19%]'>Tanggal</div>
                <div className='w-[1%]'>:</div>
                <div className='w-[80%]'>{tanggal}</div>
              </div>
            </div>
            <p className='font-medium'>File Surat</p>
            <div className='w-full box-border overflow-hidden'>
              <FileUploader
                handleChange={handleChange}
                types={fileTypes}
                onTypeError={handleErrorType}
              >
                <div className='w-full border-2 rounded-lg px-2 py-4 md:px-8 md:py-10 flex flex-row space-x-2 hover:border-purple-500'>
                  <FilePlus />
                  {file ? (
                    <p>{file.name}</p>
                  ) : (
                    <p>Tekan atau tarik untuk upload file surat</p>
                  )}
                </div>
              </FileUploader>
            </div>
            <p className='mt-4 font-medium'>Status</p>
            <select
              name='status'
              id='status'
              form='updateKehadiran'
              className='border border-gray-300 text-black text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2'
            >
              <option value='Sakit'>Sakit</option>
              <option value='Izin'>Izin</option>
            </select>
            <p className='mt-4 font-medium'>Keterangan</p>
            <textarea
              name='media'
              id='media'
              rows={5}
              className='form-input block w-full rounded-xl border-0 py-3 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6'
            />
          </form>
        </div>
        <div className='w-full absolute flex justify-end bottom-3 right-3'>
          <Button onClick={showAlert}>Unggah File</Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateKehadiran;
