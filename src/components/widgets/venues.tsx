"use client";

import { Card, CardContent, CardDescription } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Building, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  collapsed: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  expanded: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  collapsed: {
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
  expanded: {
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    },
  },
};

const venues = [
  {
    name: "Barbarea",
    espresso: "3.50€",
    type: "Restaurant",
    desc: "Organic sourdough pizza & natural wine",
    image: "/barbarea.jpg",
  },
  {
    name: "Pudel Bar",
    espresso: "3.00€",
    type: "Bar",
    desc: "Craft beer haven in Telliskivi",
    image: "/barbarea.jpg",
  },
  {
    name: "NoKu",
    espresso: "2.50€",
    type: "Culture Club",
    desc: "Hidden gem in Old Town",
    image: "/barbarea.jpg",
  },
  {
    name: "Spaces & Levier",
    espresso: "4.00€",
    type: "Coworking & Cafe",
    desc: "Productive vibes in Rotermanni",
    image: "/barbarea.jpg",
  },
  {
    name: "Whisper Sister",
    espresso: "5.00€",
    type: "Cocktail Bar",
    desc: "Secret speakeasy experience",
    image: "/barbarea.jpg",
  },
];

export default function Venues() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col gap-2 border-2 overflow-auto rounded-2xl [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="sticky left-0 flex justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-bold p-2">
          <Building className="size-6" />
          <span>Venues</span>
        </h1>
        <Button
          variant="outline"
          className="border-2 border-t-0 border-r-0 rounded-r-none rounded-t-none"
          onClick={handleExpandClick}
        >
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Plus className="size-4" />
          </motion.span>
          {expanded ? "Collapse" : "Expand"} Venues
        </Button>
      </div>
      <motion.div
        layout
        variants={containerVariants}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
        className={cn("flex gap-2 p-2", expanded ? "flex-wrap" : "")}
        transition={{
          layout: {
            type: "spring",
            stiffness: 200,
            damping: 25,
          },
        }}
      >
        <AnimatePresence mode="popLayout">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              layout
              variants={cardVariants}
              initial="collapsed"
              animate={expanded ? "expanded" : "collapsed"}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
            >
              <Card className="relative py-2 rounded-lg shrink-0 overflow-hidden w-[160px]">
                <CardContent className="group flex items-center justify-center px-2 rounded-md h-[160px]">
                  <CardDescription className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-md bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white p-2 text-center">
                    <span className="text-lg font-bold">{venue.name}</span>
                    <span className="text-xs font-medium bg-primary/20 px-2 py-0.5 rounded-full">{venue.type}</span>
                    <span className="text-xs">Espresso: {venue.espresso}</span>
                  </CardDescription>
                  <Image
                    className="rounded-sm shrink-0 object-cover h-full w-full"
                    src={venue.image}
                    alt={venue.name}
                    width={144}
                    height={144}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
