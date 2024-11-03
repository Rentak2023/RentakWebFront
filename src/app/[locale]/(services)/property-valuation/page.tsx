"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import type * as v from "valibot";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { bookCallSchema } from "@/schema/book-call";

import { bookCallAction } from "../../actions/book-call";

export default function PropertyValuation() {
  const t = useTranslations("services");
  const { toast } = useToast();
  const locale = useLocale();
  const form = useForm<v.InferOutput<typeof bookCallSchema>>({
    resolver: valibotResolver(bookCallSchema),
    defaultValues: {
      email_address: "",
      full_name: "",
      phone_number: "",
      description: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await bookCallAction(
      data,
      locale === "en" ? "en" : "ar",
      "property-valuation",
    );

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
    <main className="pt-32">
      <div className="mx-auto max-w-7xl text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-4xl text-balance text-5xl font-medium tracking-tight text-slate-900 sm:text-6xl">
          {t("property-valuation.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg tracking-tight text-slate-700">
          {t("property-valuation.description")}
        </p>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mx-auto mt-8 xl:max-w-xl">
          <CardContent className="mt-6">
            <Form {...form}>
              <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.full-name.label")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.phone-number.label")}</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fields.email-address.label")}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("fields.unit-description.label")}
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={onSubmit} disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}{" "}
              {t("actions.submit")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
