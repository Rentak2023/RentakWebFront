"use client";
import { sendGAEvent } from "@next/third-parties/google";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { type Locale, useTranslations } from "next-intl";
import { use, useState } from "react";
import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isNumeric from "validator/es/lib/isNumeric";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "@/i18n/routing";
import { banksQuery } from "@/queries/banks";
import { cashInPaymentMethodsQuery } from "@/queries/payment-methods";
import { productQuery } from "@/queries/products";
import { sendOTP, verifyOTP } from "@/services/auth";
import { checkPromoCode } from "@/services/promo";

import { rentPaymentAction } from "../actions/rent-payment";
import { ServiceForms } from "../service-forms";
import { type TStep } from "../types";

enum PaymentMethod {
  Bank = "4",
  Wallet = "5",
}

function onNextStep(index: number) {
  let eventName = "";
  switch (index) {
    case 0: {
      eventName = "Tenant Info Filled";
      break;
    }
    case 1: {
      eventName = "Payment Method Filled";
      break;
    }
    case 2: {
      eventName = "Owner Info Filled";
      break;
    }
    case 3: {
      eventName = "Unit Description Filled";
      break;
    }
    case 4: {
      eventName = "Form Confirmation Filled";
      break;
    }
    default: {
      console.log("Invalid Event");
      return;
    }
  }
  sendGAEvent("event", eventName, {
    event_category: "Rent Payment",
  });
}

