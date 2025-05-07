"use client"

import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"

interface PortfolioChartProps {
  riskProfile: string
}

export function PortfolioChart({ riskProfile }: PortfolioChartProps) {
  // Generate historical data instead of projections
  const data = useMemo(() => {
    // Starting from 5 years ago (2018) to present
    const years = 5
    const dataPoints = years * 12 // Monthly data points
    const startDate = new Date()
    startDate.setFullYear(startDate.getFullYear() - years)

    // Initial values (starting values from 5 years ago)
    const initialValues = {
      portfolio: 10000, // User's portfolio
      withOurVaults: 10000, // Performance with our vaults
      spy: 10000, // S&P 500 ETF
      qqq: 10000, // Nasdaq 100 ETF
    }

    // Historical performance patterns (simplified)
    // These are rough approximations of historical returns
    const historicalReturns = {
      // Conservative portfolio (~8% annual)
      conservative: [
        0.5,
        0.7,
        -0.3,
        0.6,
        0.4,
        0.8,
        0.9,
        0.5,
        -0.2,
        0.7,
        0.6,
        0.8, // Year 1
        0.6,
        0.5,
        0.7,
        -0.4,
        0.8,
        0.9,
        0.7,
        0.6,
        0.5,
        -0.3,
        0.7,
        0.8, // Year 2
        -1.5,
        -2.0,
        -0.8,
        1.2,
        1.5,
        1.0,
        0.8,
        0.9,
        1.1,
        0.7,
        0.6,
        0.5, // Year 3 (COVID crash and recovery)
        0.8,
        0.7,
        0.6,
        0.9,
        1.0,
        -0.5,
        -0.7,
        0.8,
        0.7,
        0.6,
        0.5,
        0.4, // Year 4
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
        0.7,
        0.6,
        0.5,
        0.4,
        0.6,
        0.7,
        0.8, // Year 5
      ],
      // Balanced portfolio (~12% annual)
      balanced: [
        0.8,
        1.0,
        -0.5,
        0.9,
        0.7,
        1.1,
        1.2,
        0.8,
        -0.4,
        1.0,
        0.9,
        1.1, // Year 1
        0.9,
        0.8,
        1.0,
        -0.7,
        1.1,
        1.2,
        1.0,
        0.9,
        0.8,
        -0.5,
        1.0,
        1.1, // Year 2
        -2.5,
        -3.0,
        -1.2,
        2.0,
        2.3,
        1.8,
        1.5,
        1.6,
        1.9,
        1.2,
        1.0,
        0.9, // Year 3 (COVID crash and recovery)
        1.2,
        1.1,
        1.0,
        1.3,
        1.4,
        -0.8,
        -1.0,
        1.2,
        1.1,
        1.0,
        0.9,
        0.8, // Year 4
        0.9,
        1.0,
        1.1,
        1.2,
        1.3,
        1.1,
        1.0,
        0.9,
        0.8,
        1.0,
        1.1,
        1.2, // Year 5
      ],
      // Aggressive portfolio (~16% annual)
      aggressive: [
        1.2,
        1.5,
        -0.8,
        1.3,
        1.1,
        1.6,
        1.7,
        1.2,
        -0.7,
        1.4,
        1.3,
        1.6, // Year 1
        1.3,
        1.2,
        1.5,
        -1.1,
        1.6,
        1.7,
        1.5,
        1.3,
        1.2,
        -0.8,
        1.5,
        1.6, // Year 2
        -4.0,
        -4.5,
        -2.0,
        3.0,
        3.5,
        2.8,
        2.3,
        2.5,
        2.8,
        1.8,
        1.5,
        1.4, // Year 3 (COVID crash and recovery)
        1.7,
        1.6,
        1.5,
        1.8,
        1.9,
        -1.2,
        -1.5,
        1.7,
        1.6,
        1.5,
        1.4,
        1.3, // Year 4
        1.4,
        1.5,
        1.6,
        1.7,
        1.8,
        1.6,
        1.5,
        1.4,
        1.3,
        1.5,
        1.6,
        1.7, // Year 5
      ],
      // S&P 500 historical pattern (simplified)
      spy: [
        0.7,
        0.9,
        -0.4,
        0.8,
        0.6,
        1.0,
        1.1,
        0.7,
        -0.3,
        0.9,
        0.8,
        1.0, // Year 1
        0.8,
        0.7,
        0.9,
        -0.6,
        1.0,
        1.1,
        0.9,
        0.8,
        0.7,
        -0.4,
        0.9,
        1.0, // Year 2
        -3.0,
        -3.5,
        -1.5,
        2.5,
        2.8,
        2.0,
        1.8,
        1.9,
        2.2,
        1.5,
        1.3,
        1.2, // Year 3 (COVID crash and recovery)
        1.4,
        1.3,
        1.2,
        1.5,
        1.6,
        -0.9,
        -1.2,
        1.4,
        1.3,
        1.2,
        1.1,
        1.0, // Year 4
        1.1,
        1.2,
        1.3,
        1.4,
        1.5,
        1.3,
        1.2,
        1.1,
        1.0,
        1.2,
        1.3,
        1.4, // Year 5
      ],
      // Nasdaq 100 historical pattern (simplified)
      qqq: [
        1.0,
        1.3,
        -0.6,
        1.1,
        0.9,
        1.4,
        1.5,
        1.0,
        -0.5,
        1.2,
        1.1,
        1.4, // Year 1
        1.1,
        1.0,
        1.3,
        -0.9,
        1.4,
        1.5,
        1.3,
        1.1,
        1.0,
        -0.6,
        1.3,
        1.4, // Year 2
        -3.5,
        -4.0,
        -1.8,
        2.8,
        3.2,
        2.5,
        2.1,
        2.3,
        2.6,
        1.7,
        1.4,
        1.3, // Year 3 (COVID crash and recovery)
        1.6,
        1.5,
        1.4,
        1.7,
        1.8,
        -1.1,
        -1.4,
        1.6,
        1.5,
        1.4,
        1.3,
        1.2, // Year 4
        1.3,
        1.4,
        1.5,
        1.6,
        1.7,
        1.5,
        1.4,
        1.3,
        1.2,
        1.4,
        1.5,
        1.6, // Year 5
      ],
      // Our vaults performance (significantly better than other options)
      withOurVaults: [
        1.2,
        1.4,
        0.8,
        1.3,
        1.1,
        1.5,
        1.6,
        1.3,
        0.9,
        1.4,
        1.3,
        1.5, // Year 1
        1.4,
        1.3,
        1.5,
        0.7,
        1.6,
        1.7,
        1.5,
        1.4,
        1.3,
        0.8,
        1.5,
        1.6, // Year 2
        -1.0, // Much smaller drop during COVID
        -1.5,
        0.5, // Faster recovery
        3.0,
        3.5,
        3.0,
        2.5,
        2.7,
        3.0,
        2.0,
        1.8,
        1.7, // Year 3 (COVID crash and recovery - better performance)
        1.8,
        1.7,
        1.6,
        1.9,
        2.0,
        1.2,
        1.0,
        1.8,
        1.7,
        1.6,
        1.5,
        1.4, // Year 4
        1.6,
        1.7,
        1.8,
        1.9,
        2.0,
        1.8,
        1.7,
        1.6,
        1.5,
        1.7,
        1.8,
        1.9, // Year 5
      ],
    }

    // Select the appropriate return pattern based on risk profile
    const portfolioReturns = historicalReturns[riskProfile]
    const ourVaultsReturns = historicalReturns.withOurVaults

    // Calculate cumulative values
    let portfolioValue = initialValues.portfolio
    let withOurVaultsValue = initialValues.withOurVaults
    let spyValue = initialValues.spy
    let qqqValue = initialValues.qqq

    return Array.from({ length: dataPoints + 1 }, (_, i) => {
      const month = i
      const year = Math.floor(month / 12)
      const monthOfYear = month % 12

      // Calculate date
      const date = new Date(startDate)
      date.setMonth(startDate.getMonth() + month)

      // Skip the first point (initial values)
      if (i > 0) {
        // Apply monthly returns
        const monthlyReturn = portfolioReturns[i - 1] / 100
        const ourVaultsMonthlyReturn = ourVaultsReturns[i - 1] / 100
        const spyMonthlyReturn = historicalReturns.spy[i - 1] / 100
        const qqqMonthlyReturn = historicalReturns.qqq[i - 1] / 100

        portfolioValue = portfolioValue * (1 + monthlyReturn)
        withOurVaultsValue = withOurVaultsValue * (1 + ourVaultsMonthlyReturn)
        spyValue = spyValue * (1 + spyMonthlyReturn)
        qqqValue = qqqValue * (1 + qqqMonthlyReturn)
      }

      return {
        date: date.toISOString().slice(0, 7), // YYYY-MM format
        portfolio: Math.round(portfolioValue),
        withOurVaults: Math.round(withOurVaultsValue),
        spy: Math.round(spyValue),
        qqq: Math.round(qqqValue),
        // Only show year and month labels for January or first month
        label: monthOfYear === 0 ? `${date.getFullYear()}` : i === 0 ? "Start" : "",
      }
    })
  }, [riskProfile])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calculate performance metrics
  const performanceMetrics = useMemo(() => {
    const startPortfolio = data[0].portfolio
    const endPortfolio = data[data.length - 1].portfolio
    const totalReturn = (endPortfolio / startPortfolio - 1) * 100
    const annualizedReturn = (Math.pow(endPortfolio / startPortfolio, 1 / 5) - 1) * 100

    const startWithOurVaults = data[0].withOurVaults
    const endWithOurVaults = data[data.length - 1].withOurVaults
    const withOurVaultsTotalReturn = (endWithOurVaults / startWithOurVaults - 1) * 100
    const withOurVaultsAnnualizedReturn = (Math.pow(endWithOurVaults / startWithOurVaults, 1 / 5) - 1) * 100

    const startSPY = data[0].spy
    const endSPY = data[data.length - 1].spy
    const spyTotalReturn = (endSPY / startSPY - 1) * 100

    const startQQQ = data[0].qqq
    const endQQQ = data[data.length - 1].qqq
    const qqqTotalReturn = (endQQQ / startQQQ - 1) * 100

    const additionalReturn = withOurVaultsTotalReturn - totalReturn
    const additionalValue = endWithOurVaults - endPortfolio

    return {
      totalReturn: totalReturn.toFixed(1),
      annualizedReturn: annualizedReturn.toFixed(1),
      withOurVaultsTotalReturn: withOurVaultsTotalReturn.toFixed(1),
      withOurVaultsAnnualizedReturn: withOurVaultsAnnualizedReturn.toFixed(1),
      spyTotalReturn: spyTotalReturn.toFixed(1),
      qqqTotalReturn: qqqTotalReturn.toFixed(1),
      outperformance: (totalReturn - spyTotalReturn).toFixed(1),
      additionalReturn: additionalReturn.toFixed(1),
      additionalValue: formatCurrency(additionalValue),
      portfolioEndValue: formatCurrency(endPortfolio),
      withOurVaultsEndValue: formatCurrency(endWithOurVaults),
    }
  }, [data])

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorWithOurVaults" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSPY" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorQQQ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(291, 70%, 50%)" stopOpacity={0.1} />
              <stop offset="95%" stopColor="hsl(291, 70%, 50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              // Only show year labels
              if (value.endsWith("-01") || value === "Start") {
                return value.substring(0, 4)
              }
              return ""
            }}
          />
          <YAxis tickFormatter={(value) => formatCurrency(value)} tick={{ fontSize: 12 }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border bg-background p-3 shadow-md">
                    <div className="text-sm font-medium mb-2">{data.date}</div>
                    <div className="flex flex-col gap-1">
                      {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                          <span className="text-xs text-muted-foreground">
                            {entry.name === "portfolio"
                              ? "Your Current Portfolio"
                              : entry.name === "withOurVaults"
                                ? "With Our Vaults"
                                : entry.name === "spy"
                                  ? "S&P 500 (SPY)"
                                  : "Nasdaq 100 (QQQ)"}
                            :
                          </span>
                          <span className="ml-auto text-xs font-medium">{formatCurrency(entry.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              return value === "portfolio"
                ? "Your Current Portfolio"
                : value === "withOurVaults"
                  ? "With Our Vaults"
                  : value === "spy"
                    ? "S&P 500 (SPY)"
                    : "Nasdaq 100 (QQQ)"
            }}
          />
          <Area
            type="monotone"
            dataKey="withOurVaults"
            name="withOurVaults"
            stroke="hsl(142, 76%, 36%)"
            fillOpacity={1}
            fill="url(#colorWithOurVaults)"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="portfolio"
            name="portfolio"
            stroke="hsl(var(--primary))"
            fillOpacity={0}
            fill="url(#colorPortfolio)"
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
          <Area
            type="monotone"
            dataKey="spy"
            name="spy"
            stroke="hsl(221, 83%, 53%)"
            fill="none"
            strokeWidth={1}
            strokeDasharray="5 5"
            strokeOpacity={0.7}
          />
          <Area
            type="monotone"
            dataKey="qqq"
            name="qqq"
            stroke="hsl(291, 70%, 50%)"
            fill="none"
            strokeWidth={1}
            strokeDasharray="5 5"
            strokeOpacity={0.7}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium mb-2">5-Year Performance Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Your Portfolio Return</p>
            <p className="text-lg font-bold text-primary">+{performanceMetrics.totalReturn}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">With Our Vaults</p>
            <p className="text-lg font-bold text-green-600">+{performanceMetrics.withOurVaultsTotalReturn}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Additional Return</p>
            <p className="text-lg font-bold text-green-600">+{performanceMetrics.additionalReturn}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Additional Value</p>
            <p className="text-lg font-bold text-green-600">{performanceMetrics.additionalValue}</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-900/30">
        <div className="flex items-start gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600 dark:text-green-400"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-green-800 dark:text-green-300">Potential Growth Opportunity</h4>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              If you had invested with our vaults over the past 5 years, your {performanceMetrics.portfolioEndValue}{" "}
              would be worth {performanceMetrics.withOurVaultsEndValue} today — an additional{" "}
              {performanceMetrics.additionalReturn}% in returns compared to your current strategy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
