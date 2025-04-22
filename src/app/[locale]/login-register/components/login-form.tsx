"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { isDefinedError, onError, onSuccess } from "@orpc/client";
import { useServerAction } from "@orpc/react/hooks";
import { useQueryClient } from "@tanstack/react-query";
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
import { useRouter } from "@/i18n/routing";
import { userLoggedInQuery } from "@/queries/user";
import { loginSchema } from "@/schemas/auth";
import { reSendOTP, verifyOTP } from "@/services/auth";

import { login } from "../actions";
import { OTPVerificationForm } from "./otp-verification-form";

export function LoginForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const queryCLient = useQueryClient();
  const form = useForm({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { execute } = useServerAction(login, {
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
            message: t("errors.login-failed"),
          });
        }
      }),
    ],
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await execute({
      values: { phone: data.phone },
      lang: locale,
    });
  });

  const handleVerify = async (otp: string) => {
    if (!userId) return;
    await verifyOTP({ userId, otp }, locale);
    await queryCLient.invalidateQueries(userLoggedInQuery);
    router.push("/dashboard");
  };

  const handleResendOTP = async () => {
    if (!userId) return;
    await reSendOTP({ user_id: userId }, locale);
  };

  if (isVerifying) {
    return (
      <OTPVerificationForm onVerify={handleVerify} onResend={handleResendOTP} />
    );
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
