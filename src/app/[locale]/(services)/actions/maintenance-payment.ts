"use server";

import ky from "@rentak/fetcher";
import { HTTPError } from "ky";

type PaymentData = {
  redirect_url: string;
  reference_id: string;
  status: boolean;
  third_party_transaction_id: string;
};

type MaintenancePaymentResponse = {
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

export const maintenancePaymentAction = async (data: Record<string, any>) => {
  try {
    const res = await ky
      .post("contract/create_maintainance_contract", {
        json: {
          ...data,
          product_id: 1,
        },
      })
      .json<MaintenancePaymentResponse>();

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
