'use client';
import React from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButtonGoogle } from "./SignInButtonGoogle";
import { SignInButtonGithub } from "./SignInButtonGithub";

const LoginForm = () => {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SignInButtonGoogle />
        <SignInButtonGithub />
      </CardContent>
    </Card>
  );
};

export default LoginForm;