"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { isPast } from "date-fns";
import { useFormatter, useTranslations } from "next-intl";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type RentedUnit } from "@/services/dashboard";

import { UnitModal } from "./unit-modal";

const columnHelper = createColumnHelper<RentedUnit>();

type RentedUnits = {
  units: Array<RentedUnit>;
};
export function RentedUnits({ units }: RentedUnits) {
  const t = useTranslations("dashboard");
  const formatter = useFormatter();

  const columns = [
    columnHelper.accessor("property_name", {
      cell: (info) => info.getValue(),
      header: () => t("rented-units.name"),
    }),
    columnHelper.accessor("price", {
      cell: (info) => {
        const amount = info.getValue();
        const formatted = new Intl.NumberFormat("en-US", {}).format(amount);

        return <span className="tabular-nums">{formatted}</span>;
      },
      header: (info) => (
        <DataTableColumnHeader
          column={info.column}
          title={t("rented-units.amount")}
        />
      ),
    }),
    columnHelper.accessor("next_rent", {
      cell: (info) => {
        const date = info.getValue();

        if (date == null) return "";

        const parsedDate = new Date(date);

        if (isPast(parsedDate))
          return t("rented-units.overdue", {
            date: formatter.dateTime(parsedDate, {
              dateStyle: "medium",
            }),
          });

        return t("rented-units.due-in", {
          date: formatter.dateTime(parsedDate, {
            dateStyle: "medium",
          }),
        });
      },
      header: (info) => (
        <DataTableColumnHeader
          column={info.column}
          title={t("rented-units.next-rent")}
        />
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
              <Button variant="outline">
                {t("rented-units.view-details")}
              </Button>
            </DialogTrigger>
            <UnitModal unitId={unit.id} />
          </Dialog>
        );
      },
      header: () => t("rented-units.actions"),
    }),
  ];
  return <DataTable columns={columns} data={units} />;
}
