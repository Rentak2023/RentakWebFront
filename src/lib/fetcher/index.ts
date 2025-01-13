import { getCookie } from "cookies-next/client";
import ky from "ky";

const instance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_API_URL,
  hooks: {
    beforeRequest: [
      (req) => {
        const authToken = getCookie("authToken");
        if (authToken) {
          req.headers.set("Authorization", `Bearer ${authToken}`);
        }
      },
    ],
  },
});

export default instance;
