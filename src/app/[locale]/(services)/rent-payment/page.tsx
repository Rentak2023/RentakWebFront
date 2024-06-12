"use client";
import * as v from "valibot";

import { ServiceForms } from "../service-forms";
import { type TStep } from "../types";

const steps = [
  {
    label: "Profile Info",
    schema: v.object({
      username: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty("Username is required"),
      ),
      email: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty("Email is required"),
        v.email("A valid email address is required"),
      ),
      nationalId: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(5, "National ID is required"),
      ),
    }),
    fields: [
      {
        name: "username",
        label: "Username",
        kind: "text",
        type: "text",
        description: "This is your username",
      },
      {
        name: "email",
        label: "Email",
        kind: "text",
        type: "email",
      },
      {
        name: "nationalId",
        label: "National ID",
        kind: "text",
        type: "text",
      },
    ],
  },
  {
    label: "Tenant Info",
    schema: v.object({
      tenantName: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty("Tenant name is required"),
      ),
      tenantEmail: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty("Tenant email is required"),
        v.email("A valid email address is required"),
      ),
    }),
    fields: [
      {
        name: "tenantName",
        label: "Tenant Name",
        kind: "text",
        type: "text",
      },
      {
        name: "tenantEmail",
        label: "Tenant Email",
        kind: "text",
        type: "email",
      },
    ],
  },
  // { label: "Payment method" },
  // { label: "Unit description" },
  // { label: "Confirmation" },
] as const satisfies Array<TStep>;

// eslint-disable-next-line @typescript-eslint/require-await
const handleSubmit = async (data: Record<string, any>) => {
  console.log(data);
};

export default function RentPayment() {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Payment</h1>

        <ServiceForms steps={steps} onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
