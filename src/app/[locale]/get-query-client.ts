// app/get-query-client.ts
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // per default, only successful Queries are included,
        // this includes pending Queries as well
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query)
          || query.state.status === "pending",
        shouldRedactErrors: () => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
    },
  });
}
