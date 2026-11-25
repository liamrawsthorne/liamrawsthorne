import { getCollection } from 'astro:content';
import placeholder from '../assets/placeholder.svg';

// All published projects, in the order set by each file's `order` field.
export async function getPortfolio() {
  const items = await getCollection('portfolio', ({ data }) => !data.draft);
  return items.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export type PortfolioItem = Awaited<ReturnType<typeof getPortfolio>>[number];

// The project's cover, or a placeholder until a screenshot is added
export function coverOf(item: PortfolioItem) {
  return {
    src: item.data.cover ?? placeholder,
    alt: item.data.cover ? (item.data.coverAlt ?? '') : '',
    isPlaceholder: !item.data.cover,
  };
}

// Every category used by at least one project, in first-seen order
export function categoriesOf(items: PortfolioItem[]) {
  const seen: string[] = [];
  for (const item of items) for (const c of item.data.categories) if (!seen.includes(c)) seen.push(c);
  return seen;
}

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
