"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Strategy {
  name: string
  allocation: number
  apy: string
}

interface StrategiesPieChartProps {
  strategies: Strategy[]
}

export function StrategiesPieChart({ strategies }: StrategiesPieChartProps) {
  // Generate colors with different hues but consistent saturation and lightness
  const colors = strategies.map((_, index) => {
    const hue = (index * 137.5) % 360 // Golden angle approximation for even distribution
    return `hsl(${hue}, 70%, 60%)`
  })

  // Format the data for the pie chart
  const data = strategies.map((strategy) => ({
    name: strategy.name,
    value: strategy.allocation,
    apy: strategy.apy,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Strategies</CardTitle>
        <CardDescription>How your vault allocates funds to generate returns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const strategy = strategies.find((s) => s.name === name)
                  return [`${value}% allocation, ${strategy?.apy} APY`, name]
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => {
                  const strategy = strategies.find((s) => s.name === value)
                  return (
                    <span className="text-sm">
                      {value} <span className="text-green-600 ml-2">{strategy?.apy}</span>
                    </span>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
