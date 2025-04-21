'use client'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const LandingHero = () => {
  return (
    <section className="w-full pt-20 pb-16 lg:pt-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/fb6713fc-2a04-4976-8d7c-cbd1ce0b85a7.png')] bg-no-repeat bg-[length:800px] bg-[top_-200px_right_-200px] opacity-5"></div>
      
      <div className="container mx-auto max-w-4xl px-4 flex flex-col items-center text-center relative z-10">
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="h-16 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
        
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#1A1F2C] mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Where teams work
            <span className="block mt-1 bg-gradient-to-r from-[#7E69AB] to-[#33C3F0] bg-clip-text text-transparent">
              better together
            </span>
          </motion.h1>
          
          <motion.div 
            className="absolute -left-20 top-10 w-16 h-16 rounded-full bg-[#e5deff]/50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          
          <motion.div 
            className="absolute -right-10 bottom-0 w-24 h-24 rounded-full bg-[#d3e4fd]/40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
        </motion.div>
        
        <motion.p
          className="text-lg md:text-2xl text-[#403E43] mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          One workspace for your tasks, messages, and team performance. 
          No more context switching.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button size="lg" className="px-8 text-base shadow-md bg-[#9b87f5] hover:bg-[#7E69AB] transition gap-2 h-14">
            Start for free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div
          className="relative  rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img 
            src="/assets/landing.png" 
            alt="Platform dashboard"
            className="w-full max-w-4xl rounded-xl object-cover" 
          />
        </motion.div>
      </div>
    </section>
  );

}

export default LandingHero