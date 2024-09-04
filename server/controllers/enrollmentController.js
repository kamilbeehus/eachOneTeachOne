import { enrollUserInCourse } from "../services/enrollmentService.js";

export const enrollUserController = async (req, res, next) => {
  const { userId, courseId } = req.body;

  try {
    const enrollment = await enrollUserInCourse(userId, courseId);
    res.status(201).json({
      sucess: true,
      message: "User enrolled in course successfully",
      enrollment,
    });
  } catch (error) {
    next(error);
  }
};
