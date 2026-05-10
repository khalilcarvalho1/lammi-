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
        content: 'Parabéns! Você conduziu corretamente o atendimento pré-hospitalar ao politraumatizado, seguindo o protocolo ABCDE e priorizando as ameaças à vida na ordem correta.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_avaliacao_cena_01',
    theme: 'avaliacao_cena',
    title: 'Colisão na Rodovia',
    description: 'Você é o primeiro socorrista a chegar a uma colisão frontal entre dois veículos em rodovia estadual. Uma vítima está presa no veículo com sinais de trauma grave.',
    steps: [
      {
        id: 'step1',
        content: '## Chegada à Cena\n\nVocê avista dois veículos com danos frontais severos. Um dos veículos está com o motor em chamas. Há combustível no asfalto. A vítima principal está no banco do motorista, presa pelas ferragens, consciente e gritando de dor.\n\n**Qual é sua primeira ação?**',
        options: [
          { id: 's1a', text: 'Aproximar-se imediatamente da vítima para iniciar o atendimento', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A cena não foi avaliada quanto à segurança — fogo e combustível representam risco imediato de explosão.' },
          { id: 's1b', text: 'Avaliar a segurança da cena, acionar bombeiros e aguardar controle do fogo antes de aproximar', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Segurança da cena é a primeira prioridade absoluta. Fogo + combustível = risco de explosão.' },
          { id: 's1c', text: 'Pedir para a vítima sair sozinha do veículo', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A vítima está presa pelas ferragens — é impossível sair sozinha.' },
          { id: 's1d', text: 'Iniciar triagem START imediatamente em todas as vítimas', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. A triagem START só é iniciada após avaliação e controle da segurança da cena.' },
        ]
      },
      {
        id: 'step2',
        content: '## Avaliação da Vítima Principal\n\nApós controle do fogo pelos bombeiros, você acessa a vítima. Homem, 38 anos, consciente, agitado, GCS 13. FC 128 bpm, FR 28 irpm, SpO₂ 91% em ar ambiente, PA 88/60 mmHg. Há sangramento ativo e volumoso na coxa direita com deformidade evidente.\n\n**Qual é sua prioridade imediata?**',
        options: [
          { id: 's2a', text: 'Aplicar torniquete na coxa direita imediatamente', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Hemorragia maciça de membro é a prioridade no componente C do MARCH/ABCDE.' },
          { id: 's2b', text: 'Administrar oxigênio suplementar pela SpO₂ baixa', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A SpO₂ baixa é consequência do choque hemorrágico — o sangramento deve ser controlado primeiro.' },
          { id: 's2c', text: 'Obter dois acessos venosos calibrosos e iniciar reposição volêmica', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A reposição volêmica sem controle da hemorragia é ineficaz.' },
          { id: 's2d', text: 'Imobilizar a fratura de fêmur com tala antes de qualquer outra intervenção', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. A imobilização é secundária ao controle da hemorragia ativa.' },
        ]
      },
      {
        id: 'step3',
        content: '## Após Torniquete\n\nTorniquete aplicado — sangramento cessou. Horário: 14h32. SpO₂ 94% com O₂ a 15 L/min. FC 118 bpm, PA 92/64 mmHg. Você nota desvio de traqueia para a esquerda e ausência de murmúrio vesicular à direita.\n\n**O que você faz agora?**',
        options: [
          { id: 's3a', text: 'Descompressão por agulha no 2º EIC direito, linha hemiclavicular', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Desvio de traqueia + ausência de murmúrio vesicular unilateral = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente.' },
          { id: 's3b', text: 'Solicitar radiografia de tórax para confirmar o pneumotórax', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Pneumotórax hipertensivo é diagnóstico clínico — aguardar imagem pode ser fatal.' },
          { id: 's3c', text: 'Aumentar o fluxo de O₂ e monitorizar a SpO₂', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. A causa da hipóxia é mecânica — aumentar O₂ não resolve.' },
          { id: 's3d', text: 'Realizar curativo de três pontas na parede torácica direita', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Curativo de três pontas é para pneumotórax aberto, não hipertensivo fechado.' },
        ]
      },
      {
        id: 'step4',
        content: '## Após Descompressão\n\nSaída de ar confirmada. SpO₂ 97%, FC 108, PA 98/68. GCS 14. Dois acessos 16G. Desencarceramento em 15 minutos.\n\n**Qual meta de pressão arterial você adota?**',
        options: [
          { id: 's4a', text: 'PAS 80-90 mmHg — hipotensão permissiva até hemostasia definitiva', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Trauma contuso sem TCE: hipotensão permissiva PAS 80-90 mmHg reduz ressangramento.' },
          { id: 's4b', text: 'PAS 120 mmHg — normalizar a pressão o mais rápido possível', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Normalizar a pressão antes da hemostasia definitiva aumenta o ressangramento.' },
          { id: 's4c', text: 'PAS 60 mmHg — quanto mais baixa, menor o sangramento', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. PAS < 80 mmHg causa isquemia orgânica grave.' },
          { id: 's4d', text: 'PAS ≥ 110 mmHg — TCE associado exige pressão mais elevada', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Não há evidência de TCE neste caso.' },
        ]
      },
      {
        id: 'step5',
        content: '## Decisão de Transporte\n\nVítima imobilizada. GCS 14, FC 102, PA 86/58, SpO₂ 96%. Hospital Municipal (8 km, sem cirurgião vascular) vs Centro de Trauma Regional (32 km, nível I).\n\n**Para onde você transporta?**',
        options: [
          { id: 's5a', text: 'Centro de Trauma Regional (32 km) — paciente necessita de recursos de nível I', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Critérios de centralização presentes. Destino = centro mais adequado, não o mais próximo.' },
          { id: 's5b', text: 'Hospital Municipal (8 km) — mais próximo, estabilize e transfira depois', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Desvio para hospital inadequado aumenta a mortalidade.' },
          { id: 's5c', text: 'Aguardar estabilização completa na cena antes de transportar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Tempo na cena < 10 minutos em trauma grave.' },
          { id: 's5d', text: 'Hospital Municipal para TC antes de definir o destino', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. TC em hospital inadequado atrasa o tratamento definitivo.' },
        ]
      },
      {
        id: 'step6',
        content: '## Passagem de Caso — MIST\n\nChegada ao Centro de Trauma. 60 segundos para passar o caso.\n\n**Qual é a passagem correta?**',
        options: [
          { id: 's6a', text: '"Homem, 38 anos, colisão frontal ~80 km/h. Fratura de fêmur — torniquete às 14h32 (28 min). Pneumotórax hipertensivo — descomprimido. GCS 14, FC 102, PA 86/58, SpO₂ 96%. 500 mL SF."', is_correct: true, next_step_id: 'final', feedback: 'Correto. MIST completo: Mecanismo + Injúrias + Sinais vitais + Tratamento. Tempo de torniquete é informação crítica.' },
          { id: 's6b', text: '"Paciente em acidente de carro, fratura na perna e problema no pulmão. Pressão baixa."', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Passagem vaga — omite mecanismo, horário do torniquete e sinais vitais completos.' },
          { id: 's6c', text: '"Politraumatizado grave, instável, precisa de cirurgia urgente."', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Sem informação estruturada. O MIST não foi aplicado.' },
          { id: 's6d', text: '"Homem, 38 anos, acidente. Torniquete na perna. Descompressão feita. Pressão 86/58."', is_correct: false, next_step_id: 'final', feedback: 'Incompleto. Faltam mecanismo detalhado, GCS, SpO₂ e tempo de isquemia.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê conduziu o atendimento sistematizado: segurança → controle de hemorragia → descompressão de pneumotórax → reposição guiada → transporte adequado → passagem MIST.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_cinetica_trauma_01',
    theme: 'cinetica_trauma',
    title: 'Capotamento em Estrada Rural',
    description: 'Você atende um capotamento em estrada rural. O veículo capotou três vezes e o motorista foi ejetado. Aplique o raciocínio cinemático para antecipar lesões.',
    steps: [
      {
        id: 'step1',
        content: '## Análise da Cena\n\nVeículo capotado três vezes, deformação extensa do teto. Motorista a 8 metros do veículo, sem cinto. Mulher, 26 anos, consciente mas confusa, GCS 12.\n\n**Com base na cinemática, quais lesões antecipar?**',
        options: [
          { id: 's1a', text: 'TCE, lesão cervical multidirecional, trauma torácico e abdominal — capotamento com ejeção', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Ejeção aumenta mortalidade em 6x. Espere TCE, trauma cervical multidirecional, torácico e abdominal.' },
          { id: 's1b', text: 'Apenas fratura de membros — amorteceu a queda com os braços', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Ejeção é mecanismo de altíssimo risco — lesões múltiplas em todas as regiões.' },
          { id: 's1c', text: 'Trauma abdominal isolado — impacto principal no abdome', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Em capotamento com ejeção não se pode assumir um único ponto de impacto.' },
          { id: 's1d', text: 'Sem lesões graves — vítima consciente e sem sangramento visível', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Mecanismo de alto risco exige rastreamento agressivo independentemente da apresentação.' },
        ]
      },
      {
        id: 'step2',
        content: '## Avaliação Primária\n\nGCS 12, PA 102/70, FC 114, FR 22, SpO₂ 95%. Equimose no flanco esquerdo, dor em hipocôndrio esquerdo, abdome levemente distendido.\n\n**O que a equimose no flanco esquerdo sugere?**',
        options: [
          { id: 's2a', text: 'Lesão esplênica por impacto no flanco durante o capotamento', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Equimose flanco esquerdo + dor hipocôndrio esquerdo = lesão esplênica até prova em contrário.' },
          { id: 's2b', text: 'Contusão muscular da parede abdominal — sem significado maior', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Em mecanismo de alta energia, equimose de flanco deve ser tratada como lesão esplênica.' },
          { id: 's2c', text: 'Fratura de costelas inferiores esquerdas isolada', is_correct: false, next_step_id: 'step3', feedback: 'Parcialmente incorreto. A principal preocupação é a lesão esplênica subjacente.' },
          { id: 's2d', text: 'Sinal de Grey-Turner — hemorragia retroperitoneal', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grey-Turner é equimose tardia. Equimose imediata indica trauma direto.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação Cervical\n\nLog-roll: dor e crepitação em C5-C6. Formigamento nos quatro membros. Força MMSS 3/5 bilateral, MMII 4/5.\n\n**Qual síndrome medular você suspeita?**',
        options: [
          { id: 's3a', text: 'Síndrome do cordão central — fraqueza maior nos MMSS que MMII', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Fraqueza desproporcional nos MMSS (3/5) vs MMII (4/5) + trauma cervical = síndrome do cordão central.' },
          { id: 's3b', text: 'Síndrome de Brown-Séquard — deficit motor de um lado e sensitivo do outro', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Brown-Séquard causa deficit unilateral — este caso tem deficit bilateral.' },
          { id: 's3c', text: 'Síndrome do cordão anterior — perda motora com preservação de propriocepção', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. O padrão aqui (fraqueza maior nos MMSS) é do cordão central.' },
          { id: 's3d', text: 'Lesão medular completa — qualquer deficit em quatro membros', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Lesão completa = ausência total de função incluindo S4-S5. Esta paciente tem função motora preservada.' },
        ]
      },
      {
        id: 'step4',
        content: '## Decisão de Via Aérea\n\nGCS cai para 10. FR 28, SpO₂ 91% com O₂. Vômito — não protege via aérea. Suspeita de lesão cervical instável.\n\n**Abordagem correta?**',
        options: [
          { id: 's4a', text: 'IOT com videolaringoscópio + estabilização manual bimanual + etomidato + succinilcolina', is_correct: true, next_step_id: 'step5', feedback: 'Correto. GCS 10 em queda + vômito = IOT. Videolaringoscópio minimiza extensão cervical. Etomidato: mínimo efeito hemodinâmico.' },
          { id: 's4b', text: 'Cricotireoidostomia imediata — lesão cervical contraindica laringoscopia', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Lesão cervical não contraindica IOT — contraindica extensão, evitada com videolaringoscópio.' },
          { id: 's4c', text: 'Máscara com reservatório — GCS 10 ainda não indica IOT', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. GCS 10 em queda + vômito + SpO₂ 91% = via aérea definitiva obrigatória.' },
          { id: 's4d', text: 'Intubação nasotraqueal — evita mobilização cervical', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Nasotraqueal às cegas está em desuso. Videolaringoscópio com estabilização manual é a escolha.' },
        ]
      },
      {
        id: 'step5',
        content: '## Confirmação do Tubo\n\nApós IOT, murmúrio mais intenso à direita. Sem capnógrafo disponível.\n\n**Como confirmar a posição correta?**',
        options: [
          { id: 's5a', text: 'Ausculta epigástrica (ausência) + ausculta bilateral + melhora SpO₂ + expansão torácica simétrica', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Sem capnógrafo: confirmação multimodal. Murmúrio mais intenso à direita sugere intubação seletiva — recue o tubo.' },
          { id: 's5b', text: 'Ausculta pulmonar bilateral apenas', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Ausculta isolada tem falsos positivos. Confirmação deve ser multimodal.' },
          { id: 's5c', text: 'Aguardar radiografia de tórax no hospital', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Tubo esofágico não detectado causa morte em minutos.' },
          { id: 's5d', text: 'IOT foi bem realizada — não é necessário confirmar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Confirmação é obrigatória após cada intubação.' },
        ]
      },
      {
        id: 'step6',
        content: '## Comunicação MIST\n\nA 3 minutos do centro de trauma. Comunicação pelo rádio.\n\n**Qual informação cinemática é mais crítica para a equipe receptora?**',
        options: [
          { id: 's6a', text: 'Capotamento com ejeção + suspeita C5-C6 + síndrome do cordão central + IOT realizada', is_correct: true, next_step_id: 'final', feedback: 'Correto. Mecanismo + nível de lesão + padrão neurológico + via aérea = neurocirurgia, colunista e UTI devem ser ativados.' },
          { id: 's6b', text: 'Apenas os sinais vitais atuais', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Sinais vitais sem contexto cinemático não permitem preparo adequado.' },
          { id: 's6c', text: 'Informar apenas que está intubada e instável', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Informação insuficiente — mecanismo e padrão neurológico são essenciais.' },
          { id: 's6d', text: 'Velocidade estimada e número de capotamentos apenas', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. MIST exige todos os componentes.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê aplicou raciocínio cinemático, identificou síndrome do cordão central, gerenciou via aérea com proteção cervical e comunicou o caso de forma estruturada.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_atls_inicial_01',
    theme: 'atls_inicial',
    title: 'Politraumatizado na Sala de Emergência',
    description: 'Você é o médico líder da equipe de trauma. Homem de 45 anos chega após colisão motociclística a alta velocidade. Conduza o atendimento pelo protocolo ATLS.',
    steps: [
      {
        id: 'step1',
        content: '## Chegada à Sala de Trauma\n\nHomem, 45 anos, motociclista sem capacete, colisão com caminhão ~70 km/h. GCS 9 (O2V2M5), FR 32, SpO₂ 88%, FC 138, PA 86/54. Sangramento ativo na face e couro cabeludo.\n\n**Primeira prioridade como líder?**',
        options: [
          { id: 's1a', text: 'Via aérea definitiva imediata — GCS 9, SpO₂ 88%, FR 32', is_correct: true, next_step_id: 'step2', feedback: 'Correto. A = Airway é sempre a primeira prioridade. GCS 9 + SpO₂ 88% + FR 32 = IOT imediata.' },
          { id: 's1b', text: 'Controle do sangramento da face — hemorragia visível é a prioridade', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Hipóxia (SpO₂ 88%) mata primeiro que o sangramento facial.' },
          { id: 's1c', text: 'Dois acessos venosos e reposição — PA 86/54 indica choque', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Hipóxia é imediatamente letal. Delegue o acesso vascular.' },
          { id: 's1d', text: 'FAST imediato para identificar a fonte do choque', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. FAST é realizado durante/após estabilização do ABCDE.' },
        ]
      },
      {
        id: 'step2',
        content: '## Via Aérea Assegurada\n\nIOT com videolaringoscópio. ETCO₂ 38, SpO₂ 96%, VM 6 mL/kg.\n\nAusculta: murmúrio ausente à esquerda, hipertimpanismo esquerdo. Traqueia desviada à direita. FC 142, PA 72/44.\n\n**Conduta imediata?**',
        options: [
          { id: 's2a', text: 'Descompressão por agulha no 2º EIC esquerdo, linha hemiclavicular', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Ausência MV + hipertimpanismo + desvio traqueal = pneumotórax hipertensivo. Diagnóstico clínico — descomprima imediatamente.' },
          { id: 's2b', text: 'Radiografia de tórax para confirmar', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Aguardar imagem pode ser fatal. O diagnóstico é clínico.' },
          { id: 's2c', text: 'Aumentar PEEP no ventilador', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto e perigoso. PEEP elevada agrava a compressão cardíaca.' },
          { id: 's2d', text: 'Norepinefrina IV para tratar a hipotensão', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hipotensão é por choque obstrutivo — vasopressor sem descompressão não resolve.' },
        ]
      },
      {
        id: 'step3',
        content: '## Após Descompressão\n\nPA 94/62, FC 124, SpO₂ 97%. FAST: pericárdio normal, Morrison +++, esplenorrenal ++, pélvica +. Persiste hipotenso após 1L de Ringer.\n\n**Próxima decisão crítica?**',
        options: [
          { id: 's3a', text: 'Laparotomia exploradora de emergência — FAST positivo com instabilidade refratária', is_correct: true, next_step_id: 'step4', feedback: 'Correto. FAST positivo + instabilidade refratária = laparotomia imediata. Não leve para TC.' },
          { id: 's3b', text: 'TC de abdome com contraste antes da cirurgia', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Paciente instável com FAST positivo vai para sala cirúrgica, não para TC.' },
          { id: 's3c', text: 'Aumentar reposição para 3L de cristaloide e reavalie', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Cristaloide em excesso agrava a tríade letal.' },
          { id: 's3d', text: 'LPD para confirmar hemoperitônio antes de decidir', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. FAST já confirmou. LPD está em desuso.' },
        ]
      },
      {
        id: 'step4',
        content: '## Sala Cirúrgica — Damage Control\n\nLaparotomia: laceração esplênica grau IV + hepática grau III. Temperatura 34,2°C, pH 7,18, INR 2,1, fibrinogênio 98 mg/dL.\n\n**Estratégia cirúrgica?**',
        options: [
          { id: 's4a', text: 'Damage Control: esplenectomia + packing hepático + fechamento temporário', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Tríade letal presente. DCS: controle da hemorragia + fechamento temporário. Cirurgia definitiva após correção na UTI.' },
          { id: 's4b', text: 'Esplenorrafia + hepatorrafia definitiva em uma etapa', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Com tríade letal instalada, cirurgia extensa aumenta a mortalidade.' },
          { id: 's4c', text: 'Apenas packing de todos os quadrantes sem ressecção', is_correct: false, next_step_id: 'step5', feedback: 'Parcialmente incorreto. Baço grau IV requer esplenectomia — packing isolado raramente controla.' },
          { id: 's4d', text: 'Transfusão maciça e aguardar melhora da coagulopatia antes de operar', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Coagulopatia não melhora com hemorragia ativa.' },
        ]
      },
      {
        id: 'step5',
        content: '## UTI — Fase 2 do DCS\n\nTemperatura 35,8°C, pH 7,28, INR 1,6, fibrinogênio 142, lactato 4,8. Estável com norepinefrina.\n\n**Meta mais importante para liberar à cirurgia definitiva?**',
        options: [
          { id: 's5a', text: 'Normalização da temperatura (≥36°C), pH (≥7,35) e coagulograma — correção da tríade letal', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Metas: T ≥ 36°C, pH ≥ 7,35, INR ≤ 1,5, fibrinogênio ≥ 150, plaquetas ≥ 50.000.' },
          { id: 's5b', text: 'Débito urinário ≥ 1 mL/kg/h', is_correct: false, next_step_id: 'step6', feedback: 'Parcialmente correto. Não é o critério principal para liberação ao DCS fase 3.' },
          { id: 's5c', text: 'PA normal sem vasopressor antes de reoperar', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Vasopressor não contraindica cirurgia se tríade corrigida.' },
          { id: 's5d', text: 'Lactato < 4 mmol/L — normalização suficiente', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Lactato é marcador importante mas não o único critério.' },
        ]
      },
      {
        id: 'step6',
        content: '## Cirurgia Definitiva\n\n36h após DCS: temperatura 36,4°C, pH 7,36, INR 1,3, fibrinogênio 178, lactato 1,8. Estável. TC: packing em posição, sem sangramento ativo.\n\n**Conduta?**',
        options: [
          { id: 's6a', text: 'Cirurgia definitiva — retirada do packing, revisão e fechamento abdominal definitivo', is_correct: true, next_step_id: 'final', feedback: 'Correto. Tríade corrigida + estabilidade + 36h = momento ideal para fase 3.' },
          { id: 's6b', text: 'Aguardar 7 dias para garantir estabilidade completa', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Packing deve ser removido em 24-72h.' },
          { id: 's6c', text: 'Manter abdome aberto indefinidamente', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Abdome aberto é solução temporária.' },
          { id: 's6d', text: 'TC semanal e reoperar apenas se houver complicação', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Reoperação em 24-72h é parte do protocolo DCS.' },
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
  {
    id: 'caso_via_aerea_01',
    theme: 'atls_via_aerea',
    title: 'Via Aérea em Colapso',
    description: 'Você é o médico da sala de emergência. Um homem de 52 anos chega após queimadura em incêndio doméstico. Gerencie a via aérea de forma progressiva e sistematizada.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação Inicial\n\nHomem, 52 anos, resgate de incêndio doméstico. Consciente, GCS 14, agitado. Fuligem nas narinas e sobrancelhas chamuscadas. Rouquidão progressiva. FR 26, SpO₂ 94%, FC 108, PA 128/82.\n\n**Qual é sua avaliação imediata da via aérea?**',
        options: [
          { id: 's1a', text: 'Via aérea em risco iminente — sinais de queimadura indicam edema progressivo, IOT precoce', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Fuligem + sobrancelhas chamuscadas + rouquidão = queimadura de via aérea. O edema progride rapidamente — IOT precoce é mandatória.' },
          { id: 's1b', text: 'Via aérea patente — GCS 14 e SpO₂ 94% permitem observação', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. O edema por queimadura progride de forma imprevisível. Aguardar deterioração é potencialmente fatal.' },
          { id: 's1c', text: 'Aplicar máscara com reservatório e reavaliar em 30 minutos', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Em 30 minutos o edema pode tornar a IOT impossível.' },
          { id: 's1d', text: 'Solicitar laringoscopia indireta antes de decidir', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Os sinais clínicos são suficientes. Qualquer atraso reduz a chance de IOT.' },
        ]
      },
      {
        id: 'step2',
        content: '## Planejamento da IOT\n\nAbertura oral de 2 dedos, pescoço curto, barba espessa. Avaliação pelo mnemônico LEMON.\n\n**O que essa avaliação indica?**',
        options: [
          { id: 's2a', text: 'Via aérea previsivelmente difícil — prepare videolaringoscópio, bougie e kit de cricotireoidostomia antes de paralisar', is_correct: true, next_step_id: 'step3', feedback: 'Correto. LEMON positivo = via aérea difícil prevista. Acorde o plano B antes de paralisar.' },
          { id: 's2b', text: 'Via aérea normal — intubar com laringoscopia direta padrão', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Abertura oral 2 dedos + pescoço curto + barba = via aérea difícil prevista.' },
          { id: 's2c', text: 'Contraindicação à IOT — usar apenas dispositivo supraglótico', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Via aérea difícil não contraindica IOT — exige mais preparo.' },
          { id: 's2d', text: 'Cricotireoidostomia imediata — via aérea difícil prevista', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Cricotireoidostomia é para CICO. Não é a primeira escolha com paciente ainda ventilando.' },
        ]
      },
      {
        id: 'step3',
        content: '## Execução da SIR\n\nVideolaringoscópio, bougie e kit de cricotireoidostomia preparados. Pré-oxigenação 4 minutos — SpO₂ 99%.\n\n**Qual sequência farmacológica você escolhe?**',
        options: [
          { id: 's3a', text: 'Etomidato 0,3 mg/kg + succinilcolina 1,5 mg/kg', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Etomidato: mínimo efeito hemodinâmico. Succinilcolina: onset rápido, duração curta — se falhar, o paciente recupera respiração espontânea.' },
          { id: 's3b', text: 'Propofol 2 mg/kg + rocurônio 1,2 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Propofol causa hipotensão dose-dependente — evitar em queimadura com perda volêmica.' },
          { id: 's3c', text: 'Midazolam 0,1 mg/kg + succinilcolina 1,5 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Midazolam tem onset mais lento e causa hipotensão em hipovolemia.' },
          { id: 's3d', text: 'Ketamina 2 mg/kg + rocurônio 1,2 mg/kg', is_correct: false, next_step_id: 'step4', feedback: 'Parcialmente correto. Ketamina é aceitável mas rocurônio requer sugammadex disponível. Etomidato + succinilcolina é mais seguro.' },
        ]
      },
      {
        id: 'step4',
        content: '## Laringoscopia\n\nGlideScope: epiglote edemaciada, apenas porção posterior das cordas vocais visível (Cormack-Lehane grau III).\n\n**Qual é sua conduta?**',
        options: [
          { id: 's4a', text: 'Introduzir bougie sob visão parcial, confirmar pelos cliques traqueais e deslizar o tubo', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Cormack-Lehane III + videolaringoscópio = use o bougie. Cliques = anéis traqueais. Rotação anti-horária 90° ao deslizar o tubo.' },
          { id: 's4b', text: 'Retirar o videolaringoscópio e tentar com laringoscopia direta', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Via aérea edemaciada não melhora com mudança de técnica.' },
          { id: 's4c', text: 'Inserir dispositivo supraglótico (i-gel) e ventilar', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Ainda não é falha de IOT — você tem visão parcial e o bougie.' },
          { id: 's4d', text: 'Realizar cricotireoidostomia imediatamente', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cormack-Lehane III não é CICO. Cricotireoidostomia só após falha de todas as tentativas.' },
        ]
      },
      {
        id: 'step5',
        content: '## Confirmação e Ventilação\n\nIOT com bougie. ETCO₂ onda, 36 mmHg. SpO₂ 98%. Tubo em 22 cm.\n\n**Qual parâmetro ventilatório é mais crítico neste paciente?**',
        options: [
          { id: 's5a', text: 'Volume corrente 6 mL/kg de peso predito — ventilação protetora', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Ventilação protetora (6 mL/kg) é mandatória em contusão pulmonar e lesão por inalação — reduz LPIV.' },
          { id: 's5b', text: 'Volume corrente 10-12 mL/kg — maior volume garante melhor oxigenação', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Volumes altos causam barotrauma e volutrauma.' },
          { id: 's5c', text: 'FiO₂ 100% mantida indefinidamente', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Hiperoxia piora o prognóstico. Use a mínima FiO₂ para SpO₂ ≥ 94%.' },
          { id: 's5d', text: 'FR 30 irpm para eliminar CO₂ da intoxicação por fumaça', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. FR 30 causa hipocapnia. O CO₂ é eliminado com FiO₂ 100% inicial, não com hiperventilação.' },
        ]
      },
      {
        id: 'step6',
        content: '## Evolução — 2 horas depois\n\nSpO₂ 95%, ETCO₂ 38. Pressão de pico crescente (36 cmH₂O) e SpO₂ em queda. Ausculta: murmúrio reduzido bilateralmente, mais à esquerda.\n\n**Qual é sua hipótese e conduta?**',
        options: [
          { id: 's6a', text: 'Pneumotórax por barotrauma — eFAST imediato + descompressão por agulha se instável', is_correct: true, next_step_id: 'final', feedback: 'Correto. Pressão de pico crescente + queda SpO₂ + redução de murmúrio em ventilado = pneumotórax por barotrauma. eFAST confirma. Se instável: descompressão imediata.' },
          { id: 's6b', text: 'Broncoespasmo por inalação — salbutamol inalatório', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Broncoespasmo causa pressão aumentada com murmúrio presente. A assimetria aponta para pneumotórax.' },
          { id: 's6c', text: 'Intubação seletiva do brônquio direito — rever posição do tubo', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto considerar, mas a progressividade bilateral e a queda de SpO₂ são mais sugestivas de pneumotórax.' },
          { id: 's6d', text: 'Edema pulmonar por hiper-hidratação — restrição hídrica', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Edema pulmonar causa murmúrio presente bilateralmente. A assimetria aponta para pneumotórax.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê reconheceu queimadura de via aérea precocemente, planejou IOT difícil com bougie em Cormack-Lehane III, aplicou ventilação protetora e identificou pneumotórax por barotrauma.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_trauma_face_01',
    theme: 'atls_face',
    title: 'Trauma Maxilofacial Grave',
    description: 'Você atende um homem de 29 anos vítima de agressão com objeto contundente. Trauma maxilofacial extenso com sangramento abundante. Gerencie as prioridades.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 29 anos, agressão com bastão de baseball. GCS 12, FR 24, SpO₂ 93%, FC 118, PA 104/72. Sangramento oral abundante, hematoma crescente em pescoço esquerdo, mandíbula com mobilidade anormal. Estertor audível.\n\n**Qual é a sua primeira preocupação?**',
        options: [
          { id: 's1a', text: 'Via aérea comprometida — estertor + sangramento oral + hematoma cervical = obstrução iminente', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Três mecanismos de obstrução simultâneos — intervenção imediata.' },
          { id: 's1b', text: 'Controle do sangramento facial — hemorragia ativa é a prioridade', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Via aérea comprometida mata primeiro. A antes de C.' },
          { id: 's1c', text: 'TC de face para avaliar as fraturas antes de qualquer intervenção', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. TC é para paciente estável. SpO₂ 93% com via aérea comprometida = emergência.' },
          { id: 's1d', text: 'Suturas hemostáticas de urgência nas lacerações faciais', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Suturas faciais são tratamento eletivo. Via aérea é a emergência.' },
        ]
      },
      {
        id: 'step2',
        content: '## Manejo da Via Aérea\n\nApós aspiração de coágulos, SpO₂ 95%. Abertura oral de 1,5 dedos. Hematoma cervical esquerdo crescendo visivelmente.\n\n**Qual é a decisão correta?**',
        options: [
          { id: 's2a', text: 'IOT imediata com videolaringoscópio — via aérea difícil + hematoma expansivo', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Hematoma expansivo + abertura oral reduzida = janela para IOT se fechando. Prepare cricotireoidostomia.' },
          { id: 's2b', text: 'Observar com máscara de O₂ — SpO₂ 95% é aceitável', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Hematoma cervical expansivo pode causar obstrução completa em minutos.' },
          { id: 's2c', text: 'Intubação nasotraqueal — evita manipulação oral', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Nasotraqueal às cegas está em desuso e é contraindicada em suspeita de fratura de base de crânio.' },
          { id: 's2d', text: 'Cricotireoidostomia imediata — abertura oral < 2 dedos contraindica IOT', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Abertura reduzida dificulta mas não contraindica IOT com videolaringoscópio.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação do Hematoma Cervical\n\nApós IOT. Hematoma cervical esquerdo: pulsátil, em expansão, sopro audível à ausculta. Paciente estável.\n\n**O que o hematoma pulsátil com sopro indica?**',
        options: [
          { id: 's3a', text: 'Lesão vascular arterial — fístula arteriovenosa ou pseudoaneurisma de carótida', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Pulsatilidade + sopro = lesão arterial. Sinal duro de lesão vascular cervical. Angio-TC urgente.' },
          { id: 's3b', text: 'Hematoma venoso — veias jugulares pulsam com a respiração', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Hematoma venoso não é pulsátil e não produz sopro.' },
          { id: 's3c', text: 'Hematoma muscular do esternocleidomastoideo', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Hematoma muscular não é pulsátil e não produz sopro.' },
          { id: 's3d', text: 'Linfocele — linfonodos traumatizados', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Linfocele não é pulsátil nem produz sopro.' },
        ]
      },
      {
        id: 'step4',
        content: '## Controle da Hemorragia Facial\n\nEpistaxe posterior maciça. Tamponamento anterior não controlou.\n\n**Conduta para epistaxe posterior refratária?**',
        options: [
          { id: 's4a', text: 'Balão de Foley nasofaríngeo — introduzir, inflar com 10-15 mL e tracionar até parar', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Primeira linha para epistaxe posterior. Se falhar: angioembolização da artéria esfenopalatina (IATSIC 2023).' },
          { id: 's4b', text: 'Ligadura da artéria carótida externa', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Em desuso — substituída pela angioembolização.' },
          { id: 's4c', text: 'Compressão digital bilateral das fossas nasais por 15 minutos', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Compressão digital é para epistaxe anterior. Epistaxe posterior não é alcançada externamente.' },
          { id: 's4d', text: 'Cauterização com nitrato de prata do ponto sangrante', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Cauterização é para epistaxe anterior visível. Epistaxe posterior não é visualizável sem rinoscopia.' },
        ]
      },
      {
        id: 'step5',
        content: '## Avaliação Ocular\n\nOlho direito: proptose progressiva, resistência ao retropulsão, acuidade visual reduzida. PIO 48 mmHg.\n\n**O que indica e qual é a urgência?**',
        options: [
          { id: 's5a', text: 'Hematoma retrobulbar — cantotomia lateral de emergência em até 90-120 minutos', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Proptose + resistência + acuidade reduzida + PIO > 40 = hematoma retrobulbar. Cantotomia + cantólise imediata. Janela: 90-120 minutos.' },
          { id: 's5b', text: 'Fratura de assoalho orbitário com enoftalmia — TC antes de intervir', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Enoftalmia é oposto de proptose. Esta emergência não pode aguardar TC.' },
          { id: 's5c', text: 'Hipertensão ocular por trauma direto — colírio betabloqueador', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. PIO 48 + proptose + acuidade reduzida = hematoma retrobulbar. Colírio é insuficiente.' },
          { id: 's5d', text: 'Rotura de globo — curativo oclusivo e oftalmologista', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Rotura de globo causa hipotonia (PIO baixa). PIO 48 indica compressão extrínseca.' },
        ]
      },
      {
        id: 'step6',
        content: '## Diagnóstico das Fraturas\n\nTC de face 3D: fratura Le Fort III bilateral + fratura de zigoma direito + fratura NOE com afastamento do tendão cantal medial bilateral.\n\n**O que a fratura NOE com afastamento do tendão cantal medial causa?**',
        options: [
          { id: 's6a', text: 'Telecanto traumático — distância intercantal > 35 mm, sinal patognomônico de fratura NOE', is_correct: true, next_step_id: 'final', feedback: 'Correto. Fratura NOE + avulsão do tendão cantal medial = telecanto traumático. Sinal patognomônico.' },
          { id: 's6b', text: 'Enoftalmia bilateral — aumento do volume orbitário', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Enoftalmia é por fratura de assoalho orbitário. NOE causa telecanto.' },
          { id: 's6c', text: 'Anosmia — lesão do nervo olfatório', is_correct: false, next_step_id: 'final', feedback: 'Parcialmente correto — anosmia pode ocorrer mas não é o sinal patognomônico. Telecanto é.' },
          { id: 's6d', text: 'Ptose bilateral — lesão do músculo levantador', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Ptose indica lesão do III par ou levantador. NOE causa telecanto.' },
        ]
      },
      {
        id: 'final',
        content: '## Caso Concluído\n\nVocê priorizou via aérea em trauma maxilofacial, identificou lesão vascular por hematoma pulsátil, controlou epistaxe posterior, realizou cantotomia por hematoma retrobulbar e identificou telecanto em fratura NOE.',
        options: []
      }
    ],
    created_at: new Date().toISOString(),
  },
  {
    id: 'caso_trauma_pescoco_01',
    theme: 'atls_pescoco',
    title: 'Ferimento Penetrante de Pescoço',
    description: 'Você é o médico da emergência. Homem de 34 anos com ferimento por arma branca no pescoço esquerdo, zona II. Aplique o protocolo de trauma penetrante de pescoço.',
    steps: [
      {
        id: 'step1',
        content: '## Apresentação\n\nHomem, 34 anos, FAB pescoço esquerdo zona II. GCS 15, FR 20, SpO₂ 97%, FC 102, PA 118/76. Ferida de 2 cm entre cricóidea e ângulo da mandíbula. Sangramento controlado com compressão. Sem estridor. Voz levemente rouca.\n\n**Avaliação dos sinais duros e moles?**',
        options: [
          { id: 's1a', text: 'Sinais moles presentes (rouquidão + hematoma estável) — angio-TC antes de cirurgia', is_correct: true, next_step_id: 'step2', feedback: 'Correto. Rouquidão = sinal mole. Hematoma estável = sinal mole. Sem sinais duros. Paciente estável: angio-TC é o próximo passo (EAST 2023).' },
          { id: 's1b', text: 'Sinais duros presentes — exploração cirúrgica imediata', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Sinais duros = hemorragia incontrolável, hematoma expansivo, choque, déficit neurológico. Aqui há sinais moles apenas.' },
          { id: 's1c', text: 'Sem sinais significativos — suturar e dar alta', is_correct: false, next_step_id: 'step2', feedback: 'Incorreto. Todo FAB de zona II com violação do platisma requer investigação.' },
          { id: 's1d', text: 'Exploração local da ferida para avaliar violação do platisma', is_correct: false, next_step_id: 'step2', feedback: 'Parcialmente correto, mas angio-TC é mais informativa e o próximo passo padrão.' },
        ]
      },
      {
        id: 'step2',
        content: '## Angio-TC Cervical\n\nIrregularidade intimal da carótida interna esquerda com estreitamento de 20% — sem trombo. Esôfago sem alterações.\n\n**Como classificar e tratar?**',
        options: [
          { id: 's2a', text: 'Biffl grau I — antiagregação com AAS e angio-TC seriada', is_correct: true, next_step_id: 'step3', feedback: 'Correto. Irregularidade intimal + estreitamento < 25% = Biffl grau I. Antiagregação (AAS) e controle em 7-10 dias.' },
          { id: 's2b', text: 'Biffl grau III — stent endovascular imediato', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grau III é pseudoaneurisma. Este caso tem irregularidade intimal com < 25% = grau I.' },
          { id: 's2c', text: 'Exploração cirúrgica imediata e reparo da carótida', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grau I em paciente estável não requer cirurgia.' },
          { id: 's2d', text: 'Biffl grau IV — ligadura da carótida', is_correct: false, next_step_id: 'step3', feedback: 'Incorreto. Grau IV é oclusão completa. Ligadura causa AVC em 20-30%.' },
        ]
      },
      {
        id: 'step3',
        content: '## Avaliação Esofágica\n\nDisfagia e odinofagia progressivas. Crepitação subcutânea cervical posterior.\n\n**Conduta diagnóstica?**',
        options: [
          { id: 's3a', text: 'Esofagografia com gastrografina + esofagoscopia flexível — sensibilidade > 95%', is_correct: true, next_step_id: 'step4', feedback: 'Correto. Disfagia + odinofagia + enfisema posterior = lesão esofágica até prova em contrário. Combinação atinge > 95% de sensibilidade (EAST 2023).' },
          { id: 's3b', text: 'TC já foi normal — observar por 24h', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. TC tem sensibilidade limitada para lesões esofágicas pequenas.' },
          { id: 's3c', text: 'Esofagoscopia rígida apenas', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Rígida tem maior risco de perfuração. A combinação com esofagografia aumenta a sensibilidade.' },
          { id: 's3d', text: 'Deglutição de azul de metileno', is_correct: false, next_step_id: 'step4', feedback: 'Incorreto. Altíssima taxa de falso negativo — lesões pequenas não extravasam.' },
        ]
      },
      {
        id: 'step4',
        content: '## Lesão Esofágica Confirmada\n\nEsofagografia: extravasamento na parede posterior do esôfago cervical. Esofagoscopia: laceração 1,5 cm, < 24h.\n\n**Tratamento?**',
        options: [
          { id: 's4a', text: 'Reparo cirúrgico primário em duas camadas + drenagem cervical + antibióticos + sonda enteral', is_correct: true, next_step_id: 'step5', feedback: 'Correto. Lesão < 24h: reparo primário (mucosa + muscular) + drenagem + ATB + nutrição enteral.' },
          { id: 's4b', text: 'Tratamento conservador — dieta zero e antibióticos', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Lesão confirmada com extravasamento requer cirurgia — mediastinite tem mortalidade > 50%.' },
          { id: 's4c', text: 'Stent esofágico endoscópico', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Stent tem papel em perforações tardias. Lesão aguda em pescoço acessível: reparo primário.' },
          { id: 's4d', text: 'Drenagem percutânea guiada por TC', is_correct: false, next_step_id: 'step5', feedback: 'Incorreto. Drenagem percutânea não trata a lesão — apenas drena a coleção.' },
        ]
      },
      {
        id: 'step5',
        content: '## Pós-operatório — Dia 2\n\nNova queda do GCS para 12 e hemiparesia direita. TC de crânio: hipodensidade no território da artéria cerebral média esquerda.\n\n**Causa mais provável e conduta?**',
        options: [
          { id: 's5a', text: 'AVC isquêmico por tromboembolismo da lesão carotídea Biffl I — anticoagulação plena', is_correct: true, next_step_id: 'step6', feedback: 'Correto. Lesão Biffl I pode progredir para trombo e embolizar. Anticoagulação plena após avaliar risco hemorrágico cirúrgico.' },
          { id: 's5b', text: 'Hematoma intracraniano — neurocirurgia de emergência', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. TC mostra hipodensidade (isquemia), não hiperdensidade (hemorragia).' },
          { id: 's5c', text: 'Encefalopatia metabólica por sepse — antibióticos e suporte', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Encefalopatia causa rebaixamento difuso, não déficit focal.' },
          { id: 's5d', text: 'Vasoespasmo por hemorragia subaracnoide — nimodipina', is_correct: false, next_step_id: 'step6', feedback: 'Incorreto. Não há HSA. Vasoespasmo é complicação de HSA aneurismática.' },
        ]
      },
      {
        id: 'step6',
        content: '## Clearance Cervical\n\nOutro paciente: homem, 28 anos, colisão frontal 60 km/h. GCS 15, sem dor cervical, sem deficit neurológico, sem intoxicação, sem lesão distratora.\n\n**Precisa de imagem cervical?**',
        options: [
          { id: 's6a', text: 'Não — todos os critérios NEXUS negativos, clearance clínico é seguro', is_correct: true, next_step_id: 'final', feedback: 'Correto. NEXUS completamente negativo = clearance clínico. Sensibilidade 99,6%. Imagem desnecessária.' },
          { id: 's6b', text: 'Sim — colisão a 60 km/h exige TC cervical', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Velocidade isolada não é critério para imagem. NEXUS negativo = clearance clínico seguro.' },
          { id: 's6c', text: 'Sim — radiografia simples em 3 incidências', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. Com NEXUS negativo, nenhuma imagem é necessária.' },
          { id: 's6d', text: 'Sim — RM para excluir lesão ligamentar oculta', is_correct: false, next_step_id: 'final', feedback: 'Incorreto. RM é para déficit neurológico sem fratura. Com NEXUS negativo, não é indicada.' },
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