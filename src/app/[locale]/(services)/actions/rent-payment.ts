import { endOfDay, format } from "date-fns";
import { HTTPError } from "ky";

import fetcher from "@/lib/fetcher";

type PaymentData = {
  redirect_url: string;
  reference_id: string;
  status: boolean;
  third_party_transaction_id: string;
};

type RentPaymentResponse = {
  message: string;
} & (
  | {
      redirect: true;
      payment_data: PaymentData;
    }
  | {
      redirect: false;
      payment_data: null;
    }
);

export const rentPaymentAction = async (data: Record<string, any>) => {
  try {
    const formData = { ...data };
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        formData[key] = format(endOfDay(value), "yyyy-MM-dd");
      }
    }

    const res = await fetcher
      .post("contract/create_rent_payment_contract", {
        json: {
          ...formData,
          product_id: 1,
        },
      })
      .json<RentPaymentResponse>();

    return {
      type: "success" as const,
      data: res,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorRes = await error.response.json<any>();
      return {
        type: "error" as const,
        error: errorRes,
      };
    }
  }
};
