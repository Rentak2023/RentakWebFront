import ky from "@/lib/ky";

type Bank = {
  id: number;
  bank_name_ar: string;
  bank_name_en: string;
};

type BanksResponse = {
  data: Array<Bank>;
  message: string;
};

export async function getBanks() {
  const res = await ky
    .get("bank/get-all-banks", {
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
    })
    .json<BanksResponse>();

  return res.data;
}
