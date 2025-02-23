import { getLocale, getTranslations } from "next-intl/server";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Container from "@/components/ui/container";
import { getTransactionsHistory, getUserUnits } from "@/services/dashboard";

import Services from "./components/services";
import { Stats } from "./components/stats";
import { RentedUnits } from "./rented-units";
import { Transactions } from "./tranactions";

async function MyUnits() {
  const locale = await getLocale();
  const units = await getUserUnits(locale);

  return <RentedUnits units={units} />;
}

async function MyTransactions() {
  const locale = await getLocale();
  const transactions = await getTransactionsHistory(locale);

  return <Transactions transactions={transactions} />;
}

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  return (
    <Container>
      <div className="mt-24 flex flex-col gap-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t("titles.home")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("titles.dashboard")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className="text-3xl font-semibold tracking-tight">
          {t("titles.overview")}
        </h2>

        <Stats />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-3xl font-semibold tracking-tight">
              {t("titles.my-units")}
            </h2>
            {/* <Button>Add Unit</Button> */}
          </div>
          <MyUnits />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 text-3xl font-semibold tracking-tight">
              {t("titles.my-transactions")}
            </h2>
            {/* <Button>Add Unit</Button> */}
          </div>
          <MyTransactions />
        </div>

        <div className="flex flex-col gap-4">
          <Services />
        </div>
      </div>
    </Container>
  );
}
