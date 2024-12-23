"use client";

import "nprogress/nprogress.css";

// eslint-disable-next-line no-restricted-imports
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import { useEffect } from "react";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const _push = router.push.bind(router);
    const _replace = router.replace.bind(router);

    function progressStart(href: string) {
      const url = `${pathname}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;
      if (href !== url) {
        nProgress.start();
      }
    }

    // eslint-disable-next-line react-compiler/react-compiler
    router.push = (href, options) => {
      progressStart(href);
      _push(href, options);
    };

    router.replace = (href, options) => {
      progressStart(href);
      _replace(href, options);
    };
    return () => {
      router.push = _push;
      router.replace = _replace;
    };
  }, [pathname, router, searchParams]);

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return null;
}
