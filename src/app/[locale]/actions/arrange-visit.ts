"use server";
import ky from "@fetcher";
import { HTTPError } from "ky";
import { type Locale } from "next-intl";
import * as v from "valibot";

import { arrangeVisitSchema } from "@/schema/arrange-visit";

type ArrangeVisitResponse = {
  message: string;
};

export const arrangeVisitAction = async (
  data: v.InferInput<typeof arrangeVisitSchema>,
  unitId: number,
  locale: Locale,
) => {
  const validatedFields = v.safeParse(arrangeVisitSchema, data);

  if (!validatedFields.success) {
    console.error(validatedFields.issues);
    throw new Error("Invalid fields");
  }
  try {
    const res = await ky
      .post("unit/visit", {
        json: {
          ...data,
          lang: locale === "en" ? "en" : "ar",
          unit_id: unitId,
        },
      })
      .json<ArrangeVisitResponse>();

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
