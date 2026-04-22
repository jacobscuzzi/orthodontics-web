import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/team' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    photo: image().optional(),
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
