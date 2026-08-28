"use client";

import { useState } from "react";

/**
 * Non-urgent inquiry form.
 *
 * Two survivor-safety decisions are baked in:
 *  • It asks for a *safe* contact method and how to identify ourselves when
 *    replying, because a reply landing on a shared phone can put someone at
 *    risk.
 *  • It says plainly, above the fields, that this is not monitored around the
 *    clock, so nobody in danger waits on a form instead of calling.
 *
 * Submission is not wired to a backend yet; the content plan lists the routing
 * address and spam protection as still to be confirmed.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <p className="rounded-2xl border border-gold/50 bg-gold/10 px-5 py-4 text-[15px] leading-relaxed text-ink-800">
        This form is not monitored around the clock.{" "}
        <strong className="font-semibold">
          If you need help now, call 888-528-1041.
        </strong>{" "}
        An advocate answers at any hour.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="What we should call you" />
        <Field
          label="Safe phone or email"
          name="contact"
          placeholder="Somewhere only you can access"
          required
        />
      </div>

      <div className="mt-5">
        <label htmlFor="reason" className="block text-[15px] font-semibold text-ink-900">
          What is this about?
        </label>
        <select
          id="reason"
          name="reason"
          className="mt-2 h-13 w-full rounded-xl border border-ink-200 bg-paper px-4 text-[16px] text-ink-900 transition-colors focus:border-persimmon"
        >
          <option>General inquiry</option>
          <option>Domestic violence support</option>
          <option>Sexual assault support</option>
          <option>Court advocacy</option>
          <option>Housing</option>
          <option>Visitation</option>
          <option>Support groups</option>
          <option>Volunteering</option>
          <option>Donations and giving</option>
          <option>Media inquiry</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="block text-[15px] font-semibold text-ink-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="mt-2 w-full rounded-xl border border-ink-200 bg-paper px-4 py-3 text-[16px] text-ink-900 transition-colors focus:border-persimmon"
          placeholder="Only as much as you want to share."
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-[15px] font-semibold text-ink-900">
          When we reply, is it safe to say we are YWCA?
        </legend>
        <div className="mt-3 flex flex-wrap gap-5">
          {["Yes", "No, use a neutral name"].map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 text-[16px] text-ink-700">
              <input
                type="radio"
                name="identify"
                value={opt}
                defaultChecked={opt === "Yes"}
                className="size-4 accent-[var(--color-persimmon)]"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-8 inline-flex h-14 items-center rounded-full bg-persimmon px-8 text-[16px] font-bold text-white transition-colors hover:bg-persimmon-600"
      >
        Send message
      </button>

      <p aria-live="polite" className="mt-5 text-[15px] text-ink-600">
        {sent
          ? "Form submission is not connected yet. The routing address and spam protection are still being confirmed. Please call 888-528-1041 in the meantime."
          : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[15px] font-semibold text-ink-900">
        {label}
        {required && <span className="text-persimmon"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 h-13 w-full rounded-xl border border-ink-200 bg-paper px-4 text-[16px] text-ink-900 transition-colors focus:border-persimmon"
      />
    </div>
  );
}
