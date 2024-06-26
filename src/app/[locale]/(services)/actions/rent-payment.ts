"use server";

import { HTTPError } from "ky";

import ky from "@/lib/ky";

type PaymentData = {
  redirect_url: string;
  reference_id: string;
  status: boolean;
  third_party_transaction_id: string;
};

type RentPaymentResponse = {
  message: string;
  payment_data: PaymentData;
};

export const rentPaymentAction = async (data: Record<string, any>) => {
  try {
    const res = await ky
      .post("contract/create_rent_payment_contract", {
        json: {
          ...data,
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
      const errorRes = await error.response.json();
      return {
        type: "error" as const,
        error: errorRes,
      };
    }
  }
};
