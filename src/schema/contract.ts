import * as v from "valibot";
import isMobilePhone from "validator/es/lib/isMobilePhone";
import isNumeric from "validator/es/lib/isNumeric";

export const contractSchema = v.object({
  // landlord_name: v.pipe(
  //   v.string(),
  //   v.trim(),
  //   v.nonEmpty("Name cannot be empty"),
  // ),
  landlord_phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone cannot be empty"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Phone number is invalid",
    ),
  ),
  // landlord_address: v.pipe(
  //   v.string(),
  //   v.trim(),
  //   v.nonEmpty("Address cannot be empty"),
  // ),
  // landlord_national_id: v.pipe(
  //   v.string(),
  //   v.trim(),
  //   v.nonEmpty("National ID is required"),
  //   v.startsWith("2", "National ID is invalid"),
  //   v.length(14, "National ID is invalid"),
  // ),
  landlord_identity_image: v.optional(v.file()),
  // tenant_name: v.pipe(v.string(), v.trim(), v.nonEmpty("Name cannot be empty")),
  tenant_phone: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Phone cannot be empty"),
    v.check(
      (input) => isMobilePhone(input, "ar-EG"),
      "Phone number is invalid",
    ),
  ),
  // tenant_address: v.pipe(
  //   v.string(),
  //   v.trim(),
  //   v.nonEmpty("Address cannot be empty"),
  // ),
  // tenant_national_id: v.pipe(
  //   v.string(),
  //   v.trim(),
  //   v.nonEmpty("National ID is required"),
  //   v.startsWith("2", "National ID is invalid"),
  //   v.length(14, "National ID is invalid"),
  // ),
  tenant_identity_image: v.optional(v.file()),
  unit_description: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Unit Description"),
  ),
  unit_area: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Unit Area cannot be empty"),
    v.check(isNumeric, "Unit Area must be a number"),
  ),
  purpose_of_renting: v.picklist(
    ["Residential", "Administrative"],
    "Purpose of Renting cannot be empty",
  ),
  contract_start_date: v.date("Contract Start Date cannot be empty"),
  contract_period_in_months: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Contract Period cannot be empty"),
    v.check(isNumeric, "Contract Period must be a number"),
  ),
  rent_amount: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Rent Amount cannot be empty"),
    v.check(isNumeric, "Rent Amount must be a number"),
  ),
  insurance_amount: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Insurance Amount cannot be empty"),
    v.check(isNumeric, "Insurance Amount must be a number"),
  ),
});
