import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "small" | "large"
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  const sizeClasses = {
    small: "max-w-2xl",
    default: "max-w-4xl",
    large: "max-w-6xl",
  }

  return (
    <div className={cn("w-full mx-auto px-4 sm:px-6", sizeClasses[size], className)}>
      {children}
    </div>
  )
}
