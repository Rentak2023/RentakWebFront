"use server";
import { HTTPError } from "ky";
import * as v from "valibot";

import ky from "@/lib/ky";
import { bookCallSchema } from "@/schema/book-call";

type BookCallResponse = {
  success: boolean;
  message: string;
};

export const bookCallAction = async (
  data: v.InferInput<typeof bookCallSchema>,
  lang: string,
  service: string,
) => {
  const values = v.safeParse(bookCallSchema, data);

  if (!values.success) {
    console.error(values.issues);
    throw new Error("Invalid fields");
  }

  try {
    const res = await ky
      .post("public/book-a-call", {
        json: {
          ...values.output,
          lang,
          service,
        },
      })
      .json<BookCallResponse>();

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
