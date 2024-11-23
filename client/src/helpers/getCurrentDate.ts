export function getCurrentDate() {
  const today = new Date().toISOString().split("T")[0];
  return today;
}
