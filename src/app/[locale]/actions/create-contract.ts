"use server";
import { HTTPError } from "ky";
import * as v from "valibot";

import ky from "@/lib/ky";
import { contractSchema } from "@/schema/contract";

type ContractResponse = {
  message: string;
  url: string;
};

export const createContractAction = async (
  data: v.InferInput<typeof contractSchema>,
) => {
  const validatedFields = v.safeParse(contractSchema, data);

  if (!validatedFields.success) {
    console.error(validatedFields.issues);
    throw new Error("Invalid fields");
  }
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (value) {
      formData.append(key, value);
    }
  }

  try {
    const res = await ky
      .post("public/create-contract", {
        body: formData,
      })
      .json<ContractResponse>();

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
