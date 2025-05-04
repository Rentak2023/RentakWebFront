import * as v from "valibot";

import { pub } from "@/orpc";

const paymentMethodSchema = v.object({
  id: v.number(),
  method_name_ar: v.string(),
  method_name_en: v.string(),
  picture: v.string(),
});

export const cashInMethodsList = pub
  .route({
    method: "GET",
    path: "/payment-methods/cash-in",
    summary: "List all cash in methods",
    tags: ["payment-methods"],
  })
  .output(v.array(paymentMethodSchema))
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("payment-method/get_all_cash_in_payment_methods")
      .json<{ data: Array<v.InferOutput<typeof paymentMethodSchema>> }>();

    return res.data;
  });

export const cashOutMethodsList = pub
  .route({
    method: "GET",
    path: "/payment-methods/cash-out",
    summary: "List all cash out methods",
    tags: ["payment-methods"],
  })
  .output(v.array(paymentMethodSchema))
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("payment-method/get_all_cash_out_payment_methods")
      .json<{ data: Array<v.InferOutput<typeof paymentMethodSchema>> }>();

    return res.data;
  });

export default {
  cashIn: cashInMethodsList,
  cashOut: cashOutMethodsList,
};
