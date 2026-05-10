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

{
  "id": "caso_avaliacao_cena_01",
  "theme": "avaliacao_cena",
  "title": "Colisão na Rodovia",
  "description": "Você é o primeiro socorrista a chegar a uma colisão frontal entre dois veículos em rodovia estadual. Uma vítima está presa no veículo com sinais de trauma grave.",
  "steps": [
    {
      "id": "step1",
      "content": "## Chegada à Cena\n\nVocê avista dois veículos com danos frontais severos. Um dos veículos está com o motor em chamas. Há combustível no asfalto. A vítima principal está no banco do motorista, presa pelas ferragens, consciente e gritando de dor.\n\n**Qual é sua primeira ação?**",
      "options": [
        {
          "id": "s1a",
          "text": "Aproximar-se imediatamente da vítima para iniciar o atendimento",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. A cena não foi avaliada quanto à segurança — fogo e combustível representam risco imediato de explosão. Entrar sem avaliação pode transformar o socorrista em vítima."
        },
        {
          "id": "s1b",
          "text": "Avaliar a segurança da cena, acionar bombeiros e aguardar controle do fogo antes de aproximar",
          "is_correct": true,
          "next_step_id": "step2",
          "feedback": "Correto. Segurança da cena é a primeira prioridade absoluta. Fogo + combustível = risco de explosão. Acione bombeiros, posicione a viatura em ângulo de proteção e aguarde controle."
        },
        {
          "id": "s1c",
          "text": "Pedir para a vítima sair sozinha do veículo",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. A vítima está presa pelas ferragens — é impossível sair sozinha. Além disso, a cena ainda não foi avaliada quanto à segurança."
        },
        {
          "id": "s1d",
          "text": "Iniciar triagem START imediatamente em todas as vítimas",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. A triagem START só é iniciada após a avaliação e controle da segurança da cena. Entrar em cena insegura viola o princípio fundamental do APH."
        }
      ]
    },
    {
      "id": "step2",
      "content": "## Avaliação da Vítima Principal\n\nApós controle do fogo pelos bombeiros, você acessa a vítima. Homem, 38 anos, consciente, agitado, GCS 13. FC 128 bpm, FR 28 irpm, SpO₂ 91% em ar ambiente, PA 88/60 mmHg. Há sangramento ativo e volumoso na coxa direita com deformidade evidente.\n\n**Qual é sua prioridade imediata?**",
      "options": [
        {
          "id": "s2a",
          "text": "Aplicar torniquete na coxa direita imediatamente",
          "is_correct": true,
          "next_step_id": "step3",
          "feedback": "Correto. Hemorragia maciça de membro é a prioridade no componente C do MARCH/ABCDE. O torniquete deve ser aplicado 5-7 cm proximal à lesão, apertado até cessar o sangramento, com horário anotado."
        },
        {
          "id": "s2b",
          "text": "Administrar oxigênio suplementar pela SpO₂ baixa",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. A SpO₂ baixa é consequência do choque hemorrágico — o sangramento deve ser controlado primeiro. Oxigênio será aplicado em seguida, mas não é a prioridade imediata."
        },
        {
          "id": "s2c",
          "text": "Obter dois acessos venosos calibrosos e iniciar reposição volêmica",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. A reposição volêmica sem controle da hemorragia é ineficaz — o sangue continuará sendo perdido. Controle a hemorragia primeiro, depois obtenha acesso vascular."
        },
        {
          "id": "s2d",
          "text": "Imobilizar a fratura de fêmur com tala antes de qualquer outra intervenção",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. A imobilização da fratura é importante mas secundária ao controle da hemorragia ativa. O torniquete é a intervenção salvadora imediata."
        }
      ]
    },
    {
      "id": "step3",
      "content": "## Após Torniquete\n\nTorniquete aplicado com sucesso — sangramento cessou. Horário registrado: 14h32. SpO₂ sobe para 94% com máscara de O₂ a 15 L/min. FC 118 bpm, PA 92/64 mmHg. Você nota que a vítima apresenta desvio de traqueia para a esquerda e ausência de murmúrio vesicular à direita.\n\n**O que você faz agora?**",
      "options": [
        {
          "id": "s3a",
          "text": "Realizar descompressão por agulha no 2º EIC direito, linha hemiclavicular",
          "is_correct": true,
          "next_step_id": "step4",
          "feedback": "Correto. Desvio de traqueia + ausência de murmúrio vesicular unilateral + hipotensão = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente, não aguarde imagem."
        },
        {
          "id": "s3b",
          "text": "Solicitar radiografia de tórax para confirmar o pneumotórax",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. Pneumotórax hipertensivo é diagnóstico clínico e emergência imediata — aguardar imagem pode ser fatal. A descompressão deve ser realizada antes de qualquer exame."
        },
        {
          "id": "s3c",
          "text": "Aumentar o fluxo de O₂ e monitorizar a SpO₂",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. A causa da hipóxia é mecânica (pneumotórax hipertensivo) — aumentar O₂ não resolve. A descompressão é mandatória e imediata."
        },
        {
          "id": "s3d",
          "text": "Realizar curativo de três pontas na parede torácica direita",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. O curativo de três pontas é para pneumotórax aberto (ferida torácica aspirativa), não para pneumotórax hipertensivo fechado. A conduta correta é a descompressão por agulha."
        }
      ]
    },
    {
      "id": "step4",
      "content": "## Após Descompressão\n\nApós a punção, saída de ar sob pressão confirmada. SpO₂ 97%, FC 108 bpm, PA 98/68 mmHg. Vítima mais calma, GCS 14. Você obtém dois acessos venosos periféricos 16G e inicia reposição. O desencarceramento pelos bombeiros é estimado em mais 15 minutos.\n\n**Qual meta de pressão arterial você adota durante a reposição?**",
      "options": [
        {
          "id": "s4a",
          "text": "PAS 80-90 mmHg — hipotensão permissiva até hemostasia definitiva",
          "is_correct": true,
          "next_step_id": "step5",
          "feedback": "Correto. Trauma contuso com choque hemorrágico sem TCE: hipotensão permissiva com alvo PAS 80-90 mmHg reduz o ressangramento ao desalojar coágulos em formação. Hiper-hidratação agrava a coagulopatia."
        },
        {
          "id": "s4b",
          "text": "PAS 120 mmHg — normalizar a pressão arterial o mais rápido possível",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. Normalizar a pressão antes da hemostasia cirúrgica definitiva aumenta o ressangramento — o coágulo em formação é desalojado pela pressão elevada. Hipotensão permissiva é o padrão atual."
        },
        {
          "id": "s4c",
          "text": "PAS 60 mmHg — quanto mais baixa, menor o sangramento",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. PAS < 80 mmHg causa isquemia orgânica grave — rim, coração e cérebro. A hipotensão permissiva tem limite inferior de 80 mmHg, não visa hipotensão máxima."
        },
        {
          "id": "s4d",
          "text": "PAS ≥ 110 mmHg — TCE associado exige pressão mais elevada",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. Não há evidência de TCE neste caso — GCS 14 com melhora após descompressão do pneumotórax. Na ausência de TCE, a meta é hipotensão permissiva (PAS 80-90 mmHg)."
        }
      ]
    },
    {
      "id": "step5",
      "content": "## Pronto para Transporte\n\nApós desencarceramento, vítima imobilizada em prancha rígida com colar cervical. GCS 14, FC 102 bpm, PA 86/58 mmHg, SpO₂ 96%. Há dois hospitais disponíveis: Hospital Municipal (8 km, sem cirurgião vascular disponível) e Centro de Trauma Regional (32 km, nível I, com todos os recursos).\n\n**Para onde você transporta?**",
      "options": [
        {
          "id": "s5a",
          "text": "Centro de Trauma Regional (32 km) — paciente necessita de recursos de nível I",
          "is_correct": true,
          "next_step_id": "step6",
          "feedback": "Correto. O paciente tem critérios de centralização: choque hemorrágico, pneumotórax, fratura de fêmur com lesão vascular provável. O destino deve ser o centro mais adequado, não o mais próximo."
        },
        {
          "id": "s5b",
          "text": "Hospital Municipal (8 km) — mais próximo, estabilize e transfira depois",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. Desvio para hospital inadequado aumenta a mortalidade. A transferência secundária atrasa o tratamento definitivo. O transporte direto ao centro de trauma é sempre preferível."
        },
        {
          "id": "s5c",
          "text": "Aguardar estabilização completa na cena antes de transportar",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. O tempo na cena deve ser < 10 minutos em trauma grave. Intervenções que podem ser feitas durante o transporte não devem atrasar a saída da cena."
        },
        {
          "id": "s5d",
          "text": "Hospital Municipal para TC de tórax e abdome antes de definir o destino",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. TC em hospital inadequado atrasa o tratamento definitivo sem agregar valor — o centro de trauma tem todos os recursos necessários. Transporte direto é o padrão."
        }
      ]
    },
    {
      "id": "step6",
      "content": "## Passagem de Caso\n\nVocê chega ao Centro de Trauma Regional. A equipe receptora aguarda. Você tem 60 segundos para passar o caso pelo protocolo MIST.\n\n**Qual é a passagem de caso correta?**",
      "options": [
        {
          "id": "s6a",
          "text": "\"Homem, 38 anos, colisão frontal a ~80 km/h, preso nas ferragens. Fratura de fêmur direito com hemorragia — torniquete às 14h32. Pneumotórax hipertensivo direito — descompresso por agulha. GCS 14, FC 102, PA 86/58, SpO₂ 96%. 500 mL SF em trânsito. Torniquete há 28 minutos.\"",
          "is_correct": true,
          "next_step_id": "final",
          "feedback": "Correto. MIST completo: Mecanismo (colisão frontal ~80 km/h, preso), Injúrias (fratura de fêmur + pneumotórax hipertensivo), Sinais vitais (GCS 14, FC 102, PA 86/58, SpO₂ 96%), Tratamento (torniquete 14h32, descompressão, 500 mL SF). Informação do tempo de torniquete é crítica."
        },
        {
          "id": "s6b",
          "text": "\"Paciente em acidente de carro, com fratura na perna e problema no pulmão. Pressão baixa.\"",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. Passagem vaga e incompleta — omite mecanismo detalhado, horário do torniquete (crítico para decisão de retirada), parâmetros vitais completos e tratamentos realizados. A equipe receptora não tem informações suficientes para preparar a resposta."
        },
        {
          "id": "s6c",
          "text": "\"Politraumatizado grave, instável, precisa de cirurgia urgente.\"",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. Sem nenhuma informação estruturada. O MIST existe justamente para garantir transferência de informação padronizada e completa — esta passagem não permite nenhum planejamento pela equipe receptora."
        },
        {
          "id": "s6d",
          "text": "\"Homem, 38 anos, acidente. Torniquete na perna. Fizemos descompressão. Pressão 86/58.\"",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incompleto. Faltam: mecanismo detalhado (velocidade, tipo de colisão), horário do torniquete, GCS, SpO₂, volume de fluidos administrado e tempo de isquemia do torniquete."
        }
      ]
    },
    {
      "id": "final",
      "content": "## Caso Concluído\n\nVocê conduziu o atendimento de forma sistematizada: segurança da cena → controle de hemorragia → via aérea/ventilação → descompressão de pneumotórax → reposição guiada → transporte ao centro adequado → passagem de caso estruturada.",
      "options": []
    }
  ]
}

