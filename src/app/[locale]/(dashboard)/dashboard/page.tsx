import { addDays, subDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Services from "./components/services";
import { type PendingUnit, PendingUnits } from "./pending-units";
import { type RentedUnit, RentedUnits } from "./rented-units";

const stats = [
  {
    name: "Rent Received",
    stat: "5,423",
    color: "#EA79BA",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="61"
        height="61"
        fill="none"
        viewBox="0 0 61 61"
        {...props}
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3.74"
          d="M23.413 27.931a4.537 4.537 0 0 0-.823 0c-5.933-.199-10.645-5.06-10.645-11.044 0-6.107 4.936-11.069 11.07-11.069 6.107 0 11.068 4.962 11.068 11.07-.024 5.983-4.736 10.844-10.67 11.043ZM41.488 10.805a8.72 8.72 0 0 1 8.726 8.725c0 4.712-3.74 8.551-8.402 8.726a2.808 2.808 0 0 0-.648 0M10.947 37.13c-6.033 4.04-6.033 10.621 0 14.635 6.855 4.587 18.1 4.587 24.955 0 6.033-4.039 6.033-10.62 0-14.634-6.831-4.563-18.075-4.563-24.955 0ZM46.297 50.693c1.795-.374 3.49-1.097 4.886-2.17 3.89-2.916 3.89-7.728 0-10.645-1.371-1.047-3.041-1.745-4.811-2.144"
        />
      </svg>
    ),
  },
  {
    name: "Upcoming Payments",
    stat: "1,893",
    color: "#6DACE7",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M34.9688 46.0621L38.5777 49.671L45.7956 42.4531"
          stroke="currentColor"
          stroke-width="3.56147"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.5547 26.6422C29.3173 26.6184 29.0324 26.6184 28.7712 26.6422C23.1204 26.4522 18.6329 21.8223 18.6329 16.124C18.6092 10.3069 23.334 5.58203 29.1511 5.58203C34.9682 5.58203 39.693 10.3069 39.693 16.124C39.693 21.8223 35.1819 26.4522 29.5547 26.6422Z"
          stroke="currentColor"
          stroke-width="3.56147"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M29.15 52.6153C24.8287 52.6153 20.5312 51.5231 17.2547 49.3388C11.5089 45.4924 11.5089 39.2242 17.2547 35.4015C23.784 31.0328 34.4922 31.0328 41.0215 35.4015"
          stroke="currentColor"
          stroke-width="3.56147"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Rent overdue",
    stat: "189",
    color: "#AA7AEB",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="61"
        fill="none"
        viewBox="0 0 60 61"
        {...props}
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3.74"
          d="M16.186 5.396h27.698c8.875 0 11.094 2.22 11.094 11.07v15.78c0 8.876-2.22 11.07-11.07 11.07H16.187c-8.85.024-11.069-2.194-11.069-11.045V16.465c0-8.85 2.219-11.069 11.07-11.069ZM30.047 43.34v11.916M5.117 32.82h49.86M18.828 55.256h22.437"
        />
      </svg>
    ),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPendingUnits(): Promise<Array<PendingUnit>> {
  // Fetch data from your API here.
  await delay(200);
  return [
    {
      id: "728ed52f",
      name: "Unit 1",
      amount: 15_000,
      type: "landlord",
      nextRent: addDays(new Date(), 7),
    },
    {
      id: "728ed52f",
      name: "Unit 2",
      amount: 12_000,
      type: "landlord",
      nextRent: subDays(new Date(), 3),
    },
    {
      id: "728ed52f",
      name: "Unit 3",
      amount: 17_000,
      type: "landlord",
      nextRent: addDays(new Date(), 4),
    },
  ];
}

async function getRentedUnits(): Promise<Array<RentedUnit>> {
  // Fetch data from your API here.
  await delay(200);
  return [
    {
      id: "728ed52f",
      name: "Unit 1",
      amount: 15_000,
      type: "landlord",
      status: "valuated",
    },
    {
      id: "728ed52f",
      name: "Unit 2",
      amount: 12_000,
      type: "landlord",
      status: "rented",
    },
    {
      id: "728ed52f",
      name: "Unit 3",
      amount: 17_000,
      type: "landlord",
      status: "promoted",
    },
  ];
}

async function MyUnits() {
  const pendingUnits = await getPendingUnits();
  const rentedUnits = await getRentedUnits();

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-slate-900">My Units</h1>
          <p className="mt-2 text-sm text-slate-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button variant="dark" size="sm">
            Add New Property
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rented">Rented</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="shadow-primary-600/10 mt-8 overflow-hidden rounded-lg px-20 py-6 shadow-sm">
      <h3 className="text-primary-900 text-base font-semibold">Insights</h3>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-slate-200 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-6 px-4 py-5 sm:p-6"
          >
            <div
              className="rounded-full p-4"
              style={{ backgroundColor: `${item.color}26` }}
            >
              <item.icon className="size-8" style={{ color: item.color }} />
            </div>
            <div>
              <dt className="text-primary-800 text-base font-normal">
                {item.name}
              </dt>
              <dd className="text-primary- mt-1 flex items-baseline justify-between text-2xl font-semibold md:block lg:flex">
                {item.stat}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <div>
        <nav aria-label="Back" className="sm:hidden">
          <a
            href="#"
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <ChevronLeftIcon
              aria-hidden="true"
              className="-ml-1 mr-1 size-5 shrink-0 text-slate-400"
            />
            Back
          </a>
        </nav>
        <nav aria-label="Breadcrumb" className="hidden sm:flex">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <a
                  href="#"
                  className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  Properties
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-slate-400"
                />
                <a
                  href="#"
                  aria-current="page"
                  className="ml-4 text-sm font-medium text-slate-600 hover:text-slate-800"
                >
                  Dashboard
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-primary-900 text-2xl/7 font-semibold sm:truncate sm:text-3xl sm:tracking-tight">
            Overview
          </h2>
        </div>
      </div>
      <Stats />
      <MyUnits />
      <Services />
    </div>
  );
}
