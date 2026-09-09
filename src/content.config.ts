import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each project = one markdown file in src/content/projects/*.md
// Adding a new project later needs zero code changes.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    role: z.string().optional(),
    dateRange: z.string(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        github: z.string().url().optional(),
        report: z.string().optional(),
        youtube: z.string().url().optional(),
      })
      .default({}),
    coverImage: z.string().optional(),
    highlightVideo: z.string().optional(),
    gallery: z
      .array(
        z.object({
          type: z.enum(['image', 'video']),
          src: z.string(),
          caption: z.string().optional(),
        })
      )
      .default([]),
  }),
});

// Each certification / achievement = one markdown file in src/content/certs/*.md
const certs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certs' }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    order: z.number().default(99),
    description: z.string().optional(),
    image: z.string().optional(),
    pdf: z.string().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = { projects, certs };
