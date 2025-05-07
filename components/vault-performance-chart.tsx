"use client"

import { useMemo } from "react"
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

interface VaultPerformanceChartProps {
  vault: any
}

export function VaultPerformanceChart({ vault }: VaultPerformanceChartProps) {
  // Format the historical APY data
  const data = useMemo(() => {
    return vault.historicalApy.map((item) => ({
      month: item.month,
      apy: item.apy,
    }))
  }, [vault.historicalApy])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickFormatter={(value) => value.split(" ")[0].substring(0, 3)} />
        <YAxis tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12 }} domain={[0, "dataMax + 2"]} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-3 shadow-md">
                  <div className="text-sm font-medium mb-2">{label}</div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-xs text-muted-foreground">APY:</span>
                    <span className="ml-auto text-xs font-medium">{payload[0].value}%</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="apy"
          name="Historical APY"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
