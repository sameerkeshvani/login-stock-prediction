"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Target, Clock } from "lucide-react"

interface StockPrediction {
  symbol: string
  currentPrice: number
  predictedPrice: number
  confidence: number
  trend: "up" | "down"
  timeframe: string
  percentageChange?: number
  sector?: string
}

interface PredictionCardProps {
  prediction: StockPrediction
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const percentageChange = prediction.percentageChange || 
    ((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice) * 100

  const isPositive = prediction.trend === "up"
  const confidenceColor = prediction.confidence >= 80 ? "text-green-600" : 
                         prediction.confidence >= 60 ? "text-yellow-600" : "text-red-600"

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-xl font-bold text-gray-800">{prediction.symbol}</CardTitle>
            {prediction.sector && (
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                {prediction.sector}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <TrendingUp className="h-5 w-5 text-green-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-600" />
            )}
            <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
        <CardDescription className="text-gray-600">
          <Clock className="inline h-4 w-4 mr-1" />
          {prediction.timeframe} prediction
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Current Price</p>
            <p className="text-lg font-bold text-gray-900">${prediction.currentPrice.toFixed(2)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Predicted Price</p>
            <p className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              ${prediction.predictedPrice.toFixed(2)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Confidence</span>
          </div>
          <span className={`text-lg font-bold ${confidenceColor}`}>
            {prediction.confidence}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Price Change</span>
          <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(prediction.predictedPrice - prediction.currentPrice).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
