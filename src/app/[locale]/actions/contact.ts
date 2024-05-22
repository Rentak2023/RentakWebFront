"use server";
import { type Input, safeParse } from "valibot";

import ky from "@/lib/ky";
import { contactSchema } from "@/schema/contact";

type ContactResponse = {
  message: string;
};

export const contactAction = (data: Input<typeof contactSchema>) => {
  const validatedFields = safeParse(contactSchema, data);

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
