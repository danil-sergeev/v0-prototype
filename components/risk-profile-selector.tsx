"use client"

import { useState } from "react"
import { AlertTriangle, Shield, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface RiskProfileSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function RiskProfileSelector({ value, onChange }: RiskProfileSelectorProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const profiles = [
    {
      id: "conservative",
      title: "Conservative",
      description: "Focus on capital preservation with steady, low-risk returns.",
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      stats: {
        expectedReturn: "5-10%",
        volatility: "Low",
        timeHorizon: "3+ years",
      },
    },
    {
      id: "balanced",
      title: "Balanced",
      description: "Balance between growth and security with moderate risk.",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      stats: {
        expectedReturn: "10-20%",
        volatility: "Medium",
        timeHorizon: "3-5 years",
      },
    },
    {
      id: "aggressive",
      title: "Aggressive",
      description: "Maximize growth potential with higher risk tolerance.",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      stats: {
        expectedReturn: "20-40%",
        volatility: "High",
        timeHorizon: "5+ years",
      },
    },
  ]

  return (
    <RadioGroup value={value} onValueChange={onChange} className="grid gap-4 md:grid-cols-3">
      {profiles.map((profile) => {
        const isSelected = value === profile.id
        const isHovered = hoveredCard === profile.id

        return (
          <div key={profile.id} className="relative">
            <RadioGroupItem value={profile.id} id={profile.id} className="sr-only" />
            <Label htmlFor={profile.id} className="sr-only">
              {profile.title}
            </Label>
            <Card
              className={cn(
                "cursor-pointer transition-all duration-200",
                isSelected ? `border-2 ${profile.borderColor} shadow-sm` : "border hover:border-muted-foreground/20",
                isHovered && !isSelected ? "border-muted-foreground/20" : "",
              )}
              onMouseEnter={() => setHoveredCard(profile.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => onChange(profile.id)}
            >
              <CardHeader className={cn("flex flex-row items-start space-y-0 pb-2", isSelected ? profile.bgColor : "")}>
                <div className="flex-1">
                  <CardTitle className={profile.color}>{profile.title}</CardTitle>
                  <CardDescription className="mt-1">{profile.description}</CardDescription>
                </div>
                <div className={cn("rounded-full p-2", isSelected ? profile.bgColor : "bg-muted")}>
                  <profile.icon className={cn("h-5 w-5", profile.color)} />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Expected Return</div>
                    <div className="font-medium">{profile.stats.expectedReturn}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Volatility</div>
                    <div className="font-medium">{profile.stats.volatility}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="text-xs text-muted-foreground">
                  Recommended time horizon: {profile.stats.timeHorizon}
                </div>
              </CardFooter>
            </Card>
          </div>
        )
      })}
    </RadioGroup>
  )
}
