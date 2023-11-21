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
} from '@tanstack/react-table';
import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import {
  DataKelas,
  DataPresensiMingguan,
  makePresensiMingguan,
} from '@/app/utils/fakeData';
import { CachedJum, CachedNama, CachedNum, CachedStatus } from '../Columns';
import KonfirmasiAbsen from '@/app/CoreComponents/Modals/KonfirmasiAbsen';
import { FieldValues, useForm } from 'react-hook-form';
import InputSelect from '@/app/CoreComponents/InputSelect';

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

// type colData = {
//   val: CellContext<DataKelas, unknown>;
// };

const TableSemester = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [data, setData] = React.useState<DataPresensiMingguan[]>([]);
  const refreshData = () => setData(() => makePresensiMingguan(16));

  React.useEffect(() => {
    setData(() => makePresensiMingguan(16));
  }, []);

  const columns = React.useMemo<ColumnDef<DataPresensiMingguan>[]>(
    () => [
      {
        accessorKey: 'no',
        header: () => (
          <div className='w-full flex justify-center'>
            <p>No.</p>
          </div>
        ),
        cell: (info) => (
          <div className='w-full flex justify-center'>
            <p>{Number(info.row.id) + 1}</p>
          </div>
        ),
      },
      {
        accessorKey: 'minggu',
        header: () => (
          <div className='w-full flex justify-center'>
            <p>Minggu</p>
          </div>
        ),
        cell: (info) => (
          <div className='w-full flex justify-center'>
            <p>Minggu ke-{Number(info.row.id) + 1}</p>
          </div>
        ),
      },
      {
        accessorKey: 'total',
        header: () => 'Total',
        cell: (info) => <CachedJum val={info} />,
      },
      {
        accessorKey: 'hadir',
        header: () => 'Hadir',
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'alpa',
        header: () => 'Alpa',
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'izin',
        header: () => 'Izin',
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'sakit',
        header: () => 'Sakit',
        cell: (info) => <CachedNum val={info} />,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
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
      minggu: semesterOption[0].value,
    },
  });

  return (
    <div>
      <form
        id='sortFormSemester'
        className='w-full flex items-center justify-start space-x-2'
      >
        <InputSelect
          id='semesterTableSemester'
          formId='sortFormSemester'
          register={register}
          label='Semester'
          options={semesterOption}
        />
      </form>
      <div className='p-2 w-full overflow-x-auto sm:overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
        <table className='w-[150%] sm:w-full text-gray-500'>
          <thead className='border-b-2 text-base'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='border-b-2'>
                {row.getVisibleCells().map((cell: any, index: any) => (
                  <td key={cell.id} className='py-1.5'>
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

export default TableSemester;
