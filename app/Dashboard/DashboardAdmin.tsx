import React from 'react';

const DashboardAdmin = () => {
  const dataKompen = [
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
    {
      nama: 'Muhammad Sumbul',
      jam: 24,
      status: 'SP1',
    },
  ];
  return (
    <div className='w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 box-border'>
      <div className='w-full md:w-2/5 bg-white px-2 py-4 rounded-2xl'>
        <table className='w-full'>
          <thead className='w-full border-b-2 border-black'>
            <tr className='w-full'>
              <th className='w-[40%]'>Nama Mahasiswa</th>
              <th className='w-[35%]'>Jumlah</th>
              <th className='w-[25%]'>Status</th>
            </tr>
          </thead>
          <tbody className='w-full'>
            {dataKompen.map((val, index) => (
              <tr className='w-full' key={index}>
                <td className='w-[40%] text-center'>{val.nama}</td>
                <td className='w-[35%] text-center'>{val.jam + ' jam'}</td>
                <td className='w-[25%] text-center'>{val.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAdmin;
