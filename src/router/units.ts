import { HTTPError } from "ky";
import * as v from "valibot";

import { inputToSearchParams } from "@/lib/utils";
import { pub } from "@/orpc";
import { LocaleSchema } from "@/schemas/common";
import {
  UnitInspectionSchema,
  UnitSchema,
  UnitsListResponseSchema,
} from "@/schemas/units";

export const homeUnits = pub
  .route({
    method: "GET",
    path: "/home-units",
    summary: "List all home units",
    tags: ["home-units"],
  })
  .input(
    v.object({
      locale: LocaleSchema,
    }),
  )
  .output(v.array(UnitSchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("home/get-home-units", {
        searchParams: {
          lang: input.locale,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof UnitSchema>> }>();

    return res.data;
  });

const StringOrNumber = v.union([v.string(), v.number()]);

export const unitsList = pub
  .route({
    method: "GET",
    path: "/units",
    summary: "List all units",
    tags: ["units"],
  })
  .input(
    v.object({
      lang: LocaleSchema,
      governoment_id: v.nullish(StringOrNumber),
      city_id: v.nullish(StringOrNumber),
      finish_type: v.nullish(StringOrNumber),
      bathroom_numbers: v.nullish(StringOrNumber),
      room_numers: v.nullish(StringOrNumber),
      property_type: v.nullish(
        v.union([v.array(StringOrNumber), StringOrNumber]),
      ),
      keyword: v.nullish(v.string()),
      price_to: v.nullish(StringOrNumber),
      price_from: v.nullish(StringOrNumber),
      page: v.nullish(StringOrNumber),
      sort_by: v.nullish(v.picklist(["newest", "high-to-low", "low-to-high"])),
    }),
  )
  .output(UnitsListResponseSchema)
  .handler(async ({ input, context }) => {
    const { property_type, ...rest } = input;
    const searchParams = inputToSearchParams({
      ...rest,
      property_types: property_type,
    });

    const res = await context.fetcher
      .get("unit/get-all-units", {
        searchParams,
      })
      .json<{ data: v.InferOutput<typeof UnitsListResponseSchema> }>();

    return res.data;
  });

export const findUnit = pub
  .route({
    method: "GET",
    path: "/unit",
    summary: "Get unit by id",
    tags: ["units"],
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.trim(), v.decimal()),
      lang: LocaleSchema,
    }),
  )
  .output(v.nullable(UnitSchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("unit/get-unit-details", {
        searchParams: {
          id: input.id,
          lang: input.lang,
        },
      })
      .json<{ data: UnitSchema | null }>();

    return res.data;
  });

export const getUnitInspection = pub
  .route({
    method: "GET",
    path: "/unit/inspection",
    summary: "Get unit inspection",
    tags: ["units"],
  })
  .input(
    v.object({
      id: v.pipe(v.string(), v.trim(), v.decimal()),
    }),
  )
  .output(v.nullable(UnitInspectionSchema))
  .handler(async ({ input, context }) => {
    try {
      const res = await context.fetcher
        .get("unit/get-unit-inspection", {
          searchParams: {
            id: input.id,
          },
        })
        .json<{ data: v.InferOutput<typeof UnitInspectionSchema> }>();

      return res.data;
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        return null;
      }
      throw error;
    }
  });

const TypeSchema = v.object({
  id: v.number(),
  type_name: v.string(),
});

export const finishingTypesList = pub
  .route({
    method: "GET",
    path: "/finishings",
    summary: "Get finishing list",
    tags: ["finishings"],
  })
  .input(LocaleSchema)
  .output(v.array(TypeSchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("unit/get-all-finish-types", {
        searchParams: {
          lang: input,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof TypeSchema>> }>();

    return res.data;
  });

export const propertyTypesList = pub
  .route({
    method: "GET",
    path: "/property-types",
    summary: "Get property types",
    tags: ["property-types"],
  })
  .input(LocaleSchema)
  .output(v.array(TypeSchema))
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("unit/get-all-property-types", {
        searchParams: {
          lang: input,
        },
      })
      .json<{ data: Array<v.InferOutput<typeof TypeSchema>> }>();

    return res.data;
  });

const PriceRangeSchema = v.object({
  min_price: v.number(),
  max_price: v.number(),
});

export const getPriceRange = pub
  .route({
    method: "GET",
    path: "/price-range",
    summary: "Get price range",
    tags: ["price-range"],
  })
  .output(PriceRangeSchema)
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("unit/get-min-max-price")
      .json<{ data: v.InferOutput<typeof PriceRangeSchema> }>();

    return res.data;
  });

const unitsRouter = {
  home: homeUnits,
  list: unitsList,
  find: findUnit,
  inspection: getUnitInspection,
  finishings: finishingTypesList,
  propertyTypes: propertyTypesList,
  priceRange: getPriceRange,
};

export default unitsRouter;
