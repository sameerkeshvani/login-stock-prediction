"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, RefreshCw } from "lucide-react"

export default function ClearSessionPage() {
  const router = useRouter()

  const clearSession = () => {
    // Clear the session cookie
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push("/login")
  }

  const goToLogin = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
              <RefreshCw className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Session Management
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Choose what you'd like to do
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                onClick={clearSession}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Clear Session & Go to Login
              </Button>
              
              <Button
                onClick={goToLogin}
                variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl"
              >
                Just Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 