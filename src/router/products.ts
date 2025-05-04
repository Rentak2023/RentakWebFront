import * as v from "valibot";

import { pub } from "@/orpc";

const productSchema = v.object({
  id: v.number(),
  fees: v.number(),
  product_name_ar: v.string(),
  product_name_en: v.string(),
});

export const productsList = pub
  .route({
    method: "GET",
    path: "/products",
    summary: "List all products",
    tags: ["products"],
  })
  .output(v.array(productSchema))
  .handler(async ({ context }) => {
    const res = await context.fetcher
      .get("api/Product/get-all-products")
      .json<{ data: Array<v.InferOutput<typeof productSchema>> }>();

    return res.data;
  });

export const findProduct = pub
  .route({
    method: "GET",
    path: "/product",
    summary: "Get product by id",
    tags: ["products"],
  })
  .input(v.object({ id: v.number() }))
  .output(productSchema)
  .handler(async ({ input, context }) => {
    const res = await context.fetcher
      .get("api/Product/get-product-by-id", {
        searchParams: {
          id: input.id,
        },
      })
      .json<{ data: v.InferOutput<typeof productSchema> }>();

    return res.data;
  });

export default {
  list: productsList,
  find: findProduct,
};
