"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Building, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription } from "../ui/card";

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
    <div className="flex flex-col gap-2 overflow-auto rounded-2xl border-2 [-ms-overflow-style:none] [scrollbar-width:none] [::-webkit-scrollbar]:hidden">
      <div className="sticky left-0 flex justify-between">
        <h1 className="flex items-center gap-2 p-4 font-bold text-2xl">
          <Building className="size-6" />
          <span>Venues</span>
        </h1>
        <Button
          className="rounded-t-none rounded-r-none border-2 border-t-0 border-r-0"
          onClick={handleExpandClick}
          variant="outline"
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
        animate={expanded ? "expanded" : "collapsed"}
        className={cn("flex gap-4 p-4", expanded ? "flex-wrap" : "")}
        initial="collapsed"
        layout
        transition={{
          layout: {
            type: "spring",
            stiffness: 200,
            damping: 25,
          },
        }}
        variants={containerVariants}
      >
        <AnimatePresence mode="popLayout">
          {venues.map((venue, _index) => (
            <motion.div
              animate={expanded ? "expanded" : "collapsed"}
              initial="collapsed"
              key={venue.name}
              layout
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }}
              variants={cardVariants}
            >
              <Card className="relative w-[160px] shrink-0 overflow-hidden rounded-lg py-2">
                <CardContent className="group flex h-[160px] items-center justify-center rounded-md px-2">
                  <CardDescription className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 rounded-md bg-black/60 p-2 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-bold text-lg">{venue.name}</span>
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 font-medium text-xs">
                      {venue.type}
                    </span>
                    <span className="text-xs">Espresso: {venue.espresso}</span>
                  </CardDescription>
                  <Image
                    alt={venue.name}
                    className="h-full w-full shrink-0 rounded-sm object-cover"
                    height={144}
                    src={venue.image}
                    width={144}
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
