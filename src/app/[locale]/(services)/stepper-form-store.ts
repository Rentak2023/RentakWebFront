import { create } from "zustand";

import { type TStep } from "./types";

type FormStore<T = Record<string, any>> = {
  formData: T;
  getFormData: () => T;

  actions: {
    updateFormData: (newData: Partial<T>) => void;
  };
};

export function createFormStore<T extends Array<TStep> = Array<TStep>>(
  steps: T,
) {
  const initialData = steps.reduce<Record<string, any>>((acc, step) => {
    return {
      ...acc,
      ...Object.fromEntries(step.fields.map((field) => [field.name, ""])),
    };
  }, {});

  return create<FormStore>((set, get) => ({
    formData: initialData,
    getFormData: () => get().formData,
    actions: {
      updateFormData: (newData) => {
        set((state) => ({ formData: { ...state.formData, ...newData } }));
      },
    },
  }));
}
