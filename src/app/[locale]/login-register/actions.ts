"use server";

import { HTTPError } from "ky";
import * as v from "valibot";

import { pub } from "@/orpc";
import { AuthResponse, loginSchema } from "@/schemas/auth";

export const login = pub

  .input(
    v.object({
      values: loginSchema,
      lang: v.picklist(["en", "ar"]),
    }),
  )
  .output(v.nullable(AuthResponse))
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("auth/login", {
          json: {
            phone_number: input.values.phone,
            lang: input.lang,
          },
        })
        .json<v.InferOutput<typeof AuthResponse>>();

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        if (error.response.status === 400) {
          throw errors.VALIDATION_ERROR({ data: responseData });
        } else if (error.response.status === 401) {
          throw errors.GENERIC_ERROR({ data: responseData });
        }

        console.log(responseData, error.response.status);
      }
    }
    return null;
  })
  .actionable();
