import { ORPCError, os } from "@orpc/server";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const requiredAuthMiddleware = os
  .$context<{ authToken?: string }>()
  .middleware(async ({ context, next }) => {
    /**
     * Why we should ?? here?
     * Because it can avoid `getSession` being called when unnecessary.
     * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
     */
    const authToken =
      context.authToken ?? (await getCookie("authToken", { cookies }));

    if (!authToken) {
      throw new ORPCError("UNAUTHORIZED");
    }

    return next({
      context: { authToken },
    });
  });
