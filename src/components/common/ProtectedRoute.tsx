import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { LoadingSpinner } from './LoadingSpinner'

interface Props {
  /** Se true, exige role='admin' além de estar autenticado */
  adminOnly?: boolean
}

export function ProtectedRoute({ adminOnly = false }: Props) {
  const { user, profile, loading } = useAuthContext()

  if (loading) return <LoadingSpinner />

  if (!user) return <Navigate to="/login" replace />

  if (adminOnly && profile?.role !== 'admin') return <Navigate to="/" replace />

  return <Outlet />
}
