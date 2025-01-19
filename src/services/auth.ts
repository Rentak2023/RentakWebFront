"use server";

import ky from "@rentak/fetcher";
import { setCookie } from "cookies-next/server";
import { cookies } from "next/headers";
import { type Locale } from "next-intl";
export type AuthError = {
  success: boolean;
  message: string;
};

type AuthResponse = {
  success: boolean;
  user_id: number;
  message: string;
};

type SignUpInput = {
  email: string;
  full_name: string;
  phone: string;
  national_id?: string;
  // user_type_id: number;
};

type TokenRes = {
  token: string;
  success: boolean;
};

export async function signUp(values: SignUpInput, locale: Locale) {
  const res = await ky
    .post("auth/register", {
      json: {
        ...values,
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<AuthResponse>();

  return res;
}

type LoginInput = {
  phone_number: string;
};

export async function login(values: LoginInput, locale: Locale) {
  const res = await ky
    .post("auth/login", {
      json: {
        ...values,
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<AuthResponse>();

  return res;
}

type OTPResponse = {
  success: string;
  userId: number;
};

export async function sendOTP(values: Record<string, any>) {
  const res = await ky
    .post("auth/send_otp", {
      json: values,
    })
    .json<OTPResponse>();

  return res;
}

type ResendOTP = {
  user_id: number;
};

export async function reSendOTP(values: ResendOTP, locale: Locale) {
  const res = await ky
    .post("auth/resend_otp", {
      json: {
        ...values,
        lang: locale === "en" ? "en" : "ar",
      },
    })
    .json<OTPResponse>();

  return res;
}

type VerifyOTP = {
  userId: number;
  otp: string;
};

export async function verifyOTP(values: VerifyOTP, locale: Locale) {
  const res = await ky
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

type UserRes = {
  id: number;
  fullname: string;
  email: string;
  national_id: string;
  phone: string;
};

export async function getUser() {
  const res = await ky.get("auth/get-user").json<UserRes>();

  return res;
}

type UserTransferMethods = Array<{
  methodName: string;
  value: string;
}>;

export async function getUserTransferMethods() {
  const res = await ky
    .get("dashboard/get-user-transfer_methods")
    .json<UserTransferMethods>();

  return res;
}
