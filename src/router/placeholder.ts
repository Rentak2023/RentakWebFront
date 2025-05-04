import * as v from "valibot";

import { blurhashFromURL } from "@/lib/placeholder";
import { pub } from "@/orpc";

const PlaceholderSchema = v.object({
  encoded: v.string(),
  width: v.number(),
  height: v.number(),
});

export const blurhash = pub
  .route({
    method: "GET",
    path: "/placeholder",
    summary: "Get placeholder",
    tags: ["placeholder"],
  })
  .input(
    v.object({
      url: v.string(),
    }),
  )
  .output(PlaceholderSchema)
  .handler(async ({ input }) => {
    return blurhashFromURL(input.url);
  });

export default {
  blurhash,
};
