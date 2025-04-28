"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { isDefinedError, onError, onSuccess } from "@orpc/client";
import { useServerAction } from "@orpc/react/hooks";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas/auth";

import { signUp } from "../actions";
import { OTPVerificationForm } from "./otp-verification-form";

export function SignUpForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const locale = useLocale();

  const form = useForm({
    resolver: standardSchemaResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  const { execute } = useServerAction(signUp, {
    interceptors: [
      onSuccess((data) => {
        if (data?.success) {
          setUserId(data.user_id);
          setIsVerifying(true);
        }
      }),
      onError((error) => {
        if (isDefinedError(error) && error.code === "GENERIC_ERROR") {
          form.setError("root", {
            message: error.data.message,
          });
        } else {
          form.setError("root", {
            message: t("errors.signup-failed"),
          });
        }
      }),
    ],
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await execute({
      values: data,
      lang: locale,
    });
  });

  if (isVerifying && userId) {
    return <OTPVerificationForm userId={userId} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {form.formState.errors.root?.message && (
          <Alert variant="destructive">
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.full-name.label")}</FormLabel>
              <FormControl>
                <Input className="mt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.email.label")}</FormLabel>
              <FormControl>
                <Input type="email" dir="ltr" className="mt-2" {...field} />
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
                <Input type="tel" dir="ltr" className="mt-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-2"
        >
          {form.formState.isSubmitting
            ? t("states.creating-account")
            : t("cta.sign-up")}
        </Button>
      </form>
    </Form>
  );
}
