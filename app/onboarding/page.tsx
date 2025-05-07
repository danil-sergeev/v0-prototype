"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Wallet, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function OnboardingPage() {
  const router = useRouter()
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [connectionType, setConnectionType] = useState<string | null>(null)

  const handleConnect = (type: string) => {
    setConnectionType(type)
    setConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)

      // Redirect to curation page after successful connection
      setTimeout(() => {
        router.push("/curation")
      }, 1500)
    }, 2000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <div className="container max-w-5xl py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 space-y-4"
      >
        <h1 className="text-3xl font-bold tracking-tight">Connect Your Account</h1>
        <p className="text-muted-foreground">
          Connect your wallet or exchange account to analyze your investment history and provide personalized
          recommendations.
        </p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item}>
          <Card className="overflow-hidden border-primary/20 h-full">
            <CardHeader className="bg-primary/5">
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>Connect your crypto wallet to analyze your on-chain activity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-medium">Secure Connection</h3>
                <p className="text-sm text-muted-foreground">
                  We only request read access to analyze your transaction history. We never request transaction signing
                  permissions.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button className="w-full" onClick={() => handleConnect("wallet")} disabled={connecting || connected}>
                {connecting && connectionType === "wallet" ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </span>
                ) : connected && connectionType === "wallet" ? (
                  <span className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Connected! Redirecting...
                  </span>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Your data is encrypted and secure</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-yellow-500/20 h-full">
            <CardHeader className="bg-yellow-500/5">
              <CardTitle>Connect Binance</CardTitle>
              <CardDescription>Connect your Binance account to analyze your trading history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-500/10">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-yellow-500"
                  >
                    <path d="M16 0L19.6 3.6L9.6 13.6L6 10L16 0Z" fill="currentColor" />
                    <path d="M22.4 6.4L26 10L9.6 26.4L6 22.8L22.4 6.4Z" fill="currentColor" />
                    <path d="M3.2 12.8L6.8 16.4L3.2 20L0 16.4L3.2 12.8Z" fill="currentColor" />
                    <path d="M28.8 12.8L32 16.4L16 32L12.4 28.4L28.8 12.8Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-medium">API Access Only</h3>
                <p className="text-sm text-muted-foreground">
                  We use read-only API keys to analyze your trading history. We never request withdrawal permissions.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleConnect("binance")}
                disabled={connecting || connected}
              >
                {connecting && connectionType === "binance" ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </span>
                ) : connected && connectionType === "binance" ? (
                  <span className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Connected! Redirecting...
                  </span>
                ) : (
                  "Connect Binance"
                )}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Your exchange data is never shared</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 p-4 bg-muted/30 rounded-lg border border-muted"
      >
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded-full bg-primary/10 mt-0.5">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Your Privacy Matters</h3>
            <p className="text-sm text-muted-foreground">
              We only analyze your transaction history to provide personalized recommendations. Your data is encrypted,
              never sold, and you can delete it at any time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
