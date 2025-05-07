"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to onboarding page immediately
    router.push("/onboarding")
  }, [router])

  return null
}
