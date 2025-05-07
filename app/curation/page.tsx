"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

export default function CurationPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  const steps = [
    { name: "Analyzing transactions", description: "Looking at your DeFi activity..." },
    { name: "Calculating risk metrics", description: "Understanding your investment style..." },
    { name: "Generating recommendations", description: "Finding the best opportunities for you..." },
  ]

  useEffect(() => {
    // Simulate the analysis process
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setAnimationComplete(true)

          // Redirect to report page after animation completes
          setTimeout(() => {
            router.push("/report")
          }, 1500)

          return 100
        }

        // Update current step based on progress
        const newProgress = prevProgress + 1
        const stepIndex = Math.min(Math.floor((newProgress / 100) * steps.length), steps.length - 1)
        setCurrentStep(stepIndex)

        return newProgress
      })
    }, 80)

    return () => {
      clearInterval(timer)
    }
  }, [router, steps.length])

  // Calculate which steps are complete
  const getStepStatus = (index) => {
    const stepProgress = (progress / 100) * steps.length
    if (stepProgress >= index + 1) return "complete"
    if (Math.floor(stepProgress) === index) return "active"
    return "pending"
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
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container max-w-3xl py-10 flex flex-col items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mx-auto text-center mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-4">Analyzing Your Portfolio</h1>
        <p className="text-muted-foreground mb-8">
          Our AI is analyzing your investment history to create personalized recommendations.
        </p>

        <div className="space-y-6 w-full">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span>Analysis Progress</span>
              <motion.span
                key={progress}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {progress}%
              </motion.span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>
          </motion.div>

          <Card className="border border-muted overflow-hidden">
            <CardContent className="p-6">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
                {steps.map((step, index) => {
                  const status = getStepStatus(index)

                  return (
                    <motion.div key={index} variants={item} className="flex items-start gap-4">
                      <div className="mt-0.5">
                        <AnimatePresence mode="wait">
                          {status === "complete" ? (
                            <motion.div
                              key="complete"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="rounded-full bg-primary/20 p-1"
                            >
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            </motion.div>
                          ) : status === "active" ? (
                            <motion.div
                              key="active"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="rounded-full bg-primary/20 p-1"
                            >
                              <Loader2 className="h-5 w-5 text-primary animate-spin" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="pending"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="rounded-full border border-muted p-1"
                            >
                              <div className="h-5 w-5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${status === "pending" ? "text-muted-foreground" : ""}`}>
                            {step.name}
                          </p>
                          {status === "complete" && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="text-xs text-primary"
                            >
                              Complete
                            </motion.span>
                          )}
                        </div>
                        <p
                          className={`text-sm ${status === "pending" ? "text-muted-foreground/70" : "text-muted-foreground"}`}
                        >
                          {step.description}
                        </p>

                        {status === "active" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 space-y-2"
                          >
                            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: "0%" }}
                                animate={{
                                  width: `${((progress % (100 / steps.length)) / (100 / steps.length)) * 100}%`,
                                }}
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              {[1, 2, 3].map((i) => (
                                <motion.div
                                  key={i}
                                  className="h-1.5 rounded-full bg-muted"
                                  animate={{
                                    opacity: [0.3, 0.7, 0.3],
                                    scaleX: [0.8, 1, 0.8],
                                  }}
                                  transition={{
                                    repeat: Number.POSITIVE_INFINITY,
                                    duration: 1.5,
                                    delay: i * 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {animationComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="flex items-center justify-center space-x-2 text-primary"
              >
                <CheckCircle2 className="h-5 w-5" />
                <motion.span
                  className="font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  Analysis Complete! Redirecting to your report...
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-full max-w-md mx-auto mt-auto pb-8"
      >
        <p className="text-xs text-center text-muted-foreground">
          This analysis is for informational purposes only and does not constitute financial advice. Always do your own
          research before making investment decisions.
        </p>
      </motion.div>
    </div>
  )
}
