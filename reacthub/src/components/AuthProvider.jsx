import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { supabase } from "../../config" // <-- change path/name to match yours

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })


    return () => sub.subscription.unsubscribe()
  }, [])

  // //Debug
  // useEffect(() => {
  //   console.log("AuthProvider state:", { loading, user, session })
  // }, [loading, user, session])

  const value = useMemo(() => ({ session, user, loading }), [session, user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
