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
          <span className="text-green-500">Collected</span>
        ) : (
          <span className="text-red-500">Not Paid</span>
        )}
      </span>
    </div>
  );
}

export function UnitModal() {
  return (
    <DialogContent className="max-w-7xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="size-20 rounded-full bg-slate-400"></div>
          <div>
            <DialogTitle className="text-lg font-semibold text-primary-900">
              Cairo Festival - Podium
            </DialogTitle>
            <h3 className="text-primary-900">Madinty</h3>
            <p className="text-green-500">Active rent</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button>View Contract</Button>
          <Button variant="outline">View Contract</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-8 rounded-2xl p-4 shadow">
            <div>
              <h3 className="text-xl font-semibold text-primary-600">
                Tenant info
              </h3>
              <div className="mt-4 flex flex-col items-start gap-1">
                <p className="text-lg text-slate-600">Mohamed Elsayed</p>
                <p className="text-sm text-slate-600">
                  Email Address: mohamedelsayed@gmail.com
                </p>
                <p className="text-sm text-slate-600">
                  Phone Number: 0105236987
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-600">
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
          <div className="rounded-2xl p-4 shadow">
            <h3 className="text-xl font-semibold text-primary-600">Property</h3>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex size-9 flex-col items-center justify-center rounded-full bg-slate-200">
                <RentCollectionIcon className="size-6 text-slate-700" />
              </span>

              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Rent collected</span>
                  <span>10/12</span>
                </div>

                <Progress value={(10 / 12) * 100} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-primary-600">
              Latest transactions
            </h3>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-slate-500" />
              <span className="text-sm text-slate-500">
                1 Jan 2024 - 1 May 2024
              </span>
            </div>
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

function RentCollectionIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <mask
        id="a"
        width="25"
        height="25"
        x="0"
        y="-1"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "luminance" }}
      >
        <path fill="#fff" d="M24.008-.01h-24v24h24v-24Z" />
      </mask>
      <g fill="currentColor" mask="url(#a)">
        <path d="M23.824 14.412a1.218 1.218 0 0 0-1.042-.585 1.24 1.24 0 0 0-.65.184l-5.508 3.31.004.05c.004.026 0 .056-.004.093l.004.068-.015.019-.004.022a1.7 1.7 0 0 1-.469.9 1.666 1.666 0 0 1-1.196.495H9.95a.309.309 0 0 1-.307-.307c0-.17.138-.308.307-.308h4.995c.289 0 .559-.112.765-.315a1.16 1.16 0 0 0 .3-.574l.011-.07v-.05c0-.037.004-.082-.003-.153-.004-.012-.004-.034-.004-.06-.075-.533-.559-.934-1.129-.934H12.75a4.861 4.861 0 0 1-2.707-.821c-.776-.514-1.53-.837-2.235-.957a4.094 4.094 0 0 0-.743-.063c-.1 0-.206.003-.318.007-.177.008-.435.008-.724.008-.394 0-.844-.004-1.204-.008h-.086l.634 6.334v.052l.048.02c.698.265 1.433.64 1.714.79l.038.02c.532.28.825.434.986.547a6.38 6.38 0 0 0 2.944.72c1.45 0 2.59-.5 3.03-.792l9.3-5.958a1.23 1.23 0 0 0 .585-1.084 1.235 1.235 0 0 0-.188-.6ZM4.767 20.967l-.683-6.765v-.023l-.007-.015a.274.274 0 0 1-.023-.12c0-.022.004-.037.008-.09l-.087-.862-2.805.409-1.162 9.7 4.875-1.045-.109-1.125-.007-.064ZM16.67 7.08a1.636 1.636 0 0 0-.356-.26 3.737 3.737 0 0 0-.393-.18 22.078 22.078 0 0 0-.383-.142 1.826 1.826 0 0 1-.315-.139.64.64 0 0 1-.199-.165.337.337 0 0 1-.063-.214c0-.056.01-.105.03-.146a.264.264 0 0 1 .082-.109.538.538 0 0 1 .18-.082c.075-.019.173-.03.285-.03.124 0 .236.015.338.041.108.03.202.064.285.098.086.033.15.067.206.093a.41.41 0 0 0 .191.06c.049 0 .094-.018.105-.033a.214.214 0 0 0 .075-.098c.019-.045.023-.09.03-.146.004-.049.008-.109.008-.188l-.004-.157a.749.749 0 0 0-.015-.109.373.373 0 0 0-.038-.124.362.362 0 0 0-.056-.07c-.03-.038-.075-.06-.15-.102-.056-.023-.116-.049-.18-.071a1.434 1.434 0 0 0-.217-.06c-.038-.012-.075-.02-.113-.027l.06-.577c0-.026 0-.064-.015-.105a.178.178 0 0 0-.101-.113c-.045-.026-.098-.033-.15-.045a1.562 1.562 0 0 0-.36-.003.321.321 0 0 0-.131.033.261.261 0 0 0-.09.072.194.194 0 0 0-.034.105l-.06.622a1.98 1.98 0 0 0-.488.131c-.176.072-.33.17-.45.29-.123.12-.217.262-.28.42a1.407 1.407 0 0 0-.098.524c0 .225.033.401.097.544.064.154.15.285.255.39.105.105.218.191.356.266.128.068.255.128.387.18.127.049.255.098.378.139.113.037.214.086.312.142.082.045.15.098.198.162.042.052.06.12.06.21a.378.378 0 0 1-.153.318c-.113.087-.297.132-.548.132-.161 0-.307-.02-.435-.05a2.166 2.166 0 0 1-.315-.108c-.082-.041-.154-.075-.217-.116a.392.392 0 0 0-.192-.064.245.245 0 0 0-.135.038.251.251 0 0 0-.078.105.75.75 0 0 0-.038.157c-.004.056-.004.124-.004.21 0 .124.004.199.02.259a.317.317 0 0 0 .09.176.614.614 0 0 0 .153.105 1.794 1.794 0 0 0 .457.165c.06.015.124.03.188.041l-.06.608a.283.283 0 0 0 .011.131c.019.049.06.079.113.113.037.015.086.03.138.037.053.008.117.008.2.008.067 0 .123 0 .157-.008a.297.297 0 0 0 .116-.03.184.184 0 0 0 .112-.094.213.213 0 0 0 .027-.09l.067-.663a2.4 2.4 0 0 0 .555-.132c.199-.075.375-.18.514-.307.142-.128.255-.281.337-.461.08-.18.117-.383.117-.597 0-.202-.034-.382-.098-.536a1.799 1.799 0 0 0-.277-.375Z" />
        <path d="M15.38.791c-3.495 0-6.34 2.843-6.34 6.338a6.348 6.348 0 0 0 6.34 6.34 6.347 6.347 0 0 0 6.338-6.34C21.714 3.637 18.872.79 15.38.79Zm0 11.348c-2.76 0-5.01-2.25-5.01-5.01s2.25-5.01 5.01-5.01 5.01 2.25 5.01 5.01-2.25 5.01-5.01 5.01Z" />
      </g>
    </svg>
  );
}
