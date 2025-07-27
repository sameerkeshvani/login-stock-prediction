import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function Home() {
  const session = await getSession()

  if (session) {
    // If user has a session, redirect to session management page
    redirect("/clear-session")
  } else {
    redirect("/login")
  }
}
