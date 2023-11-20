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
      tanggal: '13/11/2023',
      jam: '6',
    },
    {
      matkul: 'Rekayasa Perangkat Lunak',
      tanggal: '13/11/2023',
      jam: '6',
    },
    {
      matkul: 'Jaringan Lanjutan',
      tanggal: '12/11/2023',
      jam: '5',
    },
    {
      matkul: 'Etika Profesi',
      tanggal: '11/11/2023',
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
    <div className='bg-gray-300 rounded-xl flex text-base font-medium relative'>
      <div className='w-[20%] md:w-[11%] rounded-l-xl flex items-center justify-center bg-red-400'>
        <h2 className='font-bold'>Alpa</h2>
      </div>
      <div className='flex flex-col space-y-1 px-2 py-1 '>
        <h1>{matkul}</h1>
        <h1>{tanggal}</h1>
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
