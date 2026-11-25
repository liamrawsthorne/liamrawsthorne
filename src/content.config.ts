import { defineCollection } from 'astro:content';
import type { SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Each Markdown file in src/content/portfolio/ is one project.
// The file name becomes its URL: kennedy-smith.md -> /portfolio/kennedy-smith/
// Edit these in Pages CMS (see .pages.yml) or by hand.

// Pages CMS saves images as /src/assets/portfolio/photo.jpg. Astro needs a path
// relative to the Markdown file, so convert it. Relative paths still work too.
function toRelative(value: unknown) {
  if (typeof value === 'string' && value.startsWith('/src/')) {
    return `../../${value.slice('/src/'.length)}`;
  }
  return value;
}

// The CMS may save a field you left empty as "" or null. Treat that as "not set".
function blank(value: unknown) {
  return value === '' || value === null ? undefined : value;
}

// Accept "example.com" as well as "https://example.com"
function withScheme(value: unknown) {
  const v = blank(value);
  if (typeof v === 'string' && !/^[a-z][a-z0-9+.-]*:/i.test(v.trim())) return `https://${v.trim()}`;
  return typeof v === 'string' ? v.trim() : v;
}

const optionalText = () => z.preprocess(blank, z.string().optional());
const optionalUrl = () => z.preprocess(withScheme, z.url().optional());

const portfolioSchema = ({ image }: SchemaContext) => {
  const img = () => z.preprocess(toRelative, image());
  const optionalImg = () => z.preprocess((v) => toRelative(blank(v)), image().optional());

  const section = z.discriminatedUnion('type', [
    z.object({
      type: z.literal('text'),
      heading: optionalText(),
      content: z.preprocess(blank, z.string().default('')),
    }),
    z.object({
      type: z.literal('image'),
      image: img(),
      alt: z.string(),
      caption: optionalText(),
      // "full" spans the page; "text" lines up with the writing
      width: z.preprocess(blank, z.enum(['full', 'text']).default('full')),
    }),
    z.object({
      type: z.literal('gallery'),
      images: z.array(z.object({ image: img(), alt: z.string() })).min(1),
      caption: optionalText(),
    }),
    z.object({
      type: z.literal('quote'),
      quote: z.string(),
      name: z.string(),
      title: optionalText(),
    }),
    z.object({
      type: z.literal('results'),
      heading: optionalText(),
      items: z.array(z.object({ value: z.coerce.string(), label: z.string() })).min(1),
    }),
    z.object({
      type: z.literal('video'),
      // A YouTube or Vimeo link, or a link to an .mp4 file
      url: z.preprocess(withScheme, z.url()),
      title: z.string(),
      caption: optionalText(),
    }),
  ]);

  return z.object({
    title: z.string(),
    // One or two sentences, used in search results and link previews
    summary: optionalText(),
    categories: z.preprocess(blank, z.array(z.string()).default([])),
    client: optionalText(),
    year: z.preprocess(blank, z.coerce.number().int().optional()),
    // Leave empty to use the placeholder until you have a screenshot
    cover: optionalImg(),
    coverAlt: optionalText(),
    liveUrl: optionalUrl(),
    // Shown in the client list on the homepage
    featured: z.preprocess(blank, z.boolean().default(true)),
    // Lower numbers appear first
    order: z.preprocess(blank, z.coerce.number().default(100)),
    // Drafts are saved but not published
    draft: z.preprocess(blank, z.boolean().default(false)),
    sections: z.preprocess(blank, z.array(section).default([])),
  });
};

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: portfolioSchema,
});

export const collections = { portfolio };