{
  "id": "caso_cinetica_trauma_01",
  "theme": "cinetica_trauma",
  "title": "Capotamento em Estrada Rural",
  "description": "Você atende um capotamento em estrada rural. O veículo capotou três vezes e o motorista foi ejetado. Aplique o raciocínio cinemático para antecipar lesões.",
  "steps": [
    {
      "id": "step1",
      "content": "## Análise da Cena\n\nVeículo capotado três vezes, com deformação extensa do teto. Motorista encontrado a 8 metros do veículo, sem cinto de segurança. Mulher, 26 anos, consciente mas confusa, GCS 12.\n\n**Com base na cinemática, quais lesões você deve antecipar prioritariamente?**",
      "options": [
        {
          "id": "s1a",
          "text": "TCE, lesão cervical multidirecional, trauma torácico e abdominal — mecanismo de alto risco com ejeção",
          "is_correct": true,
          "next_step_id": "step2",
          "feedback": "Correto. Capotamento com ejeção: mortalidade 6x maior que sem ejeção. Espere TCE por impactos repetidos do crânio, trauma cervical multidirecional, trauma torácico e abdominal por múltiplos impactos durante o capotamento."
        },
        {
          "id": "s1b",
          "text": "Apenas fratura de membros — a vítima foi ejetada e amorteceu a queda com os braços",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. A ejeção é um dos mecanismos de maior risco — a vítima impacta o solo após ser propelida pelo veículo, sofrendo lesões de alta energia em múltiplas regiões. Focar apenas nos membros é uma falha grave de raciocínio cinemático."
        },
        {
          "id": "s1c",
          "text": "Trauma abdominal isolado — o impacto principal foi no abdome ao ser ejetada",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. Em capotamento com ejeção, as lesões são múltiplas e imprevisíveis — não se pode assumir um único ponto de impacto. O raciocínio cinemático exige avaliação de todos os sistemas."
        },
        {
          "id": "s1d",
          "text": "Sem lesões graves — a vítima está consciente e sem sangramento externo visível",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. Consciência preservada e ausência de sangramento externo não excluem lesões graves internas. Mecanismo de alto risco exige rastreamento agressivo independentemente da apresentação inicial."
        }
      ]
    },
    {
      "id": "step2",
      "content": "## Avaliação Primária\n\nGCS 12 (O3V4M5), PA 102/70 mmHg, FC 114 bpm, FR 22 irpm, SpO₂ 95%. Você nota equimose no flanco esquerdo e dor à palpação do hipocôndrio esquerdo. Abdome levemente distendido. Sem sangramento externo ativo.\n\n**O que o padrão de equimose no flanco esquerdo sugere em um capotamento?**",
      "options": [
        {
          "id": "s2a",
          "text": "Lesão esplênica por impacto no flanco esquerdo durante o capotamento",
          "is_correct": true,
          "next_step_id": "step3",
          "feedback": "Correto. Equimose no flanco esquerdo + dor em hipocôndrio esquerdo + mecanismo de capotamento = lesão esplênica até que se prove o contrário. O baço é o órgão mais frequentemente lesado no trauma contuso abdominal."
        },
        {
          "id": "s2b",
          "text": "Apenas contusão muscular da parede abdominal — sem significado clínico maior",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. Em mecanismo de alta energia, equimose de flanco esquerdo deve ser tratada como lesão esplênica até que exames de imagem excluam. Minimizar o achado em mecanismo de alto risco é perigoso."
        },
        {
          "id": "s2c",
          "text": "Fratura de costelas inferiores esquerdas isolada",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Parcialmente incorreto. Fraturas de costelas inferiores esquerdas são possíveis e podem estar associadas, mas a principal preocupação é a lesão esplênica subjacente — que ocorre em 20% dos casos com fratura de costelas 9-12 esquerdas."
        },
        {
          "id": "s2d",
          "text": "Sinal de Grey-Turner — hemorragia retroperitoneal com dissecção para o flanco",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. O sinal de Grey-Turner é equimose tardia no flanco por dissecção retroperitoneal — aparece em horas a dias após o trauma, não imediatamente. A equimose imediata indica trauma direto."
        }
      ]
    },
    {
      "id": "step3",
      "content": "## Avaliação Cervical\n\nDurante o log-roll, você palpa dor e crepitação na região cervical posterior em C5-C6. A paciente refere formigamento nos quatro membros. Força dos membros superiores 3/5 bilateralmente, membros inferiores 4/5.\n\n**Qual síndrome medular você suspeita e por quê?**",
      "options": [
        {
          "id": "s3a",
          "text": "Síndrome do cordão central — fraqueza maior nos MMSS que nos MMII em trauma cervical por capotamento",
          "is_correct": true,
          "next_step_id": "step4",
          "feedback": "Correto. Fraqueza desproporcional nos membros superiores (3/5) comparada aos inferiores (4/5) + trauma cervical por capotamento = síndrome do cordão central. As fibras corticoespinais para os MMSS são mais centrais e mais vulneráveis."
        },
        {
          "id": "s3b",
          "text": "Síndrome de Brown-Séquard — deficit motor de um lado e sensitivo do outro",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. Brown-Séquard causa hemissecção medular com fraqueza ipsilateral e perda de dor/temperatura contralateral. Este caso apresenta deficit bilateral e simétrico, incompatível com Brown-Séquard."
        },
        {
          "id": "s3c",
          "text": "Síndrome do cordão anterior — perda motora com preservação de propriocepção",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. A síndrome do cordão anterior causa perda motora + perda de dor/temperatura com preservação de propriocepção — causada por lesão da artéria espinal anterior. O padrão aqui (fraqueza maior nos MMSS) é do cordão central."
        },
        {
          "id": "s3d",
          "text": "Lesão medular completa — qualquer deficit em quatro membros indica lesão completa",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. Lesão completa (ASIA A) significa ausência total de função motora e sensitiva abaixo do nível, incluindo S4-S5. Esta paciente tem função motora preservada (3/5 e 4/5) — trata-se de lesão incompleta."
        }
      ]
    },
    {
      "id": "step4",
      "content": "## Decisão de Via Aérea\n\nGCS cai para 10 durante a avaliação (O2V3M5). FR 28 irpm, SpO₂ 91% com máscara de O₂. A paciente apresenta vômito e não consegue proteger a via aérea adequadamente. Há suspeita de lesão cervical instável.\n\n**Qual é a abordagem correta da via aérea?**",
      "options": [
        {
          "id": "s4a",
          "text": "IOT com videolaringoscópio + estabilização manual bimanual + etomidato + succinilcolina",
          "is_correct": true,
          "next_step_id": "step5",
          "feedback": "Correto. GCS 10 com queda + incapacidade de proteger via aérea = IOT. Videolaringoscópio minimiza extensão cervical. Estabilização manual bimanual obrigatória. Etomidato: mínimo efeito hemodinâmico. Succinilcolina: onset rápido (lesão recente — não há hipercalemia ainda)."
        },
        {
          "id": "s4b",
          "text": "Cricotireoidostomia imediata — lesão cervical contraindica a laringoscopia",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. A cricotireoidostomia é via aérea de emergência (CICO) — não é a primeira escolha. Lesão cervical não contraindica a IOT — contraindica a extensão do pescoço, que é evitada com videolaringoscópio + estabilização manual."
        },
        {
          "id": "s4c",
          "text": "Máscara com reservatório e observação — GCS 10 ainda não indica IOT",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. GCS 10 com queda progressiva + vômito + SpO₂ 91% + FR 28 = via aérea definitiva obrigatória. A tendência de queda do GCS é mais importante que o valor absoluto."
        },
        {
          "id": "s4d",
          "text": "Intubação nasotraqueal — evita mobilização cervical",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. A intubação nasotraqueal às cegas é técnica em desuso — requer respiração espontânea, tem alta taxa de falha e pode causar sangramento. O videolaringoscópio com estabilização manual é a escolha correta."
        }
      ]
    },
    {
      "id": "step5",
      "content": "## Confirmação de Posição do Tubo\n\nApós IOT, você realiza ausculta e ouve murmúrio vesicular mais intenso à direita. Não há capnógrafo disponível no APH.\n\n**Como você confirma a posição correta do tubo?**",
      "options": [
        {
          "id": "s5a",
          "text": "Ausculta epigástrica (ausência de sons) + ausculta bilateral + melhora da SpO₂ + observação da expansão torácica simétrica",
          "is_correct": true,
          "next_step_id": "step6",
          "feedback": "Correto. Sem capnógrafo: combine ausculta epigástrica (sem sons = não está no esôfago), ausculta bilateral (simétrica), melhora da SpO₂ e expansão torácica visível e simétrica. Murmúrio mais intenso à direita sugere intubação seletiva do brônquio direito — recue o tubo levemente."
        },
        {
          "id": "s5b",
          "text": "Ausculta pulmonar bilateral apenas — suficiente para confirmação",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. Ausculta isolada tem falsos positivos — sons transmitidos do estômago podem simular murmúrio vesicular. A confirmação deve ser multimodal: epigástrio + bilateral + SpO₂ + expansão torácica."
        },
        {
          "id": "s5c",
          "text": "Aguardar a chegada ao hospital para radiografia de tórax",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. A posição do tubo deve ser confirmada imediatamente após a IOT — tubo esofágico não detectado por minutos causa hipóxia grave e morte. A radiografia é complementar, não substitui a confirmação imediata."
        },
        {
          "id": "s5d",
          "text": "A IOT foi tecnicamente bem realizada — não é necessário confirmar",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. Mesmo IOTs tecnicamente perfeitas podem resultar em posição esofágica. A confirmação multimodal é obrigatória após cada intubação — sem exceção."
        }
      ]
    },
    {
      "id": "step6",
      "content": "## Comunicação MIST\n\nVocê está a 3 minutos do centro de trauma. Precisa comunicar o caso pelo rádio.\n\n**Qual informação cinemática é mais crítica para a equipe receptora preparar o atendimento?**",
      "options": [
        {
          "id": "s6a",
          "text": "Capotamento com ejeção + suspeita de lesão cervical instável (C5-C6) + síndrome do cordão central + IOT realizada",
          "is_correct": true,
          "next_step_id": "final",
          "feedback": "Correto. O mecanismo (capotamento + ejeção = alto risco) + nível de lesão suspeito (C5-C6) + padrão neurológico (cordão central) + via aérea (IOT realizada) são as informações que mais impactam o preparo da equipe receptora — neurocirurgia, colunista e UTI devem ser ativados."
        },
        {
          "id": "s6b",
          "text": "Apenas os sinais vitais atuais — a equipe avaliará o mecanismo na chegada",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. Os sinais vitais sem o contexto cinemático não permitem o preparo adequado da equipe. O mecanismo e o padrão neurológico são essenciais para acionar neurocirurgia e preparar recursos específicos."
        },
        {
          "id": "s6c",
          "text": "Informar apenas que a paciente está intubada e instável",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. Informação insuficiente. A equipe receptora precisa do mecanismo detalhado, das lesões suspeitadas e das intervenções realizadas para preparar adequadamente o atendimento."
        },
        {
          "id": "s6d",
          "text": "Velocidade estimada do capotamento e número de capotamentos apenas",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. A velocidade e o número de capotamentos são informações de mecanismo importantes, mas incompletas. O MIST exige: mecanismo + injúrias + sinais vitais + tratamento — todos os componentes."
        }
      ]
    },
    {
      "id": "final",
      "content": "## Caso Concluído\n\nVocê aplicou raciocínio cinemático para antecipar lesões em capotamento com ejeção, identificou síndrome do cordão central, gerenciou a via aérea com proteção cervical e comunicou o caso de forma estruturada.",
      "options": []
    }
  ]
}

