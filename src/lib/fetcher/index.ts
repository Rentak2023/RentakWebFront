import { getCookie } from "cookies-next";
import ky from "ky";

// eslint-disable-next-line unicorn/prefer-global-this
export const isServer = typeof window === "undefined" || "Deno" in globalThis;

const instance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        if (isServer) {
          const cookies = await import("next/headers").then((i) => i.cookies);

          const authToken = await getCookie("authToken", { cookies });

          if (authToken) {
            req.headers.set("Authorization", `Bearer ${authToken}`);
          }
        } else {
          const authToken = await getCookie("authToken");
          if (authToken) {
            req.headers.set("Authorization", `Bearer ${authToken}`);
          }
        }
      },
    ],
  },
});

export default instance;
