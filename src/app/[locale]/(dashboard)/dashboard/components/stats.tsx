import {
  RentOverdueIcon,
  RentReceivedIcon,
  UpcomingPaymentsIcon,
} from "./dashboard-icons";
import { StatsCard } from "./stats-card";

export function Stats() {
  const stats = [
    {
      name: "Rent Received",
      stat: "5,423",
      color: "#EA79BA",
      icon: RentReceivedIcon,
    },
    {
      name: "Upcoming Payments",
      stat: "1,893",
      color: "#6DACE7",
      icon: UpcomingPaymentsIcon,
    },
    {
      name: "Rent Overdue",
      stat: "189",
      color: "#AA7AEB",
      icon: RentOverdueIcon,
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
