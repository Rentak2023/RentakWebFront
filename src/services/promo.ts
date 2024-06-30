import ky from "@/lib/ky";

type PromoCodeResponse = {
  message: string;
  promocode: {
    id: number;
    code: string;
    discount: number;
    expirationDate: string;
    usageLimit: number;
    usageCount: number;
    createdAt: string;
  };
};

export async function checkPromoCode(promo: string) {
  const res = await ky
    .post("promocode/check-promocode", {
      json: {
        code: promo,
      },
    })
    .json<PromoCodeResponse>();

  return res;
}
