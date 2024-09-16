export function getHumanReadableDate(dateString) {
  const dateObject = new Date(dateString);
  const readableDate = dateObject.toLocaleDateString("en-US", {
    weekday: "short", // "Mon."
    year: "2-digit", // "24"
    month: "short", // "Oct"
    day: "numeric", // "16"
  });
  return readableDate;
}
