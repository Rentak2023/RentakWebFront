import * as v from "valibot";

import { blurhashFromURL } from "@/lib/placeholder";
import { pub } from "@/orpc";

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
  .output(v.nullable(v.string()))
  .handler(async ({ input }) => {
    try {
      const res = await blurhashFromURL(input.url);
      return res.encoded;
    } catch {
      return null;
    }
  });

export default {
  blurhash,
};
