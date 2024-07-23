import { queryOptions } from "@tanstack/react-query";

import {
  getCashInPaymentMethods,
  getCashOutPaymentMethods,
} from "@/services/payment-methods";

export const cashInPaymentMethodsQuery = queryOptions({
  queryKey: ["cash-in-payment-methods"],
  queryFn: getCashInPaymentMethods,
  staleTime: Infinity,
});

export const cashOutPaymentMethods = queryOptions({
  queryKey: ["cash-out-payment-methods"],
  queryFn: getCashOutPaymentMethods,
  staleTime: Infinity,
});
