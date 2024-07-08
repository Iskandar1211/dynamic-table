import InfiniteScroll from "react-infinite-scroll-component";
import { useSortBy, useTable } from "react-table";
import { IColumns, Item } from "../../types";
import React from "react";

export function Table({
  columns,
  data,
  update,
}: {
  columns: IColumns[];
  data: Item[];
  update: () => void;
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={update}
      hasMore={true}
      loader={<h4>Loading more 2 itens...</h4>}
    >
      <table
        {...getTableProps()}
        className="w-full min-w-max table-auto text-left"
      >
        <thead>
          {headerGroups.map((headerGroup,i) => (
            <React.Fragment key={i}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            const isLast = i === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            prepareRow(row);
            return (
              <React.Fragment key={i}>
                <tr className={classes} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
