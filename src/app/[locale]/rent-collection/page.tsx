"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { type BaseSchema, email, minLength, object, string } from "valibot";
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

type Field<BaseFormData extends Record<string, string>> = {
  name: Extract<keyof BaseFormData, string>;
  label: string;
  type: string;
  description?: string;
  schema: BaseSchema;
};

type FormStore<BaseFormData extends Record<string, string>> = {
  formData: BaseFormData;
  getFormData: () => BaseFormData;

  actions: {
    updateFormData: (newData: Partial<BaseFormData>) => void;
  };
};

function createFormStore<FormData extends Record<string, string>>(
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

type TStep<BaseFormData extends Record<string, string>> = {
  label: string;
  fields: Array<Field<BaseFormData>>;
};

export default function RentCollection() {
  const [useWizardFormStore] = useState(() =>
    createFormStore<WizardFormData>({
      username: "",
      email: "",
      tenantName: "",
      tenantEmail: "",
    }),
  );

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-7xl font-semibold">Rent Collection</h1>

        <StepperDemo useFormStore={useWizardFormStore} />
      </div>
    </main>
  );
}

const steps: Array<TStep<WizardFormData>> = [
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

function StepperDemo({
  useFormStore,
}: {
  useFormStore: ReturnType<typeof createFormStore<WizardFormData>>;
}) {
  return (
    <div className="mt-16 flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps) => (
          <Step key={stepProps.label}>
            <StepForm fields={stepProps.fields} useFormStore={useFormStore} />
          </Step>
        ))}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

const createSchema = <BaseFormData extends Record<string, string>>(
  fields: Array<Field<BaseFormData>>,
) => {
  const schemaFields: Record<keyof BaseFormData, BaseSchema> = {} as any;

  for (const field of fields) {
    schemaFields[field.name] = field.schema;
  }

  const schema = object(schemaFields);

  return schema;
};

type StepFormProps<BaseFormData extends Record<string, string>> = {
  fields: Array<Field<BaseFormData>>;
  useFormStore: ReturnType<typeof createFormStore<BaseFormData>>;
};

function StepForm<BaseFormData extends Record<string, string>>({
  fields,
  useFormStore,
}: StepFormProps<BaseFormData>) {
  const { nextStep, isLastStep } = useStepper();
  const schema = useMemo(() => createSchema(fields), [fields]);

  const {
    formData,
    getFormData,
    actions: { updateFormData },
  } = useFormStore();

  const defaultValues = useMemo(() => {
    const defaults: Partial<BaseFormData> = {} as any;

    for (const field of fields) {
      defaults[field.name] = formData[field.name];
    }

    return defaults;
  }, [fields, formData]);

  const form = useForm({
    resolver: valibotResolver(schema),
    // @ts-expect-error the `defaultValues` is more complicated than our use case
    defaultValues,
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
            // @ts-expect-error `name` field is more complicated than our use case
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
          <Button size="sm" type="submit">
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
