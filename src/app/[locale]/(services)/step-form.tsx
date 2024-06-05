import { valibotResolver } from "@hookform/resolvers/valibot";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { type BaseSchema } from "valibot";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { type Field } from "./types";

type StepFormProps = {
  fields: Array<Field>;
  useFormStore: ReturnType<typeof createFormStore>;
  schema: BaseSchema;
};

export function StepForm({ fields, useFormStore, schema }: StepFormProps) {
  const { nextStep, isLastStep } = useStepper();

  const {
    formData,
    getFormData,
    actions: { updateFormData },
  } = useFormStore();

  const defaultValues = useMemo(() => {
    const defaults: Partial<typeof formData> = {} as any;

    for (const field of fields) {
      defaults[field.name] = formData[field.name];
    }

    return defaults;
  }, [fields, formData]);

  const form = useForm({
    resolver: valibotResolver(schema),
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
            name={formField.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{formField.label}</FormLabel>
                {formField.kind === "select" ? (
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                ) : formField.kind === "date" ? (
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
                ) : (
                  <FormControl>
                    <Input type={formField.type} {...field} />
                  </FormControl>
                )}
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
