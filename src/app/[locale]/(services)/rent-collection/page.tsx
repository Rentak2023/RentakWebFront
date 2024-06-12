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

import { rentCollectionAction } from "../actions/rent-collection";
import { ServiceForms } from "../service-forms";
import { type TStep } from "../types";

enum PaymentMethod {
  Bank = "4",
  Wallet = "5",
}

const banksPromise = getBanks();

export default function RentCollection() {
  const banks = use(banksPromise);

  const steps = [
    {
      label: "Profile Info",
      schema: object({
        landlord_name: string([minLength(1, "Full name is required")]),
        landlord_phone: string([
          custom(
            (input) => isMobilePhone(input, "ar-EG"),
            "Enter a valid phone number",
          ),
        ]),
      }),
      fields: [
        {
          name: "landlord_name",
          label: "Full Name",
          kind: "text",
          type: "text",
        },
        {
          name: "landlord_phone",
          label: "Phone Number",
          kind: "text",
          type: "tel",
        },
      ],
    },
    {
      label: "Tenant Info",
      schema: object({
        tenant_name: string([minLength(1, "Tenant name is required")]),
        tenant_phone: string([
          custom(
            (input) => isMobilePhone(input, "ar-EG"),
            "Enter a valid phone number",
          ),
        ]),
      }),
      fields: [
        {
          name: "tenant_name",
          label: "Tenant Full Name",
          kind: "text",
          type: "text",
        },
        {
          name: "tenant_phone",
          label: "Tenant Phone Number",
          kind: "text",
          type: "tel",
        },
      ],
    },
    {
      label: "Payment method",
      schema: variant("cash_out_payment_method_id", [
        object(
          {
            cash_out_payment_method_id: literal(PaymentMethod.Wallet),
            wallet_account_number: string([
              custom(
                (input) => isMobilePhone(input, "ar-EG"),
                "Enter a valid phone number",
              ),
            ]),
            confirm_wallet_account_number: string([
              custom(
                (input) => isMobilePhone(input, "ar-EG"),
                "Enter a valid phone number",
              ),
            ]),
          },
          [
            forward(
              custom(
                ({ wallet_account_number, confirm_wallet_account_number }) =>
                  wallet_account_number === confirm_wallet_account_number,
                "Wallet Account Number does not match",
              ),
              ["confirm_wallet_account_number"],
            ),
          ],
        ),
        object(
          {
            cash_out_payment_method_id: literal(PaymentMethod.Bank),
            bank_id: picklist(
              banks.map((bank) => bank.id.toString()),
              "Bank is required",
            ),
            bank_account_number: string([
              minLength(1, "Bank Account Number is required"),
            ]),
            confirm_bank_account_number: string([
              minLength(1, "Confirm Bank Account Number is required"),
            ]),
          },
          [
            forward(
              custom(
                ({ bank_account_number, confirm_bank_account_number }) =>
                  bank_account_number === confirm_bank_account_number,
                "Bank Account Number does not match",
              ),
              ["confirm_bank_account_number"],
            ),
          ],
        ),
      ]),
      fields: [
        {
          name: "cash_out_payment_method_id",
          label: "Transfer To",
          kind: "select",
          options: [
            { value: PaymentMethod.Wallet, label: "Wallet" },
            { value: PaymentMethod.Bank, label: "Bank Transfer" },
          ],
        },
        // fields if wallet
        {
          name: "wallet_account_number",
          label: "Wallet Account Number",
          kind: "text",
          type: "text",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Wallet,
        },
        {
          name: "confirm_wallet_account_number",
          label: "Confirm Wallet Account Number",
          kind: "text",
          type: "text",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Wallet,
        },
        // fields if bank_transfer
        {
          name: "bank_id",
          label: "Bank",
          kind: "select",
          options: banks.map((bank) => ({
            value: bank.id.toString(),
            label: bank.bank_name_en,
          })),
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Bank,
        },
        {
          name: "bank_account_number",
          label: "Bank Account Number",
          kind: "text",
          type: "text",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Bank,
        },
        {
          name: "confirm_bank_account_number",
          label: "Confirm Bank Account Number",
          kind: "text",
          type: "text",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Bank,
        },
      ],
    },
    {
      label: "Unit description",
      schema: object({
        unit_description: string([
          minLength(1, "Unit Description is required"),
        ]),
        rent_amount: string([
          custom(isNumeric, "Rent Amount must be a number"),
        ]),
        contract_start_date: date("Contract Start Date is required"),
        contract_end_date: date("Contract End Date is required"),
        annual_increase_percentage: string([
          custom(isNumeric, "Annual Increase Percentage must be a number"),
        ]),
        collection_day: string([minLength(1, "Collection Day is required")]),
      }),
      fields: [
        {
          name: "unit_description",
          label: "Unit Description",
          description:
            "Type the unit description as you want it to appear on the transfer form",
          kind: "text",
          type: "text",
        },
        {
          name: "rent_amount",
          label: "Rent Amount",
          kind: "text",
          type: "text",
        },
        {
          name: "contract_start_date",
          label: "Contract Start Date",
          kind: "date",
        },
        {
          name: "contract_end_date",
          label: "Contract End Date",
          kind: "date",
        },
        {
          name: "annual_increase_percentage",
          label: "Annual Increase Percentage",
          kind: "text",
          type: "text",
        },
        {
          name: "collection_day",
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
      schema: object({ agree: literal(true) }),
      fields: [
        {
          name: "agree",
          label: "Agree",
          kind: "checkbox",
        },
      ],
    },
  ] as const satisfies Array<TStep>;

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSubmit = async (data: Record<string, any>) => {
    console.log(data);
    const res = await rentCollectionAction(data);
    console.log(res);
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
