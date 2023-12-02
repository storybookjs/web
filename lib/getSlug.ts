export const getSlug = (segment: string | undefined) => {
  return segment && segment.match(/^\d+-/)
    ? segment.replace(/^\d+-/, "")
    : segment;
};
