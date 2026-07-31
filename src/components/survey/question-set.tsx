"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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

interface CustomBehaviorQuestionProps {
  id: string
  question: string
  type: 'single' | 'multiple'
  options: string[]
  hasOther?: boolean
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function CustomBehaviorQuestion({
  id,
  question,
  type,
  options,
  hasOther = true,
  value,
  onChange,
  required = true
}: CustomBehaviorQuestionProps) {
  // Parse initial selected values
  const getInitialSelected = () => {
    if (type === 'multiple') {
      try {
        if (value && (value.startsWith('[') || value.startsWith('{'))) {
          return JSON.parse(value) as string[]
        }
      } catch (e) {}
      return []
    }
    return []
  }

  const [selectedList, setSelectedList] = useState<string[]>(getInitialSelected())
  const [singleSelected, setSingleSelected] = useState<string>('')
  const [otherText, setOtherText] = useState('')
  const [isOtherSelected, setIsOtherSelected] = useState(false)

  // Sync state if value changes externally (e.g. on mount/load)
  useEffect(() => {
    if (type === 'multiple') {
      const parsed = getInitialSelected()
      setSelectedList(parsed)
      // Check if there is an "other" option in parsed
      const otherItem = parsed.find(item => item.startsWith('Lainnya: '))
      if (otherItem) {
        setIsOtherSelected(true)
        setOtherText(otherItem.replace('Lainnya: ', ''))
      } else {
        setIsOtherSelected(false)
      }
    } else {
      if (value) {
        if (value.startsWith('Lainnya: ')) {
          setSingleSelected('Lainnya')
          setIsOtherSelected(true)
          setOtherText(value.replace('Lainnya: ', ''))
        } else {
          setSingleSelected(value)
          setIsOtherSelected(false)
        }
      } else {
        setSingleSelected('')
        setIsOtherSelected(false)
      }
    }
  }, [value, type])

  const handleCheckboxChange = (opt: string, checked: boolean) => {
    let newList = [...selectedList]
    if (checked) {
      if (!newList.includes(opt)) {
        newList.push(opt)
      }
    } else {
      newList = newList.filter(item => item !== opt)
    }
    setSelectedList(newList)
    onChange(JSON.stringify(newList))
  }

  const handleOtherCheckboxChange = (checked: boolean) => {
    setIsOtherSelected(checked)
    let newList = selectedList.filter(item => !item.startsWith('Lainnya: '))
    if (checked) {
      const otherVal = otherText.trim() ? `Lainnya: ${otherText.trim()}` : 'Lainnya'
      newList.push(otherVal)
    }
    setSelectedList(newList)
    onChange(JSON.stringify(newList))
  }

  const handleOtherTextChange = (text: string) => {
    setOtherText(text)
    if (type === 'multiple') {
      let newList = selectedList.filter(item => !item.startsWith('Lainnya: '))
      if (isOtherSelected) {
        const otherVal = text.trim() ? `Lainnya: ${text.trim()}` : 'Lainnya'
        newList.push(otherVal)
      }
      setSelectedList(newList)
      onChange(JSON.stringify(newList))
    } else {
      const otherVal = text.trim() ? `Lainnya: ${text.trim()}` : 'Lainnya'
      onChange(otherVal)
    }
  }

  const handleRadioChange = (opt: string) => {
    setSingleSelected(opt)
    setIsOtherSelected(false)
    onChange(opt)
  }

  const handleOtherRadioSelect = () => {
    setSingleSelected('Lainnya')
    setIsOtherSelected(true)
    const otherVal = otherText.trim() ? `Lainnya: ${otherText.trim()}` : 'Lainnya'
    onChange(otherVal)
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-semibold leading-relaxed block text-slate-800 dark:text-slate-200">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {type === 'multiple' ? (
        <div className="space-y-3">
          {options.map((option) => {
            const isChecked = selectedList.includes(option)
            return (
              <label
                key={option}
                className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-muted/50 [&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-primary/5 dark:[&:has(input:checked)]:bg-primary/10 border-slate-200 dark:border-slate-700"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                  className="mt-1 h-4.5 w-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                />
                <div className="flex-1">
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{option}</span>
                </div>
              </label>
            )
          })}
          
          {hasOther && (
            <div className="space-y-3">
              <label
                className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-muted/50 [&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-primary/5 dark:[&:has(input:checked)]:bg-primary/10 border-slate-200 dark:border-slate-700"
              >
                <input
                  type="checkbox"
                  checked={isOtherSelected}
                  onChange={(e) => handleOtherCheckboxChange(e.target.checked)}
                  className="mt-1 h-4.5 w-4.5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                />
                <div className="flex-1">
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Lainnya (Tuliskan sendiri)</span>
                </div>
              </label>
              
              {isOtherSelected && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-8"
                >
                  <Input
                    type="text"
                    value={otherText}
                    onChange={(e) => handleOtherTextChange(e.target.value)}
                    placeholder="Tuliskan kondisi / jawaban Anda di sini..."
                    className="rounded-xl h-11 border-primary/40 focus-visible:ring-primary"
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {options.map((option) => {
            const isChecked = singleSelected === option
            return (
              <label
                key={option}
                className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-muted/50 [&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-primary/5 dark:[&:has(input:checked)]:bg-primary/10 border-slate-200 dark:border-slate-700"
              >
                <input
                  type="radio"
                  name={id}
                  checked={isChecked}
                  onChange={() => handleRadioChange(option)}
                  className="mt-1 h-4.5 w-4.5 border-slate-300 text-primary focus:ring-primary accent-primary"
                />
                <div className="flex-1">
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{option}</span>
                </div>
              </label>
            )
          })}
          
          {hasOther && (
            <div className="space-y-3">
              <label
                className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-muted/50 [&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-primary/5 dark:[&:has(input:checked)]:bg-primary/10 border-slate-200 dark:border-slate-700"
              >
                <input
                  type="radio"
                  name={id}
                  checked={singleSelected === 'Lainnya'}
                  onChange={handleOtherRadioSelect}
                  className="mt-1 h-4.5 w-4.5 border-slate-300 text-primary focus:ring-primary accent-primary"
                />
                <div className="flex-1">
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">Lainnya (Tuliskan sendiri)</span>
                </div>
              </label>
              
              {isOtherSelected && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pl-8"
                >
                  <Input
                    type="text"
                    value={otherText}
                    onChange={(e) => handleOtherTextChange(e.target.value)}
                    placeholder="Tuliskan kondisi / jawaban Anda di sini..."
                    className="rounded-xl h-11 border-primary/40 focus-visible:ring-primary"
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
