import type { ComponentType, SVGProps } from "react";

export function ServiceCard({
  Icon,
  name,
  body,
}: {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  body: string;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md">
      <span
        aria-hidden="true"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100 transition group-hover:bg-brand-700 group-hover:text-white"
      >
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-brand-900">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </article>
  );
}
