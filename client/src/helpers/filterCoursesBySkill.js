export function filterCoursesBySkill(courses, skill) {
  const filteredCourses = courses.filter((course) => course.skill === skill);
  return filteredCourses;
}
