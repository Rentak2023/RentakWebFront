import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { type SVGProps } from "react";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { orpc } from "@/lib/orpc";
import { type UnitContractSchema } from "@/schemas/dashboard";

function getTransactionStatus(
  transaction: UnitContractSchema["transactions"][number],
) {
  if (
    transaction.cashin_payment_status === "It has not been issued yet"
    || transaction.cashin_payment_status === "لم يتم اصدارها بعد"
    || transaction.cashin_payment_status === "Pending to pay"
    || transaction.cashin_payment_status === "قيد انتظار الدفع"
  ) {
    return "pending";
  } else if (
    transaction.cashin_payment_status === "Paid"
    || transaction.cashin_payment_status === "تم الدفع"
  ) {
    return "paid";
  } else {
    return "unknown";
  }
}

function TransactionItem({
  transaction,
}: Readonly<{ transaction: UnitContractSchema["transactions"][number] }>) {
  const paymentStatus = getTransactionStatus(transaction);
  const formmater = useFormatter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-700">
          {formmater.dateTime(new Date(transaction.due_date), "long")}
        </span>
        <span className="text-xs text-slate-500">
          {transaction.payment_method || "..."}
        </span>
      </div>
      <span className="text-sm font-medium">
        {paymentStatus === "pending" ? (
          <span className="text-amber-500">
            {transaction.cashin_payment_status}
          </span>
        ) : paymentStatus === "paid" ? (
          <span className="text-green-600">
            {transaction.cashin_payment_status}
          </span>
        ) : (
          <span className="text-red-600">
            {transaction.cashin_payment_status}
          </span>
        )}
      </span>
    </div>
  );
}

type UnitModalProps = {
  unitId: number;
};

export function UnitModal({ unitId }: UnitModalProps) {
  const locale = useLocale();
  const formater = useFormatter();
  const t = useTranslations("dashboard.unit-modal");
  const { data: contract } = useSuspenseQuery(
    orpc.dashboard.unitDetails.queryOptions({
      input: {
        unitId,
        lang: locale,
      },
    }),
  );

  const currentTransaction = contract.transactions.find(
    (transaction) => getTransactionStatus(transaction) === "pending",
  );

  return (
    <DialogContent className="max-h-dvh max-w-7xl overflow-y-auto">
      <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-4 shadow-md">
            <HomeIcon className="size-8 text-slate-800" />
          </div>
          <div>
            <DialogTitle className="text-primary-900 text-xl font-semibold">
              {contract.unit.name}
            </DialogTitle>
            <h3 className="text-primary-900 text-lg">
              {contract.unit.address?.city}
            </h3>
            {/* <p className="text-green-600">Active rent</p> */}
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <Button>View Contract</Button>
          <Button variant="outline">View Contract</Button>
        </div> */}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-8 rounded-2xl p-4 shadow-sm lg:flex-row">
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-primary-600 text-xl font-semibold">
                  {t("tenant-info")}
                </h3>
                <div className="mt-4 flex flex-col items-start gap-1">
                  <p className="text-lg text-slate-600">
                    {contract.tenant.fullname}
                  </p>
                </div>
              </div>
              {/* <div>
                <h3 className="text-primary-600 text-xl font-semibold">
                  Unit address
                </h3>
                <div className="mt-4 flex flex-col items-start gap-1">
                  <p className="text-lg text-slate-600">
                    77A - Pila Rose compound - Fifth settlement
                  </p>
                </div>
              </div> */}
            </div>
            {contract.from && contract.to && (
              <div>
                <h3 className="text-primary-600 text-xl font-semibold">
                  {t("contract-duration")}
                </h3>
                <div className="mt-4 flex items-center gap-4">
                  <span>
                    <CalendarIcon className="size-6 text-slate-400" />
                  </span>
                  <div>
                    <dt className="text-xs text-slate-500">
                      {t("start-date")}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-slate-700">
                      {formater.dateTime(new Date(contract.from), "medium")}
                    </dd>
                  </div>
                </div>
                <div className="mx-3 h-6 border-s border-dashed border-slate-300" />
                <div className="flex items-center gap-4">
                  <span>
                    <CalendarIcon className="size-6 text-slate-400" />
                  </span>
                  <div>
                    <dt className="text-xs text-slate-500">{t("end-date")}</dt>
                    <dd className="mt-1 text-sm font-medium text-slate-700">
                      {formater.dateTime(new Date(contract.to), "medium")}
                    </dd>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-2xl p-4 shadow-sm">
            <h3 className="text-primary-600 text-xl font-semibold">
              {t("rent-collected")}
            </h3>
            <div className="mt-4 flex max-w-80 items-center gap-4">
              <Progress
                value={
                  (contract.rent_collected.rent_collected
                    / contract.rent_collected.total_transactions)
                  * 100
                }
              />
              <span className="text-slate-500">
                {formater.number(
                  contract.rent_collected.rent_collected,
                  "numbers",
                )}
                {locale === "en" ? "/" : "\\"}
                {formater.number(
                  contract.rent_collected.total_transactions,
                  "numbers",
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-primary-600 text-xl font-semibold">
              {t("latest-transactions")}
            </h3>
          </div>
          {currentTransaction && (
            <>
              <h4 className="mt-4 text-xs text-slate-500">{t("next-rent")}</h4>
              <div className="mt-2">
                <TransactionItem transaction={currentTransaction} />
              </div>
            </>
          )}
          <h4 className="mt-4 text-xs text-slate-500">{t("past")}</h4>
          <div className="mt-2 flex flex-col gap-2">
            {contract.transactions
              .toReversed()
              .filter(
                (transaction) =>
                  getTransactionStatus(transaction) !== "pending",
              )
              .map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
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
        strokeLinejoin="round"
        strokeWidth=".75"
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".75"
        d="M4 1.498v1M12 1.498v1"
      />
    </svg>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path
        d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"
        fill="currentColor"
      />
      <path
        d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"
        fill="currentColor"
      />
    </svg>
  );
}
