"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { CalendarIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import type * as v from "valibot";

import contractImage from "@/app/[locale]/assets/images/contract.gif";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { contractSchema } from "@/schema/contract";

import { createContractAction } from "../actions/create-contract";

function Contract() {
  const formatter = useFormatter();
  const t = useTranslations("contract");

  const form = useForm<v.InferOutput<typeof contractSchema>>({
    resolver: valibotResolver(contractSchema),
    defaultValues: {
      landlord_phone: "",
      tenant_phone: "",
      unit_description: "",
      unit_area: "",
      rent_amount: "",
      insurance_amount: "",
      contract_period_in_months: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createContractAction(data);

    if (res.type === "success" && res.data.url) {
      window.location.href = res.data.url;
    }
    if (res.type === "error" && res.error.message) {
      toast({
        title: "Error",
        description: res.error.message ?? "Something went wrong",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
  });

  return (
    <div className="pt-20">
      <div className="container mx-auto grid px-4 md:grid-cols-3 xl:max-w-5xl">
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="mt-10 text-7xl font-medium text-slate-800">
            {t("title")}
          </h3>
          <p className="mt-6 max-w-lg text-2xl text-slate-600">
            {t("description")}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Image src={contractImage} alt="" />
        </div>
      </div>
      <Card className="container mx-auto xl:max-w-5xl">
        <CardContent className="mt-6">
          <Form {...form}>
            <form onSubmit={onSubmit} encType="multipart/form-data">
              <fieldset className="flex flex-col gap-6">
                <h3 className="text-2xl font-medium">{t("personal-info")}</h3>
                <div className="grid gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="landlord_identity_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.landlord-identity-image.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e.target.files?.[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tenant_identity_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.tenant-identity-image.label")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e.target.files?.[0]);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="landlord_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.landlord-phone.label")}
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tenant_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fields.tenant-phone.label")}</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </fieldset>

              <Separator className="my-6" />
              <fieldset className="flex flex-col gap-6">
                <h3 className="text-2xl font-medium">
                  {t("unit-description")}
                </h3>

                <div className="grid gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="unit_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.unit-description.label")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unit_area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fields.unit-area.label")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contract_period_in_months"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.contract-duration.label")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contract_start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.contract-start-date.label")}
                        </FormLabel>
                        <Popover>
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
                                  <span>
                                    {t(
                                      "fields.contract-start-date.placeholder",
                                    )}
                                  </span>
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
                              // disabled={(date) => startOfDay(date) < startOfToday()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="purpose_of_renting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("fields.renting-purpose.label")}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Residential">
                              {t("fields.renting-purpose.residential")}
                            </SelectItem>
                            <SelectItem value="Administrative">
                              {t("fields.renting-purpose.administrative")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rent_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fields.rent-amount.label")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="insurance_amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("fields.insurance-amount.label")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={onSubmit} disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : null}{" "}
            {t("create-contract")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Contract;
