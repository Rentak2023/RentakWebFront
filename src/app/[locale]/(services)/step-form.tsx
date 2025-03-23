import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CalendarIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useId, useMemo } from "react";
import {
  type ControllerRenderProps,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStepper } from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

import { type createFormStore } from "./stepper-form-store";
import { type Field, type TStep } from "./types";

type StepFormProps = {
  step: TStep;
  useFormStore: ReturnType<typeof createFormStore>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onNextStep?: (index: number) => void;
};

export function StepForm({
  useFormStore,
  step,
  onNextStep,
  onSubmit,
}: StepFormProps) {
  const { nextStep, isLastStep, prevStep, activeStep } = useStepper();
  const {
    formData,
    getFormData,
    actions: { updateFormData },
    // eslint-disable-next-line react-compiler/react-compiler
  } = useFormStore();

  const defaultValues = useMemo(
    () =>
      step.fields.reduce<Partial<typeof formData>>((acc, field) => {
        acc[field.name] = formData[field.name];
        return acc;
      }, {}),
    [step.fields, formData],
  );

  const form = useForm({
    resolver: standardSchemaResolver(step.schema),
    defaultValues,
  });

  const currentValues = useWatch({ control: form.control });

  const filteredFields = useMemo(
    () =>
      step.fields.filter(
        (field) =>
          !field.condition
          || field.condition({ ...formData, ...currentValues }),
      ),
    [step.fields, formData, currentValues],
  );

  const handleSubmit = form.handleSubmit(async (data) => {
    const computedFields = Object.fromEntries(
      step.fields
        .filter(
          (
            field,
          ): field is Field & { compute: NonNullable<Field["compute"]> } =>
            !!field.compute,
        )
        .map((field) => [
          field.name,
          field.compute({ ...formData, ...currentValues }),
        ]),
    );

    updateFormData({ ...data, ...computedFields });

    onNextStep?.(activeStep);
    if (isLastStep) {
      return onSubmit(getFormData());
    }
    nextStep();
  });

  const handlePrevStep = () => {
    updateFormData(currentValues);
    prevStep();
  };

  return (
    <Card>
      {step.heading && (
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {step.heading}
          </CardTitle>
          {step.list && (
            <ul className="mt-6 list-disc">
              {step.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </CardHeader>
      )}
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <CardContent className={cn("space-y-6", !step.heading && "pt-6")}>
            {filteredFields.map((formField) => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem>
                    {formField.kind !== "checkbox" && (
                      <FormLabel>{formField.label}</FormLabel>
                    )}
                    <StepField
                      formField={formField}
                      field={field}
                      useFormStore={useFormStore}
                    />
                    {formField.description && (
                      <FormDescription>{formField.description}</FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter>
            <StepperFormActions onPrevStep={handlePrevStep} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

type StepFieldProps = {
  formField: Field;
  field: ControllerRenderProps<Partial<Record<string, any>>, string>;
  useFormStore: ReturnType<typeof createFormStore>;
};

function StepField({ formField, field, useFormStore }: StepFieldProps) {
  // eslint-disable-next-line react-compiler/react-compiler
  const { formData } = useFormStore();
  const form = useFormContext();
  const currentValues = useWatch({ control: form.control });
  const format = useFormatter();
  const id = useId();

  const actionMutation = useMutation({
    mutationFn: (data: Record<string, any>) =>
      formField.action ? formField.action(data) : Promise.resolve(),
  });

  useEffect(() => {
    if (formField.compute) {
      const computedValue = formField.compute({
        ...formData,
        ...currentValues,
      });
      form.setValue(formField.name, computedValue);
    }
  }, [
    formField.compute,
    formField.name,
    form,
    formData,
    currentValues,
    formField,
  ]);

  switch (formField.kind) {
    case "select": {
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={formField.disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={formField.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {formField.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-4">
                    {option.picture && (
                      <Image
                        src={option.picture}
                        className="object-contain"
                        alt=""
                        width={40}
                        height={40}
                      />
                    )}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      );
    }

    case "checkbox": {
      return (
        <div className="flex items-center gap-2">
          <FormControl>
            <Checkbox
              id={id}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={formField.disabled}
            />
          </FormControl>
          <FormLabel htmlFor={id}>{formField.label}</FormLabel>
        </div>
      );
    }

    case "date": {
      return (
        <Popover>
          <PopoverTrigger asChild disabled={formField.disabled}>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "flex w-full ps-3 text-start font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                {field.value ? (
                  format.dateTime(field.value, "long")
                ) : (
                  <span>{formField.placeholder}</span>
                )}
                <CalendarIcon className="ms-auto size-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              // disabled={(date) =>
              //   date > new Date() || date < new Date("1900-01-01")
              // }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    }

    case "otp": {
      return (
        <FormControl>
          <div className="flex items-center gap-2">
            <InputOTP
              maxLength={6}
              disabled={formField.disabled ?? actionMutation.isPending}
              placeholder={formField.placeholder}
              {...field}
            >
              <InputOTPGroup>
                {Array.from({ length: 4 }, (_, i) => i).map((n) => (
                  <InputOTPSlot key={n} index={n} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {formField.action && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  actionMutation.mutate({ ...formData, ...currentValues });
                }}
                disabled={actionMutation.isPending}
              >
                {actionMutation.isPending && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                {formField.actionText}
              </Button>
            )}
          </div>
        </FormControl>
      );
    }

    case "text": {
      return (
        <FormControl>
          <div className="flex items-center gap-2">
            <Input
              {...field}
              type={formField.type}
              disabled={formField.disabled ?? actionMutation.isPending}
              autoComplete={formField.autoComplete}
              placeholder={formField.placeholder}
              readOnly={formField.readonly}
              onKeyDown={(e) => {
                if (e.key === "Enter" && formField.action) {
                  e.preventDefault();
                  actionMutation.mutate({ ...formData, ...currentValues });
                }
              }}
            />
            {formField.action && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  actionMutation.mutate({ ...formData, ...currentValues });
                }}
                disabled={actionMutation.isPending}
              >
                {actionMutation.isPending ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : null}
                {formField.actionText}
              </Button>
            )}
          </div>
        </FormControl>
      );
    }
  }
}

type StepperFormActions = {
  onPrevStep: () => void;
};

function StepperFormActions({ onPrevStep }: StepperFormActions) {
  const t = useTranslations("services.actions");
  const { isLastStep, isOptionalStep } = useStepper();
  const form = useFormContext();

  const submitMessage = form.formState.isSubmitting
    ? t("submitting")
    : t("submit");

  return (
    <div className="flex w-full justify-between">
      <Button onClick={onPrevStep} variant="ghost" type="button">
        <ArrowLeft className="me-2 size-4 rtl:rotate-180" />
        {t("previous")}
      </Button>
      <Button
        type="submit"
        disabled={
          form.formState.isSubmitting || form.formState.isSubmitSuccessful
        }
      >
        {form.formState.isSubmitting && (
          <Loader2 className="mr-2 size-4 animate-spin" />
        )}
        {isLastStep ? submitMessage : isOptionalStep ? t("skip") : t("next")}
        {!isLastStep && !isOptionalStep && (
          <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
        )}
      </Button>
    </div>
  );
}
