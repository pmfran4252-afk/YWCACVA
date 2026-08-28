import Reveal from "@/components/motion/Reveal";
import type { Person } from "@/content/types";

const initials = (name: string) =>
  name
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

/**
 * People are rendered as initial monograms rather than photo placeholders.
 * Approved headshots are still outstanding per the content plan, and an empty
 * avatar frame reads as broken where a monogram reads as deliberate.
 */
export default function PeopleGrid({ people }: { people: Person[] }) {
  return (
    <Reveal stagger staggerAmount={0.05} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <div
          key={p.name}
          className="flex items-center gap-5 rounded-2xl border border-ink-200/70 bg-paper p-6 transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[var(--shadow-card)]"
        >
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-persimmon-100 font-display text-lg font-black text-persimmon"
          >
            {initials(p.name)}
          </span>
          <span>
            <span className="block font-display text-lg font-bold text-ink-900">
              {p.name}
            </span>
            <span className="mt-0.5 block text-[15px] text-ink-500">
              {p.officerRole ?? p.role}
            </span>
          </span>
        </div>
      ))}
    </Reveal>
  );
}
