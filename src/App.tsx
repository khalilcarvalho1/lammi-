import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }       from '@/contexts/AuthContext'
import { StudyProvider }      from '@/contexts/StudyContext'
import { useAuthContext }     from '@/contexts/AuthContext'
import { AppShell }           from '@/components/layout/AppShell'
import { ProtectedRoute }     from '@/components/common/ProtectedRoute'

// Pages existentes
import { HomePage }           from '@/pages/HomePage'
import { BancoPage }          from '@/pages/BancoPage'
import { FlashcardsPage }     from '@/pages/FlashcardsPage'
import { SimuladoPage }       from '@/pages/SimuladoPage'
import { AulasPage }          from '@/pages/AulasPage'
import { AulaDetailPage }     from '@/pages/AulaDetailPage'
import { CasosPage }          from '@/pages/CasosPage'
import { DiretrizesPage }     from '@/pages/DiretrizesPage'
import { DiretrizDetailPage } from '@/pages/DiretrizDetailPage'
import { RankingPage }        from '@/pages/RankingPage'
import { DashboardPage }      from '@/pages/DashboardPage'
import { SobrePage }          from '@/pages/SobrePage'
import { AdminPage }          from '@/pages/AdminPage'
import { NotFoundPage }       from '@/pages/NotFoundPage'
import { LoginPage }          from '@/pages/auth/LoginPage'
import { RegisterPage }       from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ResetPasswordPage }  from '@/pages/auth/ResetPasswordPage'

// Novas páginas de hierarquia
import { AreasListPage }      from '@/pages/AreasListPage'
import { AreaDetailPage }     from '@/pages/AreaDetailPage'
import { TemaDetailPage }     from '@/pages/TemaDetailPage'

function StudyProviderWithAuth({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext()
  return <StudyProvider user={user}>{children}</StudyProvider>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StudyProviderWithAuth>
          <Routes>
            {/* Auth — sem shell */}
            <Route path="/login"           element={<LoginPage />} />
            <Route path="/register"        element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password"  element={<ResetPasswordPage />} />

            {/* App — com Navbar + footer */}
            <Route element={<AppShell />}>
              <Route path="/"            element={<HomePage />} />

              {/* ── Navegação hierárquica (NOVO) ── */}
              <Route path="/areas"                              element={<AreasListPage />} />
              <Route path="/areas/:areaId"                     element={<AreaDetailPage />} />
              <Route path="/areas/:areaId/temas/:temaId"       element={<TemaDetailPage />} />

              {/* ── Conteúdo (agora aceita ?theme= ou ?tema= via query params) ── */}
              <Route path="/banco"       element={<BancoPage />} />
              <Route path="/flashcards"  element={<FlashcardsPage />} />
              <Route path="/simulado"    element={<SimuladoPage />} />
              <Route path="/aulas"       element={<AulasPage />} />
              <Route path="/aulas/:id"   element={<AulaDetailPage />} />
              <Route path="/casos"       element={<CasosPage />} />
              <Route path="/diretrizes"  element={<DiretrizesPage />} />
              <Route path="/diretrizes/:id" element={<DiretrizDetailPage />} />
              <Route path="/ranking"     element={<RankingPage />} />
              <Route path="/dashboard"   element={<DashboardPage />} />
              <Route path="/sobre"       element={<SobrePage />} />

              {/* Admin */}
              <Route element={<ProtectedRoute adminOnly />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>

              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*"    element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </StudyProviderWithAuth>
      </AuthProvider>
    </BrowserRouter>
  )
}