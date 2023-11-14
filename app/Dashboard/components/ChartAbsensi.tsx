'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { FieldValues, useForm } from 'react-hook-form';
import InputSelect from '@/app/CoreComponents/InputSelect';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartAbsensi = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = [
    'Minggu 1',
    'Minggu 2',
    'Minggu 3',
    'Minggu 4',
    'Minggu 5',
    'Minggu 6',
    'Minggu 7',
    'Minggu 8',
    'Minggu 9',
    'Minggu 10',
    'Minggu 11',
    'Minggu 12',
    'Minggu 13',
    'Minggu 14',
    'Minggu 15',
    'Minggu 16',
  ];

  const [data, setData] = React.useState({
    labels,
    datasets: [
      {
        label: 'Alpha',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
      {
        label: 'Izin',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(68, 161, 221)',
        backgroundColor: 'rgba(68, 161, 221, 0.5)',
      },
      {
        label: 'Sakit',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(252, 229, 19)',
        backgroundColor: 'rgba(252, 229, 19, 0.5)',
      },
    ],
  });

  const semesterOption = [
    {
      label: 'Semester 1',
      value: '1',
    },
    {
      label: 'Semester 2',
      value: '2',
    },
    {
      label: 'Semester 3',
      value: '3',
    },
    {
      label: 'Semester 4',
      value: '4',
    },
    {
      label: 'Semester 5',
      value: '5',
    },
    {
      label: 'Semester 6',
      value: '6',
    },
  ];

  const kelasOption = [
    {
      label: 'A',
      value: 'A',
    },
    {
      label: 'B',
      value: 'B',
    },
    {
      label: 'C',
      value: 'C',
    },
    {
      label: 'D',
      value: 'D',
    },
    {
      label: 'E',
      value: 'E',
    },
  ];

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      semester: semesterOption[0].value,
      kelas: kelasOption[0].value,
    },
  });

  return (
    <div className='w-full md:h-fit bg-white rounded-2xl px-2 py-4'>
      <h1 className='font-semibold pl-2 text-lg'>
        Grafik <span className='text-red-400'>Absensi</span> Mahasiswa TI
      </h1>
      <form
        id='sortFormGraphAbsensi'
        className='w-full flex items-center pl-2 space-x-2 mb-4'
      >
        <InputSelect
          id='semesterAbsensi'
          formId='sortFormGraphAbsensi'
          register={register}
          options={semesterOption}
        />
        <InputSelect
          id='kelasAbsensi'
          formId='sortFormGraphAbsensi'
          register={register}
          options={kelasOption}
        />
      </form>
      <Line className='w-full' options={options} data={data} />
    </div>
  );
};

export default ChartAbsensi;
