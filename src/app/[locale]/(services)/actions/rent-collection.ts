"use server";

import { HTTPError } from "ky";

import ky from "@/lib/ky";

type ContactResponse = {
  message: string;
};

export const rentCollectionAction = (data: Record<string, any>) => {
  return ky
    .post("contract/create_rent_collection_contract", {
      json: data,
    })
    .json<ContactResponse>()
    .catch((error: unknown) => {
      if (error instanceof HTTPError) {
        return error.response.json();
      }
    });
};
