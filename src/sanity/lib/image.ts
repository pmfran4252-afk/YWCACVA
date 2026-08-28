import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId, sanityEnabled } from "../env";

const builder = sanityEnabled
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: Image | undefined | null) {
  if (!source || !builder) return null;
  return builder.image(source).auto("format").fit("max");
}
