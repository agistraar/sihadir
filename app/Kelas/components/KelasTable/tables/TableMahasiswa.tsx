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
} from '@tanstack/react-table';
import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import DebouncedInput from '../components/DebouncedInput';
import { DataKelas, makeData } from '@/app/utils/fakeData';
import { CachedNama, CachedNim, CachedStatus } from './TableColumns';
import { Search } from 'react-feather';

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

const TableMahasiswa = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<DataKelas>[]>(
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
        accessorKey: 'nim',
        header: () => (
          <div className='w-full flex justify-center'>
            <p>NIM</p>
          </div>
        ),
        cell: (info) => <CachedNim val={info} />,
      },
      {
        accessorKey: 'nama',
        header: () => (
          <div className='w-full flex justify-center'>
            <p>Nama Mahasiswa</p>
          </div>
        ),
        cell: (info) => <CachedNama val={info} />,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'status',
        header: () => 'Status',
        cell: (info) => <CachedStatus val={info} />,
      },
    ],
    []
  );

  const [data, setData] = React.useState<DataKelas[]>([]);
  const refreshData = () => setData((old) => makeData(27));

  React.useEffect(() => {
    setData(() => makeData(27));
  }, []);

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
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'nama') {
      if (table.getState().sorting[0]?.id !== 'nama') {
        table.setSorting([{ id: 'nama', desc: false }]);
      }
    }
  }, [table]);
  return (
    <div>
      <div className='w-full flex items-center justify-end space-x-2 my-2 '>
        <Search className='text-gray-400' />
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className='px-2 py-1 w-2/4 sm:w-fit border-2 border-block rounded-lg'
          placeholder='Cari'
        />
      </div>
      <div className='p-2 w-full overflow-x-auto sm:overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
        <table className='w-full text-gray-500'>
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

export default TableMahasiswa;
