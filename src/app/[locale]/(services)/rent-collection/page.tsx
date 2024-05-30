"use client";

import { useState } from "react";
import { email, minLength, string } from "valibot";

import { ServiceForms } from "../service-forms";
import { createFormStore } from "../stepper-form-store";
import { type TStep } from "../types";

type RentCollectionData = {
  username: string;
  email: string;
  tenantName: string;
  tenantEmail: string;
};

const steps: Array<TStep<RentCollectionData>> = [
  {
    label: "Profile Info",
    fields: [
      {
        name: "username",
        label: "Username",
        type: "text",
        description: "This is your username",
        schema: string([minLength(1, "Username is required")]),
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        schema: string([email("A valid email address is required")]),
      },
    ],
  },
  {
    label: "Tenant Info",
    fields: [
      {
        name: "tenantName",
        label: "Tenant Name",
        type: "text",
        schema: string([minLength(1, "Tenant name is required")]),
      },
      {
        name: "tenantEmail",
        label: "Tenant Email",
        type: "email",
        schema: string([email("A valid email address is required")]),
      },
    ],
  },
  // { label: "Payment method" },
  // { label: "Unit description" },
  // { label: "Confirmation" },
];

export default function RentCollection() {
  const [useWizardFormStore] = useState(() =>
    createFormStore<RentCollectionData>({
      username: "",
      email: "",
      tenantName: "",
      tenantEmail: "",
    }),
  );

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Collection</h1>

        <ServiceForms useFormStore={useWizardFormStore} steps={steps} />
      </div>
    </main>
  );
}
