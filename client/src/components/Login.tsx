import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function Login() {
  //   const [loginState, setLoginState] = useState(fieldsState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const onSubmit = (payload: z.infer<typeof formSchema>) => {
    console.log("payload:", payload);
    authenticateUser(payload);
    // authenticateUser();
  };

  // Login API Integration
  const authenticateUser = async (payload: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Start loading when authentication begins
    try {
      // Make login request to authenticate user and store token in cookies
      await api.post("/auth/login", payload);
      console.log("User logged in successfully!");

      // Fetch authenticated user data from /auth/me endpoint
      const { data } = await api.get("/auth/me");
      console.log("User data retrieved :", data.user);

      // Clear any existing error messages
      setError("");

      // Simulate data fetching/loading before redirecting
      setTimeout(() => {
        setIsLoading(false); // Stop loading
        navigate("/home"); // Redirect after the loading ends
      }, 1000); // Simulated delay for smoother transition (adjust as needed)
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      // TODO: Display error messages to the user in the UI to improve user experience.
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
      setIsLoading(false); // End loading if there's an error
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <div className="mt-4 text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Logging in...</p>
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Login
          </Button>
        )}
        {error && <div className="mt-2 text-sm text-error">{error}</div>}
      </form>
    </Form>
  );
}
