"use client"

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { date: "Jan", price: 165.2 },
  { date: "Feb", price: 168.45 },
  { date: "Mar", price: 172.3 },
  { date: "Apr", price: 169.8 },
  { date: "May", price: 175.6 },
  { date: "Jun", price: 178.9 },
  { date: "Jul", price: 182.15 },
]

export function StockChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Performance</CardTitle>
        <CardDescription>Your predicted vs actual returns over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            price: {
              label: "Price",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-price)"
                strokeWidth={2}
                dot={{ fill: "var(--color-price)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
