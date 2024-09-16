export function getHumanReadableTime(dateString) {
  const dateObject = new Date(dateString);
  const readableTime = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit", // e.g., "02"
    minute: "2-digit", // e.g., "45"
    hour12: true, // Use 12-hour format (default for some locales)
  });
  return readableTime;
}
