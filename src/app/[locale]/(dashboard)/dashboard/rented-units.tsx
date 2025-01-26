"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { format, isPast } from "date-fns";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type RentedUnit } from "@/services/dashboard";

import { UnitModal } from "./unit-modal";

const columnHelper = createColumnHelper<RentedUnit>();

export const columns = [
  columnHelper.accessor("property_name", {
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor("price", {
    cell: (info) => {
      const amount = info.getValue();
      const formatted = new Intl.NumberFormat("en-US", {}).format(amount);

      return <span className="tabular-nums">{formatted}</span>;
    },
    header: (info) => (
      <DataTableColumnHeader column={info.column} title="Amount" />
    ),
  }),
  columnHelper.accessor("next_rent", {
    cell: (info) => {
      const date = info.getValue();

      if (date == null) return "";

      const parsedDate = new Date(date);

      if (isPast(parsedDate))
        return `Overdue ${format(parsedDate, "dd MMM, yyyy")}`;

      return `Due in ${format(parsedDate, "dd MMM, yyyy")}`;
    },
    header: (info) => (
      <DataTableColumnHeader column={info.column} title="Next Rent" />
    ),
    sortingFn: "datetime",
  }),
  // columnHelper.accessor("status", {
  //   cell: (info) => info.getValue(),
  //   header: () => "Status",
  // }),
  // columnHelper.accessor("type", {
  //   cell: (info) => info.getValue(),
  //   header: () => "Landlord/Tenant",
  // }),
  columnHelper.display({
    id: "actions",
    cell: (info) => {
      const unit = info.row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <UnitModal unitId={unit.id} />
        </Dialog>
      );
    },
    header: () => "Actions",
  }),
];

type RentedUnits = {
  units: Array<RentedUnit>;
};
export function RentedUnits({ units }: RentedUnits) {
  return <DataTable columns={columns} data={units} />;
}
