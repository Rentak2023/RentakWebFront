import * as v from "valibot";

import { authed } from "@/orpc";
import { LocaleSchema } from "@/schemas/common";
import {
  UnitContractSchema,
  UserStatisticsSchema,
  UserTransferMethodsSchema,
} from "@/schemas/dashboard";

export const getUserTransferMethods = authed
  .route({
    method: "GET",
    path: "/dashboard/user-transfer-methods",
    summary: "Get user transfer methods",
    tags: ["dashboard"],
  })
  .output(UserTransferMethodsSchema)
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("dashboard/get-user-transfer_methods")
      .json<v.InferOutput<typeof UserTransferMethodsSchema>>();
    return res;
  });

export const getUserStatistics = authed
  .route({
    method: "GET",
    path: "/dashboard/user-statistics",
    summary: "Get user statistics",
    tags: ["dashboard"],
  })
  .output(UserStatisticsSchema)
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("dashboard/get-user-statistics")
      .json<{ result: v.InferOutput<typeof UserStatisticsSchema> }>();

    return res.result;
  });

export const getUnitDetails = authed
  .route({
    method: "GET",
    path: "/dashboard/unit-details",
    summary: "Get unit details",
    tags: ["dashboard"],
  })
  .input(v.object({ unitId: v.number(), lang: LocaleSchema }))
  .output(UnitContractSchema)
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("dashboard/get-unit-details", {
        searchParams: {
          unit_id: input.unitId,
          lang: input.lang,
        },
      })
      .json<v.InferOutput<typeof UnitContractSchema>>();

    return res;
  });

export default {
  userTransferMethodsList: getUserTransferMethods,
  userStatistics: getUserStatistics,
  unitDetails: getUnitDetails,
};
