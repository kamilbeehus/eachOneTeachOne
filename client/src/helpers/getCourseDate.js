export function getCourseDate(course) {
  const date = course.schedule.startDate.split("T")[0];
  //   const date = "11-12-12";
  return date;
}
