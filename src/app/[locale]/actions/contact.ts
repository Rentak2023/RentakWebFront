"use server";
import * as v from "valibot";

import fetcher from "@/lib/fetcher";
import { contactSchema } from "@/schemas/contact";

type ContactResponse = {
  message: string;
};

export const contactAction = async (
  data: v.InferInput<typeof contactSchema>,
) => {
  const validatedFields = v.safeParse(contactSchema, data);

  if (!validatedFields.success) {
    console.error(validatedFields.issues);
    throw new Error("Invalid fields");
  }

  return fetcher
    .post("contact-us/create", {
      json: data,
    })
    .json<ContactResponse>();
};
