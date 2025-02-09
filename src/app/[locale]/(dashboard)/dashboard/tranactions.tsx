"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { useFormatter, useTranslations } from "next-intl";
import * as React from "react";

import { DataTable, DataTableColumnHeader } from "@/components/ui/data-table";
import { type TranactionItem } from "@/services/dashboard";

const columnHelper = createColumnHelper<TranactionItem>();

type Transactions = {
  transactions: Array<TranactionItem>;
};
export function Transactions({ transactions }: Transactions) {
  const t = useTranslations("dashboard.transactions");
  const formatter = useFormatter();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
      header: () => t("name"),
    }),
    columnHelper.accessor("amount", {
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
    columnHelper.accessor("status", {
      cell: (info) => info.getValue(),
      header: () => t("status"),
    }),

    columnHelper.accessor("date", {
      cell: (info) => {
        const date = info.getValue();

        const parsedDate = new Date(date);

        return formatter.dateTime(parsedDate, {
          dateStyle: "long",
        });
      },
      header: (info) => (
        <DataTableColumnHeader column={info.column} title={t("date")} />
      ),
      sortingFn: "datetime",
    }),
  ];
  return <DataTable columns={columns} data={transactions} />;
}
