import { loginSchema } from "../../client/src/lib/types/loginSchema.js";
import { ValidationError } from "../errors/customErrors.js";

// Validate the Login data before authenticating the user
export const validateLogin = (req, res, next) => {
  try {
    // Validate the request body using the Zod schema
    const validateData = loginSchema.parse(req.body);
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
