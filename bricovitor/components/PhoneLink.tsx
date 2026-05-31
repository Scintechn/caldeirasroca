"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export function PhoneLink({
  href,
  location,
  children,
  className,
  ...rest
}: {
  href: string;
  location: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a
      {...rest}
      href={href}
      className={className}
      onClick={() => track("phone_click", { location })}
    >
      {children}
    </a>
  );
}
