import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section variant="muted">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-brand-900 sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-slate-600">
          Não conseguimos encontrar a página que procura. Pode tentar voltar ao início.
        </p>
        <div className="mt-6">
          <Link
            href="/pt"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
          >
            Voltar ao início
          </Link>
        </div>
      </Container>
    </Section>
  );
}
