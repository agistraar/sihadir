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
  ColumnFiltersState,
  getFacetedRowModel,
} from '@tanstack/react-table';
import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import {
  DataDosenMingguan,
  DataPresensiMingguan,
  makeDosenMingguan,
  makePresensiMingguan,
} from '@/app/utils/fakeData';
import {
  CachedJum,
  CachedNama,
  CachedNum,
  CachedTotalMengajar,
} from '../Columns';
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
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [data, setData] = React.useState<DataDosenMingguan[]>([]);
  const refreshData = () => setData(() => makeDosenMingguan(10));

  React.useEffect(() => {
    setData(() => makeDosenMingguan(10));
  }, []);

  const columns = React.useMemo<ColumnDef<DataDosenMingguan>[]>(
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
        accessorKey: 'tanggal',
        header: () => 'Tanggal',
        cell: (info) => <CachedNama val={info} />,
      },
      {
        accessorKey: 'matkul',
        header: () => 'Mata Kuliah',
        cell: (info) => <CachedNama val={info} />,
      },
      {
        accessorKey: 'kelas',
        header: () => 'Kelas',
        cell: (info) => <CachedNama val={info} />,
      },
      {
        accessorKey: 'ruang',
        header: () => 'Ruang',
        cell: (info) => <CachedNama val={info} />,
      },
      {
        accessorKey: 'total',
        header: () => 'Total Mengajar',
        cell: (info) => <CachedTotalMengajar val={info} />,
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
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'matkul') {
      if (table.getState().sorting[0]?.id !== 'matkul') {
        table.setSorting([{ id: 'matkul', desc: false }]);
      }
    }
  }, [table]);

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

  const matkulOption = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Pemrograman Web',
      value: 'Pemrograman Web',
    },
    {
      label: 'Project Based Learning',
      value: 'Project Based Learning',
    },
    {
      label: 'Rekayasa Perangkat Lunak',
      value: 'Rekayasa Perangkat Lunak',
    },
  ];

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      minggu: mingguOption[0].value,
      matkul: matkulOption[0].value,
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
        <InputSelect
          id='matkulTableMingguan'
          formId='sortFormMingguan'
          register={register}
          label='Mata Kuliah'
          handleChange={(e) => {
            setGlobalFilter(e.target.value);
            console.log(e.target.value);
          }}
          options={matkulOption}
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
