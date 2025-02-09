import { getTranslations } from "next-intl/server";

import { getUserStatistics } from "@/services/dashboard";

import {
  RentOverdueIcon,
  RentReceivedIcon,
  UpcomingPaymentsIcon,
} from "./dashboard-icons";
import { StatsCard } from "./stats-card";

const formatter = new Intl.NumberFormat("en-US", {});

export async function Stats() {
  const t = await getTranslations("dashboard.stats");
  const landlordStats = await getUserStatistics();

  const stats = [
    {
      name: t("upcoming-payments"),
      stat: formatter.format(
        landlordStats.upcomingPaymentsLandlord
          || landlordStats.upcomingPaymentsTenant,
      ),
      unit: t("egp"),
      color: "#6DACE7",
      icon: UpcomingPaymentsIcon,
    },
    {
      name: t("rent-in-days"),
      stat:
        landlordStats.daysToNextRentLandlord
        || landlordStats.daysToNextRentTenant
        || "N/A",
      unit: t("days", {
        count:
          landlordStats.daysToNextRentLandlord
          || landlordStats.daysToNextRentTenant,
      }),
      color: "#AA7AEB",
      icon: RentOverdueIcon,
    },
    {
      name: t("all-rent-received"),
      stat: formatter.format(landlordStats.totalIncome),
      unit: t("egp"),
      color: "#EA79BA",
      icon: RentReceivedIcon,
    },
    {
      name: t("all-rent-paid"),
      stat: formatter.format(landlordStats.totalExpense),
      unit: t("egp"),
      color: "#8CE66E",
      icon: RentReceivedIcon,
    },
  ];

  return (
    <div className="shadow-primary-900/15 md:divide-x-1 grid gap-4 rounded-lg bg-white p-6 shadow-md md:grid-cols-4 md:divide-slate-200">
      {stats.map((stat) => (
        <StatsCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}
