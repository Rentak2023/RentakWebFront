import { Step, Stepper } from "@/components/ui/stepper";

import { StepForm } from "./step-form";
import { type createFormStore } from "./stepper-form-store";
import { type TStep } from "./types";

type ServiceForms = {
  useFormStore: ReturnType<typeof createFormStore>;
  steps: Array<TStep>;
};

export function ServiceForms({ useFormStore, steps }: ServiceForms) {
  return (
    <div className="mx-auto mt-16 flex w-full max-w-xl flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label} label={stepProps.label}>
            <StepForm
              fields={stepProps.fields}
              useFormStore={useFormStore}
              schema={stepProps.schema}
            />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
