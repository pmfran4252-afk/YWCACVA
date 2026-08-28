import Link from "next/link";
import type { ComponentProps } from "react";

import { HISTORY_CONTAINMENT } from "@/lib/safety";

type Props = ComponentProps<typeof Link>;

/**
 * The only link component internal navigation should use.
 *
 * With HISTORY_CONTAINMENT on, every in-site navigation *replaces* the current
 * history entry instead of pushing a new one, so the entire visit occupies a
 * single entry. Quick Exit then overwrites that one entry and the Back button
 * has no site page left to return to.
 *
 * A plain `next/link` here would quietly reintroduce the problem, one pushed
 * entry is all it takes, so prefer SafeLink everywhere and keep `next/link`
 * for genuinely external destinations.
 */
export default function SafeLink({ replace, ...props }: Props) {
  return <Link {...props} replace={replace ?? HISTORY_CONTAINMENT} />;
}
