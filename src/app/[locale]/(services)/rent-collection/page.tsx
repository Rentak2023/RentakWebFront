"use client";

import { use, useState } from "react";
import { custom, date, email, minLength, picklist, string } from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isNumeric from "validator/es/lib/isNumeric";

import { getBanks } from "@/services/banks";

import { ServiceForms } from "../service-forms";
import { createFormStore } from "../stepper-form-store";
import { type TStep } from "../types";

type RentCollectionData = {
  fullName: string;
  email: string;
  tenantFullName: string;
  tenantPhone: string;
  transferTo?: "wallet" | "bank_transfer";
  walletAccountNumber?: string;
  bankAccountNumber?: string;
  bankName?: string;
  unitDescription: string;
  rentAmount: string;
  startDate?: Date;
  endDate?: Date;
  increasePercentage?: string;
  depositAmount?: string;
  collectionDay?: string;
};

const banksPromise = getBanks();

export default function RentCollection() {
  const banks = use(banksPromise);
  const [useWizardFormStore] = useState(() =>
    createFormStore<RentCollectionData>({
      fullName: "",
      email: "",
      tenantFullName: "",
      tenantPhone: "",
      bankAccountNumber: "",
      walletAccountNumber: "",
      bankName: "",
      unitDescription: "",
      rentAmount: "",
    }),
  );

  const steps: Array<TStep<RentCollectionData>> = [
    {
      label: "Profile Info",
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          kind: "text",
          type: "text",
          schema: string([minLength(1, "Full name is required")]),
        },
        {
          name: "email",
          label: "Email",
          kind: "text",
          type: "email",
          schema: string([email("A valid email address is required")]),
        },
      ],
    },
    {
      label: "Tenant Info",
      fields: [
        {
          name: "tenantFullName",
          label: "Tenant Full Name",
          kind: "text",
          type: "text",
          schema: string([minLength(1, "Tenant name is required")]),
        },
        {
          name: "tenantPhone",
          label: "Tenant Phone Number",
          kind: "text",
          type: "tel",
          schema: string([custom(isMobilePhone, "Enter a valid phone number")]),
        },
      ],
    },
    {
      label: "Payment method",
      fields: [
        {
          name: "transferTo",
          label: "Transfer To",
          kind: "select",
          options: [
            { value: "wallet", label: "Wallet" },
            { value: "bank_transfer", label: "Bank Transfer" },
          ],
          schema: picklist(
            ["wallet", "bank_transfer"],
            "Payment method is required",
          ),
        },
        // fields if wallet
        {
          name: "walletAccountNumber",
          label: "Wallet Account Number",
          kind: "text",
          type: "text",
          schema: string([minLength(1, "Wallet Account Number is required")]),
          condition: (data: RentCollectionData) => data.transferTo === "wallet",
        },
        // fields if bank_transfer
        {
          name: "bankName",
          label: "Bank",
          kind: "select",
          options: banks.map((bank) => ({
            value: bank.id.toString(),
            label: bank.bank_name_en,
          })),
          schema: picklist(
            banks.map((bank) => bank.id.toString()),
            "Bank is required",
          ),
          condition: (data: RentCollectionData) =>
            data.transferTo === "bank_transfer",
        },
        {
          name: "bankAccountNumber",
          label: "Bank Account Number",
          kind: "text",
          type: "text",
          schema: string([minLength(1, "Bank Account Number is required")]),
          condition: (data: RentCollectionData) =>
            data.transferTo === "bank_transfer",
        },
      ],
    },
    {
      label: "Unit description",
      fields: [
        {
          name: "unitDescription",
          label: "Unit Description",
          description:
            "Type the unit description as you want it to appear on the transfer form",
          kind: "text",
          type: "text",
          schema: string([minLength(1, "Unit Description is required")]),
        },
        {
          name: "rentAmount",
          label: "Rent Amount",
          kind: "text",
          type: "text",
          schema: string([custom(isNumeric, "Rent Amount must be a number")]),
        },
        {
          name: "startDate",
          label: "Contract Start Date",
          kind: "date",
          schema: date("Contract Start Date is required"),
        },
        {
          name: "endDate",
          label: "Contract End Date",
          kind: "date",
          schema: date("Contract End Date is required"),
        },
        {
          name: "increasePercentage",
          label: "Annual Increase Percentage",
          kind: "text",
          type: "text",
          schema: string([
            custom(isNumeric, "Increase Percentage must be a number"),
          ]),
        },
        {
          name: "collectionDay",
          label: "Collection Day",
          kind: "select",
          options: Array.from({ length: 29 }, (_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
          })),
          schema: picklist(
            Array.from({ length: 29 }, (_, i) => (i + 1).toString()),
            "Collection Day is required",
          ),
        },
      ],
    },

    // { label: "Confirmation" },
  ];

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Collection</h1>

        <ServiceForms useFormStore={useWizardFormStore} steps={steps} />
      </div>
    </main>
  );
}
