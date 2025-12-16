// src/sanityClient.js (or wherever you prefer)
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Use the details from your Sanity configuration files
export const client = createClient({
  projectId: "55jliro0",
  dataset: "cars",
  apiVersion: "2023-10-09",
  useCdn: false, // ⚠️ Change this to false to get fresh data
});

// A helper function to easily get the image URL
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
