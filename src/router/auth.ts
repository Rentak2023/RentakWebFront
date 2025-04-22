import type * as v from "valibot";

import { UserSchema } from "@/schemas/auth";

import { authed } from "../orpc";

export const me = authed
  .route({
    method: "GET",
    path: "/auth/me",
    summary: "Get the current user",
    tags: ["auth"],
  })
  .output(UserSchema)
  .handler(async ({ context }) => {
    return context.fetcher
      .get("auth/get-user")
      .json<v.InferOutput<typeof UserSchema>>();
  });

export default { me };
