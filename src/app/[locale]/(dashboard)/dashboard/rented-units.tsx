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
  const t = useTranslations("dashboard.rented-units");
  const formatter = useFormatter();

  const columns = [
    columnHelper.accessor("unit_name", {
      cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
      header: () => t("name"),
    }),
    columnHelper.accessor("rent_amount", {
      cell: (info) => {
        const amount = info.getValue();
        if (!amount) return "";

        const formatted = new Intl.NumberFormat("en-US", {}).format(amount);

        return (
          <span className="tabular-nums">
            {formatted} {t("egp")}
          </span>
        );
      },
      header: (info) => (
        <DataTableColumnHeader column={info.column} title={t("amount")} />
      ),
    }),
    columnHelper.accessor("contract_type", {
      cell: (info) => info.getValue() || "N/A",
      header: () => t("contract-type"),
    }),
    columnHelper.accessor("user_type", {
      cell: (info) => info.getValue(),
      header: () => t("user-type"),
    }),
    columnHelper.accessor("next_rent", {
      cell: (info) => {
        const date = info.getValue();

        if (date == null) return "N/A";

        const parsedDate = new Date(date);

        if (isPast(parsedDate))
          return t("overdue", {
            date: formatter.dateTime(parsedDate, "medium"),
          });

        return t("due-in", {
          date: formatter.dateTime(parsedDate, "medium"),
        });
      },
      header: (info) => (
        <DataTableColumnHeader column={info.column} title={t("next-rent")} />
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

        if (unit.next_rent) {
          return (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">{t("view-details")}</Button>
              </DialogTrigger>
              <UnitModal unitId={unit.unit_id} />
            </Dialog>
          );
        }

        // if (unit.is_for_listing) {
        //   return (
        //     <Button variant="outline" asChild>
        //       <Link href={`/units/${unit.unit_id}`}>View Unit</Link>
        //     </Button>
        //   );
        // }

        return "";
      },
      header: () => t("actions"),
    }),
  ];
  return <DataTable columns={columns} data={units} />;
}
