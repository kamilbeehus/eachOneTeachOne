import { courseDialogFormSchema } from "../../client/src/lib/types/courseDialogFormSchema.js";
import { ValidationError } from "../errors/customErrors.js";

export const validateCourse = (req, res, next) => {
  try {
    const validatedData = courseDialogFormSchema.parse(req.body);
    req.body = validatedData;
    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      throw new ValidationError(errorMessages);
    } else {
      // Handle other errors
      next(error);
    }
  }
};
