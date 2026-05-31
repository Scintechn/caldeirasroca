"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Location =
  | "fab"
  | "header"
  | "hero"
  | "services_cta"
  | "pricing_cta"
  | "final_cta"
  | "contact_alt"
  | "footer";

export function WhatsAppLink({
  href,
  location,
  children,
  className,
  ...rest
}: {
  href: string;
  location: Location;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("whatsapp_click", { location })}
    >
      {children}
    </a>
  );
}
