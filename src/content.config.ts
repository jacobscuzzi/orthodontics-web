import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string().optional() })).optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    order: z.number().default(100),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number().default(100),
  }),
});

export const collections = { pages, team, faq };
