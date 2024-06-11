"use client";

import { use } from "react";
import {
  custom,
  date,
  forward,
  literal,
  minLength,
  object,
  picklist,
  string,
  variant,
} from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isNumeric from "validator/es/lib/isNumeric";

import { getBanks } from "@/services/banks";

import { ServiceForms } from "../service-forms";
import { type TStep } from "../types";

const banksPromise = getBanks();

export default function RentCollection() {
  const banks = use(banksPromise);

  const steps = [
    {
      label: "Profile Info",
      schema: object({
        fullName: string([minLength(1, "Full name is required")]),
        phoneNumber: string([
          custom(isMobilePhone, "Enter a valid phone number"),
        ]),
      }),
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          kind: "text",
          type: "text",
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          kind: "text",
          type: "tel",
        },
      ],
    },
    {
      label: "Tenant Info",
      schema: object({
        tenantFullName: string([minLength(1, "Tenant name is required")]),
        tenantPhone: string([
          custom(isMobilePhone, "Enter a valid phone number"),
        ]),
      }),
      fields: [
        {
          name: "tenantFullName",
          label: "Tenant Full Name",
          kind: "text",
          type: "text",
        },
        {
          name: "tenantPhone",
          label: "Tenant Phone Number",
          kind: "text",
          type: "tel",
        },
      ],
    },
    {
      label: "Payment method",
      schema: variant("transferTo", [
        object({
          transferTo: literal("wallet"),
          walletAccountNumber: string([
            minLength(1, "Wallet Account Number is required"),
          ]),
        }),
        object(
          {
            transferTo: literal("bank_transfer"),
            bankName: picklist(
              banks.map((bank) => bank.id.toString()),
              "Bank is required",
            ),
            bankAccountNumber: string([
              minLength(1, "Bank Account Number is required"),
            ]),
            confirmBankAccountNumber: string([
              minLength(1, "Confirm Bank Account Number is required"),
            ]),
          },
          [
            forward(
              custom(
                ({ bankAccountNumber, confirmBankAccountNumber }) =>
                  bankAccountNumber === confirmBankAccountNumber,
                "Bank Account Number does not match",
              ),
              ["confirmBankAccountNumber"],
            ),
          ],
        ),
      ]),
      fields: [
        {
          name: "transferTo",
          label: "Transfer To",
          kind: "select",
          options: [
            { value: "wallet", label: "Wallet" },
            { value: "bank_transfer", label: "Bank Transfer" },
          ],
        },
        // fields if wallet
        {
          name: "walletAccountNumber",
          label: "Wallet Account Number",
          kind: "text",
          type: "text",
          condition: (data) => data.transferTo === "wallet",
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
          condition: (data) => data.transferTo === "bank_transfer",
        },
        {
          name: "bankAccountNumber",
          label: "Bank Account Number",
          kind: "text",
          type: "text",
          condition: (data) => data.transferTo === "bank_transfer",
        },
        {
          name: "confirmBankAccountNumber",
          label: "Confirm Bank Account Number",
          kind: "text",
          type: "text",
          condition: (data) => data.transferTo === "bank_transfer",
        },
      ],
    },
    {
      label: "Unit description",
      schema: object({
        unitDescription: string([minLength(1, "Unit Description is required")]),
        rentAmount: string([custom(isNumeric, "Rent Amount must be a number")]),
        startDate: date("Contract Start Date is required"),
        endDate: date("Contract End Date is required"),
        increasePercentage: string([
          custom(isNumeric, "Annual Increase Percentage must be a number"),
        ]),
      }),
      fields: [
        {
          name: "unitDescription",
          label: "Unit Description",
          description:
            "Type the unit description as you want it to appear on the transfer form",
          kind: "text",
          type: "text",
        },
        {
          name: "rentAmount",
          label: "Rent Amount",
          kind: "text",
          type: "text",
        },
        {
          name: "startDate",
          label: "Contract Start Date",
          kind: "date",
        },
        {
          name: "endDate",
          label: "Contract End Date",
          kind: "date",
        },
        {
          name: "increasePercentage",
          label: "Annual Increase Percentage",
          kind: "text",
          type: "text",
        },
        {
          name: "collectionDay",
          label: "Collection Day",
          kind: "select",
          options: Array.from({ length: 29 }, (_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
          })),
        },
      ],
    },

    {
      heading: "Acknowledgment And Commitment",
      list: [
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ad ullam debitis, cumque omnis totam? Iusto ea distinctio tempore, corrupti consequatur provident incidunt sint recusandae debitis. Eum unde deleniti laudantium.",
        "Lorem2 ipsum dolor sit amet, consectetur adipisicing elit. Eaque ad ullam debitis, cumque omnis totam? Iusto ea distinctio tempore, corrupti consequatur provident incidunt sint recusandae debitis. Eum unde deleniti laudantium.",
        "Lorem3 ipsum dolor sit amet, consectetur adipisicing elit. Eaque ad ullam debitis, cumque omnis totam? Iusto ea distinctio tempore, corrupti consequatur provident incidunt sint recusandae debitis. Eum unde deleniti laudantium.",
      ],
      label: "Confirmation",
      schema: object({ confirm: literal(true) }),
      fields: [
        {
          name: "confirm",
          label: "Agree",
          kind: "checkbox",
        },
      ],
    },
  ] as const satisfies Array<TStep>;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSubmit = async (data: Record<string, any>) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
  };

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Collection</h1>

        <ServiceForms steps={steps} onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
