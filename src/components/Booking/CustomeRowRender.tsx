import React from "react";
import { flexRender } from "@tanstack/react-table";

const CustomeRowRender = ({
  table,
  className,
  classNameBody,
  columns,
  tableHeaders = true,
}: {
  table: any;
  className?: string;
  classNameBody?: string;
  columns: any[];
  tableHeaders?: boolean;
}) => {
  return (
    <div className="card-body">
      <div
      style={{overflow:"inherit",zIndex:'auto'}}
        className="table-responsive"
      >
        <table  className="table table-row-dashed  table-row-gray-300 align-middle gs-0 gy-4">
          <thead >
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id} className="fw-bold text-muted">
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id} className="w-25px">
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
            {table.getRowModel().rows.map((row: any) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id}>
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

export default CustomeRowRender;
