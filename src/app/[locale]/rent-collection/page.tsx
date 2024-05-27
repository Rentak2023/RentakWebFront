"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  type BaseSchema,
  email,
  minLength,
  object,
  type ObjectSchema,
  string,
} from "valibot";
import { create } from "zustand";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Step, Stepper, useStepper } from "@/components/ui/stepper";
import { toast } from "@/components/ui/use-toast";

type WizardFormData = {
  username?: string;
  email?: string;
  tenantName?: string;
  tenantEmail?: string;
};

type Store = {
  formData: WizardFormData;
  getFormData: () => WizardFormData;

  actions: {
    updateFormData: (newData: Partial<WizardFormData>) => void;
  };
};

const useFormStore = create<Store>((set, get) => ({
  formData: {},
  getFormData: () => get().formData,
  actions: {
    updateFormData: (newData: Partial<FormData>) => {
      set((state) => ({ formData: { ...state.formData, ...newData } }));
    },
  },
}));

type TStep = {
  label: string;
  fields: Array<Field>;
};

export default function RentCollection() {
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Collection</h1>

        <StepperDemo />
      </div>
    </main>
  );
}

const steps: Array<TStep> = [
  {
    label: "Profile Info",
    fields: [
      {
        name: "username",
        label: "Username",
        type: "text",
        description: "This is your username",
        schema: string([minLength(1, "Username is required")]),
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        schema: string([email("A valid email address is required")]),
      },
    ],
  },
  {
    label: "Tenant Info",
    fields: [
      {
        name: "tenantName",
        label: "Tenant Name",
        type: "text",
        schema: string([minLength(1, "Tenant name is required")]),
      },
      {
        name: "tenantEmail",
        label: "Tenant Email",
        type: "email",
        schema: string([email("A valid email address is required")]),
      },
    ],
  },
  // { label: "Payment method" },
  // { label: "Unit description" },
  // { label: "Confirmation" },
];

function StepperDemo() {
  return (
    <div className="mt-16 flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label}>
            <StepForm fields={stepProps.fields} />
          </Step>
        ))}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

type Field = {
  name: keyof WizardFormData;
  label: string;
  type: string;
  description?: string;
  schema: BaseSchema;
};

type StepFormProps = {
  fields: Array<Field>;
};

const createSchema = (
  fields: Array<Field>,
): ObjectSchema<Partial<Record<keyof WizardFormData, BaseSchema>>> => {
  // eslint-disable-next-line unicorn/no-array-reduce
  const schemaFields = fields.reduce<
    Partial<Record<keyof WizardFormData, BaseSchema>>
  >((acc, field) => {
    acc[field.name] = field.schema;
    return acc;
  }, {});

  return object(schemaFields);
};

function StepForm({ fields }: StepFormProps) {
  const { nextStep, isLastStep } = useStepper();
  const schema = useMemo(() => createSchema(fields), [fields]);

  const {
    formData,
    getFormData,
    actions: { updateFormData },
  } = useFormStore();

  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues:
      // eslint-disable-next-line unicorn/no-array-reduce
      fields.reduce<Partial<WizardFormData>>((acc, field) => {
        acc[field.name] = formData[field.name];
        return acc;
      }, {}),
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log("isLastStep", isLastStep);
    updateFormData(data);

    if (isLastStep) {
      console.log(getFormData());

      // TODO: Submit form
      return;
    }
    nextStep();
    toast({
      title: "Step submitted!",
    });
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        {fields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  <Input type={formField.type} {...field} />
                </FormControl>
                {formField.description ? (
                  <FormDescription>{formField.description}</FormDescription>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm">
            {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper with Form</Button>
    </div>
  );
}
