import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useLocale, useTranslations } from "next-intl";
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

import { useResendOTP, useVerifyOTP } from "../hooks";

type OTPVerificationFormProps = {
  userId: number;
};

export function OTPVerificationForm({ userId }: OTPVerificationFormProps) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const verifyOTP = useVerifyOTP({
    setError: (error) => {
      form.setError("root", {
        message: error,
      });
    },
  });

  const form = useForm({
    resolver: standardSchemaResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { resendOTP, isResendDisabled, resendTimer } = useResendOTP({
    setError: (error) => {
      form.setError("root", {
        message: error,
      });
    },
  });

  const handleResend = async () => {
    form.clearErrors();
    await resendOTP({
      userId: userId,
      lang: locale,
    });
  };

  const onSubmit = form.handleSubmit((data) => {
    return verifyOTP({ userId, otp: data.otp, lang: locale });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold">{t("titles.verify-otp")}</h2>
          <p className="text-sm text-slate-700">{t("messages.otp-sent")}</p>
        </div>

        {form.formState.errors.root?.message && (
          <Alert variant="destructive">
            <AlertDescription>
              {form.formState.errors.root.message}
            </AlertDescription>
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
