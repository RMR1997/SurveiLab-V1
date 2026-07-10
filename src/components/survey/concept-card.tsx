"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StartupIdea } from "@/types/survey"
import { cn } from "@/lib/utils"
import { Heart, TrendingUp, AlertTriangle } from "lucide-react"

interface ConceptCardProps {
  idea: StartupIdea
  className?: string
}

export function ConceptCard({ idea, className }: ConceptCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden border-0 shadow-xl",
      "bg-gradient-to-br from-white to-gray-50",
      "dark:from-slate-800 dark:to-slate-900",
      className
    )}>
      <CardContent className="p-0">
        {/* Mockup Preview */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
          {idea.mockupUrl ? (
            <img 
              src={idea.mockupUrl} 
              alt={`Mockup antarmuka untuk platform ${idea.name}`}
              className="absolute inset-0 w-full h-full object-contain bg-white dark:bg-slate-800"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
                style={{ backgroundColor: idea.colorPrimary }}
              >
                {idea.name.charAt(0)}
              </div>
            </div>
          )}
          {/* Browser mockup frame */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100/90 dark:bg-slate-700/90 flex items-center px-3 gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
              style={{ backgroundColor: idea.colorPrimary }}
            >
              {idea.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg">{idea.name}</h3>
              <p className="text-sm text-muted-foreground">{idea.tagline}</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {idea.description}
          </p>

          {/* Keresahan section */}
          {(idea.motivation || idea.benefits || idea.challenges) && (
            <div className="space-y-3 pt-1">
              <div
                className="h-px w-full"
                style={{ background: `linear-gradient(to right, ${idea.colorPrimary}40, transparent)` }}
              />

              {idea.motivation && (
                <div className="flex gap-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                  <Heart className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">Latar Belakang & Keresahan</p>
                    <p className="text-xs text-rose-700/80 dark:text-rose-300/80 leading-relaxed">{idea.motivation}</p>
                  </div>
                </div>
              )}

              {idea.benefits && (
                <div className="flex gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <TrendingUp className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Potensi & Keuntungan</p>
                    <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 leading-relaxed">{idea.benefits}</p>
                  </div>
                </div>
              )}

              {idea.challenges && (
                <div className="flex gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Tantangan yang Dihadapi</p>
                    <p className="text-xs text-amber-700/80 dark:text-amber-300/80 leading-relaxed">{idea.challenges}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
