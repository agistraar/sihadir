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

const ChartPresensi = () => {
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
        label: 'Kelas A',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
      },
      {
        label: 'Kelas B',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(156, 109, 255)',
        backgroundColor: 'rgba(156, 109, 255, 0.5)',
      },
      {
        label: 'Kelas C',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(57, 234, 221)',
        backgroundColor: 'rgba(57, 234, 221, 0.5)',
      },
      {
        label: 'Kelas D',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(0, 255, 41)',
        backgroundColor: 'rgba(0, 255, 41, 0.5)',
      },
      {
        label: 'Kelas E',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 122, 0)',
        backgroundColor: 'rgba(255, 122, 0, 0.5)',
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

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      semester: semesterOption[0].value,
    },
  });

  return (
    <div className='w-full h-fit bg-white rounded-2xl px-2 py-4'>
      <h1 className='font-semibold pl-2 text-lg'>
        Grafik <span className='text-blue-400'>Presensi</span> Mahasiswa TI
      </h1>
      <form
        id='sortFormGraphPresensi'
        className='w-full flex items-center pl-2 mb-4'
      >
        <InputSelect
          id='semesterPresensi'
          formId='sortFormGraphPresensi'
          register={register}
          options={semesterOption}
        />
      </form>
      <Line className='w-full' options={options} data={data} />
    </div>
  );
};

export default ChartPresensi;
