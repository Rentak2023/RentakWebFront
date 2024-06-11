import { type HTMLInputTypeAttribute } from "react";
import { type BaseSchema } from "valibot";

export type Field = {
  name: string;
  label: string;
  description?: string;
  condition?: (data: Record<string, any>) => boolean;
  placeholder?: string;
} & (
  | {
      kind: "select";
      options: Array<{ value: string; label: string }>;
    }
  | {
      kind: "checkbox";
    }
  | {
      kind: "date";
    }
  | {
      kind: "text";
      type: HTMLInputTypeAttribute;
    }
);

export type TStep = {
  label: string;
  fields: Array<Field>;
  heading?: string;
  list?: Array<string>;
  schema: BaseSchema;
};
