import { useState } from "react";

import Container from "@/components/ui/container";
import { Step, Stepper } from "@/components/ui/stepper";

import { StepForm } from "./step-form";
import { createFormStore } from "./stepper-form-store";
import { type TStep } from "./types";

type ServiceForms = {
  steps: Array<TStep>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onNextStep?: (index: number) => void;
};

export function ServiceForms({ steps, onSubmit, onNextStep }: ServiceForms) {
  const [useFormStore] = useState(() => createFormStore(steps));

  return (
    <Container className="mt-16 flex w-full flex-col gap-4 xl:max-w-2xl">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label} label={stepProps.label}>
            <StepForm
              step={stepProps}
              useFormStore={useFormStore}
              onSubmit={onSubmit}
              onNextStep={onNextStep}
            />
          </Step>
        ))}
      </Stepper>
    </Container>
  );
}
