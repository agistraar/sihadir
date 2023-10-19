import React from 'react';

type MatkulRows = {
  title: string;
  value: string;
};

const MatkulRows = ({ title, value }: MatkulRows) => {
  return (
    <tr className='w-full'>
      <td className='w-[30%]'>{title}</td>
      <td className='w-[1%]'>:</td>
      <td className='w-[69%] pl-2'>{value}</td>
    </tr>
  );
};

export default MatkulRows;
