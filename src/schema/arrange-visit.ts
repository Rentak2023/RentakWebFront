import { startOfDay } from "date-fns";
import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";

export const arrangeVisitSchema = v.object({
  datetime: v.pipe(
    v.date("Date cannot be empty"),
    v.minValue(startOfDay(new Date()), "Date cannot be in the past"),
  ),
  name: v.pipe(v.string(), v.trim(), v.nonEmpty("Name cannot be empty")),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone number is required"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Enter a valid phone number",
    ),
  ),
  time_slot: v.pipe(v.string(), v.trim(), v.nonEmpty("Time slot is required")),
  message: v.optional(v.pipe(v.string(), v.trim())),
});
