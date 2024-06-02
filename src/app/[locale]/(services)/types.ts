import { type HTMLInputTypeAttribute } from "react";
import { type BaseSchema } from "valibot";

export type TFormData = Record<string, string>;

export type Field<BaseFormData extends TFormData> = {
  name: Extract<keyof BaseFormData, string>;
  label: string;
  description?: string;
  schema: BaseSchema;
  condition?: (data: BaseFormData) => boolean;
  placeholder?: string;
} & (
  | {
      kind: "select";
      options: Array<{ value: string; label: string }>;
    }
  | {
      kind: "text";
      type: HTMLInputTypeAttribute;
    }
);

export type TStep<BaseFormData extends TFormData> = {
  label: string;
  fields: Array<Field<BaseFormData>>;
};
