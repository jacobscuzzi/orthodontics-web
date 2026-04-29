export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|data:)/.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, '')}`;
}