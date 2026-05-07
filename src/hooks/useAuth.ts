import { useState, useEffect, useCallback } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { authService } from '@/services/authService'
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
    // Carrega sessão inicial
    authService.getSession().then(({ data: { session } }) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null }))
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setState(prev => ({ ...prev, loading: false }))
      }
    })

    // Escuta mudanças de auth
    const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null }))
      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setState(prev => ({ ...prev, profile: null, isAdmin: false, loading: false }))
      }
    })

    return () => subscription.unsubscribe()
  }, [loadProfile])

  return {
    ...state,
    signInWithGoogle: authService.signInWithGoogle,
    signInWithEmail: authService.signInWithEmail,
    signUpWithEmail: authService.signUpWithEmail,
    sendPasswordReset: authService.sendPasswordReset,
    updatePassword: authService.updatePassword,
    signOut: authService.signOut,
    refreshProfile: () => state.user ? loadProfile(state.user.id) : Promise.resolve(),
  }
}
