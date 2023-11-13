import React from 'react';
import MatkulRows from './MatkulRows';
import Image from 'next/image';

const MatkulTable = () => {
  const data = {
    nama: 'Ferry Faisal',
    matkul: 'Project Based Learning',
    tanggal: '18 Oktober 2023',
    waktu: '10.30-18.00',
    masuk: '13.00',
    semester: '5',
    kelas: 'C',
  };

  return (
    <div className='w-full md:w-[60%] bg-white rounded-2xl p-4 flex flex-col sm:flex-row-reverse items-center sm:justify-between'>
      <div className='w-full sm:w-2/5 flex justify-center sm:justify-end'>
        <div className='h-36 sm:h-40 w-32 sm:w-36 mb-4 sm:mb-0 relative'>
          <Image
            alt='foto'
            fill
            priority
            src='/img/Ferry-Faisal.jpg'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full h-auto rounded-2xl  '
          />
        </div>
      </div>
      <table className='w-full sm:w-3/5'>
        <tbody className='font-semibold'>
          <MatkulRows title='Nama' value={data.nama} />
          <MatkulRows title='Mata Kuliah' value={data.matkul} />
          <MatkulRows title='Tanggal' value={data.tanggal} />
          <MatkulRows title='Waktu' value={data.waktu} />
          <MatkulRows title='Jam Masuk' value={data.masuk} />
          <MatkulRows
            title='Semester/Kelas'
            value={data.semester + '/' + data.kelas}
          />
        </tbody>
      </table>
    </div>
  );
};

export default MatkulTable;
