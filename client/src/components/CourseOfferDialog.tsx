import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DatePickerDemo } from "./DatePickerDemo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  creditCost: z.string().min(1, {
    message: "creditCost must be at least 1 character.",
  }),
  maxStudents: z.string().min(1, {
    message: "Must be at least 1 characters.",
  }),
  startDate: z.date().min(new Date(), {
    message: "Start Date must lie in the future",
  }),
  startTime: z.string(),
  endTime: z.string(),
});

export default function CourseOfferDialog({
  isUserCourse,
  refreshCourses,
}: {
  isUserCourse: boolean;
  refreshCourses: () => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      skill: "",
      creditCost: "",
      maxStudents: "",
      startDate: new Date(),
      startTime: "12:00",
      endTime: "12:00",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(payload: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(payload);
    console.log("Hi from onSubmit");
    refreshCourses;
  }

  if (isUserCourse) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Offer Course</Button>
        </DialogTrigger>
        <DialogContent className="h-svh sm:h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>
              Add a course, you want to offer
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-1" />
          <ScrollArea className="rounded-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-4"
              >
                {/* --- TITLE --- */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the title of your Course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- DESCRIPTION --- */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                      <FormDescription>
                        Describe the content of your course in a few
                        words/sentences.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- SKILL --- */}
                <FormField
                  control={form.control}
                  name="skill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill</FormLabel>
                      <FormControl>
                        <Input placeholder="skill" {...field} />
                      </FormControl>
                      <FormDescription>
                        Pick the skill you want to teach
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- CREDIT COST --- */}
                <FormField
                  control={form.control}
                  name="creditCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Cost</FormLabel>
                      <FormControl>
                        <Input placeholder="creditCost" {...field} />
                      </FormControl>
                      <FormDescription>
                        How much should your course offer cost.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- MAX STUDENTS --- */}
                <FormField
                  control={form.control}
                  name="maxStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Students</FormLabel>
                      <FormControl>
                        <Input placeholder="maxStudents" {...field} />
                      </FormControl>
                      <FormDescription>
                        Maximum Number of students you want to teach at once in
                        your course.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- START DATE --- */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <br />
                      <FormControl>
                        <DatePickerDemo placeholder="12:00" field="field" />
                      </FormControl>
                      <FormDescription>
                        Choose the starting date
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- START TIME --- */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="12:00" {...field} />
                      </FormControl>
                      <FormDescription>Choose the start time</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- END TIME --- */}
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" placeholder="11:00" {...field} />
                      </FormControl>
                      <FormDescription>Choose the end time</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save changes</Button>
              </form>
            </Form>
          </ScrollArea>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
