'use client';
import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  FilterFn,
  SortingFn,
  sortingFns,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  CellContext,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnFiltersState,
  Column,
  Table,
} from '@tanstack/react-table';
import clsx from 'clsx';

import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import {
  DataKonfirmasiAbsen,
  makeKonfirmasiAbsensi,
} from '@/app/utils/fakeData';
import DebouncedInput from '@/app/CoreComponents/DebouncedInput';
import { Search } from 'react-feather';
import Button from '@/app/CoreComponents/Button';
import {
  CachedButton,
  CachedNama,
  CachedNim,
  CachedNum,
  CachedStatusKonf,
} from './Columns';
import InputSelect from '@/app/CoreComponents/InputSelect';
import { FieldValues, useForm } from 'react-hook-form';
import KonfirmasiAbsen from '@/app/CoreComponents/Modals/KonfirmasiAbsen';
declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

const TableKonfirmasi = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({ nim: '', nama: '' });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<DataKonfirmasiAbsen>[]>(
    () => [
      {
        accessorKey: 'No',
        header: () => 'No.',
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) => (
          <p className='text-center'>{Number(info.row.id) + 1}</p>
        ),
      },
      {
        accessorKey: 'nama',
        header: () => 'Nama',
        cell: (info) => <CachedNama val={info} />,
        enableSorting: false,
        enableColumnFilter: false,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'nim',
        header: () => 'NIM',
        cell: (info) => <CachedNim val={info} />,
        enableSorting: false,
        enableColumnFilter: false,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'kelas',
        header: () => 'Kelas',
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'semester',
        header: () => 'Semester',
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'status',
        header: () => 'Status',
        cell: (info) => <CachedStatusKonf val={info} />,
      },
      {
        accessorKey: 'detail',
        header: () => 'Detail',
        cell: (info) => (
          <CachedButton
            setIsVisible={setModalVisible}
            setData={setModalData}
            nim={info.row.original.nim}
            nama={info.row.original.nama}
          />
        ),
      },
    ],
    []
  );

  const [data, setData] = React.useState<DataKonfirmasiAbsen[]>([]);
  const refreshData = () => setData((old) => makeKonfirmasiAbsensi(12));

  React.useEffect(() => {
    setData(() => makeKonfirmasiAbsensi(12));
  }, []);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'nama') {
      if (table.getState().sorting[0]?.id !== 'nama') {
        table.setSorting([{ id: 'nama', desc: false }]);
      }
    }
  }, [table]);

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
    <div>
      <KonfirmasiAbsen
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        name={modalData.nama}
        nim={modalData.nim}
      />
      <form
        id='sortFormSemester'
        className='w-full flex items-center justify-end space-x-2'
      >
        <InputSelect
          id='semesterTableSemester'
          formId='sortFormSemester'
          register={register}
          label='Semester'
          options={semesterOption}
        />
        <InputSelect
          id='kelasTableSemester'
          formId='sortFormSemester'
          register={register}
          label='Kelas'
          options={kelasOption}
        />
      </form>
      <div className='w-full flex items-center justify-between my-2 '>
        <Button secondary large>
          Export PDF
        </Button>
        <div className='flex flex-row items-center space-x-2'>
          <Search className='text-gray-400' />
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className='px-2 py-1 w-full sm:w-fit border-2 border-block rounded-lg'
            placeholder='Cari'
          />
        </div>
      </div>
      <div className='p-2 w-full overflow-x-auto sm:overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
        <table className='w-[150%] sm:w-full text-gray-500'>
          <thead className='border-b-2 text-base'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-b-2'>
                {row.getVisibleCells().map((cell: any, index: any) => (
                  <td key={cell.id} className={clsx('py-1.5')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableKonfirmasi;
