import React from 'react';
import CardJadwal from './CardJadwal';

const TodayJadwal = () => {
  const date = new Date(Date.now()).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const data = [
    {
      waktu: '07.00-12.00',
      matkul: 'Pemrograman Web',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '6',
    },
    {
      waktu: '13.00-18.00',
      matkul: 'Project Based Learning',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '8',
    },
    {
      waktu: '18.00-21.00',
      matkul: 'Rekayasa Perangkat Lunak',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '5',
    },
  ];
  return (
    <div className='bg-white flex flex-col px-4 py-2 rounded-2xl'>
      <h1 className='text-lg font-bold'>Jadwal Anda Hari Ini</h1>
      <p className='text-sm font-medium'>{date}</p>
      <div className='w-full mt-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
        <div className='w-fit flex flex-row p-2 space-x-2'>
          {data.map((val, index) => (
            <CardJadwal
              key={index}
              waktu={val.waktu}
              matkul={val.matkul}
              kelas={val.kelas}
              ruang={val.ruang}
              jam={val.jam}
              startable
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayJadwal;
