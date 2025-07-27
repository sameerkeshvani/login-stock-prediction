import { type NextRequest, NextResponse } from "next/server"
import { setSession } from "@/lib/auth"
import { addUser, findUserByEmail } from "@/lib/users"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Hash the password
    // 2. Save to database
    // 3. Send verification email

    // For demo purposes, create a new user
    const newUser = addUser({
      name,
      email,
      password, // In production, this should be hashed
    })

    // Create session
    const response = NextResponse.json({ success: true })
    await setSession(response, { 
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
