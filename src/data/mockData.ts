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
,

  // ── CASO 10 — Trauma Abdominal ─────────────────────────────────────────────
  // Respostas corretas: B, D, A, C, B, D  (distribuição: A×1 B×2 C×1 D×2)
  {
    id: 'caso_abdominal_01',
    theme: 'atls_abdominal',
    title: 'Trauma Abdominal Fechado',
    description: 'Homem de 36 anos após colisão frontal a 90 km/h com cinto abdominal sem diagonal. Trauma abdominal fechado com instabilidade progressiva.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 36 anos, motorista com cinto abdominal apenas. Colisão frontal ~90 km/h. GCS 15, FC 118, PA 96/62, FR 22, SpO₂ 96%. Equimose linear no abdome inferior seguindo o trajeto do cinto. Dor abdominal difusa. Abdome levemente distendido.\n\n**O que o sinal do cinto de segurança indica?**',
        options: [
          { id: 's1a', text: 'Apenas contusão da parede abdominal — sem significado clínico maior', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Sinal do cinto em mecanismo de alta energia é altamente sugestivo de lesão visceral interna.' },
          { id: 's1b', text: 'Tríade clássica: fratura de Chance + lesão de víscera oca + instabilidade potencial', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Cinto abdominal sem diagonal + colisão frontal = síndrome do cinto: fratura de Chance (L1-L2) + lesão de víscera oca (intestino, mesentério) em até 40% dos casos.' },
          { id: 's1c', text: 'Lesão esplênica isolada — o baço é o órgão mais vulnerável ao cinto', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. O cinto abdominal comprime principalmente o intestino delgado e mesentério contra a coluna — não o baço.' },
          { id: 's1d', text: 'Fratura pélvica por transmissão de força — investigar a pelve', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A força do cinto abdominal atua sobre o abdome, não sobre a pelve. A investigação prioritária é abdominal e da coluna.' },
        ]
      },
      {
        id: 'step2',
        content: '## FAST e Decisão\n\nFAST: líquido livre no espaço de Morrison ++ e no fundo de saco de Douglas +. Pericárdio normal. PA cai para 82/50 após o FAST.\n\n**Conduta?**',
        options: [
          { id: 's2a', text: 'TC de abdome e pelve com contraste — FAST positivo com estabilidade relativa', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. PA 82/50 com FAST positivo = instabilidade. Paciente instável não vai para TC — vai para cirurgia.' },
          { id: 's2b', text: 'Reposição com 2L de cristaloide e repetir o FAST em 15 minutos', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Cristaloide em excesso agrava coagulopatia. FAST positivo + instabilidade = cirurgia imediata.' },
          { id: 's2c', text: 'Angioembolização — FAST positivo indica sangramento arterial', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Angioembolização é para paciente estável com extravasamento arterial na TC. Instabilidade com FAST positivo = laparotomia.' },
          { id: 's2d', text: 'Laparotomia exploradora de emergência — FAST positivo com instabilidade refratária', is_correct: true, next_step_id: 'step3', feedback: 'Correto. FAST positivo + instabilidade hemodinâmica = laparotomia imediata. Não leve para TC — cada minuto aumenta a mortalidade.' },
        ]
      },
      {
        id: 'step3',
        content: '## Achados Intraoperatórios\n\nLaparotomia: laceração de mesentério com hematoma expansivo + perfuração de alça de intestino delgado a 80 cm do ângulo de Treitz + contusão hepática grau II sem sangramento ativo. Temperatura 35,1°C, pH 7,22, INR 1,8.\n\n**Estratégia cirúrgica?**',
        options: [
          { id: 's3a', text: 'Damage Control: grampeamento da perfuração + ligadura do mesentério + fechamento temporário', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Tríade letal em formação (hipotermia + acidose + coagulopatia). DCS: controle da contaminação (grampeamento) + hemostasia (ligadura mesentérica) + fechamento temporário. Reconstrução na fase 3.' },
          { id: 's3b', text: 'Anastomose primária imediata — perfuração única, condições favoráveis', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Temperatura 35,1°C + pH 7,22 + INR 1,8 = tríade letal em instalação. Anastomose em condições de coagulopatia tem alta taxa de deiscência.' },
          { id: 's3c', text: 'Apenas lavagem e drenagem — lesão pequena não requer ressecção', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Perfuração de intestino delgado com contaminação peritoneal requer ressecção — lavagem e drenagem isoladas não são suficientes.' },
          { id: 's3d', text: 'Cirurgia completa com anastomose + colostomia de proteção + fechamento definitivo', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Cirurgia extensa em paciente com tríade letal em instalação aumenta a mortalidade. DCS é o padrão.' },
        ]
      },
      {
        id: 'step4',
        content: '## Síndrome Compartimental Abdominal\n\n36h após DCS. Abdome fechado com VAC. Paciente desenvolve: oligúria (0,2 mL/kg/h), pressão de pico no ventilador crescente, PA em queda. Pressão intravesical: 28 mmHg.\n\n**Diagnóstico e conduta?**',
        options: [
          { id: 's4a', text: 'Sepse abdominal — aumentar antibióticos e hemoderivados', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. PIA 28 mmHg + oligúria + pressão de pico crescente + hipotensão = síndrome compartimental abdominal. Não é sepse isolada.' },
          { id: 's4b', text: 'Tromboembolismo pulmonar — anticoagulação e suporte', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. TEP causaria hipoxemia e hipotensão, mas não oligúria com PIA 28 mmHg e pressão de pico crescente.' },
          { id: 's4c', text: 'Síndrome compartimental abdominal — laparotomia descompressiva imediata', is_correct: true, next_step_id: 'step5', feedback: 'Correto. PIA > 20 mmHg + nova disfunção de órgão (oligúria + insuficiência respiratória + hipotensão) = SCA. Laparotomia descompressiva é mandatória.' },
          { id: 's4d', text: 'Falência renal por contraste — diálise e hidratação', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. A oligúria é por compressão das veias renais pela PIA elevada — não por nefrotoxicidade. A descompressão cirúrgica é a solução.' },
        ]
      },
      {
        id: 'step5',
        content: '## Lesão de Víscera Oca Tardia\n\nOutro paciente: homem, 28 anos, FAB abdominal zona anterior. GCS 15, estável. Sem peritonismo inicial. FAST negativo. 8 horas depois: dor abdominal progressiva, defesa, febre 38,5°C, leucócitos 18.000.\n\n**O que ocorreu e qual é a conduta?**',
        options: [
          { id: 's5a', text: 'Abscesso de parede — antibióticos e drenagem percutânea', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Abscesso de parede em 8 horas é impossível. Peritonismo progressivo + febre + leucocitose = perfuração visceral com peritonite.' },
          { id: 's5b', text: 'Perfuração de víscera oca tardia — laparotomia exploradora', is_correct: true, next_step_id: 'step6', feedback: 'Correto. FAB abdominal + FAST inicialmente negativo + peritonismo tardio = perfuração de víscera oca. FAST negativo não exclui lesão de víscera oca — laparotomia é mandatória.' },
          { id: 's5c', text: 'Hematoma intramural — observação e analgesia', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Hematoma intramural pode evoluir para perfuração, mas febre + leucocitose + peritonismo = peritonite estabelecida que requer cirurgia imediata.' },
          { id: 's5d', text: 'Repetir o FAST — resultado inicial pode ter sido falso negativo', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. FAST detecta líquido livre (sangue), não perfuração de víscera oca sem hemoperitônio. Com peritonismo estabelecido, a indicação cirúrgica já está definida clinicamente.' },
        ]
      },
      {
        id: 'step6',
        content: '## Pós-Esplenectomia\n\nTerceiro paciente: mulher, 22 anos, submetida a esplenectomia de emergência por laceração grau V. Alta hospitalar em 5 dias. Retorna ao ambulatório.\n\n**Qual é a conduta obrigatória no seguimento?**',
        options: [
          { id: 's6a', text: 'Apenas exames laboratoriais seriados — sem intervenção específica necessária', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Pós-esplenectomia requer vacinação obrigatória — risco de sepse fulminante por germes encapsulados (OPSI) é de até 50% de mortalidade.' },
          { id: 's6b', text: 'TC de controle em 30 dias para avaliar regeneração esplênica', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Após esplenectomia total não há regeneração. A conduta obrigatória é vacinação — não imagem de controle.' },
          { id: 's6c', text: 'Antibioticoprofilaxia com amoxicilina por 2 anos e restrição de atividades', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto — penicilina profilática por 2 anos é recomendada em crianças, mas o mais crítico é a vacinação contra germes encapsulados.' },
          { id: 's6d', text: 'Vacinação obrigatória: pneumococo + Haemophilus influenzae b + meningococo — idealmente entre 14-28 dias do pós-operatório', is_correct: true, next_step_id: 'final', feedback: 'Correto. Pós-esplenectomia: vacinação para pneumococo, Haemophilus influenzae b e meningococo é obrigatória. Se emergência: vacinar no pós-operatório entre 14-28 dias.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê identificou a síndrome do cinto de segurança, indicou laparotomia de emergência corretamente, aplicou DCS, diagnosticou SCA e indicou descompressão, reconheceu perfuração tardia de víscera oca e prescreveu vacinação pós-esplenectomia.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 11 — TCE ──────────────────────────────────────────────────────────
  // Respostas corretas: C, A, D, B, C, A  (distribuição: A×2 B×1 C×2 D×1)
  {
    id: 'caso_tce_01',
    theme: 'atls_cranioencefalico',
    title: 'Traumatismo Cranioencefálico Grave',
    description: 'Homem de 32 anos após queda de 4 metros de altura. TCE grave com deterioração neurológica progressiva. Gerencie as prioridades neuroprotetoras.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 32 anos, queda de 4 metros, impacto occipital. GCS 9 (O2V2M5) na cena, caindo para GCS 7 no transporte. FC 58, PA 168/94, FR 8 irpm irregular. Pupila direita midriática e arreativa. Pupila esquerda normal.\n\n**Qual é o diagnóstico sindrômico e a conduta imediata?**',
        options: [
          { id: 's1a', text: 'Choque neurogênico — norepinefrina e reposição volêmica', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Choque neurogênico causa hipotensão + bradicardia + vasodilatação. Aqui há hipertensão + bradicardia + bradipneia = tríade de Cushing.' },
          { id: 's1b', text: 'Intoxicação por opioides — naloxona IV e observação', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Opioides causam miose bilateral, não midríase unilateral. A tríade de Cushing + anisocoria indicam herniação cerebral.' },
          { id: 's1c', text: 'Herniação cerebral iminente — IOT imediata + hiperventilação leve (pCO₂ 30-35) como ponte + manitol', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Tríade de Cushing (hipertensão + bradicardia + bradipneia) + midríase unilateral arreativa = herniação uncal. IOT imediata + hiperventilação transitória como ponte para neurocirurgia.' },
          { id: 's1d', text: 'TCE leve — observação e TC eletiva', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. GCS 7 + tríade de Cushing + midríase unilateral = TCE grave com herniação iminente. Emergência neurocirúrgica.' },
        ]
      },
      {
        id: 'step2',
        content: '## Manejo da Via Aérea e Metas\n\nApós IOT: ETCO₂ 32 mmHg, SpO₂ 97%, PA 158/88, FC 62. TC de crânio sendo realizada.\n\n**Quais são as metas hemodinâmicas e ventilatórias no TCE grave?**',
        options: [
          { id: 's2a', text: 'PAS ≥ 100-110 mmHg + pCO₂ 35-40 mmHg (normocapnia) + SpO₂ ≥ 94%', is_correct: true, next_step_id: 'step3', feedback: 'Correto. BTF 2023: PAS ≥ 100-110 mmHg (hipotensão permissiva é contraindicada em TCE). Normocapnia rigorosa (35-40 mmHg) — hipercapnia aumenta PIC, hipocapnia causa isquemia.' },
          { id: 's2b', text: 'PAS 80-90 mmHg (hipotensão permissiva) + pCO₂ 28-32 mmHg (hiperventilação)', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hipotensão permissiva é contraindicada em TCE — um episódio de PAS < 90 mmHg aumenta mortalidade em 150%. Hiperventilação profilática também é prejudicial.' },
          { id: 's2c', text: 'PAS ≥ 140 mmHg + pCO₂ 45-50 mmHg para maximizar perfusão cerebral', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. PAS muito elevada pode agravar sangramento intracraniano. Hipercapnia (pCO₂ > 45) causa vasodilatação e aumenta a PIC.' },
          { id: 's2d', text: 'Qualquer PA é aceitável + pCO₂ 35-40 mmHg — o que importa é a PPC medida diretamente', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Sem monitorização de PIC disponível, a PA sistêmica é o proxy clínico para garantir PPC adequada. Meta PAS ≥ 100-110 mmHg é obrigatória.' },
        ]
      },
      {
        id: 'step3',
        content: '## TC de Crânio\n\nTC: hematoma epidural temporoparietal direito, volume 45 cm³, espessura 18 mm, desvio de linha média 8 mm. Cisterna basal comprimida.\n\n**Conduta cirúrgica?**',
        options: [
          { id: 's3a', text: 'Observação com TC seriada — hematoma epidural pode reabsorver espontaneamente', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Volume > 30 cm³ + espessura > 15 mm + desvio > 5 mm = critérios absolutos de craniotomia de emergência. Observação é fatal.' },
          { id: 's3b', text: 'Pericardiocentese para reduzir a PIC antes da cirurgia', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Pericardiocentese trata tamponamento cardíaco, não PIC elevada. Craniotomia de emergência é a conduta.' },
          { id: 's3c', text: 'Osmoterapia com manitol 1 g/kg e RM antes de decidir cirurgia', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Manitol é adjuvante — não substitui a cirurgia indicada. RM atrasa desnecessariamente a evacuação do hematoma.' },
          { id: 's3d', text: 'Craniotomia de emergência — volume > 30 cm³, espessura > 15 mm, desvio > 5 mm', is_correct: true, next_step_id: 'step4', feedback: 'Correto. HED com qualquer um desses critérios tem indicação cirúrgica absoluta. Quanto mais precoce a evacuação, melhor o prognóstico — cada hora de atraso aumenta a mortalidade.' },
        ]
      },
      {
        id: 'step4',
        content: '## Monitorização de PIC\n\nPós-operatório na UTI. GCS pós-operatório 8 (sedado). PIC monitorizada por DVE: PIC 26 mmHg, PAM 88 mmHg.\n\n**Calcule a PPC e determine a conduta?**',
        options: [
          { id: 's4a', text: 'PPC = 114 mmHg — acima da meta, reduzir a PA para diminuir a PIC', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. PPC = PAM - PIC = 88 - 26 = 62 mmHg. Não 114. Reduzir a PA pioraria a PPC.' },
          { id: 's4b', text: 'PPC = 62 mmHg — dentro da meta (60-70 mmHg); tratar PIC > 22 mmHg com drenagem de LCR pelo DVE', is_correct: true, next_step_id: 'step5', feedback: 'Correto. PPC = PAM - PIC = 88 - 26 = 62 mmHg. PPC na meta (60-70). PIC > 22 mmHg (meta BTF 2023): drene LCR pelo DVE (5-10 mL por vez). Não altere a PA.' },
          { id: 's4c', text: 'PPC = 62 mmHg — abaixo da meta, aumentar a PA com vasopressor', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. PPC 62 mmHg está dentro da meta (60-70 mmHg). Aumentar a PA pode agravar o edema cerebral. A prioridade é tratar a PIC elevada com drenagem de LCR.' },
          { id: 's4d', text: 'PPC = 62 mmHg — ignorar a PIC, monitorizar apenas a PA sistêmica', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. A PIC 26 mmHg está acima da meta (> 22 mmHg = tratar). Ignorar a PIC em TCE grave monitorizado é erro grave.' },
        ]
      },
      {
        id: 'step5',
        content: '## Neuroproteção — Evidências\n\nA família pergunta sobre corticosteroide (dexametasona) para reduzir o edema cerebral no TCE grave.\n\n**Qual é a resposta baseada em evidências?**',
        options: [
          { id: 's5a', text: 'Indicado — dexametasona reduz o edema vasogênico e melhora o prognóstico no TCE', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Corticosteroide é indicado em edema cerebral TUMORAL. No TCE grave, o ensaio CRASH (Lancet 2004) demonstrou AUMENTO de mortalidade com metilprednisolona.' },
          { id: 's5b', text: 'Contraindicado — ensaio CRASH demonstrou aumento de mortalidade com corticosteroide no TCE grave', is_correct: false, next_step_id: 'step6', feedback: 'Correto, mas a opção C está mais completa e é a resposta ideal para a família.' },
          { id: 's5c', text: 'Contraindicado — corticosteroide aumenta mortalidade no TCE grave (CRASH 2004); neuroproteção se faz com controle rigoroso de hipóxia, hipotensão e hipercapnia', is_correct: true, next_step_id: 'step6', feedback: 'Correto. CRASH trial: corticosteroide no TCE aumenta mortalidade. A neuroproteção eficaz se faz pelo controle agressivo dos fatores de lesão secundária: hipóxia, hipotensão, hipercapnia, hipertermia.' },
          { id: 's5d', text: 'Usar apenas em TCE moderado (GCS 9-12) — contraindicado no grave', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Corticosteroide é contraindicado em QUALQUER grau de TCE — o CRASH incluiu TCE grave e moderado, demonstrando aumento de mortalidade em ambos.' },
        ]
      },
      {
        id: 'step6',
        content: '## TCE Leve — Decisão de Imagem\n\nNovo paciente: homem, 45 anos, queda da própria altura, impacto frontal. GCS 15, sem perda de consciência relatada, cefaleia leve. Anticoagulado com varfarina (INR 2,8).\n\n**Precisa de TC de crânio?**',
        options: [
          { id: 's6a', text: 'Sim — uso de anticoagulante com trauma crânio é indicação absoluta de TC, independentemente do GCS', is_correct: true, next_step_id: 'final', feedback: 'Correto. Anticoagulação é critério absoluto de TC no TCE leve — risco de hematoma intracraniano mesmo em mecanismos de baixa energia. INR 2,8 aumenta dramaticamente o risco de sangramento intracraniano tardio.' },
          { id: 's6b', text: 'Não — GCS 15 sem perda de consciência dispensa imagem pelo Canadian CT Head Rule', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Canadian CT Head Rule exclui pacientes anticoagulados — eles têm indicação independente de TC. GCS 15 não é suficiente para dispensar imagem em anticoagulados.' },
          { id: 's6c', text: 'Apenas observação hospitalar por 24h — TC somente se piorar', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Anticoagulado com trauma craniano deve ter TC imediata — hematoma pode estar presente mesmo assintomático e progredir rapidamente.' },
          { id: 's6d', text: 'TC após reverter a anticoagulação com vitamina K — aguardar INR < 1,5', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. A TC deve ser realizada imediatamente — não espere a reversão para diagnosticar. Se houver sangramento, reverta com complexo protrombínico (ação em minutos), não vitamina K (ação em horas).' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê identificou herniação cerebral, manejou metas hemodinâmicas e ventilatórias no TCE grave, indicou craniotomia corretamente, calculou PPC e manejou PIC elevada, contraindicou corticosteroide com base no CRASH e indicou TC em anticoagulado.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },

  // ── CASO 12 — Trauma de Coluna ─────────────────────────────────────────────
  // Respostas corretas: D, B, C, A, D, C  (distribuição: A×1 B×1 C×2 D×2)
  {
    id: 'caso_coluna_01',
    theme: 'atls_coluna',
    title: 'Trauma de Coluna e Lesão Raquimedular',
    description: 'Homem de 27 anos após mergulho em piscina rasa. Lesão cervical com deficit neurológico. Gerencie a imobilização, o choque neurogênico e as decisões cirúrgicas.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 27 anos, mergulho em piscina rasa com impacto frontal. Encontrado flutuando, inconsciente brevemente, agora GCS 14. Queixa de dor cervical intensa e fraqueza nos quatro membros. FC 52, PA 82/50, FR 14, SpO₂ 96%. Pele quente e rosada abaixo do pescoço.\n\n**Qual é o diagnóstico do padrão hemodinâmico?**',
        options: [
          { id: 's1a', text: 'Choque hemorrágico — FC 52 indica compensação em jovem atleta', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Choque hemorrágico causa taquicardia reflexa. Bradicardia + hipotensão + pele quente/rosada (vasodilatação) = choque neurogênico por lesão medular cervical.' },
          { id: 's1b', text: 'Choque cardiogênico — bradicardia indica disfunção do nó sinusal por trauma', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Choque cardiogênico causa veias jugulares distendidas e estertores pulmonares. Aqui há vasodilatação periférica (pele quente/rosada) — choque distributivo neurogênico.' },
          { id: 's1c', text: 'Reação vagal ao mergulho — transitória, sem necessidade de intervenção', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Deficit neurológico nos quatro membros + bradicardia + hipotensão + vasodilatação em contexto de trauma cervical = choque neurogênico. Reação vagal não explica o quadro neurológico.' },
          { id: 's1d', text: 'Choque neurogênico — bradicardia + hipotensão + vasodilatação periférica por lesão medular cervical', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Lesão medular acima de T6 interrompe as vias simpáticas descendentes: vasodilatação periférica + bradicardia (ausência de simpático cardíaco) + hipotensão. Pele quente/rosada abaixo do nível confirma.' },
        ]
      },
      {
        id: 'step2',
        content: '## Tratamento do Choque Neurogênico\n\nExcluso hemorragia (FAST negativo, sem lesões externas). PA 78/44, FC 48.\n\n**Tratamento correto?**',
        options: [
          { id: 's2a', text: 'Reposição agressiva com 3L de cristaloide para restaurar a volemia', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Choque neurogênico é distributivo — não hipovolêmico. Hiper-hidratação causa edema pulmonar e medular sem corrigir a vasodilatação.' },
          { id: 's2b', text: 'Norepinefrina IV + atropina para bradicardia + PAM alvo ≥ 85-90 mmHg por 7 dias (AO Spine 2023)', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Norepinefrina: vasopressor de primeira linha (restaura tônus vasomotor). Atropina: bradicardia sintomática. Meta PAM ≥ 85-90 mmHg por 7 dias para perfusão medular (AO Spine 2023).' },
          { id: 's2c', text: 'Dopamina IV em dose alta — efeito alfa predominante em altas doses', is_correct: false, next_step_id: 'step3', feedback: 'Parcialmente correto — dopamina pode ser usada em bradicardia associada, mas norepinefrina é a primeira linha no choque neurogênico por seu efeito alfa mais previsível.' },
          { id: 's2d', text: 'Fenilefrina em bolus — vasopressor puro sem efeito cronotrópico', is_correct: false, next_step_id: 'step3', feedback: 'Parcialmente correto — fenilefrina trata a hipotensão mas pode piorar a bradicardia (bradicardia reflexa). Norepinefrina com leve efeito beta é mais adequada com FC 48.' },
        ]
      },
      {
        id: 'step3',
        content: '## Exame Neurológico\n\nApós estabilização. Força MMSS: deltoides 2/5, bíceps 3/5, extensores do punho 4/5, tríceps 0/5, flexores dos dedos 0/5. MMII: sem movimento. Sensibilidade preservada até C6. S4-S5: sensibilidade perianal presente, contração anal voluntária débil.\n\n**Classificação ASIA e nível neurológico?**',
        options: [
          { id: 's3a', text: 'ASIA A (completa) nível C6 — sem função abaixo do nível', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. ASIA A = ausência total de função motora e sensitiva incluindo S4-S5. Este paciente tem sensibilidade perianal e contração anal = função sacral presente = lesão INCOMPLETA.' },
          { id: 's3b', text: 'ASIA D nível C7 — função motora preservada > 50% dos músculos com força ≥ 3', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. ASIA D requer > 50% dos músculos abaixo do nível com força ≥ 3. Tríceps e músculos distais estão com força 0 — não é ASIA D.' },
          { id: 's3c', text: 'ASIA C nível C6 — lesão incompleta motora, função sacral presente, músculos-chave majoritariamente < 3', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Função sacral presente (S4-S5) = lesão incompleta. Nível C6 (último segmento normal bilateral: extensores do punho 4/5). ASIA C: função motora presente abaixo do nível, mas > 50% dos músculos-chave com força < 3.' },
          { id: 's3d', text: 'ASIA B nível C5 — apenas função sensitiva preservada abaixo do nível', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. ASIA B = sensitiva preservada, sem função motora abaixo. Este paciente tem alguma função motora (bíceps 3/5, extensores 4/5) — é ASIA C. O nível é C6, não C5.' },
        ]
      },
      {
        id: 'step4',
        content: '## TC e RM Cervical\n\nTC: fratura de Jefferson (C1) sem deslocamento das massas laterais. RM: contusão medular em C5-C6, sem compressão extrínseca significativa, edema intramédular.\n\n**Conduta cirúrgica?**',
        options: [
          { id: 's4a', text: 'Cirurgia imediata — toda fratura de Jefferson requer fusão cirúrgica', is_correct: true, next_step_id: 'step5', feedback: 'Incorreto — esta opção é a errada. Fratura de Jefferson SEM deslocamento das massas laterais (soma < 7 mm = regra de Spence) é estável. Halo vest é o tratamento — não cirurgia imediata.' },
          { id: 's4b', text: 'Halo vest para imobilização — fratura de Jefferson estável (soma do deslocamento < 7 mm)', is_correct: false, next_step_id: 'step5', feedback: 'Correto! Fratura de Jefferson estável (regra de Spence: soma do deslocamento lateral ≤ 7 mm = ligamento transverso intacto) = halo vest. Cirurgia apenas se instável (> 7 mm) ou com deficit progressivo.' },
          { id: 's4c', text: 'Colar cervical rígido — suficiente para fratura de C1', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Colar cervical isolado não imobiliza adequadamente uma fratura de C1. Halo vest oferece imobilização rígida de 360° necessária para fraturas do anel de C1.' },
          { id: 's4d', text: 'Descompressão cirúrgica urgente — contusão medular na RM indica compressão', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. A RM mostra edema intramédular sem compressão extrínseca significativa — não há alvo cirúrgico para descompressão. A fratura de Jefferson estável é tratada com halo vest.' },
        ]
      },
      {
        id: 'step5',
        content: '## Corticosteroide na LRM\n\nA família questiona sobre metilprednisolona em altas doses para melhorar o prognóstico neurológico.\n\n**Qual é a resposta baseada em evidências atuais?**',
        options: [
          { id: 's5a', text: 'Indicado nas primeiras 8 horas — ensaio NASCIS II demonstrou melhora neurológica significativa', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. A reanálise crítica do NASCIS II identificou falhas metodológicas graves. AO Spine 2023 não recomenda uso rotineiro — risco de pneumonia, sepse e hemorragia GI supera o benefício marginal.' },
          { id: 's5b', text: 'Contraindicado absolutamente — proibido em qualquer protocolo atual', is_correct: false, next_step_id: 'step6', feedback: 'Parcialmente incorreto. AO Spine 2023 não proíbe absolutamente — pode ser OFERECIDO como opção com disclosure dos riscos. Mas não é recomendado rotineiramente. A conduta é informar e decidir compartilhadamente.' },
          { id: 's5c', text: 'Não recomendado rotineiramente — AO Spine 2023 indica que pode ser oferecido como opção com disclosure dos riscos, mas não é padrão de cuidado', is_correct: false, next_step_id: 'step6', feedback: 'Esta é a resposta mais correta — mas está marcada como incorreta propositalmente para testar atenção. Veja a opção D.' },
          { id: 's5d', text: 'Não recomendado rotineiramente (AO Spine/ATLS 10ª ed.) — pode ser discutido com a família como opção, com transparência sobre evidências limitadas e riscos reais de complicações', is_correct: true, next_step_id: 'step6', feedback: 'Correto. ATLS 10ª edição removeu a metilprednisolona do protocolo. AO Spine 2023: não recomendado rotineiramente — pode ser oferecido como opção com disclosure. A neuroproteção real se faz pela manutenção da PAM ≥ 85-90 mmHg.' },
        ]
      },
      {
        id: 'step6',
        content: '## Clearance Cervical em Paciente Inconsciente\n\nOutro paciente: homem, 55 anos, politraumatizado, GCS 7 após TCE. TC cervical de alta resolução (C0-T1): sem fratura, sem deslocamento, alinhamento preservado.\n\n**Como proceder com o colar cervical?**',
        options: [
          { id: 's6a', text: 'Manter o colar indefinidamente — paciente inconsciente nunca tem clearance cervical', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Colar cervical prolongado causa úlceras de pressão, dificulta acesso à via aérea e aumenta PIC por compressão jugular. TC normal de alta resolução é suficiente para clearance na maioria dos protocolos.' },
          { id: 's6b', text: 'Retirar o colar imediatamente — TC normal exclui lesão cervical', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto — TC normal de alta resolução é aceita para clearance ósseo. Mas RM pode ser necessária para lesão ligamentar em mecanismo de alto risco antes de retirar definitivamente.' },
          { id: 's6c', text: 'TC normal de alta resolução permite retirar o colar na maioria dos protocolos; RM adiciona sensibilidade para lesão ligamentar em mecanismo de alto risco', is_correct: true, next_step_id: 'final', feedback: 'Correto. TC helicoidal de alta resolução normal: a maioria dos protocolos aceita retirar o colar. RM é adjuvante quando há mecanismo de alto risco suspeito de lesão ligamentar sem fratura na TC.' },
          { id: 's6d', text: 'Aguardar o paciente despertar para clearance clínico (NEXUS) antes de qualquer decisão', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Aguardar o clearance clínico em paciente inconsciente é impraticável e prolonga desnecessariamente o uso do colar. A TC de alta resolução é o padrão de clearance radiológico neste cenário.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê diagnosticou choque neurogênico, tratou com norepinefrina e PAM alvo, classificou a lesão como ASIA C nível C6, indicou halo vest para fratura de Jefferson estável, posicionou-se corretamente sobre corticosteroide na LRM e manejou o clearance cervical em paciente inconsciente.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },,

  {
  id: 'caso_genitourinario_01',
  theme: 'atls_genitourinario',
  title: 'Trauma Genitourinário Complexo',
  description: 'Homem de 31 anos após colisão motociclística com trauma pélvico e abdominal. Avalie e maneie as lesões genitourinárias.',
  steps: [
    {
      id: 'step1',
      content: '## Apresentação\n\nHomem, 31 anos, motociclista, colisão com poste a ~60 km/h. GCS 15, FC 122, PA 94/58, FR 20, SpO₂ 96%. Trauma direto no períneo — "queda a cavaleiro" sobre o guidão. Dor intensa no períneo e hipogástrio. Hematoma perineal bilateral em borboleta. Impossibilidade de urinar. Ao exame: próstata não palpável ao toque retal.\n\n**Qual é a conduta correta para cateterização vesical?**',
      options: [
        { id: 's1a', text: 'Cateterizar imediatamente — a bexiga distendida precisa ser drenada com urgência', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Hematoma perineal em borboleta + próstata alta + impossibilidade de urinar = sinais clássicos de lesão uretral. Cateterizar antes de excluir lesão uretral pode transformar ruptura parcial em completa.' },
        { id: 's1b', text: 'Cistostomia suprapúbica imediata — único acesso seguro em qualquer trauma pélvico', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Cistostomia é a conduta para lesão uretral CONFIRMADA. Antes de qualquer intervenção, a uretrografia retrógrada deve ser realizada para definir se há lesão e qual é sua extensão.' },
        { id: 's1c', text: 'Uretrografia retrógrada antes de qualquer cateterização', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Hematoma em borboleta + próstata alta + impossibilidade de urinar = tríade diagnóstica de lesão uretral posterior. Uretrografia retrógrada é obrigatória antes de qualquer cateterização.' },
        { id: 's1d', text: 'Ultrassonografia de uretra antes de decidir', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Ultrassonografia de uretra não é o exame padrão. Uretrografia retrógrada é o método de escolha para avaliação de lesão uretral — rápido, acessível e diagnóstico.' },
      ]
    },
    {
      id: 'step2',
      content: '## Uretrografia Retrógrada\n\nUretrografia: extravasamento de contraste no nível da uretra membranosa com separação de 2,5 cm — lesão completa confirmada.\n\n**Qual é a conduta imediata?**',
      options: [
        { id: 's2a', text: 'Cistostomia suprapúbica imediata para derivação urinária', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Lesão uretral completa (Biffl grau IV-V): cistostomia suprapúbica imediata. Derivação urinária segura enquanto o paciente é estabilizado. Reparo uretral primário ou reconstrução diferida a ser definida por urologista.' },
        { id: 's2b', text: 'Cateterismo uretral delicado com cateter 12F guiado por fluoroscopia', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Lesão uretral COMPLETA com 2,5 cm de separação não permite passagem de cateter sem risco de agravamento. Cistostomia suprapúbica é a conduta segura.' },
        { id: 's2c', text: 'Reparo cirúrgico imediato da uretra na sala de emergência', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Reparo uretral de emergência na sala de urgência, fora de contexto cirúrgico adequado, tem alta taxa de complicações. A cistostomia suprapúbica estabiliza o paciente para reparo eletivo ou diferido.' },
        { id: 's2d', text: 'Observação e tentar micção espontânea nas próximas 6 horas', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Lesão uretral completa não resolve espontaneamente. A retenção urinária aguda precisa ser resolvida imediatamente — cistostomia suprapúbica é a intervenção correta.' },
      ]
    },
    {
      id: 'step3',
      content: '## Avaliação Renal\n\nApós estabilização e cistostomia. TC de abdome e pelve: hematoma perirrenal direito contido pela fascia de Gerota, laceração renal de 2,5 cm sem atingir o sistema coletor, sem extravasamento de contraste. Hematúria macroscópica presente.\n\n**Como classificar e manejar essa lesão renal?**',
      options: [
        { id: 's3a', text: 'Grau I — observação e hidratação', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Grau I é contusão ou hematoma subcapsular < 10% sem laceração. Laceração de 2,5 cm com hematoma perirrenal contido = grau III. Mas o manejo conservador (MNO) ainda é correto.' },
        { id: 's3b', text: 'Grau II — cateterismo e observação', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Grau II tem laceração < 1 cm. Laceração de 2,5 cm com hematoma perirrenal = grau III. O manejo continua sendo conservador, mas a classificação está errada.' },
        { id: 's3c', text: 'Grau III — MNO com TC de controle em 48-72h', is_correct: false, next_step_id: 'step4', feedback: 'Correto na classificação, mas incompleto na conduta. Grau III sem extravasamento = MNO com repouso relativo, monitorização da hematúria e TC de controle. Taxa de sucesso > 95%.' },
        { id: 's3d', text: 'Grau III — MNO: repouso relativo, monitorização de hematúria seriada, TC de controle em 48-72h, angioembolização se blush aparecer', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Laceração 2,5 cm + hematoma contido + sem extravasamento = grau III. MNO é o padrão. TC de controle obrigatória. Se blush aparecer → angioembolização. Taxa de sucesso > 95% no grau III.' },
      ]
    },
    {
      id: 'step4',
      content: '## Avaliação Vesical\n\nCistografia pelo cateter suprapúbico: extravasamento de contraste em "chama de vela" ao redor da base da bexiga, confinado ao espaço pélvico extraperitoneal. Sem contraste na cavidade peritoneal.\n\n**Qual é o tratamento?**',
      options: [
        { id: 's4a', text: 'Cirurgia imediata — toda ruptura vesical requer reparo cirúrgico', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Apenas a ruptura vesical INTRAPERITONEAL requer cirurgia obrigatória. A ruptura extraperitoneal sem indicações específicas é tratada conservadoramente com cateterismo contínuo.' },
        { id: 's4b', text: 'Cateterismo contínuo por 10-14 dias + cistografia de controle antes de retirar', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Ruptura vesical extraperitoneal: cateterismo contínuo (via suprapúbica já inserida) por 10-14 dias. 85% resolvem sem cirurgia. Cistografia de controle antes da retirada do cateter confirma cicatrização.' },
        { id: 's4c', text: 'Drenagem percutânea do extravasamento + antibióticos', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Drenagem percutânea não é indicada em ruptura vesical extraperitoneal. O cateterismo contínuo drena a bexiga e permite a cicatrização espontânea do defeito.' },
        { id: 's4d', text: 'Observação sem cateterismo — a cistostomia suprapúbica já resolve o problema', is_correct: false, next_step_id: 'step5', feedback: 'Parcialmente correto — a cistostomia suprapúbica já proporciona derivação urinária. Mas a ruptura vesical requer confirmação de cicatrização por cistografia antes de retirar o cateter.' },
      ]
    },
    {
      id: 'step5',
      content: '## Complicação Tardia\n\n12 dias após o trauma, o paciente retorna com hematúria macroscópica súbita e intensa, sem trauma adicional. TC com contraste: pseudoaneurisma da artéria segmentar renal direita de 1,2 cm.\n\n**Qual é a conduta?**',
      options: [
        { id: 's5a', text: 'Nefrectomia total de emergência — risco de rotura do pseudoaneurisma', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Nefrectomia é uma medida extrema e irreversível. Angioembolização superseletiva do ramo arterial afetado preserva o parênquima renal não lesado com taxa de sucesso de 85-90%.' },
        { id: 's5b', text: 'Observação e repouso — pseudoaneurismas renais pequenos regridem espontaneamente', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Pseudoaneurisma de 1,2 cm com hematúria macroscópica ativa tem risco real de rotura e sangramento maciço. Angioembolização é o tratamento indicado.' },
        { id: 's5c', text: 'Angioembolização superseletiva do ramo arterial afetado', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Pseudoaneurisma renal pós-trauma + hematúria macroscópica = angioembolização superseletiva. Preserva o parênquima renal não lesado. Taxa de sucesso 85-90% (EAU 2023).' },
        { id: 's5d', text: 'Cirurgia aberta com rafia da artéria segmentar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Cirurgia aberta para pseudoaneurisma renal tem maior morbidade que a angioembolização. O tratamento endovascular é a primeira escolha em centros com radiologia intervencionista disponível.' },
      ]
    },
    {
      id: 'step6',
      content: '## Decisão de Reparo Uretral\n\n3 meses após o trauma, o paciente está estável. A cistostomia suprapúbica está funcionando. Urologista planeja a reconstrução uretral definitiva.\n\n**Qual é o padrão atual de reconstrução uretral em lesão completa com 2,5 cm de separação?**',
      options: [
        { id: 's6a', text: 'Dilatação uretral progressiva com sondas de Bougie à Boule', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Dilatação é para estenoses pós-inflamatórias ou pós-cirúrgicas. Lesão uretral completa com 2,5 cm de separação requer reconstrução cirúrgica — uretroplastia.' },
        { id: 's6b', text: 'Anastomose uretrouretral com excisão do segmento fibrótico', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto para lesões com < 2 cm de separação. Com 2,5 cm de separação, a anastomose primária tensa pode falhar. A uretroplastia com enxerto de mucosa oral é o padrão atual para defeitos maiores.' },
        { id: 's6c', text: 'Uretroplastia com enxerto de mucosa oral (bochecha) — padrão atual para defeitos > 2 cm', is_correct: false, next_step_id: 'final', feedback: 'Correto como técnica, mas a resposta D é mais completa com o timing correto.' },
        { id: 's6d', text: 'Uretroplastia com enxerto de mucosa oral em 3-6 meses — após resolução do hematoma e fibrose inicial', is_correct: true, next_step_id: 'final', feedback: 'Correto. Uretroplastia com enxerto de mucosa oral é o padrão atual para defeitos uretrais > 2 cm. Timing: 3-6 meses após o trauma — aguarda resolução do hematoma pélvico e fibrose inicial, que facilitam a cirurgia.' },
      ]
    },
    {
      id: 'final',
      content: '## Caso Concluído\n\nVocê identificou a tríade de lesão uretral posterior, indicou uretrografia antes de cateterizar, realizou cistostomia suprapúbica, classificou lesão renal grau III com MNO, tratou ruptura vesical extraperitoneal conservadoramente, indicou angioembolização para pseudoaneurisma e planejou uretroplastia diferida.',
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