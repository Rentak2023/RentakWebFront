"use client";
import { HTTPError } from "ky";
import { useTranslations } from "next-intl";
import { use, useState } from "react";
import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isNumeric from "validator/es/lib/isNumeric";

import { useToast } from "@/components/ui/use-toast";
import { sendOTP, verifyOTP } from "@/services/auth";
import { getBanks } from "@/services/banks";
import { getCashInPaymentMethods } from "@/services/payment-methods";

import { ServiceForms } from "../service-forms";
import { type TStep } from "../types";

const paymentMethodsPromise = getCashInPaymentMethods();
const banksPromise = getBanks();

enum PaymentMethod {
  Bank = "4",
  Wallet = "5",
}

// eslint-disable-next-line @typescript-eslint/require-await
const handleSubmit = async (data: Record<string, any>) => {
  console.log(data);
};

export default function RentPayment({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const paymentMethods = use(paymentMethodsPromise);
  const banks = use(banksPromise);
  const t = useTranslations("services");
  const [userId, setUserId] = useState<number | null>(null);
  const { toast } = useToast();

  const steps = [
    {
      label: t("steps.profile-info.label"),
      schema: v.objectAsync({
        user_name: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.user-name.non-empty")),
        ),
        user_email: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.user-email.non-empty")),
          v.email(t("fields.user-email.invalid")),
        ),
        national_id: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.national-id.non-empty")),
          v.startsWith("2", t("fields.national-id.invalid")),
          v.length(14, t("fields.national-id.invalid")),
        ),
        user_phone: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.user-phone.non-empty")),
          v.check(
            (input) => isMobilePhone(input, "ar-EG"),
            t("fields.user-phone.invalid"),
          ),
        ),
        otp: v.pipeAsync(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.otp.non-empty")),
          v.length(4, t("fields.otp.non-empty")),
          v.checkAsync(async (otp) => {
            try {
              if (userId == null) {
                return false;
              }
              await verifyOTP({ userId, otp });

              return true;
            } catch {
              return false;
            }
          }, t("fields.otp.invalid")),
        ),
      }),
      fields: [
        {
          name: "user_name",
          label: t("fields.user-name.label"),
          kind: "text",
          type: "text",
          autoComplete: "name",
        },
        {
          name: "user_email",
          label: t("fields.user-email.label"),
          kind: "text",
          type: "email",
          autoComplete: "email",
        },
        {
          name: "national_id",
          label: t("fields.national-id.label"),
          kind: "text",
          type: "text",
        },
        {
          name: "user_phone",
          label: t("fields.user-phone.label"),
          kind: "text",
          type: "tel",
          autoComplete: "tel",
          verify: async (values) => {
            try {
              const res = await sendOTP(values);
              setUserId(res.userId);
              toast({
                title: "OTP Sent",
                description: "OTP has been sent to your phone number",
              });
            } catch (error) {
              if (error instanceof HTTPError) {
                const errorRes = await error.response.json();
                for (const fieldError of Object.values(errorRes.errors)) {
                  toast({
                    title: "Error",
                    // @ts-expect-error TODO: add types later
                    description: fieldError[0],
                    variant: "destructive",
                    duration: 5000,
                  });
                }
              }
            }
          },
        },
        {
          name: "otp",
          label: t("fields.otp.label"),
          kind: "otp",
          disabled: userId == null,
        },
      ],
    },
    {
      label: t("steps.payment-method.label"),
      schema: v.object({
        paymentMethod: v.picklist(
          paymentMethods.map((paymentMethod) => paymentMethod.id.toString()),
          t("fields.payment-method.non-empty"),
        ),
      }),
      fields: [
        {
          name: "paymentMethod",
          label: t("fields.payment-method.label"),
          kind: "select",
          options: paymentMethods.map((paymentMethod) => ({
            value: paymentMethod.id.toString(),
            label:
              locale === "ar"
                ? paymentMethod.method_name_ar
                : paymentMethod.method_name_en,
          })),
        },
      ],
    },
    {
      label: t("steps.owner-info.label"),
      schema: v.intersect([
        v.object({
          ownerName: v.pipe(
            v.string(),
            v.trim(),
            v.nonEmpty(t("fields.owner-name.non-empty")),
          ),
          ownerPhoneNumber: v.pipe(
            v.string(),
            v.trim(),
            v.nonEmpty(t("fields.owner-phone.non-empty")),
            v.check(
              (input) => isMobilePhone(input, "ar-EG"),
              t("fields.owner-phone.invalid"),
            ),
          ),
        }),
        v.variant("cash_out_payment_method_id", [
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
      ]),
      fields: [
        {
          name: "ownerName",
          label: t("fields.owner-name.label"),
          kind: "text",
          type: "text",
          autoComplete: "name",
        },
        {
          name: "ownerPhoneNumber",
          label: t("fields.owner-phone.label"),
          kind: "text",
          type: "tel",
          autoComplete: "tel",
        },
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
          autoComplete: "tel",
          condition: (data) =>
            data.cash_out_payment_method_id === PaymentMethod.Wallet,
        },
        {
          name: "confirm_wallet_account_number",
          label: t("fields.confirm-wallet-number.label"),
          kind: "text",
          type: "tel",
          autoComplete: "tel",
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
        // TODO: add promo code
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
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Payment</h1>

        <ServiceForms steps={steps} onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
