import type { Metadata, Viewport } from "next";

import { sanityEnabled } from "@/sanity/env";
import Studio from "./Studio";
import StudioSetup from "./StudioSetup";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio | YWCA Central Virginia",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  // Rendering NextStudio without a projectId throws. Show setup steps instead.
  if (!sanityEnabled) return <StudioSetup />;
  return <Studio />;
}
