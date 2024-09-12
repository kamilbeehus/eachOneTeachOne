export function getCurrentTime(timeOffsetInHours) {
  const time = new Date();

  // Add a time offset to the time object e.g. add 2 hours: 9am -> 11am
  if (timeOffsetInHours) {
    time.setHours(time.getHours() + timeOffsetInHours);
  }

  const currentMinutes = String(time.getMinutes()).padStart(2, "0");
  const currentHours = String(time.getHours()).padStart(2, "0");
  const returnString = `${currentHours}:${currentMinutes}:00`;
  return returnString;
}
