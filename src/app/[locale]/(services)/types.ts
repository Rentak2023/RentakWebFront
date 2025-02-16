import type { StandardSchemaV1 } from "@standard-schema/spec";
import {
  type HTMLInputAutoCompleteAttribute,
  type HTMLInputTypeAttribute,
} from "react";

export type Field = {
  name: string;
  label: string;
  description?: string;
  condition?: (data: Record<string, any>) => boolean;
  compute?: (data: Record<string, any>) => any;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
} & (
  | {
      kind: "select";
      options: Array<{ value: string; label: string; picture?: string }>;
    }
  | {
      kind: "checkbox";
    }
  | {
      kind: "date";
    }
  | {
      kind: "otp";
    }
  | {
      kind: "text";
      type: HTMLInputTypeAttribute;
      autoComplete?: HTMLInputAutoCompleteAttribute;
    }
)
  & (
    | {
        action: (data: Record<string, any>) => Promise<void>;
        actionText: string;
      }
    | {
        action?: never;
        actionText?: never;
      }
  );

export type TStep = {
  label: string;
  fields: Array<Field>;
  heading?: string;
  list?: Array<string>;
  schema: StandardSchemaV1<any, any>;
};
