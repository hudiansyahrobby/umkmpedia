import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { columnsz, dataz } from './dataSource';
import { GlobalFilter } from './GlobalFilter';

export default function Table({ title }) {
  const columns = useMemo(() => columnsz, []);
  const data = useMemo(() => dataz, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination,
  );

  const { globalFilter } = state;
  const { pageIndex, pageSize } = state;
  return (
    <>
      <div className='mx-3 mt-8'>
        <h2 className='mb-4 font-semibold'>{title}</h2>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()} className='mt-4'>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className='px-2'>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className='px-2'>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='mt-4'>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className='mr-2 px-2 py-1 rounded-lg bg-red-hell text-white hover:bg-red-700 transition duration-300 ease-in-out'
          >
            Previous
          </button>{' '}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className='mr-2 px-2 py-1 rounded-lg bg-red-hell text-white hover:bg-red-700 transition duration-300 ease-in-out'
          >
            Next
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '50px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className='border-2 border-gray-600 py-1 px-2 rounded-md '
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
