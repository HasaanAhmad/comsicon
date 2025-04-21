'use client';

import { Button } from "@/components/ui/button";
import { Chrome } from 'lucide-react';
import { signIn } from "next-auth/react";

export function SignInButtonGoogle() {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Button
      className="w-full flex items-center justify-center gap-2"
      variant="outline"
      onClick={handleSignIn}
    >
      <Chrome className="h-5 w-5" />
      Continue with Google
    </Button>
  );
}