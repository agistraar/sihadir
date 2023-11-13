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

const TableMingguan = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [data, setData] = React.useState<DataPresensiMingguan[]>([]);
  const refreshData = () => setData(() => makePresensiMingguan(5));

  React.useEffect(() => {
    setData(() => makePresensiMingguan(5));
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
        accessorKey: 'hari',
        header: () => 'Hari',
        cell: (info) => <CachedNama val={info} />,
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
      // {
      //   accessorKey: 'status',
      //   header: () => 'Status',
      //   cell: (info) => <CachedStatus val={Number(info.getValue())} />,
      // },
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
  const mingguOption = [
    {
      label: 'Minggu ke-1',
      value: '1',
    },
    {
      label: 'Minggu ke-2',
      value: '2',
    },
    {
      label: 'Minggu ke-3',
      value: '3',
    },
    {
      label: 'Minggu ke-4',
      value: '4',
    },
    {
      label: 'Minggu ke-5',
      value: '5',
    },
    {
      label: 'Minggu ke-6',
      value: '6',
    },
    {
      label: 'Minggu ke-7',
      value: '7',
    },
    {
      label: 'Minggu ke-8',
      value: '8',
    },
    {
      label: 'Minggu ke-9',
      value: '9',
    },
    {
      label: 'Minggu ke-10',
      value: '10',
    },
    {
      label: 'Minggu ke-11',
      value: '11',
    },
    {
      label: 'Minggu ke-12',
      value: '12',
    },
    {
      label: 'Minggu ke-13',
      value: '13',
    },
    {
      label: 'Minggu ke-14',
      value: '14',
    },
    {
      label: 'Minggu ke-15',
      value: '15',
    },
    {
      label: 'Minggu ke-16',
      value: '16',
    },
  ];

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      minggu: mingguOption[0].value,
    },
  });

  return (
    <div>
      <form
        id='sortFormMingguan'
        className='w-full flex items-center justify-start space-x-2'
      >
        <InputSelect
          id='mingguTableMingguan'
          formId='sortFormMingguan'
          register={register}
          label='Minggu'
          options={mingguOption}
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

export default TableMingguan;