export default function RentPayment(
  props: Readonly<{
    params: Promise<{ locale: Locale }>;
  }>,
) {
  const params = use(props.params);

  const { locale } = params;

  const { data: paymentMethods } = useSuspenseQuery(cashInPaymentMethodsQuery);
  const { data: banks } = useSuspenseQuery(banksQuery);
  const t = useTranslations("services");
  const [userId, setUserId] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const { toast } = useToast();
  const router = useRouter();
  const { data: product } = useSuspenseQuery(productQuery(1));

  const steps = [
    {
      label: t("steps.profile-info.label"),
      schema: v.objectAsync({
        tenant_name: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.user-name.non-empty")),
        ),
        tenant_email: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.user-email.non-empty")),
          v.email(t("fields.user-email.invalid")),
        ),
        tenant_national_id: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty(t("fields.national-id.non-empty")),
          v.startsWith("2", t("fields.national-id.invalid")),
          v.length(14, t("fields.national-id.invalid")),
        ),
        tenant_phone: v.pipe(
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
              await verifyOTP({ userId, otp }, locale);

              return true;
            } catch {
              return false;
            }
          }, t("fields.otp.invalid")),
        ),
      }),
      fields: [
        {
          name: "tenant_name",
          label: t("fields.user-name.label"),
          kind: "text",
          type: "text",
          autoComplete: "name",
        },
        {
          name: "tenant_email",
          label: t("fields.user-email.label"),
          kind: "text",
          type: "email",
          autoComplete: "email",
        },
        {
          name: "tenant_national_id",
          label: t("fields.national-id.label"),
          kind: "text",
          type: "text",
        },
        {
          name: "tenant_phone",
          label: t("fields.user-phone.label"),
          kind: "text",
          type: "tel",
          autoComplete: "tel",
          actionText: t("fields.user-phone.action-text"),
          action: async (values) => {
            try {
              const res = await sendOTP({
                user_name: values.tenant_name,
                user_email: values.tenant_email,
                user_phone: values.tenant_phone,
                national_id: values.tenant_national_id,
              });
              setUserId(res.userId);
              toast({
                title: "OTP Sent",
                description: "OTP has been sent to your phone number",
              });
            } catch (error) {
              if (error instanceof HTTPError) {
                const errorRes = await error.response.json<any>();
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
        cash_in_payment_method_id: v.picklist(
          paymentMethods.map((paymentMethod) => paymentMethod.id.toString()),
          t("fields.payment-method.non-empty"),
        ),
      }),
      fields: [
        {
          name: "cash_in_payment_method_id",
          label: t("fields.payment-method.label"),
          kind: "select",
          options: paymentMethods.map((paymentMethod) => ({
            value: paymentMethod.id.toString(),
            label:
              locale === "en"
                ? paymentMethod.method_name_en
                : paymentMethod.method_name_ar,
          })),
        },
      ],
    },
    {
      label: t("steps.owner-info.label"),
      schema: v.intersect([
        v.object({
          landlord_name: v.pipe(
            v.string(),
            v.trim(),
            v.nonEmpty(t("fields.owner-name.non-empty")),
          ),
          landlord_phone: v.pipe(
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
              v.partialCheck(
                [["wallet_account_number"], ["confirm_wallet_account_number"]],
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
              v.partialCheck(
                [["bank_account_number"], ["confirm_bank_account_number"]],
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
          name: "landlord_name",
          label: t("fields.owner-name.label"),
          kind: "text",
          type: "text",
          autoComplete: "name",
        },
        {
          name: "landlord_phone",
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
        property_description: v.pipe(
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
        promo_code: v.optional(v.string()),
      }),
      fields: [
        {
          name: "property_description",
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
          name: "promo_code",
          label: t("fields.promo-code.label"),
          kind: "text",
          type: "text",
          description: t("fields.promo-code.description"),
          actionText: t("fields.promo-code.action-text"),
          action: async (data) => {
            try {
              const res = await checkPromoCode(data.promo_code);
              setDiscount(res.promocode.discount);
              toast({
                title: "Success",
                description: "Promo code applied",
              });
            } catch {
              toast({
                title: "Error",
                description: "Invalid Promo Code",
                variant: "destructive",
              });
            }
          },
        },
        {
          name: "total_amount",
          label: t("fields.total-amount.label"),
          description: t("fields.total-amount.description", {
            fees: product.fees,
          }),
          kind: "text",
          type: "text",
          readonly: true,
          compute: (data) => {
            const fees = (Number(data.rent_amount) * product.fees) / 100;
            const discountedFees = fees - (discount * fees) / 100;

            return (Number(data.rent_amount) + discountedFees).toFixed(2);
          },
        },
      ],
    },

    {
      heading: t("steps.confirmation.heading"),
      list: [
        'أقر أنا [] بصحة البيانات الواردة أعلاه وأن المعاملة المالية مرتبطة بعلاقة إيجارية حقيقية وبأن شركة "رينتاك للتطبيقات ذ.م.م" ليس لها أي صلة بهذه العلاقة الإيجارية وأنها لم تتدخل في هذا الإيجار سواء في مرحلة البحث أو التفاوض أو إبرام العقد.',
        `كما أقر بأن شركة "رينتك" هي جهة تحويل للمبلغ المذكور أعلاه للمستفيد بقيمة ${product.fees}% كمصاريف إدارية، ويتم التحويل في خلال أربعة أيام عمل.`,
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
    const res = await rentPaymentAction({
      ...data,
      lang: locale,
    });
    if (res?.type === "success") {
      sendGAEvent("event", "Form Submitted Successfully", {
        event_category: "Rent Payment",
      });
      if (res.data.redirect) {
        toast({
          title: "Success",
          description: "Payment Request created successfully",
        });
        router.push(res.data.payment_data.redirect_url);
      } else {
        toast({
          title: "Success",
          description: t("messages.service-request-success"),
        });
      }
    }
    if (res?.type === "error") {
      sendGAEvent("event", "Form Submition Error", {
        event_category: "Rent Payment",
      });
      toast({
        title: "Error",
        description:
          res.error.message ?? "Something went wrong. Please try again later.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
  };

  return (
    <main className="pt-32">
      <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
          {t("rent-payment.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
          {t("rent-payment.description")}
        </p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceForms
          steps={steps}
          onSubmit={handleSubmit}
          onNextStep={onNextStep}
        />
      </div>
    </main>
  );
}
