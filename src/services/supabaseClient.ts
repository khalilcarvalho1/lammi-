import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type UserRole = 'admin' | 'member'

// ── Temas originais LAMMI (medicina militar) ─────────────────────────────────
export type StudyTheme =
  // Medicina Militar (LAMMI original)
  | 'avaliacao_cena'
  | 'cinetica_trauma'
  | 'atls_inicial'
  | 'atls_via_aerea'
  | 'atls_face'
  | 'atls_pescoco'
  | 'atls_toracico'
  | 'atls_choque'
  | 'atls_abdominal'
  | 'atls_genitourinario'
  | 'atls_cranioencefalico'
  | 'atls_coluna'
  // Cardiologia
  | 'cardio_has'
  | 'cardio_ic'
  | 'cardio_sca'
  | 'cardio_arritmias'
  | 'cardio_valvopatias'
  | 'cardio_perimio'
  // Pneumologia
  | 'pneumo_dpoc'
  | 'pneumo_asma'
  | 'pneumo_tep'
  | 'pneumo_pna'
  | 'pneumo_tb'
  | 'pneumo_neoplasias'
  | 'pneumo_outros'
  // Neurologia
  | 'neuro_avc'
  | 'neuro_epilepsia'
  | 'neuro_cefaleia'
  | 'neuro_demencia'
  | 'neuro_parkinson'
  | 'neuro_em'
  | 'neuro_outros'
  // Gastroenterologia
  | 'gastro_drge'
  | 'gastro_dup'
  | 'gastro_dii'
  | 'gastro_cirrose'
  | 'gastro_hepatites'
  | 'gastro_pancreatite'
  | 'gastro_intestino'
  // Endocrinologia
  | 'endo_dm'
  | 'endo_tireoide'
  | 'endo_adrenal'
  | 'endo_hipofise'
  | 'endo_metabolismo'
  // Nefrologia
  | 'nefro_lra'
  | 'nefro_drc'
  | 'nefro_glomero'
  | 'nefro_dhe'
  | 'nefro_ab'
  | 'nefro_litiase'
  // Reumatologia
  | 'reu_ar'
  | 'reu_les'
  | 'reu_espondilo'
  | 'reu_vasculites'
  | 'reu_gota'
  | 'reu_outros'
  // Infectologia
  | 'inf_hiv'
  | 'inf_sepse'
  | 'inf_itu'
  | 'inf_isc'
  | 'inf_tb'
  | 'inf_dengue'
  | 'inf_outros'
  // Hematologia
  | 'hem_anemia'
  | 'hem_leuc'
  | 'hem_linf'
  | 'hem_coag'
  | 'hem_mm'
  // Oncologia
  | 'onc_mama'
  | 'onc_pulmao'
  | 'onc_prostata'
  | 'onc_colorretal'
  | 'onc_cuidados'
  // Geriatria
  | 'ger_sindromes'
  | 'ger_demencia'
  | 'ger_fragilidade'
  | 'ger_polifarmacia'
  | 'ger_avaliacao'
  // Pediatria
  | 'ped_neo'
  | 'ped_imuniza'
  | 'ped_cresce'
  | 'ped_inf'
  | 'ped_emerg'
  | 'ped_nutro'
  // Ginecologia
  | 'gin_ciclo'
  | 'gin_climat'
  | 'gin_cancer'
  | 'gin_ist'
  | 'gin_anticonc'
  | 'gin_outros'
  // Obstetrícia
  | 'obs_prenatal'
  | 'obs_parto'
  | 'obs_puerp'
  | 'obs_dheg'
  | 'obs_sangramento'
  | 'obs_outros'
  // Cirurgia Geral
  | 'cir_abdome'
  | 'cir_hernias'
  | 'cir_biliar'
  | 'cir_trauma'
  | 'cir_preop'
  | 'cir_pos'
  // Ortopedia
  | 'orto_fraturas'
  | 'orto_joelho'
  | 'orto_coluna'
  | 'orto_emerg'
  // Dermatologia
  | 'der_eczemas'
  | 'der_infec'
  | 'der_cancer'
  | 'der_ist'
  | 'der_hans'
  // Oftalmologia
  | 'oft_glauc'
  | 'oft_catarata'
  | 'oft_retina'
  | 'oft_vermelho'
  // Otorrino
  | 'orl_ouvido'
  | 'orl_nariz'
  | 'orl_faringe'
  | 'orl_vertigem'
  // Psiquiatria
  | 'psi_dep'
  | 'psi_ans'
  | 'psi_bipo'
  | 'psi_esquizo'
  | 'psi_suicidio'
  | 'psi_outros'
  // MFC
  | 'mfc_aps'
  | 'mfc_prev'
  | 'mfc_rastreio'
  | 'mfc_metodo'
  // Emergência
  | 'emerg_atls'
  | 'emerg_acls'
  | 'emerg_pals'
  | 'emerg_outros'
  // UTI
  | 'uti_sepse'
  | 'uti_vm'
  | 'uti_drogas'
  | 'uti_suporte'
  // Anestesia
  | 'an_drogas'
  | 'an_bloqueios'
  | 'an_via'
  | 'an_preop'
  // Radiologia
  | 'rad_torax'
  | 'rad_abdome'
  | 'rad_cranio'
  | 'rad_us'

