import * as v from "valibot";
import { isMobilePhone } from "validator";

export const CreateLeadSchema = v.object({
  fullName: v.pipe(v.string(), v.trim(), v.nonEmpty("Name is required")),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
  email: v.union([
    v.literal(""),
    v.pipe(v.string(), v.trim(), v.email("A valid email address is required")),
  ]),
  message: v.string(),
});

export const CreateLeadResponseSchema = v.object({
  message: v.string(),
});
