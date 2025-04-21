import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    onboardingComplete: boolean
  }
  
  interface Session {
    user: User
  }
}