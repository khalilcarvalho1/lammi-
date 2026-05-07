import { useState, useEffect, useCallback } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabaseClient'
import { profileService } from '@/services/profileService'
import { Profile } from '@/services/supabaseClient'

interface AuthState {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
  })

  const loadProfile = useCallback(async (userId: string) => {
    const profile = await profileService.getProfile(userId)
    setState(prev => ({
      ...prev,
      profile,
      isAdmin: profile?.role === 'admin',
      loading: false,
    }))
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null }))
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setState(prev => ({ ...prev, loading: false }))
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null }))
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setState(prev => ({ ...prev, profile: null, isAdmin: false, loading: false }))
      }
    })

    return () => subscription.unsubscribe()
  }, [loadProfile])

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin }
  })

  const signInWithEmail = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password })

  const signUpWithEmail = (email: string, password: string, displayName: string) =>
    supabase.auth.signUp({ email, password, options: { data: { display_name: displayName } } })

  const sendPasswordReset = (email: string) =>
    supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })

  const updatePassword = (newPassword: string) =>
    supabase.auth.updateUser({ password: newPassword })

  const signOut = () => supabase.auth.signOut()

  return {
    ...state,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    updatePassword,
    signOut,
    refreshProfile: () => state.user ? loadProfile(state.user.id) : Promise.resolve(),
  }
}
