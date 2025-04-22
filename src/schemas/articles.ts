import * as v from "valibot";

export const ArticleSchema = v.object({
  id: v.number(),
  title: v.string(),
  description: v.string(),
  author: v.string(),
  picture: v.string(),
  slug: v.string(),
  meta_description: v.string(),
  meta_keywords: v.nullable(v.string()),
  created: v.string(),
});
