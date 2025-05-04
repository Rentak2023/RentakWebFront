import { type Locale } from "next-intl";

import privateFetcher from "@/lib/private-fetcher";

export type RentedUnit = {
  contract_id: number;
  user_type: "tenant" | "landlord";
  unit_id: number;
  unit_name: string;
  rent_amount: number;
  contract_type: string;
  next_rent?: string;
};

type UnitsRes = Array<RentedUnit>;

export async function getUserUnits(locale: Locale) {
  const res = await privateFetcher
    .get("dashboard/get-user-units", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<UnitsRes>();

  return res;
}

enum TransactionStatus {
  Paid = "Paid",
  Transferred = "Transfered",
}

export type TranactionItem = {
  name: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  unit_description: string;
  contract_type: string;
};

export async function getTransactionsHistory(locale: Locale) {
  const res = await privateFetcher.get("dashboard/get-transactions-history", {
    searchParams: {
      lang: locale === "en" ? "en" : "ar",
    },
  });

  return res.json<Array<TranactionItem>>();
}
