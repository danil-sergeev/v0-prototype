"use client"

import * as React from "react"
import type { ChartConfig, ChartContextValue } from "./chart-context"
import { cn } from "@/lib/utils"

const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChartContext() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChartContext must be used within a ChartProvider")
  }

  return context
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: ChartConfig
  children: React.ReactNode
}

function ChartContainer({ config = {}, children, className, ...props }: ChartContainerProps) {
  const [tooltipData, setTooltipData] = React.useState<Record<string, any> | null>(null)
  const [tooltipPoints, setTooltipPoints] = React.useState<Record<string, any>[]>([])

  // Set CSS variables for chart colors
  React.useEffect(() => {
    const root = document.documentElement
    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        root.style.setProperty(`--color-${key}`, value.color)
      }
    })

    return () => {
      Object.keys(config).forEach((key) => {
        root.style.removeProperty(`--color-${key}`)
      })
    }
  }, [config])

  return (
    <ChartContext.Provider
      value={{
        config,
        tooltipData,
        setTooltipData,
        tooltipPoints,
        setTooltipPoints,
      }}
    >
      <div className={cn("w-full h-full", className)} {...props}>
        {children}
      </div>
    </ChartContext.Provider>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  content?: React.ReactNode
  defaultIndex?: number
  cursor?: boolean | React.ReactNode
}

function ChartTooltip({ className, content, defaultIndex, cursor = true, ...props }: ChartTooltipProps) {
  return (
    <div className={cn("chart-tooltip", className)} {...props}>
      {content}
    </div>
  )
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  formatValue?: (value: any) => string
  hideLabel?: boolean
}

function ChartTooltipContent({
  className,
  formatValue = (value) => value?.toString(),
  hideLabel = false,
  ...props
}: ChartTooltipContentProps) {
  const { config, tooltipData } = useChartContext()

  if (!tooltipData) {
    return null
  }

  return (
    <div className={cn("flex flex-col gap-2 rounded-lg border bg-background p-3 shadow-md", className)} {...props}>
      {!hideLabel && tooltipData.label && <div className="text-sm font-medium">{tooltipData.label}</div>}
      <div className="flex flex-col gap-1">
        {Object.entries(tooltipData)
          .filter(([key]) => key !== "label" && key !== "name" && config[key])
          .map(([key, value]) => {
            const { label, color, icon: Icon } = config[key] || {}
            return (
              <div key={key} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {Icon && <Icon className="h-3 w-3" style={{ color }} />}
                <span className="text-xs text-muted-foreground">{label}:</span>
                <span className="ml-auto text-xs font-medium">{formatValue(value)}</span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, useChartContext }
