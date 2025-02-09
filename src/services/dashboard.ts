import ky from "@fetcher";
import { type Locale } from "next-intl";

type UserStats = {
  totalIncome: number;
  totalExpense: number;
  upcomingPaymentsLandlord: number;
  upcomingPaymentsTenant: number;
  daysToNextRentLandlord: number;
  daysToNextRentTenant: number;
};

type UserStatsRes = {
  result: UserStats;
};

export async function getUserStatistics() {
  const res = await ky
    .get("dashboard/get-user-statistics")
    .json<UserStatsRes>();

  return res.result;
}

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
  const res = await ky
    .get("dashboard/get-user-units", {
      searchParams: {
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<UnitsRes>();

  return res;
}

export type UnitContract = {
  id: number;
  contract_code: string;
  unit: {
    id: number;
    name: string;
    address: null | {
      governorate: string;
      city: string;
    };
    picture: string | null;
  };
  contract_type: {
    id: number;
    type_name: string;
  };
  created_at: string;
  from: string;
  to: string;
  price: number;
  final_price: number;
  collection_day: number;
  rent_collected: {
    total_transactions: number;
    rent_collected: number;
  };
  annual_increase_percentage: number;
  promo_code: string | null;
  tenant: {
    id: number;
    fullname: string;
    email: string | null;
    phone: string | null;
    national_id: string | null;
  };
  landlord: {
    id: number;
    fullname: string;
    email: string | null;
    phone: string | null;
    national_id: string | null;
  };
  transactions: Array<{
    id: number;
    due_date: string;
    payment_method: string;
    cashin_payment_status: string;
    cashout_payment_status: string | null;
  }>;
  ago: string;
};

export async function getUnitDetails(unitId: number, locale: Locale) {
  const res = await ky.get("dashboard/get-unit-details", {
    searchParams: {
      unit_id: unitId,
      lang: locale === "en" ? "en" : "ar",
    },
  });

  return res.json<UnitContract>();
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
  const res = await ky.get("dashboard/get-transactions-history", {
    searchParams: {
      lang: locale === "en" ? "en" : "ar",
    },
  });

  return res.json<Array<TranactionItem>>();
}
