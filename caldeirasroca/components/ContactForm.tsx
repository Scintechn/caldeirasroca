"use client";

import { track } from "@vercel/analytics";
import { useState, useTransition } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import {
  submitContact,
  type ContactSubject,
  type ContactResult,
} from "@/app/[locale]/contact/actions";

const SUBJECTS: readonly ContactSubject[] = [
  "repair",
  "maintenance",
  "installation",
  "quote",
  "other",
];

type FormErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function ContactForm({
  t,
  locale,
}: {
  t: Dictionary["contact"]["form"];
  locale: Locale;
}) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, startTransition] = useTransition();

  function clientValidate(formData: FormData): FormErrors {
    const errs: FormErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const consent = formData.get("consent") === "on";
    if (!name) errs.name = t.name.error;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t.email.error;
    if (message.length < 10) errs.message = t.message.error;
    if (!consent) errs.consent = t.consent.error;
    return errs;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = clientValidate(data);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("idle");
      return;
    }
    startTransition(async () => {
      const result: ContactResult = await submitContact(data, locale);
      if (result.ok) {
        setStatus("success");
        track("contact_form_submit", { subject: String(data.get("subject") ?? "other") });
        form.reset();
      } else {
        setStatus("error");
      }
    });
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900"
      >
        <p className="font-display text-lg font-bold">{t.success.split(".")[0]}.</p>
        <p className="mt-2 text-sm leading-relaxed">{t.success}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <Field
        label={t.name.label}
        name="name"
        autoComplete="name"
        placeholder={t.name.placeholder}
        error={errors.name}
        required
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={t.email.label}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.email.placeholder}
          error={errors.email}
          required
        />
        <Field
          label={t.phone.label}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t.phone.placeholder}
          hint={t.phone.hint}
        />
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-semibold text-brand-900"
        >
          {t.subject.label}
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue="repair"
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {t.subject.options[s]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-brand-900"
        >
          {t.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t.message.placeholder}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 h-4 w-4 flex-none rounded border-slate-300 text-accent-600 focus:ring-2 focus:ring-accent-500"
        />
        <label htmlFor="consent" className="text-sm text-slate-700">
          {t.consent.label}
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="-mt-3 text-sm text-red-600">
          {errors.consent}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={pending}>
          {pending ? t.submitting : t.submit}
        </Button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-600">
            {t.genericError}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  hint,
  type = "text",
  required,
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  type?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = name;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-brand-900">
        {label}
        {required && <span className="ml-1 text-accent-600">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
