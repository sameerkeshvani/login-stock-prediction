import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

// Import the stock data and prediction function from the main predict route
const stockData: Record<string, { price: number; volatility: number; sector: string }> = {
  // Tech Stocks
  AAPL: { price: 175.43, volatility: 0.25, sector: "Technology" },
  GOOGL: { price: 142.56, volatility: 0.3, sector: "Technology" },
  MSFT: { price: 378.85, volatility: 0.22, sector: "Technology" },
  AMZN: { price: 145.32, volatility: 0.35, sector: "Technology" },
  TSLA: { price: 248.5, volatility: 0.45, sector: "Technology" },
  NVDA: { price: 875.2, volatility: 0.4, sector: "Technology" },
  META: { price: 325.6, volatility: 0.32, sector: "Technology" },
  NFLX: { price: 445.8, volatility: 0.28, sector: "Technology" },
  AMD: { price: 125.4, volatility: 0.38, sector: "Technology" },
  INTC: { price: 45.2, volatility: 0.25, sector: "Technology" },
  CRM: { price: 245.8, volatility: 0.3, sector: "Technology" },
  ADBE: { price: 485.6, volatility: 0.28, sector: "Technology" },
  
  // Financial Stocks
  JPM: { price: 165.8, volatility: 0.2, sector: "Financial" },
  BAC: { price: 32.4, volatility: 0.25, sector: "Financial" },
  WFC: { price: 48.9, volatility: 0.22, sector: "Financial" },
  GS: { price: 385.2, volatility: 0.3, sector: "Financial" },
  MS: { price: 85.6, volatility: 0.28, sector: "Financial" },
  
  // Healthcare Stocks
  JNJ: { price: 165.4, volatility: 0.18, sector: "Healthcare" },
  PFE: { price: 28.9, volatility: 0.25, sector: "Healthcare" },
  UNH: { price: 485.2, volatility: 0.22, sector: "Healthcare" },
  ABBV: { price: 145.8, volatility: 0.2, sector: "Healthcare" },
  MRK: { price: 125.6, volatility: 0.23, sector: "Healthcare" },
  
  // Consumer Stocks
  KO: { price: 58.4, volatility: 0.15, sector: "Consumer" },
  PG: { price: 145.2, volatility: 0.18, sector: "Consumer" },
  WMT: { price: 165.8, volatility: 0.2, sector: "Consumer" },
  HD: { price: 325.4, volatility: 0.25, sector: "Consumer" },
  MCD: { price: 285.6, volatility: 0.22, sector: "Consumer" },
  
  // Energy Stocks
  XOM: { price: 95.8, volatility: 0.3, sector: "Energy" },
  CVX: { price: 145.2, volatility: 0.28, sector: "Energy" },
  COP: { price: 125.4, volatility: 0.32, sector: "Energy" },
  
  // Industrial Stocks
  BA: { price: 185.6, volatility: 0.35, sector: "Industrial" },
  CAT: { price: 245.8, volatility: 0.3, sector: "Industrial" },
  GE: { price: 85.4, volatility: 0.25, sector: "Industrial" },
  
  // Communication Stocks
  DIS: { price: 85.2, volatility: 0.35, sector: "Communication" },
  CMCSA: { price: 42.8, volatility: 0.22, sector: "Communication" },
  VZ: { price: 38.6, volatility: 0.2, sector: "Communication" },
  
  // Real Estate
  SPG: { price: 125.4, volatility: 0.25, sector: "Real Estate" },
  PLD: { price: 145.8, volatility: 0.28, sector: "Real Estate" },
  
  // Utilities
  DUK: { price: 95.2, volatility: 0.15, sector: "Utilities" },
  SO: { price: 68.4, volatility: 0.18, sector: "Utilities" },
  
  // Emerging Tech
  SNOW: { price: 185.6, volatility: 0.4, sector: "Technology" },
  DDOG: { price: 125.8, volatility: 0.42, sector: "Technology" },
  CRWD: { price: 245.2, volatility: 0.38, sector: "Technology" },
  ZM: { price: 65.4, volatility: 0.35, sector: "Technology" },
  SHOP: { price: 85.6, volatility: 0.4, sector: "Technology" },
}

function generatePrediction(symbol: string, currentPrice: number, volatility: number, timeframe: string = "7 days") {
  // Enhanced prediction algorithm with different timeframes
  const randomFactor = (Math.random() - 0.5) * 2 // -1 to 1
  
  // Adjust volatility based on timeframe
  let timeframeMultiplier = 1
  if (timeframe === "1 day") timeframeMultiplier = 0.3
  else if (timeframe === "7 days") timeframeMultiplier = 1
  else if (timeframe === "30 days") timeframeMultiplier = 2.5
  else if (timeframe === "90 days") timeframeMultiplier = 4
  
  const volatilityAdjustedChange = randomFactor * volatility * currentPrice * 0.1 * timeframeMultiplier
  const predictedPrice = currentPrice + volatilityAdjustedChange

  const confidence = Math.max(50, Math.min(95, 75 + (Math.random() - 0.5) * 30))
  const trend = predictedPrice > currentPrice ? "up" : "down"
  
  // Calculate percentage change
  const percentageChange = ((predictedPrice - currentPrice) / currentPrice) * 100

  return {
    symbol,
    currentPrice,
    predictedPrice: Math.max(0.01, predictedPrice),
    confidence: Math.round(confidence),
    trend,
    timeframe,
    percentageChange: Math.round(percentageChange * 100) / 100,
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { symbols, timeframe = "7 days" } = await request.json()

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json({ error: "Symbols array is required" }, { status: 400 })
    }

    if (symbols.length > 20) {
      return NextResponse.json({ error: "Maximum 20 symbols allowed per request" }, { status: 400 })
    }

    const predictions = []

    for (const symbol of symbols) {
      const upperSymbol = symbol.toUpperCase()
      
      // Check if we have data for this symbol
      if (stockData[upperSymbol]) {
        const { price, volatility, sector } = stockData[upperSymbol]
        const prediction = generatePrediction(upperSymbol, price, volatility, timeframe)
        
        // Add sector information to the prediction
        const enhancedPrediction = {
          ...prediction,
          sector,
        }
        
        predictions.push(enhancedPrediction)
      }
    }

    return NextResponse.json({ predictions })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 