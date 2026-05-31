import { Flame } from "@/components/icons";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  variant = "dark",
  withText = true,
}: {
  className?: string;
  variant?: "dark" | "light";
  withText?: boolean;
}) {
  const textColor = variant === "light" ? "text-white" : "text-brand-900";
  const subColor = variant === "light" ? "text-brand-100" : "text-slate-500";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500 text-white shadow-sm"
      >
        <Flame className="h-5 w-5" strokeWidth={2.25} />
      </span>
      {withText && (
        <span className={cn("flex flex-col leading-tight", textColor)}>
          <span className="font-display text-sm font-extrabold tracking-tight sm:text-base">
            Caldeiras Roca
          </span>
          <span className={cn("text-[11px] font-medium uppercase tracking-wider", subColor)}>
            Viana do Castelo
          </span>
        </span>
      )}
    </span>
  );
}
