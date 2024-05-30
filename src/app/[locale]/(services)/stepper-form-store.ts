import { create } from "zustand";

import { type TFormData } from "./types";

type FormStore<BaseFormData extends TFormData> = {
  formData: BaseFormData;
  getFormData: () => BaseFormData;

  actions: {
    updateFormData: (newData: Partial<BaseFormData>) => void;
  };
};

export function createFormStore<FormData extends TFormData>(
  initialData: FormData,
) {
  return create<FormStore<FormData>>((set, get) => ({
    formData: initialData,
    getFormData: () => get().formData,
    actions: {
      updateFormData: (newData: Partial<FormData>) => {
        set((state) => ({ formData: { ...state.formData, ...newData } }));
      },
    },
  }));
}