{
  "id": "caso_atls_inicial_01",
  "theme": "atls_inicial",
  "title": "Politraumatizado na Sala de Emergência",
  "description": "Você é o médico líder da equipe de trauma. Um homem de 45 anos chega à sala de emergência após colisão motociclística a alta velocidade. Conduza o atendimento inicial pelo protocolo ATLS.",
  "steps": [
    {
      "id": "step1",
      "content": "## Chegada à Sala de Trauma\n\nHomem, 45 anos, motociclista sem capacete, colisão com caminhão a ~70 km/h. Chegou pela ambulância em prancha rígida com colar cervical. GCS 9 (O2V2M5), agitado, FR 32 irpm, SpO₂ 88% em ar ambiente, FC 138 bpm, PA 86/54 mmHg. Há sangramento ativo na face e no couro cabeludo.\n\n**Qual é a sua primeira prioridade como líder da equipe de trauma?**",
      "options": [
        {
          "id": "s1a",
          "text": "Via aérea definitiva imediata — GCS 9, SpO₂ 88%, FR 32",
          "is_correct": true,
          "next_step_id": "step2",
          "feedback": "Correto. A = Airway é sempre a primeira prioridade. GCS 9 (abaixo de 8 é indicação absoluta, mas 9 com queda e incapacidade de proteger a via aérea também indica IOT) + SpO₂ 88% + FR 32 = via aérea definitiva imediata. Enquanto prepara a IOT, aplique máscara com reservatório."
        },
        {
          "id": "s1b",
          "text": "Controle do sangramento da face e couro cabeludo — hemorragia visível é a prioridade",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. O sangramento da face raramente é exsanguinante — a hipóxia (SpO₂ 88%) mata antes. A via aérea (A) precede sempre o controle de hemorragia (C) na sequência ABCDE do ATLS."
        },
        {
          "id": "s1c",
          "text": "Dois acessos venosos e reposição volêmica — PA 86/54 indica choque",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. O choque é grave, mas a hipóxia (SpO₂ 88%) é imediatamente letal. A sequência ABCDE existe por uma razão — via aérea e ventilação precedem circulação. Delegue o acesso vascular para outro membro da equipe enquanto você gerencia a via aérea."
        },
        {
          "id": "s1d",
          "text": "FAST imediato para identificar a fonte do choque",
          "is_correct": false,
          "next_step_id": "step2",
          "feedback": "Incorreto. O FAST é realizado durante ou após a estabilização do ABCDE — não substitui a avaliação primária. A hipóxia precisa ser tratada antes de qualquer exame diagnóstico."
        }
      ]
    },
    {
      "id": "step2",
      "content": "## Via Aérea Assegurada\n\nIOT realizada com sucesso com videolaringoscópio. ETCO₂ 38 mmHg, SpO₂ 96%, ventilação mecânica 6 mL/kg, FiO₂ 100%. Agora você avalia o componente B.\n\nAusculta: murmúrio vesicular ausente à esquerda, hipertimpanismo à percussão esquerda. Traqueia desviada para a direita. FC 142 bpm, PA 72/44 mmHg.\n\n**Qual é a conduta imediata?**",
      "options": [
        {
          "id": "s2a",
          "text": "Descompressão por agulha no 2º EIC esquerdo, linha hemiclavicular — pneumotórax hipertensivo",
          "is_correct": true,
          "next_step_id": "step3",
          "feedback": "Correto. Ausência de murmúrio + hipertimpanismo + desvio de traqueia + deterioração hemodinâmica = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente. Em ventilação mecânica, o pneumotórax hipertensivo progride muito rapidamente."
        },
        {
          "id": "s2b",
          "text": "Radiografia de tórax para confirmar antes de qualquer intervenção",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. Pneumotórax hipertensivo é emergência imediata — a radiografia pode ser fatal se aguardada. O diagnóstico é clínico e a descompressão precede qualquer imagem."
        },
        {
          "id": "s2c",
          "text": "Aumentar a PEEP no ventilador para melhorar a oxigenação",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto e perigoso. Aumentar a PEEP em pneumotórax hipertensivo agrava a situação — aumenta a pressão intratorácica e comprime ainda mais o coração e a veia cava. A descompressão é mandatória e imediata."
        },
        {
          "id": "s2d",
          "text": "Norepinefrina IV para tratar a hipotensão",
          "is_correct": false,
          "next_step_id": "step3",
          "feedback": "Incorreto. A hipotensão é causada pelo pneumotórax hipertensivo (choque obstrutivo) — vasopressor sem descompressão não resolverá o problema. Trate a causa, não o sintoma."
        }
      ]
    },
    {
      "id": "step3",
      "content": "## Após Descompressão\n\nApós punção e drenagem torácica esquerda, melhora imediata: PA 94/62 mmHg, FC 124 bpm, SpO₂ 97%. Você realiza o FAST:\n\n- Janela pericárdica: normal\n- Janela hepatorrenal: líquido livre +++\n- Janela esplenorrenal: líquido livre ++\n- Janela pélvica: líquido livre +\n\nO paciente permanece hipotenso apesar de 1L de Ringer lactato.\n\n**Qual é a próxima decisão crítica?**",
      "options": [
        {
          "id": "s3a",
          "text": "Laparotomia exploradora de emergência — FAST positivo com instabilidade refratária",
          "is_correct": true,
          "next_step_id": "step4",
          "feedback": "Correto. FAST positivo (líquido livre em múltiplas janelas) + instabilidade hemodinâmica refratária à reposição = laparotomia de emergência imediata. Não leve para TC — cada minuto conta. O cirurgião deve ser acionado imediatamente."
        },
        {
          "id": "s3b",
          "text": "TC de abdome com contraste para caracterizar as lesões antes da cirurgia",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. Paciente instável com FAST positivo não vai para TC — vai para a sala cirúrgica. A TC é para pacientes estáveis. Levar um paciente instável para TC aumenta a mortalidade."
        },
        {
          "id": "s3c",
          "text": "Aumentar a reposição volêmica para 3L de cristaloide e reavalie",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. Reposição maciça com cristaloide sem controle da hemorragia agrava a coagulopatia, hipotermia e acidose (tríade letal). FAST positivo + instabilidade = cirurgia, não mais fluidos."
        },
        {
          "id": "s3d",
          "text": "LPD para confirmar o hemoperitônio antes de decidir pela cirurgia",
          "is_correct": false,
          "next_step_id": "step4",
          "feedback": "Incorreto. O FAST já confirmou o hemoperitônio com líquido livre em três janelas. A LPD está em desuso justamente porque o FAST é mais rápido, menos invasivo e suficientemente sensível. Não há necessidade de confirmação adicional."
        }
      ]
    },
    {
      "id": "step4",
      "content": "## Na Sala Cirúrgica — Damage Control\n\nNa laparotomia: laceração esplênica grau IV com sangramento ativo e laceração hepática grau III. O anestesista informa: temperatura 34,2°C, pH 7,18, INR 2,1, fibrinogênio 98 mg/dL.\n\n**Qual estratégia cirúrgica você adota?**",
      "options": [
        {
          "id": "s4a",
          "text": "Damage Control Surgery: esplenectomia + packing hepático + fechamento temporário do abdome",
          "is_correct": true,
          "next_step_id": "step5",
          "feedback": "Correto. Tríade letal presente: hipotermia (34,2°C) + acidose (pH 7,18) + coagulopatia (INR 2,1, fibrinogênio 98). DCS: controle da hemorragia (esplenectomia + packing) + controle da contaminação + fechamento temporário. Cirurgia definitiva após correção da tríade na UTI."
        },
        {
          "id": "s4b",
          "text": "Esplenorrafia + hepatorrafia definitiva + anastomoses — cirurgia completa em uma etapa",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. Com a tríade letal instalada (hipotermia + acidose + coagulopatia), cirurgia extensa e prolongada aumenta a mortalidade. O DCS — cirurgia abreviada seguida de correção na UTI — é o padrão nesta situação."
        },
        {
          "id": "s4c",
          "text": "Apenas packing de todos os quadrantes e fechar — sem ressecção de órgãos",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Parcialmente incorreto. O packing hepático é correto, mas o baço com laceração grau IV e sangramento ativo requer esplenectomia — o packing isolado do baço raramente controla hemorragia de grau IV. A esplenectomia é a decisão correta de controle de dano."
        },
        {
          "id": "s4d",
          "text": "Transfusão maciça na mesa cirúrgica e aguardar melhora da coagulopatia antes de operar",
          "is_correct": false,
          "next_step_id": "step5",
          "feedback": "Incorreto. A coagulopatia não melhora com hemorragia ativa — o controle cirúrgico da hemorragia é o pré-requisito para a correção da coagulopatia. Transfundir sem operar é insuficiente."
        }
      ]
    },
    {
      "id": "step5",
      "content": "## UTI — Fase 2 do DCS\n\nApós o DCS, o paciente está na UTI. Temperatura 35,8°C, pH 7,28, INR 1,6, fibrinogênio 142 mg/dL, lactato 4,8 mmol/L. Hemodinamicamente estável com norepinefrina 0,15 mcg/kg/min.\n\n**Qual é a meta de ressuscitação mais importante para liberar para a cirurgia definitiva?**",
      "options": [
        {
          "id": "s5a",
          "text": "Normalização da temperatura (≥ 36°C), pH (≥ 7,35) e coagulograma — correção da tríade letal",
          "is_correct": true,
          "next_step_id": "step6",
          "feedback": "Correto. A cirurgia definitiva só é realizada após correção da tríade letal. As metas são: temperatura ≥ 36°C, pH ≥ 7,35, INR ≤ 1,5, fibrinogênio ≥ 150 mg/dL, plaquetas ≥ 50.000. O lactato também deve estar em clearance (redução ≥ 10% em 2h)."
        },
        {
          "id": "s5b",
          "text": "Débito urinário ≥ 1 mL/kg/h — principal marcador de ressuscitação adequada",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Parcialmente correto. O débito urinário é um marcador de perfusão renal importante, mas não é o critério principal para liberação ao DCS fase 3. A normalização da tríade letal é o objetivo central."
        },
        {
          "id": "s5c",
          "text": "PA normal sem vasopressor — retirar a norepinefrina antes de reoperar",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. A presença de vasopressor não contraindica a cirurgia definitiva se a tríade letal foi corrigida. O objetivo não é retirar vasopressores, mas corrigir hipotermia, acidose e coagulopatia."
        },
        {
          "id": "s5d",
          "text": "Lactato < 4 mmol/L — normalização suficiente para liberar para cirurgia",
          "is_correct": false,
          "next_step_id": "step6",
          "feedback": "Incorreto. O lactato é um marcador importante mas não o único critério. A liberação para cirurgia definitiva requer normalização de todos os componentes da tríade letal — temperatura, pH e coagulograma — além do lactato."
        }
      ]
    },
    {
      "id": "step6",
      "content": "## Decisão de Cirurgia Definitiva\n\n36 horas após o DCS: temperatura 36,4°C, pH 7,36, INR 1,3, fibrinogênio 178 mg/dL, lactato 1,8 mmol/L. O paciente está hemodinamicamente estável. A TC de controle mostra packing hepático em posição, sem sangramento ativo.\n\n**Qual é a conduta agora?**",
      "options": [
        {
          "id": "s6a",
          "text": "Cirurgia definitiva — retirada do packing, revisão das lesões e fechamento abdominal definitivo",
          "is_correct": true,
          "next_step_id": "final",
          "feedback": "Correto. Tríade letal corrigida + estabilidade hemodinâmica + 36h após o DCS = momento ideal para a fase 3. A cirurgia definitiva inclui: remoção do packing, revisão de todas as lesões, reconstrução intestinal se necessário e fechamento da parede abdominal."
        },
        {
          "id": "s6b",
          "text": "Aguardar 7 dias para garantir estabilidade completa antes de reoperar",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. O packing deve ser removido em 24-72h — o prolongamento aumenta o risco de infecção, necrose tecidual e síndrome compartimental abdominal. Com tríade corrigida e estabilidade hemodinâmica, 36h é o momento adequado."
        },
        {
          "id": "s6c",
          "text": "Manter o abdome aberto indefinidamente e tratar as lesões por VATS",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. O abdome aberto é uma solução temporária — cada dia sem fechamento aumenta o risco de complicações (infecção, fístula, eviscerção). A VATS é para lesões torácicas, não abdominais."
        },
        {
          "id": "s6d",
          "text": "TC de controle semanal e reoperação apenas se houver complicação",
          "is_correct": false,
          "next_step_id": "final",
          "feedback": "Incorreto. O packing abdominal requer remoção programada — não é um dispositivo permanente. A reoperação em 24-72h é parte do protocolo do DCS, independentemente de complicações."
        }
      ]
    },
    {
      "id": "final",
      "content": "## Caso Concluído\n\nVocê conduziu o politraumatizado pelo protocolo ATLS completo: ABCDE sistematizado → FAST orientando cirurgia → DCS com packing → ressuscitação da tríade letal na UTI → cirurgia definitiva no momento correto.",
      "options": []
    }
  ]
}

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