export const THEMES: Record<StudyTheme, string> = {
  // Medicina Militar (LAMMI original)
  avaliacao_cena:        'Avaliação da Cena e Atendimento Inicial',
  cinetica_trauma:       'Cinética do Trauma',
  atls_inicial:          'ATLS: Atendimento Inicial ao Politraumatizado',
  atls_via_aerea:        'ATLS: Via Aérea',
  atls_face:             'ATLS: Trauma de Face',
  atls_pescoco:          'ATLS: Trauma de Pescoço',
  atls_toracico:         'ATLS: Trauma Torácico',
  atls_choque:           'ATLS: Choque',
  atls_abdominal:        'ATLS: Trauma Abdominal',
  atls_genitourinario:   'ATLS: Trauma Genitourinário',
  atls_cranioencefalico: 'ATLS: Trauma Cranioencefálico',
  atls_coluna:           'ATLS: Trauma de Coluna e Raquimedular (TRM)',
  // Cardiologia
  cardio_has:        'Hipertensão Arterial',
  cardio_ic:         'Insuficiência Cardíaca',
  cardio_sca:        'Síndromes Coronarianas',
  cardio_arritmias:  'Arritmias',
  cardio_valvopatias:'Valvopatias',
  cardio_perimio:    'Pericárdio e Miocárdio',
  // Pneumologia
  pneumo_dpoc:       'DPOC',
  pneumo_asma:       'Asma',
  pneumo_tep:        'TEP e TVP',
  pneumo_pna:        'Pneumonias',
  pneumo_tb:         'Tuberculose',
  pneumo_neoplasias: 'Câncer de Pulmão',
  pneumo_outros:     'Outros — Pneumologia',
  // Neurologia
  neuro_avc:         'AVC',
  neuro_epilepsia:   'Epilepsia',
  neuro_cefaleia:    'Cefaleia',
  neuro_demencia:    'Demências',
  neuro_parkinson:   'Parkinson e Movimento',
  neuro_em:          'Esclerose Múltipla',
  neuro_outros:      'Outros — Neurologia',
  // Gastroenterologia
  gastro_drge:       'DRGE e Esôfago',
  gastro_dup:        'Doença Ulcerosa Péptica',
  gastro_dii:        'DII',
  gastro_cirrose:    'Cirrose e Hepatopatias',
  gastro_hepatites:  'Hepatites Virais',
  gastro_pancreatite:'Pancreatite',
  gastro_intestino:  'Intestino',
  // Endocrinologia
  endo_dm:           'Diabetes Mellitus',
  endo_tireoide:     'Tireoide',
  endo_adrenal:      'Adrenal',
  endo_hipofise:     'Hipófise',
  endo_metabolismo:  'Metabolismo e Outros',
  // Nefrologia
  nefro_lra:         'Lesão Renal Aguda',
  nefro_drc:         'Doença Renal Crônica',
  nefro_glomero:     'Glomerulopatias',
  nefro_dhe:         'Distúrbios Hidroeletrolíticos',
  nefro_ab:          'Equilíbrio Ácido-Base',
  nefro_litiase:     'Nefrolitíase',
  // Reumatologia
  reu_ar:            'Artrite Reumatoide',
  reu_les:           'LES',
  reu_espondilo:     'Espondiloartrites',
  reu_vasculites:    'Vasculites',
  reu_gota:          'Gota e Cristais',
  reu_outros:        'Outros — Reumatologia',
  // Infectologia
  inf_hiv:           'HIV/AIDS',
  inf_sepse:         'Sepse',
  inf_itu:           'ITU',
  inf_isc:           'Infecções de Pele',
  inf_tb:            'Tuberculose',
  inf_dengue:        'Arboviroses',
  inf_outros:        'Outros — Infectologia',
  // Hematologia
  hem_anemia:        'Anemias',
  hem_leuc:          'Leucemias',
  hem_linf:          'Linfomas',
  hem_coag:          'Coagulopatias',
  hem_mm:            'Mieloma Múltiplo',
  // Oncologia
  onc_mama:          'Câncer de Mama',
  onc_pulmao:        'Câncer de Pulmão',
  onc_prostata:      'Câncer de Próstata',
  onc_colorretal:    'Câncer Colorretal',
  onc_cuidados:      'Cuidados Paliativos',
  // Geriatria
  ger_sindromes:     'Síndromes Geriátricas',
  ger_demencia:      'Demência',
  ger_fragilidade:   'Fragilidade e Sarcopenia',
  ger_polifarmacia:  'Polifarmácia',
  ger_avaliacao:     'Avaliação Geriátrica Ampla',
  // Pediatria
  ped_neo:           'Neonatologia',
  ped_imuniza:       'Imunizações',
  ped_cresce:        'Crescimento e Desenvolvimento',
  ped_inf:           'Infecções Pediátricas',
  ped_emerg:         'Emergências Pediátricas',
  ped_nutro:         'Nutropediatria',
  // Ginecologia
  gin_ciclo:         'Ciclo Menstrual e Alterações',
  gin_climat:        'Climatério e Menopausa',
  gin_cancer:        'Oncologia Ginecológica',
  gin_ist:           'ISTs Ginecológicas',
  gin_anticonc:      'Anticoncepção',
  gin_outros:        'Outros — Ginecologia',
  // Obstetrícia
  obs_prenatal:      'Pré-natal',
  obs_parto:         'Parto',
  obs_puerp:         'Puerpério',
  obs_dheg:          'DHEG',
  obs_sangramento:   'Sangramentos na Gestação',
  obs_outros:        'Outros — Obstetrícia',
  // Cirurgia Geral
  cir_abdome:        'Abdome Agudo',
  cir_hernias:       'Hérnias',
  cir_biliar:        'Vias Biliares',
  cir_trauma:        'Trauma Cirúrgico',
  cir_preop:         'Pré-operatório',
  cir_pos:           'Pós-operatório',
  // Ortopedia
  orto_fraturas:     'Fraturas',
  orto_joelho:       'Joelho e Quadril',
  orto_coluna:       'Coluna Vertebral',
  orto_emerg:        'Emergências Ortopédicas',
  // Dermatologia
  der_eczemas:       'Eczemas e Dermatites',
  der_infec:         'Infecções de Pele',
  der_cancer:        'Câncer de Pele',
  der_ist:           'ISTs Cutâneas',
  der_hans:          'Hanseníase',
  // Oftalmologia
  oft_glauc:         'Glaucoma',
  oft_catarata:      'Catarata',
  oft_retina:        'Retinopatias',
  oft_vermelho:      'Olho Vermelho',
  // Otorrino
  orl_ouvido:        'Ouvido',
  orl_nariz:         'Nariz e Seios Paranasais',
  orl_faringe:       'Laringe e Faringe',
  orl_vertigem:      'Vertigem',
  // Psiquiatria
  psi_dep:           'Depressão',
  psi_ans:           'Ansiedade',
  psi_bipo:          'Transtorno Bipolar',
  psi_esquizo:       'Esquizofrenia',
  psi_suicidio:      'Suicídio e Autolesão',
  psi_outros:        'Outros — Psiquiatria',
  // MFC
  mfc_aps:           'Atenção Primária à Saúde',
  mfc_prev:          'Prevenção',
  mfc_rastreio:      'Rastreio',
  mfc_metodo:        'Método Clínico',
  // Emergência
  emerg_atls:        'ATLS — Trauma',
  emerg_acls:        'ACLS — Cardiovascular',
  emerg_pals:        'PALS — Pediátrico',
  emerg_outros:      'Outras Emergências',
  // UTI
  uti_sepse:         'Sepse e Infecção',
  uti_vm:            'Ventilação Mecânica',
  uti_drogas:        'Drogas Vasoativas',
  uti_suporte:       'Suporte Intensivo',
  // Anestesia
  an_drogas:         'Drogas Anestésicas',
  an_bloqueios:      'Bloqueios e Técnicas',
  an_via:            'Via Aérea em Anestesia',
  an_preop:          'Pré e Pós-anestésico',
  // Radiologia
  rad_torax:         'Tórax',
  rad_abdome:        'Abdome',
  rad_cranio:        'Neuroimagem',
  rad_us:            'POCUS e Ultrassom',
}

