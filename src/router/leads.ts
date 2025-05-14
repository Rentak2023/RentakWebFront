import { HTTPError } from "ky";
import * as v from "valibot";

import { pub } from "@/orpc";
import { LocaleSchema } from "@/schemas/common";
import { CreateLeadResponseSchema, CreateLeadSchema } from "@/schemas/lead";

export const createLead = pub
  .route({
    method: "POST",
    path: "/lead",
    summary: "Create lead",
    tags: ["lead"],
  })
  .input(
    v.object({
      values: CreateLeadSchema,
      lang: LocaleSchema,
    }),
  )
  .output(CreateLeadResponseSchema)
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("lead/create", {
          json: {
            source: "rentak",
            full_name: input.values.fullName,
            email: input.values.email,
            phone_number: input.values.phone,
            message: input.values.message,
            lang: input.lang,
          },
        })
        .json<v.InferOutput<typeof CreateLeadResponseSchema>>();

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        if (error.response.status === 400) {
          throw errors.VALIDATION_ERROR({ data: responseData });
        } else if (error.response.status === 401) {
          throw errors.GENERIC_ERROR({ data: responseData });
        }
      }
      throw errors.GENERIC_ERROR({ data: { message: "Something went wrong" } });
    }
  });

export default { createLead };
