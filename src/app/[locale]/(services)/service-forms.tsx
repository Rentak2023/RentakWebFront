import { Step, Stepper } from "@/components/ui/stepper";

import { StepForm } from "./step-form";
import { type createFormStore } from "./stepper-form-store";
import { type TFormData, type TStep } from "./types";

type ServiceForms<BaseFormData extends TFormData> = {
  useFormStore: ReturnType<typeof createFormStore<BaseFormData>>;
  steps: Array<TStep<BaseFormData>>;
};

export function ServiceForms<BaseFormData extends TFormData>({
  useFormStore,
  steps,
}: ServiceForms<BaseFormData>) {
  return (
    <div className="mt-16 flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label} label={stepProps.label}>
            <StepForm fields={stepProps.fields} useFormStore={useFormStore} />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
