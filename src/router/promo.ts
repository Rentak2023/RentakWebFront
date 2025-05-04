import { HTTPError } from "ky";
import * as v from "valibot";

import { pub } from "@/orpc";

const promoCodeResponseSchema = v.object({
  message: v.string(),
  promocode: v.object({
    id: v.number(),
    code: v.string(),
    discount: v.number(),
    expirationDate: v.string(),
    usageLimit: v.number(),
    usageCount: v.number(),
    createdAt: v.string(),
  }),
});

export const checkPromoCode = pub
  .route({
    method: "POST",
    path: "/promocode/check",
    summary: "Check promo code validity",
    tags: ["promocode"],
  })
  .input(
    v.object({
      code: v.string(),
      user_id: v.number(),
    }),
  )
  .output(promoCodeResponseSchema)
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("promocode/check-promocode", {
          json: {
            code: input.code,
            user_id: input.user_id,
          },
        })
        .json<v.InferOutput<typeof promoCodeResponseSchema>>();

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        throw errors.GENERIC_ERROR({
          data: {
            message: responseData.message,
          },
        });
      }
      throw new Error("Something went wrong");
    }
  });

export default {
  check: checkPromoCode,
};
