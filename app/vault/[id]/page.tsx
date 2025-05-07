"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  TrendingUp,
  AlertTriangle,
  Info,
  Clock,
  DollarSign,
  ArrowUpRight,
  Wallet,
  BarChart3,
  Percent,
  Calendar,
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VaultPerformanceChart } from "@/components/vault-performance-chart"
import { StrategiesPieChart } from "@/components/strategies-pie-chart"

// Update the vaultsData to remove references to multiple users
const vaultsData = [
  {
    id: "vault1",
    name: "Stablecoin Yield Vault",
    description: "Earn steady returns on stablecoins with minimal risk",
    longDescription:
      "This vault deposits your stablecoins across top lending protocols to generate steady yield while maintaining the stability of your principal investment. The strategy automatically rebalances to optimize for the highest yield while maintaining the stability of your principal investment.",
    apy: "4.8%",
    tvl: "$24.5M",
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
    strategies: [
      { name: "Aave Lending", allocation: 40, apy: "4.2%" },
      { name: "Compound Lending", allocation: 35, apy: "4.5%" },
      { name: "Curve Stablecoin LP", allocation: 25, apy: "6.1%" },
    ],
    launchedAt: "2022-05-15",
    historicalApy: [
      { month: "May 2022", apy: 4.2 },
      { month: "Jun 2022", apy: 4.5 },
      { month: "Jul 2022", apy: 4.3 },
      { month: "Aug 2022", apy: 4.7 },
      { month: "Sep 2022", apy: 4.9 },
      { month: "Oct 2022", apy: 5.1 },
      { month: "Nov 2022", apy: 4.8 },
      { month: "Dec 2022", apy: 4.6 },
      { month: "Jan 2023", apy: 4.7 },
      { month: "Feb 2023", apy: 4.9 },
      { month: "Mar 2023", apy: 5.0 },
      { month: "Apr 2023", apy: 4.8 },
    ],
  },
  {
    id: "vault2",
    name: "ETH Liquid Staking",
    description: "Stake your ETH while keeping it liquid",
    longDescription:
      "Convert your ETH to stETH and earn staking rewards while maintaining liquidity. Your stETH can be used in other DeFi protocols for additional yield. This vault automatically compounds rewards and optimizes for the highest yield across multiple liquid staking providers.",
    apy: "5.2%",
    tvl: "$56.8M",
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
    strategies: [
      { name: "Lido Staking", allocation: 60, apy: "4.8%" },
      { name: "Rocket Pool", allocation: 30, apy: "5.5%" },
      { name: "Frax Staking", allocation: 10, apy: "6.2%" },
    ],
    launchedAt: "2022-03-10",
    historicalApy: [
      { month: "Mar 2022", apy: 4.8 },
      { month: "Apr 2022", apy: 4.9 },
      { month: "May 2022", apy: 5.0 },
      { month: "Jun 2022", apy: 5.1 },
      { month: "Jul 2022", apy: 5.2 },
      { month: "Aug 2022", apy: 5.3 },
      { month: "Sep 2022", apy: 5.4 },
      { month: "Oct 2022", apy: 5.3 },
      { month: "Nov 2022", apy: 5.2 },
      { month: "Dec 2022", apy: 5.1 },
      { month: "Jan 2023", apy: 5.2 },
      { month: "Feb 2023", apy: 5.3 },
    ],
  },
  {
    id: "vault3",
    name: "Blue-Chip DeFi Index",
    description: "Diversified exposure to top DeFi tokens",
    longDescription:
      "This vault provides exposure to a basket of established DeFi tokens, rebalanced monthly to maintain optimal allocation. Earn yield through staking and lending. The strategy focuses on blue-chip DeFi protocols with proven track records and strong fundamentals.",
    apy: "8-15%",
    tvl: "$32.1M",
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
    strategies: [
      { name: "Token Staking", allocation: 45, apy: "10.2%" },
      { name: "Liquidity Provision", allocation: 35, apy: "12.5%" },
      { name: "Governance Rewards", allocation: 20, apy: "7.8%" },
    ],
    launchedAt: "2022-01-20",
    historicalApy: [
      { month: "Jan 2022", apy: 12.5 },
      { month: "Feb 2022", apy: 11.8 },
      { month: "Mar 2022", apy: 10.5 },
      { month: "Apr 2022", apy: 9.8 },
      { month: "May 2022", apy: 8.5 },
      { month: "Jun 2022", apy: 7.9 },
      { month: "Jul 2022", apy: 8.2 },
      { month: "Aug 2022", apy: 9.5 },
      { month: "Sep 2022", apy: 10.2 },
      { month: "Oct 2022", apy: 11.5 },
      { month: "Nov 2022", apy: 12.8 },
      { month: "Dec 2022", apy: 13.5 },
    ],
  },
  {
    id: "vault4",
    name: "Real Yield Optimizer",
    description: "Earn fees from actual protocol revenue",
    longDescription:
      "This vault stakes tokens in protocols that distribute actual trading fees and revenue to token holders, rather than relying on token emissions. The strategy focuses on sustainable yield from real economic activity in DeFi, providing more stable returns compared to inflationary farming strategies.",
    apy: "10-20%",
    tvl: "$18.7M",
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
    strategies: [
      { name: "GMX GLP Staking", allocation: 50, apy: "15.8%" },
      { name: "Arbitrum Ecosystem", allocation: 30, apy: "12.5%" },
      { name: "Optimism Ecosystem", allocation: 20, apy: "11.2%" },
    ],
    launchedAt: "2022-08-05",
    historicalApy: [
      { month: "Aug 2022", apy: 18.5 },
      { month: "Sep 2022", apy: 17.8 },
      { month: "Oct 2022", apy: 16.5 },
      { month: "Nov 2022", apy: 15.8 },
      { month: "Dec 2022", apy: 14.5 },
      { month: "Jan 2023", apy: 15.2 },
      { month: "Feb 2023", apy: 16.5 },
      { month: "Mar 2023", apy: 17.8 },
      { month: "Apr 2023", apy: 18.5 },
      { month: "May 2023", apy: 19.2 },
      { month: "Jun 2023", apy: 18.5 },
      { month: "Jul 2023", apy: 17.8 },
    ],
  },
]

