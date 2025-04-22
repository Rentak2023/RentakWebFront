import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { HTTPError } from "ky";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchema } from "@/schemas/auth";
import { type AuthError } from "@/services/auth";

type OTPVerificationFormProps = {
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
};

export function OTPVerificationForm({
  onVerify,
  onResend,
}: OTPVerificationFormProps) {
  const t = useTranslations("auth");
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: standardSchemaResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const isResendDisabled = resendTimer > 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0 && isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [resendTimer, isResendDisabled]);

  const handleResend = async () => {
    try {
      setError(null);
      setResendTimer(30);
      await onResend();
    } catch {
      setError(t("errors.resend-otp-failed"));
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setError(null);
      await onVerify(data.otp);
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json<AuthError>();
        setError(responseData.message);
        return;
      }
      setError(t("errors.invalid-otp"));
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">{t("titles.verify-otp")}</h2>
          <p className="text-sm text-slate-700">{t("messages.otp-sent")}</p>
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? t("states.verifying")
              : t("cta.verify-otp")}
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
