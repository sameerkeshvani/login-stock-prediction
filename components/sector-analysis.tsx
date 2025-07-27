"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Building2, Activity } from "lucide-react"

interface SectorAnalysisProps {
  onPredictionsGenerated: (predictions: any[]) => void
  loading: boolean
}

const sectors = [
  { name: "Technology", stocks: ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NVDA", "META", "AMD", "INTC", "CRM", "ADBE", "SNOW", "DDOG", "CRWD", "ZM", "SHOP"] },
  { name: "Financial", stocks: ["JPM", "BAC", "WFC", "GS", "MS"] },
  { name: "Healthcare", stocks: ["JNJ", "PFE", "UNH", "ABBV", "MRK"] },
  { name: "Consumer", stocks: ["KO", "PG", "WMT", "HD", "MCD"] },
  { name: "Energy", stocks: ["XOM", "CVX", "COP"] },
  { name: "Industrial", stocks: ["BA", "CAT", "GE"] },
  { name: "Communication", stocks: ["DIS", "CMCSA", "VZ"] },
  { name: "Real Estate", stocks: ["SPG", "PLD"] },
  { name: "Utilities", stocks: ["DUK", "SO"] },
]

export function SectorAnalysis({ onPredictionsGenerated, loading }: SectorAnalysisProps) {
  const [selectedSector, setSelectedSector] = useState("Technology")
  const [timeframe, setTimeframe] = useState("7 days")

  const handleSectorPredict = async () => {
    const sector = sectors.find(s => s.name === selectedSector)
    if (!sector) return

    try {
      const response = await fetch("/api/predict/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          symbols: sector.stocks,
          timeframe
        }),
      })

      if (response.ok) {
        const data = await response.json()
        onPredictionsGenerated(data.predictions)
      }
    } catch (err) {
      console.error("Failed to get sector predictions")
    }
  }

  const selectedSectorData = sectors.find(s => s.name === selectedSector)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-5 w-5 mr-2 text-blue-600" />
          Sector Analysis
        </CardTitle>
        <CardDescription>Get predictions for entire sectors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Sector</label>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector.name} value={sector.name}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Timeframe</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 day">1 Day</SelectItem>
                <SelectItem value="7 days">7 Days</SelectItem>
                <SelectItem value="30 days">30 Days</SelectItem>
                <SelectItem value="90 days">90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedSectorData && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Stocks in {selectedSector}</span>
              <Badge variant="secondary">{selectedSectorData.stocks.length} stocks</Badge>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {selectedSectorData.stocks.map((stock) => (
                <Badge key={stock} variant="outline" className="text-xs">
                  {stock}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleSectorPredict} 
          disabled={loading}
          className="w-full"
        >
          <Activity className="h-4 w-4 mr-2" />
          {loading ? "Analyzing..." : `Analyze ${selectedSector} Sector`}
        </Button>
      </CardContent>
    </Card>
  )
} 