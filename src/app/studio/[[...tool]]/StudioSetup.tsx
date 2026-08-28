import Link from "next/link";

const STEPS = [
  {
    title: "Create a Sanity project",
    body: "Run npx sanity@latest init --env in the project root, or create a project at sanity.io/manage.",
  },
  {
    title: "Add the environment variables",
    body: "Copy .env.local.example to .env.local and fill in NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
  },
  {
    title: "Seed the content",
    body: "Run npm run seed to push the approved copy from the content spreadsheet into your dataset.",
  },
  {
    title: "Restart the dev server",
    body: "The Studio mounts here at /studio, and every page switches from seeded content to live CMS content automatically.",
  },
];

export default function StudioSetup() {
  return (
    <main className="min-h-dvh bg-ink-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow text-persimmon">Sanity Studio</p>
        <h1 className="mt-4 font-display text-4xl font-black tracking-tight">
          Studio isn&rsquo;t connected yet
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-300">
          The site is running on its built-in content seed, so every page renders
          correctly right now. Connect a Sanity project to start editing.
        </p>

        <ol className="mt-12 space-y-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-persimmon font-display text-sm font-black">
                {i + 1}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold">{step.title}</h2>
                <p className="mt-1 text-ink-300">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink-900 transition hover:bg-ink-100"
        >
          Back to the site
        </Link>
      </div>
    </main>
  );
}
