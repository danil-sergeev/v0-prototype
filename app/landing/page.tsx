"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Shield, TrendingUp, Wallet, BarChart3, Zap, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20">
        <div className="container max-w-5xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Optimize Your <span className="text-primary">DeFi Portfolio</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Personalized investment vaults tailored to your risk profile and investment goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl p-6 shadow-xl">
                <div className="bg-card rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Your Portfolio</h3>
                    <span className="text-green-600 font-medium">+12.4%</span>
                  </div>
                  <div className="h-40 bg-muted/50 rounded-lg mb-4 flex items-center justify-center">
                    <BarChart3 className="h-20 w-20 text-muted-foreground/30" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Value</p>
                      <p className="font-medium text-lg">$24,560.45</p>
                    </div>
                    <Button size="sm">
                      View Details <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary/10 h-40 w-40 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform analyzes your investment history to create personalized DeFi vaults that match your risk
              profile and maximize returns.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Connect</CardTitle>
                  <CardDescription>Connect your wallet or exchange account</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Securely connect your crypto wallet or exchange account. We only analyze your transaction history
                    and never request transaction signing permissions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Analyze</CardTitle>
                  <CardDescription>We analyze your investment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our AI analyzes your transaction history to understand your risk tolerance, investment preferences,
                    and goals to create a personalized investment profile.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Invest</CardTitle>
                  <CardDescription>Invest in personalized vaults</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose from personalized investment vaults that match your risk profile and investment goals.
                    Monitor performance and adjust your strategy anytime.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique advantages to help you maximize your DeFi investments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Security First</h3>
                  <p className="text-muted-foreground">
                    Your security is our top priority. We use industry-leading security practices and never request
                    transaction signing permissions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Optimized Returns</h3>
                  <p className="text-muted-foreground">
                    Our AI-powered platform continuously optimizes your portfolio to maximize returns while staying
                    within your risk tolerance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Personalized Strategy</h3>
                  <p className="text-muted-foreground">
                    Every investment recommendation is tailored to your unique investment history and preferences.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-lg"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Performance Comparison</h3>
                  <span className="text-xs text-muted-foreground">Last 12 months</span>
                </div>
                <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-20 w-20 text-muted-foreground/30" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm">Our Vaults</span>
                    </div>
                    <span className="font-medium text-green-600">+24.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                      <span className="text-sm">Traditional ETFs</span>
                    </div>
                    <span className="font-medium">+8.2%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your DeFi Portfolio?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of investors who are maximizing their returns with our personalized DeFi vaults.
            </p>
            <Button size="lg" asChild>
              <Link href="/onboarding">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">DeFi Portfolio Optimizer</h3>
              <p className="text-muted-foreground">Personalized investment vaults for maximum returns</p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} DeFi Portfolio Optimizer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
