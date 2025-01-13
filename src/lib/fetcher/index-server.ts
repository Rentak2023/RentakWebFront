import { getCookie } from "cookies-next/server";
import ky from "ky";
import { cookies } from "next/headers";

const instance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_API_URL,
  hooks: {
    beforeRequest: [
      async (req) => {
        const authToken = await getCookie("authToken", { cookies });

        if (authToken) {
          req.headers.set("Authorization", `Bearer ${authToken}`);
        }
      },
    ],
  },
});

export default instance;
