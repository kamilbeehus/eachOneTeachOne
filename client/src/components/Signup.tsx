import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const formSchema = z
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

export default function Signup() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    console.log("payload:", payload);
    try {
      await createAccount(payload);
      console.log("Account created successfully");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.error(error);
    }
  };

  // Signup API integration
  const createAccount = async (payload: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        payload,
      );
      console.log("User registered successfully :", response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <div className="mt-4 text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <p>Signing up...</p>
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        )}
        {error && <div className="mt-2 text-sm text-error">{error}</div>}
      </form>
    </Form>
  );
}
