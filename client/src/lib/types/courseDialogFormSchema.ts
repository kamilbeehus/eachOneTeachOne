import { z } from "zod";

export const courseDialogFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
  skill: z.string().min(3, {
    message: "Skill must be at least 3 characters.",
  }),
  creditsCost: z.number().min(1, {
    message: "CreditsCost must be at least 1 character.",
  }),
  maxStudents: z.string().min(1, {
    message: "Must be at least 1 character.",
  }),
  // Updated date to match backend payload - Schedule (date) is an object with nested dates (startDate, endDate)
  schedule: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  startTime: z.string(),
  endTime: z.string(),
});

export type TCourseDialogFormSchema = z.infer<typeof courseDialogFormSchema>;
