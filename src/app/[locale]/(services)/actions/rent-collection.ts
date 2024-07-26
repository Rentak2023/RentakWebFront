"use server";

import { HTTPError } from "ky";

import ky from "@/lib/ky";

type ContactResponse = {
  message: string;
  rent_collection_request_id: number;
};

export const rentCollectionAction = async (data: Record<string, any>) => {
  try {
    const res = await ky
      .post("contract/create_rent_collection_contract", {
        json: data,
      })
      .json<ContactResponse>();

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
