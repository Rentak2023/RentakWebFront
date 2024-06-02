import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { type BaseSchema, object } from "valibot";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStepper } from "@/components/ui/stepper";
import { toast } from "@/components/ui/use-toast";

import { type createFormStore } from "./stepper-form-store";
import { type Field } from "./types";

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

export function StepForm<BaseFormData extends Record<string, string>>({
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

  const currentValues = useWatch({ control: form.control });

  const filteredFields = useMemo(() => {
    return fields.filter(
      (field) =>
        !field.condition || field.condition({ ...formData, ...currentValues }),
    );
  }, [fields, formData, currentValues]);

  const onSubmit = form.handleSubmit((data) => {
    console.log("isLastStep", isLastStep);
    updateFormData(data);

    if (isLastStep) {
      console.log(getFormData());

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

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        {filteredFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            // @ts-expect-error `name` field is more complicated than our use case
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                <FormControl>
                  {formField.kind === "select" ? (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  ) : (
                    <Input type={formField.type} {...field} />
                  )}
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
