import React from "react";
import LoginForm from "../_components/LoginForm";
import { ModeToggle } from "../../(dashboard)/layout/ModeToggle";
import Image from "next/image";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

const Auth = async () => {
  const session = await auth()
  if (session?.user) {
    if (!session.user.onboardingComplete) {
      redirect('/onboarding')
    }
    redirect('/dashboard')
  }
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col md:flex-row bg-white dark:bg-gray-950">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-purple-600 p-12 items-center justify-center">
        <div className="max-w-md text-black">
          <div className="mb-6">
            
          </div>
          <Image src="/logo.png" alt="KaamShaam" width={300} height={300} />
          <h1 className="text-4xl font-bold mb-4 text-white">KaamShaam</h1>
          <p className="text-xl mb-6 text-white">
            The complete workspace for modern teams.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Project & Task Management</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Real-Time Chat System</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white">Performance Tracking & Evaluation</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 px-4 py-12 flex flex-col items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        
        {/* Visible on mobile only */}
        <div className="md:hidden text-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-purple-600 mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">K</span>
          </div>
          <h1 className="text-3xl font-bold dark:text-white">KaamShaam</h1>
          <p className="text-muted-foreground">The complete workspace for modern teams</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Auth;