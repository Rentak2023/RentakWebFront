import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

export const contactSchema = v.object({
  full_name: v.pipe(v.string(), v.minLength(1, "Name is required")),
  email: v.pipe(v.string(), v.email("A valid email address is required")),
  phone: v.pipe(
    v.string(),
    v.check(isMobilePhone, "Enter a valid phone number"),
  ),
  message: v.pipe(v.string(), v.minLength(1, "Message is required")),
});
