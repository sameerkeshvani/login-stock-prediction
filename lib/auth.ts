import type { NextResponse } from "next/server"
import { cookies } from "next/headers"

interface User {
  id: string
  name: string
  email: string
}

interface Session {
  user: User
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) {
      return null
    }

    // In a real app, you would verify the JWT token here
    const session = JSON.parse(sessionCookie.value)
    return session
  } catch (error) {
    return null
  }
}

export async function setSession(response: NextResponse, session: Session) {
  // In a real app, you would create a JWT token here
  const sessionData = JSON.stringify(session)

  response.cookies.set("session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearSession(response: NextResponse) {
  response.cookies.delete("session")
}
