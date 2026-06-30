import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// Work items — folder-based, one Markdown file per item under src/content/work/
const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.coerce.string(),
    type: z.enum(["graphic", "motion"]),
    image: z.string(),
    video: z.string().optional().default(""),
    alt: z.string(),
    order: z.number().optional(),
  }),
});

// Experience entries — folder-based, one Markdown file per role
const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    period: z.string().default(""),
    role: z.string(),
    company: z.string(),
    location: z.string(),
    bullets: z.array(z.string()).default([]),
    order: z.number().optional(),
  }),
});

// Profile — single JSON file with object-keyed data. Entry id = "profile".
const profile = defineCollection({
  loader: file("./src/content/profile.json"),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    cv: z.string(),
    socials: z
      .array(
        z.object({
          label: z.string(),
          handle: z.string(),
          url: z.string(),
        })
      )
      .default([]),
    skills: z.array(z.string()).default([]),
  }),
});

export const collections = { work, experience, profile };