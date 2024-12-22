import { queryOptions } from "@tanstack/react-query";

import { getAllProducts, getProduct } from "@/services/products";

export const productsQuery = queryOptions({
  queryKey: ["products", "list"],
  queryFn: getAllProducts,
  staleTime: Infinity,
});

export const productQuery = (id: number) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
