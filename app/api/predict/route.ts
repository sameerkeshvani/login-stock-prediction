import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

// Enhanced stock data with 100+ stocks across all sectors
const stockData: Record<string, { price: number; volatility: number; sector: string }> = {
  // Technology Stocks (Major)
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
  ORCL: { price: 125.4, volatility: 0.25, sector: "Technology" },
  CSCO: { price: 48.6, volatility: 0.2, sector: "Technology" },
  IBM: { price: 165.8, volatility: 0.22, sector: "Technology" },
  
  // Emerging Tech
  SNOW: { price: 185.6, volatility: 0.4, sector: "Technology" },
  DDOG: { price: 125.8, volatility: 0.42, sector: "Technology" },
  CRWD: { price: 245.2, volatility: 0.38, sector: "Technology" },
  ZM: { price: 65.4, volatility: 0.35, sector: "Technology" },
  SHOP: { price: 85.6, volatility: 0.4, sector: "Technology" },
  UBER: { price: 45.8, volatility: 0.35, sector: "Technology" },
  LYFT: { price: 12.4, volatility: 0.4, sector: "Technology" },
  SPOT: { price: 185.2, volatility: 0.38, sector: "Technology" },
  SNAP: { price: 8.6, volatility: 0.45, sector: "Technology" },
  TWTR: { price: 45.2, volatility: 0.35, sector: "Technology" },
  PYPL: { price: 65.8, volatility: 0.3, sector: "Technology" },
  SQ: { price: 85.4, volatility: 0.35, sector: "Technology" },
  ROKU: { price: 65.2, volatility: 0.4, sector: "Technology" },
  
  // Financial Stocks (Major)
  JPM: { price: 165.8, volatility: 0.2, sector: "Financial" },
  BAC: { price: 32.4, volatility: 0.25, sector: "Financial" },
  WFC: { price: 48.9, volatility: 0.22, sector: "Financial" },
  GS: { price: 385.2, volatility: 0.3, sector: "Financial" },
  MS: { price: 85.6, volatility: 0.28, sector: "Financial" },
  C: { price: 52.8, volatility: 0.25, sector: "Financial" },
  AXP: { price: 185.4, volatility: 0.28, sector: "Financial" },
  USB: { price: 42.6, volatility: 0.22, sector: "Financial" },
  PNC: { price: 145.8, volatility: 0.25, sector: "Financial" },
  TFC: { price: 38.4, volatility: 0.2, sector: "Financial" },
  COF: { price: 125.6, volatility: 0.3, sector: "Financial" },
  SCHW: { price: 65.8, volatility: 0.25, sector: "Financial" },
  BLK: { price: 785.4, volatility: 0.28, sector: "Financial" },
  
  // Healthcare Stocks (Major)
  JNJ: { price: 165.4, volatility: 0.18, sector: "Healthcare" },
  PFE: { price: 28.9, volatility: 0.25, sector: "Healthcare" },
  UNH: { price: 485.2, volatility: 0.22, sector: "Healthcare" },
  ABBV: { price: 145.8, volatility: 0.2, sector: "Healthcare" },
  MRK: { price: 125.6, volatility: 0.23, sector: "Healthcare" },
  TMO: { price: 485.6, volatility: 0.25, sector: "Healthcare" },
  ABT: { price: 115.8, volatility: 0.2, sector: "Healthcare" },
  DHR: { price: 245.4, volatility: 0.22, sector: "Healthcare" },
  BMY: { price: 65.2, volatility: 0.25, sector: "Healthcare" },
  AMGN: { price: 245.8, volatility: 0.28, sector: "Healthcare" },
  GILD: { price: 85.6, volatility: 0.25, sector: "Healthcare" },
  CVS: { price: 75.4, volatility: 0.22, sector: "Healthcare" },
  CI: { price: 245.2, volatility: 0.25, sector: "Healthcare" },
  ANTM: { price: 485.8, volatility: 0.22, sector: "Healthcare" },
  
  // Consumer Stocks (Major)
  KO: { price: 58.4, volatility: 0.15, sector: "Consumer" },
  PG: { price: 145.2, volatility: 0.18, sector: "Consumer" },
  WMT: { price: 165.8, volatility: 0.2, sector: "Consumer" },
  HD: { price: 325.4, volatility: 0.25, sector: "Consumer" },
  MCD: { price: 285.6, volatility: 0.22, sector: "Consumer" },
  SBUX: { price: 95.8, volatility: 0.25, sector: "Consumer" },
  NKE: { price: 125.4, volatility: 0.28, sector: "Consumer" },
  TGT: { price: 145.6, volatility: 0.25, sector: "Consumer" },
  COST: { price: 485.2, volatility: 0.22, sector: "Consumer" },
  LOW: { price: 225.8, volatility: 0.25, sector: "Consumer" },
  TJX: { price: 85.4, volatility: 0.2, sector: "Consumer" },
  MAR: { price: 185.6, volatility: 0.28, sector: "Consumer" },
  BKNG: { price: 285.4, volatility: 0.3, sector: "Consumer" },
  YUM: { price: 125.8, volatility: 0.22, sector: "Consumer" },
  
  // Energy Stocks (Major)
  XOM: { price: 95.8, volatility: 0.3, sector: "Energy" },
  CVX: { price: 145.2, volatility: 0.28, sector: "Energy" },
  COP: { price: 125.4, volatility: 0.32, sector: "Energy" },
  EOG: { price: 125.8, volatility: 0.35, sector: "Energy" },
  SLB: { price: 45.6, volatility: 0.3, sector: "Energy" },
  OXY: { price: 65.4, volatility: 0.35, sector: "Energy" },
  VLO: { price: 125.2, volatility: 0.32, sector: "Energy" },
  MPC: { price: 145.8, volatility: 0.3, sector: "Energy" },
  PSX: { price: 165.4, volatility: 0.28, sector: "Energy" },
  KMI: { price: 18.6, volatility: 0.25, sector: "Energy" },
  
  // Industrial Stocks (Major)
  BA: { price: 185.6, volatility: 0.35, sector: "Industrial" },
  CAT: { price: 245.8, volatility: 0.3, sector: "Industrial" },
  GE: { price: 85.4, volatility: 0.25, sector: "Industrial" },
  MMM: { price: 95.8, volatility: 0.22, sector: "Industrial" },
  HON: { price: 185.2, volatility: 0.25, sector: "Industrial" },
  UPS: { price: 165.4, volatility: 0.28, sector: "Industrial" },
  FDX: { price: 245.8, volatility: 0.3, sector: "Industrial" },
  RTX: { price: 85.6, volatility: 0.25, sector: "Industrial" },
  LMT: { price: 445.2, volatility: 0.22, sector: "Industrial" },
  NOC: { price: 485.8, volatility: 0.25, sector: "Industrial" },
  
  // Communication Stocks (Major)
  DIS: { price: 85.2, volatility: 0.35, sector: "Communication" },
  CMCSA: { price: 42.8, volatility: 0.22, sector: "Communication" },
  VZ: { price: 38.6, volatility: 0.2, sector: "Communication" },
  T: { price: 18.4, volatility: 0.18, sector: "Communication" },
  CHTR: { price: 485.6, volatility: 0.25, sector: "Communication" },
  TMUS: { price: 145.8, volatility: 0.22, sector: "Communication" },
  ATVI: { price: 85.4, volatility: 0.3, sector: "Communication" },
  EA: { price: 125.6, volatility: 0.28, sector: "Communication" },
  
  // Real Estate (Major)
  SPG: { price: 125.4, volatility: 0.25, sector: "Real Estate" },
  PLD: { price: 145.8, volatility: 0.28, sector: "Real Estate" },
  AMT: { price: 185.6, volatility: 0.22, sector: "Real Estate" },
  EQIX: { price: 785.4, volatility: 0.25, sector: "Real Estate" },
  PSA: { price: 285.8, volatility: 0.22, sector: "Real Estate" },
  O: { price: 65.4, volatility: 0.2, sector: "Real Estate" },
  AVB: { price: 185.2, volatility: 0.25, sector: "Real Estate" },
  EQR: { price: 65.8, volatility: 0.22, sector: "Real Estate" },
  
  // Utilities (Major)
  DUK: { price: 95.2, volatility: 0.15, sector: "Utilities" },
  SO: { price: 68.4, volatility: 0.18, sector: "Utilities" },
  NEE: { price: 85.6, volatility: 0.2, sector: "Utilities" },
  D: { price: 52.8, volatility: 0.18, sector: "Utilities" },
  AEP: { price: 85.4, volatility: 0.2, sector: "Utilities" },
  XEL: { price: 65.2, volatility: 0.18, sector: "Utilities" },
  SRE: { price: 145.8, volatility: 0.22, sector: "Utilities" },
  WEC: { price: 85.6, volatility: 0.2, sector: "Utilities" },
  
  // Materials (Major)
  LIN: { price: 485.8, volatility: 0.25, sector: "Materials" },
  APD: { price: 285.4, volatility: 0.28, sector: "Materials" },
  FCX: { price: 45.6, volatility: 0.35, sector: "Materials" },
  NEM: { price: 45.8, volatility: 0.3, sector: "Materials" },
  DD: { price: 75.4, volatility: 0.25, sector: "Materials" },
  DOW: { price: 55.8, volatility: 0.28, sector: "Materials" },
  ECL: { price: 185.6, volatility: 0.22, sector: "Materials" },
  BLL: { price: 145.2, volatility: 0.25, sector: "Materials" },
  
  // Additional Popular Stocks
  BRK: { price: 485000, volatility: 0.15, sector: "Financial" },
  V: { price: 245.8, volatility: 0.25, sector: "Financial" },
  MA: { price: 385.6, volatility: 0.28, sector: "Financial" },
  UNP: { price: 225.4, volatility: 0.22, sector: "Industrial" },
  NSC: { price: 245.8, volatility: 0.25, sector: "Industrial" },
  CSX: { price: 125.6, volatility: 0.22, sector: "Industrial" },
  DE: { price: 385.4, volatility: 0.3, sector: "Industrial" },
  JCI: { price: 65.8, volatility: 0.25, sector: "Industrial" },
  ITW: { price: 245.2, volatility: 0.22, sector: "Industrial" },
  ETN: { price: 185.6, volatility: 0.25, sector: "Industrial" },
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

    const { symbol, timeframe = "7 days" } = await request.json()

    if (!symbol) {
      return NextResponse.json({ error: "Stock symbol is required" }, { status: 400 })
    }

    const upperSymbol = symbol.toUpperCase()

    // Check if we have data for this symbol
    if (!stockData[upperSymbol]) {
      return NextResponse.json({ error: "Stock symbol not found" }, { status: 404 })
    }

    const { price, volatility, sector } = stockData[upperSymbol]
    const prediction = generatePrediction(upperSymbol, price, volatility, timeframe)
    
    // Add sector information to the prediction
    const enhancedPrediction = {
      ...prediction,
      sector,
    }

    return NextResponse.json(enhancedPrediction)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// New endpoint to get all available stocks
export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stocks = Object.entries(stockData).map(([symbol, data]) => ({
      symbol,
      currentPrice: data.price,
      sector: data.sector,
    }))

    return NextResponse.json({ stocks })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
