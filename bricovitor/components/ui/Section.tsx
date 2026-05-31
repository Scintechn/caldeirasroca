import { cn } from "@/lib/cn";

type Variant = "default" | "muted" | "warm" | "dark" | "accent";

const variantClass: Record<Variant, string> = {
  default: "bg-white text-slate-900",
  muted: "bg-slate-50 text-slate-900",
  warm: "bg-accent-50 text-brand-900",
  dark: "bg-brand-900 text-white",
  accent: "bg-accent-500 text-brand-950",
};

export function Section({
  id,
  variant = "default",
  className,
  children,
}: {
  id?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </section>
  );
}
