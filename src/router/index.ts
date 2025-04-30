import { os } from "@orpc/server";

export const router = {
  auth: os.lazy(() => import("./auth")),
  units: os.lazy(() => import("./units")),
  articles: os.lazy(() => import("./articles")),
  banks: os.lazy(() => import("./banks")),
  locations: os.lazy(() => import("./locations")),
  paymentMethods: os.lazy(() => import("./payment-methods")),
  products: os.lazy(() => import("./products")),
  dashboard: os.lazy(() => import("./dashboard")),
};
