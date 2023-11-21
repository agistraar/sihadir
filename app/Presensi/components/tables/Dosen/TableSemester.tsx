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
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  RankingInfo,
  compareItems,
  rankItem,
} from '@tanstack/match-sorter-utils';
import { DataDosenSemester, makeDosenSemester } from '@/app/utils/fakeData';
import {
  CachedJum,
  CachedNama,
  CachedNum,
  CachedStatus,
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

const TableSemester = () => {
  const rerender = React.useReducer(() => ({}), {})[1];
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [data, setData] = React.useState<DataDosenSemester[]>([]);
  const refreshData = () => setData(() => makeDosenSemester(24));

  React.useEffect(() => {
    setData(() => makeDosenSemester(24));
  }, []);

  const columns = React.useMemo<ColumnDef<DataDosenSemester>[]>(
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
        accessorKey: 'matkul',
        header: () => 'Mata Kuliah',
        cell: (info) => <CachedNama val={info} />,
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
        accessorKey: 'total',
        header: () => 'Total Jam Mengajar',
        cell: (info) => <CachedTotalMengajar val={info} />,
        enableGlobalFilter: false,
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // React.useEffect(() => {
  //   if (table.getState().columnFilters[0]?.id === 'matkul') {
  //     if (table.getState().sorting[0]?.id !== 'matkul') {
  //       table.setSorting([{ id: 'matkul', desc: false }]);
  //     }
  //   }
  // }, [table]);

  const semesterOption = [
    {
      label: 'All',
      value: '',
    },
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

  const kelasOption = [
    {
      label: 'All',
      value: '',
    },
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
      matkul: matkulOption[0].value,
      kelas: kelasOption[0].value,
    },
  });

  return (
    <div>
      <form
        id='sortFormSemester'
        className='w-full flex items-center justify-start space-x-2'
      >
        <InputSelect
          id='matkulTableSemester'
          formId='sortFormSemester'
          register={register}
          label='Mata Kuliah'
          handleChange={(e) =>
            setColumnFilters([
              ...columnFilters,
              { id: 'matkul', value: e.target.value },
            ])
          }
          options={matkulOption}
        />
        <InputSelect
          id='kelasTableSemester'
          formId='sortFormSemester'
          register={register}
          label='Kelas'
          handleChange={(e) =>
            setColumnFilters([
              ...columnFilters,
              { id: 'kelas', value: e.target.value },
            ])
          }
          options={kelasOption}
        />
        <InputSelect
          id='semesterTableSemester'
          formId='sortFormSemester'
          register={register}
          label='Semester'
          handleChange={(e) => {
            if (e.target.value === '') {
              setColumnFilters(
                columnFilters.filter((object) => {
                  return object.id !== 'semester';
                })
              );
            } else {
              setColumnFilters([
                ...columnFilters,
                { id: 'semester', value: e.target.value },
              ]);
            }
          }}
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
