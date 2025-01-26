"use client";

import {
  type Column,
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { clsx } from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData> = Readonly<{
  columns: Array<
    {
      [K in keyof TData]: ColumnDef<TData, TData[K]>;
    }[keyof TData]
  >;
  data: Array<TData>;
}>;

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

type DataTableColumnHeaderProps<TData> = Readonly<{
  column: Column<TData>;
  title: string;
}>;

export function DataTableColumnHeader<TData>({
  column,
  title,
}: DataTableColumnHeaderProps<TData>) {
  const isSorted = column.getIsSorted();
  return (
    <button
      className="group inline-flex"
      onClick={() => {
        column.toggleSorting(isSorted === "asc");
      }}
      type="button"
    >
      {title}
      <span
        className={clsx(
          "ms-2 flex-none rounded-sm group-hover:visible",
          !isSorted && "invisible group-hover:visible group-focus:visible",
          isSorted
            ? "bg-slate-100 text-slate-900 group-hover:bg-slate-200"
            : "text-slate-400",
        )}
      >
        {!isSorted && <ChevronDownIcon aria-hidden="true" className="size-5" />}
        {isSorted === "desc" && (
          <ChevronDownIcon aria-hidden="true" className="size-5" />
        )}
        {isSorted === "asc" && (
          <ChevronUpIcon aria-hidden="true" className="size-5" />
        )}
      </span>
    </button>
  );
}
