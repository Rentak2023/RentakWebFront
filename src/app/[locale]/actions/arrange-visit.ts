"use server";
import * as v from "valibot";

import ky from "@/lib/ky";
import { arrangeVisitSchema } from "@/schema/arrange-visit";

type ArrangeVisitResponse = {
  message: string;
};

export const arrangeVisitAction = async (
  data: v.InferInput<typeof arrangeVisitSchema>,
  unitId: number,
  lang: string,
) => {
  const validatedFields = v.safeParse(arrangeVisitSchema, data);

  if (!validatedFields.success) {
    console.error(validatedFields.issues);
    throw new Error("Invalid fields");
  }

  return ky
    .post("unit/visit", {
      json: {
        ...data,
        lang,
        unit_id: unitId,
      },
    })
    .json<ArrangeVisitResponse>();
};
