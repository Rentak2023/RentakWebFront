"use client";

import "nprogress/nprogress.css";

// eslint-disable-next-line no-restricted-imports
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useEffect, useTransition } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const _push = router.push.bind(router);
    const _replace = router.replace.bind(router);

    // eslint-disable-next-line react-compiler/react-compiler
    router.push = (href, options) => {
      startTransition(() => {
        nProgress.start();
        _push(href, options);
      });
    };

    router.replace = (href, options) => {
      startTransition(() => {
        nProgress.start();
        _replace(href, options);
      });
    };

    return () => {
      router.push = _push;
      router.replace = _replace;
    };
  }, [router]);

  useEffect(() => {
    if (!isPending) {
      nProgress.done();
    }
  }, [isPending, pathname, searchParams]);

  return null;
}
