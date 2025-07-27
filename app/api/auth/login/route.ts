import { type NextRequest, NextResponse } from "next/server"
import { setSession } from "@/lib/auth"
import { findUserByEmailAndPassword } from "@/lib/users"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = findUserByEmailAndPassword(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    const response = NextResponse.json({ success: true })
    await setSession(response, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
