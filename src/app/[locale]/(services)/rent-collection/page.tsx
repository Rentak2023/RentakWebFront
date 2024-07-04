"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useTranslations } from "next-intl";
import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isNumeric from "validator/es/lib/isNumeric";

import bannerImage from "@/app/[locale]/assets/images/rent-payment-banner.png";
import { useToast } from "@/components/ui/use-toast";
import { banksQuery } from "@/queries/banks";

import { rentCollectionAction } from "../actions/rent-collection";
import { ServiceForms } from "../service-forms";
import { type TStep } from "../types";

enum PaymentMethod {
  Bank = "4",
  Wallet = "5",
}

export default function RentCollection() {
  const { data: banks } = useSuspenseQuery(banksQuery);

  const t = useTranslations("services");
  const { toast } = useToast();

  const steps = [
    {
      label: t("steps.profile-info.label"),
      schema: v.object({
        landlord_name: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.landlord-name.non-empty")),
        ),
        landlord_phone: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.landlord-phone.non-empty")),
          v.check(
            (input) => isMobilePhone(input, "ar-EG"),
            t("fields.landlord-phone.invalid"),
          ),
        ),
      }),
      fields: [
        {
          name: "landlord_name",
          label: t("fields.landlord-name.label"),
          kind: "text",
          type: "text",
        },
        {
          name: "landlord_phone",
          label: t("fields.landlord-phone.label"),
          kind: "text",
          type: "tel",
        },
      ],
    },
    {
      label: t("steps.tenant-info.label"),
      schema: v.object({
        tenant_name: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.tenant-name.non-empty")),
        ),
        tenant_phone: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.tenant-phone.non-empty")),
          v.check(
            (input) => isMobilePhone(input, "ar-EG"),
            t("fields.tenant-phone.invalid"),
          ),
        ),
      }),
      fields: [
        {
          name: "tenant_name",
          label: t("fields.tenant-name.label"),
          kind: "text",
          type: "text",
        },
        {
          name: "tenant_phone",
          label: t("fields.tenant-phone.label"),
          kind: "text",
          type: "tel",
        },
      ],
    },
    {
      label: t("steps.payment-method.label"),
      schema: v.variant("cash_out_payment_method_id", [
        v.pipe(
          v.object({
            cash_out_payment_method_id: v.literal(PaymentMethod.Wallet),
            wallet_account_number: v.pipe(
              v.string(),
              v.trim(),
              v.nonEmpty(t("fields.wallet-number.non-empty")),
              v.check(
                (input) => isMobilePhone(input, "ar-EG"),
                t("fields.wallet-number.invalid"),
              ),
            ),
            confirm_wallet_account_number: v.pipe(
              v.string(),
              v.trim(),
              v.nonEmpty(t("fields.confirm-wallet-number.non-empty")),
              v.check(
                (input) => isMobilePhone(input, "ar-EG"),
                t("fields.confirm-wallet-number.invalid"),
              ),
            ),
          }),
          v.forward(
            v.check(
              ({ wallet_account_number, confirm_wallet_account_number }) =>
                wallet_account_number === confirm_wallet_account_number,
              t("fields.confirm-wallet-number.mismatch"),
            ),
            ["confirm_wallet_account_number"],
          ),
        ),
        v.pipe(
          v.object({
            cash_out_payment_method_id: v.literal(PaymentMethod.Bank),
            bank_id: v.picklist(
              banks.map((bank) => bank.id.toString()),
              t("fields.bank.non-empty"),
            ),
            bank_account_number: v.pipe(
              v.string(),
              v.trim(),
              v.nonEmpty(t("fields.bank-account-number.non-empty")),
            ),
            confirm_bank_account_number: v.pipe(
              v.string(),
              v.trim(),
              v.nonEmpty(t("fields.confirm-bank-account-number.non-empty")),
            ),
          }),
          v.forward(
            v.check(
              ({ bank_account_number, confirm_bank_account_number }) =>
                bank_account_number === confirm_bank_account_number,
              t("fields.confirm-bank-account-number.mismatch"),
            ),
            ["confirm_bank_account_number"],
          ),
        ),
      ]),
      fields: [
        {
          name: "cash_out_payment_method_id",
          label: t("fields.transfer-to.label"),
          kind: "select",
          options: [
            {
              value: PaymentMethod.Wallet,
              label: t("fields.transfer-to.wallet"),
            },
            {
              value: PaymentMethod.Bank,
              label: t("fields.transfer-to.bank"),
            },
          ],
        },
        // fields if wallet
        {
          name: "wallet_account_number",
          label: t("fields.wallet-number.label"),
          kind: "text",
          type: "tel",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Wallet,
        },
        {
          name: "confirm_wallet_account_number",
          label: t("fields.confirm-wallet-number.label"),
          kind: "text",
          type: "tel",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Wallet,
        },
        // fields if bank_transfer
        {
          name: "bank_id",
          label: t("fields.bank.label"),
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
          label: t("fields.bank-account-number.label"),
          kind: "text",
          type: "text",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Bank,
        },
        {
          name: "confirm_bank_account_number",
          label: t("fields.confirm-bank-account-number.label"),
          kind: "text",
          type: "text",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Bank,
        },
      ],
    },
    {
      label: t("steps.unit-description.label"),
      schema: v.object({
        unit_description: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.unit-description.non-empty")),
        ),
        rent_amount: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.rent-amount.non-empty")),
          v.check(isNumeric, t("fields.rent-amount.invalid")),
        ),
        contract_start_date: v.date(t("fields.contract-start-date.non-empty")),
        contract_end_date: v.date(t("fields.contract-end-date.non-empty")),
        annual_increase_percentage: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.annual-increase-percentage.non-empty")),
          v.check(isNumeric, t("fields.annual-increase-percentage.invalid")),
        ),
        collection_day: v.pipe(
          v.string(),
          v.nonEmpty(t("fields.collection-day.non-empty")),
        ),
      }),
      fields: [
        {
          name: "unit_description",
          label: t("fields.unit-description.label"),
          description: t("fields.unit-description.description"),
          kind: "text",
          type: "text",
        },
        {
          name: "rent_amount",
          label: t("fields.rent-amount.label"),
          kind: "text",
          type: "text",
        },
        {
          name: "total_amount",
          label: t("fields.total-amount.label"),
          description: t("fields.total-amount.description", {
            fees: "2.5",
          }),
          kind: "text",
          type: "text",
          readonly: true,
          compute: (data) => (Number(data.rent_amount) * 1.025).toFixed(2),
        },
        {
          name: "contract_start_date",
          label: t("fields.contract-start-date.label"),
          kind: "date",
        },
        {
          name: "contract_end_date",
          label: t("fields.contract-end-date.label"),
          kind: "date",
        },
        {
          name: "annual_increase_percentage",
          label: t("fields.annual-increase-percentage.label"),
          kind: "text",
          type: "text",
        },
        {
          name: "collection_day",
          label: t("fields.collection-day.label"),
          kind: "select",
          options: Array.from({ length: 29 }, (_, i) => ({
            value: (i + 1).toString(),
            label: (i + 1).toString(),
          })),
        },
      ],
    },

    {
      heading: t("steps.confirmation.heading"),
      list: [
        'أقر أنا [] بصحة البيانات الواردة أعلاه وأن المعاملة المالية مرتبطة بعلاقة إيجارية حقيقية وبأن شركة "رينتاك للتطبيقات ذ.م.م" ليس لها أي صلة بهذه العلاقة الإيجارية وأنها لم تتدخل في هذا الإيجار سواء في مرحلة البحث أو التفاوض أو إبرام العقد.',
        'كما أقر بأن شركة "رينتك" هي جهة تحويل للمبلغ المذكور أعلاه للمستفيد بقيمة 2.5% كمصاريف إدارية، ويتم التحويل في خلال أربعة أيام عمل.',
        "ليس للشركة أي صلة بالمؤجر أو بالعين المؤجرة ولا يجوز لي الرجوع أو مطالبة شركة رينتك أو أي من مديريها أو موظفيها سواء بصفاتهم الشخصية أو الوظيفية بأية مطالبات أو تعويضات أو مبالغ أو حقوق أو دعاوى أو التزامات في الحال أو في المستقبل، تكون ناشئة عن أو مرتبطة أو متصلة بعقد الإيجار المبرم بين المؤجر والمستأجر أو العين المؤجرة.",
        "وهذا إقرار نهائي مني لا يجوز لي الرجوع فيه أو العدول عنه، وفي حالة مخالفتي لهذا التعهد، تحتفظ شركة رينتك بحقها في الرجوع بكافة الحقوق والضمانات المقررة قانوناً.",
      ],
      label: t("steps.confirmation.label"),
      schema: v.object({
        agree: v.literal(true, t("fields.agree.non-empty")),
      }),
      fields: [
        {
          name: "agree",
          label: t("fields.agree.label"),
          kind: "checkbox",
        },
      ],
    },
  ] as const satisfies Array<TStep>;

  const handleSubmit = async (data: Record<string, any>) => {
    const res = await rentCollectionAction(data);
    if (res?.type === "error" && res.error.message) {
      toast({
        title: "Error",
        description: res.error.message,
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
  };

  return (
    <main className="pt-20">
      <div className="relative isolate py-16">
        <Image
          src={bannerImage}
          alt=""
          className="absolute inset-0 -z-20 size-full object-cover"
          fill
        />
        <div className="absolute inset-0 -z-10 bg-slate-900/20" />

        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-5xl font-semibold text-slate-50">
            Vacay Now, Pay Later!
          </h1>
          <p className="mt-6 text-balance text-center text-lg text-slate-50">
            Choose a chalet from any platform you prefer, agree on the price,
            provide owner&apos;s bank details, and fill out our form. Rentak
            handles the rest, including transferring the amount within 4 working
            days.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceForms steps={steps} onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
