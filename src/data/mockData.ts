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
    explanation: 'O protocolo ATLS segue a sequência ABCDE. O "A" corresponde a Airway com proteção cervical, sendo a primeira prioridade absoluta.',
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
    explanation: 'O choque classe III corresponde à perda de 30 a 40% do volume sanguíneo (1500-2000 mL). Cursa com taquicardia, hipotensão, taquipneia e confusão mental.',
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
    explanation: 'O jaw thrust abre a via aérea sem movimentar a coluna cervical, ao contrário da hiperextensão que está contraindicada no trauma.',
    theme: 'atls_via_aerea',
    difficulty: 'facil',
    created_at: new Date().toISOString(),
  },
  {
    id: 'q4',
    statement: 'Paciente que abre os olhos ao estímulo doloroso, emite sons incompreensíveis e apresenta resposta motora de retirada — qual é o GCS?',
    alternatives: [
      { key: 'A', text: '7' },
      { key: 'B', text: '8' },
      { key: 'C', text: '9' },
      { key: 'D', text: '10' },
      { key: 'E', text: '6' },
    ],
    correct_key: 'B',
    explanation: 'O2 + V2 + M4 = 8. Olhos ao estímulo doloroso = 2, sons incompreensíveis = 2, retirada = 4.',
    theme: 'atls_cranioencefalico',
    difficulty: 'medio',
    created_at: new Date().toISOString(),
  },
  {
    id: 'q5',
    statement: 'O curativo de três pontas em ferimento aberto no tórax é indicado porque:',
    alternatives: [
      { key: 'A', text: 'Impede totalmente a entrada de ar na cavidade pleural' },
      { key: 'B', text: 'Funciona como válvula unidirecional, permitindo saída de ar mas não sua entrada' },
      { key: 'C', text: 'É o único curativo aplicável em campo de batalha' },
      { key: 'D', text: 'Trata definitivamente o pneumotórax hipertensivo' },
      { key: 'E', text: 'Substitui completamente a drenagem intercostal' },
    ],
    correct_key: 'B',
    explanation: 'O curativo de três pontas funciona como válvula unidirecional: fecha na inspiração (impede entrada de ar) e abre na expiração (permite saída). É medida temporária.',
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
    front: 'Quais são as 4 classes do choque hemorrágico e suas perdas?',
    back: 'Classe I: ≤15% (≤750 mL)\nClasse II: 15-30% (750-1500 mL)\nClasse III: 30-40% (1500-2000 mL)\nClasse IV: >40% (>2000 mL)',
    theme: 'atls_choque',
    created_at: new Date().toISOString(),
  },
  {
    id: 'f3',
    front: 'Defina a Tríade da Morte no trauma',
    back: 'Hipotermia + Coagulopatia + Acidose\nSão três condições que se retroalimentam no politraumatizado grave.',
    theme: 'atls_choque',
    created_at: new Date().toISOString(),
  },
  {
    id: 'f4',
    front: 'Quais são os sinais clínicos do pneumotórax hipertensivo?',
    back: '• Dispneia grave e progressiva\n• Hipotensão\n• Distensão das veias do pescoço\n• Desvio de traqueia (sinal tardio)\n• Ausência de murmúrio vesicular ipsilateral\nTratamento: descompressão por agulha no 2º EIC.',
    theme: 'atls_toracico',
    created_at: new Date().toISOString(),
  },
]

