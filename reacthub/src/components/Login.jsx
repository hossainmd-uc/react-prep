import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider" // adjust path if needed
import { supabase } from "../../config" // adjust

export default function Login() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  // If already logged in, leave login page
  useEffect(() => {
    if (!loading && user) {
      navigate("/view", { replace: true })
    }
  }, [loading, user, navigate])

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/editUsername` },
    })
    if (error) console.log(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <button onClick={signInWithGoogle} className="rounded-xl border px-4 py-2">
        Continue with Google
      </button>
    </div>
  )
}
