import * as v from "valibot";

import { pub } from "@/orpc";

const bankSchema = v.object({
  id: v.number(),
  bank_name_ar: v.string(),
  bank_name_en: v.string(),
});

export const banksList = pub
  .route({
    method: "GET",
    path: "/banks",
    summary: "List all banks",
    tags: ["banks"],
  })
  .output(v.array(bankSchema))
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("bank/get-all-banks")
      .json<{ data: Array<v.InferOutput<typeof bankSchema>> }>();

    return res.data;
  });

export default {
  list: banksList,
};
