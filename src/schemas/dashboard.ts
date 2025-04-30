import * as v from "valibot";

export const UserTransferMethodsSchema = v.array(
  v.object({
    methodName: v.string(),
    value: v.string(),
  }),
);

export const UserStatisticsSchema = v.object({
  totalIncome: v.number(),
  totalExpense: v.number(),
  upcomingPaymentsLandlord: v.number(),
  upcomingPaymentsTenant: v.number(),
  daysToNextRentLandlord: v.number(),
  daysToNextRentTenant: v.number(),
});

export const UnitContractSchema = v.object({
  id: v.number(),
  // contract_code: v.string(),
  unit: v.object({
    id: v.number(),
    name: v.string(),
    address: v.nullable(
      v.object({
        governoment: v.nullable(v.string()),
        city: v.nullable(v.string()),
      }),
    ),
    // picture: v.nullable(v.string()),
  }),
  // contract_type: v.object({
  //   id: v.number(),
  //   type_name: v.string(),
  // }),
  // created_at: v.string(),
  from: v.nullable(v.string()),
  to: v.nullable(v.string()),
  // price: v.number(),
  // final_price: v.number(),
  // collection_day: v.number(),
  rent_collected: v.object({
    total_transactions: v.number(),
    rent_collected: v.number(),
  }),
  tenant: v.object({
    id: v.number(),
    fullname: v.string(),
    // email: v.nullable(v.string()),
    // phone: v.nullable(v.string()),
    // national_id: v.nullable(v.string()),
  }),
  transactions: v.array(
    v.object({
      id: v.number(),
      due_date: v.string(),
      payment_method: v.string(),
      cashin_payment_status: v.string(),
      cashout_payment_status: v.nullable(v.string()),
    }),
  ),
});

export type UnitContractSchema = v.InferOutput<typeof UnitContractSchema>;
