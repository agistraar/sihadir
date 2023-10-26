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
import clsx from 'clsx';

import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { DataKompen, makeKompen } from '@/app/utils/fakeData';
import DebouncedInput from '@/app/CoreComponents/DebouncedInput';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'react-feather';
import Button from '@/app/CoreComponents/Button';
import {
  CachedJum,
  CachedNama,
  CachedNim,
  CachedNum,
  CachedStatus,
} from './KompenColumns';

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

type colData = {
  val: CellContext<DataKompen, unknown>;
};

const TableKompen = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<DataKompen>[]>(
    () => [
      {
        accessorKey: 'No',
        header: () => <h3>No</h3>,
        cell: (info) => (
          <p className='text-center'>{Number(info.row.id) + 1}</p>
        ),
      },
      {
        accessorKey: 'nama',
        header: () => <h3>Nama</h3>,
        cell: (info) => <CachedNama val={info} />,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'nim',
        header: () => <h3>NIM</h3>,
        cell: (info) => <CachedNim val={info} />,
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      },
      {
        accessorKey: 'alpa',
        header: () => <h3>Alpa</h3>,
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'izin',
        header: () => <h3>Izin</h3>,
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'sakit',
        header: () => <h3>Sakit</h3>,
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'jumlah',
        header: () => <h3>Jumlah Kompensasi</h3>,
        cell: (info) => <CachedJum val={info} />,
      },
      {
        accessorKey: 'status',
        header: () => <h3>Status</h3>,
        cell: (props) => <CachedStatus val={props.row.original.jumlah} />,
      },
    ],
    []
  );

  const [data, setData] = React.useState<DataKompen[]>([]);
  const refreshData = () => setData((old) => makeKompen(50000));

  React.useEffect(() => {
    setData(() => makeKompen(50000));
  }, []);

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
                  <td key={cell.id} className={clsx('py-1.5')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <Button
          type='submit'
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className='text-white h-4 w-4' />
        </Button>
        <Button
          type='submit'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className='text-white h-4 w-4' />
        </Button>
        <Button
          type='submit'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className='text-white h-4 w-4' />
        </Button>
        <Button
          type='submit'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className='text-white h-4 w-4' />
        </Button>
        <span className='flex items-center gap-1'>
          <div>Halaman</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} dari{' '}
            {table.getPageCount()}
          </strong>
        </span>
        {/* {dataQuery.isFetching ? 'Loading...' : null} */}
      </div>
      <div className='flex items-center gap-2 mt-2'>
        <span className='flex items-center gap-1'>
          Menuju ke halaman:
          <input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className=' border border-gray-300 text-black text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2'
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Tampilkan {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableKompen;
