"use client"

import type React from "react"

import type { LucideIcon } from "lucide-react"

export interface ChartConfig {
  [key: string]: {
    label?: string
    color?: string
    icon?: LucideIcon
  }
}

export interface ChartContextValue {
  config: ChartConfig
  tooltipData: Record<string, any> | null
  setTooltipData: React.Dispatch<React.SetStateAction<Record<string, any> | null>>
  tooltipPoints: Record<string, any>[]
  setTooltipPoints: React.Dispatch<React.SetStateAction<Record<string, any>[]>>
}
