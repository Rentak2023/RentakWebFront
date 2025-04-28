"use server";

import { setCookie } from "cookies-next/server";
import { HTTPError } from "ky";
import { cookies } from "next/headers";
import * as v from "valibot";

import { pub } from "@/orpc";
import {
  AuthResponse,
  loginSchema,
  OTPResponse,
  signUpSchema,
  TokenResponse,
} from "@/schemas/auth";
import { LocaleSchema } from "@/schemas/common";

export const login = pub
  .input(
    v.object({
      values: loginSchema,
      lang: LocaleSchema,
    }),
  )
  .output(v.nullable(AuthResponse))
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("auth/login", {
          json: {
            phone_number: input.values.phone,
            lang: input.lang,
          },
        })
        .json<v.InferOutput<typeof AuthResponse>>();

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        if (error.response.status === 400) {
          throw errors.VALIDATION_ERROR({ data: responseData });
        } else if (error.response.status === 401) {
          throw errors.GENERIC_ERROR({ data: responseData });
        }
      }
      throw errors.GENERIC_ERROR({ data: { message: "Something went wrong" } });
    }
  })
  .actionable();

export const signUp = pub
  .input(
    v.object({
      values: signUpSchema,
      lang: LocaleSchema,
    }),
  )
  .output(v.nullable(AuthResponse))
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("auth/register", {
          json: {
            ...input.values,
            lang: input.lang,
          },
        })
        .json<v.InferOutput<typeof AuthResponse>>();

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        if (error.response.status === 400) {
          if (typeof responseData.message === "string") {
            throw errors.GENERIC_ERROR({ data: responseData });
          }
          throw errors.VALIDATION_ERROR({ data: responseData });
        } else if (error.response.status === 401) {
          throw errors.GENERIC_ERROR({ data: responseData });
        }
      }
      throw errors.GENERIC_ERROR({ data: { message: "Something went wrong" } });
    }
  })
  .actionable();

export const verifyOTP = pub
  .input(
    v.object({
      userId: v.number(),
      otp: v.pipe(
        v.string(),
        v.trim(),
        v.nonEmpty("OTP is required"),
        v.minLength(4, "OTP must be at least 4 digits"),
      ),
      lang: LocaleSchema,
    }),
  )
  .output(v.nullable(TokenResponse))
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("auth/confirm-otp", {
          json: {
            userId: input.userId,
            otp: input.otp,
            lang: input.lang,
          },
        })
        .json<v.InferOutput<typeof TokenResponse>>();

      await setCookie("authToken", res.token, { cookies });

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        if (error.response.status === 400) {
          if (typeof responseData.message === "string") {
            throw errors.GENERIC_ERROR({ data: responseData });
          }
          throw errors.VALIDATION_ERROR({ data: responseData });
        } else if (error.response.status === 401) {
          throw errors.GENERIC_ERROR({ data: responseData });
        }
      }
      throw errors.GENERIC_ERROR({ data: { message: "Something went wrong" } });
    }
  })
  .actionable();

export const resendOTP = pub
  .input(
    v.object({
      userId: v.number(),
      lang: LocaleSchema,
    }),
  )
  .output(v.nullable(OTPResponse))
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("auth/resend_otp", {
          json: {
            user_id: input.userId,
            lang: input.lang,
          },
        })
        .json<v.InferOutput<typeof OTPResponse>>();

      return res;
    } catch (error) {
      if (error instanceof HTTPError) {
        const responseData = await error.response.json();
        if (error.response.status === 400) {
          if (typeof responseData.message === "string") {
            throw errors.GENERIC_ERROR({ data: responseData });
          }
          throw errors.VALIDATION_ERROR({ data: responseData });
        } else if (error.response.status === 401) {
          throw errors.GENERIC_ERROR({ data: responseData });
        }
      }
      throw errors.GENERIC_ERROR({ data: { message: "Something went wrong" } });
    }
  })
  .actionable();
