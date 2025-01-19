import { getLandlordStatistics } from "@/services/dashboard";

import {
  RentOverdueIcon,
  RentReceivedIcon,
  UpcomingPaymentsIcon,
} from "./dashboard-icons";
import { StatsCard } from "./stats-card";

export async function Stats() {
  const landlordStats = await getLandlordStatistics();

  const stats = [
    {
      name: "Rent Received",
      stat: landlordStats.total_income.toString(),
      color: "#EA79BA",
      icon: RentReceivedIcon,
    },
    {
      name: "Upcoming Payments",
      stat: landlordStats.upcoming_payments.toString(),
      color: "#6DACE7",
      icon: UpcomingPaymentsIcon,
    },
    // {
    //   name: "Rent Overdue",
    //   stat: "189",
    //   color: "#AA7AEB",
    //   icon: RentOverdueIcon,
    // },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {stats.map((stat) => (
        <StatsCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}
