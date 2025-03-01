import fetcher from "@/lib/fetcher";

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

export async function checkPromoCode(promo: string, userId: number) {
  const res = await fetcher
    .post("promocode/check-promocode", {
      json: {
        code: promo,
        user_id: userId,
      },
    })
    .json<PromoCodeResponse>();

  return res;
}
