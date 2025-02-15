import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { signUpSchema, TSignUpSchema } from "@/lib/types/signUpSchema";

export default function Signup() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const onSubmit = async (payload: TSignUpSchema) => {
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
  const createAccount = async (payload: TSignUpSchema) => {
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
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <div>
          {isLoading ? (
            <div className="mt-4 text-center">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Signing up...</p>
            </div>
          ) : (
            <Button type="submit" className="mt-8 w-full">
              Sign Up
            </Button>
          )}
          {error && <div className="mt-2 text-sm text-error">{error}</div>}
        </div>
      </form>
    </Form>
  );
}
