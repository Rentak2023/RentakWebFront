"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTranslations } from "next-intl";
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
import { login, reSendOTP, verifyOTP } from "@/services/auth";

import { loginSchema } from "../schemas";
import { OTPVerificationForm } from "./otp-verification-form";

export function LoginForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<InferOutput<typeof loginSchema>>({
    resolver: valibotResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await login({ phone_number: data.phone, lang: "en" });
      if (response.success) {
        setUserId(response.user_id);
        setIsVerifying(true);
      }
    } catch {
      setError(t("errors.login-failed"));
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleVerify = async (otp: string) => {
    if (!userId) return;
    setError(null);
    await verifyOTP({ userId, otp, lang: "en" });
    // Handle successful verification (e.g., redirect)
  };

  const handleResendOTP = async () => {
    if (!userId) return;
    setError(null);
    await reSendOTP({ user_id: userId, lang: "en" });
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
                <Input
                  type="tel"
                  placeholder={t("fields.phone.placeholder")}
                  className="mt-2"
                  dir="ltr"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? t("states.sending-otp") : t("cta.login")}
        </Button>
      </form>
    </Form>
  );
}
