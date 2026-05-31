import { ChevronDown } from "@/components/icons";

export function Faq({ items }: { items: ReadonlyArray<{ q: string; a: string }> }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {items.map((item, i) => (
        <details
          key={i}
          className="group px-5 py-4 marker:hidden open:bg-slate-50 sm:px-6"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-display text-base font-semibold text-brand-900">
            {item.q}
            <ChevronDown
              className="h-5 w-5 flex-none text-brand-700 transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
