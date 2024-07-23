import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader className="animate-spin text-slate-500" size={32} />
    </div>
  );
}
