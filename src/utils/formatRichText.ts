/** Normalize truncated game tags like `&ltWhen obtained&gt` so they render as text. */
export function formatRichText(html: string) {
  return html.replace(/&lt(?!;)/g, "&lt;").replace(/&gt(?!;)/g, "&gt;");
}
