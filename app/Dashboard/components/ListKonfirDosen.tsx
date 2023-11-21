'use client';
import Button from '@/app/CoreComponents/Button';
import KonfirmasiAbsen from '@/app/CoreComponents/Modals/KonfirmasiAbsen';
import clsx from 'clsx';
import React from 'react';

type ListKonfirParams = {
  tipe: string;
  nama: string;
  nim: string;
  semester: string;
  kelas: string;
  setVisible: Function;
  setData: Function;
};

const ListKonfirDosen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dataModal, setDataModal] = React.useState({ nim: '', nama: '' });

  const data = [
    {
      tipe: 'Izin',
      nama: 'Muhammad Fajar',
      nim: '3202116025',
      semester: '5',
      kelas: 'C',
    },
    {
      tipe: 'Sakit',
      nama: 'Agistra Arifur Rahman',
      nim: '3202116023',
      semester: '5',
      kelas: 'C',
    },
    {
      tipe: 'Sakit',
      nama: 'Haafizhar Alfathan Syauqi',
      nim: '3202116132',
      semester: '5',
      kelas: 'B',
    },
    {
      tipe: 'Izin',
      nama: 'Azlinya Asyifa',
      nim: '3202116010',
      semester: '5',
      kelas: 'C',
    },
  ];
  return (
    <div className='w-full h-full px-4 pb-10 space-y-4'>
      <KonfirmasiAbsen
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        nim={dataModal.nim}
        name={dataModal.nama}
      />
      <h2 className='text-lg font-semibold'>
        Konfirmasi Kehadiran Mahasiswa Anda
      </h2>
      {data.map((val, index) => (
        <ListsKonfir
          key={index}
          tipe={val.tipe}
          nama={val.nama}
          nim={val.nim}
          semester={val.semester}
          kelas={val.kelas}
          setVisible={setModalVisible}
          setData={setDataModal}
        />
      ))}
    </div>
  );
};

const ListsKonfir = ({
  tipe,
  nama,
  nim,
  semester,
  kelas,
  setVisible,
  setData,
}: ListKonfirParams) => {
  return (
    <div className='bg-white shadow rounded-xl flex flex-col text-base font-medium relative pb-6'>
      <div className='w-full px-4 py-2 flex rounded-t-2xl custom-gradient items-center justify-between'>
        <h1 className='text-white font-semibold'>{nama}</h1>
        <div
          className={clsx(
            'rounded-xl flex items-center justify-center px-6 py-0.5',
            tipe === 'Izin' ? 'bg-yellow-400' : 'bg-blue-400'
          )}
        >
          <h2 className='font-medium text-white'>{tipe}</h2>
        </div>
      </div>
      <div className='flex flex-col space-y-1 px-2 py-1 '>
        <h1>{nim}</h1>
        <h1>{semester + '/' + kelas}</h1>
      </div>
      <div className='absolute right-2 bottom-2 w-fit h-fit'>
        <Button
          onClick={() => {
            setData({ nama: nama, nim: nim });
            setVisible(true);
          }}
        >
          Konfirmasi Kehadiran
        </Button>
      </div>
    </div>
  );
};

export default ListKonfirDosen;
