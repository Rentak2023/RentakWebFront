"use client";

import { useState } from "react";
import { email, minLength, object, string } from "valibot";

import { ServiceForms } from "../service-forms";
import { createFormStore } from "../stepper-form-store";
import { type TStep } from "../types";

const steps = [
  {
    label: "Profile Info",
    schema: object({
      username: string([minLength(1, "Username is required")]),
      email: string([email("A valid email address is required")]),
      nationalId: string([minLength(5, "National ID is required")]),
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
    schema: object({
      tenantName: string([minLength(1, "Tenant name is required")]),
      tenantEmail: string([email("A valid email address is required")]),
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

export default function RentPayment() {
  const [useWizardFormStore] = useState(() => createFormStore(steps));

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Payment</h1>

        <ServiceForms useFormStore={useWizardFormStore} steps={steps} />
      </div>
    </main>
  );
}
