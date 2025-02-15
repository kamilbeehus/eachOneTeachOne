import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z.string().min(3, {
      message: "firstName must be at least 3 characters.",
    }),
    lastName: z.string().min(3, {
      message: "lastName must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Invalid email adress",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
