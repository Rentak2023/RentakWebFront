"use server";
import { onSuccess } from "@orpc/client";
import { setCookie } from "cookies-next/server";
import { cookies } from "next/headers";

import auth from "@/router/auth";

export const login = auth.login.actionable();

export const signUp = auth.signUp.actionable();

export const verifyOTP = auth.verifyOTP.actionable({
  interceptors: [
    onSuccess(async (data) => {
      await setCookie("authToken", data.token, { cookies });
    }),
  ],
});

export const resendOTP = auth.resendOTP.actionable();
