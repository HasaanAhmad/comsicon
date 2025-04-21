'use client'
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "This platform has completely transformed how our marketing team collaborates. We've cut meeting time in half while doubling our output.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Airwave Media"
  },
  {
    quote: "The performance tracking features give me insights I never had before. I can actually see what's working and what needs improvement.",
    author: "Michael Chen",
    role: "Project Manager",
    company: "Tensor Tech"
  },
  {
    quote: "We tried countless tools before this one. Nothing else combined task management, chat, and analytics in such an intuitive way.",
    author: "Priya Patel",
    role: "Team Lead",
    company: "Evergreen Solutions"
  },
  {
    quote: "The custom evaluation features help us maintain quality while keeping our team motivated. It's been a game-changer for us.",
    author: "Thomas Wright",
    role: "Operations Director",
    company: "Horizon Industries"
  }
];
import React from 'react'


const Testimonials = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#f8f9fa]">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1F2C] mb-4">
                Loved by teams everywhere
              </h2>
              <p className="text-[#403E43] text-lg max-w-xl mx-auto">
                Don't just take our word for it. See what teams are saying about their experience.
              </p>
            </motion.div>
            
            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <motion.div
                      className="p-1 h-full"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="border border-[#ede9f3] bg-white/80 backdrop-blur-sm h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <blockquote className="text-lg text-[#403E43] mb-6 flex-1">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="mt-auto">
                            <p className="font-medium text-[#1A1F2C]">{testimonial.author}</p>
                            <p className="text-sm text-[#7E69AB]">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="relative static h-10 w-10 border-[#9b87f5] text-[#9b87f5]" />
                <CarouselNext className="relative static h-10 w-10 border-[#9b87f5] text-[#9b87f5]" />
              </div>
            </Carousel>
          </div>
        </section>
      );
}

export default Testimonials
