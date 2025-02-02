import { queryOptions } from "@tanstack/react-query";
import type { Locale } from "next-intl";

import { getHomepageArticles } from "@/services/articles";

export const homepageArticlesQuery = (locale: Locale) =>
  queryOptions({
    queryKey: ["articles", locale],
    queryFn: () => getHomepageArticles(locale),
    staleTime: Infinity,
  });
