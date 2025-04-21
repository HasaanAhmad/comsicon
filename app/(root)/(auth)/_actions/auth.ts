'use server';

import { signIn } from "@/utils/auth";

export async function githubSignIn() {
  return signIn("github", { callbackUrl: "/dashboard" });
}

export async function googleSignIn() {
  return signIn("google", { callbackUrl: "/dashboard" });
} 