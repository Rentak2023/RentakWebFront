import { isDefinedError, onError, onStart, onSuccess } from "@orpc/client";
import { useServerAction } from "@orpc/react/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useRouter } from "@/i18n/routing";
import { userLoggedInQuery } from "@/queries/user";

import { resendOTP, verifyOTP } from "./actions";

type Props = {
  setError: (message: string) => void;
};

export function useVerifyOTP({ setError }: Props) {
  const t = useTranslations("auth");
  const queryCLient = useQueryClient();
  const router = useRouter();

  const { execute } = useServerAction(verifyOTP, {
    interceptors: [
      onSuccess(async () => {
        await queryCLient.invalidateQueries(userLoggedInQuery);
        router.push("/dashboard");
      }),
      onError((error) => {
        if (isDefinedError(error) && error.code === "GENERIC_ERROR") {
          setError(error.data.message);
        } else {
          setError(t("errors.invalid-otp"));
        }
      }),
    ],
  });

  return execute;
}

export function useResendOTP({ setError }: Props) {
  const t = useTranslations("auth");
  const [resendTimer, setResendTimer] = useState(30);
  const isResendDisabled = resendTimer > 0;

  const { execute } = useServerAction(resendOTP, {
    interceptors: [
      onStart(() => {
        setResendTimer(30);
      }),
      onError((error) => {
        if (isDefinedError(error) && error.code === "GENERIC_ERROR") {
          setError(error.data.message);
        } else {
          setError(t("errors.resend-otp-failed"));
        }
      }),
    ],
  });

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

  return { resendOTP: execute, resendTimer, isResendDisabled };
}
