"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Info, Share2, TrendingUp, AlertTriangle, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { PortfolioChart } from "@/components/portfolio-chart"
import { motion } from "framer-motion"

export default function ReportPage() {
  // Fixed risk profile based on analysis
  const riskProfile = "balanced"
  const [hoveredVault, setHoveredVault] = useState<string | null>(null)

  const vaults = [
    {
      id: "vault1",
      name: "Stablecoin Yield Vault",
      description: "Earn steady returns on stablecoins with minimal risk",
      apy: "4.8%",
      risk: "Low",
      riskColor: "bg-green-500",
      riskIcon: Shield,
      assets: ["USDC", "DAI"],
      protocol: "Aave",
      details:
        "This vault deposits your stablecoins across top lending protocols to generate steady yield while maintaining the stability of your principal investment.",
      reasoning:
        "Based on your on-chain history, you've shown a preference for stable, reliable returns. This vault aligns with your balanced risk profile while providing better yields than traditional savings.",
      riskAssessment: {
        marketRisk: "Very Low",
        liquidityRisk: "Very Low",
        counterpartyRisk: "Low",
        impermanentLoss: "None",
        overallScore: "95/100",
      },
    },
    {
      id: "vault2",
      name: "ETH Liquid Staking",
      description: "Stake your ETH while keeping it liquid",
      apy: "5.2%",
      risk: "Medium",
      riskColor: "bg-yellow-500",
      riskIcon: TrendingUp,
      assets: ["ETH"],
      protocol: "Lido",
      details:
        "Convert your ETH to stETH and earn staking rewards while maintaining liquidity. Your stETH can be used in other DeFi protocols for additional yield.",
      reasoning:
        "You've held ETH for long periods without actively using it. This vault lets you earn passive income on your ETH while keeping it available for other opportunities.",
      riskAssessment: {
        marketRisk: "Medium",
        liquidityRisk: "Low",
        counterpartyRisk: "Low",
        impermanentLoss: "None",
        overallScore: "82/100",
      },
    },
    {
      id: "vault3",
      name: "Blue-Chip DeFi Index",
      description: "Diversified exposure to top DeFi tokens",
      apy: "8-15%",
      risk: "Medium",
      riskColor: "bg-yellow-500",
      riskIcon: TrendingUp,
      assets: ["ETH", "AAVE", "UNI", "MKR"],
      protocol: "Index Coop",
      details:
        "This vault provides exposure to a basket of established DeFi tokens, rebalanced monthly to maintain optimal allocation. Earn yield through staking and lending.",
      reasoning:
        "Your transaction history shows interest in DeFi tokens but with cautious trading patterns. This index provides diversified exposure while reducing single-token risk.",
      riskAssessment: {
        marketRisk: "Medium",
        liquidityRisk: "Medium",
        counterpartyRisk: "Low",
        impermanentLoss: "Low",
        overallScore: "78/100",
      },
    },
    {
      id: "vault4",
      name: "Real Yield Optimizer",
      description: "Earn fees from actual protocol revenue",
      apy: "10-20%",
      risk: "Medium-High",
      riskColor: "bg-orange-500",
      riskIcon: AlertTriangle,
      assets: ["GMX", "GLP", "ARB"],
      protocol: "GMX",
      details:
        "This vault stakes tokens in protocols that distribute actual trading fees and revenue to token holders, rather than relying on token emissions.",
      reasoning:
        "While you generally prefer lower-risk investments, allocating a small portion to this vault could enhance your overall returns without significantly increasing portfolio risk.",
      riskAssessment: {
        marketRisk: "Medium-High",
        liquidityRisk: "Medium",
        counterpartyRisk: "Low",
        impermanentLoss: "Low",
        overallScore: "70/100",
      },
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const pulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <Link
          href="/curation"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Analysis
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Your DeFi Opportunities</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Share2 className="mr-2 h-4 w-4" />
                Share to X
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Save Report
              </Button>
            </motion.div>
          </div>
        </div>
        <p className="text-muted-foreground">
          We've analyzed your wallet activity and found these opportunities that match your investment style.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-primary border-2">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle>Recommended Vaults</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                These investment opportunities match your investment style and could help grow your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <motion.div variants={container} initial="hidden" animate="show" className="grid gap-4 md:grid-cols-2">
                {vaults.map((vault) => (
                  <motion.div
                    key={vault.id}
                    variants={item}
                    whileHover={{
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400, damping: 10 },
                    }}
                  >
                    <Link href={`/vault/${vault.id}`} className="block">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{vault.name}</h3>
                              <Badge className={`${vault.riskColor} text-white flex items-center gap-1`}>
                                <vault.riskIcon className="h-3 w-3" />
                                {vault.risk}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{vault.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-muted-foreground">Assets:</span>
                                <div className="flex gap-1">
                                  {vault.assets.map((asset) => (
                                    <Badge key={asset} variant="outline" className="text-xs">
                                      {asset}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm font-medium text-green-600">{vault.apy} APY</div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <span className="text-xs text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                View Details <ChevronRight className="h-3 w-3" />
                              </span>
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent side="right" align="start" className="w-80 p-0 shadow-lg border-primary/10">
                          <div className={`p-3 ${vault.riskColor} bg-opacity-10 border-b border-primary/10`}>
                            <h4 className="font-medium text-sm flex items-center gap-1">
                              <vault.riskIcon className="h-4 w-4" />
                              Risk Assessment
                            </h4>
                          </div>
                          <div className="p-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Market Risk:</span>
                              <span className="font-medium">{vault.riskAssessment.marketRisk}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Liquidity Risk:</span>
                              <span className="font-medium">{vault.riskAssessment.liquidityRisk}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Counterparty Risk:</span>
                              <span className="font-medium">{vault.riskAssessment.counterpartyRisk}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Impermanent Loss:</span>
                              <span className="font-medium">{vault.riskAssessment.impermanentLoss}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-medium">
                              <span>Safety Score:</span>
                              <span
                                className={`${vault.risk === "Low" ? "text-green-600" : vault.risk === "Medium" ? "text-yellow-600" : "text-orange-600"}`}
                              >
                                {vault.riskAssessment.overallScore}
                              </span>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
            <CardFooter className="bg-muted/30">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="link" className="h-auto p-0 text-sm">
                      How are these vaults selected?
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      We analyze your past transactions to understand your risk tolerance and investment preferences,
                      then match you with vaults that align with your style while optimizing for returns.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Your Investment Style</CardTitle>
              <CardDescription>
                Based on your wallet history, we've identified your investment style as:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={pulse}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg"
              >
                <Badge className="bg-purple-500 text-white mb-2 px-3 py-1 text-sm">Balanced Investor</Badge>
                <p className="text-lg font-medium mb-2">You balance growth with safety</p>
                <p className="text-muted-foreground max-w-md">
                  You tend to invest in established projects with good track records, occasionally exploring newer
                  opportunities. You prefer steady growth over high-risk, high-reward strategies.
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>5-Year Historical Performance</CardTitle>
              <CardDescription>
                Here's how your portfolio has performed over the past 5 years compared to traditional ETFs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioChart riskProfile={riskProfile} />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <Info className="h-4 w-4 mr-2" />
              Historical performance is based on your investment patterns and may not reflect actual returns.
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
