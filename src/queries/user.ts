import { queryOptions } from "@tanstack/react-query";
import { hasCookie } from "cookies-next/client";

export const userLoggedInQuery = queryOptions({
  queryKey: ["user-logged-in"],
  queryFn: () => hasCookie("authToken"),
});
