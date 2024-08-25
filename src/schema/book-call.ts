import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

export const bookCallSchema = v.object({
  full_name: v.pipe(v.string(), v.trim(), v.nonEmpty("Name cannot be empty")),
  phone_number: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number cannot be empty"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Phone number is invalid",
    ),
  ),
  email_address: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Email cannot be empty"),
    v.email("Email is invalid"),
  ),
  description: v.pipe(v.string(), v.trim(), v.nonEmpty("Unit Description")),
});
