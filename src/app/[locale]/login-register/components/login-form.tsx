"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { InferOutput } from "valibot";

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
import { type AuthError, login, reSendOTP, verifyOTP } from "@/services/auth";

import { loginSchema } from "../schemas";
import { OTPVerificationForm } from "./otp-verification-form";

export function LoginForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const queryCLient = useQueryClient();

  const form = useForm<InferOutput<typeof loginSchema>>({
    resolver: standardSchemaResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setError(null);
      const response = await login({ phone_number: data.phone }, locale);
      if (response.success) {
        setUserId(response.user_id);
        setIsVerifying(true);
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json<AuthError>();
        setError(responseData.message);
        return;
      }
      setError(t("errors.login-failed"));
    }
  });

  const handleVerify = async (otp: string) => {
    if (!userId) return;
    setError(null);
    await verifyOTP({ userId, otp }, locale);
    await queryCLient.invalidateQueries(userLoggedInQuery);
    router.push("/dashboard");
  };

  const handleResendOTP = async () => {
    if (!userId) return;
    setError(null);
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
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
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
