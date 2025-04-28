import * as v from "valibot";

export const ValidationErrorSchema = v.object({
  errors: v.record(v.string(), v.array(v.string())),
  title: v.string(),
});

export const GenericErrorSchema = v.object({
  message: v.string(),
});

export const LocaleSchema = v.picklist(["en", "ar"]);
