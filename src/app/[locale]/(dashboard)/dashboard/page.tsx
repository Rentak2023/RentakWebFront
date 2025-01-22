import { getLocale } from "next-intl/server";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUserUnits } from "@/services/dashboard";

import Services from "./components/services";
import { Stats } from "./components/stats";
import { RentedUnits } from "./rented-units";

async function MyUnits() {
  const locale = await getLocale();
  const units = await getUserUnits(locale);

  // return (
  //   <Tabs defaultValue="all" className="w-full">
  //     <TabsList>
  //       <TabsTrigger value="all">All</TabsTrigger>
  //       <TabsTrigger value="pending">Pending</TabsTrigger>
  //       <TabsTrigger value="rented">Rented</TabsTrigger>
  //     </TabsList>
  //     <TabsContent value="all">
  //       <div className="flex flex-col gap-6">
  //         <PendingUnits units={pendingUnits} />
  //         <RentedUnits units={rentedUnits} />
  //       </div>
  //     </TabsContent>
  //     <TabsContent value="pending">
  //       <PendingUnits units={pendingUnits} />
  //     </TabsContent>
  //     <TabsContent value="rented">
  //       <RentedUnits units={rentedUnits} />
  //     </TabsContent>
  //   </Tabs>
  // );

  return <RentedUnits units={units} />;
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
            {/* <Button>Add Unit</Button> */}
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
