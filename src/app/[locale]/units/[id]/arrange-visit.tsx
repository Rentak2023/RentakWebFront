"use client";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { startOfDay, startOfToday } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import type * as v from "valibot";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { arrangeVisitSchema } from "@/schema/arrange-visit";

import { arrangeVisitAction } from "../../actions/arrange-visit";

type ArrangeVisitProps = {
  unitId: number;
};

export function ArrangeVisit({ unitId }: ArrangeVisitProps) {
  const form = useForm<v.InferOutput<typeof arrangeVisitSchema>>({
    resolver: standardSchemaResolver(arrangeVisitSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });
  const formatter = useFormatter();
  const t = useTranslations("units");
  const locale = useLocale();
  const { toast } = useToast();

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await arrangeVisitAction(data, unitId, locale);
    if (res.type === "success") {
      toast({
        title: "Success",
        description: res.data.message,
      });
    } else {
      toast({
        title: "Error",
        description: res.error.message ?? "Something went wrong",
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button className="flex-1">{t("requestATour")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("arrange-visit.title")}</DialogTitle>
          <DialogDescription>
            {t("arrange-visit.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.date.label")}</FormLabel>
                  <Popover modal>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          type="button"
                          className={cn(
                            "flex w-full ps-3 text-start font-normal",
                            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                            !field.value && "text-slate-600",
                          )}
                        >
                          {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                          {field.value ? (
                            formatter.dateTime(field.value, {
                              dateStyle: "long",
                            })
                          ) : (
                            <span>{t("fields.date.placeholder")}</span>
                          )}
                          <CalendarIcon className="ms-auto size-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                    </FormControl>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => startOfDay(date) < startOfToday()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.name.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.phone.label")}</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("fields.message.label")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : null}
                {t("fields.submit")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
