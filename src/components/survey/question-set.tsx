"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LikertScale } from "./likert-scale"
import { NPSScale } from "./nps-scale"
import { SelectOption, LikertLabels } from "@/types/survey"

interface RadioQuestionProps {
  id: string
  question: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function RadioQuestion({ 
  id, 
  question, 
  options, 
  value, 
  onChange,
  required = true 
}: RadioQuestionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium leading-relaxed">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
          >
            <RadioGroupItem value={option.value} id={`${id}-${option.value}`} className="mt-0.5" />
            <div className="flex-1">
              <span className="font-medium">{option.label}</span>
              {option.description && (
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}

interface LikertQuestionProps {
  id: string
  question: string
  value: number
  onChange: (value: number) => void
  labels: LikertLabels
  required?: boolean
}

export function LikertQuestion({ 
  id, 
  question, 
  value, 
  onChange,
  labels,
  required = true 
}: LikertQuestionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium leading-relaxed">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <LikertScale value={value} onChange={onChange} labels={labels} />
    </div>
  )
}

interface NPSQuestionProps {
  id: string
  question: string
  value: number
  onChange: (value: number) => void
  required?: boolean
}

export function NPSQuestion({ 
  id, 
  question, 
  value, 
  onChange,
  required = true 
}: NPSQuestionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium leading-relaxed">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <NPSScale value={value} onChange={onChange} />
    </div>
  )
}
