import { MilDecor } from '@/components/layout/Navbar'
import { LogoIcon } from '@/components/layout/Navbar'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { THEMES } from '@/services/supabaseClient'

export function SobrePage() {
  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Sobre a LAMMI</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '3rem' }}>Liga Acadêmica de Medicina Militar de Irecê</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
          {[
            { titulo: 'Nossa Missão', txt: 'A LAMMI é uma organização estudantil dedicada ao ensino, pesquisa e extensão em Medicina Militar. Formada por estudantes de Medicina comprometidos com a excelência clínica tática e o atendimento ao combatente.' },
            { titulo: 'Metodologia', txt: 'Utilizamos protocolos ATLS, TCCC, PHTLS e manuais do Exército Brasileiro como base educacional, focando no raciocínio clínico tático e na medicina baseada em evidências em ambiente de emergência.' },
          ].map((c, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935', marginBottom: '.75rem' }}>{c.titulo}</div>
              <p style={{ fontSize: '.9rem', color: 'var(--text)', lineHeight: 1.75 }}>{c.txt}</p>
            </div>
          ))}
        </div>

        <div className="bg-mil" style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <div className="noise" />
          <MilDecor />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', textAlign: 'center', position: 'relative' }}>
            {[
              { val: MOCK_QUESTIONS.length, lbl: 'Questões no banco'   },
              { val: Object.keys(THEMES).length, lbl: 'Temas de estudo' },
              { val: '2024',               lbl: 'Protocolos atualizados' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '2.5rem', fontWeight: 700, color: '#E53935' }}>{s.val}</div>
                <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', marginTop: '.25rem' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipe placeholder */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935', marginBottom: '1.5rem' }}>Equipe</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {['Presidente', 'Vice-Presidente', 'Secretário(a)', 'Tesoureiro(a)', 'Dir. Científico', 'Dir. Extensão'].map((cargo, i) => (
              <div key={i} style={{ background: 'rgba(192,57,43,.06)', border: '1px solid var(--border)', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>⚕️</div>
                <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.25rem' }}>{cargo}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>A preencher</div>
              </div>
            ))}
          </div>
        </div>

        {/* Logo central */}
        <div style={{ textAlign: 'center', padding: '2.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <LogoIcon size={80} />
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', color: 'white', marginTop: '1.25rem', fontWeight: 700 }}>LAMMI</div>
          <div style={{ fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#E53935', marginTop: '.3rem' }}>Liga Acadêmica de Medicina Militar de Irecê</div>
          <div style={{ fontSize: '.82rem', color: 'var(--text-dim)', marginTop: '.75rem' }}>Irecê · Bahia · 2024</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: '📧', label: 'lammi@medicina.edu.br' },
              { icon: '📸', label: '@lammi_irece' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(192,57,43,.08)', border: '1px solid var(--border)', padding: '.6rem 1.25rem', fontSize: '.82rem', color: 'var(--text-muted)' }}>
                {c.icon} {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
