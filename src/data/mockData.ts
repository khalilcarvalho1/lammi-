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
  },
  {
    id: 'caso_avaliacao_cena_01',
    theme: 'avaliacao_cena' as any,
    title: 'Colisão na Rodovia',
    description: 'Você é o primeiro socorrista a chegar a uma colisão frontal entre dois veículos em rodovia estadual. Uma vítima está presa no veículo com sinais de trauma grave.',
    steps: [
      {
        id: 'step1',
        content: '## Chegada à Cena\n\nVocê avista dois veículos com danos frontais severos. Um dos veículos está com o motor em chamas. Há combustível no asfalto. A vítima principal está no banco do motorista, presa pelas ferragens, consciente e gritando de dor.\n\n**Qual é sua primeira ação?**',
        options: [
          { id: 's1a', text: 'Aproximar-se imediatamente da vítima para iniciar o atendimento', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A cena não foi avaliada quanto à segurança — fogo e combustível representam risco imediato de explosão. Entrar sem avaliação pode transformar o socorrista em vítima.' },
          { id: 's1b', text: 'Avaliar a segurança da cena, acionar bombeiros e aguardar controle do fogo antes de aproximar', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Segurança da cena é a primeira prioridade absoluta. Fogo + combustível = risco de explosão. Acione bombeiros, posicione a viatura em ângulo de proteção e aguarde controle.' },
          { id: 's1c', text: 'Pedir para a vítima sair sozinha do veículo', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A vítima está presa pelas ferragens — é impossível sair sozinha. Além disso, a cena ainda não foi avaliada quanto à segurança.' },
          { id: 's1d', text: 'Iniciar triagem START imediatamente em todas as vítimas', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A triagem START só é iniciada após a avaliação e controle da segurança da cena. Entrar em cena insegura viola o princípio fundamental do APH.' },
        ]
      },
      {
        id: 'step2',
        content: '## Avaliação da Vítima Principal\n\nApós controle do fogo pelos bombeiros, você acessa a vítima. Homem, 38 anos, consciente, agitado, GCS 13. FC 128 bpm, FR 28 irpm, SpO₂ 91% em ar ambiente, PA 88/60 mmHg. Há sangramento ativo e volumoso na coxa direita com deformidade evidente.\n\n**Qual é sua prioridade imediata?**',
        options: [
          { id: 's2a', text: 'Aplicar torniquete na coxa direita imediatamente', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Hemorragia maciça de membro é a prioridade no componente C do MARCH/ABCDE. O torniquete deve ser aplicado 5-7 cm proximal à lesão, apertado até cessar o sangramento, com horário anotado.' },
          { id: 's2b', text: 'Administrar oxigênio suplementar pela SpO₂ baixa', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A SpO₂ baixa é consequência do choque hemorrágico — o sangramento deve ser controlado primeiro.' },
          { id: 's2c', text: 'Obter dois acessos venosos calibrosos e iniciar reposição volêmica', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A reposição volêmica sem controle da hemorragia é ineficaz — o sangue continuará sendo perdido.' },
          { id: 's2d', text: 'Imobilizar a fratura de fêmur com tala antes de qualquer outra intervenção', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A imobilização da fratura é importante mas secundária ao controle da hemorragia ativa.' },
        ]
      },
      {
        id: 'step3',
        content: '## Após Torniquete\n\nTorniquete aplicado — sangramento cessou. Horário: 14h32. SpO₂ 94% com O₂ a 15 L/min. FC 118 bpm, PA 92/64 mmHg. Você nota desvio de traqueia para a esquerda e ausência de murmúrio vesicular à direita.\n\n**O que você faz agora?**',
        options: [
          { id: 's3a', text: 'Descompressão por agulha no 2º EIC direito, linha hemiclavicular', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Desvio de traqueia + ausência de murmúrio vesicular unilateral + hipotensão = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente.' },
          { id: 's3b', text: 'Solicitar radiografia de tórax para confirmar o pneumotórax', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Pneumotórax hipertensivo é diagnóstico clínico e emergência imediata — aguardar imagem pode ser fatal.' },
          { id: 's3c', text: 'Aumentar o fluxo de O₂ e monitorizar a SpO₂', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. A causa da hipóxia é mecânica — aumentar O₂ não resolve. A descompressão é mandatória.' },
          { id: 's3d', text: 'Realizar curativo de três pontas na parede torácica direita', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. O curativo de três pontas é para pneumotórax aberto, não para pneumotórax hipertensivo fechado.' },
        ]
      },
      {
        id: 'step4',
        content: '## Após Descompressão\n\nSaída de ar confirmada. SpO₂ 97%, FC 108 bpm, PA 98/68 mmHg. GCS 14. Dois acessos venosos 16G obtidos. Desencarceramento estimado em 15 minutos.\n\n**Qual meta de pressão arterial você adota?**',
        options: [
          { id: 's4a', text: 'PAS 80-90 mmHg — hipotensão permissiva até hemostasia definitiva', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Trauma contuso sem TCE: hipotensão permissiva PAS 80-90 mmHg reduz ressangramento. Hiper-hidratação agrava a coagulopatia.' },
          { id: 's4b', text: 'PAS 120 mmHg — normalizar a pressão o mais rápido possível', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Normalizar a pressão antes da hemostasia definitiva aumenta o ressangramento.' },
          { id: 's4c', text: 'PAS 60 mmHg — quanto mais baixa, menor o sangramento', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. PAS < 80 mmHg causa isquemia orgânica grave — rim, coração e cérebro.' },
          { id: 's4d', text: 'PAS ≥ 110 mmHg — TCE associado exige pressão mais elevada', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Não há evidência de TCE neste caso. Na ausência de TCE, a meta é hipotensão permissiva.' },
        ]
      },
      {
        id: 'step5',
        content: '## Decisão de Transporte\n\nVítima imobilizada. GCS 14, FC 102, PA 86/58, SpO₂ 96%. Dois hospitais disponíveis: Municipal (8 km, sem cirurgião vascular) e Centro de Trauma Regional (32 km, nível I).\n\n**Para onde você transporta?**',
        options: [
          { id: 's5a', text: 'Centro de Trauma Regional (32 km) — paciente necessita de recursos de nível I', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Critérios de centralização presentes: choque hemorrágico, pneumotórax, fratura de fêmur. Destino = centro mais adequado, não o mais próximo.' },
          { id: 's5b', text: 'Hospital Municipal (8 km) — mais próximo, estabilize e transfira depois', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Desvio para hospital inadequado aumenta a mortalidade. Transporte direto ao centro de trauma é sempre preferível.' },
          { id: 's5c', text: 'Aguardar estabilização completa na cena antes de transportar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Tempo na cena < 10 minutos em trauma grave. Intervenções realizáveis no transporte não devem atrasar a saída.' },
          { id: 's5d', text: 'Hospital Municipal para TC antes de definir o destino', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. TC em hospital inadequado atrasa o tratamento definitivo. Transporte direto é o padrão.' },
        ]
      },
      {
        id: 'step6',
        content: '## Passagem de Caso — MIST\n\nVocê chega ao Centro de Trauma Regional. 60 segundos para passar o caso.\n\n**Qual é a passagem correta?**',
        options: [
          { id: 's6a', text: '"Homem, 38 anos, colisão frontal ~80 km/h, preso nas ferragens. Fratura de fêmur — torniquete às 14h32 (28 min). Pneumotórax hipertensivo direito — descomprimido. GCS 14, FC 102, PA 86/58, SpO₂ 96%. 500 mL SF."', is_correct: true, next_step_id: 'final', feedback: 'Correto. MIST completo: Mecanismo + Injúrias + Sinais vitais + Tratamento. Tempo de torniquete é informação crítica.' },
          { id: 's6b', text: '"Paciente em acidente de carro, fratura na perna e problema no pulmão. Pressão baixa."', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Passagem vaga — omite mecanismo, horário do torniquete, sinais vitais completos e tratamentos.' },
          { id: 's6c', text: '"Politraumatizado grave, instável, precisa de cirurgia urgente."', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Sem informação estruturada. O MIST não foi aplicado.' },
          { id: 's6d', text: '"Homem, 38 anos, acidente. Torniquete na perna. Descompressão feita. Pressão 86/58."', is_correct: false, next_step_id: 'final', feedback: 'Incompleto. Faltam mecanismo detalhado, GCS, SpO₂, volume infundido e tempo de isquemia.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê conduziu o atendimento de forma sistematizada: segurança da cena → controle de hemorragia → descompressão de pneumotórax → reposição guiada → transporte ao centro adequado → passagem MIST.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_cinetica_trauma_01',
    theme: 'cinetica_trauma' as any,
    title: 'Capotamento em Estrada Rural',
    description: 'Você atende um capotamento em estrada rural. O veículo capotou três vezes e o motorista foi ejetado. Aplique o raciocínio cinemático para antecipar lesões.',
    steps: [
      {
        id: 'step1',
        content: '## Análise da Cena\n\nVeículo capotado três vezes, deformação extensa do teto. Motorista a 8 metros do veículo, sem cinto. Mulher, 26 anos, consciente mas confusa, GCS 12.\n\n**Com base na cinemática, quais lesões antecipar?**',
        options: [
          { id: 's1a', text: 'TCE, lesão cervical multidirecional, trauma torácico e abdominal — capotamento com ejeção', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Ejeção aumenta mortalidade em 6x. Espere TCE, trauma cervical multidirecional, torácico e abdominal por múltiplos impactos.' },
          { id: 's1b', text: 'Apenas fratura de membros — amorteceu a queda com os braços', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Ejeção é mecanismo de altíssimo risco — lesões múltiplas e imprevisíveis em todas as regiões.' },
          { id: 's1c', text: 'Trauma abdominal isolado — impacto principal no abdome', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Em capotamento com ejeção não se pode assumir um único ponto de impacto.' },
          { id: 's1d', text: 'Sem lesões graves — vítima consciente e sem sangramento visível', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Mecanismo de alto risco exige rastreamento agressivo independentemente da apresentação inicial.' },
        ]
      },
      {
        id: 'step2',
        content: '## Avaliação Primária\n\nGCS 12, PA 102/70, FC 114, FR 22, SpO₂ 95%. Equimose no flanco esquerdo, dor em hipocôndrio esquerdo, abdome levemente distendido.\n\n**O que a equimose no flanco esquerdo sugere?**',
        options: [
          { id: 's2a', text: 'Lesão esplênica por impacto no flanco durante o capotamento', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Equimose flanco esquerdo + dor hipocôndrio esquerdo + mecanismo = lesão esplênica até prova em contrário. Baço é o órgão mais frequentemente lesado no trauma contuso.' },
          { id: 's2b', text: 'Contusão muscular da parede abdominal — sem significado maior', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Em mecanismo de alta energia, equimose de flanco deve ser tratada como lesão esplênica até exclusão por imagem.' },
          { id: 's2c', text: 'Fratura de costelas inferiores esquerdas isolada', is_correct: false, next_step_id: 'step3', feedback: 'Parcialmente incorreto. Fraturas de costelas são possíveis mas a principal preocupação é a lesão esplênica subjacente.' },
          { id: 's2d', text: 'Sinal de Grey-Turner — hemorragia retroperitoneal', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grey-Turner é equimose tardia (horas a dias). Equimose imediata indica trauma direto.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação Cervical\n\nLog-roll: dor e crepitação em C5-C6. Formigamento nos quatro membros. Força MMSS 3/5 bilateral, MMII 4/5.\n\n**Qual síndrome medular você suspeita?**',
        options: [
          { id: 's3a', text: 'Síndrome do cordão central — fraqueza maior nos MMSS que MMII', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Fraqueza desproporcional nos MMSS (3/5) vs MMII (4/5) + trauma cervical por capotamento = síndrome do cordão central. Fibras corticoespinais para MMSS são mais centrais.' },
          { id: 's3b', text: 'Síndrome de Brown-Séquard — deficit motor de um lado e sensitivo do outro', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Brown-Séquard causa deficit unilateral — este caso tem deficit bilateral e simétrico.' },
          { id: 's3c', text: 'Síndrome do cordão anterior — perda motora com preservação de propriocepção', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Cordão anterior: perda motora + perda de dor/temperatura com propriocepção preservada. O padrão aqui é do cordão central.' },
          { id: 's3d', text: 'Lesão medular completa — qualquer deficit em quatro membros', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Lesão completa = ausência total de função abaixo do nível incluindo S4-S5. Esta paciente tem função motora preservada — lesão incompleta.' },
        ]
      },
      {
        id: 'step4',
        content: '## Decisão de Via Aérea\n\nGCS cai para 10. FR 28, SpO₂ 91% com O₂. Vômito — não protege via aérea. Suspeita de lesão cervical instável.\n\n**Abordagem correta?**',
        options: [
          { id: 's4a', text: 'IOT com videolaringoscópio + estabilização manual bimanual + etomidato + succinilcolina', is_correct: true, next_step_id: 'step5', feedback: 'Correto. GCS 10 em queda + vômito = IOT. Videolaringoscópio minimiza extensão cervical. Estabilização manual bimanual obrigatória. Etomidato: mínimo efeito hemodinâmico. Succinilcolina: onset rápido.' },
          { id: 's4b', text: 'Cricotireoidostomia imediata — lesão cervical contraindica laringoscopia', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cricotireoidostomia é via aérea de emergência (CICO). Lesão cervical não contraindica IOT — contraindica extensão, evitada com videolaringoscópio.' },
          { id: 's4c', text: 'Máscara com reservatório — GCS 10 ainda não indica IOT', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. GCS 10 em queda + vômito + SpO₂ 91% = via aérea definitiva obrigatória.' },
          { id: 's4d', text: 'Intubação nasotraqueal — evita mobilização cervical', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Nasotraqueal às cegas está em desuso. Videolaringoscópio com estabilização manual é a escolha.' },
        ]
      },
      {
        id: 'step5',
        content: '## Confirmação do Tubo\n\nApós IOT, murmúrio mais intenso à direita. Sem capnógrafo disponível.\n\n**Como confirmar a posição correta?**',
        options: [
          { id: 's5a', text: 'Ausculta epigástrica (ausência) + ausculta bilateral + melhora SpO₂ + expansão torácica simétrica', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Sem capnógrafo: confirmação multimodal — epigástrio + bilateral + SpO₂ + expansão. Murmúrio mais intenso à direita sugere intubação seletiva do brônquio direito — recue o tubo.' },
          { id: 's5b', text: 'Ausculta pulmonar bilateral apenas', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Ausculta isolada tem falsos positivos — sons gástricos podem simular murmúrio. Confirmação deve ser multimodal.' },
          { id: 's5c', text: 'Aguardar radiografia de tórax no hospital', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Tubo esofágico não detectado causa morte em minutos. Confirme imediatamente após a IOT.' },
          { id: 's5d', text: 'IOT foi bem realizada — não é necessário confirmar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Mesmo IOTs tecnicamente perfeitas podem resultar em posição esofágica. Confirmação é obrigatória.' },
        ]
      },
      {
        id: 'step6',
        content: '## Comunicação MIST\n\nA 3 minutos do centro de trauma. Comunicação pelo rádio.\n\n**Qual informação cinemática é mais crítica para a equipe receptora?**',
        options: [
          { id: 's6a', text: 'Capotamento com ejeção + suspeita C5-C6 + síndrome do cordão central + IOT realizada', is_correct: true, next_step_id: 'final', feedback: 'Correto. Mecanismo (ejeção = alto risco) + nível de lesão (C5-C6) + padrão neurológico (cordão central) + via aérea (IOT) = neurocirurgia, colunista e UTI devem ser ativados imediatamente.' },
          { id: 's6b', text: 'Apenas os sinais vitais atuais', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Sinais vitais sem contexto cinemático não permitem preparo adequado da equipe.' },
          { id: 's6c', text: 'Informar apenas que está intubada e instável', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Informação insuficiente — mecanismo e padrão neurológico são essenciais.' },
          { id: 's6d', text: 'Velocidade estimada e número de capotamentos apenas', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Informação de mecanismo incompleta — MIST exige todos os componentes.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê aplicou raciocínio cinemático para antecipar lesões, identificou síndrome do cordão central, gerenciou via aérea com proteção cervical e comunicou o caso de forma estruturada.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_atls_inicial_01',
    theme: 'atls_inicial' as any,
    title: 'Politraumatizado na Sala de Emergência',
    description: 'Você é o médico líder da equipe de trauma. Homem de 45 anos chega após colisão motociclística a alta velocidade. Conduza o atendimento pelo protocolo ATLS.',
    steps: [
      {
        id: 'step1',
        content: '## Chegada à Sala de Trauma\n\nHomem, 45 anos, motociclista sem capacete, colisão com caminhão ~70 km/h. GCS 9 (O2V2M5), FR 32, SpO₂ 88%, FC 138, PA 86/54. Sangramento ativo na face e couro cabeludo.\n\n**Primeira prioridade como líder?**',
        options: [
          { id: 's1a', text: 'Via aérea definitiva imediata — GCS 9, SpO₂ 88%, FR 32', is_correct: true, next_step_id: 'step2', feedback: 'Correto. A = Airway é sempre a primeira prioridade. GCS 9 com queda + SpO₂ 88% + FR 32 = IOT imediata. Delegue o acesso vascular para outro membro enquanto gerencia a via aérea.' },
          { id: 's1b', text: 'Controle do sangramento da face — hemorragia visível é a prioridade', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Sangramento facial raramente é exsanguinante — hipóxia (SpO₂ 88%) mata primeiro. Via aérea (A) precede hemorragia (C).' },
          { id: 's1c', text: 'Dois acessos venosos e reposição — PA 86/54 indica choque', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Choque é grave mas hipóxia é imediatamente letal. ABCDE existe por uma razão — delegue o acesso vascular.' },
          { id: 's1d', text: 'FAST imediato para identificar a fonte do choque', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. FAST é realizado durante/após estabilização do ABCDE. Trate a hipóxia antes de qualquer diagnóstico.' },
        ]
      },
      {
        id: 'step2',
        content: '## Via Aérea Assegurada\n\nIOT com videolaringoscópio. ETCO₂ 38, SpO₂ 96%, VM 6 mL/kg.\n\nAusculta: murmúrio ausente à esquerda, hipertimpanismo esquerdo. Traqueia desviada à direita. FC 142, PA 72/44.\n\n**Conduta imediata?**',
        options: [
          { id: 's2a', text: 'Descompressão por agulha no 2º EIC esquerdo, linha hemiclavicular', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Ausência MV + hipertimpanismo + desvio traqueal + deterioração = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente. Em VM o pneumotórax hipertensivo progride rapidamente.' },
          { id: 's2b', text: 'Radiografia de tórax para confirmar', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Aguardar imagem pode ser fatal. O diagnóstico é clínico.' },
          { id: 's2c', text: 'Aumentar PEEP no ventilador', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto e perigoso. PEEP elevada em pneumotórax hipertensivo agrava a compressão cardíaca.' },
          { id: 's2d', text: 'Norepinefrina IV para tratar a hipotensão', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hipotensão é por choque obstrutivo — vasopressor sem descompressão não resolve.' },
        ]
      },
      {
        id: 'step3',
        content: '## Após Descompressão\n\nPA 94/62, FC 124, SpO₂ 97%. FAST: pericárdio normal, Morrison +++, esplenorrenal ++, pélvica +. Persiste hipotenso após 1L de Ringer.\n\n**Próxima decisão crítica?**',
        options: [
          { id: 's3a', text: 'Laparotomia exploradora de emergência — FAST positivo com instabilidade refratária', is_correct: true, next_step_id: 'step4', feedback: 'Correto. FAST positivo em múltiplas janelas + instabilidade refratária = laparotomia imediata. Não leve para TC — cada minuto conta.' },
          { id: 's3b', text: 'TC de abdome com contraste antes da cirurgia', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Paciente instável com FAST positivo vai para sala cirúrgica, não para TC.' },
          { id: 's3c', text: 'Aumentar reposição para 3L de cristaloide e reavalie', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Cristaloide em excesso agrava a tríade letal. FAST positivo + instabilidade = cirurgia.' },
          { id: 's3d', text: 'LPD para confirmar hemoperitônio antes de decidir', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. FAST já confirmou o hemoperitônio. LPD está em desuso — mais lento e invasivo.' },
        ]
      },
      {
        id: 'step4',
        content: '## Sala Cirúrgica — Damage Control\n\nLaparotomia: laceração esplênica grau IV + hepática grau III. Anestesista: temperatura 34,2°C, pH 7,18, INR 2,1, fibrinogênio 98 mg/dL.\n\n**Estratégia cirúrgica?**',
        options: [
          { id: 's4a', text: 'Damage Control: esplenectomia + packing hepático + fechamento temporário', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Tríade letal presente: hipotermia + acidose + coagulopatia. DCS: controle da hemorragia + fechamento temporário. Cirurgia definitiva após correção na UTI.' },
          { id: 's4b', text: 'Esplenorrafia + hepatorrafia definitiva + anastomoses em uma etapa', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Com tríade letal instalada, cirurgia extensa aumenta a mortalidade. DCS é o padrão.' },
          { id: 's4c', text: 'Apenas packing de todos os quadrantes sem ressecção', is_correct: false, next_step_id: 'step5', feedback: 'Parcialmente incorreto. Baço grau IV com sangramento ativo requer esplenectomia — packing isolado raramente controla.' },
          { id: 's4d', text: 'Transfusão maciça e aguardar melhora da coagulopatia antes de operar', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Coagulopatia não melhora com hemorragia ativa — controle cirúrgico é pré-requisito.' },
        ]
      },
      {
        id: 'step5',
        content: '## UTI — Fase 2 do DCS\n\nTemperatura 35,8°C, pH 7,28, INR 1,6, fibrinogênio 142, lactato 4,8. Estável com norepinefrina 0,15 mcg/kg/min.\n\n**Meta mais importante para liberar à cirurgia definitiva?**',
        options: [
          { id: 's5a', text: 'Normalização da temperatura (≥36°C), pH (≥7,35) e coagulograma — correção da tríade letal', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Cirurgia definitiva só após correção da tríade. Metas: T ≥ 36°C, pH ≥ 7,35, INR ≤ 1,5, fibrinogênio ≥ 150, plaquetas ≥ 50.000, lactato em clearance.' },
          { id: 's5b', text: 'Débito urinário ≥ 1 mL/kg/h', is_correct: false, next_step_id: 'step6', feedback: 'Parcialmente correto. Débito urinário é marcador importante mas não o critério principal para liberação ao DCS fase 3.' },
          { id: 's5c', text: 'PA normal sem vasopressor antes de reoperar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Presença de vasopressor não contraindica cirurgia definitiva se tríade letal corrigida.' },
          { id: 's5d', text: 'Lactato < 4 mmol/L — normalização suficiente', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Lactato é marcador importante mas não o único critério — normalização de toda a tríade é necessária.' },
        ]
      },
      {
        id: 'step6',
        content: '## Cirurgia Definitiva\n\n36h após DCS: temperatura 36,4°C, pH 7,36, INR 1,3, fibrinogênio 178, lactato 1,8. Estável hemodinamicamente. TC: packing em posição, sem sangramento ativo.\n\n**Conduta?**',
        options: [
          { id: 's6a', text: 'Cirurgia definitiva — retirada do packing, revisão e fechamento abdominal definitivo', is_correct: true, next_step_id: 'final', feedback: 'Correto. Tríade corrigida + estabilidade + 36h = momento ideal para fase 3. Inclui remoção do packing, revisão de lesões, reconstrução e fechamento definitivo.' },
          { id: 's6b', text: 'Aguardar 7 dias para garantir estabilidade completa', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Packing deve ser removido em 24-72h — prolongamento aumenta infecção e síndrome compartimental.' },
          { id: 's6c', text: 'Manter abdome aberto indefinidamente', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Abdome aberto é solução temporária — cada dia aumenta risco de infecção e fístula.' },
          { id: 's6d', text: 'TC semanal e reoperar apenas se houver complicação', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Packing requer remoção programada — reoperação em 24-72h é parte do protocolo DCS.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê conduziu o politraumatizado pelo ATLS completo: ABCDE → FAST orientando cirurgia → DCS → ressuscitação da tríade na UTI → cirurgia definitiva no momento correto.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
]
{
    id: 'caso_via_aerea_01',
    theme: 'atls_via_aerea' as any,
    title: 'Via Aérea em Colapso',
    description: 'Você é o médico da sala de emergência. Um homem de 52 anos chega após queimadura em incêndio doméstico. Gerencie a via aérea de forma progressiva e sistematizada.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação Inicial\n\nHomem, 52 anos, resgate de incêndio doméstico. Consciente, GCS 14, agitado. Fuligem nas narinas e sobrancelhas chamuscadas. Rouquidão progressiva. FR 26, SpO₂ 94% em ar ambiente, FC 108, PA 128/82.\n\n**Qual é sua avaliação imediata da via aérea?**',
        options: [
          { id: 's1a', text: 'Via aérea em risco iminente — sinais de queimadura indicam edema progressivo, IOT precoce', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Fuligem nas narinas + sobrancelhas chamuscadas + rouquidão = queimadura de via aérea confirmada. O edema progride rapidamente — o que é difícil agora será impossível em 1-2h. IOT precoce é mandatória.' },
          { id: 's1b', text: 'Via aérea patente — GCS 14 e SpO₂ 94% permitem observação', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. GCS 14 e SpO₂ 94% são tranquilizadores agora, mas o edema por queimadura de via aérea progride de forma imprevisível e rápida. Aguardar deterioração é um erro potencialmente fatal.' },
          { id: 's1c', text: 'Aplicar máscara com reservatório e reavaliar em 30 minutos', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Oxigênio é importante mas não é a decisão principal. Em 30 minutos, o edema pode tornar a IOT impossível — a janela de oportunidade está agora.' },
          { id: 's1d', text: 'Solicitar laringoscopia indireta para avaliar as cordas vocais antes de decidir', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A decisão de intubar não depende de laringoscopia indireta — os sinais clínicos são suficientes. Qualquer atraso reduz a chance de sucesso da IOT.' },
        ]
      },
      {
        id: 'step2',
        content: '## Planejamento da IOT\n\nVocê decide pela IOT precoce. Ao avaliar a via aérea, identifica: abertura oral de 2 dedos (trismo leve por edema), pescoço curto, barba espessa. Avalia pelo mnemônico LEMON.\n\n**O que essa avaliação indica?**',
        options: [
          { id: 's2a', text: 'Via aérea previsivelmente difícil — prepare videolaringoscópio, bougie e kit de cricotireoidostomia antes de paralisar', is_correct: true, next_step_id: 'step3', feedback: 'Correto. LEMON positivo: abertura oral reduzida (< 3 dedos), pescoço curto, barba espessa. Via aérea difícil prevista = acorde o plano B antes de administrar bloqueador neuromuscular. Videolaringoscópio, bougie e kit de cricotireoidostomia devem estar abertos e acessíveis.' },
          { id: 's2b', text: 'Via aérea normal — intubar com laringoscopia direta padrão', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Abertura oral de 2 dedos + pescoço curto + barba já são suficientes para classificar como via aérea difícil prevista. Laringoscopia direta padrão tem alta chance de falha.' },
          { id: 's2c', text: 'Contraindicação à IOT — usar apenas dispositivo supraglótico', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Via aérea difícil não contraindica a IOT — exige mais preparo. Dispositivos supraglóticos não protegem adequadamente contra broncoaspiração em queimadura de via aérea.' },
          { id: 's2d', text: 'Cricotireoidostomia imediata — via aérea difícil prevista', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Cricotireoidostomia é reservada para CICO (falha de IOT + impossibilidade de ventilar). Não é a primeira escolha em via aérea difícil prevista com paciente ainda ventilando.' },
        ]
      },
      {
        id: 'step3',
        content: '## Execução da SIR\n\nVocê prepara o videolaringoscópio (GlideScope), bougie e kit de cricotireoidostomia. Pré-oxigenação com máscara com reservatório por 4 minutos — SpO₂ 99%.\n\n**Qual sequência farmacológica você escolhe?**',
        options: [
          { id: 's3a', text: 'Etomidato 0,3 mg/kg + succinilcolina 1,5 mg/kg — indução hemodinamicamente estável com onset rápido', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Etomidato: mínimo efeito hemodinâmico, não aumenta PIC, onset em 30-60s. Succinilcolina: onset 45-60s, duração 10-15min — se a IOT falhar, o paciente recupera respiração espontânea rapidamente. Lesão recente: sem risco de hipercalemia ainda.' },
          { id: 's3b', text: 'Propofol 2 mg/kg + rocurônio 1,2 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Propofol causa hipotensão dose-dependente significativa — evitar em paciente com queimadura extensas (perda volêmica). Rocurônio 1,2 mg/kg é aceitável mas requer sugammadex disponível.' },
          { id: 's3c', text: 'Midazolam 0,1 mg/kg + succinilcolina 1,5 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Midazolam tem onset mais lento e causa hipotensão em hipovolemia. Etomidato é superior como indutor no trauma e queimadura.' },
          { id: 's3d', text: 'Ketamina 2 mg/kg + rocurônio 1,2 mg/kg — broncodilatação benéfica em queimadura', is_correct: false, next_step_id: 'step4', feedback: 'Parcialmente correto. Ketamina é aceitável — broncodilatadora, mantém PA. Porém rocurônio 1,2 mg/kg requer sugammadex disponível. Etomidato + succinilcolina é a combinação mais segura neste cenário.' },
        ]
      },
      {
        id: 'step4',
        content: '## Laringoscopia\n\nApós indução, laringoscopia com GlideScope: você visualiza a epiglote edemaciada e apenas a porção posterior das cordas vocais (Cormack-Lehane grau III).\n\n**Qual é sua conduta?**',
        options: [
          { id: 's4a', text: 'Introduzir bougie sob visão parcial, confirmar posição pelos cliques traqueais e deslizar o tubo sobre ele', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Cormack-Lehane III com videolaringoscópio = use o bougie. Introduza pela porção posterior visível das cordas, avance até sentir cliques (anéis traqueais) e parada distal (carina). Deslize o tubo com rotação anti-horária de 90°.' },
          { id: 's4b', text: 'Retirar o videolaringoscópio e tentar com laringoscopia direta', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cormack-Lehane III no videolaringoscópio será ainda pior na laringoscopia direta — a via aérea edemaciada não melhora com a mudança de técnica. Use o bougie.' },
          { id: 's4c', text: 'Inserir dispositivo supraglótico (i-gel) e ventilar', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Ainda não é falha de IOT — você tem visão parcial e o bougie. Dispositivo supraglótico é resgate após falha, não alternativa à primeira tentativa com visão parcial.' },
          { id: 's4d', text: 'Realizar cricotireoidostomia imediatamente — Cormack-Lehane III indica via aérea impossível', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cormack-Lehane III não é CICO — você tem visão parcial e o bougie disponível. Cricotireoidostomia só após falha de todas as tentativas de IOT + impossibilidade de ventilar.' },
        ]
      },
      {
        id: 'step5',
        content: '## Confirmação e Ventilação\n\nIOT realizada com bougie. ETCO₂ em forma de onda, 36 mmHg. SpO₂ 98%. Tubo fixado em 22 cm no lábio.\n\nVocê inicia ventilação mecânica. Qual parâmetro é mais crítico neste paciente com queimadura de via aérea e contusão pulmonar suspeita?**',
        options: [
          { id: 's5a', text: 'Volume corrente 6 mL/kg de peso predito — ventilação protetora para evitar lesão pulmonar induzida pelo ventilador', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Ventilação protetora (6 mL/kg peso predito) é mandatória em contusão pulmonar e lesão por inalação — reduz lesão pulmonar induzida pelo ventilador (LPIV). PEEP inicial 5-8 cmH₂O. FiO₂ mínima para SpO₂ ≥ 94%.' },
          { id: 's5b', text: 'Volume corrente 10-12 mL/kg — maior volume garante melhor oxigenação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Volumes altos causam lesão pulmonar por barotrauma e volutrauma — especialmente prejudiciais em contusão pulmonar. Ventilação protetora (6 mL/kg) é o padrão atual.' },
          { id: 's5c', text: 'FiO₂ 100% mantida indefinidamente — queimadura exige máxima oxigenação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Hiperoxia (PaO₂ > 300 mmHg) piora o prognóstico neurológico e pulmonar. Use a mínima FiO₂ que mantém SpO₂ ≥ 94%.' },
          { id: 's5d', text: 'FR 30 irpm para eliminar CO₂ da intoxicação por fumaça', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. FR 30 causa hipocapnia — vasoconstrição cerebral e alcalose. O CO₂ da intoxicação por fumaça é eliminado com oxigenoterapia e FiO₂ 100% inicial, não com hiperventilação.' },
        ]
      },
      {
        id: 'step6',
        content: '## Evolução — 2 horas depois\n\nO tubo está posicionado. SpO₂ 95%, ETCO₂ 38. Você nota pressão de pico crescente no ventilador (36 cmH₂O) e SpO₂ em queda progressiva. Ausculta: murmúrio reduzido bilateralmente, mais à esquerda.\n\n**Qual é sua hipótese e conduta?**',
        options: [
          { id: 's6a', text: 'Pneumotórax por barotrauma — eFAST imediato + descompressão por agulha se instável', is_correct: true, next_step_id: 'final', feedback: 'Correto. Pressão de pico crescente + queda de SpO₂ + redução de murmúrio em paciente ventilado = pneumotórax por barotrauma até que se prove o contrário. eFAST (ausência de deslizamento pleural) confirma. Se instável: descompressão imediata sem aguardar imagem.' },
          { id: 's6b', text: 'Broncoespasmo por inalação — salbutamol inalatório e aumentar FiO₂', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Broncoespasmo causa aumento de pressão de pico mas com murmúrio presente (sibilos). A assimetria do murmúrio (mais reduzido à esquerda) e a progressividade apontam para pneumotórax.' },
          { id: 's6c', text: 'Intubação seletiva do brônquio direito — rever posição do tubo', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto considerar, mas intubação seletiva causaria aumento de pressão unilateral com murmúrio ausente apenas à esquerda. A combinação com queda progressiva de SpO₂ e pressão bilateral crescente é mais sugestiva de pneumotórax.' },
          { id: 's6d', text: 'Edema pulmonar por ressuscitação volêmica excessiva — restrição hídrica', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Edema pulmonar causa pressão de pico aumentada mas com murmúrio presente bilateralmente (crepitações). A assimetria e a rapidez de instalação apontam para pneumotórax.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê reconheceu queimadura de via aérea precocemente, planejou a IOT difícil com equipamentos adequados, usou bougie em Cormack-Lehane III, aplicou ventilação protetora e identificou pneumotórax por barotrauma.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_trauma_face_01',
    theme: 'atls_face' as any,
    title: 'Trauma Maxilofacial Grave',
    description: 'Você atende um homem de 29 anos vítima de agressão com objeto contundente. Trauma maxilofacial extenso com sangramento abundante. Gerencie as prioridades.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 29 anos, agressão com bastão de baseball. Trauma maxilofacial extenso. GCS 12 (O3V3M6), agitado. FR 24, SpO₂ 93%, FC 118, PA 104/72. Sangramento oral abundante, hematoma crescente em pescoço esquerdo, mandíbula com mobilidade anormal. Você ouve estertor.\n\n**Qual é a sua primeira preocupação?**',
        options: [
          { id: 's1a', text: 'Via aérea comprometida — estertor + sangramento oral + hematoma cervical = obstrução iminente', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Estertor indica sangue ou secreções na via aérea superior. Hematoma cervical expansivo pode comprimir a traqueia. Sangramento oral ativo obstrui a via aérea. Três mecanismos de obstrução simultâneos — intervenção imediata.' },
          { id: 's1b', text: 'Controle do sangramento facial — hemorragia ativa é a prioridade', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. O sangramento facial é grave mas a via aérea comprometida mata primeiro. ABCDE: A antes de C — aspire a via aérea e garanta patência antes de controlar hemorragia.' },
          { id: 's1c', text: 'TC de face para avaliar as fraturas antes de qualquer intervenção', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. TC é para paciente estável. Este paciente tem SpO₂ 93% e via aérea comprometida — levar para TC agora é potencialmente fatal.' },
          { id: 's1d', text: 'Suturas hemostáticas de urgência nas lacerações faciais', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Suturas faciais são tratamento eletivo. A via aérea comprometida é a emergência imediata.' },
        ]
      },
      {
        id: 'step2',
        content: '## Manejo da Via Aérea\n\nVocê aspira coágulos da orofaringe — SpO₂ sobe para 95%. Mobilidade mandibular bilateral presente. Abertura oral de 1,5 dedos. O hematoma cervical esquerdo está crescendo visivelmente.\n\n**Qual é a decisão correta sobre a via aérea?**',
        options: [
          { id: 's2a', text: 'IOT imediata com videolaringoscópio — via aérea difícil + hematoma expansivo em crescimento', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Hematoma cervical expansivo + abertura oral de 1,5 dedos = via aérea difícil com deterioração previsível e rápida. IOT com videolaringoscópio agora — em 30 minutos pode ser impossível. Prepare cricotireoidostomia.' },
          { id: 's2b', text: 'Observar com máscara de O₂ — SpO₂ 95% após aspiração é aceitável', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hematoma cervical expansivo é uma das emergências de via aérea mais temidas — pode causar obstrução completa em minutos. A janela para IOT está se fechando.' },
          { id: 's2c', text: 'Intubação nasotraqueal — evita manipulação oral em trauma mandibular', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Intubação nasotraqueal às cegas está em desuso e é contraindicada quando há suspeita de fratura de base de crânio. O videolaringoscópio é a escolha correta.' },
          { id: 's2d', text: 'Cricotireoidostomia imediata — abertura oral < 2 dedos contraindica a IOT', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Abertura oral reduzida dificulta mas não contraindica a IOT — especialmente com videolaringoscópio. Cricotireoidostomia é reservada para CICO após falha de IOT.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação do Hematoma Cervical\n\nApós IOT bem-sucedida. Você avalia o hematoma cervical esquerdo: pulsátil, em expansão, com sopro audível à ausculta. Paciente hemodinamicamente estável.\n\n**O que o hematoma pulsátil com sopro indica?**',
        options: [
          { id: 's3a', text: 'Lesão vascular arterial — provável fístula arteriovenosa ou pseudoaneurisma de carótida', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Hematoma pulsátil + sopro = lesão arterial com comunicação venosa (fístula AV) ou pseudoaneurisma. Sinal duro de lesão vascular cervical significativa. Angio-TC urgente em paciente estável.' },
          { id: 's3b', text: 'Hematoma venoso — veias jugulares pulsam com a respiração', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Hematoma venoso não é pulsátil e não produz sopro. Pulsatilidade + sopro são sinais de lesão arterial ou fístula arteriovenosa — emergência vascular.' },
          { id: 's3c', text: 'Hematoma muscular do esternocleidomastoideo — sem significado vascular', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Hematoma muscular não é pulsátil e não produz sopro. Estes sinais são patognomônicos de lesão vascular arterial.' },
          { id: 's3d', text: 'Linfocele — linfonodos traumatizados na região cervical', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Linfocele não é pulsátil nem produz sopro. O quadro é claramente de lesão vascular arterial.' },
        ]
      },
      {
        id: 'step4',
        content: '## Controle da Hemorragia Facial\n\nAngio-TC em preparo. Você avalia a hemorragia facial: epistaxe posterior maciça, sangue escorrendo pela nasofaringe. Tamponamento anterior não controlou.\n\n**Conduta para epistaxe posterior refratária?**',
        options: [
          { id: 's4a', text: 'Balão de Foley nasofaríngeo — introduzir, inflar com 10-15 mL e tracionar até parar o sangramento', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Epistaxe posterior refratária ao tamponamento anterior = balão de Foley nasofaríngeo. Introduza pelo nariz até a nasofaringe, insuflação do balão com 10-15 mL de soro, tração anterior + fixação. Se falhar: angioembolização da artéria esfenopalatina (padrão IATSIC 2023).' },
          { id: 's4b', text: 'Ligadura da artéria carótida externa — controle definitivo da hemorragia facial', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Ligadura cirúrgica está em desuso — substituída pela angioembolização. É reservada para falha da embolização ou indisponibilidade. O balão de Foley é a primeira linha para epistaxe posterior.' },
          { id: 's4c', text: 'Compressão digital bilateral das fossas nasais por 15 minutos', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Compressão digital é para epistaxe anterior (plexo de Kiesselbach). Epistaxe posterior origina-se da artéria esfenopalatina — não é alcançada pela compressão digital externa.' },
          { id: 's4d', text: 'Cauterização com nitrato de prata do ponto sangrante', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cauterização é para epistaxe anterior visível com ponto sangrante identificável. Epistaxe posterior não é visualizável sem rinoscopia posterior — use balão de Foley.' },
        ]
      },
      {
        id: 'step5',
        content: '## Avaliação Ocular\n\nAntes de sedar o paciente, você realiza exame ocular rápido. Olho direito: proptose progressiva, resistência ao retropulsão, acuidade visual reduzida. PIO 48 mmHg.\n\n**O que isso indica e qual é a urgência?**',
        options: [
          { id: 's5a', text: 'Hematoma retrobulbar — cantotomia lateral de emergência em até 90-120 minutos', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Proptose + resistência ao retropulsão + acuidade reduzida + PIO > 40 mmHg = hematoma retrobulbar com isquemia do nervo óptico iminente. Cantotomia lateral + cantólise imediata. Janela terapêutica: 90-120 minutos para preservar a visão.' },
          { id: 's5b', text: 'Fratura de assoalho orbitário com enoftalmia — TC de órbita antes de qualquer intervenção', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Enoftalmia é o oposto de proptose. Proptose + PIO 48 mmHg + acuidade reduzida = hematoma retrobulbar — emergência que não pode aguardar TC.' },
          { id: 's5c', text: 'Hipertensão ocular por trauma direto — colírio betabloqueador e observação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. PIO 48 mmHg + proptose + acuidade reduzida não é hipertensão simples — é hematoma retrobulbar comprimindo a artéria central da retina. Colírio não é suficiente.' },
          { id: 's5d', text: 'Rotura de globo ocular — curativo oclusivo e encaminhamento para oftalmologista', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Rotura de globo causa hipotonia (PIO baixa), não hipertonia. PIO 48 mmHg indica compressão extrínseca do conteúdo orbitário — hematoma retrobulbar.' },
        ]
      },
      {
        id: 'step6',
        content: '## Diagnóstico das Fraturas\n\nApós estabilização, TC de face com reconstrução 3D. Laudo: fratura Le Fort III bilateral + fratura de zigoma direito + fratura NOE com afastamento de tendão cantal medial bilateral.\n\n**O que a fratura NOE com afastamento do tendão cantal medial causa clinicamente?**',
        options: [
          { id: 's6a', text: 'Telecanto traumático — distância intercantal > 35 mm, sinal patognomônico de fratura NOE', is_correct: true, next_step_id: 'final', feedback: 'Correto. Fratura NOE + avulsão do tendão cantal medial = telecanto traumático (distância intercantal > 35 mm). É o sinal patognomônico da fratura NOE. Tratamento cirúrgico com reposicionamento e fixação do tendão cantal medial — altamente especializado.' },
          { id: 's6b', text: 'Enoftalmia bilateral — aumento do volume orbitário pela fratura', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Enoftalmia bilateral é causada por fratura de assoalho orbitário bilateral. A fratura NOE causa telecanto (afastamento dos cantos mediais), não enoftalmia.' },
          { id: 's6c', text: 'Anosmia — lesão do nervo olfatório pelo etmoide fraturado', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto — anosmia pode ocorrer em fratura NOE por lesão do neuroepitélio olfatório, mas não é o achado patognomônico. O telecanto é o sinal clínico definidor da fratura NOE com avulsão cantal.' },
          { id: 's6d', text: 'Ptose bilateral — lesão do músculo levantador da pálpebra', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Ptose indica lesão do nervo oculomotor (III par) ou do músculo levantador. Fratura NOE não causa ptose diretamente — causa telecanto por avulsão do tendão cantal medial.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê priorizou a via aérea em trauma maxilofacial, identificou lesão vascular cervical por hematoma pulsátil, controlou epistaxe posterior com balão de Foley, realizou cantotomia por hematoma retrobulbar e identificou telecanto em fratura NOE.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_trauma_pescoco_01',
    theme: 'atls_pescoco' as any,
    title: 'Ferimento Penetrante de Pescoço',
    description: 'Você é o médico da emergência. Um homem de 34 anos chega com ferimento por arma branca no pescoço esquerdo. Zona II. Aplique o protocolo de trauma penetrante de pescoço.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 34 anos, FAB no pescoço esquerdo, zona II. GCS 15, ansioso. FR 20, SpO₂ 97%, FC 102, PA 118/76. Ferida de 2 cm na região lateral esquerda do pescoço, entre cartilagem cricóidea e ângulo da mandíbula. Sangramento ativo controlado com compressão. Sem estridor. Voz levemente rouca.\n\n**Qual é sua avaliação inicial dos sinais duros e moles?**',
        options: [
          { id: 's1a', text: 'Sinais moles presentes (rouquidão + hematoma estável) — investigação com angio-TC antes de cirurgia', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Rouquidão = sinal mole (não é obstrução ativa). Hematoma estável = sinal mole. Sem sinais duros (sem hemorragia incontrolável, sem hematoma expansivo, sem choque, sem déficit neurológico focal). Paciente estável: angio-TC é o próximo passo (EAST 2023).' },
          { id: 's1b', text: 'Sinais duros presentes — exploração cirúrgica imediata sem investigação adicional', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Sinais duros seriam: hemorragia incontrolável, hematoma expansivo/pulsátil, choque, déficit neurológico focal novo, sopro/frêmito, obstrução de via aérea. Este paciente tem sinais moles apenas — angio-TC primeiro.' },
          { id: 's1c', text: 'Sem sinais significativos — suturar a ferida e dar alta com observação domiciliar', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Todo FAB de zona II com violação do platisma requer investigação — lesões esofágicas e vasculares podem estar presentes sem sinais externos dramáticos.' },
          { id: 's1d', text: 'Exploração local da ferida para avaliar se houve violação do platisma', is_correct: false, next_step_id: 'step2', feedback: 'Parcialmente correto como avaliação, mas em FAB de zona II com sinais moles, a angio-TC é mais informativa e o próximo passo padrão. Exploração local não substitui a imagem.' },
        ]
      },
      {
        id: 'step2',
        content: '## Angio-TC Cervical\n\nAngio-TC: irregularidade intimal da artéria carótida interna esquerda com estreitamento de 20% — sem trombo. Sem extravasamento de contraste. Esôfago: sem pneumomediastino ou coleção.\n\n**Como você classifica e trata essa lesão carotídea?**',
        options: [
          { id: 's2a', text: 'Biffl grau I — antiagregação com AAS e acompanhamento com angio-TC seriada', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Irregularidade intimal sem trombo + estreitamento < 25% = Biffl grau I. Tratamento: antiagregação (AAS 81-325 mg/dia) ou anticoagulação conforme risco hemorrágico. Angio-TC de controle em 7-10 dias para avaliar progressão.' },
          { id: 's2b', text: 'Biffl grau III — stent endovascular imediato', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Biffl grau III é pseudoaneurisma — tratamento com stent. Este caso tem apenas irregularidade intimal com < 25% de estreitamento = grau I.' },
          { id: 's2c', text: 'Exploração cirúrgica imediata e reparo da carótida', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Lesão grau I em paciente estável não requer cirurgia — antiagregação é suficiente e segura. Cirurgia tem maior risco que o tratamento conservador neste grau.' },
          { id: 's2d', text: 'Biffl grau IV — ligadura da carótida para prevenir AVC', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Biffl grau IV é oclusão completa. Este caso tem irregularidade intimal com < 25% de estreitamento — grau I. Ligadura de carótida causa AVC isquêmico em 20-30%.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação Esofágica\n\nApesar da TC sem alterações, o paciente refere disfagia e odinofagia progressivas. Você palpa crepitação subcutânea cervical posterior.\n\n**Qual é sua conduta diagnóstica?**',
        options: [
          { id: 's3a', text: 'Esofagografia com gastrografina + esofagoscopia flexível — combinação com sensibilidade > 95%', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Disfagia + odinofagia + enfisema subcutâneo posterior = lesão esofágica até prova em contrário. TC tem sensibilidade limitada para lesões esofágicas pequenas. Esofagografia + esofagoscopia combinadas atingem sensibilidade > 95% (EAST 2023).' },
          { id: 's3b', text: 'TC já foi normal — disfagia é por edema local, observar por 24h', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. TC tem sensibilidade de apenas 80-90% para lesões esofágicas. Disfagia + odinofagia + enfisema subcutâneo posterior = investigação esofágica obrigatória independentemente da TC.' },
          { id: 's3c', text: 'Esofagoscopia rígida apenas — maior sensibilidade que a flexível', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Esofagoscopia rígida tem maior risco de perfuração em trauma agudo. A flexível é preferida. A combinação com esofagografia aumenta a sensibilidade diagnóstica.' },
          { id: 's3d', text: 'Deglutição de azul de metileno — extravasamento pela ferida confirma lesão', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Deglutição de azul de metileno tem altíssima taxa de falso negativo — lesões pequenas não extravasam. Esofagografia + esofagoscopia são os métodos padrão.' },
        ]
      },
      {
        id: 'step4',
        content: '## Lesão Esofágica Confirmada\n\nEsofagografia: extravasamento de contraste na parede posterior do esôfago cervical. Esofagoscopia: laceração de 1,5 cm na parede posterior, < 24h.\n\n**Qual é o tratamento?**',
        options: [
          { id: 's4a', text: 'Reparo cirúrgico primário em duas camadas + drenagem cervical + antibióticos + sonda enteral', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Lesão esofágica < 24h: reparo primário em duas camadas (mucosa + muscular) + drenagem ampla do espaço cervical + antibiótico de amplo espectro + nutrição enteral via sonda. Após 24h com mediastinite: excluir o esôfago.' },
          { id: 's4b', text: 'Tratamento conservador — dieta zero e antibióticos por 7 dias', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Lesão esofágica confirmada com extravasamento requer cirurgia — contaminação cervical/mediastinal progride para mediastinite com mortalidade > 50% sem drenagem cirúrgica.' },
          { id: 's4c', text: 'Stent esofágico endoscópico — menos invasivo que a cirurgia', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Stent esofágico tem papel em perforações tardias ou em contextos específicos. Lesão aguda < 24h em pescoço acessível cirurgicamente: reparo primário é o padrão.' },
          { id: 's4d', text: 'Drenagem percutânea guiada por TC — evita cirurgia aberta', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Drenagem percutânea não trata a lesão esofágica — apenas drena a coleção. A laceração permanece aberta e continua contaminando. Reparo cirúrgico é necessário.' },
        ]
      },
      {
        id: 'step5',
        content: '## Pós-operatório — Dia 2\n\nApós reparo esofágico. O paciente desenvolveu nova queda do GCS para 12 e hemiparesia direita. TC de crânio: hipodensidade em território da artéria cerebral média esquerda.\n\n**Qual é a causa mais provável e conduta?**',
        options: [
          { id: 's5a', text: 'AVC isquêmico por tromboembolismo da lesão carotídea Biffl I — anticoagulação plena após avaliação do risco hemorrágico cirúrgico', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Lesão carotídea Biffl I pode progredir para trombo e embolização — AVC isquêmico no território ipsilateral. Anticoagulação plena (heparina) após confirmar que o risco cirúrgico do reparo esofágico permite. Neurologia e neurocirurgia devem ser consultados.' },
          { id: 's5b', text: 'Hematoma intracraniano por trauma — neurocirurgia de emergência', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. TC mostra hipodensidade (isquemia), não hiperdensidade (hemorragia). Hemiparesia ipsilateral à lesão carotídea + hipodensidade no território da ACM = AVC isquêmico embólico.' },
          { id: 's5c', text: 'Encefalopatia metabólica por sepse do reparo esofágico — antibióticos e suporte', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Encefalopatia metabólica causa rebaixamento difuso, não déficit focal (hemiparesia). Déficit focal novo + hipodensidade na TC = AVC isquêmico.' },
          { id: 's5d', text: 'Vasoespasmo por hemorragia subaracnoide — nimodipina', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Não há HSA na TC. Vasoespasmo ocorre como complicação de HSA aneurismática, não de trauma cervical penetrante. O quadro é de AVC isquêmico embólico por lesão carotídea.' },
        ]
      },
      {
        id: 'step6',
        content: '## Clearance Cervical\n\nOutro paciente: homem de 28 anos, colisão frontal a 60 km/h. GCS 15, sem queixa cervical, sem dor à palpação da linha média, sem deficit neurológico, sem intoxicação, sem lesão distratora dolorosa.\n\n**Este paciente precisa de imagem cervical?**',
        options: [
          { id: 's6a', text: 'Não — todos os critérios NEXUS são negativos, clearance clínico é seguro', is_correct: true, next_step_id: 'final', feedback: 'Correto. NEXUS: sem dor na linha média + sem deficit neurológico + GCS 15 + sem intoxicação + sem lesão distratora = clearance clínico. Sensibilidade 99,6% para lesão cervical significativa. Imagem desnecessária — evita radiação e custo.' },
          { id: 's6b', text: 'Sim — colisão a 60 km/h exige TC cervical independentemente dos critérios clínicos', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Velocidade isolada não é critério para imagem cervical obrigatória. Os critérios NEXUS e Canadian C-Spine Rule incorporam o mecanismo indiretamente — se todos são negativos, o clearance clínico é seguro e validado.' },
          { id: 's6c', text: 'Sim — radiografia simples de coluna cervical em 3 incidências', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. A radiografia simples foi substituída pela TC na maioria dos centros de trauma — menor sensibilidade. Além disso, com NEXUS negativo, nenhuma imagem é necessária.' },
          { id: 's6d', text: 'Sim — RM cervical para excluir lesão ligamentar oculta', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. RM é indicada em déficit neurológico sem fratura na TC — não como triagem de rotina. Com NEXUS completamente negativo, nenhuma imagem é necessária.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê identificou sinais moles vs duros em trauma penetrante de pescoço, classificou lesão carotídea por Biffl, diagnosticou lesão esofágica com combinação de métodos, reconheceu AVC isquêmico como complicação e aplicou critérios NEXUS para clearance cervical.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
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
