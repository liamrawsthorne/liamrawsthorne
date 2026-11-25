// Builds links that still work if you deploy under a sub-path
// (for example a GitHub Pages project site at /repo-name/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
