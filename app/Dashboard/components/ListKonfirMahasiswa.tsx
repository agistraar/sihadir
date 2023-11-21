'use client';
import Button from '@/app/CoreComponents/Button';
import UpdateKehadiran from '@/app/CoreComponents/Modals/UpdateKehadiran';
import React from 'react';

type ListKonfirMahasiswaParams = {
  matkul: string;
  tanggal: string;
  jam: string;
  setVisible: Function;
  setModalData: Function;
};

const ListKonfirMahasiswa = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({ matkul: '', tanggal: '' });

  const data = [
    {
      matkul: 'Pemrograman Web',
      tanggal: '2023-11-13',
      jam: '6',
    },
    {
      matkul: 'Rekayasa Perangkat Lunak',
      tanggal: '2023-11-13',
      jam: '6',
    },
    {
      matkul: 'Jaringan Lanjutan',
      tanggal: '2023-11-12',
      jam: '5',
    },
    {
      matkul: 'Etika Profesi',
      tanggal: '2023-11-11',
      jam: '4',
    },
  ];
  return (
    <div className='w-full h-full px-4 pb-10 space-y-4'>
      <UpdateKehadiran
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        matkul={modalData.matkul}
        tanggal={modalData.tanggal}
      />
      <h2 className='text-lg font-semibold'>Konfirmasi Kehadiran Anda</h2>
      {data.map((val, index) => (
        <ListsKonfir
          key={index}
          matkul={val.matkul}
          tanggal={val.tanggal}
          jam={val.jam}
          setVisible={setModalVisible}
          setModalData={setModalData}
        />
      ))}
    </div>
  );
};

const ListsKonfir = ({
  matkul,
  tanggal,
  jam,
  setVisible,
  setModalData,
}: ListKonfirMahasiswaParams) => {
  return (
    <div className='bg-white shadow rounded-xl flex flex-col text-base font-medium relative pb-6'>
      <div className='w-full px-4 py-2 flex rounded-t-xl custom-gradient items-center justify-between'>
        <h1 className='text-white font-semibold'>{matkul}</h1>
        <div className='px-6 py-0.5 rounded-xl flex items-center justify-center bg-red-500'>
          <p className='font-medium text-white'>Alpa</p>
        </div>
      </div>
      <div className='flex flex-col space-y-1 px-2 py-1 '>
        <h1>
          {new Date(tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </h1>
        <h1>{jam + ' jam'}</h1>
      </div>
      <div className='absolute right-2 bottom-2 w-fit h-fit'>
        <Button
          onClick={() => {
            setModalData({ matkul: matkul, tanggal: tanggal });
            setVisible(true);
          }}
        >
          Update Kehadiran
        </Button>
      </div>
    </div>
  );
};

export default ListKonfirMahasiswa;
