"use server";
import * as v from "valibot";

import ky from "@/lib/ky";
import { contactSchema } from "@/schema/contact";

type ContactResponse = {
  message: string;
};

export const contactAction = (data: v.InferInput<typeof contactSchema>) => {
  const validatedFields = v.safeParse(contactSchema, data);

  if (!validatedFields.success) {
    console.error(validatedFields.issues);
    throw new Error("Invalid fields");
  }

  return ky
    .post("contact-us/create", {
      json: data,
    })
    .json<ContactResponse>();
};
