import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postCourse } from "../api/postCourse";
import { Separator } from "@/components/ui/separator";
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
  creditsCost: z.number().min(1, {
    message: "creditsCost must be at least 1 character.",
  }),
  maxStudents: z.string().min(1, {
    message: "Must be at least 1 characters.",
  }),
  date: z.date(),
  // dateRange: z.object({
  //   from: z.date(),
  //   to: z.date(),
  // }),
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
      title: "hello",
      description: "piano",
      skill: "Music",
      creditsCost: 1,
      maxStudents: "4",
      date: new Date(),
      // date: {
      //   from: new Date(),
      //   to: addDays(new Date(), 1),
      // },
      startTime: "11:00",
      endTime: "12:00",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(payload: z.infer<typeof formSchema>) {
    try {
      console.log("hi from onSubmit - TRY");
      const response = await postCourse(payload);
      // toast.success("Your course has been created successfully!");
      console.log(response);

      // Refresh the courses list after successful course creation
      refreshCourses();
    } catch (e) {
      console.log("hi from onSubmit - CATCH");
      console.error(e);
      // toast.error("Failed to create course. Please try again.");
    }
    console.log(payload);
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
                        <Input placeholder="Title" {...field} />
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
                        <Input placeholder="Description" {...field} />
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
                        <Input placeholder="Skill" {...field} />
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
                  name="creditsCost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Cost</FormLabel>
                      <FormControl>
                        <Input placeholder="creditsCost" {...field} />
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
                {/* --- dateRange --- */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <br />
                      <FormControl>
                        <div className={cn("grid gap-2")}>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < startOfDay(new Date())
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormDescription>Choose the date</FormDescription>
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
                        <Input
                          className="stroke-slate-600"
                          type="time"
                          {...field}
                        />
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
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormDescription>Choose the end time</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
