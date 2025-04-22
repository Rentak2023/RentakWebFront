import { os } from "@orpc/server";
import ky, { type KyInstance } from "ky";

import { requiredAuthMiddleware } from "./middlewares/auth";
import { GenericErrorSchema, ValidationErrorSchema } from "./schemas/common";

const base = os.errors({
  VALIDATION_ERROR: {
    data: ValidationErrorSchema,
  },
  GENERIC_ERROR: {
    data: GenericErrorSchema,
  },
  UNAUTHORIZED: {},
});

export const pub = base
  .$context<{ fetcher?: KyInstance }>()
  .use(async ({ next, context }) => {
    const fetcher =
      context.fetcher
      ?? ky.create({
        prefixUrl: process.env.NEXT_PUBLIC_APP_API_URL,
        timeout: 90_000,
      });

    return next({
      context: {
        fetcher,
      },
    });
  });

export const authed = base
  .$context<{ fetcher?: KyInstance }>()
  .use(requiredAuthMiddleware)
  .use(async ({ next, context }) => {
    const fetcher =
      context.fetcher
      ?? ky.create({
        prefixUrl: process.env.NEXT_PUBLIC_APP_API_URL,
        timeout: 90_000,
        hooks: {
          beforeRequest: [
            (req) => {
              req.headers.set("Authorization", `Bearer ${context.authToken}`);
            },
          ],
        },
      });

    return next({
      context: {
        fetcher: fetcher,
      },
    });
  });
