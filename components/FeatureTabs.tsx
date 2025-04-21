'use client'
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PieChart, MessageSquare, Users, BarChart, Check } from "lucide-react";

const tabScreens = [
  {
    value: "tasks",
    label: "Projects & Tasks",
    icon: <PieChart className="w-5 h-5 mr-2" />,
    illustration: "/assets/live_collaboration.png",
    title: "Stay Organized",
    desc: "Kanban boards, calendar view, priorities, and deadlines in one place. Assign tasks, drag-and-drop, and get work done efficiently."
  },
  {
    value: "chat",
    label: "Chat & Messaging",
    icon: <MessageSquare className="w-5 h-5 mr-2" />,
    illustration: "/assets/messages.png",
    title: "Talk Instantly",
    desc: "Project-based channels, private messages, and file sharing make collaboration easy and keep conversation focused."
  },
  {
    value: "evaluation",
    label: "Performance",
    icon: <BarChart className="w-5 h-5 mr-2" />,
    illustration: "/assets/performance.png",
    title: "Track Results",
    desc: "See your team's progress, track task completion rates, and view custom evaluation metrics, all on an intuitive dashboard."
  },
  {
    value: "team",
    label: "Teamwork",
    icon: <Users className="w-5 h-5 mr-2" />,
    illustration: "/assets/teamwork.png",
    title: "Collaborate Smarter",
    desc: "Built for teamwork. Share feedback, review contributions, and keep everyone motivated towards success."
  },
];

const FeatureTabs = () => {
        const [tab, setTab] = React.useState("tasks");
      
        // Find selected tab
        const activeTab = tabScreens.find(t => t.value === tab) || tabScreens[0];
      
        return (
          <section className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1F2C] mb-4">
                See how it works
              </h2>
              <p className="text-center text-[#403E43] mb-6 max-w-xl mx-auto">
                Explore the key features that make our platform the ultimate workspace for modern teams.
              </p>
            </motion.div>
            
            <div className="bg-white rounded-xl border border-[#ede8fb]/60 shadow-lg p-6 md:p-10">
              <Tabs defaultValue="tasks" value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="flex flex-wrap justify-center gap-1 md:gap-2 mb-10 rounded-lg bg-[#f8f9fa] p-1">
                  {tabScreens.map((t) => (
                    <TabsTrigger 
                      value={t.value} 
                      key={t.value} 
                      className="flex items-center text-base font-medium py-3 px-4 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white rounded-md"
                    >
                      {t.icon}<span className="hidden md:inline">{t.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <TabsContent key={tab} value={tab} forceMount>
                      <motion.div
                        className="flex flex-col md:flex-row items-center gap-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full md:w-1/2 relative">
                          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e5deff]/30 to-[#d3e4fd]/30 blur-2xl rounded-full"></div>
                          <motion.div
                            className="rounded-xl overflow-hidden shadow-lg border border-[#ede8fb]"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <img
                              src={activeTab.illustration}
                              alt={activeTab.title}
                              className="w-full h-auto border-0 object-scale-down "
                              style={{ aspectRatio: "" }}
                            />
                          </motion.div>
                        </div>
                        
                        <div className="w-full md:w-1/2">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <h3 className="text-2xl font-bold text-[#1A1F2C] mb-4">{activeTab.title}</h3>
                            <p className="text-[#403E43] text-lg mb-6">{activeTab.desc}</p>
                            <ul className="space-y-3">
                              {[1, 2, 3].map((item) => (
                                <motion.li 
                                  key={item}
                                  className="flex items-start gap-3"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.3 + (item * 0.1) }}
                                >
                                  <div className="rounded-full bg-[#f3f2fd] p-1 mt-1">
                                    <Check className="h-4 w-4 text-[#9b87f5]" />
                                  </div>
                                  <span className="text-[#555]">
                                    {tab === "tasks" && `Feature ${item} for task management`}
                                    {tab === "chat" && `Feature ${item} for team messaging`}
                                    {tab === "evaluation" && `Feature ${item} for performance tracking`}
                                    {tab === "team" && `Feature ${item} for better teamwork`}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </div>
              </Tabs>
            </div>
          </section>
        );
}

export default FeatureTabs