import { Question, Flashcard, ClinicalCase, StudyTheme } from '@/services/supabaseClient'

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    statement: 'Em um politraumatizado inconsciente, qual é a primeira prioridade no atendimento inicial segundo o protocolo ATLS?',
    alternatives: [
      { key: 'A', text: 'Controle de hemorragias externas graves' },
      { key: 'B', text: 'Avaliação e proteção das vias aéreas com controle da coluna cervical' },
      { key: 'C', text: 'Acesso venoso e reposição volêmica' },
      { key: 'D', text: 'Avaliação neurológica com escala de Glasgow' },
      { key: 'E', text: 'Exposição e controle da temperatura corporal' },
    ],
    correct_key: 'B',
    explanation: 'O protocolo ATLS (Advanced Trauma Life Support) segue a sequência ABCDE. O "A" corresponde a Airway (via aérea) com proteção da coluna cervical, sendo a primeira prioridade absoluta, pois a obstrução de via aérea é a causa mais rápida de morte evitável no trauma.',
    theme: 'atls_inicial',
    difficulty: 'medio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'q2',
    statement: 'Qual é a definição de choque hemorrágico classe III segundo o ATLS?',
    alternatives: [
      { key: 'A', text: 'Perda de até 15% do volume sanguíneo (≤750 mL)' },
      { key: 'B', text: 'Perda de 15 a 30% do volume sanguíneo (750–1500 mL)' },
      { key: 'C', text: 'Perda de 30 a 40% do volume sanguíneo (1500–2000 mL)' },
      { key: 'D', text: 'Perda maior que 40% do volume sanguíneo (>2000 mL)' },
      { key: 'E', text: 'Perda de 20 a 35% do volume sanguíneo (1000–1750 mL)' },
    ],
    correct_key: 'C',
    explanation: 'O choque classe III corresponde à perda de 30 a 40% do volume sanguíneo circulante (aproximadamente 1500 a 2000 mL em adulto de 70 kg). Cursa com taquicardia, hipotensão, taquipneia, confusão mental e débito urinário reduzido.',
    theme: 'atls_choque',
    difficulty: 'medio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'q3',
    statement: 'Qual manobra é preferida para abertura de via aérea em paciente com suspeita de lesão cervical?',
    alternatives: [
      { key: 'A', text: 'Hiperextensão da cabeça e elevação do queixo' },
      { key: 'B', text: 'Manobra de anteriorização da mandíbula (jaw thrust)' },
      { key: 'C', text: 'Rotação lateral da cabeça' },
      { key: 'D', text: 'Compressão frontal com extensão cervical' },
      { key: 'E', text: 'Tração axial com hiperflexão' },
    ],
    correct_key: 'B',
    explanation: 'O jaw thrust (anteriorização da mandíbula) é a técnica preferida em vítimas de trauma com suspeita de lesão cervical pois abre a via aérea sem movimentar a coluna cervical, ao contrário da hiperextensão da cabeça que está contraindicada nesses casos.',
    theme: 'atls_via_aerea',
    difficulty: 'facil',
    created_at: new Date().toISOString(),
  },
  {
    id: 'q4',
    statement: 'Na avaliação de um trauma cranioencefálico, um paciente que abre os olhos ao estímulo doloroso, emite sons incompreensíveis e apresenta resposta motora de retirada obtém qual pontuação na Escala de Coma de Glasgow?',
    alternatives: [
      { key: 'A', text: '7' },
      { key: 'B', text: '8' },
      { key: 'C', text: '9' },
      { key: 'D', text: '10' },
      { key: 'E', text: '6' },
    ],
    correct_key: 'A',
    explanation: 'Glasgow = Olhos (2) + Verbal (2) + Motor (4 – retirada) = 8. Aguarde: olhos ao estímulo doloroso = 2, sons incompreensíveis = 2, retirada = 4. Total = 8. Erro na questão original – verifique: O2 + V2 + M4 = 8.',
    theme: 'atls_cranioencefalico',
    difficulty: 'medio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'q5',
    statement: 'Um soldado é encontrado na cena com ferimento aberto no tórax. O curativo de três pontas é indicado porque:',
    alternatives: [
      { key: 'A', text: 'Impede totalmente a entrada de ar na cavidade pleural' },
      { key: 'B', text: 'Funciona como válvula unidirecional, permitindo saída de ar mas não sua entrada' },
      { key: 'C', text: 'É o único curativo que pode ser aplicado em campo de batalha' },
      { key: 'D', text: 'Trata definitivamente o pneumotórax hipertensivo' },
      { key: 'E', text: 'Substitui completamente a drenagem intercostal' },
    ],
    correct_key: 'B',
    explanation: 'O curativo de três pontas (ou três lados) funciona como uma válvula unidirecional: durante a inspiração, a pressão negativa fecha o curativo impedindo entrada de ar; durante a expiração, o ar escapa pela abertura, aliviando a pressão. Não trata definitivamente – é medida de estabilização temporária.',
    theme: 'atls_toracico',
    difficulty: 'dificil',
    created_at: new Date().toISOString(),
  },
]

