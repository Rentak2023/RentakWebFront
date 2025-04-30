/* eslint-disable barrel-files/avoid-barrel-files */
import { HTTPError } from "ky";
import * as v from "valibot";

import { authed, pub } from "@/orpc";
import {
  AuthResponse,
  LoginSchema,
  OTPResponse,
  SendOTPSchema,
  SignUpSchema,
  TokenResponse,
  UserSchema,
} from "@/schemas/auth";
import { LocaleSchema } from "@/schemas/common";

export const me = authed
  .route({
    method: "GET",
    path: "/auth/me",
    summary: "Get the current user",
    tags: ["auth"],
  })
  .output(UserSchema)
  .handler(async ({ context }) => {
    return context.fetcher
      .get("auth/get-user")
      .json<v.InferOutput<typeof UserSchema>>();
  });

export const login = pub
  .route({
    method: "POST",
    path: "/auth/login",
    summary: "Login a user",
    tags: ["auth"],
  })
  .input(
    v.object({
      values: LoginSchema,
      lang: LocaleSchema,
    }),
  )
  .output(AuthResponse)
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
  });

export const signUp = pub
  .route({
    method: "POST",
    path: "/auth/register",
    summary: "Register a new user",
    tags: ["auth"],
  })
  .input(
    v.object({
      values: SignUpSchema,
      lang: LocaleSchema,
    }),
  )
  .output(AuthResponse)
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
  });

export const verifyOTP = pub
  .route({
    method: "POST",
    path: "/auth/verify-otp",
    summary: "Verify OTP",
    tags: ["auth"],
  })
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
  .output(TokenResponse)
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
    }
    throw errors.GENERIC_ERROR({ data: { message: "Something went wrong" } });
  });

export const resendOTP = pub
  .route({
    method: "POST",
    path: "/auth/resend-otp",
    summary: "Resend OTP",
    tags: ["auth"],
  })
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
  });

export const sendOTP = pub
  .route({
    method: "POST",
    path: "/auth/send-otp",
    summary: "Send OTP",
    tags: ["auth"],
  })
  .input(SendOTPSchema)
  .output(OTPResponse)
  .handler(async ({ input, context, errors }) => {
    try {
      const res = await context.fetcher
        .post("auth/send_otp", {
          json: {
            ...input,
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
  });

export default { me, login, signUp, verifyOTP, resendOTP, sendOTP };
