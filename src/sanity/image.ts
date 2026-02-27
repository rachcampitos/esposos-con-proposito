import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = client ? createImageUrlBuilder(client) : null;

export type { SanityImageSource };

export function urlFor(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity client not configured");
  return builder.image(source);
}
