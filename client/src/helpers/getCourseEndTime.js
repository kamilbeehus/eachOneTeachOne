export function getCourseEndTime(course) {
  const time = new Date(course.schedule.endDate);
  const currentMinutes = String(time.getMinutes()).padStart(2, "0");
  const currentHours = String(time.getHours()).padStart(2, "0");
  const returnString = `${currentHours}:${currentMinutes}:00`;
  return returnString;
}
