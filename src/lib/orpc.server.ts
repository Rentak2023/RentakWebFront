"server only";

import { createRouterClient } from "@orpc/server";

import { router } from "@/router";

globalThis.$client = createRouterClient(router, {
  interceptors: [],
});
