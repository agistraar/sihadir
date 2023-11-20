import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';
import Button from '../Button';
import { Image as IconImage, X } from 'react-feather';
import Link from 'next/link';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

type KonfirmasiAbsenParams = {
  isVisible: boolean;
  nim: string;
  name: string;
  setIsVisible: Function;
};

const KonfirmasiAbsen = ({
  isVisible,
  nim,
  name,
  setIsVisible,
}: KonfirmasiAbsenParams) => {
  const surat = '/img/sample-surat.png';

  const showAlertKonfirmasi = () => {
    withReactContent(Swal)
      .fire({
        title: <p>Konfirmasi Absensi Mahasiswa Ini?</p>,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Konfirmasi',
        cancelButtonText: `Batal`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Konfirmasi Diterima',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            willClose: () => {
              setIsVisible(!isVisible);
            },
          });
        }
      });
  };

  const showAlertTolak = () => {
    withReactContent(Swal)
      .fire({
        title: <p>Tolak Konfirmasi Mahasiswa Ini?</p>,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Tolak',
        cancelButtonText: `Batal`,
        confirmButtonColor: '#ff0000',
      })
      .then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Konfirmasi Ditolak',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
            willClose: () => {
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
        'absolute left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center p-5 md:py-10 md:px-20'
      )}
    >
      <div className='w-full h-full bg-white rounded-2xl flex flex-col items-center md:items-start md:flex-row px-6 py-3 relative'>
        <X
          className='absolute top-3 right-3 cursor-pointer'
          onClick={() => setIsVisible(!isVisible)}
        />
        <div className='w-full h-fit md:h-full md:w-2/5 custom-gradient  rounded-2xl p-2 md:p-4 mt-8 md:mt-0 '>
          <Link
            href={`/_next/image?url=${surat.replace('/', '%2F')}&w=1080&q=100`}
            target='_blank'
          >
            <div className='h-full w-full relative hidden md:block'>
              <Image
                priority
                alt='Surat'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                src={surat}
                className='w-full h-auto'
              />
            </div>
            <div className='w-full flex items-center space-x-3 px-4 py-2 md:hidden text-white font-medium'>
              <IconImage />
              <p>Tekan untuk lihat surat</p>
            </div>
          </Link>
        </div>
        <div className='w-full h-2/3 md:w-3/5 md:h-full  p-2 md:p-4 flex flex-col'>
          <h1 className='font-bold text-center text-2xl'>
            Pembaruan Kehadiran
          </h1>
          <div className='flex flex-col h-5/6 md:ml-10 '>
            <div className='flex flex-col space-y-2 w-full text-lg md:mt-20 font-medium'>
              <table>
                <tbody>
                  <tr className='w-full items-start'>
                    <td className='w-[19%] align-top'>Nama</td>
                    <td className='w-[1%] align-top'>:</td>
                    <td className='w-[80%] pl-2 '>{name}</td>
                  </tr>
                  <tr className='w-full'>
                    <td className='w-[19%]'>NIM</td>
                    <td className='w-[1%]'>:</td>
                    <td className='w-[80%] pl-2'>{nim}</td>
                  </tr>
                  <tr className='w-full'>
                    <td className='w-[19%]'>Kelas/Semester</td>
                    <td className='w-[1%]'>:</td>
                    <td className='w-[80%] pl-2'>5/C</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex flex-col space-y-2 w-full h-2/3 md:h-3/5 text-lg mt-6 bg-gray-300 rounded-xl px-4 md:px-6 py-2 md:py-4'>
              <h2 className='text-md font-medium'>
                Keterangan Ketidakhadiran :
              </h2>
              <div className='overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded-2xl box-border'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Impedit necessitatibus ut quidem quae, nulla cupiditate maxime
                  sapiente incidunt neque pariatur excepturi animi! Maxime,
                  architecto eaque tempore eius iste voluptates id. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Enim sequi
                  consequuntur obcaecati error rem illum commodi reiciendis
                  repellat excepturi nesciunt accusamus alias libero neque
                  tempore soluta praesentium ullam, officia dolor.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end space-x-2 absolute bottom-3 right-3'>
          <Button red onClick={showAlertTolak}>
            Tolak
          </Button>
          <Button onClick={showAlertKonfirmasi}>Konfirmasi</Button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiAbsen;
