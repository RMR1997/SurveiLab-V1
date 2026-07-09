"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: string
  label: string
  isComplete: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string
  className?: string
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isPast = index < currentIndex || step.isComplete
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110",
                    isPast && "bg-green-500 text-white",
                    !isActive && !isPast && "bg-muted text-muted-foreground"
                  )}
                >
                  {isPast && !isActive ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 hidden sm:block transition-colors duration-200",
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 rounded-full transition-all duration-500",
                    isPast ? "bg-green-500" : "bg-muted"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
