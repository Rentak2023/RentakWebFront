"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
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
import { type AuthError, reSendOTP, signUp, verifyOTP } from "@/services/auth";

import { signUpSchema } from "../schemas";
import { OTPVerificationForm } from "./otp-verification-form";

export function SignUpForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();

  const form = useForm<InferOutput<typeof signUpSchema>>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setError(null);
      const response = await signUp(data, locale);
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
      setError(t("errors.signup-failed"));
    }
  });

  const handleVerify = async (otp: string) => {
    if (!userId) return;
    setError(null);
    await verifyOTP({ userId, otp }, locale);
    // Handle successful verification (e.g., redirect)
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
