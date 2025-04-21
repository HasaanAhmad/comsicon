'use client';

import { Button } from "@/components/ui/button";
import { Github } from 'lucide-react';
import { signIn } from "next-auth/react";

export function SignInButtonGithub() {
  const handleSignIn = async () => {
    await signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <Button
      className="w-full flex items-center justify-center gap-2"
      variant="outline"
      onClick={handleSignIn}
    >
      <Github className="h-5 w-5" />
      Continue with GitHub
    </Button>
  );
}