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

export default function Venues() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col gap-2 border-2 overflow-auto rounded-md [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
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
              <Card className="relative py-2 rounded-lg shrink-0 overflow-hidden">
                <CardContent className="group flex items-center justify-center px-2 rounded-md">
                  <CardDescription className="absolute inset-0 grid place-items-center rounded-md bg-card/50 backdrop-blur-sm text-xl font-bold text-card-foreground hover:bg-transparent hover:backdrop-blur-none">
                    <span className="hidden hover:text-primary group-hover:block">
                      Barbarea
                    </span>
                  </CardDescription>
                  <Image
                    className="rounded-sm shrink-0 group-hover:opacity-0 backdrop-blur-sm transition-all duration-200"
                    src="/barbarea.jpg"
                    alt="Barbarea"
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
