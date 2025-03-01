import { endOfDay, format } from "date-fns";
import { HTTPError } from "ky";

import fetcher from "@/lib/fetcher";

type RentCollectionResponse = {
  message: string;
  rent_collection_request_id: number;
};

export const rentCollectionAction = async (data: Record<string, any>) => {
  try {
    const formData = { ...data };
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        formData[key] = format(endOfDay(value), "yyyy-MM-dd");
      }
    }
    const res = await fetcher
      .post("contract/create_rent_collection_contract", {
        json: formData,
      })
      .json<RentCollectionResponse>();

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