export default function VaultDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [vault, setVault] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [investAmount, setInvestAmount] = useState("")

  useEffect(() => {
    // Find the vault by ID
    const foundVault = vaultsData.find((v) => v.id === params.id)
    if (foundVault) {
      setVault(foundVault)
    } else {
      // Redirect to report page if vault not found
      router.push("/report")
    }
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="container max-w-5xl py-10 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!vault) {
    return (
      <div className="container max-w-5xl py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Vault not found</h2>
          <p className="text-muted-foreground mt-2">The vault you're looking for doesn't exist.</p>
          <Button asChild className="mt-4">
            <Link href="/report">Back to Report</Link>
          </Button>
        </div>
      </div>
    )
  }

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

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <Link
          href="/report"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Opportunities
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`${vault.riskColor} bg-opacity-20 p-2 rounded-full`}>
              <vault.riskIcon className="h-6 w-6 text-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{vault.name}</h1>
            <Badge className={`${vault.riskColor} text-white`}>{vault.risk} Risk</Badge>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="w-full sm:w-auto">
              <Wallet className="mr-2 h-4 w-4" />
              Invest Now
            </Button>
          </motion.div>
        </div>
        <p className="text-muted-foreground">{vault.longDescription}</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-8">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Why This Vault Is Perfect For You</CardTitle>
              <CardDescription>Personalized recommendation based on your investment history</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`${vault.riskColor} bg-opacity-20 p-2 rounded-full mt-1`}>
                    <vault.riskIcon className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-2">This vault matches your balanced investment style</p>
                    <p className="text-muted-foreground">{vault.reasoning}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Proven Track Record</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Operating successfully since{" "}
                      {new Date(vault.launchedAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                    </p>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Consistent Returns</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maintained stable APY through various market conditions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle>Start Investing</CardTitle>
              <CardDescription>Begin earning returns with this vault</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="amount" className="text-sm font-medium">
                      Investment Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        id="amount"
                        type="text"
                        placeholder="1,000"
                        className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={investAmount}
                        onChange={(e) => setInvestAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available Balance</span>
                    <span>$5,230.45</span>
                  </div>
                  <Button className="w-full">Invest Now</Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By investing, you agree to the terms and conditions of this vault.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                  <h3 className="font-medium">Projected Returns</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Annual Return (est.)</span>
                      <span className="font-medium text-green-600">
                        {investAmount
                          ? `$${((Number.parseFloat(investAmount.replace(/,/g, "")) * Number.parseFloat(vault.apy)) / 100).toFixed(2)}`
                          : "$0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Monthly Return (est.)</span>
                      <span className="font-medium text-green-600">
                        {investAmount
                          ? `$${((Number.parseFloat(investAmount.replace(/,/g, "")) * Number.parseFloat(vault.apy)) / 100 / 12).toFixed(2)}`
                          : "$0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">5-Year Growth (est.)</span>
                      <span className="font-medium text-green-600">
                        {investAmount
                          ? `$${(Number.parseFloat(investAmount.replace(/,/g, "")) * Math.pow(1 + Number.parseFloat(vault.apy) / 100, 5)).toFixed(2)}`
                          : "$0.00"}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="bg-primary/5 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Investment Recommendation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Based on your risk profile, we recommend allocating 20-30% of your portfolio to this vault for
                      optimal diversification.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 bg-primary/5 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Your funds are protected by our security protocols and insurance coverage.</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>You can withdraw your funds at any time with no lock-up period.</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          <motion.div variants={item} className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Historical APY and projected returns</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <VaultPerformanceChart vault={vault} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                      <Percent className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-muted-foreground">Current APY</span>
                  </div>
                  <span className="font-medium text-green-600">{vault.apy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-muted-foreground">Total Value Locked</span>
                  </div>
                  <span className="font-medium">{vault.tvl}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-muted-foreground">Launch Date</span>
                  </div>
                  <span className="font-medium">{new Date(vault.launchedAt).toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Assets</span>
                  <div className="flex gap-1">
                    {vault.assets.map((asset) => (
                      <Badge key={asset} variant="outline" className="text-xs">
                        {asset}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Protocol</span>
                  <span className="font-medium">{vault.protocol}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Safety Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center rounded-full w-16 h-16 ${vault.riskColor} bg-opacity-20 mb-2`}
                  >
                    <span className="text-xl font-bold">{vault.riskAssessment.overallScore.split("/")[0]}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">out of 100</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Market Risk</span>
                    <span>{vault.riskAssessment.marketRisk}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Liquidity Risk</span>
                    <span>{vault.riskAssessment.liquidityRisk}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Counterparty Risk</span>
                    <span>{vault.riskAssessment.counterpartyRisk}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impermanent Loss</span>
                    <span>{vault.riskAssessment.impermanentLoss}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={item}>
          <Tabs defaultValue="strategies">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="strategies" className="mt-6">
              <StrategiesPieChart strategies={vault.strategies} />
            </TabsContent>
            <TabsContent value="faq" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Common questions about this vault</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">How does this vault generate returns?</h3>
                      <p className="text-sm text-muted-foreground">
                        This vault generates returns by{" "}
                        {vault.risk === "Low"
                          ? "lending assets to trusted protocols and collecting interest"
                          : vault.risk === "Medium"
                            ? "staking assets and participating in liquidity provision"
                            : "optimizing yield farming strategies across multiple protocols"}
                        .
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">What are the fees?</h3>
                      <p className="text-sm text-muted-foreground">
                        The vault charges a 0.5% management fee and a 10% performance fee on profits. There are no
                        deposit or withdrawal fees.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">How can I withdraw my funds?</h3>
                      <p className="text-sm text-muted-foreground">
                        You can withdraw your funds at any time. Withdrawals are typically processed within 24 hours,
                        depending on network conditions.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Is there a minimum investment amount?</h3>
                      <p className="text-sm text-muted-foreground">
                        The minimum investment amount is $100 worth of {vault.assets[0]}.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">How are the risks managed?</h3>
                      <p className="text-sm text-muted-foreground">
                        Risks are managed through diversification across multiple protocols, regular security audits,
                        and conservative allocation strategies. The vault also maintains insurance coverage for certain
                        types of risks.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#" className="flex items-center justify-center">
                      View Full Documentation
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
