import { queryOptions } from "@tanstack/react-query";

import { getUser, isLoggedIn } from "@/services/auth";

export const userQuery = queryOptions({
  queryKey: ["user"],
  queryFn: getUser,
  staleTime: 60 * 1000,
});

export const userLoggedInQuery = queryOptions({
  queryKey: ["user-logged-in"],
  queryFn: () => isLoggedIn(),
  staleTime: 60 * 1000,
});
