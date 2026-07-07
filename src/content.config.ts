import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    heroEyebrow: z.string().optional(),
    heroTitle: z.string().optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroCredit: z.string().optional(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string().optional() })).optional(),
    galleryEyebrow: z.string().optional(),
    galleryTitle: z.string().optional(),
    sections: z.array(z.object({
      title: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      body: z.string(),
      bullets: z.array(z.string()).optional(),
    })).optional(),
    // Startseite
    heroCtaPrimaryLabel: z.string().optional(),
    heroCtaSecondaryLabel: z.string().optional(),
    reviews: z.object({
      eyebrow: z.string(),
      title: z.string(),
    }).optional(),
    features: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(z.object({ title: z.string(), text: z.string() })),
      ctaLabel: z.string().optional(),
    }).optional(),
    interludeTitle: z.string().optional(),
    findUs: z.object({
      title: z.string(),
      text: z.string(),
      ctaLabel: z.string().optional(),
    }).optional(),
    faqTeaser: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      ctaLabel: z.string().optional(),
    }).optional(),
    // Praxis
    teamCtaLabel: z.string().optional(),
    // Team
    cvToggleLabel: z.string().optional(),
    // Behandlung
    sectionEyebrow: z.string().optional(),
    // Kontakt
    labelAddress: z.string().optional(),
    labelContact: z.string().optional(),
    labelHours: z.string().optional(),
    bookingCtaLabel: z.string().optional(),
    bottomImage: z.string().optional(),
    bottomImageAlt: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    order: z.number().default(100),
    cv: z.string().optional(),
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
