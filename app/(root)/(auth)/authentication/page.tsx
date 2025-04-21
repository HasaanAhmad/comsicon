
import React from "react";
import LoginForm from "../_components/LoginForm";
import SignupForm from "../_components/SignupForm";
import { ModeToggle } from "../../(dashboard)/layout/ModeToggle";

const Auth = () => {
  
  const handleAuthSuccess = () => {
  };

  const toggleForm = () => {

  };

  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-kaam-purple to-kaam-purple-dark p-12 items-center justify-center">
        <div className="max-w-md text-white">
          <div className="mb-6">
            <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center">
              <span className="text-kaam-purple font-bold text-xl">K</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">KaamShaam</h1>
          <p className="text-xl mb-6">
            The complete workspace for modern teams.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-kaam-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Project & Task Management</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-kaam-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Real-Time Chat System</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-kaam-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Performance Tracking & Evaluation</span>
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
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-kaam-purple to-kaam-vivid-purple mx-auto flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">K</span>
          </div>
          <h1 className="text-3xl font-bold">KaamShaam</h1>
          <p className="text-muted-foreground">The complete workspace for modern teams</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;