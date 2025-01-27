import { getTranslations } from "next-intl/server";

import { getLandlordStatistics } from "@/services/dashboard";

import {
  RentOverdueIcon,
  RentReceivedIcon,
  UpcomingPaymentsIcon,
} from "./dashboard-icons";
import { StatsCard } from "./stats-card";

const formatter = new Intl.NumberFormat("en-US", {});

export async function Stats() {
  const t = await getTranslations("dashboard.stats");
  const landlordStats = await getLandlordStatistics();

  const stats = [
    {
      name: t("upcoming-payments"),
      stat: formatter.format(landlordStats.upcoming_payments),
      color: "#6DACE7",

      icon: UpcomingPaymentsIcon,
    },
    {
      name: t("rent-in-days"),
      stat: landlordStats.days_to_next_rent ?? "N/A",
      color: "#AA7AEB",
      icon: RentOverdueIcon,
    },
    {
      name: t("upcoming-payments"),
      stat: formatter.format(landlordStats.total_income),
      color: "#EA79BA",
      icon: RentReceivedIcon,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}
