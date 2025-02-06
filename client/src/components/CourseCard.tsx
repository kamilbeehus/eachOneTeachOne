import { Calendar, Clock, Coins } from "lucide-react";
import { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Trash2 } from "lucide-react";

import { postEnroll } from "../api/postEnroll.js";
import AvatarLogo from "../assets/Avatar.png";
import { getHumanReadableDate } from "../helpers/getHumanReadableDate.js";
import { getHumanReadableTime } from "../helpers/getHumanReadableTime.js";

function handleDelete() {
  console.log("delete");
}

export default function CourseCard({
  course,
  courseId, // This courseId is passed from the parent component
  isUserCourse,
}: {
  course: any;
  courseId: string;
  isUserCourse: boolean;
}) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState("");

  const handleEnrollClick = async () => {
    setIsEnrolling(true);
    setError("");

    try {
      // Call the postEnroll function (which automatically handles user authentication via cookies)
      const response = await postEnroll(courseId);

      if (response?.success) {
        // toast.success("You are now enrolled in the course!");
      } else {
        console.warn("Unexpected API response:", response);
        throw new Error(response?.message || "Unexpected response structure");
      }
    } catch (error) {
      console.error("Enrollment failed:", error.message);

      // toast.error("Enrollment failed. Please try again.");
      setError("Enrollment failed. Please try again.");
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <>
      <Card className="mx-auto flex w-[280px] flex-col overflow-hidden rounded-lg shadow-lg">
        <img
          src={AvatarLogo}
          alt="Avatar picture"
          className="h-48 w-full object-cover"
        />
        <CardHeader className="flex-auto">
          <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
          {course.description && (
            <CardDescription>{course.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-2 space-y-3">
          <div className="flex items-center space-x-2 pt-2">
            <Calendar className="stroke-primary" />
            <p>{getHumanReadableDate(course.schedule.startDate)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="stroke-primary" />
            <p>
              {getHumanReadableTime(course.schedule.startDate)} -{" "}
              {getHumanReadableTime(course.schedule.endDate)}
            </p>
          </div>
          <div className="flex items-center">
            <Coins className="stroke-primary"></Coins>
            <div className="pl-2 font-semibold">{course.creditsCost}</div>
          </div>

          <div className="card-actions justify-end"></div>
        </CardContent>
        <CardFooter className="">
          {isUserCourse && (
            <div className="flex w-full justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-10"
                      onClick={handleDelete}
                    >
                      <Trash2 className="stroke-red-700 stroke-[2.5]"></Trash2>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-red-500 font-bold">
                    <p>Delete Course</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button>Edit</Button>
            </div>
          )}
          {!isUserCourse && (
            <Button onClick={handleEnrollClick}>
              {isEnrolling ? "Enrolling..." : "Enroll"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
