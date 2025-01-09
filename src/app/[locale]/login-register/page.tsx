"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { login, reSendOTP, signUp, verifyOTP } from "@/services/auth";

const loginSchema = v.object({
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
});

const otpSchema = v.object({
  otp: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("OTP is required"),
    v.minLength(4, "OTP must be at least 4 digits"),
  ),
});

const signUpSchema = v.object({
  full_name: v.string(),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Email is required"),
    v.email("A valid email address is required"),
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
});

function OTPVerificationForm({
  onVerify,
  onResend,
}: {
  onVerify: (otp: string) => void;
  onResend: () => void;
}) {
  const t = useTranslations("auth");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<v.InferOutput<typeof otpSchema>>({
    resolver: valibotResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendTimer, isResendDisabled]);

  const handleResend = () => {
    try {
      setError(null);
      setIsResendDisabled(true);
      setResendTimer(30);
      onResend();
    } catch {
      setError(t("errors.resend-otp-failed"));
    }
  };

  const onSubmit = form.handleSubmit((data) => {
    try {
      setIsSubmitting(true);
      setError(null);
      onVerify(data.otp);
    } catch {
      setError(t("errors.invalid-otp"));
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">{t("titles.verify-otp")}</h2>
          <p className="text-muted-foreground text-sm">
            {t("messages.otp-sent")}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.otp.label")}</FormLabel>
              <FormControl>
                <InputOTP maxLength={4} className="mt-4" {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex flex-col gap-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("states.verifying") : t("cta.verify-otp")}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isResendDisabled}
            onClick={handleResend}
          >
            {isResendDisabled
              ? `${t("cta.resend-otp")} (${resendTimer}s)`
              : t("cta.resend-otp")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function LoginForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<v.InferOutput<typeof loginSchema>>({
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

function SignUpForm() {
  const t = useTranslations("auth");
  const [isVerifying, setIsVerifying] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<v.InferOutput<typeof signUpSchema>>({
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

function LoginRegisterPage() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 xl:max-w-5xl">
        <Tabs defaultValue="login" className="mx-auto mt-8 max-w-xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardContent className="pt-6">
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardContent className="pt-6">
                <SignUpForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginRegisterPage;
