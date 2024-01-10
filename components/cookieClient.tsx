"use client";

import { FC, useEffect } from "react";
import {
  setLanguageCookie,
  setPackageManagerCookie,
  setRendererCookie,
  setVersionCookie,
} from "../app/actions";
import { usePathname } from "next/navigation";
import { docsVersions } from "@/docs-versions";

export const CookieClient: FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.slice(1).split("/");
    const isVersionExists = docsVersions.some((version) => {
      return segments[1] === version.id;
    });

    if (segments.length > 1 && isVersionExists) {
      setVersionCookie(segments[1]);
    } else {
      setVersionCookie(docsVersions[0].id);
    }

    // Set automatically the renderer and language if they are not in cookies
    setRendererCookie();
    setLanguageCookie();
    setPackageManagerCookie();
  }, [pathname]);

  return null;
};
