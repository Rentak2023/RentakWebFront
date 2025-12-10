import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import {
  BatchLinkPlugin,
  SimpleCsrfProtectionLinkPlugin,
} from "@orpc/client/plugins";
import { createORPCReactQueryUtils } from "@orpc/react-query";
import { type RouterClient } from "@orpc/server";

import type { router } from "@/router";

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

const rpcLink = new RPCLink({
  url: () => {
    // eslint-disable-next-line unicorn/prefer-global-this
    if (typeof window === "undefined") {
      const port = process.env.PORT ?? 3000;
      return `http://localhost:${port}/rpc`;
    }

    return new URL("/rpc", globalThis.location.href);
  },

  plugins: [
    new BatchLinkPlugin({
      groups: [
        {
          condition: () => true,
          context: {},
        },
      ],
    }),
    new SimpleCsrfProtectionLinkPlugin(),
  ],
  clientInterceptors: [],
});

export const orpcClient: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(rpcLink);

export const orpc = createORPCReactQueryUtils(orpcClient);
