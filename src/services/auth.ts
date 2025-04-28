"use server";

import { setCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { type Locale } from "next-intl";

import fetcher from "@/lib/fetcher";
import privateFetcher from "@/lib/private-fetcher";

export type AuthError = {
  success: boolean;
  message: string;
};

type TokenRes = {
  token: string;
  success: boolean;
};

type OTPResponse = {
  success: string;
  userId: number;
};

export async function sendOTP(values: Record<string, any>) {
  const res = await fetcher
    .post("auth/send_otp", {
      json: values,
    })
    .json<OTPResponse>();

  return res;
}

type VerifyOTP = {
  userId: number;
  otp: string;
};

export async function verifyOTP(values: VerifyOTP, locale: Locale) {
  const res = await fetcher
    .post("auth/confirm-otp", {
      json: {
        ...values,
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<TokenRes>();

  await setCookie("authToken", res.token, { cookies });
  return res;
}

type UserTransferMethods = Array<{
  methodName: string;
  value: string;
}>;

export async function getUserTransferMethods() {
  const res = await privateFetcher
    .get("dashboard/get-user-transfer_methods")
    .json<UserTransferMethods>();

  return res;
}
