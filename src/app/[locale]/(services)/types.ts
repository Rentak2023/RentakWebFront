import { type BaseSchema } from "valibot";

export type TFormData = Record<string, string>;

export type Field<BaseFormData extends TFormData> = {
  name: Extract<keyof BaseFormData, string>;
  label: string;
  type: string;
  description?: string;
  schema: BaseSchema;
};

export type TStep<BaseFormData extends TFormData> = {
  label: string;
  fields: Array<Field<BaseFormData>>;
};
