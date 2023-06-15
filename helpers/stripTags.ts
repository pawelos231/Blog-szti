export function stripTags(original: string) {
  return original.replace(/(<([^>]+)>)/gi, "");
}
