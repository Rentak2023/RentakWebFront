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

    // eslint-disable-next-line react-compiler/react-compiler
    router.push = (href, options) => {
      console.log("href", href);
      nProgress.start();
      _push(href, options);
    };
  }, [router]);

  useEffect(() => {
    nProgress.done();
  }, [pathname, searchParams]);

  return null;
}