export type Difficulty = 'facil' | 'medio' | 'dificil'

export interface Profile {
  id: string
  email: string
  display_name: string
  nickname: string
  avatar_url: string | null
  role: UserRole
  active: boolean
  score: number
  study_streak: number
  last_study_date: string | null
  created_at: string
}

export interface Question {
  id: string
  statement: string
  alternatives: { key: string; text: string }[]
  correct_key: string
  explanation: string
  theme: StudyTheme
  difficulty: Difficulty
  created_at: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  theme: StudyTheme
  created_at: string
}

export interface ClinicalCase {
  id: string
  title: string
  description: string
  theme: StudyTheme
  steps: CaseStep[]
  created_at: string
}

export interface CaseStep {
  id: string
  content: string
  options: {
    id: string
    text: string
    next_step_id: string | null
    feedback: string
    is_correct: boolean
  }[]
}

export interface SimuladoRecord {
  id: string
  user_id: string
  themes: StudyTheme[]
  total_questions: number
  correct_count: number
  time_seconds: number
  started_at: string
  finished_at: string
  question_results: { question_id: string; chosen_key: string; correct: boolean }[]
}

export interface StudyLog {
  id: string
  user_id: string
  activity_type: 'question' | 'flashcard' | 'simulado' | 'case'
  theme: StudyTheme | null
  date: string
  count: number
}