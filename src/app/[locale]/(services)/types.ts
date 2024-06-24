import { type HTMLInputTypeAttribute } from "react";
import type * as v from "valibot";

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
      kind: "otp";
      verifiable?: false;
    }
  | {
      kind: "otp";
      verifiable?: true;
      verify: (data: Record<string, any>) => Promise<void>;
    }
  | {
      kind: "text";
      type: HTMLInputTypeAttribute;
      verifiable?: false;
    }
  | {
      kind: "text";
      type: HTMLInputTypeAttribute;
      verifiable: true;
      verify: (data: Record<string, any>) => Promise<void>;
    }
);

export type TStep = {
  label: string;
  fields: Array<Field>;
  heading?: string;
  list?: Array<string>;
  schema: v.GenericSchema;
};
