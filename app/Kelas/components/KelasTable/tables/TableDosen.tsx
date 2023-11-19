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
import DebouncedInput from '@/app/CoreComponents/DebouncedInput';
import { DataKelas, makeData } from '@/app/utils/fakeData';
import {
  CachedConfirm,
  CachedDetail,
  CachedNama,
  CachedNim,
  CachedStatus,
} from './TableColumns';
import KonfirmasiAbsen from '@/app/CoreComponents/Modals/KonfirmasiAbsen';
import EditPresensi from '@/app/CoreComponents/Modals/EditPresensi';

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

const TableDosen = () => {
  const rerender = React.useReducer(() => ({}), {})[1];

  const [globalFilter, setGlobalFilter] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState({ nim: '', nama: '' });
  const [editVisible, setEditVisible] = React.useState(false);

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
      {
        accessorKey: 'detail',
        header: () => 'Detail',
        cell: () => (
          <CachedDetail onClick={() => setEditVisible(!editVisible)} />
        ),
      },
      {
        accessorKey: 'konfirmasi',
        header: () => 'Konfirmasi',
        cell: (info) => {
          return info.getValue() ? (
            <CachedConfirm
              setVisible={setModalVisible}
              val={info}
              setData={setModalData}
            />
          ) : (
            <div className='w-full flex justify-center cursor-default'>
              <p>-</p>
            </div>
          );
        },
      },
    ],
    [editVisible]
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
      <KonfirmasiAbsen
        isVisible={modalVisible}
        nim={modalData.nim}
        name={modalData.nama}
        setIsVisible={setModalVisible}
      />
      <div className='w-full flex items-center justify-end my-2 '>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className='px-2 py-1 w-2/3 sm:w-fit border-2 border-block rounded-lg'
          placeholder='Cari'
        />
      </div>
      <div className='p-2 w-full overflow-x-auto sm:overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-thumb-rounded-2xl'>
        <EditPresensi isVisible={editVisible} setIsVisible={setEditVisible} />
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

export default TableDosen;
