// Vite serves assets from the `public/` folder automatically.
// This function simply returns the path so Vite/nginx handles the serving.
export function asset(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean;
}