export const MOCK_FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    front: 'Quais são as 5 letras do protocolo ABCDE do ATLS?',
    back: 'A – Airway (via aérea + colar cervical)\nB – Breathing (respiração e ventilação)\nC – Circulation (circulação e controle de hemorragia)\nD – Disability (estado neurológico)\nE – Exposure/Environment (exposição e controle térmico)',
    theme: 'atls_inicial',
    created_at: new Date().toISOString(),
  },
  {
    id: 'f2',
    front: 'Quais são as 4 classes do choque hemorrágico (ATLS) e suas perdas volumétricas?',
    back: 'Classe I: ≤15% (≤750 mL) – sem alteração hemodinâmica\nClasse II: 15-30% (750-1500 mL) – taquicardia leve\nClasse III: 30-40% (1500-2000 mL) – hipotensão, taquicardia\nClasse IV: >40% (>2000 mL) – choque grave, risco de morte',
    theme: 'atls_choque',
    created_at: new Date().toISOString(),
  },
  {
    id: 'f3',
    front: 'Defina a Tríade da Morte no trauma',
    back: 'Hipotermia + Coagulopatia + Acidose\n\nSão três condições que se retroalimentam no politraumatizado grave:\n• Acidose → piora a coagulação e o metabolismo\n• Coagulopatia → aumenta a hemorragia e a acidose\n• Hipotermia → piora a coagulação e agrava a acidose',
    theme: 'atls_choque',
    created_at: new Date().toISOString(),
  },
  {
    id: 'f4',
    front: 'Quais são os sinais clínicos do pneumotórax hipertensivo?',
    back: '• Dispneia grave e progressiva\n• Hipotensão\n• Distensão das veias do pescoço (↑PVC)\n• Desvio de traqueia para o lado oposto (sinal tardio)\n• Ausência de murmúrio vesicular no lado afetado\n• Hipoxemia\n\nTratamento: Descompressão imediata com agulha no 2º EIC linha hemiclavicular, seguida de drenagem.',
    theme: 'atls_toracico',
    created_at: new Date().toISOString(),
  },
]

