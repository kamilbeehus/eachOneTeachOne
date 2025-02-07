import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postCourse } from "../api/postCourse";
import { format, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
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
    message: "creditsCost must be at least 1 character.",
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

export default function CourseDialogForm({
 form,  
  refreshCourses,
}: {
  form: 
  isUserCourse: boolean;
  refreshCourses: () => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // To-do: Remove default values
    defaultValues: {
      title: "hello",
      description: "piano",
      skill: "Music",
      creditsCost: 1,
      maxStudents: "4",
      // Updated date to match backend payload - Schedule (date) is an object with nested dates (startDate, endDate)
      schedule: {
        startDate: new Date(),
        endDate: new Date(),
      },
      startTime: "11:00",
      endTime: "12:00",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(payload: z.infer<typeof formSchema>) {
    try {
      console.log("onSubmit() - TRY");
      const response = await postCourse(payload);
      // toast.success("Your course has been created successfully!");
      console.log(response);

      // Refresh the courses list after successful course creation
      refreshCourses();
    } catch (e) {
      console.log("onSubmit() - CATCH");
      console.error(e);
      // toast.error("Failed to create course. Please try again.");
    }
    console.log(payload);
  }

  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Title" {...field} />
          </FormControl>
          <FormDescription>This is the title of your Course.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
