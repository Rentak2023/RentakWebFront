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
import { reSendOTP, signUp, verifyOTP } from "@/services/auth";

import { signUpSchema } from "../schemas";
import { OTPVerificationForm } from "./otp-verification-form";

export function SignUpForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setIsSubmitting(true);
      setError(null);
      const response = await signUp({ ...data, lang: "en" });
      if (response.success) {
        setUserId(response.user_id);
        setIsVerifying(true);
      }
    } catch {
      setError(t("errors.signup-failed"));
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
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.full-name.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("fields.full-name.placeholder")}
                  className="mt-2"
                  {...field}
                />
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
                <Input
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  dir="ltr"
                  className="mt-2"
                  {...field}
                />
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
                <Input
                  type="tel"
                  placeholder={t("fields.phone.placeholder")}
                  dir="ltr"
                  className="mt-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? t("states.creating-account") : t("cta.sign-up")}
        </Button>
      </form>
    </Form>
  );
}
