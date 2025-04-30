"use server";

import privateFetcher from "@/lib/private-fetcher";

export type AuthError = {
  success: boolean;
  message: string;
};

type UserTransferMethods = Array<{
  methodName: string;
  value: string;
}>;

export async function getUserTransferMethods() {
  const res = await privateFetcher
    .get("dashboard/get-user-transfer_methods")
    .json<UserTransferMethods>();

  return res;
}
