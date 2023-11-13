import React from 'react';
import CardJadwal from './CardJadwal';

const SemesterJadwal = () => {
  const data = [
    {
      waktu: '07.00-09.00',
      matkul: 'Etika Profesi',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '6',
    },
    {
      waktu: '09.00-12.00',
      matkul: 'Kewirausahaan',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '8',
    },
    {
      waktu: '12.00-15.00',
      matkul: 'Rekayasa Perangkat Lunak',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '5',
    },
    {
      waktu: '15.00-18.00',
      matkul: 'Jaringan Lanjutan',
      kelas: '5C',
      ruang: 'TI-12',
      jam: '5',
    },
  ];
  return (
    <div className='bg-white flex flex-col px-4 py-2 rounded-2xl space-y-2'>
      <h1 className='text-lg mb-6 font-bold'>Jadwal Anda Semester Ini</h1>
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg pl-2'>Senin</h2>
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div className='w-fit flex flex-row p-2 space-x-2'>
            {data.map((val, index) => (
              <CardJadwal
                key={index}
                waktu={val.waktu}
                matkul={val.matkul}
                kelas={val.kelas}
                ruang={val.ruang}
                jam={val.jam}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg pl-2'>Selasa</h2>
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div className='w-fit flex flex-row p-2 space-x-2'>
            {data.map((val, index) => (
              <CardJadwal
                key={index}
                waktu={val.waktu}
                matkul={val.matkul}
                kelas={val.kelas}
                ruang={val.ruang}
                jam={val.jam}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg pl-2'>Rabu</h2>
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div className='w-fit flex flex-row p-2 space-x-2'>
            {data.map((val, index) => (
              <CardJadwal
                key={index}
                waktu={val.waktu}
                matkul={val.matkul}
                kelas={val.kelas}
                ruang={val.ruang}
                jam={val.jam}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg pl-2'>Kamis</h2>
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div className='w-fit flex flex-row p-2 space-x-2'>
            {data.map((val, index) => (
              <CardJadwal
                key={index}
                waktu={val.waktu}
                matkul={val.matkul}
                kelas={val.kelas}
                ruang={val.ruang}
                jam={val.jam}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg pl-2'>{"Jum'at"}</h2>
        <div className='w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
          <div className='w-fit flex flex-row p-2 space-x-2'>
            {data.map((val, index) => (
              <CardJadwal
                key={index}
                waktu={val.waktu}
                matkul={val.matkul}
                kelas={val.kelas}
                ruang={val.ruang}
                jam={val.jam}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterJadwal;
