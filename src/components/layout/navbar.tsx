"use client"

import { Moon, Sun, ClipboardList } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface NavbarProps {
  progress?: number
  showProgress?: boolean
  className?: string
}

export function Navbar({ progress = 0, showProgress = false, className }: NavbarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 glass border-b border-border/50",
      className
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg leading-tight">SurveiLab</h1>
            <p className="text-xs text-muted-foreground">Idea Validation</p>
          </div>
        </div>

        {/* Progress */}
        {showProgress && (
          <div className="flex-1 max-w-md mx-4 sm:mx-8" role="region" aria-label="Survey progress">
            <div className="flex justify-between text-xs mb-1.5 text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Survey completion progress" />
          </div>
        )}

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-lg"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
