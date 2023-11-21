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
  DataKompen,
  DataMingguan,
  DataPresensiDosenSemester,
  makeKompen,
  makeMingguan,
  makePresensiDosenSemester,
} from '@/app/utils/fakeData';
import DebouncedInput from '@/app/CoreComponents/DebouncedInput';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'react-feather';
import Button from '@/app/CoreComponents/Button';
import { CachedJum, CachedNama, CachedNim, CachedNum } from './Columns';
import InputSelect from '@/app/CoreComponents/InputSelect';
import { FieldValues, useForm } from 'react-hook-form';
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

const TableSemester = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = React.useState('');

  const columns = React.useMemo<ColumnDef<DataPresensiDosenSemester>[]>(
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
        accessorKey: 'tanggal',
        header: () => 'Tanggal',
        cell: (info) => <CachedNim val={info} />,
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
        accessorKey: 'semester',
        header: () => 'Semester',
        cell: (info) => <CachedNum val={info} />,
      },
      {
        accessorKey: 'total',
        header: () => 'Total Mengajar',
        cell: (info) => <CachedNum val={info} />,
      },
    ],
    []
  );

  const [data, setData] = React.useState<DataPresensiDosenSemester[]>([]);
  const refreshData = () => setData((old) => makePresensiDosenSemester(50));

  React.useEffect(() => {
    setData(() => makePresensiDosenSemester(50));
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

  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      semester: semesterOption[0].value,
    },
  });

  return (
    <div>
      <form
        id='sortFormKompen'
        className='w-full flex items-center justify-end space-x-2'
      >
        <InputSelect
          id='semester'
          formId='sortFormMingguan'
          register={register}
          label='Semester'
          options={semesterOption}
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

export default TableSemester;
