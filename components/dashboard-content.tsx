"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PredictionCard } from "@/components/prediction-card"
import { StockChart } from "@/components/stock-chart"
import { SectorAnalysis } from "@/components/sector-analysis"
import { UserPreferences } from "@/components/user-preferences"
import { LogOut, Search, TrendingUp, Activity, DollarSign, Star, Clock, Sparkles, User, Heart, Target, Zap, Settings } from "lucide-react"

interface StockPrediction {
  symbol: string
  currentPrice: number
  predictedPrice: number
  confidence: number
  trend: "up" | "down"
  timeframe: string
  percentageChange: number
  sector: string
}

interface Stock {
  symbol: string
  currentPrice: number
  sector: string
}

interface UserPreferences {
  favoriteSectors: string[]
  riskTolerance: string
  preferredTimeframe: string
  theme: string
  notifications: boolean
}

interface User {
  id: string
  name: string
  email: string
}

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("7 days")
  const [predictions, setPredictions] = useState<StockPrediction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [availableStocks, setAvailableStocks] = useState<Stock[]>([])
  const [stocksLoading, setStocksLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    favoriteSectors: ["Technology", "Healthcare"],
    riskTolerance: "moderate",
    preferredTimeframe: "7 days",
    theme: "light",
    notifications: true
  })

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const getFirstName = () => {
    if (!user?.name) return "User"
    return user.name.split(' ')[0] || user.name
  }

  const getPersonalizedStocks = () => {
    if (!Array.isArray(availableStocks)) return []
    return availableStocks.filter(stock => 
      userPreferences.favoriteSectors.includes(stock.sector)
    ).slice(0, 10).map(stock => stock.symbol)
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      router.push("/login")
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: searchTerm.toUpperCase(), timeframe: selectedTimeframe }),
      })

      if (response.ok) {
        const prediction = await response.json()
        setPredictions(prev => [prediction, ...prev.slice(0, 9)])
        setSearchTerm("")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to get prediction")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleQuickPredict = async (symbol: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, timeframe: selectedTimeframe }),
      })

      if (response.ok) {
        const prediction = await response.json()
        setPredictions(prev => [prediction, ...prev.slice(0, 9)])
      } else {
        const data = await response.json()
        setError(data.error || "Failed to get prediction")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBulkPredict = async () => {
    const personalizedStocks = getPersonalizedStocks()
    if (personalizedStocks.length === 0) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/predict/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          symbols: personalizedStocks, 
          timeframe: selectedTimeframe 
        }),
      })

      if (response.ok) {
        const newPredictions = await response.json()
        setPredictions(prev => [...newPredictions, ...prev.slice(0, 10 - newPredictions.length)])
      } else {
        const data = await response.json()
        setError(data.error || "Failed to get bulk predictions")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSectorPredictions = async () => {
    setLoading(true)
    setError("")

    try {
      if (!Array.isArray(availableStocks)) {
        setError("Stocks data not available yet")
        return
      }

      const sectorStocks = availableStocks.filter(stock => 
        userPreferences.favoriteSectors.includes(stock.sector)
      ).slice(0, 5)

      const response = await fetch("/api/predict/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          symbols: sectorStocks.map(s => s.symbol), 
          timeframe: selectedTimeframe 
        }),
      })

      if (response.ok) {
        const newPredictions = await response.json()
        setPredictions(prev => [...newPredictions, ...prev.slice(0, 10 - newPredictions.length)])
      } else {
        const data = await response.json()
        setError(data.error || "Failed to get sector predictions")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePreferencesChange = (newPreferences: UserPreferences) => {
    setUserPreferences(newPreferences)
    if (newPreferences.preferredTimeframe !== selectedTimeframe) {
      setSelectedTimeframe(newPreferences.preferredTimeframe)
    }
  }

  useEffect(() => {
    const fetchAvailableStocks = async () => {
      setStocksLoading(true)
      try {
        const response = await fetch("/api/predict")
        if (response.ok) {
          const stocks = await response.json()
          setAvailableStocks(stocks)
        }
      } catch (err) {
        console.error("Failed to fetch available stocks:", err)
      } finally {
        setStocksLoading(false)
      }
    }

    fetchAvailableStocks()
  }, [])

  const personalizedStocks = getPersonalizedStocks()

  // Show loading state while session is loading
  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StockPredict AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">
                  {getGreeting()}, {getFirstName()}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-gray-200 hover:bg-gray-50 rounded-lg"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner for New Users */}
        {showWelcome && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Sparkles className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              <strong>Welcome to StockPredict AI!</strong> 🎉 You now have access to 130+ stocks with AI-powered predictions. 
              Start by searching for your favorite stocks or explore the personalized recommendations below.
            </AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWelcome(false)}
              className="ml-auto text-green-600 hover:text-green-700"
            >
              Dismiss
            </Button>
          </Alert>
        )}

        {/* Personalized Welcome Section */}
        <Card className="mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome back, {getFirstName()}! 👋
                </h2>
                <p className="text-gray-600">
                  Here's your personalized dashboard with AI predictions tailored to your preferences.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  <Target className="h-3 w-3 mr-1" />
                  {userPreferences.riskTolerance} risk
                </Badge>
                {userPreferences.favoriteSectors.slice(0, 2).map((sector) => (
                  <Badge key={sector} variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                    <Heart className="h-3 w-3 mr-1" />
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Stock Prediction</CardTitle>
            <CardDescription className="text-gray-600">
              Enter a stock symbol to get AI-powered predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Stock Symbol
                </Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Enter stock symbol (e.g., AAPL, GOOGL)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>
              <div className="w-48">
                <Label htmlFor="timeframe" className="text-sm font-medium text-gray-700">
                  Timeframe
                </Label>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="mt-1 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl">
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
            <Button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get Prediction
                </>
              )}
            </Button>
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Personalized Stocks Section */}
        <Card className="mb-8 backdrop-blur-sm bg-white/80 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-gray-800">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Your Personalized Stocks
            </CardTitle>
            <CardDescription className="text-gray-600">
              AI-curated recommendations based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Predict your personalized stock picks</p>
              <Button
                onClick={handleBulkPredict}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                Bulk Predict
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {stocksLoading ? (
                <div className="col-span-5 flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Loading personalized stocks...</span>
                </div>
              ) : (
                getPersonalizedStocks().map((symbol) => (
                  <Button
                    key={symbol}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickPredict(symbol)}
                    className="flex items-center justify-center border-gray-200 hover:bg-gray-50 rounded-lg h-10"
                  >
                    <span className="font-medium">{symbol}</span>
                    <Zap className="h-3 w-3 ml-1 text-yellow-500" />
                  </Button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-1">
            <TabsTrigger value="predictions" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Your Predictions</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Analytics</TabsTrigger>
            <TabsTrigger value="sectors" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Sector Analysis</TabsTrigger>
            <TabsTrigger value="stocks" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">All Stocks</TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            {/* Personalized Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Your Predictions</p>
                      <p className="text-2xl font-bold text-gray-900">{predictions.length}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bullish Picks</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {predictions.filter((p) => p.trend === "up").length}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Bearish Picks</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {predictions.filter((p) => p.trend === "down").length}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Confidence</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {(
                          predictions.reduce((sum, p) => sum + p.confidence, 0) /
                          (predictions.length || 1)
                        ).toFixed(1)}%
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Insights Card */}
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Your Market Insights</CardTitle>
                <CardDescription className="text-gray-600">AI-powered analysis for your preferred sectors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-green-900">Your Tech Picks</p>
                    <p className="text-sm text-green-700">Strong bullish sentiment</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div>
                    <p className="font-medium text-red-900">Energy Sector</p>
                    <p className="text-sm text-red-700">Bearish outlook, high volatility</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-red-600 rotate-180" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Predictions */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Predictions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictions.map((prediction, index) => (
                <PredictionCard key={index} prediction={prediction} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Prediction Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  Visualize your stock prediction trends over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StockChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <SectorAnalysis onPredictionsGenerated={handleSectorPredictions} loading={loading} />
          </TabsContent>

          <TabsContent value="stocks" className="space-y-6">
            <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">All Available Stocks</CardTitle>
                <CardDescription className="text-gray-600">
                  Browse all stocks available for prediction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {stocksLoading ? (
                    <div className="col-span-full flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2 text-gray-600">Loading stocks...</span>
                    </div>
                  ) : Array.isArray(availableStocks) ? (
                    availableStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center"
                      >
                        <p className="font-semibold text-gray-800">{stock.symbol}</p>
                        <p className="text-sm text-gray-600">${stock.currentPrice.toFixed(2)}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {stock.sector}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                      No stocks available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <UserPreferences
              preferences={userPreferences}
              onPreferencesChange={handlePreferencesChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
