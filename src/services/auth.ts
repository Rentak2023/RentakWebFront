import ky from "@/lib/ky";

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

export async function verifyOTP(values: Record<string, any>) {
  const res = await ky.post("auth/confirm-otp", { json: values }).json();

  return res;
}
