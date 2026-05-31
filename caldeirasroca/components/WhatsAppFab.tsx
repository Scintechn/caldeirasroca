import { WhatsAppIcon } from "@/components/icons";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { business, whatsappLink } from "@/lib/business";

export function WhatsAppFab({ srLabel }: { srLabel: string }) {
  return (
    <WhatsAppLink
      href={whatsappLink()}
      location="fab"
      aria-label={`${srLabel} · ${business.whatsapp.display}`}
      className={
        "fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center " +
        "rounded-full bg-whatsapp-500 text-white shadow-lg shadow-emerald-900/30 " +
        "transition hover:scale-105 hover:bg-whatsapp-600 active:scale-100 " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp-500 focus-visible:ring-offset-2 " +
        "sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
      }
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="sr-only">{srLabel}</span>
    </WhatsAppLink>
  );
}
