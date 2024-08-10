import Image from "next/image";

import underConstruction from "@/app/[locale]/assets/svgs/under-construction.svg";

export default function RentCollection() {
  return (
    <main className="flex-1 pt-32">
      <div className="mx-auto max-w-7xl px-2 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
          This page is under construction
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          We are working on this page. Please check back later.
        </p>
      </div>
      <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <Image
          src={underConstruction}
          alt="rent management"
          className="mx-auto w-72"
        />
      </div>
    </main>
  );
}
