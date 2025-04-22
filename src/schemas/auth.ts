import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

export const loginSchema = v.object({
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
});

export const otpSchema = v.object({
  otp: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("OTP is required"),
    v.minLength(4, "OTP must be at least 4 digits"),
  ),
});

export const signUpSchema = v.object({
  full_name: v.string(),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Email is required"),
    v.email("A valid email address is required"),
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
});

export const UserSchema = v.object({
  id: v.number(),
  fullname: v.string(),
  email: v.string(),
  national_id: v.string(),
  phone: v.string(),
});

export const AuthResponse = v.object({
  success: v.boolean(),
  user_id: v.number(),
  message: v.string(),
});
