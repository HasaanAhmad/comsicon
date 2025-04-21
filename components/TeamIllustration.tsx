'use client'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from 'react'


const TeamIllustration = () => {
    return (
        <section className="container mx-auto py-28 flex flex-col items-center relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 top-20 w-64 h-64 rounded-full bg-[#e5deff]/30 blur-3xl"></div>
            <div className="absolute right-10 bottom-10 w-80 h-80 rounded-full bg-[#d3e4fd]/30 blur-3xl"></div>
          </div>
          
          <motion.div 
            className="max-w-3xl text-center relative z-10 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A1F2C] mb-6">
              Ready to transform how your team works?
            </h2>
            <p className="text-xl text-[#403E43] mb-8">
              Join thousands of teams who have already improved their productivity, communication, and results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 text-base shadow-md bg-[#9b87f5] hover:bg-[#7E69AB] transition">
                Get started for free
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-base border-[#9b87f5] text-[#9b87f5] hover:bg-[#f3f2fd]">
                Contact sales
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center text-center p-6">
              <div className="text-5xl font-bold text-[#9b87f5] mb-2">87%</div>
              <p className="text-[#403E43]">Increase in team productivity after switching to our platform</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="text-5xl font-bold text-[#33C3F0] mb-2">62%</div>
              <p className="text-[#403E43]">Reduction in time spent switching between tools and apps</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="text-5xl font-bold text-[#7E69AB] mb-2">94%</div>
              <p className="text-[#403E43]">Of users report improved team collaboration and communication</p>
            </div>
          </motion.div>
        </section>
      );
}

export default TeamIllustration