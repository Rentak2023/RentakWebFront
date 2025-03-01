import { type CookieValueTypes, getCookie } from "cookies-next";
import ky from "ky";

// eslint-disable-next-line unicorn/prefer-global-this
export const isServer = typeof window === "undefined" || "Deno" in globalThis;

const instance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_API_URL,
  timeout: 90_000,
  hooks: {
    beforeRequest: [
      async (req) => {
        let authToken: CookieValueTypes;
        if (isServer) {
          const cookies = await import("next/headers").then((i) => i.cookies);

          authToken = await getCookie("authToken", { cookies });
        } else {
          authToken = await getCookie("authToken");
        }
        if (authToken) {
          req.headers.set("Authorization", `Bearer ${authToken}`);
        }
      },
    ],
  },
});

export default instance;
