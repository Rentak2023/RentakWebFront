"use client";
import { useState } from "react";

import { Step, Stepper } from "@/components/ui/stepper";

import { StepForm } from "./step-form";
import { createFormStore } from "./stepper-form-store";
import { type TStep } from "./types";

type ServiceForms = {
  steps: Array<TStep>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
};

export function ServiceForms({ steps, onSubmit }: ServiceForms) {
  const [useFormStore] = useState(() => createFormStore(steps));

  return (
    <div className="mx-auto mt-16 flex w-full max-w-xl flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label} label={stepProps.label}>
            <StepForm
              step={stepProps}
              useFormStore={useFormStore}
              onSubmit={onSubmit}
            />
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
