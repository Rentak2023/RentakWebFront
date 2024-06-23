import { valibotResolver } from "@hookform/resolvers/valibot";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CalendarIcon, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { type createFormStore } from "./stepper-form-store";
import { type Field, type TStep } from "./types";

type StepFormProps = {
  step: TStep;
  useFormStore: ReturnType<typeof createFormStore>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
};

export function StepForm({ useFormStore, step, onSubmit }: StepFormProps) {
  const { nextStep, isLastStep, prevStep } = useStepper();

  const {
    formData,
    getFormData,
    actions: { updateFormData },
  } = useFormStore();

  const defaultValues = useMemo(() => {
    const defaults: Partial<typeof formData> = {} as any;

    for (const field of step.fields) {
      defaults[field.name] = formData[field.name];
    }

    return defaults;
  }, [step.fields, formData]);

  const form = useForm({
    resolver: valibotResolver(step.schema),
    defaultValues,
  });

  const currentValues = useWatch({ control: form.control });

  const filteredFields = useMemo(() => {
    return step.fields.filter(
      (field) =>
        !field.condition || field.condition({ ...formData, ...currentValues }),
    );
  }, [step.fields, formData, currentValues]);

  const handleSubmit = form.handleSubmit(async (data) => {
    updateFormData(data);

    if (isLastStep) {
      const formData = getFormData();
      await onSubmit(formData);

      toast({
        title: "Form submitted!",
      });

      // TODO: Submit form

      return;
    }
    nextStep();
    toast({
      title: "Step submitted!",
    });
  });

  const handlePrevStep = () => {
    updateFormData(currentValues);
    prevStep();
  };

  return (
    <Card>
      {step.heading ? (
        <CardHeader>
          {step.heading ? (
            <CardTitle className="text-2xl font-semibold">
              Acknowledgment And Commitment
            </CardTitle>
          ) : null}
          {step.list ? (
            <ul className="mt-6 list-disc">
              {step.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </CardHeader>
      ) : null}
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
                    <StepField formField={formField} field={field} />
                    {formField.description ? (
                      <FormDescription>{formField.description}</FormDescription>
                    ) : null}
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

function StepField({
  formField,
  field,
}: {
  formField: Field;
  field: ControllerRenderProps<Partial<Record<string, any>>, string>;
}) {
  switch (formField.kind) {
    case "select": {
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={formField.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {formField.options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      );
    }
    case "checkbox": {
      return (
        <div>
          <FormControl className="me-2">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>{formField.label}</FormLabel>
          {formField.description ? (
            <FormDescription>{formField.description}</FormDescription>
          ) : null}
        </div>
      );
    }
    case "date": {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "flex w-full ps-3 text-start font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
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
    case "text": {
      return (
        <FormControl>
          <Input type={formField.type} {...field} />
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

  const {
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();

  const form = useFormContext();

  const submitMessage = form.formState.isSubmitting
    ? t("submitting")
    : t("submit");

  return (
    <div className="flex w-full justify-between">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          {t("reset")}
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep}
            onClick={onPrevStep}
            size="sm"
            variant="outline"
            type="button"
          >
            <ArrowLeft className="me-2 size-4 rtl:rotate-180" />
            {t("previous")}
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : null}

            {isLastStep
              ? submitMessage
              : isOptionalStep
                ? t("skip")
                : t("next")}
            {!isLastStep && !isOptionalStep && (
              <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
            )}
          </Button>
        </>
      )}
    </div>
  );
}
