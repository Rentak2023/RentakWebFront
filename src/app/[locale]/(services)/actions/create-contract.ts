import { endOfDay, format } from "date-fns";
import { HTTPError } from "ky";
import * as v from "valibot";

import fetcher from "@/lib/fetcher";
import { contractSchema } from "@/schemas/contract";

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
      formData.append(key, format(endOfDay(value), "yyyy-MM-dd"));
    } else if (value) {
      formData.append(key, value);
    }
  }

  try {
    const res = await fetcher
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
      const errorRes = await error.response.json<any>();
      return {
        type: "error" as const,
        error: errorRes,
      };
    } else {
      console.error(error);
      return {
        type: "error" as const,
        error: {
          message: "Something went wrong",
        },
      };
    }
  }
};
