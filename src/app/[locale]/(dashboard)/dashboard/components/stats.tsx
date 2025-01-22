import { getLandlordStatistics } from "@/services/dashboard";

import {
  RentOverdueIcon,
  RentReceivedIcon,
  UpcomingPaymentsIcon,
} from "./dashboard-icons";
import { StatsCard } from "./stats-card";

const formatter = new Intl.NumberFormat("en-US", {});

export async function Stats() {
  const landlordStats = await getLandlordStatistics();

  const stats = [
    {
      name: "Upcoming Payments",
      stat: formatter.format(landlordStats.upcoming_payments),
      color: "#6DACE7",
      icon: UpcomingPaymentsIcon,
    },
    {
      name: "Rent in days",
      stat: landlordStats.days_to_next_rent,
      color: "#AA7AEB",
      icon: RentOverdueIcon,
    },
    {
      name: "All Rent Received",
      stat: formatter.format(landlordStats.total_income),
      color: "#EA79BA",
      icon: RentReceivedIcon,
    },
    // {
    //   name: "Rent Overdue",
    //   stat: "189",
    //   color: "#AA7AEB",
    //   icon: RentOverdueIcon,
    // },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <StatsCard key={stat.name} {...stat} />
      ))}
    </div>
  );
}
