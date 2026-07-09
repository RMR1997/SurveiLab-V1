"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
}

const variants = {
  hidden: (direction: string) => ({
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: (direction: string) => ({
    x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
    y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
    opacity: 0,
  }),
}

export function PageTransition({ children, direction = "right" }: PageTransitionProps) {
  return (
    <motion.div
      custom={direction}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
