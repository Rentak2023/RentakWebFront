"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { UnitModal } from "./unit-modal";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RentedUnit = {
  id: string;
  name: string;
  amount: number;
  status: "valuated" | "rented" | "promoted";
  type: "landlord" | "tenant";
};

const columnHelper = createColumnHelper<RentedUnit>();

export const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor("amount", {
    cell: (info) => {
      const amount = info.getValue();
      const formatted = new Intl.NumberFormat("en-US", {}).format(amount);

      return <span className="tabular-nums">{formatted}</span>;
    },
    header: (info) => (
      <DataTableColumnHeader column={info.column} title="Amount" />
    ),
  }),

  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: () => "Status",
  }),
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
    header: () => "Landlord/Tenant",
  }),
  columnHelper.display({
    id: "actions",
    cell: (info) => {
      const unit = info.row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">View Details</Button>
          </DialogTrigger>
          <UnitModal />
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
