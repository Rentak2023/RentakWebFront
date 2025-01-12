import ky from "@/lib/ky";

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
  lang: string;
};

type TokenRes = {
  access: string;
  success: boolean;
};

export async function signUp(values: SignUpInput) {
  const res = await ky
    .post("auth/register", {
      json: values,
    })
    .json<AuthResponse>();

  return res;
}

type LoginInput = {
  phone_number: string;
  lang: string;
};

export async function login(values: LoginInput) {
  const res = await ky
    .post("auth/login", {
      json: values,
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
  lang: string;
};

export async function reSendOTP(values: ResendOTP) {
  const res = await ky
    .post("auth/resend_otp", {
      json: values,
    })
    .json<OTPResponse>();

  return res;
}

type VerifyOTP = {
  userId: number;
  otp: string;
  lang: string;
};

export async function verifyOTP(values: VerifyOTP) {
  const res = await ky
    .post("auth/confirm-otp", { json: values })
    .json<TokenRes>();

  return res;
}
