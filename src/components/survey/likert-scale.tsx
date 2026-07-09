"use client"

import { cn } from "@/lib/utils"
import { LikertLabels } from "@/types/survey"

interface LikertScaleProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  labels: LikertLabels
  className?: string
}

export function LikertScale({ 
  value, 
  onChange, 
  min = 1, 
  max = 5, 
  labels,
  className 
}: LikertScaleProps) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-xl font-semibold text-sm sm:text-base",
              "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "hover:scale-105 active:scale-95",
              value === option
                ? "bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary ring-offset-2"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>
    </div>
  )
}
