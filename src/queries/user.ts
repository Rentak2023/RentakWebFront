import { queryOptions } from "@tanstack/react-query";
import { hasCookie } from "cookies-next/client";

import { getUser } from "@/services/auth";

export const userQuery = queryOptions({
  queryKey: ["user"],
  queryFn: getUser,
  staleTime: 60 * 1000,
});

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const userLoggedInQuery = queryOptions({
  queryKey: ["user-logged-in"],
  queryFn: () => hasCookie("authToken"),
});
