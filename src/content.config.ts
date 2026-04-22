import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string().optional() })).optional(),
    sections: z.array(z.object({
      title: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      body: z.string(),
    })).optional(),
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

const reviews = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/reviews' }),
  schema: z.object({
    author: z.string(),
    rating: z.number().min(1).max(5).default(5),
    date: z.string().optional(),
    order: z.number().default(100),
    featured: z.boolean().default(true),
  }),
});

export const collections = { pages, team, faq, reviews };
