import { format } from "date-fns";
import { type SVGProps } from "react";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type Transaction = {
  id: number;
  date: Date;
  status: "pending" | "collected" | "not-paid";
  paymentMethod?: string;
};

const currentTransaction: Transaction = {
  id: 1,
  date: new Date(2024, 4, 1),
  status: "pending",
};

const transactions: Array<Transaction> = [
  {
    id: 2,
    date: new Date(2024, 3, 1),
    status: "not-paid",
  },
  {
    id: 3,
    date: new Date(2024, 2, 1),
    status: "collected",
    paymentMethod: "Instapay",
  },
  {
    id: 4,
    date: new Date(2024, 1, 1),
    status: "collected",
    paymentMethod: "Credit Card",
  },
  {
    id: 5,
    date: new Date(2024, 0, 1),
    status: "collected",
    paymentMethod: "Instapay",
  },
];

function TransactionItem({
  transaction,
}: Readonly<{ transaction: Transaction }>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-700">
          {format(transaction.date, "MMM dd, yyyy")}
        </span>
        <span className="text-xs text-slate-500">
          {transaction.paymentMethod ?? "...."}
        </span>
      </div>
      <span className="text-sm font-medium">
        {transaction.status === "pending" ? (
          <span className="text-amber-500">Pending</span>
        ) : transaction.status === "collected" ? (
          <span className="text-green-600">Collected</span>
        ) : (
          <span className="text-red-600">Not Paid</span>
        )}
      </span>
    </div>
  );
}

export function UnitModal() {
  return (
    <DialogContent className="max-h-dvh max-w-7xl overflow-y-auto">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="size-20 rounded-full bg-slate-400"></div>
          <div>
            <DialogTitle className="text-primary-900 text-xl font-semibold">
              Cairo Festival - Podium
            </DialogTitle>
            <h3 className="text-primary-900 text-lg">Madinty</h3>
            <p className="text-green-600">Active rent</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button>View Contract</Button>
          <Button variant="outline">View Contract</Button>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-8 rounded-2xl p-4 shadow-sm lg:flex-row">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-primary-800 text-xl font-semibold">
                  Tenant info
                </h3>
                <div className="mt-4 flex flex-col items-start gap-1">
                  <p className="text-lg text-slate-600">
                    Mohamed A***** E**** s**** Elsayed
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-primary-800 text-xl font-semibold">
                  Unit address
                </h3>
                <div className="mt-4 flex flex-col items-start gap-1">
                  <p className="text-lg text-slate-600">
                    77A - Pila Rose compound - Fifth settlement
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-primary-800 text-xl font-semibold">
                Contract duration
              </h3>
              <div className="mt-4 flex items-center gap-4">
                <span>
                  <CalendarIcon className="size-6 text-slate-400" />
                </span>
                <div>
                  <dt className="text-xs text-slate-500">Start date</dt>
                  <dd className="text-sm font-medium text-slate-700">
                    1 Oct 2023
                  </dd>
                </div>
              </div>
              <div className="mx-3 h-6 border-l border-dashed border-slate-300" />
              <div className="flex items-center gap-4">
                <span>
                  <CalendarIcon className="size-6 text-slate-400" />
                </span>
                <div>
                  <dt className="text-xs text-slate-500">End date</dt>
                  <dd className="text-sm font-medium text-slate-700">
                    1 Oct 2024
                  </dd>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl p-4 shadow-sm">
            <h3 className="text-primary-800 text-xl font-semibold">
              Rent collected
            </h3>
            <div className="mt-4 flex max-w-80 items-center gap-4">
              <Progress value={(10 / 12) * 100} />
              <span className="text-slate-500">10/12</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-primary-800 text-xl font-semibold">
              Latest transactions
            </h3>
          </div>
          <h4 className="text-xs text-slate-500">Next rent</h4>
          <div className="mt-2">
            <TransactionItem transaction={currentTransaction} />
          </div>
          <h4 className="mt-4 text-xs text-slate-500">Past</h4>
          <div className="mt-2 flex flex-col gap-2">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="#fff"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width=".75"
        d="M13 2.498H3a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5Z"
      />
      <path
        fill="currentColor"
        d="M12.432 2.498H3.568c-1.14 0-2.068.942-2.068 2.1v1.9H2c0-.5.5-1 1-1h10c.5 0 1 .5 1 1h.5v-1.9c0-1.158-.928-2.1-2.068-2.1Z"
      />
      <path
        fill="currentColor"
        d="M9.25 7.998a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM11.75 7.998a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.25 10.498a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM11.75 10.498a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.25 10.498a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM6.75 10.498a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM4.25 12.998a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM6.75 12.998a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM9.25 12.998a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      />
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width=".75"
        d="M4 1.498v1M12 1.498v1"
      />
    </svg>
  );
}
