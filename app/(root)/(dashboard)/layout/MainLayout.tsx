'use client'
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "./Header"; 

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if sidebar is collapsed
    const collapsed = localStorage.getItem("sidebar-collapsed") === "true";
    setSidebarWidth(collapsed ? 70 : 250);
    
    // Listen for custom event when sidebar is toggled
    const handleSidebarToggle = (event: CustomEvent) => {
      setSidebarWidth(event.detail.collapsed ? 70 : 250);
    };
    
    window.addEventListener("sidebar-toggle" as any, handleSidebarToggle as any);
    
    return () => {
      window.removeEventListener("sidebar-toggle" as any, handleSidebarToggle as any);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div 
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: isMobile ? 0 : sidebarWidth }}
      >
        <Header sidebarWidth={isMobile ? 0 : sidebarWidth} />
        
        <main className="flex-1 p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
