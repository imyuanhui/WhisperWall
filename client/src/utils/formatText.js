export const stripHtmlTags = (html) => {
  const strippedString = html.replace(/<\/?[^>]+(>|$)/g, " ").trim();
  return strippedString;
};
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};
