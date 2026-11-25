// Your details live in src/data/site.json, which you can edit in Pages CMS
// under "Site details" or by hand. This file reads it with safe fallbacks.
import data from '../data/site.json';

interface Job {
  role: string;
  org: string;
  dates: string;
}

interface Course {
  qualification: string;
  institution: string;
  dates: string;
}

interface Link {
  label: string;
  href: string;
}

const clean = <T>(list: (T | null | undefined)[] | null | undefined): T[] =>
  (list ?? []).filter((item): item is T => item != null);

const email = data.email || '';
const at = email.indexOf('@');

export const site = {
  name: data.name || 'Your Name',
  headline: data.headline || '',
  tagline: data.tagline || '',
  description: data.description || '',
  role: data.role || '',
  company: data.company || '',
  openForRoles: Boolean(data.openForRoles),
  statusText: data.statusText || 'Open For Roles',
  email,
  // "hello" and "@liamrawsthorne.com", for the contact sign-off
  emailUser: at > 0 ? email.slice(0, at) : email,
  emailDomain: at > 0 ? email.slice(at) : '',
  phone: data.phone || '',
  phoneHref: `tel:${(data.phone || '').replace(/[^\d+]/g, '')}`,
  formAccessKey: data.formAccessKey || '',
  resumeIntro: data.resumeIntro || '',
  cvFile: data.cvFile || '',
  experience: clean<Job>(data.experience),
  education: clean<Course>(data.education),
  footerText: data.footerText || '',
  links: clean<Link>(data.links as Link[]).filter((l) => l.label && l.href),
};
