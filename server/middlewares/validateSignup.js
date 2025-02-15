import { signUpSchema } from "../../client/src/lib/types/signUpSchema.js";
import { ValidationError } from "../errors/customErrors.js";

// Validate the Signup data before creating a new User
export const validateSignup = (req, res, next) => {
  try {
    // Validate the request body using the Zod schema
    const validateData = signUpSchema.parse(req.body);
    req.body = validateData;
    next();
  } catch (error) {
    if (error instanceof Zod.ZodError) {
      // Handle validation errors
      const errorMessages = error.errors.map((err) => err.message).join(", ");
      throw new ValidationError(errorMessages);
    } else {
      // Handle other errors
      next(error);
    }
  }
};