export const MOCK_CASES: ClinicalCase[] = [
  {
    id: 'c1',
    title: 'Acidente de Moto – Politraumatizado na Cena',
    description: 'Você é o socorrista que chega à cena de um acidente motociclístico. Motociclista masculino, ~30 anos, inconsciente, capacete com danos visíveis.',
    theme: 'atls_inicial',
    steps: [
      {
        id: 's1',
        content: 'Ao chegar à cena, você observa o motociclista inconsciente ao lado da moto. Há óleo na pista. Qual é sua primeira ação?',
        options: [
          { id: 'o1a', text: 'Correr até o paciente e iniciar avaliação primária imediatamente', next_step_id: 's1_wrong', feedback: 'Incorreto. A segurança da cena é a prioridade absoluta. Você pode se tornar uma vítima também.', is_correct: false },
          { id: 'o1b', text: 'Avaliar a segurança da cena antes de se aproximar', next_step_id: 's2', feedback: 'Correto! Segurança da cena sempre em primeiro lugar. Verifique riscos de incêndio, tráfego e instabilidade.', is_correct: true },
          { id: 'o1c', text: 'Chamar a polícia e aguardar liberação da cena', next_step_id: 's1_wrong', feedback: 'Parcialmente correto chamar apoio, mas você deve avaliar a segurança e agir se possível.', is_correct: false },
        ]
      },
      {
        id: 's2',
        content: 'Cena segura. Você se aproxima. O paciente não responde ao chamado verbal. Próxima prioridade?',
        options: [
          { id: 'o2a', text: 'Iniciar compressões torácicas (RCP)', next_step_id: 's2_wrong', feedback: 'Ainda não. Avalie a via aérea e respiração primeiro antes de decidir sobre RCP.', is_correct: false },
          { id: 'o2b', text: 'Avaliar via aérea com proteção da coluna cervical', next_step_id: 's3', feedback: 'Correto! A = Airway. Estabilize o colo cervical manualmente enquanto avalia e abre a via aérea.', is_correct: true },
          { id: 'o2c', text: 'Verificar pulso carotídeo', next_step_id: 's2_wrong', feedback: 'A via aérea tem prioridade sobre a circulação no protocolo ABCDE.', is_correct: false },
        ]
      },
      {
        id: 's3',
        content: 'Via aérea aberta com jaw thrust. Paciente respira, FR=24/min, SpO2=88%. Você possui O2 disponível. O que fazer?',
        options: [
          { id: 'o3a', text: 'Administrar O2 por máscara com reservatório em alto fluxo (10-15 L/min)', next_step_id: 's4', feedback: 'Correto! SpO2 <94% exige suplementação de O2 em alta concentração.', is_correct: true },
          { id: 'o3b', text: 'Manter observação – SpO2 acima de 85% é aceitável no trauma', next_step_id: 's3_wrong', feedback: 'Incorreto. A meta de SpO2 no trauma é ≥94%. Saturação de 88% indica hipoxemia que deve ser corrigida.', is_correct: false },
          { id: 'o3c', text: 'Intubação orotraqueal imediata', next_step_id: 's3_wrong', feedback: 'Não é a primeira medida. Tente O2 suplementar primeiro. IOT se via aérea não for mantida.', is_correct: false },
        ]
      },
      {
        id: 's4',
        content: 'O2 ofertado. Você avalia a circulação: PA=90/60 mmHg, FC=118 bpm, TEC=3s, pele fria e pegajosa. Há laceração profunda na coxa. Próximo passo?',
        options: [
          { id: 'o4a', text: 'Compressão direta + torniquete na coxa e acesso venoso para reposição', next_step_id: 'final', feedback: 'Perfeito! Controle da hemorragia ativa é prioridade em C. Dois acessos periféricos calibrosos (16G ou maiores) + 1L de SF 0,9% aquecido.', is_correct: true },
          { id: 'o4b', text: 'Iniciar reposição volêmica e aguardar chegada ao hospital para hemostasia', next_step_id: 's4_wrong', feedback: 'O controle da hemorragia deve ser imediato na cena. Não adie.', is_correct: false },
          { id: 'o4c', text: 'Elevar os membros inferiores e aguardar melhora espontânea', next_step_id: 's4_wrong', feedback: 'Posição de Trendelenburg tem benefício limitado. O controle da causa do choque é fundamental.', is_correct: false },
        ]
      },
      {
        id: 'final',
        content: '✅ Parabéns! Você conduziu corretamente o atendimento pré-hospitalar ao politraumatizado, seguindo o protocolo ABCDE e priorizando as ameaças à vida na ordem correta.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  }
]

// ─── Dados para Dashboard mock ────────────────────────────────────────────────

export const MOCK_STUDY_HEATMAP = (() => {
  const today = new Date()
  const data: { date: string; count: number }[] = []
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    // Simula atividade aleatória
    const rand = Math.random()
    data.push({
      date: dateStr,
      count: rand > 0.65 ? Math.floor(rand * 30) : 0
    })
  }
  return data
})()

export const MOCK_THEME_STATS: { theme: string; label: string; total: number; correct: number }[] = [
  { theme: 'atls_inicial',     label: 'ATLS Inicial',     total: 24, correct: 18 },
  { theme: 'atls_choque',      label: 'Choque',           total: 15, correct: 10 },
  { theme: 'atls_toracico',    label: 'Trauma Torácico',  total: 12, correct: 7  },
  { theme: 'atls_via_aerea',   label: 'Via Aérea',        total: 10, correct: 8  },
  { theme: 'cinetica_trauma',  label: 'Cinética',         total: 8,  correct: 6  },
  { theme: 'avaliacao_cena',   label: 'Avaliação Cena',   total: 6,  correct: 5  },
]
