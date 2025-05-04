"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { isDefinedError } from "@orpc/client";
import { useMutation } from "@tanstack/react-query";
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
import { orpc } from "@/lib/orpc";
import { LoginSchema } from "@/schemas/auth";

import { OTPVerificationForm } from "./otp-verification-form";

export function LoginForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const locale = useLocale();
  const form = useForm({
    resolver: standardSchemaResolver(LoginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const loginMutation = useMutation(
    orpc.auth.login.mutationOptions({
      onSuccess: (data) => {
        setUserId(data.user_id);
        setIsVerifying(true);
      },
      onError: (error) => {
        if (isDefinedError(error) && error.code === "GENERIC_ERROR") {
          form.setError("root", {
            message: error.data.message,
          });
        } else {
          form.setError("root", {
            message: t("errors.login-failed"),
          });
        }
      },
    }),
  );

  const onSubmit = form.handleSubmit((data) => {
    return loginMutation.mutateAsync({
      values: { phone: data.phone },
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.phone.label")}</FormLabel>
              <FormControl>
                <Input type="tel" className="mt-2" dir="ltr" {...field} />
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
            ? t("states.sending-otp")
            : t("cta.login")}
        </Button>
      </form>
    </Form>
  );
}
