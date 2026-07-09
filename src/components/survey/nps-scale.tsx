"use client"

import { cn } from "@/lib/utils"

interface NPSScaleProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function NPSScale({ value, onChange, className }: NPSScaleProps) {
  const options = Array.from({ length: 11 }, (_, i) => i)
  
  const getColorClass = (score: number) => {
    if (score <= 6) return "text-red-500"
    if (score <= 8) return "text-yellow-500"
    return "text-green-500"
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-1 sm:gap-1.5">
        {options.map((option) => {
          const isSelected = value === option
          const colorClass = getColorClass(option)
          
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "w-7 h-9 sm:w-10 sm:h-12 rounded-lg font-semibold text-xs sm:text-sm",
                "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "hover:scale-105 active:scale-95 flex items-center justify-center",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary ring-offset-2"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="text-red-500 font-medium">Tidak mungkin (0)</span>
        <span className="text-green-500 font-medium">Sangat mungkin (10)</span>
      </div>
      {value >= 0 && (
        <p className="text-sm text-center text-muted-foreground">
          Pilihan Anda: <span className={cn("font-semibold", getColorClass(value))}>{value}</span>
        </p>
      )}
    </div>
  )
}
