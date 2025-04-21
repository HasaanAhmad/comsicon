'use client'
import { motion } from "framer-motion";
import { AtSign, Users, Info } from "lucide-react";

import React from 'react'


const LandingFooter = () => {
    return (
        <footer className="w-full px-4 py-8 bg-[#ede8fb] bg-gradient-to-r from-[#ede8fb]/80 via-[#e5deff]/70 to-[#d3e4fd]/95 border-t border-[#ddd] mt-10">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="flex items-center gap-2 text-[#7E69AB] font-bold text-2xl"
            >
              <Users className="w-6 h-6" />
              TaskCollab
            </motion.div>
            <div className="flex gap-6 items-center text-[#888] text-sm">
              <a href="#" className="flex items-center gap-1 hover:text-[#9b87f5] transition-colors">
                <AtSign className="w-4 h-4" />
                Contact
              </a>
              <a href="#" className="flex items-center gap-1 hover:text-[#9b87f5] transition-colors">
                <Info className="w-4 h-4" />
                About
              </a>
              <a href="#" className="hover:text-[#9b87f5] transition-colors">
                Privacy
              </a>
            </div>
            <div className="text-xs text-[#aaa] text-center md:text-right">
              &copy; {new Date().getFullYear()} TaskCollab. All rights reserved.
            </div>
          </div>
        </footer>
      );
}

export default LandingFooter
