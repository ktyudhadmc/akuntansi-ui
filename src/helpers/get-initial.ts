export function getInitial(text: string) {
  const firstWord = text.trim().split(" ")[0];
  return firstWord.slice(0, Math.min(3, firstWord.length)).toUpperCase();
}

export function slugify(text: string) {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  return slug;
}
