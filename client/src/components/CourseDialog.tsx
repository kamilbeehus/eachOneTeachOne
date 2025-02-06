import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CourseDialogForm from "./CourseDialogForm";

export default function CourseDialog({
  isUserCourse,
  refreshCourses,
}: {
  isUserCourse: boolean;
  refreshCourses: () => void;
}) {
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
            <CourseDialogForm
              isUserCourse={isUserCourse}
              refreshCourses={refreshCourses}
            ></CourseDialogForm>
          </ScrollArea>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
