import { type Locale } from "next-intl";

import ky from "@/lib/ky";

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
  access: string;
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

  return res;
}