export const MOCK_CASES: any[] = [
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
          { id: 'o1a', text: 'Correr até o paciente e iniciar avaliação primária imediatamente', next_step_id: 's1_wrong', feedback: 'Incorreto. A segurança da cena é a prioridade absoluta.', is_correct: false },
          { id: 'o1b', text: 'Avaliar a segurança da cena antes de se aproximar', next_step_id: 's2', feedback: 'Correto! Segurança da cena sempre em primeiro lugar.', is_correct: true },
          { id: 'o1c', text: 'Chamar a polícia e aguardar liberação', next_step_id: 's1_wrong', feedback: 'Parcialmente correto chamar apoio, mas avalie a segurança e aja se possível.', is_correct: false },
        ]
      },
      {
        id: 's2',
        content: 'Cena segura. O paciente não responde ao chamado verbal. Próxima prioridade?',
        options: [
          { id: 'o2a', text: 'Verificar pulso carotídeo', next_step_id: 's2_wrong', feedback: 'A via aérea tem prioridade sobre a circulação no ABCDE.', is_correct: false },
          { id: 'o2b', text: 'Iniciar compressões torácicas (RCP)', next_step_id: 's2_wrong', feedback: 'Ainda não. Avalie a via aérea e respiração primeiro.', is_correct: false },
          { id: 'o2c', text: 'Avaliar via aérea com proteção da coluna cervical', next_step_id: 's3', feedback: 'Correto! A = Airway. Estabilize o colo cervical manualmente.', is_correct: true },
        ]
      },
      {
        id: 's3',
        content: 'Via aérea aberta com jaw thrust. Paciente respira, FR=24/min, SpO2=88%. O que fazer?',
        options: [
          { id: 'o3a', text: 'Administrar O2 por máscara com reservatório em alto fluxo (10-15 L/min)', next_step_id: 's4', feedback: 'Correto! SpO2 <94% exige O2 em alta concentração.', is_correct: true },
          { id: 'o3b', text: 'Intubação orotraqueal imediata', next_step_id: 's3_wrong', feedback: 'Não é a primeira medida. Tente O2 suplementar primeiro.', is_correct: false },
          { id: 'o3c', text: 'Manter observação — SpO2 >85% é aceitável no trauma', next_step_id: 's3_wrong', feedback: 'Incorreto. A meta é SpO2 ≥94%.', is_correct: false },
        ]
      },
      {
        id: 's4',
        content: 'PA=90/60, FC=118, TEC=3s, pele fria. Laceração profunda na coxa. Próximo passo?',
        options: [
          { id: 'o4a', text: 'Elevar os membros inferiores e aguardar melhora espontânea', next_step_id: 's4_wrong', feedback: 'Trendelenburg tem benefício limitado. Controle a causa do choque.', is_correct: false },
          { id: 'o4b', text: 'Iniciar reposição volêmica e aguardar hospital para hemostasia', next_step_id: 's4_wrong', feedback: 'O controle da hemorragia deve ser imediato na cena.', is_correct: false },
          { id: 'o4c', text: 'Compressão direta + torniquete na coxa e acesso venoso', next_step_id: 'final', feedback: 'Correto! Controle da hemorragia é prioridade em C. Dois acessos 16G + 1L SF aquecido.', is_correct: true },
        ]
      },
      {
        id: 'final',
        content: 'Parabéns! Você conduziu corretamente o atendimento pré-hospitalar, seguindo o ABCDE e priorizando as ameaças à vida na ordem correta.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 2 — Avaliação da Cena ─────────────────────────────────────────────
  // Respostas corretas: B, A, D, A, C, B  (distribuição: A×2 B×2 C×1 D×1)
  {
    id: 'caso_avaliacao_cena_01',
    theme: 'avaliacao_cena',
    title: 'Colisão na Rodovia',
    description: 'Você é o primeiro socorrista a chegar a uma colisão frontal entre dois veículos. Uma vítima está presa com sinais de trauma grave.',
    steps: [
      {
        id: 'step1',
        content: '## Chegada à Cena\n\nDois veículos com danos frontais severos. Motor em chamas, combustível no asfalto. Vítima presa nas ferragens, consciente, gritando de dor.\n\n**Qual é sua primeira ação?**',
        options: [
          { id: 's1a', text: 'Iniciar triagem START imediatamente em todas as vítimas', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A triagem START só é iniciada após controle da segurança da cena.' },
          { id: 's1b', text: 'Avaliar a segurança da cena, acionar bombeiros e aguardar controle do fogo', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Segurança é a primeira prioridade absoluta. Fogo + combustível = risco de explosão.' },
          { id: 's1c', text: 'Aproximar-se imediatamente para iniciar o atendimento', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Cena insegura transforma socorristas em vítimas.' },
          { id: 's1d', text: 'Pedir para a vítima sair sozinha do veículo', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A vítima está presa — é impossível sair sozinha.' },
        ]
      },
      {
        id: 'step2',
        content: '## Avaliação da Vítima\n\nHomem, 38 anos, GCS 13. FC 128, FR 28, SpO₂ 91%, PA 88/60. Sangramento ativo volumoso na coxa direita com deformidade evidente.\n\n**Qual é sua prioridade imediata?**',
        options: [
          { id: 's2a', text: 'Aplicar torniquete na coxa direita imediatamente', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Hemorragia maciça de membro é prioridade no MARCH/ABCDE. Torniquete 5-7 cm proximal, apertar até cessar, anotar horário.' },
          { id: 's2b', text: 'Obter dois acessos venosos e iniciar reposição volêmica', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Reposição sem controle da hemorragia é ineficaz.' },
          { id: 's2c', text: 'Imobilizar a fratura de fêmur com tala', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Imobilização é secundária ao controle da hemorragia ativa.' },
          { id: 's2d', text: 'Administrar oxigênio suplementar pela SpO₂ baixa', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. SpO₂ baixa é consequência do choque — controle o sangramento primeiro.' },
        ]
      },
      {
        id: 'step3',
        content: '## Após Torniquete\n\nSangramento cessou. Horário: 14h32. SpO₂ 94% com O₂. FC 118, PA 92/64. Desvio de traqueia para a esquerda e ausência de murmúrio vesicular à direita.\n\n**O que você faz?**',
        options: [
          { id: 's3a', text: 'Solicitar radiografia de tórax para confirmar o pneumotórax', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Pneumotórax hipertensivo é diagnóstico clínico — aguardar imagem pode ser fatal.' },
          { id: 's3b', text: 'Realizar curativo de três pontas na parede torácica direita', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Curativo de três pontas é para pneumotórax aberto, não hipertensivo fechado.' },
          { id: 's3c', text: 'Aumentar o fluxo de O₂ e monitorizar', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. A causa é mecânica — aumentar O₂ não resolve.' },
          { id: 's3d', text: 'Descompressão por agulha no 2º EIC direito, linha hemiclavicular', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Desvio de traqueia + ausência de murmúrio = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente.' },
        ]
      },
      {
        id: 'step4',
        content: '## Após Descompressão\n\nSaída de ar confirmada. SpO₂ 97%, FC 108, PA 98/68, GCS 14. Dois acessos 16G. Desencarceramento em 15 minutos.\n\n**Qual meta de PA você adota na reposição?**',
        options: [
          { id: 's4a', text: 'PAS 80-90 mmHg — hipotensão permissiva até hemostasia definitiva', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Trauma contuso sem TCE: hipotensão permissiva reduz ressangramento e evita hiper-hidratação.' },
          { id: 's4b', text: 'PAS 60 mmHg — quanto mais baixa, menor o sangramento', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. PAS < 80 mmHg causa isquemia orgânica grave.' },
          { id: 's4c', text: 'PAS ≥ 110 mmHg — TCE exige pressão mais elevada', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Não há TCE neste caso. Sem TCE, a meta é hipotensão permissiva.' },
          { id: 's4d', text: 'PAS 120 mmHg — normalizar a pressão o mais rápido possível', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Normalizar antes da hemostasia definitiva aumenta o ressangramento.' },
        ]
      },
      {
        id: 'step5',
        content: '## Decisão de Transporte\n\nVítima imobilizada. GCS 14, FC 102, PA 86/58, SpO₂ 96%. Hospital Municipal (8 km, sem cirurgião vascular) vs Centro de Trauma Regional (32 km, nível I).\n\n**Para onde você transporta?**',
        options: [
          { id: 's5a', text: 'Hospital Municipal — mais próximo, estabilize e transfira depois', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Desvio para hospital inadequado aumenta mortalidade.' },
          { id: 's5b', text: 'Aguardar estabilização completa na cena', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Tempo na cena < 10 min em trauma grave.' },
          { id: 's5c', text: 'Centro de Trauma Regional (32 km) — paciente necessita de recursos de nível I', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Critérios de centralização presentes. Destino = centro mais adequado, não o mais próximo.' },
          { id: 's5d', text: 'Hospital Municipal para TC antes de definir destino', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. TC em hospital inadequado atrasa o tratamento definitivo.' },
        ]
      },
      {
        id: 'step6',
        content: '## Passagem de Caso — MIST\n\nChegada ao Centro de Trauma. 60 segundos para passar o caso.\n\n**Qual passagem está correta?**',
        options: [
          { id: 's6a', text: '"Politraumatizado grave, instável, precisa de cirurgia urgente."', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Sem informação estruturada — MIST não foi aplicado.' },
          { id: 's6b', text: '"Homem, 38 anos, colisão frontal ~80 km/h. Fratura de fêmur — torniquete às 14h32 (28 min). Pneumotórax hipertensivo direito — descomprimido. GCS 14, FC 102, PA 86/58, SpO₂ 96%. 500 mL SF."', is_correct: true, next_step_id: 'final', feedback: 'Correto. MIST completo: Mecanismo + Injúrias + Sinais vitais + Tratamento. Tempo de torniquete é crítico.' },
          { id: 's6c', text: '"Paciente em acidente, fratura na perna e problema no pulmão. Pressão baixa."', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Passagem vaga — omite horário do torniquete, sinais vitais e tratamentos.' },
          { id: 's6d', text: '"Homem, acidente. Torniquete na perna. Descompressão feita. Pressão 86/58."', is_correct: false, next_step_id: 'final', feedback: 'Incompleto. Faltam mecanismo, GCS, SpO₂ e tempo de isquemia do torniquete.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê conduziu o atendimento de forma sistematizada: segurança → hemorragia → pneumotórax → reposição guiada → transporte adequado → passagem MIST.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 3 — Cinemática do Trauma ──────────────────────────────────────────
  // Respostas corretas: A, D, A, C, B, D  (distribuição: A×2 B×1 C×1 D×2)
  {
    id: 'caso_cinetica_trauma_01',
    theme: 'cinetica_trauma',
    title: 'Capotamento em Estrada Rural',
    description: 'Capotamento com ejeção em estrada rural. Aplique o raciocínio cinemático para antecipar lesões e tomar decisões clínicas.',
    steps: [
      {
        id: 'step1',
        content: '## Análise da Cena\n\nVeículo capotado três vezes, teto deformado. Motorista a 8 metros do veículo, sem cinto. Mulher, 26 anos, consciente mas confusa, GCS 12.\n\n**Com base na cinemática, quais lesões antecipar?**',
        options: [
          { id: 's1a', text: 'TCE, lesão cervical multidirecional, trauma torácico e abdominal — capotamento com ejeção', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Ejeção aumenta mortalidade 6x. Espere TCE, lesão cervical, trauma torácico e abdominal por múltiplos impactos.' },
          { id: 's1b', text: 'Apenas fratura de membros — amorteceu a queda com os braços', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Ejeção é mecanismo de altíssimo risco — lesões múltiplas e imprevisíveis.' },
          { id: 's1c', text: 'Sem lesões graves — vítima consciente e sem sangramento visível', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Mecanismo de alto risco exige rastreamento agressivo independentemente da apresentação.' },
          { id: 's1d', text: 'Trauma abdominal isolado — impacto principal no abdome', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Em capotamento com ejeção não se assume um único ponto de impacto.' },
        ]
      },
      {
        id: 'step2',
        content: '## Avaliação Primária\n\nGCS 12, PA 102/70, FC 114, FR 22, SpO₂ 95%. Equimose no flanco esquerdo, dor em hipocôndrio esquerdo, abdome levemente distendido.\n\n**O que a equimose no flanco esquerdo sugere?**',
        options: [
          { id: 's2a', text: 'Fratura de costelas inferiores esquerdas isolada', is_correct: false, next_step_id: 'step3', feedback: 'Parcialmente incorreto. A principal preocupação é a lesão esplênica subjacente.' },
          { id: 's2b', text: 'Sinal de Grey-Turner — hemorragia retroperitoneal tardia', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grey-Turner aparece em horas a dias. Equimose imediata indica trauma direto.' },
          { id: 's2c', text: 'Contusão muscular da parede abdominal — sem significado maior', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Em mecanismo de alta energia, equimose de flanco é lesão esplênica até exclusão por imagem.' },
          { id: 's2d', text: 'Lesão esplênica — baço é o órgão mais frequentemente lesado no trauma contuso', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Equimose flanco esquerdo + dor hipocôndrio esquerdo + mecanismo = lesão esplênica até prova em contrário.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação Cervical\n\nLog-roll: dor e crepitação em C5-C6. Formigamento nos quatro membros. Força MMSS 3/5 bilateral, MMII 4/5.\n\n**Qual síndrome medular você suspeita?**',
        options: [
          { id: 's3a', text: 'Síndrome do cordão central — fraqueza maior nos MMSS que MMII', is_correct: true, next_step_id: 'step4', feedback: 'Correto. MMSS 3/5 vs MMII 4/5 + trauma cervical por capotamento = cordão central. Fibras para MMSS são mais centrais.' },
          { id: 's3b', text: 'Lesão medular completa — qualquer deficit em quatro membros', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Lesão completa = ausência total de função incluindo S4-S5. Esta paciente tem função preservada.' },
          { id: 's3c', text: 'Síndrome de Brown-Séquard — deficit motor de um lado e sensitivo do outro', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Brown-Séquard causa deficit unilateral — aqui há deficit bilateral.' },
          { id: 's3d', text: 'Síndrome do cordão anterior — perda motora com propriocepção preservada', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Cordão anterior: perda motora + perda de dor/temperatura com propriocepção preservada.' },
        ]
      },
      {
        id: 'step4',
        content: '## Decisão de Via Aérea\n\nGCS cai para 10. FR 28, SpO₂ 91%. Vômito — não protege via aérea. Suspeita de lesão cervical instável.\n\n**Abordagem correta?**',
        options: [
          { id: 's4a', text: 'Máscara com reservatório — GCS 10 ainda não indica IOT', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. GCS 10 em queda + vômito + SpO₂ 91% = via aérea definitiva obrigatória.' },
          { id: 's4b', text: 'Intubação nasotraqueal — evita mobilização cervical', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Nasotraqueal às cegas está em desuso e pode causar sangramento.' },
          { id: 's4c', text: 'IOT com videolaringoscópio + estabilização manual bimanual + etomidato + succinilcolina', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Videolaringoscópio minimiza extensão cervical. Estabilização bimanual obrigatória. Etomidato: mínimo efeito hemodinâmico.' },
          { id: 's4d', text: 'Cricotireoidostomia imediata — lesão cervical contraindica laringoscopia', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Lesão cervical não contraindica IOT — contraindica extensão, evitada com videolaringoscópio.' },
        ]
      },
      {
        id: 'step5',
        content: '## Confirmação do Tubo\n\nApós IOT, murmúrio mais intenso à direita. Sem capnógrafo disponível.\n\n**Como confirmar a posição?**',
        options: [
          { id: 's5a', text: 'IOT foi bem realizada — não é necessário confirmar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Mesmo IOTs perfeitas podem resultar em posição esofágica. Confirmação é obrigatória.' },
          { id: 's5b', text: 'Ausculta epigástrica (ausência) + bilateral + melhora SpO₂ + expansão torácica simétrica', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Confirmação multimodal sem capnógrafo. Murmúrio mais intenso à direita = intubação seletiva — recue o tubo.' },
          { id: 's5c', text: 'Ausculta pulmonar bilateral apenas', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Ausculta isolada tem falsos positivos. Confirmação deve ser multimodal.' },
          { id: 's5d', text: 'Aguardar radiografia de tórax no hospital', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Tubo esofágico não detectado causa morte em minutos.' },
        ]
      },
      {
        id: 'step6',
        content: '## Comunicação MIST\n\nA 3 minutos do centro de trauma. Comunicação pelo rádio.\n\n**Qual informação cinemática é mais crítica para a equipe receptora?**',
        options: [
          { id: 's6a', text: 'Velocidade estimada e número de capotamentos apenas', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Informação de mecanismo incompleta — MIST exige todos os componentes.' },
          { id: 's6b', text: 'Informar apenas que está intubada e instável', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Informação insuficiente para preparo da equipe.' },
          { id: 's6c', text: 'Apenas os sinais vitais atuais', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Sinais vitais sem contexto cinemático não permitem preparo adequado.' },
          { id: 's6d', text: 'Capotamento com ejeção + suspeita C5-C6 + síndrome do cordão central + IOT realizada', is_correct: true, next_step_id: 'final', feedback: 'Correto. Mecanismo + nível neurológico + padrão de lesão + via aérea = neurocirurgia, colunista e UTI ativados.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê aplicou raciocínio cinemático, identificou síndrome do cordão central, gerenciou via aérea com proteção cervical e comunicou o caso estruturadamente.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 4 — ATLS Inicial ──────────────────────────────────────────────────
  // Respostas corretas: C, A, D, B, C, A  (distribuição: A×2 B×1 C×2 D×1)
  {
    id: 'caso_atls_inicial_01',
    theme: 'atls_inicial',
    title: 'Politraumatizado na Sala de Emergência',
    description: 'Você lidera a equipe de trauma. Homem de 45 anos chega após colisão motociclística a alta velocidade. Conduza pelo protocolo ATLS.',
    steps: [
      {
        id: 'step1',
        content: '## Chegada à Sala de Trauma\n\nHomem, 45 anos, motociclista sem capacete, colisão com caminhão ~70 km/h. GCS 9 (O2V2M5), FR 32, SpO₂ 88%, FC 138, PA 86/54. Sangramento ativo na face e couro cabeludo.\n\n**Primeira prioridade como líder?**',
        options: [
          { id: 's1a', text: 'Dois acessos venosos e reposição — PA 86/54 indica choque', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Hipóxia é imediatamente letal. Delegue o acesso vascular para outro membro da equipe.' },
          { id: 's1b', text: 'FAST imediato para identificar a fonte do choque', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. FAST é realizado durante/após o ABCDE. Trate a hipóxia primeiro.' },
          { id: 's1c', text: 'Via aérea definitiva imediata — GCS 9, SpO₂ 88%, FR 32', is_correct: true, next_step_id: 'step2', feedback: 'Correto. A = Airway é sempre a primeira prioridade. GCS 9 com queda + SpO₂ 88% = IOT imediata.' },
          { id: 's1d', text: 'Controle do sangramento da face — hemorragia visível é a prioridade', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Sangramento facial raramente é exsanguinante — hipóxia mata primeiro.' },
        ]
      },
      {
        id: 'step2',
        content: '## Via Aérea Assegurada\n\nIOT com videolaringoscópio. ETCO₂ 38, SpO₂ 96%, VM 6 mL/kg.\n\nAusculta: murmúrio ausente à esquerda, hipertimpanismo esquerdo. Traqueia desviada à direita. FC 142, PA 72/44.\n\n**Conduta imediata?**',
        options: [
          { id: 's2a', text: 'Descompressão por agulha no 2º EIC esquerdo, linha hemiclavicular', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Ausência MV + hipertimpanismo + desvio traqueal = pneumotórax hipertensivo. Descomprima imediatamente — diagnóstico clínico.' },
          { id: 's2b', text: 'Radiografia de tórax para confirmar antes de intervir', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Aguardar imagem pode ser fatal. O diagnóstico é clínico.' },
          { id: 's2c', text: 'Norepinefrina IV para tratar a hipotensão', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A hipotensão é por choque obstrutivo — vasopressor sem descompressão não resolve.' },
          { id: 's2d', text: 'Aumentar PEEP no ventilador para melhorar oxigenação', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto e perigoso. PEEP elevada em pneumotórax hipertensivo agrava a compressão cardíaca.' },
        ]
      },
      {
        id: 'step3',
        content: '## Após Descompressão\n\nPA 94/62, FC 124, SpO₂ 97%. FAST: pericárdio normal, Morrison +++, esplenorrenal ++, pélvica +. Persiste hipotenso após 1L de Ringer.\n\n**Próxima decisão?**',
        options: [
          { id: 's3a', text: 'TC de abdome com contraste para caracterizar as lesões', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Paciente instável com FAST positivo vai para sala cirúrgica, não para TC.' },
          { id: 's3b', text: 'LPD para confirmar hemoperitônio', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. FAST já confirmou. LPD está em desuso.' },
          { id: 's3c', text: 'Aumentar reposição para 3L de cristaloide e reavalie', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Cristaloide em excesso agrava a tríade letal.' },
          { id: 's3d', text: 'Laparotomia exploradora de emergência — FAST positivo com instabilidade refratária', is_correct: true, next_step_id: 'step4', feedback: 'Correto. FAST positivo + instabilidade refratária = laparotomia imediata. Não leve para TC.' },
        ]
      },
      {
        id: 'step4',
        content: '## Sala Cirúrgica — Damage Control\n\nLaceração esplênica grau IV + hepática grau III. Temperatura 34,2°C, pH 7,18, INR 2,1, fibrinogênio 98 mg/dL.\n\n**Estratégia cirúrgica?**',
        options: [
          { id: 's4a', text: 'Transfusão maciça e aguardar melhora da coagulopatia antes de operar', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Coagulopatia não melhora com hemorragia ativa — controle cirúrgico é pré-requisito.' },
          { id: 's4b', text: 'Damage Control: esplenectomia + packing hepático + fechamento temporário', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Tríade letal presente. DCS: controle da hemorragia + fechamento temporário → UTI → cirurgia definitiva.' },
          { id: 's4c', text: 'Apenas packing de todos os quadrantes sem ressecção', is_correct: false, next_step_id: 'step5', feedback: 'Parcialmente incorreto. Baço grau IV requer esplenectomia — packing isolado raramente controla.' },
          { id: 's4d', text: 'Esplenorrafia + hepatorrafia definitiva em uma etapa', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Com tríade letal instalada, cirurgia extensa aumenta a mortalidade.' },
        ]
      },
      {
        id: 'step5',
        content: '## UTI — Fase 2 do DCS\n\nTemperatura 35,8°C, pH 7,28, INR 1,6, fibrinogênio 142, lactato 4,8. Estável com norepinefrina.\n\n**Meta mais importante para liberar à cirurgia definitiva?**',
        options: [
          { id: 's5a', text: 'PA normal sem vasopressor antes de reoperar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Vasopressor não contraindica cirurgia se tríade letal corrigida.' },
          { id: 's5b', text: 'Lactato < 4 mmol/L — normalização suficiente', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Lactato é marcador importante mas não o único critério.' },
          { id: 's5c', text: 'Normalização da temperatura (≥36°C), pH (≥7,35) e coagulograma — correção da tríade letal', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Cirurgia definitiva só após correção completa da tríade. Metas: T ≥ 36°C, pH ≥ 7,35, INR ≤ 1,5, fibrinogênio ≥ 150.' },
          { id: 's5d', text: 'Débito urinário ≥ 1 mL/kg/h apenas', is_correct: false, next_step_id: 'step6', feedback: 'Parcialmente correto. Débito urinário é marcador de perfusão mas não o critério principal.' },
        ]
      },
      {
        id: 'step6',
        content: '## Cirurgia Definitiva\n\n36h após DCS: temperatura 36,4°C, pH 7,36, INR 1,3, fibrinogênio 178, lactato 1,8. Estável. TC: packing em posição, sem sangramento.\n\n**Conduta?**',
        options: [
          { id: 's6a', text: 'Cirurgia definitiva — retirada do packing, revisão e fechamento abdominal definitivo', is_correct: true, next_step_id: 'final', feedback: 'Correto. Tríade corrigida + estabilidade + 36h = momento ideal para fase 3 do DCS.' },
          { id: 's6b', text: 'TC semanal e reoperar apenas se houver complicação', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Packing requer remoção programada em 24-72h.' },
          { id: 's6c', text: 'Manter abdome aberto indefinidamente', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Abdome aberto é solução temporária — aumenta risco de infecção e fístula.' },
          { id: 's6d', text: 'Aguardar 7 dias para garantir estabilidade', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Prolongar o packing aumenta infecção e síndrome compartimental abdominal.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê conduziu o politraumatizado pelo ATLS completo: ABCDE → FAST → DCS → ressuscitação na UTI → cirurgia definitiva no momento correto.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 5 — Via Aérea ─────────────────────────────────────────────────────
  // Respostas corretas: D, A, C, A, B, D  (distribuição: A×2 B×1 C×1 D×2)
  {
    id: 'caso_via_aerea_01',
    theme: 'atls_via_aerea',
    title: 'Via Aérea em Colapso',
    description: 'Homem de 52 anos chega após queimadura em incêndio doméstico. Gerencie a via aérea de forma progressiva e sistematizada.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação Inicial\n\nHomem, 52 anos, resgate de incêndio. GCS 14, agitado. Fuligem nas narinas, sobrancelhas chamuscadas, rouquidão progressiva. FR 26, SpO₂ 94%, FC 108, PA 128/82.\n\n**Avaliação imediata da via aérea?**',
        options: [
          { id: 's1a', text: 'Via aérea patente — GCS 14 e SpO₂ 94% permitem observação', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. O edema por queimadura progride de forma imprevisível. Aguardar deterioração é potencialmente fatal.' },
          { id: 's1b', text: 'Aplicar máscara com reservatório e reavaliar em 30 minutos', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Em 30 minutos o edema pode tornar a IOT impossível.' },
          { id: 's1c', text: 'Solicitar laringoscopia indireta antes de decidir', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Os sinais clínicos são suficientes. Atraso reduz a chance de IOT.' },
          { id: 's1d', text: 'Via aérea em risco iminente — queimadura de via aérea confirmada, IOT precoce obrigatória', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Fuligem + sobrancelhas chamuscadas + rouquidão = queimadura de via aérea. IOT precoce é mandatória.' },
        ]
      },
      {
        id: 'step2',
        content: '## Planejamento da IOT\n\nAbertura oral 2 dedos, pescoço curto, barba espessa. Avaliação LEMON.\n\n**O que essa avaliação indica?**',
        options: [
          { id: 's2a', text: 'Via aérea previsivelmente difícil — prepare videolaringoscópio, bougie e cricotireoidostomia antes de paralisar', is_correct: true, next_step_id: 'step3', feedback: 'Correto. LEMON positivo = via aérea difícil prevista. Acorde o plano B antes de administrar o bloqueador neuromuscular.' },
          { id: 's2b', text: 'Cricotireoidostomia imediata — via aérea difícil prevista', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Cricotireoidostomia é para CICO. Não é primeira escolha com paciente ainda ventilando.' },
          { id: 's2c', text: 'Via aérea normal — laringoscopia direta padrão', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Abertura 2 dedos + pescoço curto + barba = via aérea difícil prevista.' },
          { id: 's2d', text: 'Contraindicação à IOT — usar dispositivo supraglótico', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Via aérea difícil não contraindica IOT — exige mais preparo.' },
        ]
      },
      {
        id: 'step3',
        content: '## Execução da SIR\n\nVideolaringoscópio, bougie e kit de cricotireoidostomia preparados. Pré-oxigenação 4 minutos — SpO₂ 99%.\n\n**Qual sequência farmacológica?**',
        options: [
          { id: 's3a', text: 'Midazolam 0,1 mg/kg + succinilcolina 1,5 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Midazolam tem onset lento e causa hipotensão em hipovolemia.' },
          { id: 's3b', text: 'Propofol 2 mg/kg + rocurônio 1,2 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Propofol causa hipotensão grave — evitar em queimadura com perda volêmica.' },
          { id: 's3c', text: 'Etomidato 0,3 mg/kg + succinilcolina 1,5 mg/kg', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Etomidato: mínimo efeito hemodinâmico. Succinilcolina: onset rápido, duração curta — se falhar, o paciente recupera respiração espontânea.' },
          { id: 's3d', text: 'Ketamina 2 mg/kg + rocurônio 1,2 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Parcialmente correto. Ketamina é aceitável mas rocurônio requer sugammadex disponível.' },
        ]
      },
      {
        id: 'step4',
        content: '## Laringoscopia\n\nGlideScope: epiglote edemaciada, apenas porção posterior das cordas vocais (Cormack-Lehane grau III).\n\n**Conduta?**',
        options: [
          { id: 's4a', text: 'Introduzir bougie sob visão parcial, confirmar pelos cliques traqueais e deslizar o tubo', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Cormack-Lehane III + videolaringoscópio = use o bougie. Cliques = anéis traqueais. Rotação anti-horária 90° ao deslizar.' },
          { id: 's4b', text: 'Realizar cricotireoidostomia — Cormack-Lehane III indica impossibilidade', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cormack-Lehane III não é CICO — você tem visão parcial e o bougie.' },
          { id: 's4c', text: 'Inserir i-gel e ventilar — dispositivo supraglótico de resgate', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Ainda não é falha de IOT — você tem visão parcial e o bougie disponível.' },
          { id: 's4d', text: 'Retirar o videolaringoscópio e tentar com laringoscopia direta', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Via aérea edemaciada não melhora com mudança de técnica.' },
        ]
      },
      {
        id: 'step5',
        content: '## Confirmação e Ventilação\n\nIOT com bougie. ETCO₂ em onda, 36 mmHg. SpO₂ 98%. Tubo em 22 cm.\n\n**Qual parâmetro ventilatório é mais crítico?**',
        options: [
          { id: 's5a', text: 'FiO₂ 100% mantida indefinidamente — queimadura exige máxima oxigenação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Hiperoxia piora o prognóstico. Use a mínima FiO₂ para SpO₂ ≥ 94%.' },
          { id: 's5b', text: 'Volume corrente 6 mL/kg de peso predito — ventilação protetora', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Ventilação protetora (6 mL/kg) é mandatória em contusão pulmonar e lesão por inalação — reduz LPIV.' },
          { id: 's5c', text: 'FR 30 irpm para eliminar CO₂ da intoxicação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. FR 30 causa hipocapnia. O CO₂ é eliminado com FiO₂ 100% inicial, não com hiperventilação.' },
          { id: 's5d', text: 'Volume corrente 10-12 mL/kg — maior volume garante melhor oxigenação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Volumes altos causam barotrauma e volutrauma — especialmente prejudiciais em contusão pulmonar.' },
        ]
      },
      {
        id: 'step6',
        content: '## Evolução — 2 horas depois\n\nSpO₂ em queda. Pressão de pico crescente (36 cmH₂O). Murmúrio reduzido bilateralmente, mais à esquerda.\n\n**Hipótese e conduta?**',
        options: [
          { id: 's6a', text: 'Edema pulmonar por hiper-hidratação — restrição hídrica', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Edema pulmonar causa murmúrio presente bilateralmente. A assimetria aponta para pneumotórax.' },
          { id: 's6b', text: 'Broncoespasmo por inalação — salbutamol inalatório', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Broncoespasmo causa murmúrio com sibilos presentes. A assimetria e progressividade apontam para pneumotórax.' },
          { id: 's6c', text: 'Intubação seletiva do brônquio direito — rever posição do tubo', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto considerar, mas pressão crescente bilateral + queda de SpO₂ são mais sugestivos de pneumotórax.' },
          { id: 's6d', text: 'Pneumotórax por barotrauma — eFAST imediato + descompressão por agulha se instável', is_correct: true, next_step_id: 'final', feedback: 'Correto. Pressão de pico crescente + queda SpO₂ + murmúrio reduzido em ventilado = pneumotórax por barotrauma. eFAST confirma.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê reconheceu queimadura de via aérea precocemente, planejou IOT difícil, usou bougie em Cormack-Lehane III, aplicou ventilação protetora e identificou pneumotórax por barotrauma.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 6 — Trauma de Face ────────────────────────────────────────────────
  // Respostas corretas: C, B, D, B, A, C  (distribuição: A×1 B×2 C×2 D×1)
  {
    id: 'caso_trauma_face_01',
    theme: 'atls_face',
    title: 'Trauma Maxilofacial Grave',
    description: 'Homem de 29 anos, agressão com objeto contundente. Trauma maxilofacial extenso com sangramento abundante. Gerencie as prioridades.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 29 anos, agressão com bastão. GCS 12, FR 24, SpO₂ 93%, FC 118, PA 104/72. Sangramento oral abundante, hematoma cervical esquerdo crescente, mandíbula com mobilidade anormal. Estertor audível.\n\n**Primeira preocupação?**',
        options: [
          { id: 's1a', text: 'TC de face para avaliar as fraturas antes de intervir', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. TC é para paciente estável. SpO₂ 93% com via aérea comprometida = emergência imediata.' },
          { id: 's1b', text: 'Suturas hemostáticas de urgência nas lacerações', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Suturas são tratamento eletivo. Via aérea é a emergência.' },
          { id: 's1c', text: 'Via aérea comprometida — estertor + sangramento oral + hematoma cervical = obstrução iminente', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Três mecanismos de obstrução simultâneos. Aspire e garanta a via aérea antes de qualquer outra intervenção.' },
          { id: 's1d', text: 'Controle do sangramento facial — hemorragia ativa é a prioridade', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Via aérea comprometida mata antes que o sangramento facial. A antes de C.' },
        ]
      },
      {
        id: 'step2',
        content: '## Manejo da Via Aérea\n\nApós aspiração, SpO₂ 95%. Abertura oral 1,5 dedos. Hematoma cervical esquerdo crescendo visivelmente.\n\n**Decisão correta?**',
        options: [
          { id: 's2a', text: 'Cricotireoidostomia imediata — abertura oral < 2 dedos contraindica IOT', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Abertura reduzida dificulta mas não contraindica IOT com videolaringoscópio.' },
          { id: 's2b', text: 'IOT imediata com videolaringoscópio — via aérea difícil + hematoma expansivo', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Hematoma expansivo + abertura reduzida = janela se fechando. IOT agora ou nunca. Prepare cricotireoidostomia.' },
          { id: 's2c', text: 'Intubação nasotraqueal — evita manipulação oral', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Nasotraqueal às cegas está em desuso e é contraindicada em suspeita de fratura de base de crânio.' },
          { id: 's2d', text: 'Observar com máscara de O₂ — SpO₂ 95% é aceitável', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hematoma expansivo pode causar obstrução completa em minutos.' },
        ]
      },
      {
        id: 'step3',
        content: '## Hematoma Cervical\n\nApós IOT. Hematoma cervical esquerdo: pulsátil, em expansão, sopro audível. Paciente estável hemodinamicamente.\n\n**O que o hematoma pulsátil com sopro indica?**',
        options: [
          { id: 's3a', text: 'Hematoma venoso — jugulares pulsam com a respiração', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Hematoma venoso não é pulsátil e não produz sopro.' },
          { id: 's3b', text: 'Hematoma muscular do esternocleidomastoideo', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Hematoma muscular não é pulsátil nem produz sopro.' },
          { id: 's3c', text: 'Linfocele — linfonodos traumatizados', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Linfocele não é pulsátil nem produz sopro.' },
          { id: 's3d', text: 'Lesão vascular arterial — fístula arteriovenosa ou pseudoaneurisma de carótida', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Pulsatilidade + sopro = lesão arterial. Sinal duro de lesão vascular cervical. Angio-TC urgente.' },
        ]
      },
      {
        id: 'step4',
        content: '## Epistaxe Posterior Refratária\n\nEpistaxe posterior maciça. Tamponamento anterior não controlou.\n\n**Conduta?**',
        options: [
          { id: 's4a', text: 'Cauterização com nitrato de prata do ponto sangrante', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cauterização é para epistaxe anterior visível. Epistaxe posterior não é visualizável sem rinoscopia.' },
          { id: 's4b', text: 'Balão de Foley nasofaríngeo — introduzir, inflar com 10-15 mL e tracionar', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Primeira linha para epistaxe posterior. Se falhar: angioembolização da artéria esfenopalatina (IATSIC 2023).' },
          { id: 's4c', text: 'Ligadura da artéria carótida externa', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Em desuso — substituída pela angioembolização.' },
          { id: 's4d', text: 'Compressão digital bilateral por 15 minutos', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Compressão digital é para epistaxe anterior. Artéria esfenopalatina não é alcançada externamente.' },
        ]
      },
      {
        id: 'step5',
        content: '## Avaliação Ocular\n\nOlho direito: proptose progressiva, resistência ao retropulsão, acuidade visual reduzida. PIO 48 mmHg.\n\n**Indica e urgência?**',
        options: [
          { id: 's5a', text: 'Hematoma retrobulbar — cantotomia lateral de emergência em até 90-120 minutos', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Proptose + resistência + acuidade reduzida + PIO > 40 = hematoma retrobulbar. Cantotomia + cantólise imediata. Janela: 90-120 min.' },
          { id: 's5b', text: 'Fratura de assoalho orbitário com enoftalmia — TC antes de intervir', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Enoftalmia é oposto de proptose. Esta emergência não pode aguardar TC.' },
          { id: 's5c', text: 'Hipertensão ocular simples — colírio betabloqueador', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. PIO 48 + proptose + acuidade reduzida = hematoma retrobulbar. Colírio é insuficiente.' },
          { id: 's5d', text: 'Rotura de globo — curativo oclusivo e oftalmologista', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Rotura de globo causa hipotonia (PIO baixa). PIO 48 indica compressão extrínseca.' },
        ]
      },
      {
        id: 'step6',
        content: '## Diagnóstico das Fraturas\n\nTC de face 3D: fratura Le Fort III bilateral + zigoma direito + fratura NOE com afastamento do tendão cantal medial bilateral.\n\n**O que a fratura NOE com afastamento do tendão cantal medial causa?**',
        options: [
          { id: 's6a', text: 'Ptose bilateral — lesão do músculo levantador', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Ptose indica lesão do III par ou levantador. NOE causa telecanto.' },
          { id: 's6b', text: 'Enoftalmia bilateral — aumento do volume orbitário', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Enoftalmia é por fratura de assoalho orbitário. NOE causa telecanto.' },
          { id: 's6c', text: 'Telecanto traumático — distância intercantal > 35 mm, sinal patognomônico de fratura NOE', is_correct: true, next_step_id: 'final', feedback: 'Correto. Avulsão do tendão cantal medial = telecanto traumático (> 35 mm). Sinal patognomônico da fratura NOE.' },
          { id: 's6d', text: 'Anosmia — lesão do nervo olfatório', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto — anosmia pode ocorrer mas não é o sinal patognomônico. Telecanto é.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê priorizou via aérea no trauma maxilofacial, identificou lesão vascular por hematoma pulsátil, controlou epistaxe posterior, realizou cantotomia por hematoma retrobulbar e identificou telecanto em fratura NOE.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 7 — Trauma de Pescoço ─────────────────────────────────────────────
  // Respostas corretas: C, D, A, C, B, D  (distribuição: A×1 B×1 C×2 D×2)
  {
    id: 'caso_trauma_pescoco_01',
    theme: 'atls_pescoco',
    title: 'Ferimento Penetrante de Pescoço',
    description: 'Homem de 34 anos com ferimento por arma branca no pescoço esquerdo, zona II. Aplique o protocolo de trauma penetrante de pescoço.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 34 anos, FAB pescoço esquerdo zona II. GCS 15, FR 20, SpO₂ 97%, FC 102, PA 118/76. Ferida de 2 cm entre cricóidea e ângulo da mandíbula. Sangramento controlado com compressão. Sem estridor. Voz levemente rouca.\n\n**Avaliação dos sinais duros e moles?**',
        options: [
          { id: 's1a', text: 'Sinais duros presentes — exploração cirúrgica imediata', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Sinais duros = hemorragia incontrolável, hematoma expansivo, choque, déficit neurológico focal. Aqui há sinais moles apenas.' },
          { id: 's1b', text: 'Sem sinais significativos — suturar e dar alta', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Todo FAB de zona II com violação do platisma requer investigação.' },
          { id: 's1c', text: 'Sinais moles presentes (rouquidão + hematoma estável) — angio-TC antes de cirurgia', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Rouquidão e hematoma estável são sinais moles. Paciente estável: angio-TC é o próximo passo (EAST 2023).' },
          { id: 's1d', text: 'Exploração local da ferida para avaliar violação do platisma', is_correct: false, next_step_id: 'step2', feedback: 'Parcialmente correto, mas angio-TC é mais informativa e o próximo passo padrão em zona II estável.' },
        ]
      },
      {
        id: 'step2',
        content: '## Angio-TC Cervical\n\nIrregularidade intimal da carótida interna esquerda com estreitamento de 20% — sem trombo. Esôfago sem alterações.\n\n**Classificação e tratamento?**',
        options: [
          { id: 's2a', text: 'Biffl grau III — stent endovascular imediato', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grau III é pseudoaneurisma. Este caso tem irregularidade intimal com < 25% de estreitamento = grau I.' },
          { id: 's2b', text: 'Exploração cirúrgica e reparo da carótida', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grau I em paciente estável não requer cirurgia.' },
          { id: 's2c', text: 'Biffl grau IV — ligadura da carótida', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grau IV é oclusão completa. Ligadura causa AVC em 20-30%.' },
          { id: 's2d', text: 'Biffl grau I — antiagregação com AAS e angio-TC seriada', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Irregularidade intimal + estreitamento < 25% = Biffl grau I. AAS + controle em 7-10 dias.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação Esofágica\n\nDisfagia e odinofagia progressivas. Crepitação subcutânea cervical posterior.\n\n**Conduta diagnóstica?**',
        options: [
          { id: 's3a', text: 'Esofagografia com gastrografina + esofagoscopia flexível — sensibilidade > 95%', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Disfagia + odinofagia + enfisema subcutâneo = lesão esofágica até prova em contrário. Combinação atinge > 95% de sensibilidade.' },
          { id: 's3b', text: 'TC já foi normal — disfagia é por edema local, observar 24h', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. TC tem sensibilidade limitada para lesões esofágicas. Investigação é obrigatória.' },
          { id: 's3c', text: 'Deglutição de azul de metileno', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Altíssima taxa de falso negativo — lesões pequenas não extravasam.' },
          { id: 's3d', text: 'Esofagoscopia rígida apenas', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Rígida tem maior risco de perfuração. A combinação com esofagografia aumenta a sensibilidade.' },
        ]
      },
      {
        id: 'step4',
        content: '## Lesão Esofágica Confirmada\n\nExtravasamento na parede posterior do esôfago cervical. Laceração 1,5 cm, < 24h.\n\n**Tratamento?**',
        options: [
          { id: 's4a', text: 'Tratamento conservador — dieta zero e antibióticos por 7 dias', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Lesão confirmada com extravasamento requer cirurgia — mediastinite tem mortalidade > 50%.' },
          { id: 's4b', text: 'Drenagem percutânea guiada por TC', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Drenagem não trata a laceração — apenas drena a coleção.' },
          { id: 's4c', text: 'Reparo cirúrgico primário em duas camadas + drenagem cervical + antibióticos + sonda enteral', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Lesão < 24h: reparo primário (mucosa + muscular) + drenagem ampla + ATB + nutrição enteral.' },
          { id: 's4d', text: 'Stent esofágico endoscópico', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Stent tem papel em perforações tardias. Lesão aguda acessível: reparo primário é o padrão.' },
        ]
      },
      {
        id: 'step5',
        content: '## Pós-operatório — Dia 2\n\nNova queda do GCS para 12 e hemiparesia direita. TC: hipodensidade no território da ACM esquerda.\n\n**Causa e conduta?**',
        options: [
          { id: 's5a', text: 'Hematoma intracraniano — neurocirurgia de emergência', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. TC mostra hipodensidade (isquemia), não hiperdensidade (hemorragia).' },
          { id: 's5b', text: 'AVC isquêmico por tromboembolismo da lesão carotídea Biffl I — anticoagulação plena', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Lesão Biffl I pode progredir para trombo e embolizar. Anticoagulação plena após avaliar risco hemorrágico cirúrgico.' },
          { id: 's5c', text: 'Vasoespasmo por HSA — nimodipina', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Não há HSA na TC. Vasoespasmo é complicação de HSA aneurismática.' },
          { id: 's5d', text: 'Encefalopatia metabólica por sepse — antibióticos e suporte', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Encefalopatia causa rebaixamento difuso, não déficit focal como hemiparesia.' },
        ]
      },
      {
        id: 'step6',
        content: '## Clearance Cervical\n\nOutro paciente: homem, 28 anos, colisão frontal 60 km/h. GCS 15, sem dor cervical, sem deficit neurológico, sem intoxicação, sem lesão distratora.\n\n**Precisa de imagem cervical?**',
        options: [
          { id: 's6a', text: 'Sim — colisão a 60 km/h exige TC cervical independentemente dos critérios', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Velocidade isolada não é critério. NEXUS negativo = clearance clínico seguro.' },
          { id: 's6b', text: 'Sim — radiografia simples em 3 incidências', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Com NEXUS negativo, nenhuma imagem é necessária.' },
          { id: 's6c', text: 'Sim — RM para excluir lesão ligamentar oculta', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. RM é para déficit neurológico sem fratura na TC. NEXUS negativo dispensa imagem.' },
          { id: 's6d', text: 'Não — todos os critérios NEXUS são negativos, clearance clínico é seguro', is_correct: true, next_step_id: 'final', feedback: 'Correto. NEXUS completamente negativo = clearance clínico. Sensibilidade 99,6%. Imagem desnecessária.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê identificou sinais moles vs duros, classificou lesão carotídea por Biffl, diagnosticou lesão esofágica, reconheceu AVC isquêmico como complicação e aplicou critérios NEXUS para clearance cervical.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 8 — Trauma Torácico ───────────────────────────────────────────────
  // Respostas corretas: B, D, A, C, D, B  (distribuição: A×1 B×2 C×1 D×2)
  {
    id: 'caso_trauma_toracico_01',
    theme: 'atls_toracico',
    title: 'Trauma Torácico Grave',
    description: 'Homem de 41 anos após colisão frontal em alta velocidade. Trauma torácico fechado extenso. Gerencie as lesões com risco imediato de vida.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 41 anos, motorista sem cinto, colisão frontal ~100 km/h. GCS 14, FR 30, SpO₂ 88%, FC 128, PA 94/60. Equimose em faixas no tórax anterior. Murmúrio vesicular ausente à esquerda. Hipertimpanismo à percussão esquerda. Traqueia na linha média.\n\n**Diagnóstico e conduta imediata?**',
        options: [
          { id: 's1a', text: 'Hemotórax maciço esquerdo — drenagem torácica imediata', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Hemotórax causa macicez à percussão, não hipertimpanismo. O quadro é de pneumotórax.' },
          { id: 's1b', text: 'Pneumotórax simples esquerdo — drenagem torácica eletiva após TC', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Com SpO₂ 88%, FC 128 e PA 94/60, não é pneumotórax simples — é hipertensivo ou significativo. TC eletiva não é adequada.' },
          { id: 's1c', text: 'Contusão pulmonar bilateral — suporte ventilatório e observação', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Contusão pulmonar causa hipoxemia com murmúrio presente (crepitações). A ausência de murmúrio unilateral indica pneumotórax.' },
          { id: 's1d', text: 'Pneumotórax esquerdo com instabilidade — descompressão imediata + drenagem torácica', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Ausência MV + hipertimpanismo + instabilidade = pneumotórax com comprometimento hemodinâmico. Descomprima imediatamente.' },
        ]
      },
      {
        id: 'step2',
        content: '## Após Drenagem Torácica\n\nSaída de 1.800 mL de sangue imediatamente após a drenagem. PA 72/40, FC 142. SpO₂ 92%.\n\n**Conduta?**',
        options: [
          { id: 's2a', text: 'Reposição com 2L de cristaloide e reavalie', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hemotórax maciço com 1.800 mL inicial + instabilidade = toracotomia. Cristaloide em excesso agrava coagulopatia.' },
          { id: 's2b', text: 'TC de tórax para caracterizar as lesões vasculares', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Paciente instável com hemotórax maciço não vai para TC — vai para sala cirúrgica.' },
          { id: 's2c', text: 'Angioembolização transarterial das artérias intercostais', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Angioembolização é para hemotórax estável com fonte arterial definida. Aqui há instabilidade com sangramento maciço — toracotomia.' },
          { id: 's2d', text: 'Toracotomia de urgência — hemotórax maciço com débito inicial > 1500 mL e instabilidade', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Critério: débito inicial > 1500 mL OU > 200 mL/h por 4h + instabilidade = toracotomia de urgência.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação do Tórax\n\nNA TC pós-estabilização: alargamento mediastinal 9,5 cm, apagamento do botão aórtico, desvio da sonda nasogástrica para a direita.\n\n**Diagnóstico e próximo passo?**',
        options: [
          { id: 's3a', text: 'Lesão de aorta traumática — angio-TC de tórax para classificação', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Alargamento mediastinal + apagamento do botão aórtico + desvio da SNG = lesão de aorta. Angio-TC é o padrão diagnóstico atual (sensibilidade e especificidade > 99%).' },
          { id: 's3b', text: 'Ruptura esofágica — esofagografia com gastrografina', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Ruptura esofágica causa pneumomediastino e mediastinite, não alargamento mediastinal hemorrágico com apagamento do botão aórtico.' },
          { id: 's3c', text: 'Hematoma mediastinal por fratura esternal — TC simples', is_correct: false, next_step_id: 'step4', feedback: 'Parcialmente correto — fratura esternal pode causar hematoma, mas alargamento > 8 cm + desvio de SNG obrigam investigação de lesão aórtica.' },
          { id: 's3d', text: 'Tamponamento cardíaco — FAST imediato e pericardiocentese', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Tamponamento causa alargamento da silhueta cardíaca, não alargamento mediastinal superior. O quadro é de lesão aórtica.' },
        ]
      },
      {
        id: 'step4',
        content: '## Lesão de Aorta Confirmada\n\nAngio-TC: pseudoaneurisma no istmo aórtico — lesão grau III de AAST. Paciente estável após ressuscitação.\n\n**Tratamento?**',
        options: [
          { id: 's4a', text: 'Cirurgia aberta de emergência — clampeamento e reparo da aorta', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cirurgia aberta tem mortalidade 10-20% e paraplegia 8-15%. TEVAR é a primeira escolha em lesão grau III com paciente estável.' },
          { id: 's4b', text: 'Observação com controle da PA — lesão grau III não requer intervenção', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Observação é para graus I-II. Grau III (pseudoaneurisma) requer intervenção ativa.' },
          { id: 's4c', text: 'TEVAR (reparo endovascular torácico) — primeira escolha em grau III com paciente estável', is_correct: true, next_step_id: 'step5', feedback: 'Correto. TEVAR: mortalidade 2-3% vs 10-20% da cirurgia aberta. Paraplegia < 3% vs 8-15%. Padrão atual (AAST/STS 2023).' },
          { id: 's4d', text: 'Betabloqueador IV para controle da PA e aguardar resolução espontânea', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Controle da PA (alvo PAS < 120, FC < 80) é adjuvante — grau III requer TEVAR, não tratamento clínico isolado.' },
        ]
      },
      {
        id: 'step5',
        content: '## Tórax Instável\n\nDois dias depois, outro paciente: mulher, 55 anos, capotamento. FR 34, SpO₂ 89%. Fratura de 5 costelas consecutivas em 2 pontos. Movimento paradoxal do segmento instável. Dor intensa.\n\n**Qual é a intervenção de maior impacto imediato?**',
        options: [
          { id: 's5a', text: 'Fixação cirúrgica das costelas (SSRF) imediata', is_correct: false, next_step_id: 'step6', feedback: 'Parcialmente correto — SSRF tem indicações específicas (falha de desmame, dor intratável). O primeiro passo é analgesia adequada e suporte ventilatório.' },
          { id: 's5b', text: 'Intubação orotraqueal e ventilação mecânica imediata', is_correct: false, next_step_id: 'step6', feedback: 'Parcialmente correto — ventilação mecânica pode ser necessária, mas não é o primeiro passo. Tente analgesia e suporte não invasivo antes.' },
          { id: 's5c', text: 'Restrição hídrica agressiva — previne edema da contusão pulmonar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Restrição hídrica relativa é prudente, mas não é a intervenção de maior impacto imediato. A analgesia adequada é o pilar.' },
          { id: 's5d', text: 'Analgesia regional (bloqueio intercostal ou plano do eretor da espinha) + O₂ suplementar', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Dor causa hipoventilação que agrava a contusão. Analgesia regional reduz complicações pulmonares em 30% (AAST 2023). CNAF ou CPAP se SpO₂ persistir baixa.' },
        ]
      },
      {
        id: 'step6',
        content: '## Hemotórax Residual\n\nApós drenagem torácica há 4 dias, TC mostra hemotórax residual de 600 mL coagulado no ângulo costofrênico. Febre baixa.\n\n**Conduta?**',
        options: [
          { id: 's6a', text: 'Reposicionar o dreno torácico e aguardar drenagem', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Hemotórax coagulado não drena com reposicionamento — já está organizado.' },
          { id: 's6b', text: 'Trombolítico intrapleural (alteplase 25 mg) — reduz necessidade de VATS em 40%', is_correct: true, next_step_id: 'final', feedback: 'Correto. Alteplase intrapleural 25 mg em 100 mL SF, clampear 4h, repetir em 24h. Reduz VATS em 40% (AAST 2023). VATS se falhar.' },
          { id: 's6c', text: 'Antibioticoterapia e observação — hemotórax residual resolve espontaneamente', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Hemotórax residual > 500 mL após drenagem requer intervenção ativa — risco de empiema e paquipleura.' },
          { id: 's6d', text: 'VATS imediata — única opção para hemotórax coagulado', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. VATS é indicada após falha do trombolítico. Não é a primeira linha.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê diagnosticou pneumotórax e hemotórax maciço, indicou toracotomia corretamente, diagnosticou lesão de aorta e indicou TEVAR, manejou tórax instável com analgesia regional e tratou hemotórax residual com trombolítico.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 9 — Choque ────────────────────────────────────────────────────────
  // Respostas corretas: D, B, C, A, D, B  (distribuição: A×1 B×2 C×1 D×2)
  {
    id: 'caso_choque_01',
    theme: 'atls_choque',
    title: 'Choque Hemorrágico Refratário',
    description: 'Mulher de 38 anos após trauma abdominal e pélvico por atropelamento. Choque hemorrágico grave. Gerencie a ressuscitação e o controle da hemorragia.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nMulher, 38 anos, atropelada por ônibus. GCS 13, FC 148, PA 72/40, FR 32, SpO₂ 94%, TEC 4s, pele fria. Deformidade pélvica visível, dor à compressão do anel pélvico. Abdome distendido e doloroso.\n\n**Qual é a sequência correta de intervenções?**',
        options: [
          { id: 's1a', text: 'TC de pelve e abdome para identificar a fonte antes de tratar', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Paciente instável com choque hemorrágico não vai para TC — trate a fonte presumida enquanto ressuscita.' },
          { id: 's1b', text: 'Reposição agressiva com 3L de cristaloide e reavalie a PA', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Cristaloide em excesso agrava a coagulopatia dilucional e a tríade letal. DCR com hemoderivados é o padrão.' },
          { id: 's1c', text: 'FAST + cinto pélvico imediato + dois acessos IV calibrosos + ativar protocolo de transfusão maciça', is_correct: false, next_step_id: 'step2', feedback: 'Parcialmente correto — mas falta a hipotensão permissiva e o ATX precocemente.' },
          { id: 's1d', text: 'FAST + cinto pélvico imediato + PTM 1:1:1 + ATX 1g IV + hipotensão permissiva PAS 80-90', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Damage Control Resuscitation completo: controle mecânico (cinto) + hemoderivados 1:1:1 + ATX (< 3h) + hipotensão permissiva.' },
        ]
      },
      {
        id: 'step2',
        content: '## FAST e Decisão\n\nFAST: líquido livre peritoneal ++, pericárdio normal. Cinto pélvico aplicado. PA sobe para 82/52 transitoriamente e cai novamente para 70/40 após 500 mL de plasma.\n\n**Qual é a causa predominante do choque e a conduta?**',
        options: [
          { id: 's2a', text: 'Hemorragia intraabdominal predominante — laparotomia de emergência imediata', is_correct: false, next_step_id: 'step3', feedback: 'Parcialmente correto — há hemoperitônio, mas a instabilidade refratária com fratura pélvica sugere hemorragia pélvica predominante. Laparotomia isolada não controla sangramento pélvico retroperitoneal.' },
          { id: 's2b', text: 'Hemorragia pélvica e abdominal combinada — packing pré-peritoneal + laparotomia simultânea', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Instabilidade refratária com fratura pélvica + FAST positivo = PPP (packing pré-peritoneal) + controle abdominal simultâneo. Taxa de controle do PPP: 85-90%.' },
          { id: 's2c', text: 'Tamponamento cardíaco — FAST foi inadequado, refaça com foco no pericárdio', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. FAST confirmou pericárdio normal. Tamponamento está excluído.' },
          { id: 's2d', text: 'Choque neurogênico por fratura pélvica — norepinefrina e reposição volêmica', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Choque neurogênico ocorre em lesão medular acima de T6, com bradicardia e vasodilatação. Este quadro é hemorrágico — taquicardia + vasoconstrição.' },
        ]
      },
      {
        id: 'step3',
        content: '## Laboratório na Admissão\n\nResultados: temperatura 34,8°C, pH 7,16, BE -12, INR 2,4, fibrinogênio 85 mg/dL, lactato 8,2 mmol/L, plaquetas 62.000.\n\n**Qual componente da tríade letal tem impacto mais imediato na coagulopatia enzimática?**',
        options: [
          { id: 's3a', text: 'Acidose — pH 7,16 inibe as enzimas da cascata de coagulação em 50%', is_correct: false, next_step_id: 'step4', feedback: 'Correto também, mas a hipotermia é o fator mais fácil de prevenir no APH e tem impacto direto e imediato na atividade enzimática da coagulação.' },
          { id: 's3b', text: 'Coagulopatia — INR 2,4 e fibrinogênio 85 indicam depleção de fatores', is_correct: false, next_step_id: 'step4', feedback: 'Correto como achado, mas coagulopatia é consequência da tríade — não a causa primária da disfunção enzimática. Hipotermia é o gatilho mais preventável.' },
          { id: 's3c', text: 'Hipotermia — cada 1°C de queda reduz atividade enzimática da coagulação em 10%', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Hipotermia é o componente mais preventável e de maior impacto imediato na cascata de coagulação. Aquecimento ativo é mandatório desde o APH.' },
          { id: 's3d', text: 'Anemia — hemoglobina baixa reduz a viscosidade e prejudica a hemostasia primária', is_correct: false, next_step_id: 'step4', feedback: 'Parcialmente correto — anemia contribui, mas não é o componente principal da tríade letal. Hipotermia tem o maior impacto enzimático imediato.' },
        ]
      },
      {
        id: 'step4',
        content: '## Guia de Reposição\n\nTEG disponível. Resultado: tempo de coagulação prolongado, amplitude máxima reduzida (plaquetas baixas), fibrinólise aumentada (lise de 30 minutos elevada).\n\n**O que o TEG indica e qual a reposição específica?**',
        options: [
          { id: 's4a', text: 'Deficiência de fatores + trombocitopenia + hiperfibrinólise — plasma + plaquetas + ATX adicional', is_correct: true, next_step_id: 'step5', feedback: 'Correto. TEG identifica o componente específico da coagulopatia: TC prolongado = fatores, MA reduzida = plaquetas, lise elevada = fibrinólise. ATX adicional se dentro de 3h.' },
          { id: 's4b', text: 'Coagulopatia dilucional isolada — apenas plasma fresco congelado', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. O TEG mostra três componentes afetados: fatores + plaquetas + fibrinólise. Plasma isolado não corrige todos.' },
          { id: 's4c', text: 'Trombocitopenia isolada — apenas plaquetas', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. TEG mostra múltiplos componentes afetados. Reposição deve ser dirigida pelo TEG completo.' },
          { id: 's4d', text: 'Resultado normal — coagulopatia é laboratorial sem significado clínico', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. TC prolongado + MA reduzida + lise elevada são alterações significativas com impacto direto na mortalidade.' },
        ]
      },
      {
        id: 'step5',
        content: '## REBOA\n\nApesar do PPP e das transfusões, a paciente permanece hipotenso (PA 65/35). A sala cirúrgica está a 8 minutos.\n\n**Qual é o papel do REBOA neste momento?**',
        options: [
          { id: 's5a', text: 'REBOA zona I — hemorragia abdominal acima do diafragma', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Zona I é para hemorragia supradiafragmática. A hemorragia pélvica é tratada com REBOA zona III (aorta infrarrenal).' },
          { id: 's5b', text: 'REBOA não tem indicação — a paciente deve ir diretamente para cirurgia', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Com PA 65/35 e 8 minutos até a cirurgia, REBOA zona III como ponte aumenta a PA proximal e reduz a hemorragia pélvica temporariamente.' },
          { id: 's5c', text: 'REBOA zona II — nível das artérias renais para preservar perfusão visceral e pélvica', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Zona II (entre artérias renais e mesentérica inferior) não é utilizada — zona III para hemorragia pélvica, zona I para abdominal.' },
          { id: 's5d', text: 'REBOA zona III — aorta infrarrenal como ponte para controle cirúrgico pélvico definitivo', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Zona III (aorta infrarrenal) reduz fluxo para a pelve + aumenta pós-carga proximal. Preserva perfusão visceral. Ponte para PPP + angioembolização.' },
        ]
      },
      {
        id: 'step6',
        content: '## Metas de Ressuscitação\n\n4 horas após a cirurgia: temperatura 36,2°C, pH 7,31, lactato 3,8 mmol/L (era 8,2). FC 108, PA 96/62. INR 1,4. Paciente acordando.\n\n**Como você avalia a adequação da ressuscitação?**',
        options: [
          { id: 's6a', text: 'PA normalizada é o melhor marcador — manter PA ≥ 110 mmHg como meta', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. PA é marcador tardio e impreciso de perfusão tecidual. Lactato e seu clearance são superiores.' },
          { id: 's6b', text: 'Clearance de lactato ≥ 10% em 2h é o principal marcador — lactato 3,8 (queda de 54%) indica resposta adequada', is_correct: true, next_step_id: 'final', feedback: 'Correto. Clearance de lactato ≥ 10% em 2h indica resposta à ressuscitação. Queda de 8,2 → 3,8 (54%) confirma boa resposta. Meta: normalização do lactato (< 2 mmol/L).' },
          { id: 's6c', text: 'Débito urinário ≥ 2 mL/kg/h — único marcador confiável de perfusão renal', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto. Débito urinário é marcador de perfusão renal importante, mas não o único nem o melhor para avaliar ressuscitação global.' },
          { id: 's6d', text: 'FC < 100 bpm — normalização da frequência indica ressuscitação completa', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. FC é influenciada por dor, ansiedade e fármacos. Lactato e seu clearance são marcadores mais específicos de hipoperfusão.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê aplicou Damage Control Resuscitation completo: DCR 1:1:1 + ATX + hipotensão permissiva, identificou hemorragia pélvica e abdominal, guiou reposição por TEG, utilizou REBOA zona III como ponte e avaliou ressuscitação pelo clearance de lactato.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
]

export const MOCK_STUDY_HEATMAP = (() => {
  const today = new Date()
  const data: { date: string; count: number }[] = []
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
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