import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function UnitSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl mb-14 border border-slate-100", className)}>
      <Skeleton className="h-80" />

      <div className="p-6">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="mt-2 h-5 w-1/3" />
        <Skeleton className="mt-12 h-4 w-2/3" />
        <Skeleton className="mt-6 h-px w-full" />
        <Skeleton className="mt-6 h-4 w-1/3" />
      </div>
    </div>
  );
}

export default function UnitsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <UnitSkeleton />
      <UnitSkeleton className="hidden md:block" />
      <UnitSkeleton className="hidden lg:block" />
    </div>
  );
}
