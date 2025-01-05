import { addDays, subDays } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Services from "./components/services";
import { Stats } from "./components/stats";
import { type PendingUnit, PendingUnits } from "./pending-units";
import { type RentedUnit, RentedUnits } from "./rented-units";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPendingUnits(): Promise<Array<PendingUnit>> {
  await delay(1000);
  return [
    {
      id: "1",
      name: "Unit 1",
      amount: 15_000,
      type: "landlord",
      nextRent: addDays(new Date(), 5),
    },
    {
      id: "2",
      name: "Unit 2",
      amount: 12_000,
      type: "tenant",
      nextRent: subDays(new Date(), 2),
    },
    {
      id: "3",
      name: "Unit 3",
      amount: 17_000,
      type: "landlord",
      nextRent: addDays(new Date(), 4),
    },
  ];
}

async function getRentedUnits(): Promise<Array<RentedUnit>> {
  await delay(1000);
  return [
    {
      id: "1",
      name: "Unit 1",
      amount: 15_000,
      type: "landlord",
      status: "valuated",
    },
    {
      id: "2",
      name: "Unit 2",
      amount: 12_000,
      type: "tenant",
      status: "rented",
    },
    {
      id: "3",
      name: "Unit 3",
      amount: 17_000,
      type: "landlord",
      status: "promoted",
    },
  ];
}

async function MyUnits() {
  const [pendingUnits, rentedUnits] = await Promise.all([
    getPendingUnits(),
    getRentedUnits(),
  ]);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="rented">Rented</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="flex flex-col gap-6">
          <PendingUnits units={pendingUnits} />
          <RentedUnits units={rentedUnits} />
        </div>
      </TabsContent>
      <TabsContent value="pending">
        <PendingUnits units={pendingUnits} />
      </TabsContent>
      <TabsContent value="rented">
        <RentedUnits units={rentedUnits} />
      </TabsContent>
    </Tabs>
  );
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-24 flex flex-col gap-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Stats />

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">My Units</h2>
            <Button>Add Unit</Button>
          </div>
          <MyUnits />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold tracking-tight">Services</h2>
          <Services />
        </div>
      </div>
    </div>
  );
}
