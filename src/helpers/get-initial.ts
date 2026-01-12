export default function getInitial(text: string) {
  const firstWord = text.trim().split(" ")[0];
  return firstWord.slice(0, Math.min(3, firstWord.length)).toUpperCase();
}
