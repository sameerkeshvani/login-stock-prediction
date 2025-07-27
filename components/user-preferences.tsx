"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Settings, Target, Heart, Zap, User, Palette } from "lucide-react"

interface UserPreferences {
  favoriteSectors: string[]
  riskTolerance: string
  preferredTimeframe: string
  theme: string
  notifications: boolean
}

interface UserPreferencesProps {
  preferences: UserPreferences
  onPreferencesChange: (preferences: UserPreferences) => void
}

const sectors = [
  "Technology",
  "Healthcare", 
  "Financial",
  "Consumer",
  "Energy",
  "Industrial",
  "Communication",
  "Real Estate",
  "Utilities"
]

const riskLevels = [
  { value: "conservative", label: "Conservative", description: "Low risk, stable returns" },
  { value: "moderate", label: "Moderate", description: "Balanced risk and growth" },
  { value: "aggressive", label: "Aggressive", description: "High risk, high potential returns" }
]

const timeframes = [
  { value: "1 day", label: "1 Day" },
  { value: "7 days", label: "7 Days" },
  { value: "30 days", label: "30 Days" },
  { value: "90 days", label: "90 Days" }
]

const themes = [
  { value: "light", label: "Light", description: "Clean and bright" },
  { value: "dark", label: "Dark", description: "Easy on the eyes" },
  { value: "auto", label: "Auto", description: "Follows system preference" }
]

export function UserPreferences({ preferences, onPreferencesChange }: UserPreferencesProps) {
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences)

  const handleSectorToggle = (sector: string) => {
    const newSectors = localPreferences.favoriteSectors.includes(sector)
      ? localPreferences.favoriteSectors.filter(s => s !== sector)
      : [...localPreferences.favoriteSectors, sector]
    
    setLocalPreferences(prev => ({
      ...prev,
      favoriteSectors: newSectors
    }))
  }

  const handleSave = () => {
    onPreferencesChange(localPreferences)
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-800">
          <Settings className="h-5 w-5 mr-2 text-blue-600" />
          Personalize Your Experience
        </CardTitle>
        <CardDescription className="text-gray-600">
          Customize your dashboard to match your investment style and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Favorite Sectors */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700 flex items-center">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            Favorite Sectors
          </Label>
          <p className="text-sm text-gray-600 mb-3">
            Select the sectors you're most interested in for personalized recommendations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sectors.map((sector) => (
              <div key={sector} className="flex items-center space-x-2">
                <Checkbox
                  id={sector}
                  checked={localPreferences.favoriteSectors.includes(sector)}
                  onCheckedChange={() => handleSectorToggle(sector)}
                />
                <Label htmlFor={sector} className="text-sm font-medium">
                  {sector}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Tolerance */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700 flex items-center">
            <Target className="h-4 w-4 mr-2 text-blue-500" />
            Risk Tolerance
          </Label>
          <Select 
            value={localPreferences.riskTolerance} 
            onValueChange={(value) => setLocalPreferences(prev => ({ ...prev, riskTolerance: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {riskLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div>
                    <div className="font-medium">{level.label}</div>
                    <div className="text-xs text-gray-500">{level.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Timeframe */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            Preferred Timeframe
          </Label>
          <Select 
            value={localPreferences.preferredTimeframe} 
            onValueChange={(value) => setLocalPreferences(prev => ({ ...prev, preferredTimeframe: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeframes.map((timeframe) => (
                <SelectItem key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Theme Preference */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-700 flex items-center">
            <Palette className="h-4 w-4 mr-2 text-purple-500" />
            Theme Preference
          </Label>
          <Select 
            value={localPreferences.theme} 
            onValueChange={(value) => setLocalPreferences(prev => ({ ...prev, theme: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value}>
                  <div>
                    <div className="font-medium">{theme.label}</div>
                    <div className="text-xs text-gray-500">{theme.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notifications"
              checked={localPreferences.notifications}
              onCheckedChange={(checked) => 
                setLocalPreferences(prev => ({ ...prev, notifications: checked as boolean }))
              }
            />
            <Label htmlFor="notifications" className="text-sm font-semibold text-gray-700">
              Enable Notifications
            </Label>
          </div>
          <p className="text-sm text-gray-600">
            Get notified about important market updates and prediction alerts
          </p>
        </div>

        {/* Current Preferences Summary */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Your Current Preferences</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <Target className="h-3 w-3 mr-1" />
              {riskLevels.find(r => r.value === localPreferences.riskTolerance)?.label} Risk
            </Badge>
            {localPreferences.favoriteSectors.map((sector) => (
              <Badge key={sector} variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                <Heart className="h-3 w-3 mr-1" />
                {sector}
              </Badge>
            ))}
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Zap className="h-3 w-3 mr-1" />
              {localPreferences.preferredTimeframe}
            </Badge>
          </div>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Settings className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
} 