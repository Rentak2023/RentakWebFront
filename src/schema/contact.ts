import { custom, email, minLength, object, string } from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

export const contactSchema = object({
  full_name: string([minLength(1, "Name is required")]),
  email: string([email("A valid email address is required")]),
  phone: string([custom(isMobilePhone, "Enter a valid phone number")]),
  subject: string([minLength(1, "Question is required")]),
  message: string([minLength(1, "Message is required")]),
});
