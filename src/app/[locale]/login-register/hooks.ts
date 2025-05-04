import { isDefinedError } from "@orpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useRouter } from "@/i18n/routing";
import { orpc } from "@/lib/orpc";
import { userLoggedInQuery } from "@/queries/user";

type Props = {
  setError: (message: string) => void;
};

export function useVerifyOTP({ setError }: Props) {
  const t = useTranslations("auth");
  const queryCLient = useQueryClient();
  const router = useRouter();

  const { mutateAsync } = useMutation(
    orpc.auth.verifyOTP.mutationOptions({
      onSuccess: async (data) => {
        setCookie("authToken", data.token);
        await queryCLient.invalidateQueries(userLoggedInQuery);
        router.push("/dashboard");
      },
      onError: (error) => {
        if (isDefinedError(error) && error.code === "GENERIC_ERROR") {
          setError(error.data.message);
        } else {
          setError(t("errors.invalid-otp"));
        }
      },
    }),
  );

  return mutateAsync;
}

export function useResendOTP({ setError }: Props) {
  const t = useTranslations("auth");
  const [resendTimer, setResendTimer] = useState(30);
  const isResendDisabled = resendTimer > 0;
  const { mutateAsync } = useMutation(
    orpc.auth.resendOTP.mutationOptions({
      onMutate: () => {
        setResendTimer(30);
      },
      onError: (error) => {
        if (isDefinedError(error) && error.code === "GENERIC_ERROR") {
          setError(error.data.message);
        } else {
          setError(t("errors.resend-otp-failed"));
        }
      },
    }),
  );

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

  return { resendOTP: mutateAsync, resendTimer, isResendDisabled };
}
