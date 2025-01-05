import { type ReactNode } from "react";

type StatsCardProps = {
  name: string;
  stat: string;
  color: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => ReactNode;
};

export function StatsCard({ name, stat, color, icon: Icon }: StatsCardProps) {
  return (
    <div className="shadow-primary-900/15 rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center gap-4">
        <div
          className="rounded-full p-4"
          style={{ color, backgroundColor: `${color}26` }}
        >
          <Icon className="size-8" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600">{name}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {stat}
          </p>
        </div>
      </div>
    </div>
  );
}
