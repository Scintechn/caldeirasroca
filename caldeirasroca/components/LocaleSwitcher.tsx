"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "@/components/icons";
import { locales, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({
  current,
  labels,
  srLabel,
}: {
  current: Locale;
  labels: Record<Locale, string>;
  srLabel: string;
}) {
  const pathname = usePathname() ?? "/";

  function pathFor(target: Locale): string {
    // Replace the first segment if it's a locale; otherwise prefix.
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "pt" || segments[0] === "en") {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    return "/" + segments.join("/");
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full bg-white/10 p-1 text-xs font-semibold text-white ring-1 ring-white/20"
      role="group"
      aria-label={srLabel}
    >
      <Globe className="ml-2 h-3.5 w-3.5 opacity-70" aria-hidden="true" />
      {locales.map((l) => {
        const active = l === current;
        return (
          <Link
            key={l}
            href={pathFor(l)}
            aria-current={active ? "true" : undefined}
            className={
              "rounded-full px-2.5 py-1 transition " +
              (active
                ? "bg-white text-brand-900 shadow-sm"
                : "text-white/80 hover:text-white")
            }
          >
            <span className="uppercase">{l}</span>
            <span className="sr-only">— {labels[l]}</span>
          </Link>
        );
      })}
    </div>
  );
}
