// Utility function for formatting course response
export const formatCourseResponse = (course) => ({
  _id: course._id,
  title: course.title,
  description: course.description,
  instructor: {
    id: course.instructorId._id,
    firstName: course.instructorId.firstName,
    lastName: course.instructorId.lastName,
  },
  skill: course.skill,
  creditsCost: course.creditsCost,
  schedule: course.schedule,
  maxStudents: course.maxStudents,
  enrolledStudents: course.enrolledStudents,
  createdAt: course.createdAt,
});
