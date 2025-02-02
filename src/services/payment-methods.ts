import ky from "@fetcher";

type PaymentMethod = {
  id: number;
  method_name_ar: string;
  method_name_en: string;
  picture: string;
};

type PaymentMethodsResponse = {
  data: Array<PaymentMethod>;
  message: string;
};

export async function getCashInPaymentMethods() {
  const res = await ky
    .get("payment-method/get_all_cash_in_payment_methods", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<PaymentMethodsResponse>();

  return res.data;
}

export async function getCashOutPaymentMethods() {
  const res = await ky
    .get("payment-method/get_all_cash_out_payment_methods", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<PaymentMethodsResponse>();

  return res.data;
}
