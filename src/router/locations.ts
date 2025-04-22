import * as v from "valibot";

import { pub } from "@/orpc";
import { LocaleSchema } from "@/schemas/common";

const governorateSchema = v.object({
  governorate_id: v.number(),
  governorate_name: v.string(),
});

export const governoratesList = pub
  .route({
    method: "GET",
    path: "/governorates",
    summary: "List all governorates",
    tags: ["governorates"],
  })
  .input(LocaleSchema)
  .output(v.array(governorateSchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("location/get-all-governorates", {
        searchParams: {
          lang: input,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof governorateSchema>> }>();

    return res.data;
  });

const citySchema = v.object({
  city_id: v.number(),
  city_name: v.string(),
});

export const citiesList = pub
  .route({
    method: "GET",
    path: "/districts",
    summary: "List all districts",
    tags: ["districts"],
  })
  .input(
    v.object({
      governorate_id: v.pipe(v.string(), v.trim(), v.decimal()),
      lang: LocaleSchema,
    }),
  )
  .output(v.array(citySchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("location/get-all-cities", {
        searchParams: {
          governorate_id: input.governorate_id,
          lang: input.lang,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof citySchema>> }>();

    return res.data;
  });

export default {
  governorates: governoratesList,
  cities: citiesList,
};
