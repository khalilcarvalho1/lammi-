import { StudyTheme } from '@/services/supabaseClient'

export interface Aula {
  id: string
  title: string
  description: string
  theme: string
  type: string
  content: string
}

export const MOCK_AULAS: Aula[] = [
  {
    id: '377cee39-0d18-4215-98f3-7d933fc9a131',
    title: 'Avaliação da Cena e Atendimento Inicial no Ambiente Pré-Hospitalar',
    description: 'Abordagem pré-hospitalar ao trauma — segurança da cena, triagem START, ABCDE e decisão de transporte',
    theme: 'avaliacao_cena',
    type: 'article',
    content: `## 1. Introdução e Conceitos Fundamentais

O atendimento pré-hospitalar (APH) ao trauma representa o elo mais crítico da cadeia de sobrevivência do politraumatizado. É no ambiente pré-hospitalar que ocorrem as primeiras intervenções — e também onde os erros mais custosos acontecem. O objetivo central não é a resolução definitiva das lesões, mas a estabilização mínima necessária para o transporte seguro ao centro de trauma mais adequado no menor tempo possível.

### Hora de Ouro e Platina

O conceito de **hora de ouro**, popularizado por R. Adams Cowley, postula que a mortalidade aumenta dramaticamente quando o paciente não recebe cuidado definitivo dentro da primeira hora após o trauma. A fisiopatologia é clara: hemorragia contínua, hipóxia tecidual e ativação da cascata inflamatória criam um ciclo progressivo e autoperpetuante de disfunção orgânica.

O conceito de **platina dos primeiros 10 minutos** é ainda mais relevante no APH: cada minuto adicional na cena aumenta a mortalidade em trauma grave. Isso não significa negligenciar intervenções — significa priorizar apenas as que mudam o prognóstico imediato.

### A Tríade Letal do Trauma

A morte no trauma grave raramente resulta de uma única lesão isolada. O mais frequente é a progressão da **tríade letal**:

- **Hipotermia**: reduz a atividade enzimática da cascata de coagulação. Abaixo de 34°C, a coagulopatia se torna clinicamente significativa. Abaixo de 32°C, o risco de fibrilação ventricular aumenta dramaticamente
- **Acidose metabólica**: resultado da hipoperfusão tecidual e acúmulo de lactato. pH < 7,2 compromete gravemente a contratilidade miocárdica e a resposta aos vasopressores
- **Coagulopatia**: combinação de diluição de fatores de coagulação, consumo plaquetário e disfunção enzimática por hipotermia e acidose

Cada componente da tríade agrava os outros dois — uma vez estabelecida, a reversão exige intervenção hospitalar agressiva. A prevenção no APH é infinitamente mais eficaz que o tratamento hospitalar.

### Damage Control Resuscitation (DCR) no APH

O DCR representa uma mudança de paradigma: em vez de restaurar a normotensão com cristaloides, o objetivo é a **hemostasia permissiva** — manter perfusão mínima enquanto se controla o sangramento. Os três pilares do DCR pré-hospitalar são:

- Controle cirúrgico precoce da hemorragia (torniquete, curativos hemostáticos, compressão pélvica)
- Hipotensão permissiva (PAS 80-90 mmHg em penetrante sem TCE)
- Reposição hemostática com hemoderivados em razão 1:1:1 quando disponível

## 2. Avaliação da Cena

### 2.1 Segurança da Cena

Antes de qualquer abordagem à vítima, o socorrista deve avaliar sistematicamente a segurança do ambiente. Uma cena insegura transforma socorristas em vítimas adicionais, comprometendo todo o sistema de resposta e sobrecarregando os recursos disponíveis.

**Mnemônico CENA:**
- **C**ontaminação química, biológica, radiológica ou nuclear (CBRN)
- **E**strutura instável (colapso, incêndio, explosão iminente)
- **N**atureza da violência (crime ativo, atirador ativo)
- **A**cidente de trânsito (tráfego não controlado, risco de segundo acidente)

Condutas obrigatórias antes de entrar:
- EPI completo: luvas, óculos de proteção, máscara quando indicado
- Nunca entre em cena CBRN sem equipamento específico e treinamento
- Em acidente de trânsito: posicione a viatura em ângulo de proteção, sinalize a cena, aguarde controle do tráfego
- Em crime ativo: aguarde liberação da polícia — o APH inicia apenas após a cena ser declarada segura

### 2.2 Número de Vítimas e Acionamento de Recursos

Ao chegar, estime rapidamente o número de vítimas e acione recursos antes de iniciar o atendimento individual. O erro mais comum é iniciar atendimento de uma vítima sem acionar suporte adequado para as demais.

Avalie:
- Quantas vítimas estão presentes e qual o estado aparente de cada uma
- Necessidade de resgate técnico especializado (desencarceramento, resgate aquático, altura, CBRN)
- Capacidade dos hospitais receptores disponíveis

Uma vítima grave pode exigir 2 a 4 socorristas treinados. Em incidentes com múltiplas vítimas, ative imediatamente o **Plano de Múltiplas Vítimas (PMV)** — não espere confirmar o número exato de vítimas para acionar.

### 2.3 Mecanismo de Trauma

O mecanismo de trauma (MT) orienta a suspeita de lesões mesmo antes do exame físico. Compreender a biomecânica do trauma permite antecipar lesões e priorizar intervenções.

**Trauma contuso — padrões de lesão:**

| Mecanismo | Lesões esperadas |
|---|---|
| Colisão frontal com airbag | TCE, trauma torácico, fratura de esterno |
| Colisão frontal sem airbag | TCE, trauma cervical, fratura de fêmur |
| Colisão lateral | Trauma torácico ipsilateral, fratura de pelve, lesão de baço/fígado |
| Capotamento | TCE, lesão cervical, trauma torácico múltiplo |
| Atropelamento | Fratura de membros inferiores, trauma abdominal, TCE |
| Queda de altura | Fratura de calcâneo, compressão lombar, TCE — triângulo de Don Juan |
| Explosão | Lesão de blast pulmonar, perfuração de tímpano, TCE, lesões de fragmentos |

**Trauma penetrante:**
- Ferimento por arma de fogo: lesões no trajeto + cavitação temporária (área de destruição tecidual além do trajeto visível, proporcional à velocidade do projétil)
- Ferimento por arma branca: lesões no trajeto da lâmina — profundidade frequentemente subestimada
- Empalamento: nunca remova o objeto no APH — estabilize e transporte com o objeto in situ

O ATLS 11ª edição (2025) enfatiza que o mecanismo deve ser comunicado ativamente à equipe hospitalar receptora como parte do **MIST**.

## 3. Triagem Pré-Hospitalar

### 3.1 Conceito e Princípios

Triagem é o processo de classificar vítimas por prioridade de atendimento com base na gravidade e na disponibilidade de recursos. O princípio fundamental é **o maior bem para o maior número**: em situações de recursos limitados, vítimas com maior chance de sobrevida com menor consumo de recursos são priorizadas.

A triagem é **dinâmica** — o estado clínico muda e a categoria pode ser reavaliada. Um verde pode evoluir para vermelho; um preto pode se tornar vermelho se recursos forem liberados.

### 3.2 Sistema START

O START (Simple Triage and Rapid Treatment) classifica vítimas em menos de 60 segundos cada, em 4 categorias:

**Passo 1 — Deambulação:**
Peça a todas as vítimas que se levantem e caminhem. Quem consegue → **VERDE**. Afaste-os e instrua-os a aguardar área designada.

**Passo 2 — Respiração:**
- Ausente após reposicionamento da VA → **PRETO**
- FR > 30 irpm → **VERMELHO**
- FR ≤ 30 irpm → prossiga

**Passo 3 — Perfusão:**
- Enchimento capilar > 2s ou pulso radial ausente → **VERMELHO**
- Enchimento capilar ≤ 2s → prossiga

**Passo 4 — Estado neurológico:**
- Não obedece a comandos simples → **VERMELHO**
- Obedece → **AMARELO**

**Categorias:**
- 🔴 **VERMELHO — Imediato**: risco de vida com intervenção imediata possível
- 🟡 **AMARELO — Diferido**: lesões graves mas pode aguardar de forma segura
- 🟢 **VERDE — Menor**: lesões leves, deambula, atendimento pode ser postergado
- ⚫ **PRETO — Expectante/Óbito**: sem respiração após abertura de VA, ou lesões incompatíveis com sobrevida dado os recursos disponíveis

### 3.3 Sistema SALT e JumpSTART

O **SALT** (Sort, Assess, Lifesaving Interventions, Treatment/Transport) é uma alternativa mais recente ao START, adotada pelo FEMA nos EUA. Inclui intervenções hemostáticas imediatas (torniquete) antes da classificação final.

O **JumpSTART** é a versão pediátrica do START, adaptada para crianças menores de 8 anos ou com menos de 40 kg, com parâmetros fisiológicos ajustados.

## 4. Abordagem Primária — ABCDE

A abordagem primária no APH segue a sequência ABCDE com adaptações para o ambiente operacional. O objetivo é identificar e tratar condições com risco imediato de vida, não realizar um exame completo.

### 4.1 A — Airway com Proteção Cervical

**Avaliação rápida:**
- Paciente falando em frases completas → via aérea patente
- Estridor → obstrução parcial de via aérea superior
- Estertor, gorgolejo → secreções, sangue ou corpo estranho
- Apneia → obstrução completa ou parada respiratória

**Manobras básicas:**
- **Jaw thrust** — manobra preferencial no trauma (mantém coluna cervical em posição neutra)
- Head tilt-chin lift apenas se ausência de risco cervical
- Aspiração de secreções, sangue e corpos estranhos
- **Cânula orofaríngea (Guedel)**: em paciente inconsciente sem reflexo de vômito — escolha o tamanho correto (canto da boca até o lóbulo da orelha)
- **Cânula nasofaríngea**: em paciente com reflexo de vômito presente — contraindicada em suspeita de fratura de base de crânio

**Imobilização cervical:**
O colar cervical do tamanho correto deve ser aplicado assim que possível. Atenção: o colar cervical **não imobiliza completamente** a coluna — é necessário complementar com imobilizador lateral de cabeça e maca rígida. Um colar mal dimensionado pode causar extensão cervical iatrogênica.

**Via aérea avançada — quando indicar:**
- Glasgow ≤ 8 com incapacidade de proteger a via aérea
- Obstrução progressiva de via aérea (edema, hematoma expansivo de pescoço)
- Apneia ou bradipneia grave
- Antecipação de deterioração durante transporte prolongado

**Dispositivos:**
- Intubação orotraqueal de sequência rápida (ISR): padrão-ouro — requer treinamento e medicações
- Dispositivos supraglóticos (i-gel, máscara laríngea): alternativa quando ISR não é possível
- Cricotireoidostomia por punção (14G) ou cirúrgica: via aérea de emergência em falha de intubação — **"can't intubate, can't oxygenate"**

### 4.2 B — Breathing (Ventilação)

**Avaliação:**
- Frequência respiratória (normal: 12-20 irpm)
- Expansão torácica simétrica
- Saturação de oxigênio (SpO₂ alvo ≥ 94%)
- Ausculta pulmonar bilateral

**Condições com risco imediato de vida — identificar e tratar na cena:**

**Pneumotórax hipertensivo:**
- Clínica: desvio de traqueia (sinal tardio), hipotensão, ausência de murmúrio vesicular unilateral, turgência jugular, hipoxia progressiva
- Tratamento: **descompressão por agulha imediata** no 2º EIC, linha hemiclavicular (alternativa: 4º-5º EIC, linha axilar anterior — menor risco de lesão de subclávia)
- Não aguarde confirmação radiológica — diagnóstico é clínico

**Pneumotórax aberto (ferida torácica aspirativa):**
- Curativo de três pontas: oclusivo em três lados, deixando o quarto aberto como válvula
- Dispositivos comerciais (HyFin, Bolin Chest Seal) são superiores ao curativo artesanal

**Hemotórax maciço:**
- Suspeita em trauma torácico com hemitórax hipofonético + hipotensão
- APH: não há drenagem — posicione e transporte com urgência
- Drenagem torácica apenas em transporte prolongado por equipe habilitada

**Tórax instável (fratura de ≥ 3 costelas em ≥ 2 pontos):**
- Ventilação assistida se SpO₂ < 90%
- A contusão pulmonar subjacente é mais grave que o tórax instável propriamente

### 4.3 C — Circulation com Controle de Hemorragia

Hemorragia não controlada é a **principal causa de morte evitável no trauma**. O controle da hemorragia tem prioridade sobre o acesso venoso e a reposição volêmica.

**Controle externo de hemorragia — hierarquia de intervenções:**

**Torniquete** — hemorragias de membros com sangramento arterial ou que não cedem à pressão direta:
- Posicione 5-7 cm proximal à lesão
- Aperte até o sangramento cessar completamente (não apenas diminuir)
- Anote o horário de aplicação no próprio torniquete ou na testa do paciente
- Não remova no campo — risco de coagulopatia de reperfusão e ressangramento maciço
- Torniquetes aprovados: CAT (Combat Application Tourniquet), SOFTT-W, EMT

**Curativos hemostáticos** — lesões em junção (axila, virilha, pescoço, base do pescoço) onde o torniquete não é aplicável:
- Gaze com quitosana (HemCon) ou ácido tranexâmico incorporado (Celox, QuikClot)
- Técnica: remova excesso de sangue, empacote firmemente a ferida, comprima por mínimo 3 minutos
- Após aplicação, aplique bandagem compressiva sobre o curativo hemostático

**Compressão de pelve** — suspeita de fratura pélvica instável com instabilidade hemodinâmica:
- Cinto pélvico comercial (SAM Pelvic Sling, T-POD) ou lençol dobrado ao nível dos trocânteres maiores
- Não aplique acima das espinhas ilíacas — risco de piora do sangramento
- Estabiliza o volume pélvico e reduz o sangramento por tamponamento

**Ácido tranexâmico (ATX):**
- Dose: 1g IV/IO em 10 minutos, seguido de 1g em 8 horas
- **Janela terapêutica: máximo 3 horas após o trauma** — após esse período, pode aumentar mortalidade
- Estudo CRASH-2: redução de 15% na mortalidade por hemorragia quando administrado precocemente
- Disponível no protocolo TCCC/TECC para uso pré-hospitalar

**Acesso vascular e reposição:**
- 2 acessos venosos periféricos calibrosos (≥ 16G) em veias antecubitais
- Acesso intraósseo (IO) — úmero proximal ou tíbia proximal: alternativa imediata quando acesso venoso falha em 90 segundos
- **Não atrase o transporte para obter acesso venoso**

**Metas de reposição — hipotensão permissiva:**
- Trauma penetrante sem TCE: PAS 80-90 mmHg
- TCE grave associado: PAS ≥ 90 mmHg (perfusão cerebral depende de PAM adequada)
- Bolus de 250 mL de cristaloide aquecido, reavalie após cada bolus
- Evite hiper-hidratação: cada litro de cristaloide dilui fatores de coagulação e plaquetas

### 4.4 D — Disability (Avaliação Neurológica)

**Avaliação rápida — AVPU:**
- **A**lert: paciente alerta e orientado
- **V**oice: responde à voz
- **P**ain: responde apenas à dor
- **U**nresponsive: sem resposta a nenhum estímulo

**Escala de Coma de Glasgow (ECG):**
- Olhos (1-4) + Verbal (1-5) + Motor (1-6) = total 3-15
- ECG ≤ 8: intubação orotraqueal — paciente não protege via aérea
- ECG 9-12: monitorização rigorosa, risco de deterioração
- Avalie sempre após estabilização hemodinâmica — hipoperfusão causa rebaixamento reversível

**Pupilas:**
- Anisocoria com pupila midriática e arreativa: sinal de herniação uncal ipsilateral — emergência neurocirúrgica
- Pupilas mióticas bilaterais: intoxicação por opioides, lesão pontina
- Pupilas midriáticas bilaterais e arreativas: hipoxia prolongada, intoxicação por atropínicos, ou morte cerebral

**Glicemia capilar:**
- Hipoglicemia (< 60 mg/dL) é causa reversível de rebaixamento — trate com glicose 50% IV ou glucagon IM
- Hiperglicemia no trauma é sinal de estresse fisiológico grave e pior prognóstico

**Sinais de herniação cerebral iminente — tríade de Cushing:**
- Hipertensão arterial + bradicardia + bradipneia/irregularidade respiratória
- Conduta: hiperventilação leve transitória (alvo pCO₂ 35 mmHg) apenas como ponte para neurocirurgia — nunca como tratamento definitivo

### 4.5 E — Exposure e Controle do Ambiente

- Exponha todos os segmentos corporais para identificar lesões ocultas: corte as roupas se necessário
- Examine dorso, axilas, virilhas e períneo — locais frequentemente ignorados
- Após exposição: cubra imediatamente com manta aluminizada
- Aqueça fluidos intravenosos quando possível (bolsas aquecidas)
- Temperatura < 36°C no APH já é clinicamente significativa em traumatizados graves
- Proteja do vento, chuva e frio — o ambiente externo é o maior fator de hipotermia pré-hospitalar

## 5. Decisão de Transporte

### 5.1 Load and Go vs. Stay and Play

Esta é uma das decisões mais críticas no APH. O erro mais comum é permanecer na cena realizando intervenções que poderiam ser feitas durante o transporte.

**"Load and Go" — transportar imediatamente:**
- Via aérea não controlada com deterioração progressiva
- Choque hemorrágico (hemorragia interna suspeita)
- TCE grave (ECG ≤ 8)
- Pneumotórax hipertensivo após descompressão
- Trauma penetrante torácico ou abdominal
- Qualquer instabilidade hemodinâmica sem causa corrigível no campo

**"Stay and Play" — estabilizar antes de transportar:**
- Trauma de extremidades sem instabilidade hemodinâmica
- Paciente preso (necessidade de desencarceramento — o resgate técnico demora mais que as intervenções)
- Vítimas de afogamento com RCP em andamento
- Condições climáticas que impeçam transporte seguro imediato

**Regra dos 10 minutos:** O tempo na cena deve ser inferior a 10 minutos em trauma grave. Qualquer intervenção realizável durante o transporte deve ser feita no transporte, não na cena.

### 5.2 Destino e Critérios de Centralização

O paciente politraumatizado deve ser transportado ao **centro de trauma mais adequado**, não necessariamente ao hospital mais próximo. Desvio para hospital inadequado aumenta mortalidade.

**Critérios fisiológicos:**
- ECG ≤ 13
- PAS < 90 mmHg
- FR < 10 ou > 29 irpm
- SpO₂ < 90% com O₂ suplementar

**Critérios anatômicos:**
- Trauma penetrante de tronco, cabeça ou pescoço
- Fratura de dois ou mais ossos longos proximais
- Amputação proximal ao punho ou tornozelo
- Suspeita de lesão pélvica instável
- Paralisia ou deficit neurológico focal

**Critérios por mecanismo:**
- Queda > 6 metros (adultos) ou > 3 metros (crianças)
- Capotamento com ejeção do veículo
- Morte de outro ocupante no mesmo acidente
- Atropelamento com velocidade > 30 km/h
- Colisão com intrusão > 30 cm no compartimento do passageiro

**Populações especiais — menor limiar para centralização:**
- Gestante > 20 semanas
- Idoso > 55 anos com qualquer mecanismo significativo
- Criança < 15 anos
- Anticoagulados ou com coagulopatia conhecida
- Queimadura > 10% SCQ ou envolvendo face/vias aéreas

### 5.3 Passagem de Caso — MIST

A comunicação com a equipe receptora deve iniciar durante o transporte, não na chegada ao hospital.

- **M** — Mecanismo de trauma (detalhes do acidente, velocidade estimada, uso de cinto, airbag)
- **I** — Injúrias identificadas ou suspeitadas (seja específico: "trauma torácico direito com ausência de murmúrio vesicular")
- **S** — Sinais vitais na cena, tendência (melhorando, estável, piorando)
- **T** — Tratamento realizado e resposta (torniquete às 14h32, ATX 1g às 14h35, 2 acessos IO, 500 mL SF)

## 6. Situações Especiais

### 6.1 Parada Cardiorrespiratória Traumática

A PCRT tem fisiopatologia e manejo completamente diferentes da PCR clínica. As compressões torácicas têm baixíssima eficácia se a causa não for corrigida.

**Causas reversíveis — 4H do trauma:**
- **H**ipóxia → via aérea definitiva e ventilação com O₂ 100%
- **H**ipovolemia → controle da hemorragia e reposição volêmica agressiva
- **H**emotórax/Pneumotórax hipertensivo → descompressão bilateral por agulha
- **H**emopericárdio (tamponamento) → pericardiocentese subxifóidea ou toracotomia de reanimação

**Toracotomia de reanimação pré-hospitalar:**
- Indicada em PCR traumática com sinais de vida nos últimos 10 minutos em trauma **penetrante**
- Realizada por médico habilitado em sistema com protocolo estabelecido
- Permite: alívio de tamponamento, controle de hemorragia cardíaca, massagem cardíaca interna, oclusão de aorta descendente
- Em trauma **contuso** com PCR: sobrevida < 1% — toracotomia raramente indicada

### 6.2 Trauma Pediátrico

A criança não é um adulto pequeno — diferenças anatômicas e fisiológicas determinam padrões de lesão e respostas diferentes.

**Vias aéreas:**
- Proporcionalmente menores, mais anteriores e mais anguladas — maior risco de obstrução
- Occiput proeminente: em decúbito dorsal, causa flexão cervical natural — use coxim sob o dorso em < 8 anos

**Hemodinâmica:**
- Mecanismos compensatórios muito mais eficientes — a hipotensão é um sinal tardio e ominoso
- Taquicardia é o primeiro sinal de hipovolemia — use parâmetros normais por idade (fita de Broselow)
- Dose de cristaloide: 20 mL/kg em bolus; se sem resposta após 2 bolus → hemoderivados

**Temperatura:**
- Maior superfície corporal relativa → hipotermia mais rápida
- Aquecimento ativo precoce é mandatório

### 6.3 Trauma em Gestante

- Posicione em decúbito lateral esquerdo (ou incline a maca 15-30°) para deslocar o útero da veia cava inferior — compressão aortocaval causa hipotensão supina a partir de 20 semanas
- O feto pode estar em sofrimento grave mesmo com a mãe aparentemente estável — monitorize continuamente
- Priorize sempre a estabilização materna: a melhor forma de ressuscitar o feto é ressuscitar a mãe
- Trauma abdominal contuso: placenta é inelástica — desaceleração brusca pode causar descolamento prematuro mesmo sem impacto direto
- Transporte a centro com UTI neonatal e obstetra disponíveis

### 6.4 Trauma em Idosos

- Menor reserva fisiológica — toleram menos hipotensão, hipóxia e hipotermia
- Anticoagulantes e betabloqueadores mascaram taquicardia e respondem mal à ressuscitação
- Osteoporose: fraturas com mecanismos de baixa energia (queda da própria altura pode causar fratura de quadril, coluna, crânio)
- ECG basal alterado — fibrilação atrial crônica, bloqueios, alterações de repolarização — dificulta diagnóstico de contusão cardíaca
- Menor limiar para centralização: qualquer mecanismo significativo em > 55 anos justifica transporte a centro de trauma

## 7. Pontos-Chave

- A segurança da cena é a primeira prioridade absoluta — socorrista ferido não salva ninguém e se torna mais uma vítima
- O tempo na cena deve ser inferior a 10 minutos em trauma grave — intervenções que podem ser feitas no transporte devem ser feitas no transporte
- Controle de hemorragia é a intervenção de maior impacto na mortalidade evitável — aplique torniquete sem hesitação
- Ácido tranexâmico nas primeiras 3 horas reduz mortalidade por hemorragia — janela terapêutica estreita
- Hipotensão permissiva (PAS 80-90 mmHg) em trauma penetrante sem TCE — evite hiper-hidratação com cristaloides
- Previna a tríade letal desde a cena: manta aluminizada, fluidos aquecidos, controle da hemorragia
- A comunicação MIST deve ser feita durante o transporte, não na chegada — prepare a equipe receptora
- Destino é o centro de trauma adequado, não o hospital mais próximo — o desvio inadequado mata
- Em PCRT: trate as causas reversíveis (4H do trauma) — as compressões torácicas isoladas têm baixíssima eficácia
- Criança hipotensa em trauma é emergência extrema — a compensação eficiente mascara hipovolemia grave até o colapso
## Glossário

**APH** — Atendimento Pré-Hospitalar. Conjunto de ações de saúde realizadas fora do ambiente hospitalar, desde o local do evento até a chegada ao hospital receptor.

**ABCDE** — Sequência padronizada de avaliação primária do ATLS: Airway (via aérea), Breathing (ventilação), Circulation (circulação), Disability (avaliação neurológica), Exposure (exposição). Reflete a ordem de prioridade das condições com risco imediato de vida.

**ATLS** — Advanced Trauma Life Support. Programa de treinamento do American College of Surgeons para atendimento sistematizado ao politraumatizado, atualmente na 11ª edição (2025).

**PHTLS** — Prehospital Trauma Life Support. Programa de suporte ao trauma pré-hospitalar, baseado nos princípios do ATLS e adaptado para o ambiente extrahospitalar.

**TCCC** — Tactical Combat Casualty Care. Protocolo de atendimento ao ferido em combate, desenvolvido pelo Departamento de Defesa dos EUA. Divide o atendimento em três fases: Care Under Fire, Tactical Field Care e TACEVAC.

**TECC** — Tactical Emergency Casualty Care. Versão civil do TCCC, adaptada para situações de emergência táticas não militares (tiroteios, atentados, desastres).

**MARCH** — Mnemônico do TCCC: Massive hemorrhage (hemorragia maciça), Airway (via aérea), Respiration (ventilação), Circulation (circulação), Hypothermia (hipotermia). Define a ordem de prioridades no atendimento tático.

**MIST** — Mecanismo, Injúrias identificadas, Sinais vitais, Tratamento realizado. Protocolo de comunicação entre equipe pré-hospitalar e equipe receptora hospitalar.

**START** — Simple Triage and Rapid Treatment. Sistema de triagem para múltiplas vítimas que classifica cada paciente em menos de 60 segundos em quatro categorias: vermelho, amarelo, verde e preto.

**PMV** — Plano de Múltiplas Vítimas. Protocolo ativado quando o número de vítimas supera a capacidade de atendimento imediato da equipe presente.

**DCR** — Damage Control Resuscitation. Reanimação de controle de dano: estratégia que combina hipotensão permissiva, reanimação hemostática precoce e controle rápido da hemorragia para evitar a tríade letal.

**PAS** — Pressão Arterial Sistólica. Pressão máxima nas artérias durante a contração do ventrículo esquerdo. Parâmetro central na definição de hipotensão e metas de ressuscitação.

**PAM** — Pressão Arterial Média. Média ponderada da pressão ao longo do ciclo cardíaco. Calculada como PAD + 1/3 (PAS − PAD). Meta de perfusão orgânica: ≥ 65 mmHg.

**SpO₂** — Saturação periférica de oxigênio medida por oximetria de pulso. Expressa a porcentagem de hemoglobina saturada com oxigênio. Meta no trauma: ≥ 94%.

**EIC** — Espaço intercostal. Espaço entre duas costelas consecutivas, referência anatômica para procedimentos torácicos como descompressão por agulha e drenagem torácica.

**IO** — Intraósseo. Via de acesso vascular obtida por inserção de agulha diretamente na medula óssea (úmero proximal ou tíbia proximal). Alternativa imediata ao acesso venoso periférico quando este falha em 90 segundos.

**EPI** — Equipamento de Proteção Individual. Conjunto de dispositivos utilizados pelo socorrista para proteção contra agentes biológicos, químicos e físicos na cena do trauma.

**CBRN** — Chemical, Biological, Radiological, Nuclear. Contaminação química, biológica, radiológica ou nuclear. Situação de risco que exige equipamento específico e protocolo de descontaminação antes do atendimento às vítimas.

**GCS / ECG** — Glasgow Coma Scale / Escala de Coma de Glasgow. Escala neurológica que avalia abertura ocular (1-4), resposta verbal (1-5) e resposta motora (1-6). Total de 3 a 15 pontos. GCS ≤ 8 indica necessidade de via aérea definitiva.

**AVPU** — Alert, Voice, Pain, Unresponsive. Escala simplificada de avaliação do nível de consciência: alerta, responde à voz, responde à dor, sem resposta.

**ATX** — Ácido Tranexâmico. Agente antifibrinolítico que inibe a ativação do plasminogênio, reduzindo a dissolução de coágulos em formação. Indicado nas primeiras 3 horas do trauma hemorrágico.

**CAT** — Combat Application Tourniquet. Torniquete de combate aprovado pelo Committee on Tactical Combat Casualty Care. Padrão para controle de hemorragia de membros em ambiente pré-hospitalar.

**TCE** — Traumatismo Cranioencefálico. Lesão cerebral causada por força externa. Classificado conforme GCS: leve (GCS 13-15), moderado (GCS 9-12), grave (GCS ≤ 8).

**PCR / PCRT** — Parada Cardiorrespiratória / Parada Cardiorrespiratória Traumática. Cessação da atividade cardíaca e respiratória. A PCRT tem fisiopatologia e tratamento diferentes da PCR clínica — compressões torácicas têm baixa eficácia sem controle da causa.

**RCP** — Ressuscitação Cardiopulmonar. Conjunto de manobras (compressões torácicas + ventilação) para manutenção da circulação e oxigenação em paciente em parada cardiorrespiratória.
## Referências

Referências: 'ATLS: Advanced Trauma Life Support, 11ª edição. 2025.' → '11ª edição. 2025.'
- Prehospital Trauma Life Support Committee. PHTLS: Prehospital Trauma Life Support, 9ª edição. 2019.
- National Association of Emergency Medical Technicians. TCCC Guidelines, 2023.
- Committee on Tactical Combat Casualty Care. TECC Guidelines, 2023.
- Spahn DR et al. Management of bleeding and coagulopathy following major trauma. Critical Care, 2019.
- Roberts I et al. The CRASH-2 trial: a randomised controlled trial and economic evaluation. Health Technology Assessment, 2013.`,
  },
  {
    id: 'cdbbcb04-eb9f-4961-a251-fc03dc4c55b5',
    title: 'Cinemática do Trauma',
    description: 'Princípios físicos do trauma, padrões de lesão em colisões veiculares, quedas, explosões e trauma penetrante — base para antecipar lesões antes do exame físico',
    theme: 'cinetica_trauma',
    type: 'article',
    content: `## 1. Introdução e Importância Clínica

A cinemática do trauma é o estudo das forças físicas envolvidas em um evento traumático e das lesões que essas forças produzem nos tecidos biológicos. Compreender a cinemática permite ao socorrista e ao médico **antecipar lesões antes do exame físico** — uma competência central no atendimento ao politraumatizado.

O ATLS 11ª edição (2025) enfatiza que a avaliação do mecanismo de trauma é componente obrigatório da avaliação primária e deve ser comunicada ativamente à equipe receptora via protocolo MIST. Lesões não identificadas precocemente por falha na análise do mecanismo são causa frequente de mortalidade evitável.

### Princípios Físicos Fundamentais

Três leis da física governam a produção de lesões no trauma:

**Primeira Lei de Newton — Inércia:**
Um corpo em movimento permanece em movimento até que uma força externa atue sobre ele. No trauma, o veículo para, mas os órgãos internos continuam em movimento — é o mecanismo das lesões por desaceleração (laceração hepática, rotura de aorta, contusão cerebral).

**Lei da Conservação de Energia:**
A energia não é destruída — é transferida. A energia cinética do impacto é transferida para os tecidos na forma de deformação, compressão, cisalhamento e calor. Quanto maior a massa e a velocidade, maior a energia transferida e maior o potencial de lesão.

**Energia Cinética — EC = ½mv²:**
A velocidade é o fator dominante. Dobrando a massa, dobra-se a energia cinética. Dobrando a velocidade, quadruplica-se a energia cinética. Isso explica por que colisões em alta velocidade produzem lesões dramaticamente mais graves que colisões em baixa velocidade com a mesma massa envolvida.

### Tipos de Forças Produtoras de Lesão

- **Compressão**: força aplicada diretamente sobre o tecido — causa contusão, laceração e ruptura de vísceras sólidas e ocas
- **Cisalhamento**: forças em direções opostas aplicadas em planos diferentes — causa avulsão e laceração de estruturas fixas em pontos de transição (rotura de aorta no istmo, laceração hepática no ligamento falciforme)
- **Tensão**: estiramento do tecido além de seu limite elástico — causa rotura de ligamentos, vasos e mesentério
- **Aceleração/Desaceleração**: mudança brusca de velocidade — causa lesões nas interfaces entre estruturas de densidades diferentes (junção córtico-subcortical no TCE difuso, junção aorta ascendente/descendente)

## 2. Trauma Contuso

### 2.1 Colisões Veiculares — Os Cinco Impactos

Em uma colisão veicular, ocorrem sistematicamente cinco impactos distintos, cada um com potencial de produzir lesões específicas:

**1º Impacto — Veículo com o obstáculo:**
O veículo desacelera abruptamente. A energia cinética é transferida para a estrutura do veículo, determinando o grau de intrusão no compartimento do passageiro.

**2º Impacto — Ocupante com o veículo:**
O ocupante, ainda em movimento pela inércia, colide com o interior do veículo (volante, painel, coluna A, airbag). Este é o impacto que produz a maioria das lesões externas visíveis.

**3º Impacto — Órgãos internos com a parede corporal:**
Os órgãos internos continuam em movimento e colidem com as paredes do corpo ou são submetidos a forças de cisalhamento nos pontos de fixação. Este é o mecanismo das lesões viscerais frequentemente não aparentes externamente.

**4º Impacto — Objetos não fixos dentro do veículo:**
Objetos soltos no interior do veículo (malas, ferramentas, eletrônicos) tornam-se projéteis. Um objeto de 5 kg a 60 km/h gera força equivalente a 300 kg no impacto.

**5º Impacto — Colisão secundária:**
O veículo pode colidir com um segundo obstáculo após o impacto inicial (guard-rail, árvore, outro veículo), produzindo um segundo ciclo completo de impactos.

### 2.2 Padrões de Colisão e Lesões Esperadas

**Colisão Frontal — sem cinto de segurança:**
O ocupante segue trajetória para cima e para frente (over the wheel) ou para baixo e para frente (under the dash):

Trajetória superior (over the wheel):
- Trauma craniofacial (impacto com para-brisa)
- Trauma cervical por hiperextensão/hiperflexão
- Trauma torácico anterior (volante/painel)
- Laceração de aorta por desaceleração

Trajetória inferior (under the dash):
- Fratura de joelho, patela, fêmur proximal
- Luxação posterior de quadril com fratura de acetábulo
- Trauma abdominal por compressão contra o painel

**Colisão Frontal — com cinto de segurança:**
O cinto de três pontas distribui a força e reduz dramaticamente a mortalidade. Entretanto, produz padrões de lesão específicos:
- Fratura de esterno e costelas anteriores (cinto diagonal)
- Lesão de vísceras abdominais por compressão (cinto abdominal — síndrome do cinto de segurança)
- Fratura-luxação de coluna lombar em flexão-distração (fratura de Chance) — associada ao uso isolado de cinto abdominal sem diagonal
- Laceração de mesentério e intestino delgado por compressão contra a coluna vertebral

**Colisão Lateral:**
O impacto lateral é particularmente letal — há menos estrutura protetora entre o ocupante e o ponto de impacto.
- Trauma torácico ipsilateral (costelas, pulmão, coração)
- Fratura de pelve e acetábulo ipsilateral
- Lesão de baço (impacto esquerdo) ou fígado (impacto direito)
- Trauma cervical por flexão lateral — lesão de raízes nervosas cervicais ipsilaterais
- TCE por impacto da cabeça com coluna A ou vidro lateral

**Colisão Traseira:**
- Hiperextensão cervical (whiplash) seguida de hiperflexão — lesão ligamentar cervical posterior
- Sem contenção adequada de cabeça: lesão cervical grave
- Frequentemente subestimada clinicamente — sintomas podem surgir horas após o trauma

**Capotamento:**
Mecanismo de alta energia com padrão de lesões imprevisível e múltiplo:
- TCE — impacto repetido da cabeça com teto, janelas e estrutura interna
- Trauma cervical multidirecional — lesão ligamentar e fratura instável
- Ejeção do veículo: mortalidade 6 vezes maior que sem ejeção — ausência de cinto é o principal fator

**Colisão com Airbag:**
O airbag reduz TCE e trauma facial em colisões frontais, mas produz lesões próprias:
- Abrasões e queimaduras por atrito (pó alcalino do airbag)
- Trauma ocular e de córnea
- Fratura de membros superiores em posição inadequada no volante
- Em crianças < 12 anos e pacientes baixos próximos ao painel: risco de trauma grave por expansão do airbag

### 2.3 Atropelamento

O atropelamento produz três fases de impacto sequenciais, cada uma com padrão de lesão distinto:

**1ª fase — Impacto do para-choque:**
- Adultos: fratura de tíbia e fíbula ao nível do para-choque
- Crianças: impacto ao nível do tronco ou cabeça (maior proporção corporal) — lesões abdominais e TCE

**2ª fase — Projeção sobre o capô:**
- Trauma de quadril, pelve e abdome superior
- Trauma torácico por impacto com capô
- TCE por impacto com para-brisa

**3ª fase — Queda ao solo:**
- TCE por impacto do crânio com o asfalto — frequentemente a lesão mais grave
- Trauma de coluna cervical
- Fratura de membros superiores (mecanismo de defesa)

**Tríade de Waddell** (em pedestres adultos atropelados por veículos de passeio):
- Fratura de tíbia/fíbula ipsilateral ao impacto
- Lesão de quadril/pelve contralateral (projeção sobre o capô)
- TCE (queda ao solo)

### 2.4 Quedas

A energia cinética na queda é determinada pela altura e pela massa. A desaceleração ocorre no impacto com o solo — quanto menor a área de contato e mais rígida a superfície, maior a pressão sobre os tecidos.

**Queda de altura (> 6 metros em adultos):**
- Fratura bilateral de calcâneo — ponto de impacto primário na queda em pé
- Fratura de compressão de coluna lombar (L1-L2) — transmissão de carga axial
- Fratura de pelve
- TCE — rotação e impacto secundário da cabeça
- **Tríade de Don Juan**: fratura de calcâneo + fratura de coluna lombar + TCE

**Queda de baixa energia (< 1 metro):**
- Em jovens: raramente causa lesões graves
- Em idosos e osteoporóticos: fratura de quadril, punho (Colles), úmero proximal e vértebras — mecanismos de baixa energia causam fraturas graves
- Em anticoagulados: TCE com hematoma intracraniano mesmo em quedas leves

**Posição de queda:**
- Queda em pé: transmissão axial — calcâneo, coluna, pelve
- Queda sobre as mãos: fratura de rádio distal (Colles), úmero
- Queda sobre a cabeça: TCE, trauma cervical grave
- Queda sobre o dorso: trauma torácico posterior, coluna

### 2.5 Explosões

As explosões produzem lesões por quatro mecanismos distintos — as **4 ondas de explosão**:

**Lesão primária — onda de sobrepressão (blast):**
A onda de pressão positiva seguida de pressão negativa causa lesão preferencial em interfaces ar-líquido (pulmão, ouvido médio, intestino):
- **Lesão pulmonar de blast**: pneumotórax bilateral, hemorragia alveolar, contusão pulmonar — principal causa de morte imediata em sobreviventes próximos à explosão
- **Perfuração de tímpano**: marcador de exposição à onda de blast — indica necessidade de avaliação para lesões primárias internas
- **Lesão intestinal de blast**: perfuração e hematoma de parede — pode ter apresentação tardia (6-24h)
- **Embolia gasosa**: ar entra na circulação pulmonar — causa AVC, infarto e morte súbita

**Lesão secundária — projéteis:**
Fragmentos do dispositivo e objetos do ambiente propelidos pela explosão. Ferimentos penetrantes múltiplos, frequentemente contaminados.

**Lesão terciária — deslocamento corporal:**
O corpo é deslocado pela onda de sobrepressão e colide com estruturas sólidas. Padrão similar ao trauma contuso de alta energia.

**Lesão quaternária — outros efeitos:**
- Queimaduras (flash, chamas, vapores)
- Inalação de fumaça e gases tóxicos
- Contaminação química, biológica ou radiológica
- Esmagamento por colapso estrutural

**Imersão em água amplifica a lesão de blast** — a água transmite a onda de pressão mais eficientemente que o ar. Explosões subaquáticas causam lesões primárias graves em distâncias muito maiores.

## 3. Trauma Penetrante

### 3.1 Ferimentos por Arma de Fogo

A lesão por projétil de arma de fogo (PAF) é determinada por três fatores: **velocidade**, **massa** e **área de contato**.

**Classificação por velocidade:**
- Baixa velocidade (< 340 m/s): revólveres e pistolas civis — lesão limitada ao trajeto direto do projétil
- Média velocidade (340-600 m/s): a maioria das armas de fogo militares e civis
- Alta velocidade (> 600 m/s): rifles militares, fuzis de assalto — cavitação temporária significativa

**Cavitação:**
- **Cavitação permanente**: o canal de destruição tecidual direta pelo projétil — presente em todos os PAF
- **Cavitação temporária**: expansão e retração da cavidade ao redor do trajeto, causada pela transferência de energia cinética para os tecidos adjacentes. Ocorre em alta velocidade e pode ser 10-30x o diâmetro do projétil. Produz destruição tecidual além do trajeto visível — especialmente importante em fígado, baço e músculo

**Fatores que aumentam a transferência de energia:**
- **Fragmentação**: o projétil se fragmenta no tecido, aumentando a área de contato e a transferência de energia
- **Tombamento (yaw)**: o projétil gira em torno do eixo perpendicular ao trajeto, aumentando a área de contato
- **Deformação (expansão)**: projéteis expansivos (hollow point) aumentam o diâmetro no impacto — maior transferência de energia e maior cavitação

**Orifício de entrada vs. saída:**
- Entrada: geralmente menor, bordas regulares, halo de equimose
- Saída: geralmente maior, bordas irregulares, sem halo — ausência de orifício de saída indica projétil retido no corpo
- Exceção: projéteis de alta velocidade com tombamento podem produzir orifício de saída menor que o de entrada

**Ferimento a curta distância:**
- Marcas de pólvora e tatuagem na pele
- Queimadura ao redor do orifício de entrada
- Lesão de blast em distâncias muito curtas (arma encostada na pele)

### 3.2 Ferimentos por Arma Branca

A lesão é determinada pela extensão do trajeto da lâmina, que frequentemente é **subestimada** externamente. Uma faca com lâmina de 15 cm pode atingir estruturas profundas impossíveis de avaliar pelo orifício de entrada.

Fatores determinantes da gravidade:
- Comprimento e largura da lâmina
- Direção e ângulo de penetração
- Região anatômica
- Estruturas no trajeto

**Princípio clínico fundamental**: em ferimento penetrante, assuma que todas as estruturas no trajeto anatômico provável foram lesadas até que se prove o contrário. Nunca minimize um ferimento por arma branca baseado no tamanho do orifício de entrada.

### 3.3 Empalamento

Objeto penetrante que permanece fixado ao corpo:
- **Nunca remova o objeto no ambiente pré-hospitalar** — o objeto pode estar tamponando uma hemorragia vascular
- Estabilize o objeto com curativos volumosos ao redor
- Transporte com o objeto in situ
- Remoção apenas em centro cirúrgico com controle vascular preparado

## 4. Fatores que Modificam a Gravidade das Lesões

### 4.1 Equipamentos de Segurança

**Cinto de segurança de três pontas:**
- Reduz mortalidade em colisões frontais em até 45%
- Reduz risco de ejeção em 30 vezes
- Produz padrão de lesão próprio quando mal posicionado (síndrome do cinto)
- Deve ser ajustado: diagonal sobre o ombro e tórax, abdominal sobre a pelve — nunca sobre o abdome

**Airbag:**
- Reduz TCE em colisões frontais em 30%
- Efetivo apenas em conjunto com o cinto de segurança
- Sem cinto: o ocupante pode ser projetado contra o airbag em expansão — lesão cervical grave
- Airbag lateral e de cortina: proteção adicional em colisões laterais

**Capacete:**
- Reduz mortalidade em acidentes motociclísticos em 37%
- Reduz TCE grave em até 69%
- Tipos: integrais (proteção total) vs. abertos (proteção parcial — sem proteção facial)
- Remoção no APH: apenas se necessário para acesso à via aérea — manobra a dois com controle cervical rigoroso

**Assento infantil:**
- Reduz mortalidade em lactentes em 71% e em crianças em 54%
- Mal posicionado ou mal fixado: risco de lesão cervical grave

### 4.2 Características da Superfície de Impacto

- Superfície rígida (asfalto, concreto): maior transferência de energia, menor área de absorção
- Superfície macia (terra, grama, neve): amortecimento parcial da energia cinética
- Água: amortecimento relativo, mas em mergulho de altura → desaceleração abrupta similar ao concreto acima de 30 km/h

### 4.3 Características do Hospedeiro

- **Idade**: reserva fisiológica reduzida em idosos — lesões leves causam mortalidade desproporcional
- **Obesidade**: proteção relativa em impactos de baixa energia, mas dificulta ventilação e acesso vascular
- **Osteoporose**: fraturas em mecanismos de baixa energia
- **Anticoagulação**: hemorragia intracraniana e intra-abdominal em traumas aparentemente leves
- **Álcool e drogas**: mascaramento de sintomas, aumento de risco comportamental

## 5. Aplicação Clínica — Raciocínio por Mecanismo

### 5.1 Como Usar a Cinemática na Prática

O raciocínio cinemático deve ser sistemático e documentado:

**Na cena:**
1. Qual foi o mecanismo? (colisão, queda, explosão, penetrante)
2. Qual foi a velocidade/energia envolvida?
3. Quais estruturas estavam na linha de força?
4. Que equipamentos de proteção estavam em uso?
5. Qual foi o estado do veículo/objeto? (intrusão, deformação)

**Na avaliação clínica:**
- Use o mecanismo para guiar a pesquisa de lesões não aparentes
- Mecanismo de alto risco: rastreamento mais agressivo, menor limiar para exames de imagem
- Ausência de sintomas não exclui lesão em mecanismo de alta energia

### 5.2 Mecanismos de Alto Risco — Rastreamento Mandatório

Os seguintes mecanismos exigem avaliação completa independentemente dos sintomas iniciais:

- Colisão > 60 km/h com deformação significativa do veículo
- Capotamento com ejeção ou sem cinto
- Morte de outro ocupante no mesmo acidente
- Queda > 6 metros (adulto) ou > 3 metros (criança)
- Atropelamento > 30 km/h
- Explosão com exposição próxima
- Ferimento por PAF de alta velocidade
- Trauma penetrante de tronco, cabeça ou pescoço

### 5.3 Comunicação do Mecanismo — MIST

O mecanismo deve ser comunicado com precisão à equipe receptora:

Não diga: "paciente em acidente de carro"

Diga: "homem, 34 anos, motorista sem cinto em colisão frontal a aproximadamente 80 km/h, com intrusão de 30 cm no compartimento do motorista, airbag deflagrado, óbito de passageiro no mesmo veículo. Trajeto over the wheel. Lesões identificadas: trauma craniofacial, suspeita de trauma torácico anterior e instabilidade hemodinâmica. Sinais vitais na cena: PA 80/50, FC 128, Glasgow 12. Tratamento: 2 acessos IO, 500 mL SF, colar cervical, prancha longa."

## 6. Pontos-Chave

- Energia cinética cresce com o quadrado da velocidade — pequenos aumentos de velocidade produzem lesões muito mais graves
- Em colisão veicular, cinco impactos sequenciais ocorrem — analise cada um para antecipar lesões
- A cavitação temporária em PAF de alta velocidade destrói tecidos além do trajeto visível — nunca subestime
- Lesão de blast afeta preferencialmente interfaces ar-líquido — pulmão, ouvido médio e intestino
- Fratura de tímpano é marcador de exposição à onda de blast e indica avaliação para lesões internas invisíveis
- A tríade de Don Juan (calcâneo + coluna lombar + TCE) deve ser pesquisada em toda queda de altura
- Nunca remova objeto empalado no APH — pode estar tamponando hemorragia vascular letal
- Mecanismo de alto risco exige rastreamento agressivo independentemente dos sintomas iniciais
- O mecanismo de trauma deve ser comunicado com detalhes específicos via MIST — não apenas "acidente de carro"
- Em idosos e anticoagulados, mecanismos de baixa energia podem produzir lesões de alta gravidade
## Glossário

**EC** — Energia Cinética. Energia associada ao movimento de um corpo. Calculada pela fórmula EC = ½mv². No trauma, determina o potencial de lesão: a velocidade é o fator dominante pois eleva a energia ao quadrado.

**PAF** — Projétil de Arma de Fogo. Objeto propelido por uma arma de fogo. As lesões variam conforme velocidade, massa, fragmentação e tombamento do projétil.

**TCE** — Traumatismo Cranioencefálico. Lesão cerebral por força externa. No contexto da cinemática, resulta de impacto direto do crânio ou de aceleração-desaceleração do encéfalo dentro da caixa craniana.

**MIST** — Mecanismo, Injúrias, Sinais vitais, Tratamento. Protocolo de passagem de caso entre equipes. O mecanismo detalhado é o componente central derivado da análise cinemática.

**ATLS** — Advanced Trauma Life Support. Programa do American College of Surgeons para atendimento sistematizado ao politraumatizado. Incorpora a análise cinemática como parte obrigatória da avaliação primária.

**TCCC** — Tactical Combat Casualty Care. Protocolo de atendimento ao ferido em combate. Incorpora princípios cinemáticos para antecipação de lesões em ambiente tático.

**APH** — Atendimento Pré-Hospitalar. Fase do cuidado em que a análise cinemática é mais relevante — o socorrista tem acesso à cena e ao mecanismo antes que qualquer evidência seja alterada.

**Yaw (tombamento)** — Rotação do projétil em torno do eixo perpendicular à sua trajetória. Aumenta a área de contato com o tecido e amplia a cavitação temporária, agravando a lesão.

**Cavitação temporária** — Expansão e retração rápida de uma cavidade ao redor do trajeto do projétil de alta velocidade, causada pela transferência de energia cinética para os tecidos adjacentes. Pode destruir tecidos a distâncias maiores que o trajeto visível.

**Cavitação permanente** — Canal de destruição tecidual direta pelo trajeto do projétil. Presente em todos os ferimentos por arma de fogo, independentemente da velocidade.

**Blast** — Onda de sobrepressão gerada por explosão. Causa lesão primária preferencial em interfaces ar-líquido: pulmão, ouvido médio e intestino.

**CBRN** — Chemical, Biological, Radiological, Nuclear. Agentes de contaminação em explosões ou ataques táticos. A lesão quaternária do blast inclui exposição a esses agentes.

**Tríade de Don Juan** — Fratura bilateral de calcâneo + fratura de compressão de coluna lombar + TCE. Padrão clássico de lesões em queda de altura em pé.

**Tríade de Waddell** — Fratura de tíbia/fíbula ipsilateral + lesão de quadril/pelve contralateral + TCE. Padrão de lesões em pedestres adultos atropelados por veículos de passeio.

**GCS** — Glasgow Coma Scale. Escala de avaliação neurológica com pontuação de 3 a 15. No contexto cinemático, a alteração do GCS após trauma de alta energia indica TCE até prova em contrário.

**PAS** — Pressão Arterial Sistólica. Parâmetro hemodinâmico central na avaliação das consequências do trauma de alta energia.

**EPI** — Equipamento de Proteção Individual. Capacetes, cintos, airbags e coletes são EPIs que modificam a transferência de energia e o padrão de lesões.

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, '11ª edição. 2025.'
- Prehospital Trauma Life Support Committee. PHTLS: Prehospital Trauma Life Support, 9ª edição. 2019.
- McSwain NE. Kinematics of Trauma. In: Feliciano DV, Mattox KL, Moore EE. Trauma, 8ª edição. McGraw-Hill, 2017.
- Bir C, Przekwas A. Blast injuries: Overview of mechanisms, clinical presentation, and management. Journal of Trauma and Acute Care Surgery, 2020.
- National Association of Emergency Medical Technicians. TCCC Guidelines, 2023.`,
  },
  {
    id: 'ec94c1c4-d706-457e-ae3d-25a9d9c0baf4',
    title: 'ATLS: Atendimento Inicial ao Politraumatizado',
    description: 'Avaliação primária e secundária, sequência ABCDE, reanimação simultânea e transferência segura do politraumatizado baseadas no ATLS 10ª edição',
    theme: 'atls_inicial',
    type: 'article',
    content: `## 1. Introdução e Filosofia do ATLS
 
O Advanced Trauma Life Support (ATLS) é o padrão internacional de atendimento ao paciente traumatizado, desenvolvido pelo American College of Surgeons em 1978 e atualmente em sua 11ª edição (2025). Sua filosofia central é tratar primeiro a ameaça mais letal — independentemente do diagnóstico definitivo — e não causar dano adicional ao paciente já comprometido.
 
O ATLS 11ª edição introduz a sequência **xABCDE**, formalizando o controle de hemorragia exsanguinante como etapa anterior ao ABCDE:
 
**x — Exsanguinating hemorrhage (hemorragia exsanguinante):**
Para pacientes com hemorragia externa maciça visível — amputação traumática, sangramento arterial de membro, ferida no pescoço com hemorragia ativa — o torniquete ou curativo hemostático precede qualquer outra avaliação. Em pacientes sem hemorragia exsanguinante evidente, a sequência ABCDE clássica permanece inalterada.
 
**"Trate primeiro o que mata primeiro"**: a sequência xABCDE reflete a ordem em que as condições ameaçam a vida. Hemorragia exsanguinante mata em segundos a minutos; obstrução de via aérea em 3-5 minutos; pneumotórax hipertensivo em minutos a dezenas de minutos.
 
### O Conceito de Hora de Ouro
 
A distribuição trimodal da mortalidade no trauma descreve três picos:
 
- **Imediato** (segundos a minutos): lacerações de aorta, coração, tronco cerebral — raramente salváveis
- **Precoce** (minutos a horas): hematoma subdural, hemopneumotórax, rotura de baço, hemorragia interna — a **hora de ouro** é a janela terapêutica deste grupo
- **Tardio** (dias a semanas): sepse, falência de múltiplos órgãos, TEP — resultado direto da qualidade do atendimento inicial
### Preparação Antes da Chegada do Paciente
 
O atendimento começa antes da chegada do paciente. A equipe de trauma deve:
 
- Receber o MIST da equipe pré-hospitalar e briefar toda a equipe
- Preparar equipamentos de via aérea (videolaringoscópio — primeira escolha na 11ª ed., tubos, laringoscópio de backup)
- Preparar acesso vascular e hemoderivados
- Definir papéis: líder da equipe, via aérea, circulação, registro, comunicação
- Usar EPI completo: luvas, avental, óculos, máscara
## 2. Avaliação Primária — xABCDE
 
A avaliação primária identifica e trata condições com risco imediato de vida de forma simultânea — não sequencial quando há equipe. O líder coordena enquanto outros membros executam intervenções em paralelo.
 
### x — Controle de Hemorragia Exsanguinante
 
Avalie visualmente na chegada: há hemorragia externa maciça?
 
**Indicações de intervenção imediata antes do ABCDE:**
- Sangramento arterial ativo de membro → torniquete imediato (5-7 cm proximal, apertar até cessar, anotar horário)
- Hemorragia de junção (virilha, axila, pescoço) → curativo hemostático com compressão direta
- Ferida torácica ou abdominal com sangramento externo maciço → packing e compressão
**Na ausência de hemorragia exsanguinante externa visível:** prossiga diretamente para ABCDE.
 
### A — Airway (Via Aérea com Proteção da Coluna Cervical)
 
**Avaliação em segundos:**
- Paciente falando em voz clara → via aérea patente, mas reavalie continuamente
- Agitação → hipóxia até que se prove o contrário
- Estridor → obstrução parcial de via aérea superior — emergência
- Ausência de movimentos respiratórios → obstrução completa ou apneia
**Proteção cervical simultânea:**
A coluna cervical deve ser mantida em posição neutra durante toda a manipulação da via aérea. O colar cervical deve ser aplicado após estabilização manual bimanual — nunca antes de garantir a via aérea. Em paciente agitado ou não cooperativo, o colar pode piorar a situação — mantenha estabilização manual.
 
**ATLS 11ª ed. — restrição de movimento espinal seletiva:**
No trauma contuso com mecanismo de risco: colar cervical + imobilizador lateral. No trauma penetrante cervical: a restrição rígida é deenfatizada — fraturas cervicais instáveis são raras no penetrante e o atraso na via aérea é prejudicial.
 
**Manobras progressivas:**
 
Nível 1 — Manobras básicas:
- Jaw thrust (trauma) ou head tilt-chin lift (não trauma)
- Aspiração de sangue, secreções e corpos estranhos
- Cânula orofaríngea (Guedel): paciente inconsciente sem reflexo de vômito
- Cânula nasofaríngea: paciente com reflexo de vômito — contraindicada em suspeita de fratura de base de crânio
Nível 2 — Via aérea definitiva:
Indicada quando:
- Glasgow ≤ 8
- Obstrução de via aérea não resolvida com manobras básicas
- Apneia ou bradipneia grave
- Antecipação de deterioração
**Via aérea definitiva** = tubo com cuff abaixo das cordas vocais, fixado e conectado a ventilação com O₂.
 
**Sequência de Intubação Rápida (SIR):**
- Pré-oxigenação: O₂ 100% por 3-5 minutos
- Reposição volêmica antes da indução + vasopressor seletivo para prevenir hipotensão peri-intubação (ATLS 11ª ed.)
- Etomidato 0,3 mg/kg IV ou Ketamina 1-2 mg/kg IV
- Succinilcolina 1,5 mg/kg IV ou Rocurônio 1,2 mg/kg IV
- **Videolaringoscópio: primeira escolha para todas as intubações** (ATLS 11ª ed.) — não apenas em via aérea difícil
- Confirmação de posição: capnografia (padrão-ouro), ausculta epigástrica e bilateral, radiografia de tórax
### B — Breathing (Ventilação e Oxigenação)
 
**Avaliação:**
- Frequência respiratória (normal 12-20 irpm)
- Expansão torácica simétrica
- Saturação de oxigênio: alvo SpO₂ ≥ 94%
- Ausculta bilateral e percussão torácica
**Seis condições torácicas com risco imediato de vida — identificar e tratar na avaliação primária:**
 
**1. Pneumotórax hipertensivo:**
- Clínica: hipotensão + ausência de murmúrio vesicular unilateral + distensão jugular + desvio de traqueia (sinal tardio)
- Tratamento imediato — não aguarde imagem: **descompressão por agulha** no 2º EIC, linha hemiclavicular → drenagem torácica como definitivo
**2. Hemotórax maciço:**
- Definição: > 1500 mL de sangue na cavidade pleural
- Tratamento: drenagem torácica (5º EIC, linha axilar média, tubo 36-40F) + reposição volêmica + toracotomia se débito inicial > 1500 mL
**3. Pneumotórax aberto (ferida torácica aspirativa):**
- Tratamento: curativo de três pontas + drenagem torácica em local separado
**4. Tórax instável com contusão pulmonar:**
- Tratamento: O₂, analgesia regional, ventilação mecânica se SpO₂ < 90%
**5. Tamponamento cardíaco:**
- FAST (janela pericárdica) — sensibilidade > 95%
- Tratamento: pericardiocentese subxifóidea → toracotomia de urgência
**6. Rotura de traqueia ou brônquio fonte:**
- Tratamento: cirúrgico urgente
### C — Circulation (Circulação com Controle de Hemorragia)
 
**Avaliação rápida do estado circulatório:**
- Nível de consciência: hipoperfusão cerebral → agitação → confusão → rebaixamento
- Coloração e temperatura da pele
- Pulso: frequência, amplitude e regularidade
- Pressão arterial
**Controle da hemorragia — prioridade:**
 
Hemorragia externa (já abordada no x):
- Pressão direta, torniquete em membros, curativos hemostáticos em junções
Hemorragia interna — identificar a origem:
- Tórax, abdome, pelve, ossos longos, retroperitônio
**Damage Control Resuscitation (ATLS 11ª ed.):**
- Cristaloides: volumes limitados — priorize hemoderivados precocemente
- Hemoderivados em razão 1:1:1 (plasma:plaquetas:concentrado de hemácias)
- **Hipotensão permissiva**: PAS 80-90 mmHg em trauma penetrante sem TCE
- Ácido tranexâmico 1g IV em 10 minutos nas primeiras 3 horas
**Classificação do choque hemorrágico (ATLS):**
 
| Classe | Perda (mL) | Perda (%) | FC | PAS | FR | Consciência |
|---|---|---|---|---|---|---|
| I | < 750 | < 15% | < 100 | Normal | 14-20 | Normal |
| II | 750-1500 | 15-30% | 100-120 | Normal/↓ | 20-30 | Ansioso |
| III | 1500-2000 | 30-40% | 120-140 | ↓ | 30-40 | Confuso |
| IV | > 2000 | > 40% | > 140 | ↓↓ | > 35 | Letárgico |
 
### D — Disability (Avaliação Neurológica Rápida)
 
**AVPU:**
- Alert / Voice / Pain / Unresponsive
**Glasgow Coma Scale:**
- Olhos: 4 (espontâneo), 3 (à voz), 2 (à dor), 1 (ausente)
- Verbal: 5 (orientado), 4 (confuso), 3 (palavras), 2 (sons), 1 (ausente)
- Motor: 6 (obedece), 5 (localiza), 4 (retirada), 3 (flexão), 2 (extensão), 1 (ausente)
- Total 3-15: ≤ 8 = via aérea definitiva
**Glicemia capilar:** hipoglicemia é causa reversível — trate antes de atribuir rebaixamento ao trauma
 
### E — Exposure e Controle do Ambiente
 
- Remova toda a roupa
- Examine dorso: log-roll com quatro pessoas mantendo alinhamento
- **Prevenção de hipotermia**: cubra imediatamente com manta aquecida após exposição
## 3. Reanimação Simultânea
 
A reanimação ocorre em paralelo com a avaliação primária. Enquanto o líder avalia xABCDE, outros membros:
 
- Instalam monitorização: oximetria, capnografia, ECG, pressão arterial
- Obtêm acessos vasculares e coletam sangue
- Instalam sonda vesical
- Realizam FAST (eFAST)
### FAST e eFAST
 
**Janelas do FAST:**
- Pericárdica (subxifóidea): tamponamento
- Hepatorrenal (Morrison): líquido livre QSD
- Esplenorrenal: líquido livre QSE
- Pélvica (Douglas): líquido livre pélvico
**eFAST adiciona:**
- Pleural bilateral: pneumotórax e hemotórax
**Interpretação clínica:**
- FAST positivo + instabilidade → laparotomia ou toracotomia de emergência sem TC
- FAST positivo + estabilidade → TC de corpo inteiro
- FAST negativo + instabilidade → reavalie outras fontes
## 4. Avaliação Secundária
 
A avaliação secundária só se inicia após a avaliação primária completa e estabilização do xABCDE.
 
### Anamnese — AMPLE
 
- **A**lergias
- **M**edicamentos em uso
- **P**assado médico e cirúrgico
- **L**ast meal (última refeição)
- **E**vento e ambiente (mecanismo detalhado)
### Exame Físico Completo — Cabeça aos Pés
 
Cabeça, face, pescoço, tórax, abdome, pelve, membros, neurológico completo.
 
**Radiografias Iniciais:**
- Tórax AP
- Pelve AP
A TC de corpo inteiro (whole-body CT com contraste) é o padrão no paciente estável.
 
## 5. Transferência e Destino
 
### Damage Control Surgery (DCS)
 
Em paciente com a tríade letal (hipotermia + acidose + coagulopatia):
 
1. **Cirurgia abreviada**: controle da hemorragia e contaminação apenas
2. **UTI**: correção da tríade letal, aquecimento, reposição de coagulopatia
3. **Cirurgia definitiva**: reconstrução após estabilização fisiológica (24-72h)
## 6. Pontos-Chave
 
- xABCDE (ATLS 11ª ed.): controle de hemorragia exsanguinante precede a via aérea em pacientes selecionados
- Videolaringoscópio é agora a primeira escolha para todas as intubações no trauma (ATLS 11ª ed.)
- FAST positivo + instabilidade → sala de cirurgia, não TC
- Hipotensão permissiva (PAS 80-90) em penetrante sem TCE — cristaloides em volumes limitados
- Ácido tranexâmico nas primeiras 3 horas — janela terapêutica estreita
- Glasgow ≤ 8 → via aérea definitiva imediata
- Restrição de movimento espinal seletiva no ATLS 11ª ed. — deênfase no penetrante
- Damage Control Surgery em paciente com tríade letal
- Avaliação secundária só começa após xABCDE completo e paciente estabilizado

## Glossário

**ATLS** — Advanced Trauma Life Support. Programa do American College of Surgeons para atendimento sistematizado ao politraumatizado, atualmente na 11ª edição (2025). Base de toda esta aula.

**ABCDE** — Airway, Breathing, Circulation, Disability, Exposure. Sequência de avaliação primária que reflete a ordem de letalidade das condições no trauma.

**FAST** — Focused Assessment with Sonography in Trauma. Ultrassonografia focada realizada à beira do leito para detectar líquido livre em pericárdio, peritônio e pleura em menos de 3 minutos.

**eFAST** — Extended FAST. Versão ampliada que adiciona avaliação pleural bilateral para pneumotórax (ausência de deslizamento pleural) e hemotórax.

**SIR** — Sequência de Intubação Rápida. Técnica de via aérea definitiva que combina sedação e bloqueio neuromuscular para criar condições ideais de intubação minimizando o risco de broncoaspiração.

**IOT** — Intubação Orotraqueal. Inserção de tubo endotraqueal com cuff pela boca até a traqueia. Via aérea definitiva padrão no trauma.

**GCS / ECG** — Glasgow Coma Scale / Escala de Coma de Glasgow. Avalia abertura ocular (1-4), resposta verbal (1-5) e resposta motora (1-6). GCS ≤ 8: via aérea definitiva obrigatória.

**AVPU** — Alert, Voice, Pain, Unresponsive. Escala rápida de consciência usada na avaliação primária.

**DCR** — Damage Control Resuscitation. Reanimação de controle de dano: hipotensão permissiva + reanimação hemostática 1:1:1 + controle precoce da hemorragia.

**DCS** — Damage Control Surgery. Cirurgia de controle de dano em três fases: cirurgia abreviada (< 90 min) → UTI (correção da tríade letal) → cirurgia definitiva.

**ATX** — Ácido Tranexâmico. Antifibrinolítico indicado nas primeiras 3 horas do trauma. Dose: 1g IV em 10 minutos + 1g em 8 horas.

**PAS** — Pressão Arterial Sistólica. Meta de hipotensão permissiva: 80-90 mmHg em trauma penetrante sem TCE.

**PAM** — Pressão Arterial Média. Meta de perfusão cerebral em TCE: PAM ≥ 80 mmHg para manter PPC adequada.

**PIC** — Pressão Intracraniana. Pressão dentro da caixa craniana. Normal: < 15 mmHg. PIC > 22 mmHg: tratamento imediato. Elevação causa herniação cerebral.

**PPC** — Pressão de Perfusão Cerebral. Calculada como PAM − PIC. Meta em TCE grave: 60-70 mmHg.

**TCE** — Traumatismo Cranioencefálico. Lesão cerebral por força externa. GCS ≤ 8: TCE grave com indicação de IOT e monitorização de PIC.

**MIST** — Mecanismo, Injúrias, Sinais vitais, Tratamento. Protocolo de comunicação entre equipe pré-hospitalar e receptora.

**AMPLE** — Alergias, Medicamentos, Passado médico, Last meal (última refeição), Evento. Mnemônico da anamnese na avaliação secundária.

**IO** — Intraósseo. Acesso vascular pela medula óssea. Qualquer fármaco e fluido pode ser administrado. Indicado quando acesso venoso periférico falha em 90 segundos.

**ETCO₂** — CO₂ ao final da expiração (End-Tidal CO₂). Medido por capnografia. Padrão-ouro para confirmação de posição do tubo endotraqueal. ETCO₂ > 20 mmHg confirma posição traqueal.

**SpO₂** — Saturação periférica de oxigênio. Meta: ≥ 94%. Abaixo de 90% indica hipóxia grave.

**REBOA** — Resuscitative Endovascular Balloon Occlusion of the Aorta. Cateter com balão posicionado na aorta para reduzir hemorragia intraabdominal ou pélvica como ponte para cirurgia.

**TEG / ROTEM** — Tromboelastografia / Tromboelastometria rotacional. Exames viscoelastométricos que avaliam toda a cascata de coagulação em tempo real, guiando a reposição específica de hemoderivados.

**VATS** — Video-Assisted Thoracic Surgery. Cirurgia torácica vídeo-assistida. Abordagem minimamente invasiva para hemotórax residual, pneumotórax persistente e outras lesões torácicas.

**UTI** — Unidade de Terapia Intensiva. Ambiente de monitorização e suporte intensivo. Fase 2 do DCS ocorre na UTI.

**Tríade letal** — Hipotermia + Acidose + Coagulopatia. Ciclo vicioso autoperpetuante no trauma grave. Prevenção desde o APH é mais eficaz que o tratamento hospitalar.


## Referências
 
- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- Gruen RL et al. Advanced trauma life support 2025: A brief review of updates. Injury. 2026;57(4):113079.
- Rossaint R et al. The European guideline on management of major bleeding and coagulopathy following trauma, 5ª edição. Critical Care, 2019.
- Spahn DR et al. Management of bleeding and coagulopathy following major trauma. Critical Care, 2019.`,
  },
  {
    id: '17b706a1-8a0e-440c-88ce-be179e40ebe9',
    title: 'ATLS: Via Aérea e Ventilação no Trauma',
    description: 'Avaliação e manejo da via aérea no paciente traumatizado — manobras básicas, sequência de intubação rápida, dispositivos supraglóticos e via aérea cirúrgica baseados no ATLS 10ª edição',
    theme: 'atls_via_aerea',
    type: 'article',
    content: `## 1. Introdução e Importância Clínica

A via aérea é o primeiro componente da avaliação primária no ATLS — e por razão óbvia. Obstrução de via aérea não tratada mata em 3 a 5 minutos. Nenhuma outra condição no trauma tem janela terapêutica tão estreita.

O manejo da via aérea no trauma difere do manejo eletivo em aspectos críticos:
- Estômago presumivelmente cheio — risco de broncoaspiração
- Coluna cervical potencialmente instável — restringe movimentação
- Hipóxia e hipercapnia preexistentes — reduzem margem de segurança
- Instabilidade hemodinâmica — altera farmacocinética dos agentes
- Via aérea pode estar anatomicamente distorcida — sangue, edema, corpo estranho, hematoma

O princípio fundamental é: **nunca deixe o paciente hipóxico enquanto planeja o manejo da via aérea**. Pré-oxigenação adequada e decisão precoce são mais importantes que a técnica escolhida.

### Anatomia Relevante no Trauma

**Traqueia:** estrutura rígida de 10-12 cm, fixada superiormente pela cartilagem cricóidea e bifurcando-se na carina (T4-T5). Deslocamento traqueal indica pneumotórax hipertensivo ou hematoma mediastinal.

**Membrana cricotireóidea:** estrutura avascular de 22-30 mm de largura e 9-10 mm de altura, localizada entre a cartilagem tireóidea (superior) e cricóidea (inferior). É o acesso cirúrgico de emergência — palpável na linha média, acima da cartilagem cricóidea.

**Laringe:** estrutura mais anterior e cefálica em crianças — torna a intubação mais difícil e a cricotireoidostomia contraindicada em menores de 12 anos (use cricotireoidostomia por punção).

**Epiglote:** protege a via aérea durante a deglutição. Trauma direto ou edema por inalação pode causar obstrução aguda.

## 2. Avaliação da Via Aérea

### Identificação Imediata de Obstrução

A avaliação da via aérea deve ser completada em menos de 10 segundos:

**Paciente que fala em frases completas e com voz clara:**
- Via aérea patente no momento — reavalie continuamente
- Não significa que permanecerá patente (hematoma em expansão, edema progressivo)

**Sinais de obstrução parcial:**
- Estridor inspiratório: obstrução supraglótica (língua, corpo estranho, hematoma, edema)
- Estridor bifásico: obstrução glótica ou subglótica
- Rouquidão: lesão ou edema das cordas vocais — sinal de alerta para obstrução iminente
- Estertor (som de gorgolejo): sangue ou secreções na via aérea superior
- Agitação inexplicada: hipóxia até que se prove o contrário

**Sinais de obstrução completa:**
- Ausência de movimentos respiratórios com esforço ventilatório visível (retrações)
- Cianose central (lábios, mucosa oral)
- Apneia

### Preditores de Via Aérea Difícil no Trauma

A avaliação da dificuldade prevista de intubação é obrigatória antes da SIR — uma vez que o agente paralisante é administrado, não há retorno.

**Mnemônico LEMON:**
- **L**ook externally: trauma facial, pescoço curto e largo, obesidade mórbida, abertura oral limitada, micrognatia
- **E**valuate 3-3-2: distância interincisivos ≥ 3 dedos, distância mento-hioide ≥ 3 dedos, distância hioide-tireóidea ≥ 2 dedos
- **M**allampati: classificação I-IV da visualização das estruturas faríngeas (difícil de avaliar em trauma agudo)
- **O**bstruction: corpo estranho, hematoma, edema, tumor
- **N**eck mobility: suspeita de lesão cervical limita extensão — use videolaringoscópio

**Situações de via aérea previsivelmente difícil:**
- Trauma maxilofacial grave com distorção anatômica
- Hematoma expansivo de pescoço
- Queimadura de via aérea com edema progressivo
- Corpo estranho visível
- Trismo por trauma mandibular

**Princípio crítico**: em via aérea previsivelmente difícil, **acorde o plano antes de paralisar**. Tenha o videolaringoscópio, os dispositivos supraglóticos e o kit de cricotireoidostomia preparados e abertos antes de administrar qualquer fármaco.

## 3. Manejo da Via Aérea — Progressão Escalonada

### Nível 1 — Manobras Básicas

**Jaw thrust (protrusão mandibular):**
- Manobra preferencial no trauma — não movimenta a coluna cervical
- Técnica: posicione os dedos indicadores atrás dos ângulos mandibulares e empurre a mandíbula anteriormente, enquanto os polegares abrem a boca
- Mantém a coluna em posição neutra — pode ser realizada com colar cervical posicionado

**Head tilt-chin lift:**
- Contraindicada quando há suspeita de lesão cervical
- Reservada para situações sem risco cervical (afogamento, PCR não traumática)

**Aspiração:**
- Remova sangue, secreções e corpos estranhos com sonda de Yankauer
- Em trauma facial grave: aspiração cega pode ser necessária — cuidado com instabilidade de base de crânio

**Posicionamento:**
- Decúbito dorsal com estabilização cervical em posição neutra
- Em vômito iminente: incline a prancha lateralmente mantendo alinhamento — manobra de Trendelenburg invertido não é recomendada no trauma cervical

### Nível 2 — Adjuvantes de Via Aérea

**Cânula orofaríngea (Guedel):**
- Indicação: paciente inconsciente sem reflexo de vômito (Glasgow ≤ 8 sem reflexo)
- Contraindicação: reflexo de vômito presente — causa vômito e broncoaspiração
- Tamanho correto: distância do canto da boca ao lóbulo da orelha
- Técnica de inserção: introduza com a curvatura invertida (côncavo para cima) e rotacione 180° ao atingir a orofaringe — evita empurrar a língua posteriormente

**Cânula nasofaríngea:**
- Indicação: paciente com reflexo de vômito presente que necessita de adjuvante
- Contraindicação relativa: suspeita de fratura de base de crânio (risco de inserção intracraniana — raro mas documentado)
- Tamanho: 6-9 mm de diâmetro interno; comprimento: distância da narina à orelha
- Lubrificação com gel lidocaína 2%: reduz sangramento e desconforto
- Inserção perpendicular ao plano facial, direcionada ao assoalho nasal (não para cima)

**Oxigênio suplementar:**
- Máscara facial simples: FiO₂ 35-50% com 6-10 L/min
- Máscara com reservatório (não reinalante): FiO₂ 85-100% com 12-15 L/min — use em todos os traumatizados graves
- Cateter nasal: FiO₂ 24-44% — insuficiente em trauma grave, use apenas quando máscara não é tolerada

**Ventilação com bolsa-valva-máscara (BVM):**
- Indicação: apneia ou ventilação inadequada antes da via aérea definitiva
- Técnica correta é fundamental: máscara bem vedada, jaw thrust com dedos 3-4-5, compressão com polegar e indicador (técnica CE)
- Técnica a dois operadores: um mantém a máscara com ambas as mãos (CE bilateral), outro comprime a bolsa — superior à técnica a um operador
- Volume corrente: 6-8 mL/kg — evite hiperinsuflação (distensão gástrica e broncoaspiração)
- Frequência: 10-12 irpm em adultos
- Insuficiência de vedação: use cânula orofaríngea + nasofaríngea simultaneamente

### Nível 3 — Via Aérea Definitiva

**Definição**: tubo com cuff inflado abaixo das cordas vocais, fixado, com posição confirmada, conectado a fonte de O₂.

**Indicações absolutas:**
- Glasgow ≤ 8 (incapacidade de proteger a via aérea)
- Apneia ou bradipneia grave (FR < 8 irpm)
- Hipóxia refratária (SpO₂ < 90% com O₂ suplementar)
- Obstrução de via aérea não resolvida com manobras básicas

**Indicações relativas (antecipação de deterioração):**
- Queimadura de via aérea (estridor, rouquidão, fuligem nas narinas, chamuscamento de cílios)
- Hematoma expansivo de pescoço
- Edema facial ou cervical progressivo
- Transporte prolongado com paciente marginal
- Agitação intratável com hipóxia

## 4. Sequência de Intubação Rápida (SIR)

A SIR é o método padrão para via aérea definitiva no trauma em paciente com estômago cheio. Combina sedação e paralisia neuromuscular para criar condições ideais de intubação enquanto minimiza o risco de broncoaspiração.

### Os 7 Ps da SIR

**1. Preparação:**
- Equipe: operador principal + assistente + terceiro para cricóidea e medicações
- Equipamentos checados e funcionais:
  - Laringoscópio direto (lâminas Macintosh 3 e 4, Miller 2 e 3) com luz funcionando
  - Videolaringoscópio (primeira escolha em trauma cervical e via aérea difícil prevista)
  - Tubos orotraqueais: 7,5 e 8,0 para mulheres, 8,0 e 8,5 para homens — cuff testado
  - Fio-guia (estilete) moldado em ângulo de 35°
  - Seringa 10 mL para cuff
  - Fixador de tubo ou cadarço
  - Capnógrafo conectado e funcionando
  - Aspirador ligado com sonda Yankauer
  - Kit de cricotireoidostomia aberto e acessível
  - BVM conectada ao O₂

**2. Pré-oxigenação:**
- Objetivo: aumentar a reserva de oxigênio — substituir N₂ alveolar por O₂ (desnitrogenação)
- Técnica ideal: máscara com reservatório a 15 L/min por 3-5 minutos em respiração espontânea
- Em apneia: BVM com PEEP (válvula de PEEP 5-10 cmH₂O) — reduz atelectasia e mantém capacidade residual funcional
- Posicionamento: cabeceira 20-30° (posição de rampa em obesos) — aumenta capacidade residual funcional e tempo de apneia segura
- Tempo de apneia segura após pré-oxigenação adequada: 3-8 minutos em adulto saudável, 1-3 minutos em obesos e gestantes

**3. Pré-tratamento:**
- **Lidocaína 1,5 mg/kg IV** (3 min antes): atenua o aumento de PIC pela laringoscopia — indicada em TCE grave
- **Fentanil 3 mcg/kg IV** (3 min antes): atenua resposta simpática — indicado em hipertensão grave ou dissecção de aorta
- Atropina (0,02 mg/kg, mínimo 0,1 mg): em crianças < 5 anos para prevenir bradicardia vagal pela succinilcolina

**4. Paralisia com sedação simultânea:**

**Agentes indutores (sedação):**

| Agente | Dose | Vantagens | Desvantagens |
|---|---|---|---|
| Etomidato | 0,3 mg/kg IV | Mínimo efeito hemodinâmico, rápido onset | Supressão adrenal transitória |
| Ketamina | 1-2 mg/kg IV | Broncodilatador, mantém PA, analgésico | Aumenta secreções, dissociação |
| Midazolam | 0,1-0,3 mg/kg IV | Amnésia, anticonvulsivante | Hipotensão em hipovolemia |
| Propofol | 1-2 mg/kg IV | Rápido, reduz PIC | Hipotensão grave — evitar em trauma |
| Tiopental | 3-5 mg/kg IV | Reduz PIC | Hipotensão grave — evitar em trauma |

**Etomidato** é o agente de escolha no trauma pela estabilidade hemodinâmica. **Ketamina** é alternativa válida — estudos recentes não confirmam aumento clinicamente relevante de PIC com doses de indução.

**Agentes bloqueadores neuromusculares:**

**Succinilcolina 1,5 mg/kg IV:**
- Onset: 45-60 segundos
- Duração: 10-15 minutos (hidrólise por pseudocolinesterase plasmática)
- Vantagem: duração ultracurta — se a intubação falhar, o paciente recupera a respiração espontânea
- Contraindicações absolutas: hipercalemia conhecida ou suspeita (lesão por esmagamento > 24h, queimaduras extensas > 24h, paraplegia crônica, miopatias), história de hipertermia maligna, miotonia
- Efeitos: fasciculações musculares, aumento transitório de potássio sérico (0,5-1 mEq/L)

**Rocurônio 1,2 mg/kg IV:**
- Onset: 60-90 segundos (em dose alta de 1,2 mg/kg)
- Duração: 45-70 minutos
- Vantagem: sem contraindicações da succinilcolina
- Desvantagem: duração longa — se a intubação falhar, o paciente permanece paralisado
- Reversão: sugammadex 16 mg/kg IV reverte em 3 minutos — deve estar disponível quando rocurônio é usado

**5. Posicionamento:**
- Posição de cheiro: flexão do pescoço com extensão atlanto-occipital — alinha eixos oral, faríngeo e laríngeo
- No trauma: posição neutra com BURP (Backward, Upward, Right Pressure) — manipulação externa da laringe melhora visualização sem extensão cervical

**6. Laringoscopia e intubação:**

**Laringoscopia direta:**
- Lâmina Macintosh (curva): a ponta é posicionada na valécula (entre a base da língua e a epiglote) — a epiglote é elevada indiretamente
- Lâmina Miller (reta): a ponta passa por baixo da epiglote, elevando-a diretamente — preferida em epiglote grande ou flácida
- Movimento de tração: sempre no eixo do cabo (45°) — nunca alavanca nos dentes superiores
- Visualização: classificação de Cormack-Lehane (I: cordas completamente visíveis; II: porção posterior; III: apenas epiglote; IV: nada)
- Cormack-Lehane III-IV: use bougie ou videolaringoscópio

**Bougie (introdutor de tubo):**
- Dispositivo semirrígido introduzido pela glote sob visão parcial
- Confirme posição traqueal: sensação de cliques (anéis traqueais) e stop distal (carina)
- Deslize o tubo sobre o bougie com rotação anti-horária de 90° para facilitar a passagem pelas cordas

**Videolaringoscópio:**
- Primeira escolha em via aérea difícil prevista e trauma cervical
- Melhora a visualização em Cormack-Lehane III-IV
- Não elimina a necessidade de treinamento — a visualização na tela não garante que o tubo chegará à glote (angulação excessiva)
- Modelos: GlideScope, C-MAC, McGrath, King Vision

**7. Confirmação e fixação:**
- **Capnografia (ETCO₂)**: padrão-ouro — forma de onda com ETCO₂ > 20 mmHg confirma posição traqueal
- Ausculta epigástrica: ausência de sons durante insuflação
- Ausculta pulmonar bilateral: expansão simétrica
- Radiografia de tórax: confirma profundidade (cuff 2-3 cm acima da carina, nível de T2-T3)
- SpO₂: manutenção ou melhora da saturação
- **Tubo esofágico não detectado = morte** — nunca confie em ausculta isolada

**Fixação:**
- Cadarço ou fixador comercial
- Marque o número do tubo no lábio (geralmente 21-23 cm em adultos)
- Verifique após qualquer mobilização do paciente

## 5. Dispositivos Supraglóticos

Alternativas à IOT quando a intubação falha ou não é possível. Não são via aérea definitiva — são ponte para via aérea definitiva ou para ventilação em situações de emergência.

**Máscara laríngea (LMA):**
- Inserção às cegas, rápida e com mínimo treinamento
- Não protege contra broncoaspiração — risco em estômago cheio
- LMA ProSeal e Supreme: canal de drenagem gástrica — menor risco de aspiração
- Indicação no trauma: falha de IOT como dispositivo de resgate temporário

**i-gel:**
- Dispositivo supraglótico sem cuff inflável — vedação por termoplástico que molda à anatomia laríngea
- Canal gástrico integrado
- Inserção simples e rápida — adequado para uso por não especialistas
- Pressão de vedação de 20-24 cmH₂O — suficiente para a maioria dos pacientes

**Combitubo esofagotraqueal:**
- Dispositivo de duplo lúmen inserido às cegas — ventila independentemente de estar no esôfago ou traqueia
- Em desuso — substituído pelo i-gel e LMA Supreme

## 6. Via Aérea Cirúrgica

Indicada quando todas as tentativas de intubação falham e o paciente não pode ser ventilado adequadamente com dispositivos supraglóticos — situação **"can't intubate, can't oxygenate" (CICO)**.

### Cricotireoidostomia Cirúrgica

**Técnica padrão — ATLS:**

1. Identifique a membrana cricotireóidea por palpação (entre cartilagem tireóidea e cricóidea)
2. Estabilize a laringe com a mão não dominante (polegar e dedo médio nos cornos tireoidianos)
3. Incisão vertical na pele de 3-4 cm sobre a membrana (reduz risco de lesão vascular lateral)
4. Incisão horizontal na membrana cricotireóidea de 1,5-2 cm
5. Dilate a abertura com o cabo do bisturi ou gancho traqueal
6. Insira tubo traqueal 6,0 com cuff ou tubo específico para cricotireoidostomia
7. Insuflação do cuff, ventilação e confirmação por capnografia

**Técnica com bougie (Scalpel-Finger-Bougie):**
- Incisão vertical na pele + incisão horizontal na membrana
- Insira o dedo indicador para palpar o interior da traqueia
- Introduza o bougie pela abertura, guiado pelo dedo
- Deslize o tubo 6,0 sobre o bougie
- Confirme por capnografia

**Conversão em traqueostomia formal:** dentro de 72 horas — a cricotireoidostomia não é definitiva.

**Contraindicações:**
- Menores de 12 anos: use cricotireoidostomia por punção como ponte para traqueostomia cirúrgica
- Transecção de traqueia: acesse a traqueia distal diretamente pelo pescoço

### Cricotireoidostomia por Punção

**Técnica:**
1. Identifique a membrana cricotireóidea
2. Insira cateter 14G em seringa com soro — aspire ar para confirmar posição traqueal
3. Avance o cateter, retire a agulha
4. Conecte ao oxigênio a 15 L/min com conector em Y ou orifício lateral — ventilação por jato (jet ventilation)
5. Ciclo: 1 segundo de insuflação / 4 segundos de expiração passiva

**Limitações críticas:**
- Máximo 30-45 minutos — hipercapnia progressiva (a expiração é inadequada)
- Não é via aérea definitiva — use como ponte para cricotireoidostomia cirúrgica ou traqueostomia
- Risco de barotrauma se a via aérea superior estiver completamente obstruída

## 7. Ventilação Mecânica Inicial no Trauma

Após a intubação, os parâmetros ventilatórios iniciais devem ser ajustados para evitar lesão pulmonar induzida pelo ventilador (LPIV) e controlar a pCO₂ conforme a situação clínica.

**Parâmetros iniciais:**
- Volume corrente: 6-8 mL/kg de peso predito (ventilação protetora)
- Frequência respiratória: 12-16 irpm
- PEEP: 5 cmH₂O inicial — ajuste conforme oxigenação
- FiO₂: 100% inicialmente — reduza para menor FiO₂ que mantém SpO₂ ≥ 94%
- Modo: volume controlado (VC-AC) ou pressão controlada

**Metas:**
- SpO₂: 94-99%
- pCO₂: 35-45 mmHg (normocapnia)
- pCO₂ 35 mmHg: apenas em herniação cerebral iminente como medida transitória
- Evite hiperoxia: pO₂ > 300 mmHg está associada a pior prognóstico neurológico

**Situações especiais:**
- TCE grave: normocapnia rigorosa (pCO₂ 35-40 mmHg) — hipercapnia aumenta PIC, hipocapnia causa vasoconstrição cerebral
- Contusão pulmonar grave: ventilação protetora com PEEP elevada (8-12 cmH₂O) e hipercapnia permissiva
- Choque hemorrágico: minimize pressões de vias aéreas — ventilação de alta pressão reduz retorno venoso e agrava o choque

## 8. Situações Especiais

### Via Aérea no TCE Grave

- IOT precoce indicada com Glasgow ≤ 8
- Evite hipóxia (SpO₂ < 90%) e hipercapnia (pCO₂ > 45) — ambas aumentam PIC e pioram o prognóstico neurológico
- Lidocaína pré-tratamento 1,5 mg/kg: atenua o aumento de PIC pela laringoscopia
- Etomidato como indutor: mínimo efeito hemodinâmico, não aumenta PIC
- Evite hiperventilação profilática: use apenas em herniação iminente como ponte

### Via Aérea em Trauma Cervical

- **Videolaringoscópio: PRIMEIRA ESCOLHA para TODAS as intubações no trauma** (ATLS 11ª Ed., 2025) — não apenas em via aérea difícil ou instabilidade cervical
- Manutenção de alinhamento cervical manual durante toda a laringoscopia
- Colar cervical deve ser aberto (parte anterior removida) durante a laringoscopia — melhora abertura oral sem perder o alinhamento cervical se um assistente mantiver estabilização manual
- Lesão laríngea ou traqueal: intubação com broncoscópio flexível sob visão direta — a laringoscopia cega pode completar a transecção

### Via Aérea em Queimadura

- Intube precocemente — o edema progride rapidamente e a via aérea pode se tornar impossível de intubar em horas
- Sinais de queimadura de via aérea: fuligem nas narinas, chamuscamento de cílios e sobrancelhas, estridor, rouquidão, queimadura facial
- Via aérea edematosa: tubo menor que o habitual — tenha 6,0 e 6,5 prontos
- Succinilcolina contraindicada após 24-48h da queimadura: hipercalemia letal

### Via Aérea Pediátrica

Diferenças anatômicas que impactam o manejo:
- Via aérea proporcionalmente menor — tubos menores, sondas de aspiração menores
- Laringe mais anterior e cefálica — visualização mais difícil
- Epiglote mais longa e em formato de Ω — lâmina reta (Miller) preferida
- Occiput proeminente — causa flexão cervical em decúbito dorsal; use coxim sob o dorso em < 8 anos
- Maior consumo de O₂ — tempo de apneia segura muito menor
- Fórmula do tubo: (idade/4) + 4 para tubos sem cuff; (idade/4) + 3,5 para tubos com cuff
- Profundidade: (idade/2) + 12 cm no lábio

## 9. Pontos-Chave

- Via aérea obstruída mata em 3-5 minutos — é a primeira prioridade absoluta do ATLS
- Jaw thrust é a manobra preferencial no trauma — não movimenta a coluna cervical
- Glasgow ≤ 8 indica via aérea definitiva — não espere deterioração adicional
- Pré-oxigenação adequada com máscara com reservatório por 3-5 minutos antes da SIR é obrigatória
- Etomidato é o indutor de escolha no trauma — mínimo efeito hemodinâmico
- Succinilcolina é contraindicada em hipercalemia, esmagamento > 24h e miopatias
- Rocurônio 1,2 mg/kg tem onset similar à succinilcolina — use com sugammadex disponível
- Capnografia é o padrão-ouro para confirmar posição do tubo — nunca confie apenas na ausculta
- Via aérea difícil prevista: prepare o plano B antes de paralisar — videolaringoscópio e kit de cricotireoidostomia abertos
- CICO: cricotireoidostomia cirúrgica imediata — não perca tempo em tentativas repetidas de IOT
- Hiperventilação profilática em TCE é prejudicial — use apenas em herniação iminente como ponte
## Glossário

**IOT** — Intubação Orotraqueal. Inserção de tubo endotraqueal com cuff pela boca até a traqueia, abaixo das cordas vocais. Via aérea definitiva padrão no trauma.

**SIR** — Sequência de Intubação Rápida. Técnica que combina agente indutor (sedação) + bloqueio neuromuscular para criar condições ideais de intubação em paciente com estômago cheio.

**GCS** — Glasgow Coma Scale. Escala neurológica de 3 a 15 pontos. GCS ≤ 8: incapacidade de proteger a via aérea → IOT obrigatória.

**ETCO₂** — CO₂ ao final da expiração. Medido por capnografia — forma de onda com ETCO₂ > 20 mmHg confirma posição traqueal do tubo. Padrão-ouro para confirmação de IOT.

**SpO₂** — Saturação periférica de oxigênio por oximetria de pulso. Meta: ≥ 94%. Queda < 90% indica hipóxia grave — intervenção imediata.

**BVM** — Bolsa-Válvula-Máscara (Bag-Valve-Mask). Dispositivo de ventilação manual composto por máscara facial, válvula unidirecional e bolsa autoinflável. Usado para ventilação antes da via aérea definitiva.

**PEEP** — Positive End-Expiratory Pressure. Pressão positiva mantida nas vias aéreas ao final da expiração. Previne colapso alveolar e melhora a oxigenação. Valor inicial habitual: 5 cmH₂O.

**FiO₂** — Fração inspirada de oxigênio. Proporção de O₂ no ar inspirado. Ar ambiente: FiO₂ = 0,21 (21%). Máscara com reservatório a 15 L/min: FiO₂ ≈ 0,85-1,0.

**PaO₂** — Pressão parcial de oxigênio no sangue arterial. Normal: 80-100 mmHg. Avaliada pela gasometria arterial.

**PaCO₂ / pCO₂** — Pressão parcial de CO₂ no sangue arterial. Normal: 35-45 mmHg. Alvo em TCE grave: 35-40 mmHg (normocapnia). Hiperventilação para 30-35 apenas em herniação iminente como medida transitória.

**PIC** — Pressão Intracraniana. Normal: < 15 mmHg. Elevação causa herniação. A hipercapnia (pCO₂ > 45) aumenta a PIC por vasodilatação cerebral.

**LEMON** — Mnemônico para avaliação de via aérea difícil: Look externally, Evaluate 3-3-2, Mallampati, Obstruction, Neck mobility.

**CICO** — Can't Intubate, Can't Oxygenate. Situação de emergência em que todas as tentativas de IOT falharam e a oxigenação não é possível com dispositivos supraglóticos. Indica cricotireoidostomia cirúrgica imediata.

**LMA** — Laryngeal Mask Airway. Máscara laríngea. Dispositivo supraglótico inserido às cegas, sem visão direta das cordas vocais. Não protege contra broncoaspiração — dispositivo de resgate temporário.

**EIC** — Espaço intercostal. Referência anatômica: descompressão por agulha no 2º EIC linha hemiclavicular, ou 4º-5º EIC linha axilar anterior.

**ISR** — Intubação de Sequência Rápida. Sinônimo de SIR.

**TCE** — Traumatismo Cranioencefálico. No manejo da via aérea, o TCE grave exige normocapnia rigorosa e pré-tratamento com lidocaína para atenuar o aumento de PIC pela laringoscopia.

**VC** — Volume Corrente. Volume de ar inspirado ou expirado em cada ciclo respiratório. Meta na ventilação protetora: 6-8 mL/kg de peso predito.

**FR** — Frequência Respiratória. Número de ciclos respiratórios por minuto. Normal: 12-20 irpm. No ventilador: iniciar com 12-16 irpm.

**Bougie** — Introdutor de tubo endotraqueal semirrígido. Inserido pela glote sob visão parcial (Cormack-Lehane III), permite deslizar o tubo sobre ele até a traqueia. Sensação de cliques (anéis traqueais) confirma posição correta.

**Cormack-Lehane** — Classificação da visão laringoscópica: grau I (cordas completamente visíveis), II (porção posterior), III (apenas epiglote), IV (nada visível). Graus III-IV indicam uso de bougie ou videolaringoscópio.

**Etomidato** — Agente indutor de escolha no trauma. Dose: 0,3 mg/kg IV. Vantagem: mínimo efeito hemodinâmico, não aumenta PIC.

**Ketamina** — Agente indutor alternativo. Dose: 1-2 mg/kg IV. Vantagem: broncodilatador, mantém pressão arterial, analgésico. Estudos recentes não confirmam aumento clinicamente relevante de PIC com doses de indução.

**Succinilcolina** — Bloqueador neuromuscular despolarizante. Dose: 1,5 mg/kg IV. Onset: 45-60s. Duração: 10-15 min. Contraindicada em hipercalemia, esmagamento > 24h, queimaduras extensas > 24h, miopatias.

**Rocurônio** — Bloqueador neuromuscular não despolarizante. Dose alta: 1,2 mg/kg IV. Onset: 60-90s. Duração: 45-70 min. Revertido por sugammadex 16 mg/kg IV.

**Sugammadex** — Agente de reversão específico do rocurônio. Dose: 16 mg/kg IV para reversão de emergência. Reversão completa em 3 minutos. Deve estar disponível sempre que rocurônio é usado.

**Manobra de Sellick** — Pressão aplicada sobre a cartilagem cricóidea durante a laringoscopia para comprimir o esôfago e reduzir o risco de regurgitação. Uso controverso — pode dificultar a visualização.

**BURP** — Backward, Upward, Right Pressure. Manipulação externa da laringe pelo assistente durante a laringoscopia para melhorar a visão das cordas vocais sem extensão cervical.

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- Higgs A et al. Guidelines for the management of tracheal intubation in critically ill adults. British Journal of Anaesthesia, 2018.
- Brown CA et al. Rapid sequence intubation for adults outside the operating room. UpToDate, 2023.
- Walls RM, Murphy MF. Manual of Emergency Airway Management, 4ª edição. Lippincott, 2012.
- Frerk C et al. Difficult Airway Society guidelines for management of unanticipated difficult intubation in adults. British Journal of Anaesthesia, 2015.`,
  },
  {
    id: 'd34971b1-b040-4081-82e7-4a9b9b6c96b6',
    title: 'ATLS: Trauma de Face',
    description: 'Avaliação e manejo do trauma maxilofacial — fraturas de face, lesões de partes moles, comprometimento de via aérea e condutas baseadas no ATLS 10ª edição e diretrizes da IATSIC 2023',
    theme: 'atls_face',
    type: 'article',
    content: `## 1. Introdução e Relevância Clínica

O trauma maxilofacial representa 30-50% de todos os traumas e está presente em 50-70% dos politraumatizados graves. Sua relevância no contexto do ATLS não está na complexidade reconstrutiva — está no comprometimento imediato da via aérea e no volume de hemorragia que pode produzir.

O erro mais comum no trauma de face é focar na lesão aparente e negligenciar a via aérea. Fraturas de face raramente matam diretamente — matam quando obstruem a via aérea ou quando produzem hemorragia maciça não controlada.

### Atualização das Diretrizes — 2023

O ATLS 11ª edição (2025) e as diretrizes da International Association for Trauma Surgery and Intensive Care (IATSIC 2023) convergem nos seguintes pontos atualizados:

- A angioembolização transarterial substituiu a ligadura cirúrgica de carótida externa como tratamento de escolha para hemorragia maxilofacial refratária
- O REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta) zona III tem papel limitado no trauma de face — a hemorragia é predominantemente da circulação da carótida externa
- O packing nasal e sinusal com balões de oclusão é a primeira linha para epistaxe posterior grave
- A tomografia computadorizada com reconstrução tridimensional é o padrão diagnóstico — substituiu as radiografias simples na maioria dos centros
- O manejo definitivo das fraturas pode ser postergado 7-10 dias sem comprometer o resultado funcional — priorize via aérea, hemorragia e lesões associadas

### Anatomia Relevante

**Estrutura óssea facial:**
A face é dividida em três terços:
- **Terço superior**: osso frontal, teto das órbitas, seio frontal
- **Terço médio**: maxila, zigoma, ossos nasais, etmoide, esfenóide — contém a maior parte das fraturas classificadas por Le Fort
- **Terço inferior**: mandíbula — o único osso móvel da face

**Suprimento vascular:**
- Artéria carótida externa e seus ramos (facial, maxilar interna, temporal superficial) suprem a maior parte da face
- Artéria etmoidal anterior e posterior (ramos da carótida interna via oftálmica): suprimento do septo e teto nasal
- Hemorragia grave no trauma de face é quase sempre da artéria maxilar interna e seus ramos — alvo principal da angioembolização

**Inervação sensitiva:**
- V1 (oftálmico): fronte, pálpebra superior, dorso nasal
- V2 (maxilar): pálpebra inferior, bochecha, lábio superior, asa do nariz — atravessa o forame infraorbital
- V3 (mandibular): lábio inferior, mento, parte anterior da orelha — atravessa o forame mentual
- Hipoestesia no território de V2 (bochecha e lábio superior) sugere fratura de assoalho de órbita ou zigomático-maxilar com compressão do nervo infraorbital

**Relação com estruturas nobres:**
- Seio cavernoso: imediatamente posterior ao etmoide e esfenóide — fraturas de base de crânio anterior podem atingi-lo
- Nervo óptico: canal óptico no esfenóide — fraturas do ápice orbitário podem causar neuropatia óptica traumática
- Artéria carótida interna: canal carotídeo na base do crânio — fratura de base pode causar fístula carotídeo-cavernosa ou dissecção

## 2. Avaliação Primária — Foco na Via Aérea

No trauma de face, a avaliação primária é dominada pelo componente A (via aérea). As demais letras seguem o protocolo padrão do ATLS.

### Comprometimento de Via Aérea no Trauma de Face

**Mecanismos de obstrução:**
- **Deslocamento posterior de estruturas**: fratura de mandíbula bilateral com perda do ponto de apoio da língua — a língua cai posteriormente obstruindo a hipofaringe
- **Fragmentos ósseos e dentários**: podem ser aspirados ou obstruir a laringe
- **Sangue e coágulos**: hemorragia abundante na orofaringe — aspiração é mandatória
- **Edema progressivo**: especialmente em queimaduras associadas e trauma de partes moles extenso
- **Hematoma de assoalho bucal**: fratura de mandíbula com hematoma expansivo pode elevar a língua e obstruir a via aérea

**Avaliação:**
- Inspecione a cavidade oral: sangue, coágulos, fragmentos dentários, fragmentos ósseos
- Avalie abertura oral (trismo indica fratura mandibular ou espasmo dos pterigóideos)
- Observe padrão respiratório: estridor, estertor, uso de musculatura acessória
- Palpe a mandíbula: mobilidade anormal, crepitação, dor focal

**Posicionamento terapêutico:**
- Fratura de mandíbula bilateral com obstrução: puxe a mandíbula anteriormente (jaw thrust) — geralmente resolve a obstrução imediatamente
- Se disponível: fio de tração passado atrás dos dentes anteriores inferiores e tracionado anteriormente
- Decúbito lateral (posição de recuperação): permite drenagem de sangue e secreções — use se não houver suspeita de lesão cervical

### Decisão da Via Aérea

**Via aérea definitiva imediata:**
- Obstrução que não resolve com manobras básicas
- Hemorragia orofaríngea maciça incontrolável
- Glasgow ≤ 8 associado
- Trauma maxilofacial grave com antecipação de edema progressivo

**IOT no trauma de face — considerações específicas:**
- Abertura oral limitada por trismo: videolaringoscópio ou fibrobronscoscópio flexível
- Sangue e secreções: aspiração vigorosa antes e durante a laringoscopia
- Distorção anatômica grave: considere intubação com fibroscópio flexível em paciente acordado (awake intubation) se o tempo permitir
- Fratura de base de crânio com suspeita de comunicação com fossa craniana: **intubação nasotraqueal é contraindicada** — risco de inserção intracraniana do tubo

**Cricotireoidostomia cirúrgica:**
- Indicada quando IOT é impossível (trauma maxilofacial cataclísmico com destruição anatômica total)
- Técnica conforme descrito na aula de via aérea
- Contraindicada em menores de 12 anos: use punção percutânea como ponte

## 3. Controle da Hemorragia no Trauma de Face

A hemorragia maxilofacial pode ser exsanguinante. A face tem suprimento vascular abundante e os vasos não sofrem vasospasmo eficiente após lesão — ao contrário dos vasos de membros.

### Epistaxe Traumática

**Anterior** (plexo de Kiesselbach — septo anterior):
- Compressão digital por 10-15 minutos com cabeça em posição neutra (não hiperextendida — evita deglutição de sangue)
- Tamponamento anterior com gaze vaselinada ou dispositivo específico (Merocel)
- Cauterização com nitrato de prata se visível

**Posterior** (artéria esfenopalatina, ramos da maxilar interna):
- Mais grave — sangramento volumoso e difícil de controlar externamente
- **Balão de Foley**: introduza pelo nariz até a nasofaringe, insuflação do balão com 7-15 mL de soro + tração anterior até parar o sangramento + fixação
- Tamponamento posterior com gaze (técnica de Rogers) — mais doloroso, menos eficaz que o balão
- Dispositivos específicos: EpiStat, Rapid Rhino (balão com gel)
- Refratária ao tamponamento: **angioembolização transarterial** da artéria maxilar interna ou esfenopalatina — padrão atual conforme IATSIC 2023
- Ligadura cirúrgica: reservada para falha da angioembolização ou indisponibilidade

### Hemorragia de Partes Moles

- Pressão direta com curativo compressivo — eficaz na maioria dos casos
- Pinçamento seletivo de vasos visíveis: cuidado com ramos do nervo facial
- Sutura hemostática de urgência: não precisa ser estética — apenas funcional para hemostasia
- Evite clampeamento cego de vasos na profundidade — risco de lesão do nervo facial

### Hemorragia Intraoral

- Aspiração contínua — evita broncoaspiração
- Packing com gaze úmida em lacerações de mucosa
- Suturas hemostáticas de urgência em lacerações de língua e assoalho bucal
- Fratura de mandíbula com sangramento do canal alveolar inferior: pressão direta e imobilização provisória

## 4. Avaliação Secundária — Trauma de Face

A avaliação secundária do trauma de face é sistemática, da cabeça para baixo, integrando inspeção, palpação e avaliação neurológica.

### Inspeção

- **Assimetria facial**: depressão malar (fratura zigomática), afundamento frontal, desvio nasal
- **Edema e equimose**: olhos de guaxinim (equimose periorbital bilateral) → fratura de base de crânio anterior; sinal de Battle (equimose mastóidea) → fratura de base de crânio posterior
- **Lacerações**: documentar localização, profundidade, estruturas envolvidas
- **Sangramento**: localização (nasal, oral, auricular), volume estimado
- **Oclusão dentária**: mordida aberta anterior (fratura Le Fort II/III ou fratura de côndilo mandibular bilateral), desvio de linha média (fratura mandibular)
- **Enoftalmia**: globo ocular afundado na órbita → fratura de assoalho orbitário com herniação de gordura periorbitária
- **Proptose**: hematoma retrobulbar — emergência oftalmológica

### Palpação Sistemática

Palpe toda a estrutura óssea facial de forma sistemática:

**Fronte e rebordos supraorbitários:**
- Afundamento, crepitação, dor focal → fratura de seio frontal ou rebordo supraorbitário

**Rebordos orbitários:**
- Percorra todo o rebordo com a polpa dos dedos (superior, lateral, inferior, medial)
- Degrau palpável ou dor focal → fratura de rebordo

**Região malar (zigomática):**
- Depressão da eminência malar → fratura zigomático-maxilar
- Anestesia de bochecha e lábio superior → compressão do nervo infraorbital

**Nariz:**
- Desvio, mobilidade, crepitação → fratura nasal
- Afundamento da pirâmide nasal → fratura naso-orbito-etmoidal (NOE)
- Distância intercantal aumentada (telecanto) → fratura NOE com afastamento dos tendões cantais mediais (normal: 30-35 mm)

**Maxila:**
- Segure a maxila entre o polegar e o indicador e aplique força de tração anterior e posterior
- Mobilidade → fratura Le Fort (qualquer nível)
- Palpe a sutura naso-frontal: se se mover junto com a maxila → Le Fort III

**Mandíbula:**
- Percorra todo o rebordo mandibular: sínfise, corpo, ângulo, ramo
- Dor focal, degrau, mobilidade anormal → fratura
- Palpe o côndilo mandibular bimanualmente (intrabucal + extrabucal)
- Avalie amplitude de abertura oral e desvio à abertura

### Avaliação Oftalmológica de Emergência

Deve ser realizada antes de qualquer edema que impeça a avaliação:

- **Acuidade visual**: peça para o paciente contar dedos ou ler texto — redução indica lesão do nervo óptico ou do globo
- **Movimentação ocular**: limitação de supraversão (fratura de assoalho com encarceramento do reto inferior), diplopia
- **Pupila de Marcus Gunn (RAPD)**: dilatação paradoxal ao iluminar o olho afetado (swinging flashlight test) → lesão do nervo óptico
- **Pressão intraocular**: hifema, hipertonia → trauma de globo
- **Hematoma retrobulbar**: proptose + perda visual + resistência ao retropulsão do globo → emergência — cantotomia lateral imediata

**Cantotomia lateral de emergência:**
- Indicação: hematoma retrobulbar com pressão intraocular > 40 mmHg e/ou perda visual progressiva
- Técnica: incisão horizontal no canto lateral do olho até a parede orbitária + cantólise do tendão cantal lateral inferior
- Objetivo: descomprimir a órbita — janela terapêutica de 90-120 minutos para preservação da visão
- Não aguarde oftalmologista — qualquer médico treinado deve realizar se não houver especialista disponível

## 5. Classificação das Fraturas de Face

### Fraturas Nasais

Fratura mais comum da face. O nariz é a estrutura mais projetada e menos protegida.

**Clínica:**
- Epistaxe, edema, equimose, desvio da pirâmide nasal, crepitação
- Obstrução nasal por edema ou desvio de septo

**Hematoma de septo:**
- Coleção entre o septo cartilaginoso e o pericôndrio
- Aparência de "cereja" bilateral na rinoscopia — septo abaulado bilateralmente
- **Urgência**: drenagem imediata (incisão e drenagem + tamponamento) — sem tratamento, causa necrose isquêmica da cartilagem e "nariz em sela" irreversível
- Risco de abscesso intracraniano por extensão da infecção

**Tratamento:**
- Fraturas sem desvio: conservador (gelo, analgesia, descongestionante)
- Fraturas com desvio: redução fechada entre 3-7 dias (após resolução do edema inicial, antes da consolidação)
- Fraturas complexas com envolvimento de septo: septo-rinoplastia diferida

### Fraturas Zigomáticas

O zigoma (malar) é o segundo osso mais fraturado da face. Articulado com quatro ossos (frontal, temporal, maxilar, esfenóide) — fraturas são quase sempre em quatro pontos (fratura tetrapodal ou "tripod fracture" — nomenclatura antiga).

**Clínica:**
- Depressão da eminência malar — frequentemente mascarada pelo edema inicial
- Anestesia de bochecha e lábio superior (nervo infraorbital comprimido)
- Diplopia (especialmente em supraversão) — assoalho orbitário deslocado
- Limitação de abertura oral — processo coronóide impacto no arco zigomático deprimido
- Enoftalmia tardia — aumento do volume orbitário por deslocamento do assoalho

**Diagnóstico:** TC de face com reconstrução 3D — padrão atual

**Tratamento:**
- Não deslocada: conservador
- Deslocada: redução cirúrgica com fixação com placa e parafuso de titânio (via de acesso subciliar, transconjuntival ou intraoral)
- Fratura de arco zigomático isolada: redução com elevador de Gillies (abordagem temporal)

### Fraturas de Órbita

**Fratura de assoalho (blow-out):**
- Mecanismo: aumento súbito da pressão intraorbitária por objeto rombo (bola, soco, airbag)
- O assoalho orbitário (teto do seio maxilar) é o ponto de menor resistência
- Clínica: enoftalmia, diplopia em supraversão (encarceramento do reto inferior), hipoestesia infraorbital, enfisema periorbitário (ar do seio maxilar)
- Encarceramento do reto inferior: urgência em crianças — pode causar bradicardia e náusea pelo reflexo oculocardíaco
- Tratamento cirúrgico: reconstrução do assoalho com malha de titânio ou implante reabsorvível — indicado quando enftalmia > 2 mm, encarceramento muscular ou defeito > 50% do assoalho

**Fratura de parede medial:**
- Encarceramento do reto medial → diplopia em abdução
- Enfisema orbitário extenso → risco de aumento de pressão intraocular

**Fratura de ápice orbitário:**
- Síndrome da fissura orbitária superior: paralisia de III, IV e VI nervos cranianos + anestesia de V1
- Neuropatia óptica traumática: redução de acuidade, RAPD — emergência oftalmológica

### Fraturas de Le Fort

Descritas por René Le Fort em 1901 após experimentos em cadáveres. Classificam as fraturas maxilares por nível de envolvimento estrutural.

**Le Fort I (horizontal):**
- Fratura horizontal acima dos ápices dentários — separa o palato duro e os alvéolos do restante da maxila
- Clínica: mobilidade do palato com os dentes superiores ("maxila flutuante" inferior), maloclusão, epistaxe
- Palpação: segure os dentes superiores e aplique força ântero-posterior — apenas o palato se move

**Le Fort II (piramidal):**
- Fratura em forma de pirâmide — atravessa o septo nasal, os ossos lacrimais, o assoalho orbitário medial e a sutura zigomático-maxilar
- Clínica: mobilidade do terço médio da face incluindo o nariz, edema de face média, epistaxe, possível rinoliquoreia
- Palpação: a pirâmide nasal se move com a maxila; o zigoma permanece fixo

**Le Fort III (craniofacial):**
- Separação completa da face do crânio — a fratura atravessa as suturas fronto-zigomática, fronto-maxilar e fronto-nasal
- Clínica: mobilidade de toda a face ("face flutuante"), edema facial maciço, rinoliquoreia e otoliquoreia frequentes, equimose periorbital bilateral
- Palpação: toda a face se move ao segurar os dentes superiores; a sutura naso-frontal se move

**Na prática:** fraturas de Le Fort raramente ocorrem puras e simétricas — são frequentemente combinadas (Le Fort I de um lado + Le Fort II do outro) e associadas a outras fraturas faciais.

**Tratamento:** redução e fixação cirúrgica com placas e parafusos de titânio — pode ser postergado 7-10 dias se o paciente estiver estável.

### Fraturas de Mandíbula

A mandíbula forma um anel ósseo — fraturas frequentemente ocorrem em dois pontos simultâneos (como quebrar um anel).

**Localização das fraturas (por frequência):**
- Côndilo (36%)
- Corpo (21%)
- Ângulo (20%)
- Sínfise/Parassínfise (14%)
- Ramo (3%)
- Processo coronóide (2%)
- Processo alveolar (3%)

**Clínica:**
- Dor, edema e equimose localizados
- Mobilidade anormal e crepitação ao palpar o rebordo mandibular
- Maloclusão — sinal mais sensível de fratura mandibular
- Trismo — espasmo dos pterigóideos ou hematoma do masseter
- Anestesia de lábio inferior e mento → lesão do nervo alveolar inferior
- Sialorreia com sangue → fratura de processo alveolar

**Fraturas de côndilo:**
- Frequentemente subdiagnosticadas — dor pré-auricular, limitação de abertura oral, desvio da mandíbula ao abrir para o lado afetado
- Fratura bilateral de côndilo: mordida aberta anterior + impossibilidade de abertura oral
- Tratamento: conservador (dieta pastosa, fisioterapia) ou cirúrgico dependendo do deslocamento e da relação com o canal auditivo

**Implicação na via aérea:**
- Fratura bilateral de sínfise/parassínfise: perda do ponto de apoio da língua → obstrução por queda posterior da língua
- Manobra de resgate: tração anterior da língua com pinça ou fio passado pela ponta da língua

### Fraturas Naso-Orbito-Etmoidais (NOE)

Fraturas do complexo central da face — envolvem os ossos nasais, processo frontal da maxila, ossos lacrimais e etmoide.

**Clínica:**
- Afundamento da pirâmide nasal com nariz em "sela"
- **Telecanto traumático**: aumento da distância intercantal > 35 mm — sinal patognomônico de fratura NOE com avulsão do tendão cantal medial
- Epífora (lacrimejamento excessivo) por lesão do ducto lacrimonasal
- Rinoliquoreia — fístula de LCR pelo etmoide
- Pneumoencéfalo — ar intracraniano por comunicação com o etmoide

**Tratamento:** cirúrgico com reposicionamento e fixação do tendão cantal medial — altamente especializado.

### Fraturas de Seio Frontal

**Parede anterior:** trauma de alta energia na fronte
- Afundamento estético
- Tratamento: cranioplastia com placa de titânio se deslocamento significativo

**Parede posterior:** comunicação com fossa craniana anterior
- Risco de fístula de LCR, meningite, abscesso epidural
- Tratamento: neurocirúrgico — obliteração do seio com gordura abdominal + cranioplastia

## 6. Lesões de Partes Moles

### Princípios Gerais do Manejo

A face tem suprimento vascular excepcional — lacerações complexas que cicatrizariam mal em outras regiões frequentemente cicatrizam bem na face com técnica adequada.

**Princípios de sutura:**
- Desbridamento mínimo e conservador — na face, todo tecido deve ser preservado se viável
- Irrigação copiosa com soro fisiológico — reduz infecção
- Aproximação por planos: mucosa, músculo, subcutâneo, pele — em ordem
- Fio absorvível nas camadas profundas (Vicryl 3-0 ou 4-0); monofilamento fino na pele (Prolene ou Nylon 5-0 a 6-0)
- Pontos simples separados na pele — permite drenagem de seroma/hematoma entre os pontos
- Remoção de pontos entre 4-7 dias na face (cicatrização mais rápida que em outras regiões)

**Situações especiais:**

**Retalhos e avulsões:**
- Preserve todo tecido — mesmo retalhos com pedículo fino podem sobreviver na face
- Retalho completamente avulsionado: limpeza e reimplante como enxerto composto
- Orelha avulsionada: limpeza + reimplante ou armazenamento em soro gelado para reimplante microcirúrgico

**Laceração de lábio:**
- Prioridade: alinhamento preciso da linha cutâneo-mucosa (vermelhão) — até 1 mm de desalinhamento é perceptível
- Use fio de referência no vermelhão antes de iniciar a sutura

**Laceração de pálpebra:**
- Qualquer laceração que envolva margem palpebral, canalículo lacrimal ou placa tarsal: sutura por oftalmologista
- Lacerações superficiais de pele palpebral: sutura com Nylon 6-0 ou 7-0

**Laceração de língua:**
- Suturas em camadas com Vicryl 3-0 — língua cicatriza rapidamente
- Lacerações < 1 cm sem sangramento ativo: conservador

**Lesão do ducto de Stensen (parótida):**
- Suspeite em lacerações da bochecha que atravessam o músculo masseter
- Teste: comprima a glândula parótida — extravasamento de saliva pela ferida confirma lesão
- Reparo primário sobre sonda de polietileno ou derivação com sutura da mucosa oral

**Lesão do nervo facial:**
- Avalie todos os ramos antes de anestesiar a face
- Lesão distal ao músculo masseter: raramente necessita reparo — regeneração espontânea
- Lesão proximal (tronco principal ou divisões maiores): reparo microcirúrgico primário ou diferido

## 7. Situações de Urgência Específicas

### Hematoma Retrobulbar

- Apresentação: proptose progressiva + perda visual + dor ocular intensa
- Fisiopatologia: hemorragia no espaço retrobulbar → aumento de pressão intraorbitária → compressão da artéria central da retina → isquemia do nervo óptico
- Janela terapêutica: 90-120 minutos para preservação da visão
- Tratamento imediato: cantotomia lateral + cantólise do tendão cantal lateral inferior
- Adjuvante: manitol 1g/kg IV, acetazolamida 500 mg IV
- Confirme diagnóstico com tonometria (PIO > 40 mmHg) e TC de órbita se disponível sem atrasar o tratamento

### Neuropatia Óptica Traumática (NOT)

- Lesão indireta do nervo óptico por transmissão de energia pelo canal óptico
- RAPD positivo (pupila de Marcus Gunn) sem lesão de globo visível
- Tratamento: controverso — altas doses de corticoide (metilprednisolona) não demonstraram benefício em ensaios clínicos recentes (ONTT, 2022); descompressão cirúrgica do canal óptico em casos selecionados
- Diretrizes atuais (2023): não há consenso — decisão individualizada em conjunto com oftalmologista

### Fístula de LCR

- Rinoliquoreia (pelo nariz) ou otoliquoreia (pelo ouvido)
- Confirmação: sinal do halo (gota de líquido cefálico no papel forma halo mais claro ao redor do sangue) — baixa especificidade; dosagem de β-2 transferrina no líquido — padrão atual
- Risco de meningite: 5-10% de meningite ascendente
- Tratamento: conservador por 7-10 dias (cabeceira elevada, sem manobra de Valsalva, sem sonda nasogástrica) — 80% fecham espontaneamente; reparo cirúrgico se persistir

## 8. Diagnóstico por Imagem

### Tomografia Computadorizada

Padrão-ouro atual — substituiu as radiografias simples na maioria dos centros de trauma.

**Protocolo:**
- TC de crânio e face com janela óssea e tecidos moles
- Reconstrução multiplanar (axial, coronal, sagital) e 3D
- Com contraste: quando há suspeita de lesão vascular (hematoma em expansão, anisocoria, sopro cervical)
- Angio-TC: lesão vascular definida ou suspeita de lesão de artéria carótida interna

**Achados específicos:**
- Pneumoencéfalo: fratura de base de crânio com comunicação intracraniana
- Nível líquido em seio maxilar ou etmoidal: hemossinus — marcador de fratura de face média
- "Sinal da gota" (teardrop sign): herniação de gordura orbitária pelo assoalho fraturado

### Radiografias Simples

Papel limitado na era da TC. Ainda úteis quando TC não está disponível:
- Waters (occipitomental): fraturas de zigoma, assoalho orbitário, seio maxilar
- Towne: côndilo mandibular
- Panorâmica (ortopantomografia): mandíbula completa — padrão para avaliação mandibular quando disponível

## 9. Pontos-Chave

- Via aérea é a prioridade no trauma de face — a lesão estética é secundária
- Fratura mandibular bilateral: queda posterior da língua causa obstrução — tração anterior da mandíbula resolve
- Intubação nasotraqueal é contraindicada em suspeita de fratura de base de crânio
- Hematoma de septo nasal é urgência — drenagem imediata evita necrose da cartilagem e "nariz em sela"
- Hematoma retrobulbar: cantotomia lateral em até 90-120 minutos — janela para preservar a visão
- Angioembolização da maxilar interna é o padrão atual para hemorragia maxilofacial refratária (IATSIC 2023)
- Telecanto traumático (distância intercantal > 35 mm) é sinal patognomônico de fratura NOE
- Fratura de Le Fort: mobilidade do terço médio da face ao segurar os dentes superiores
- Fístula de LCR: confirme com β-2 transferrina — 80% fecham espontaneamente em 7-10 dias
- O manejo definitivo das fraturas pode ser postergado 7-10 dias — priorize ABCDE e lesões associadas
- TC com reconstrução 3D é o padrão diagnóstico — radiografias simples têm papel limitado
## Glossário

**ATLS** — Advanced Trauma Life Support. Programa do American College of Surgeons. No trauma de face, o ATLS enfatiza que a via aérea é a prioridade — a lesão estética é secundária.

**IOT** — Intubação Orotraqueal. Via aérea definitiva de escolha no trauma de face. No trauma maxilofacial grave, pode ser tecnicamente difícil por sangue, edema e distorção anatômica.

**GCS** — Glasgow Coma Scale. GCS ≤ 8 indica necessidade de via aérea definitiva. No trauma de face, TCE associado é frequente.

**TC** — Tomografia Computadorizada. Padrão diagnóstico para fraturas de face. Reconstrução 3D permite planejamento cirúrgico preciso. Substituiu as radiografias simples na maioria dos centros.

**IATSIC** — International Association for Trauma Surgery and Intensive Care. Publicou diretrizes 2023 para trauma maxilofacial, incluindo indicações de angioembolização para hemorragia refratária.

**PIO** — Pressão Intraocular. Normal: 10-21 mmHg. PIO > 40 mmHg em hematoma retrobulbar indica isquemia iminente do nervo óptico — cantotomia lateral de emergência.

**RAPD** — Relative Afferent Pupillary Defect. Defeito pupilar aferente relativo. Detectado pelo swinging flashlight test: dilatação paradoxal do olho afetado ao iluminar indica lesão do nervo óptico ipsilateral.

**NOT** — Neuropatia Óptica Traumática. Lesão indireta do nervo óptico por transmissão de energia pelo canal óptico em fratura de ápice orbitário. RAPD positivo sem lesão de globo.

**NOE** — Naso-Orbito-Etmoidal. Complexo central da face envolvendo ossos nasais, processo frontal da maxila e etmoide. Fratura NOE causa telecanto traumático (distância intercantal > 35 mm).

**Le Fort** — Classificação das fraturas maxilares descrita por René Le Fort: Tipo I (horizontal — palato flutuante), Tipo II (piramidal — pirâmide nasal móvel), Tipo III (craniofacial — face completamente separada do crânio).

**β-2 transferrina** — Proteína encontrada exclusivamente no líquor (LCR). Presença em secreção nasal ou auricular confirma fístula de LCR com alta especificidade. Padrão atual para diagnóstico de rinoliquoreia e otoliquoreia.

**LCR** — Líquido Cefalorraquidiano (liquor). Fluido que envolve o encéfalo e a medula. Extravasamento pelo nariz (rinoliquoreia) ou ouvido (otoliquoreia) indica fratura de base de crânio com comunicação intracraniana.

**EIC** — Espaço Intercostal. No trauma de face, relevante para via aérea de emergência (cricotireoidostomia) quando IOT é impossível.

**CICO** — Can't Intubate, Can't Oxygenate. No trauma maxilofacial cataclísmico, é indicação de cricotireoidostomia cirúrgica imediata.

**ATX** — Ácido Tranexâmico. Antifibrinolítico indicado nas primeiras 3 horas em trauma com hemorragia significativa, incluindo hemorragia maxilofacial grave.

**FAST** — Focused Assessment with Sonography in Trauma. No trauma de face, o FAST é realizado para excluir lesões associadas (tamponamento, hemoperitônio) em mecanismos de alta energia.

**Telecanto** — Aumento da distância intercantal (entre os cantos mediais dos olhos). Normal: 30-35 mm. Telecanto > 35 mm é sinal patognomônico de fratura NOE com avulsão do tendão cantal medial.

**Enoftalmia** — Recuo do globo ocular para dentro da órbita. Indica aumento do volume orbitário por fratura de assoalho ou parede medial com herniação de gordura periorbitária.

**Proptose** — Projeção anterior do globo ocular para fora da órbita. No trauma, indica hematoma retrobulbar com aumento da pressão intraorbitária — emergência oftalmológica.

**Hifema** — Sangue na câmara anterior do olho (entre córnea e íris). Indica trauma de globo ocular. Requer avaliação oftalmológica urgente.

**Angioembolização** — Procedimento endovascular em que o radiologista intervencionista cateteriza seletivamente um vaso sangrante e deposita material para ocluí-lo. No trauma de face, indicada para hemorragia maxilofacial refratária ao tamponamento — alvo principal: artéria maxilar interna e artéria esfenopalatina.

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- International Association for Trauma Surgery and Intensive Care (IATSIC). Guidelines for Maxillofacial Trauma Management, 2023.
- Kellman RM, Tatum SA. Facial Trauma. In: Flint PW et al. Cummings Otolaryngology, 7ª edição. Elsevier, 2021.
- Perry M, Holmes S. Atlas of Operative Maxillofacial Trauma Surgery. Springer, 2020.
- Winegar BA, MacMahon P. Imaging of Facial Trauma. Neuroimaging Clinics of North America, 2021.
- Lim LH et al. Management of traumatic optic neuropathy: systematic review and meta-analysis. Ophthalmology, 2022.`,
  },
  {
    id: '154cf536-e01a-4f3d-8bd3-a1bdedaa191b',
    title: 'ATLS: Trauma de Pescoço',
    description: 'Avaliação e manejo do trauma cervical — lesões vasculares, de via aérea, esofágicas e de coluna cervical baseadas no ATLS 10ª edição e diretrizes da Eastern Association for the Surgery of Trauma 2023',
    theme: 'atls_pescoco',
    type: 'article',
    content: `## 1. Introdução e Relevância Clínica

O pescoço é uma região anatomicamente densa e funcionalmente crítica — em um cilindro de aproximadamente 10 cm de diâmetro concentram-se a via aérea, o esôfago, os grandes vasos cervicais, a medula espinal cervical e múltiplos nervos cranianos e periféricos. Lesões nessa região podem ser rapidamente fatais por três mecanismos principais: obstrução de via aérea, hemorragia exsanguinante e lesão medular cervical.

O trauma de pescoço representa 5-10% de todos os traumas e tem mortalidade de 3-6% — significativamente maior quando há lesão vascular associada (mortalidade de até 50% em lesões de carótida comum).

### Atualização das Diretrizes — EAST 2023

A Eastern Association for the Surgery of Trauma (EAST) publicou em 2023 atualizações significativas:

- A **angio-TC cervical** substituiu a exploração cirúrgica mandatória como avaliação inicial em trauma penetrante de zona II estável — redução de explorações negativas de 53% para < 10%
- O **manejo não operatório** de lesões vasculares grau I-III da carótida e vertebral é seguro em pacientes hemodinamicamente estáveis com anticoagulação ou antiagregação
- A **terapia endovascular** (stent, embolização) é a primeira escolha em lesões vasculares acessíveis com paciente estável
- O **clearance cervical clínico** (NEXUS e Canadian C-Spine Rule) evita imagem em até 85% dos pacientes de baixo risco — redução de radiação e custos sem aumento de lesões perdidas

### Anatomia das Zonas Cervicais

A divisão clássica em zonas (Monson, 1969) orienta o acesso cirúrgico e a estratégia diagnóstica:

**Zona I** (inferior): da clavícula/manúbrio até a cartilagem cricóidea
- Contém: artérias subclávia e carótida comum proximal, veias jugulares, traqueia proximal, esôfago proximal, ducto torácico (esquerdo), ápice pulmonar
- Acesso cirúrgico difícil — pode requerer esternotomia ou toracotomia
- Lesões vasculares de alta mortalidade

**Zona II** (média): da cartilagem cricóidea até o ângulo da mandíbula
- Contém: carótidas comum e interna, jugulares internas, artéria e veia vertebrais, laringe, traqueia cervical, esôfago cervical, nervo vago
- Mais acessível cirurgicamente — incisão cervical lateral
- Zona mais frequentemente lesada (60% das lesões penetrantes)

**Zona III** (superior): do ângulo da mandíbula até a base do crânio
- Contém: carótida interna distal, jugular interna distal, nervos cranianos IX-XII, glândula parótida
- Acesso cirúrgico extremamente difícil — pode requerer luxação da mandíbula ou remoção do processo mastoide
- Lesões vasculares: tratamento endovascular de preferência

**Nota clínica importante**: a divisão em zonas orienta o planejamento cirúrgico mas não deve atrasar a intervenção em paciente instável — explore imediatamente independentemente da zona.

## 2. Avaliação Primária

### A — Via Aérea no Trauma de Pescoço

O trauma cervical pode comprometer a via aérea por múltiplos mecanismos simultâneos:

**Hematoma expansivo:**
- Compressão extrínseca da traqueia e laringe
- Pode progredir de leve desconforto a obstrução completa em minutos
- Sinais de alerta: rouquidão progressiva, estridor, disfagia, sensação de pressão cervical, aumento visível do volume cervical
- **Intervenção precoce é mandatória** — não espere obstrução completa para agir

**Lesão laríngea direta:**
- Fratura de cartilagem laríngea, laceração de mucosa, edema
- Rouquidão, estridor, enfisema subcutâneo cervical, dor à palpação laríngea
- Hemoptise indica comunicação com a via aérea

**Laceração traqueal:**
- Enfisema subcutâneo extenso, pneumomediastino, pneumotórax bilateral
- Fuga aérea maciça após drenagem torácica
- A ventilação com pressão positiva pode dilacerar completamente uma traqueia parcialmente transeccionada

**Decisão da via aérea no trauma cervical:**

Paciente instável ou com sinais de obstrução iminente:
- IOT de sequência rápida com videolaringoscópio — mantém alinhamento cervical, permite melhor visualização sem extensão
- Colar cervical: abra a porção anterior e mantenha estabilização manual bimanual durante a laringoscopia
- Falha de IOT: cricotireoidostomia cirúrgica imediata

Lesão laríngea ou traqueal confirmada:
- IOT com fibroscópio flexível sob visão direta — laringoscopia direta pode completar a transecção
- Acesso cirúrgico direto à traqueia distal se transecção confirmada

Laceração cervical com via aérea visível:
- Intube diretamente pela ferida se a via aérea estiver exposta e acessível
- Não tente IOT oral — pode perder a via aérea durante a tentativa

### B — Ventilação

- Enfisema subcutâneo extenso + ausência de murmúrio vesicular: pneumotórax — drenagem torácica
- Desvio de traqueia: pneumotórax hipertensivo ou hematoma mediastinal
- Hemoptise volumosa: lesão de via aérea ou vascular com comunicação brônquica

### C — Circulação e Controle de Hemorragia

**Hemorragia cervical externa:**
- Pressão direta com curativo compressivo — eficaz na maioria das lesões venosas
- Nunca remova objeto empalado no pescoço
- **Não clampee vasos cegamente** — risco de lesão do nervo vago, hipoglosso e frênico
- Hematoma pulsátil ou expansivo: não comprima — risco de rotura e hemorragia catastrófica; prepare sala cirúrgica imediatamente

**Lesão de veia jugular:**
- Risco de embolia gasosa — posicione o paciente em Trendelenburg e comprima a veia
- Ligadura é aceitável para jugular interna unilateral

**Lesão de carótida:**
- Hemorragia externa: compressão direta
- Déficit neurológico ipsilateral: não ocluir a carótida — risco de extensão do infarto cerebral
- Oclusão da carótida interna: reperfusão pode aumentar o edema cerebral — decisão neurocirúrgica

### D — Avaliação Neurológica

- Déficit neurológico focal (hemiplegia, hemiparesia, afasia): lesão de carótida interna com AVC isquêmico ou lesão medular
- Síndrome de Horner (ptose + miose + anidrose): lesão da cadeia simpática cervical — frequentemente associada à lesão de carótida interna
- Alteração de nervos cranianos: IX (disfagia), X (rouquidão, disfagia), XI (paralisia de trapézio/esternocleidomastoideo), XII (desvio de língua)
- Tetraparesia ou tetraplegia: lesão medular cervical — protocolo de trauma raquimedular

## 3. Trauma Penetrante de Pescoço

### Avaliação — Sinais Duri e Moles

**Sinais duros** (hard signs) — indicam lesão significativa com alta especificidade — intervenção imediata:
- Hemorragia ativa externa de difícil controle
- Hematoma expansivo ou pulsátil
- Choque hemorrágico sem outra explicação
- Isquemia de membro superior (lesão de subclávia)
- Déficit neurológico focal novo (AVC por lesão carotídea)
- Obstrução de via aérea
- Hemoptise volumosa ou hematemese
- Sopro ou frêmito cervical (fístula arteriovenosa)

**Sinais moles** (soft signs) — requerem investigação adicional mas não cirurgia imediata:
- Hematoma estável não expansivo
- Disfagia ou odinofagia
- Rouquidão sem obstrução
- Enfisema subcutâneo localizado
- Hemoptise discreta
- Déficit de nervos cranianos sem instabilidade hemodinâmica

### Estratégia por Zona e Estabilidade

**Paciente instável (qualquer zona):**
- Exploração cirúrgica imediata — sem investigação adicional
- Controle do sangramento, via aérea e contaminação são as prioridades

**Paciente estável — Zona I:**
- Angio-TC cervical e torácica com contraste
- Broncoscopia e esofagoscopia se suspeita de lesão
- Abordagem endovascular se lesão vascular identificada
- Esternotomia ou toracotomia se necessário para controle vascular

**Paciente estável — Zona II:**
- Angio-TC cervical com contraste — substitui a exploração mandatória (EAST 2023)
- Exploração cirúrgica se sinais duros presentes ou angio-TC positiva para lesão significativa
- Broncoscopia e esofagoscopia se suspeita de lesão de via aérea ou esôfago

**Paciente estável — Zona III:**
- Angio-TC cervical
- Arteriografia e tratamento endovascular (embolização ou stent) — acesso cirúrgico extremamente difícil
- Oclusão de balão (REBOA zona IV — artéria carótida interna distal) como ponte em hemorragia grave

### Lesões Vasculares Cervicais

**Artéria carótida comum:**
- Lesão mais frequente e mais letal
- Reparo primário (sutura) se possível — preserva fluxo cerebral
- Interposição de enxerto venoso (veia safena) se perda de segmento
- Ligadura: apenas em casos extremos — risco de AVC isquêmico de 20-30%

**Artéria carótida interna:**
- Lesão distal (Zona III): tratamento endovascular preferencial (stent)
- Oclusão completa com déficit neurológico estabelecido: revascularização controversa — risco de transformação hemorrágica do infarto

**Artéria vertebral:**
- Frequentemente lesada em trauma penetrante de Zona I e II e em fraturas de coluna cervical
- Sangramento raramente catastrófico (colaterais contralaterais)
- Embolização transarterial: tratamento de escolha
- Isquemia de tronco cerebral: anticoagulação ou antiagregação (EAST 2023)

**Veia jugular interna:**
- Ligadura aceitável unilateralmente
- Bilateral: preservar pelo menos um lado — risco de hipertensão intracraniana

### Lesões de Via Aérea

**Fratura de laringe:**
- Triângulo de fratura: rouquidão + enfisema subcutâneo + disfagia
- TC de laringe: avalia extensão das fraturas e integridade das cartilagens
- Tratamento conservador: fraturas não deslocadas sem comprometimento de via aérea
- Tratamento cirúrgico: fraturas deslocadas, exposição de cartilagem, laceração de mucosa com exposição — reconstrução laríngea com fixação de cartilagem

**Laceração traqueal:**
- Enfisema subcutâneo extenso, pneumomediastino, pneumotórax bilateral, fuga aérea
- Diagnóstico: broncoscopia — confirma localização e extensão
- Tratamento: reparo cirúrgico primário — sutura com fio absorvível, reforço com músculo
- Transecção completa: acesso à traqueia distal pelo pescoço + IOT transtraqueal direto

### Lesões Esofágicas

**A lesão mais frequentemente perdida no trauma de pescoço.**

Motivo: o esôfago é posterior e protegido — lesões pequenas produzem poucos sintomas inicialmente. A progressão para mediastinite ocorre em 24-48h e é altamente letal.

**Clínica:**
- Disfagia e odinofagia
- Sangue na sonda nasogástrica
- Enfisema subcutâneo cervical (especialmente posterior)
- Dor cervical posterior
- Saliva ou conteúdo alimentar na ferida

**Diagnóstico:**
- Esofagografia com contraste hidrossolúvel (gastrografina): primeira linha — sensibilidade 80-90%
- Esofagoscopia flexível: complementar — sensibilidade 80-100% em combinação com esofagografia
- **Combinação dos dois métodos**: sensibilidade > 95% (EAST 2023)
- TC com contraste: identifica pneumomediastino, coleções, enfisema — sugestivo mas não diagnóstico definitivo

**Tratamento:**
- Reparo primário em duas camadas (mucosa + muscular) nas primeiras 24h
- Após 24h: desbridamento + drenagem + reparo ou exclusão esofágica (casos graves com mediastinite estabelecida)
- Sonda enteral para nutrição + antibioticoterapia de amplo espectro

## 4. Trauma Contuso de Pescoço

### Lesão Vascular Cérvico-Cerebral por Trauma Contuso (BCVI)

A lesão de artéria carótida ou vertebral por trauma contuso (Blunt Cerebrovascular Injury — BCVI) é subdiagnosticada e potencialmente devastadora — AVC isquêmico em 10-58% dos casos não tratados.

**Mecanismos:**
- Hiperextensão + rotação cervical (trauma de carótida interna contra processo transverso de C1-C3)
- Fratura de coluna cervical com extensão ao forame transversário (artéria vertebral)
- Hiperflexão com distração cervical
- Trauma direto cervical (cinto de segurança, estrangulamento)
- Fratura de base de crânio com extensão ao canal carotídeo

**Fatores de risco — rastreamento indicado (Denver Criteria modificados, 2023):**

Critérios de alto risco:
- Sinal de Le Fort II ou III
- Fratura de base de crânio com extensão ao canal carotídeo
- Fratura de coluna cervical com subluxação, extensão ao forame transversário ou C1-C3
- Síndrome de Horner
- Déficit neurológico sem lesão intracraniana correspondente na TC
- Infarto cerebral na TC inicial sem outra explicação
- Trauma de pescoço com equimose ou hematoma cervical

**Classificação de Biffl (grading):**
- **Grau I**: irregularidade intimal ou dissecção com < 25% de estreitamento
- **Grau II**: dissecção ou hematoma intramural com ≥ 25% de estreitamento, trombo intraluminal ou flap intimal
- **Grau III**: pseudoaneurisma
- **Grau IV**: oclusão completa
- **Grau V**: transecção com extravasamento livre

**Diagnóstico:**
- **Angio-TC de 64 canais ou superior**: padrão atual — sensibilidade 97,5%, especificidade 99,8% para BCVI (Denver, 2023); substitui a arteriografia convencional como primeira linha

**Tratamento:**
- Grau I-II: antiagregação plaquetária (AAS 81-325 mg/dia) ou anticoagulação (heparina) — decisão baseada no risco hemorrágico do paciente
- Grau III (pseudoaneurisma): stent endovascular
- Grau IV (oclusão): anticoagulação — revascularização raramente indicada
- Grau V (transecção): controle endovascular de emergência

### Fratura de Laringe por Trauma Contuso

Mecanismo clássico: impacto direto da laringe contra o volante ou painel (colisão frontal sem airbag) ou contra o guidão (acidente motociclístico).

**Apresentação:**
- Rouquidão, disfonia, afonia
- Dor e crepitação à palpação laríngea
- Enfisema subcutâneo cervical anterior
- Disfagia, odinofagia
- Hemoptise

**Classificação de Schaefer:**
- Grupo I: rouquidão leve, sem enfisema, edema mínimo à laringoscopia
- Grupo II: edema moderado, hematoma, laceração de mucosa sem exposição de cartilagem
- Grupo III: edema grave, lacerações extensas, exposição de cartilagem, imobilidade de corda vocal
- Grupo IV: acima + fratura cominutiva ou instabilidade laríngea grave
- Grupo V: transecção laringotraqueal completa

**Tratamento:**
- Grupos I-II: conservador — umidificação, voz de repouso, corticoide, antibiótico, observação
- Grupos III-IV: reparo cirúrgico — laringoscopia direta + fixação de cartilagens + sutura de mucosa
- Grupo V: acesso cirúrgico urgente — IOT pela traqueia distal + reconstrução laringotraqueal

## 5. Imobilização e Clearance Cervical

### Imobilização Cervical — Restrição Seletiva (ATLS 11ª Ed.) no APH e na Emergência

**Colar cervical:**
- Aplicação imediata em qualquer trauma com mecanismo de risco para lesão cervical
- Tamanho correto: da clavícula até o mento — colar mal dimensionado causa extensão ou flexão iatrogênica
- Não imobiliza completamente — complementar com imobilizador lateral de cabeça em prancha rígida
- Paciente agitado: o colar pode piorar — mantenha estabilização manual\n- **ATLS 11ª Ed. (2025) — Trauma PENETRANTE cervical:** Deênfase no colar rígido — o risco de atraso na via aérea supera o benefício. Fraturas cervicais instáveis são raras no trauma penetrante; o colar não previne lesão neurológica adicional neste contexto e pode dificultar o manejo da via aérea.

**Quando retirar o colar:**
Apenas após clearance cervical clínico ou radiológico.

### NEXUS Criteria (National Emergency X-Radiography Utilization Study)

Clearance clínico sem imagem se TODOS os critérios estiverem presentes:
- Sem dor na linha média posterior cervical
- Sem déficit neurológico focal
- Nível de consciência normal (Glasgow 15)
- Sem intoxicação por álcool ou drogas
- Sem lesão dolorosa que distraia a atenção (fratura de osso longo, queimadura extensa)

Sensibilidade: 99,6% para lesão cervical clinicamente significativa.

### Canadian C-Spine Rule

Imagem NÃO necessária se:
- Sem fator de alto risco (idade ≥ 65 anos, mecanismo perigoso, parestesias em membros)
- E: presença de fator de baixo risco (colisão traseira simples, sentado na emergência, deambulando após o trauma, dor cervical não na linha média, ausência de dor à palpação cervical)
- E: capaz de rotar ativamente o pescoço 45° para cada lado

Sensibilidade: 99,4%; especificidade: 45,1% (superior ao NEXUS em especificidade).

### Clearance Radiológico

**TC cervical (C0-T1):**
- Indicada quando NEXUS ou Canadian C-Spine Rule são positivos
- Sensibilidade 98-100% para fraturas cervicais clinicamente significativas
- Substitui a série radiográfica simples em centros de trauma (mais rápida e mais sensível)

**Ressonância Magnética cervical:**
- Indicada em déficit neurológico sem fratura na TC (lesão ligamentar, contusão medular, hematoma epidural)
- Clearance de ligamentos cervicais em paciente inconsciente após TC normal — controverso

**Paciente inconsciente:**
- TC cervical de alta resolução: se normal, a maioria dos protocolos aceita retirar o colar
- RM cervical: adiciona sensibilidade para lesão ligamentar — use quando TC normal mas mecanismo de alto risco

## 6. Situações Especiais

### Estrangulamento e Enforcamento

**Estrangulamento manual ou por ligadura:**
- Lesão vascular cervical por compressão: trombose de carótida, dissecção
- Edema de laringe e hipofaringe — progressivo nas primeiras horas
- Petéquias conjuntivais e faciais — sinal de aumento de pressão venosa
- Lesão anóxica cerebral — principal causa de morte
- Rastreamento para BCVI com angio-TC
- Observação por 24h mesmo em paciente assintomático — edema de laringe pode progredir

**Enforcamento judicial vs. acidental:**
- Judicial: fratura de C2 (fratura do enforcado — hangman's fracture) por distração brusca
- Acidental/Suicida: lesão anóxica predominante, fratura cervical menos frequente

### Trauma de Pescoço por Cinto de Segurança

- Sinal do cinto: equimose linear no pescoço → pesquise BCVI
- Fratura de coluna cervical por flexão-distração
- Lesão de esôfago e traqueia por compressão
- Qualquer sinal de cinto no pescoço: angio-TC cervical obrigatória

### Trauma Vascular por Cateter (Iatrogênico)

- Hematoma cervical expansivo após punção de jugular interna ou subclávia
- Compressão direta + preparação para exploração cirúrgica
- Angio-TC: avalia extensão e estruturas envolvidas

## 7. Pontos-Chave

- O pescoço concentra via aérea, grandes vasos e medula em um espaço mínimo — lesões são rapidamente fatais
- Hematoma cervical expansivo: via aérea definitiva imediata — não espere obstrução completa
- Intubação nasotraqueal é contraindicada em trauma de pescoço com suspeita de fratura de base de crânio
- Sinais duros no trauma penetrante: exploração cirúrgica imediata — sem investigação adicional
- Angio-TC substituiu a exploração mandatória de Zona II como avaliação inicial no paciente estável (EAST 2023)
- Lesão esofágica é a mais frequentemente perdida — combine esofagografia + esofagoscopia para sensibilidade > 95%
- BCVI: rastreie com angio-TC em todos os pacientes com fatores de risco (Denver criteria)
- Síndrome de Horner após trauma cervical = lesão de carótida interna até que se prove o contrário
- Anticoagulação ou antiagregação em BCVI grau I-II — terapia endovascular em grau III
- NEXUS e Canadian C-Spine Rule: evitam imagem em até 85% dos pacientes de baixo risco
- Nunca clampee vasos cervicais cegamente — risco de lesão de nervos vago, hipoglosso e frênico

## Glossário

**EAST** — Eastern Association for the Surgery of Trauma. Associação americana que publica diretrizes de manejo cirúrgico do trauma. Em 2023, atualizou o manejo do trauma penetrante de pescoço.

**BCVI** — Blunt Cerebrovascular Injury. Lesão vascular cérvico-cerebral por trauma contuso. Envolve artérias carótida interna e/ou vertebral. Causa AVC isquêmico em 10-58% dos casos não tratados.

**Angio-TC** — Angiotomografia computadorizada. TC com contraste iodado injetado em fase arterial para visualização dos vasos. No trauma de pescoço, é o padrão diagnóstico para lesões vasculares — sensibilidade 97,5% para BCVI.

**IOT** — Intubação Orotraqueal. Via aérea definitiva de escolha. No trauma cervical, o videolaringoscópio é preferido para manter o alinhamento cervical.

**GCS** — Glasgow Coma Scale. GCS ≤ 8 indica necessidade de IOT. Déficit neurológico focal novo após trauma cervical sugere lesão de carótida interna com AVC.

**NEXUS** — National Emergency X-Radiography Utilization Study. Critérios clínicos que, quando todos presentes, permitem dispensar imagem cervical com sensibilidade de 99,6%.

**TC cervical** — Tomografia da coluna cervical de C0 a T1. Sensibilidade de 98-100% para fraturas cervicais. Substituiu a série radiográfica simples nos centros de trauma.

**RM** — Ressonância Magnética. Indicada para avaliação de lesão ligamentar, contusão medular e hematoma epidural em paciente com déficit neurológico e TC normal.

**Classificação de Biffl** — Sistema de graduação da BCVI em 5 graus: I (irregularidade intimal < 25%), II (estreitamento ≥ 25% ou trombo), III (pseudoaneurisma), IV (oclusão), V (transecção com extravasamento).

**Síndrome de Horner** — Ptose + miose + anidrose ipsilateral. Resulta de lesão da cadeia simpática cervical. No trauma, indica lesão de artéria carótida interna até que se prove o contrário.

**Schaefer** — Classificação das fraturas laríngeas por trauma contuso em 5 grupos, do mais leve (grupo I: rouquidão sem enfisema) ao mais grave (grupo V: transecção laringotraqueal completa).

**REBOA** — Resuscitative Endovascular Balloon Occlusion of the Aorta. Zona III (aorta infrarrenal) para hemorragia pélvica; zona I (aorta torácica descendente) para hemorragia abdominal.

**Monson** — Classificação das zonas cervicais para trauma penetrante: Zona I (abaixo da cricóidea), Zona II (cricóidea ao ângulo da mandíbula), Zona III (ângulo da mandíbula à base do crânio).

**Esofagografia** — Exame radiológico com injeção de contraste pela boca para avaliação do esôfago. Primeira linha para diagnóstico de lesão esofágica. Usar contraste hidrossolúvel (gastrografina) no trauma — menos lesivo se extravasar.

**Esofagoscopia** — Exame endoscópico do esôfago. Combinada com esofagografia, atinge sensibilidade > 95% para lesão esofágica traumática.

**ATX** — Ácido Tranexâmico. Antifibrinolítico indicado nas primeiras 3 horas do trauma com hemorragia significativa.

**PAS** — Pressão Arterial Sistólica. Meta de hipotensão permissiva em trauma penetrante sem TCE: 80-90 mmHg.

**PAM** — Pressão Arterial Média. Meta de PAM ≥ 85-90 mmHg nas primeiras 7 dias em lesão medular cervical para garantir perfusão medular adequada (AO Spine 2023).

**AVC** — Acidente Vascular Cerebral. Complicação da BCVI não tratada: isquemia por trombo ou embolização a partir da lesão vascular. Ocorre em 10-58% dos casos não tratados.

**Canadian C-Spine Rule** — Regra clínica canadense para seleção de pacientes que necessitam de imagem cervical. Especificidade superior ao NEXUS (45% vs. 12%).

**EIC** — Espaço Intercostal. Referência para drenagem torácica em hemopneumotórax associado ao trauma de pescoço.

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- Eastern Association for the Surgery of Trauma (EAST). Practice Management Guidelines for Penetrating Neck Trauma, 2023.
- Biffl WL et al. Blunt cerebrovascular injuries: recommendations from the Western Trauma Association. Journal of Trauma, 2020.
- Denver Health Medical Center. Denver Criteria for BCVI Screening, updated 2023.
- Stiell IG et al. The Canadian C-Spine Rule for radiography in alert and stable trauma patients. JAMA, 2001.
- Hoffmann JR et al. Validity of a set of clinical criteria to rule out injury to the cervical spine in patients with blunt trauma. NEJM, 2000.
- Shiroff AM et al. Penetrating neck trauma. Trauma Surgery & Acute Care Open, 2021.`,
  },
  {
    id: '7b0e5883-4c95-45f1-9934-e542861132e4',
    title: 'ATLS: Trauma Torácico',
    description: 'Avaliação e manejo das lesões torácicas com risco de vida — pneumotórax, hemotórax, tamponamento, contusão pulmonar e lesões da aorta baseados no ATLS 10ª edição e diretrizes da AAST 2023',
    theme: 'atls_toracico',
    type: 'article',
    content: `## 1. Introdução e Relevância Clínica

O trauma torácico é responsável por 25% de todas as mortes por trauma e contribui para outros 25% como fator agravante. É a segunda causa mais comum de morte traumática, superado apenas pelo TCE. Aproximadamente 85% dos traumas torácicos podem ser tratados com medidas simples — drenagem torácica, analgesia, suporte ventilatório — sem necessidade de toracotomia.

A importância clínica do trauma torácico no contexto do ATLS reside na identificação imediata das seis condições que matam na avaliação primária e das seis condições que matam na avaliação secundária.

### Atualização das Diretrizes — AAST 2023

A American Association for the Surgery of Trauma (AAST) e a Society of Thoracic Surgeons atualizaram em 2023:

- O **eFAST** (extended FAST) tem sensibilidade de 92-95% para pneumotórax e substitui a radiografia de tórax como triagem inicial em pacientes instáveis
- A **angio-TC de tórax** é o padrão diagnóstico para lesão de aorta — substitui a aortografia convencional
- O **TEVAR** (Thoracic Endovascular Aortic Repair) é o tratamento de escolha para lesão de aorta traumática grau II-IV em pacientes estáveis — mortalidade de 2-3% vs. 10-20% da cirurgia aberta
- O manejo não operatório do **hemotórax residual** com trombolítico intrapleural (alteplase) reduz a necessidade de VATS em até 40%
- A **analgesia multimodal** (bloqueio de nervo intercostal, bloqueio de plano do eretor da espinha, peridural torácica) é superior à analgesia sistêmica isolada no trauma de costelas — reduz complicações pulmonares em 30%

### Anatomia Relevante

**Parede torácica:**
- 12 pares de costelas, esterno, clavículas e escápulas formam a caixa torácica
- Costelas 1-3: protegidas pela clavícula e escápula — fraturas indicam trauma de alta energia com risco de lesão vascular de grande calibre
- Costelas 4-9: as mais frequentemente fraturadas
- Costelas 10-12: flutuantes — fraturas associadas a lesões de fígado, baço e rins

**Mediastino:**
- Anterior: coração, pericárdio, grandes vasos proximais, timo
- Médio: traqueia, brônquios principais, esôfago, nervos vagos
- Posterior: aorta descendente, veias ázigos, ducto torácico, cadeia simpática

**Pleura:**
- Visceral (reveste o pulmão) e parietal (reveste a parede torácica) — espaço virtual entre elas
- Pressão negativa intrapleural mantém o pulmão expandido
- Qualquer comunicação com o exterior ou vazamento de ar/sangue colapsa o pulmão

## 2. As Seis Lesões que Matam na Avaliação Primária

Estas condições devem ser identificadas e tratadas durante o ABCDE — não podem aguardar a avaliação secundária.

### 2.1 Obstrução de Via Aérea

- Sangue, fragmentos dentários, vômito, edema
- Tratamento: aspiração, manobras básicas, via aérea definitiva
- Detalhado na aula de Via Aérea

### 2.2 Pneumotórax Hipertensivo

**Fisiopatologia:**
Mecanismo valvar unidirecional — o ar entra na cavidade pleural durante a inspiração mas não sai durante a expiração. A pressão positiva progressiva causa:
- Colapso pulmonar ipsilateral completo
- Desvio do mediastino para o lado contralateral
- Compressão do coração e veia cava → redução do retorno venoso → colapso cardiovascular
- Compressão do pulmão contralateral → hipóxia bilateral

**Causas:**
- Trauma penetrante (ferida torácica com mecanismo valvar)
- Trauma contuso com laceração pulmonar (mecanismo de válvula pelo tecido pulmonar)
- Iatrogênico: ventilação mecânica com pressão positiva em paciente com lesão pulmonar (barotrauma)
- Progressão de pneumotórax simples em paciente ventilado

**Clínica:**
- Hipotensão refratária à reposição volêmica
- Ausência de murmúrio vesicular unilateral
- Hipertimpanismo à percussão ipsilateral
- Distensão jugular (pode estar ausente em hipovolemia associada)
- Desvio de traqueia contralateral — sinal tardio e inconsistente
- Cianose e deterioração respiratória progressiva

**Diagnóstico:**
- **Clínico** — nunca aguarde radiografia ou TC em paciente instável
- eFAST: ausência de deslizamento pleural ipsilateral + ponto pulmonar (interface ar-pulmão expandido) — sensibilidade 92%
- Radiografia: hipertransparência sem trama vascular, desvio mediastinal, rebaixamento do hemidiafragma — apenas em paciente estável

**Tratamento — imediato:**

**Descompressão por agulha:**
- Cateter 14G ou 16G no **2º EIC, linha hemiclavicular** ipsilateral
- Alternativa (preferida em obesos — menor distância à pleura): **4º-5º EIC, linha axilar anterior**
- Técnica: insira perpendicularmente até sentir resistência da pleura, depois avance 1 cm — saída de ar confirma o diagnóstico e o tratamento
- É uma medida temporária — sempre seguida de drenagem torácica definitiva

**Drenagem torácica em selo d'água:**
- **5º EIC, linha axilar média** — padrão ATLS
- Tubo 36-40 French em adultos
- Conecte ao selo d'água — borbulhamento confirma saída de ar

### 2.3 Hemotórax Maciço

**Definição:**
> 1500 mL de sangue na cavidade pleural (aproximadamente 1/3 da volemia) no momento inicial da drenagem, ou débito > 200 mL/hora por 4 horas consecutivas.

**Causas:**
- Laceração de vasos intercostais ou artéria mamária interna (mais comuns — geralmente param com a drenagem)
- Laceração de vasos hilares (artéria ou veia pulmonar)
- Laceração da aorta ou de seus ramos
- Laceração cardíaca

**Fisiopatologia:**
- Compressão pulmonar pelo sangue acumulado → hipóxia
- Hipovolemia por perda de sangue → choque hemorrágico
- A cavidade pleural comporta até 3000 mL de sangue

**Clínica:**
- Hipotensão + macicez à percussão unilateral + ausência de murmúrio vesicular
- Veias jugulares colabadas (hipovolemia) — ao contrário do pneumotórax hipertensivo
- Taquicardia, palidez, sudorese

**Diagnóstico:**
- eFAST: líquido acima do diafragma (sensibilidade 92% para hemotórax > 200 mL)
- Radiografia de tórax: opacificação unilateral (apaga pelo menos 1/3 do hemitórax para ser visível)
- TC: mais sensível — identifica volumes menores

**Tratamento:**

**Drenagem torácica:**
- 5º EIC, linha axilar média, tubo 36-40 French
- Conecte ao selo d'água com sistema de autotransfusão se disponível
- Meça o débito inicial e horário

**Indicações de toracotomia de urgência:**
- Débito inicial > 1500 mL imediatamente após a drenagem
- Débito contínuo > 200 mL/hora por 4 horas
- Necessidade de transfusão contínua para manter estabilidade
- Deterioração hemodinâmica com débito significativo

**Toracotomia de reanimação na sala de emergência:**
- PCR traumática com sinais de vida nos últimos 15 minutos (penetrante) ou 5 minutos (contuso)
- Acesso: toracotomia anterolateral esquerda no 4º-5º EIC
- Objetivos: alívio de tamponamento cardíaco, controle de hemorragia cardíaca, massagem cardíaca interna, oclusão da aorta descendente

### 2.4 Pneumotórax Aberto (Ferida Torácica Aspirativa)

**Fisiopatologia:**
Defeito na parede torácica > 2/3 do diâmetro da traqueia → o ar segue o caminho de menor resistência (pelo defeito em vez da traqueia) → ventilação paradoxal → hipóxia e hipercapnia progressivas.

**Clínica:**
- Ferida torácica sugante — som característico de sucção ao respirar
- Respiração paradoxal do segmento afetado
- Hipóxia e desconforto respiratório progressivos

**Tratamento:**
- **Curativo de três pontas** (oclusivo em três lados): veda a ferida durante a inspiração, permite saída de ar durante a expiração pelo lado aberto — evita pneumotórax hipertensivo iatrogênico
- Dispositivos comerciais (HyFin Chest Seal, Bolin Chest Seal): superiores ao curativo artesanal — válvula unidirecional integrada
- **Drenagem torácica em local separado** da ferida — obrigatória
- Desbridamento e fechamento cirúrgico definitivo da ferida

### 2.5 Tórax Instável com Contusão Pulmonar

**Definição de tórax instável:**
Fratura de ≥ 3 costelas consecutivas em ≥ 2 pontos → segmento torácico sem continuidade óssea → movimento paradoxal (o segmento se afunda na inspiração e protrai na expiração, ao contrário do restante do tórax).

**A contusão pulmonar é a lesão mais grave — não o tórax instável em si:**
- Hemorragia e edema alveolar progressivos nas primeiras 24-48h
- Pulmão "encharca" → shunt intrapulmonar → hipóxia progressiva
- O tórax instável é o marcador externo da violência do trauma que causou a contusão

**Clínica:**
- Movimento paradoxal do segmento instável (pode ser mascarado pelo espasmo muscular nas primeiras horas)
- Dor intensa à respiração → hipoventilação protetora → atelectasia e pneumonia
- Hipóxia progressiva — tipicamente piora nas primeiras 24-48h à medida que o edema evolui
- Taquipneia, uso de musculatura acessória

**Diagnóstico:**
- Clínico: identificação do segmento instável
- Radiografia: múltiplas fraturas de costelas, opacidade pulmonar (contusão)
- TC: mais sensível para extensão da contusão e fraturas ocultas

**Tratamento:**
- **Analgesia adequada** — pilar fundamental: dor causa hipoventilação que agrava a contusão
  - Bloqueio do nervo intercostal: infiltração de bupivacaína 0,5% nos espaços intercostais afetados + 2 acima e abaixo
  - Bloqueio do plano do eretor da espinha (ESP block): analgesia de múltiplos dermátomos — seguro e eficaz (AAST 2023)
  - Peridural torácica: padrão-ouro — reduz complicações pulmonares em 30% mas requer anestesiologista
  - Analgesia sistêmica: opioide IV, AINEs (cautela em idosos e insuficiência renal), ketamina em dose subanestésica
- **Oxigênio suplementar**: máscara com reservatório ou CNAF (cânula nasal de alto fluxo)
- **Ventilação mecânica**: SpO₂ < 90% refratária, FR > 35, fadiga respiratória — ventilação protetora (6 mL/kg, PEEP 8-12)
- **Restrição hídrica relativa**: evitar hiper-hidratação — agrava o edema da contusão
- **Fisioterapia respiratória**: espirometria de incentivo, tosse assistida — reduz pneumonia

### 2.6 Tamponamento Cardíaco

**Fisiopatologia:**
Sangue no espaço pericárdico → compressão das câmaras cardíacas (átrios e ventrículo direito são mais compressíveis) → redução do enchimento diastólico → queda do débito cardíaco → colapso cardiovascular.

O pericárdio é inelástico — volumes pequenos (150-200 mL de acúmulo agudo) causam colapso hemodinâmico, enquanto derrames crônicos de > 1 litro podem ser bem tolerados.

**Causas:**
- Trauma penetrante cardíaco (mais comum — ferimento por arma branca ou PAF)
- Trauma contuso cardíaco grave (raro como causa isolada de tamponamento)
- Iatrogênico: cateter intracardíaco, cardioversão

**Tríade de Beck:**
- Hipotensão
- Abafamento de bulhas cardíacas
- Distensão jugular

**Presente em apenas 30-40% dos casos** — não espere a tríade completa.

**Paradoxo de Kussmaul:** aumento da distensão jugular na inspiração (ao contrário do normal) — compressão do VD impossibilita o aumento do retorno venoso.

**Diagnóstico:**
- **FAST (janela subxifóidea)**: líquido pericárdico — sensibilidade > 95%
- ECG: complexos de baixa voltagem, alternância elétrica (em derrames volumosos)
- Radiografia: alargamento da silhueta cardíaca em "moringa" — apenas em derrames crônicos

**Tratamento:**

**Pericardiocentese subxifóidea:**
- Punção com agulha 18G na junção xifocostal esquerda, direcionada ao ombro esquerdo, em ângulo de 45°
- Aspire 15-20 mL de sangue → melhora hemodinâmica imediata
- Guia por ECG (lesão de corrente de entrada ao tocar o epicárdio) ou por ecocardiografia
- É uma medida temporária — o tratamento definitivo é cirúrgico

**Janela pericárdica subxifóidea:**
- Incisão subxifóidea + acesso ao pericárdio sob visão direta
- Drenagem do hemopericárdio + avaliação da lesão cardíaca

**Toracotomia de urgência:**
- Tratamento definitivo: acesso ao coração + sutura da laceração cardíaca
- Anterolateral esquerda (4º-5º EIC) ou esternotomia mediana

## 3. As Seis Lesões que Matam na Avaliação Secundária

Identificadas no exame físico completo, radiografia e TC — menos urgentes mas igualmente letais se não tratadas.

### 3.1 Pneumotórax Simples

**Clínica:**
- Dor pleurítica, dispneia leve a moderada
- Redução do murmúrio vesicular ipsilateral
- Hipertimpanismo — nem sempre presente

**Diagnóstico:**
- eFAST: ausência de deslizamento pleural (sensibilidade 92%)
- Radiografia: hipertransparência sem trama vascular, linha pleural visível
- TC: mais sensível — identifica pneumotórax oculto (não visível na radiografia)

**Pneumotórax oculto:**
- Visível apenas na TC — prevalência de 2-8% nos traumas
- Manejo controverso: observação vs. drenagem
- Indicação de drenagem: ventilação mecânica (risco de tensão), progressão sintomática, > 30% do hemitórax

**Tratamento:**
- Pneumotórax pequeno (< 15%) em paciente estável sem ventilação: observação com O₂ suplementar
- Pneumotórax > 15%, sintomático ou em ventilação mecânica: drenagem torácica
- Aspiração com cateter fino (pigtail 14F): alternativa à drenagem torácica convencional em pneumotórax simples — menos invasiva, mesma eficácia (AAST 2023)

### 3.2 Hemotórax Simples

**Clínica:**
- Macicez à percussão, redução do murmúrio vesicular, dor pleurítica
- Graus variáveis de hipotensão e taquicardia conforme o volume

**Tratamento:**
- Drenagem torácica com tubo de tórax (5º EIC, linha axilar média)
- Hemotórax residual após drenagem: trombolítico intrapleural (alteplase 25 mg em 100 mL SF, clampear por 4h, repetir em 24h) — reduz necessidade de VATS em 40% (AAST 2023)
- VATS (cirurgia torácica vídeo-assistida): hemotórax residual > 500 mL após drenagem e trombolítico, idealmente entre 3-7 dias do trauma

### 3.3 Contusão Pulmonar

**Fisiopatologia:**
Hemorragia alveolar + edema intersticial + inativação de surfactante → colapso alveolar → shunt intrapulmonar → hipóxia progressiva. A lesão é máxima entre 24-72h — pode não ser aparente inicialmente.

**Diagnóstico:**
- Radiografia: opacidade pulmonar não segmentar (não respeita limites anatômicos) — pode aparecer 6h após o trauma
- TC: mais sensível — identifica contusões não visíveis na radiografia
- Gasometria: gradiente A-a aumentado, PaO₂/FiO₂ reduzido

**Tratamento:**
- Analgesia adequada
- Oxigenoterapia
- Ventilação mecânica protetora se necessário
- Restrição hídrica relativa
- Antibioticoterapia profilática: não recomendada rotineiramente

### 3.4 Lesão da Aorta Traumática

**A lesão vascular mais letal no trauma — 80% morrem no local.**

**Mecanismo:**
Desaceleração brusca → forças de cisalhamento na aorta entre segmentos móveis e fixos → o **istmo aórtico** (junção entre arco e aorta descendente, junto ao ligamento arterioso) é o ponto de maior estresse → 90% das lesões ocorrem neste ponto.

**Classificação da AAST:**
- **Grau I**: laceração intimal (< 10 mm)
- **Grau II**: hematoma intramural
- **Grau III**: pseudoaneurisma (laceração adventícia contida)
- **Grau IV**: rotura com extravasamento livre

**Fatores de suspeita:**
- Mecanismo de alta energia (colisão > 60 km/h, queda > 3 metros, capotamento)
- Alargamento mediastinal > 8 cm na radiografia PA
- Apagamento do botão aórtico
- Desvio da traqueia para a direita
- Desvio do esôfago para a direita (sonda nasogástrica)
- Fratura de 1ª e 2ª costelas ou escápula
- Hemotórax esquerdo sem outra explicação

**Diagnóstico:**
- **Angio-TC de tórax**: padrão atual — sensibilidade e especificidade > 99% (substitui a aortografia)
- Radiografia de tórax: triagem — sensibilidade 85%, especificidade 40% para alargamento mediastinal

**Tratamento:**
- **Grau I-II**: controle da pressão arterial (alvo PAS < 120 mmHg, FC < 80 bpm) com betabloqueador IV (esmolol, labetalol) + observação com angio-TC seriada
- **Grau III-IV**: **TEVAR** (Thoracic Endovascular Aortic Repair) — primeira escolha em pacientes estáveis:
  - Mortalidade 2-3% vs. 10-20% da cirurgia aberta
  - Menor morbidade neurológica (paraplegia < 3% vs. 8-15%)
  - Pode ser realizado mesmo em paciente com outras lesões ativas
- Cirurgia aberta: reservada para anatomia desfavorável ao TEVAR (aorta < 18 mm, ausência de zona de ancoragem adequada) ou indisponibilidade de endoprótese

### 3.5 Lesão Diafragmática

**Mecanismo:**
- Trauma contuso: aumento súbito da pressão abdominal → ruptura do diafragma no ponto de menor resistência (hemidiafragma esquerdo — 75% dos casos; o fígado protege o lado direito)
- Trauma penetrante: qualquer ferida entre o 4º espaço intercostal e o umbigo deve ser considerada como potencial lesão diafragmática

**Por que é perdida:**
- Radiografia inicial pode ser normal
- O estômago e o intestino podem herniação gradualmente — diagnóstico tardio
- A sonda nasogástrica no tórax é patognomônica

**Clínica:**
- Dispneia, dor torácica e abdominal
- Redução do murmúrio vesicular ipsilateral
- Ruídos hidroaéreos no tórax
- Sinal da sonda: sonda nasogástrica acima do diafragma na radiografia

**Diagnóstico:**
- Radiografia: elevação do hemidiafragma, nível hidroaéreo no tórax, sonda nasogástrica intratorácica
- TC: padrão atual — identifica defeito diafragmático e conteúdo herniado
- VATS ou laparoscopia diagnóstica: em casos duvidosos

**Tratamento:**
- Reparo cirúrgico primário: sutura em pontos separados com fio não absorvível
- Laparotomia ou VATS conforme as lesões associadas

### 3.6 Lesão Esofágica Torácica

**Rara mas altamente letal se não diagnosticada precocemente.**

**Mecanismo:**
- Trauma penetrante (maioria)
- Trauma contuso grave: aumento súbito da pressão intraluminal (síndrome de Boerhaave traumática)
- Iatrogênico: instrumentação endoscópica

**Por que é perigosa:**
A contaminação do mediastino com conteúdo esofágico causa mediastinite → sepse → mortalidade > 50% se diagnóstico tardio (> 24h).

**Clínica:**
- Dor torácica intensa, disfagia, odinofagia
- Pneumomediastino (ar no mediastino — sinal de Hamman: crepitação sincrônica aos batimentos cardíacos)
- Derrame pleural esquerdo sem causa clara
- Saliva ou conteúdo alimentar no dreno torácico

**Diagnóstico:**
- Esofagografia com gastrografina + esofagoscopia (combinação: sensibilidade > 95%)
- TC: pneumomediastino, espessamento esofágico, coleções paraesofágicas

**Tratamento:**
- Reparo primário em duas camadas nas primeiras 24h + drenagem mediastinal
- Após 24h com mediastinite estabelecida: drenagem + exclusão esofágica (esofagostomia cervical + gastrostomia) ou stent esofágico + drenagem

## 4. Fraturas de Costelas

### Epidemiologia e Impacto

Presentes em 10-15% dos traumas. Cada costela fraturada aumenta o risco de pneumonia em 27% e a mortalidade em 19% em idosos (Holcomb, 2017).

### Classificação por Gravidade

**Fraturas simples (1-2 costelas, sem tórax instável):**
- Analgesia + fisioterapia respiratória
- Internação em idosos (> 65 anos) ou pacientes com doença pulmonar prévia

**Fraturas múltiplas (≥ 3 costelas ou bilateral):**
- Risco aumentado de pneumonia e insuficiência respiratória
- Internação em UTI ou semi-intensiva
- Analgesia regional (bloqueio intercostal ou ESP)
- Monitorização respiratória

**Tórax instável:**
- Conforme descrito acima

**Fraturas de 1ª e 2ª costelas:**
- Marcadores de trauma de alta energia
- Investigar lesão de subclávia, carótida, plexo braquial e aorta
- TC de tórax e angio-TC se indicado

**Fraturas de costelas inferiores (10-12):**
- Investigar lesão hepática, esplênica e renal
- TC de abdome obrigatória

### Fixação Cirúrgica de Costelas (SSRF — Surgical Stabilization of Rib Fractures)

Indicações atuais (AAST 2023):
- Tórax instável com > 4 segmentos costais fraturados e falha de desmame ventilatório
- Tórax instável com dor intratável refratária à analgesia adequada
- Toracotomia por outra indicação com acesso às fraturas
- Fratura com fragmento desviado causando perfuração pulmonar

Técnica: placas e parafusos de titânio específicos (MatrixRIB, DePuy Synthes) — VATS ou toracotomia.

## 5. Lesões Cardíacas Contusas

### Contusão Miocárdica

**A lesão cardíaca mais frequente no trauma contuso.**

**Mecanismo:** compressão direta do coração entre o esterno e a coluna vertebral — o ventrículo direito é mais anteriorizado e mais vulnerável.

**Espectro clínico:**
- Assintomático (maioria)
- Arritmias (mais comum: extrassístoles ventriculares, fibrilação atrial)
- Disfunção ventricular (raramente)
- Ruptura de câmara (rara — alta mortalidade)

**Diagnóstico:**
- ECG: alterações de repolarização, bloqueios de ramo, arritmias — solicite na admissão e repita em 6h
- Troponina I: elevação indica lesão miocárdica — valor prognóstico controverso
- Ecocardiografia: indicada em alterações de ECG persistentes ou instabilidade hemodinâmica sem explicação — avalia função ventricular e derrame pericárdico

**Tratamento:**
- ECG e monitorização cardíaca por 24-48h se alteração no ECG inicial
- ECG e troponina normais: sem monitorização adicional necessária
- Arritmias: tratamento convencional (antiarrítmicos, cardioversão)
- Disfunção ventricular: suporte inotrópico

### Ruptura Cardíaca Traumática

- 90% morrem antes de chegar ao hospital
- Átrio direito: mais frequente entre os sobreviventes
- Tratamento: toracotomia de emergência + sutura com pledgets

## 6. Outras Lesões Torácicas

### Pneumomediastino

- Ar no mediastino — sinal de lesão de esôfago, traqueia ou brônquio
- Sinal de Hamman: crepitação sincrônica aos batimentos cardíacos
- TC: confirma e localiza — investigue lesão de via aérea e esôfago

### Lesão de Ducto Torácico

- Quilotórax traumático: líquido branco-leitoso no dreno torácico
- Diagnóstico: triglicerídeos > 110 mg/dL no líquido pleural
- Tratamento: dieta com triglicerídeos de cadeia média → ocreotide → ligadura cirúrgica ou embolização linfática

### Fratura de Esterno

- Mecanismo: impacto direto (volante, airbag)
- Clínica: dor retroesternal, crepitação, equimose
- Diagnóstico: radiografia lateral de tórax, TC
- Associação: contusão miocárdica, lesão de grandes vasos, fratura de coluna torácica
- Tratamento: analgesia + investigação de lesões associadas

### Enfisema Subcutâneo

- Ar no tecido subcutâneo — crepitação à palpação
- Causas: pneumotórax com laceração pleural, lesão de traqueia ou esôfago, fratura de costela com laceração pulmonar
- Tratamento da causa — o enfisema subcutâneo se resolve espontaneamente

## 7. Drenagem Torácica — Técnica Detalhada

### Indicações

- Pneumotórax hipertensivo (após descompressão por agulha)
- Hemotórax maciço ou simples sintomático
- Pneumotórax aberto
- Pneumotórax simples > 15% ou em ventilação mecânica
- Empiema e derrame parapneumônico

### Técnica Padrão ATLS

1. Posição: paciente em decúbito dorsal com o braço ipsilateral abduzido a 90° — exposição da axila
2. Local: **5º EIC, linha axilar média** (nível do mamilo em homens)
3. Assepsia e antissepsia + campo estéril
4. Anestesia local: lidocaína 1% com adrenalina infiltrada na pele, subcutâneo, periósteo e pleura parietal
5. Incisão de 2-3 cm na pele e subcutâneo acima da borda superior da costela inferior (evita o feixe neurovascular na borda inferior)
6. Dissecção romba com Kelly curva até a pleura
7. Perfuração da pleura com a Kelly — saída de ar ou sangue confirma posição
8. Introdução do dedo indicador: palpe o pulmão, verifique ausência de aderências e confirme posição correta
9. Introdução do tubo com Kelly: direcione posterior e superiormente para pneumotórax, posterior e inferiormente para hemotórax
10. Conecte ao selo d'água: borbulhamento confirma fuga aérea; débito sanguíneo deve ser medido
11. Fixação com fio inabsorvível (algodão ou seda) + curativo oclusivo
12. Radiografia de tórax: confirma posição do tubo

### Erros Comuns

- Posição muito anterior: lesão de artéria mamária interna
- Posição muito posterior: tubo dobra e não drena
- Introdução sobre a borda inferior da costela: lesão do feixe neurovascular intercostal
- Tubo muito fino: não drena hemotórax coagulado
- Não palpar antes de introduzir: risco de introdução em diafragma elevado ou víscera abdominal

## 8. Pontos-Chave

- Trauma torácico causa 25% das mortes por trauma — 85% tratados sem toracotomia
- Pneumotórax hipertensivo: diagnóstico clínico — descomprima imediatamente, não aguarde imagem
- Hemotórax maciço: > 1500 mL inicial ou > 200 mL/h por 4h → toracotomia
- Tamponamento cardíaco: FAST é o método diagnóstico — tríade de Beck presente em apenas 30%
- Contusão pulmonar: piora progressiva nas primeiras 24-48h — analgesia regional reduz complicações em 30% (AAST 2023)
- Lesão de aorta: angio-TC é o padrão diagnóstico; TEVAR é o tratamento de escolha grau III-IV
- Hemotórax residual: trombolítico intrapleural (alteplase) reduz necessidade de VATS em 40% (AAST 2023)
- Fratura de 1ª-2ª costelas: trauma de alta energia — investigue lesão vascular de grande calibre
- Fraturas de costelas inferiores: investigue fígado, baço e rins
- Lesão esofágica: esofagografia + esofagoscopia para sensibilidade > 95% — diagnóstico tardio causa mediastinite letal
- Pneumomediastino: sempre investigue lesão de traqueia e esôfago

## Glossário

**AAST** — American Association for the Surgery of Trauma. Associação que publica classificações de lesões e diretrizes de manejo. Atualizou as diretrizes de trauma torácico em 2023.

**FAST / eFAST** — Focused Assessment with Sonography in Trauma / Extended FAST. Ultrassonografia focada no trauma. O eFAST inclui avaliação pleural bilateral: ausência de deslizamento pleural indica pneumotórax (sensibilidade 92-95%).

**EIC** — Espaço Intercostal. Referência anatômica essencial no trauma torácico: descompressão por agulha no 2º EIC linha hemiclavicular; drenagem torácica no 5º EIC linha axilar média.

**TEVAR** — Thoracic Endovascular Aortic Repair. Reparo endovascular da aorta torácica com endoprótese introduzida por via femoral. Primeira escolha para lesão de aorta grau III-IV: mortalidade 2-3% vs. 10-20% da cirurgia aberta.

**VATS** — Video-Assisted Thoracic Surgery. Cirurgia torácica vídeo-assistida. Indicada para hemotórax residual > 500 mL após drenagem e trombolítico intrapleural, idealmente entre 3-7 dias do trauma.

**SSRF** — Surgical Stabilization of Rib Fractures. Fixação cirúrgica de costelas com placas e parafusos de titânio. Indicada em tórax instável com falha de desmame ventilatório ou dor intratável.

**Tríade de Beck** — Hipotensão + abafamento de bulhas cardíacas + distensão jugular. Sinal clínico de tamponamento cardíaco. Presente em apenas 30-40% dos casos — não espere a tríade completa.

**Paradoxo de Kussmaul** — Aumento da distensão jugular na inspiração (ao contrário do fisiológico). Indica tamponamento ou pericardite constritiva.

**Manobra de Pringle** — Oclusão digital ou com pinça do hilo hepático (artéria hepática + veia porta). Reduz imediatamente o sangramento hepático. Tolerada por até 60 minutos em normotermia.

**Alteplase** — Ativador tecidual do plasminogênio (t-PA). Trombolítico usado intrapleuralmente no hemotórax residual após drenagem. Dose: 25 mg em 100 mL SF, clampear por 4h. Reduz necessidade de VATS em 40% (AAST 2023).

**ESP block** — Erector Spinae Plane block. Bloqueio do plano do eretor da espinha. Técnica de analgesia regional para fraturas de costelas — analgesia de múltiplos dermátomos torácicos com perfil de segurança favorável.

**ETCO₂** — CO₂ ao final da expiração. Capnografia: confirmação de posição do tubo após IOT. No trauma torácico grave, a capnografia também monitora o débito cardíaco (ETCO₂ cai em choque).

**SpO₂** — Saturação periférica de oxigênio. Meta: ≥ 94%. No tórax instável: SpO₂ < 90% indica necessidade de ventilação mecânica.

**IOT** — Intubação Orotraqueal. Via aérea definitiva. No pneumotórax hipertensivo por barotrauma: suspenda a ventilação com pressão positiva e descomprima imediatamente.

**GCS** — Glasgow Coma Scale. No trauma torácico, GCS reduzido pode indicar TCE associado ou hipóxia grave por comprometimento ventilatório.

**PaO₂/FiO₂** — Índice de oxigenação. Normal: > 400. Abaixo de 300: lesão pulmonar aguda. Abaixo de 200: SDRA (Síndrome do Desconforto Respiratório Agudo). Na contusão pulmonar grave, pode cair progressivamente nas primeiras 48h.

**SDRA** — Síndrome do Desconforto Respiratório Agudo. Forma grave de lesão pulmonar com hipóxia refratária, infiltrados bilaterais e baixa complacência pulmonar. Complicação tardia da contusão pulmonar grave.

**Istmo aórtico** — Porção da aorta entre o arco e a aorta descendente, junto ao ligamento arterioso. Ponto de maior estresse por cisalhamento em desaceleração brusca — 90% das lesões traumáticas de aorta ocorrem neste nível.

**Tríade letal** — Hipotermia + Acidose + Coagulopatia. No trauma torácico com hemotórax maciço e choque, a tríade se instala rapidamente — DCS é indicado quando presente.

**Sinal de Hamman** — Crepitação sincrônica aos batimentos cardíacos, audível à ausculta. Indica pneumomediastino — pesquise lesão de traqueia ou esôfago.

**TEG / ROTEM** — Tromboelastografia / Tromboelastometria rotacional. Avaliam coagulação em tempo real. Indicados no trauma torácico com hemorragia significativa para guiar reposição de hemoderivados.

**DCR** — Damage Control Resuscitation. Hipotensão permissiva + 1:1:1 + ATX. Aplicado no hemotórax maciço com choque hemorrágico.

**ATX** — Ácido Tranexâmico. 1g IV em 10 min + 1g em 8h. Janela: primeiras 3 horas do trauma.

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- American Association for the Surgery of Trauma (AAST). Thoracic Trauma Guidelines, 2023.
- Society of Thoracic Surgeons. Guidelines for Management of Traumatic Aortic Injury, 2023.
- Holcomb JB et al. Morbidity from rib fractures increases with each rib fractured. Journal of the American College of Surgeons, 2017.
- Pieracci FM et al. Surgical Stabilization of Rib Fractures: Indications, Outcomes, and Future Directions. Injury, 2022.
- Symbas PN. Cardiothoracic Trauma. Current Problems in Surgery, 2021.
- Lee WA et al. Endovascular repair of traumatic thoracic aortic injury: clinical practice guidelines. Journal of Vascular Surgery, 2023.`,
  },
  {
    id: 'd0c5e8fe-be15-4e9b-a011-a1a97dfcccd4',
    title: 'ATLS: Choque no Trauma',
    description: 'Fisiopatologia, classificação e manejo do choque no paciente traumatizado — reconhecimento precoce, reanimação hemostática e damage control resuscitation baseados no ATLS 10ª edição e diretrizes da EAST/AAST 2023',
    theme: 'atls_choque',
    type: 'article',
    content: `## 1. Introdução — xABCDE e Damage Control Resuscitation (ATLS 11ª Ed.) e Definição

O choque é definido como **hipoperfusão tecidual generalizada** — incapacidade do sistema cardiovascular de fornecer oxigênio e substratos metabólicos em quantidade suficiente para atender à demanda dos tecidos. No trauma, a consequência imediata é a disfunção celular por hipóxia, com progressão para falência de órgãos e morte se não revertido precocemente.

O choque hemorrágico é a forma mais comum no trauma, responsável por 30-40% das mortes traumáticas e pela maioria das mortes evitáveis. Hemorragia não controlada é a principal causa de morte prevenível no trauma — e o controle hemorrágico precoce é a intervenção de maior impacto na redução da mortalidade.

### Atualização das Diretrizes — EAST/AAST 2023

- A **reanimação hemostática** com razão 1:1:1 (plasma:plaquetas:concentrado de hemácias) é o padrão atual em choque hemorrágico grave — reduz mortalidade em 25% comparado à reanimação com cristaloides
- O **ácido tranexâmico** deve ser administrado nas primeiras 3 horas — a janela terapêutica é rigorosa e o benefício desaparece após esse período
- A **hipotensão permissiva** (PAS 80-90 mmHg) é recomendada em trauma penetrante sem TCE até a hemostasia cirúrgica definitiva
- O **REBOA** (Resuscitative Endovascular Balloon Occlusion of the Aorta) tem indicação estabelecida em hemorragia abdominal e pélvica refratária como ponte para cirurgia
- A **transfusão maciça precoce** (ativação do protocolo de transfusão maciça) deve ser iniciada com base em critérios clínicos — não aguarde confirmação laboratorial
- O **viscoelastograma** (TEG/ROTEM) guia a reposição de hemoderivados de forma mais precisa que o coagulograma convencional

## 2. Fisiopatologia do Choque

### Oferta e Demanda de Oxigênio

O equilíbrio entre oferta (DO₂) e consumo (VO₂) de oxigênio é o determinante central da viabilidade celular:

**DO₂ = DC × CaO₂**
- DC (débito cardíaco) = FC × VS
- CaO₂ (conteúdo arterial de O₂) = (Hb × 1,34 × SaO₂) + (PaO₂ × 0,0031)

Qualquer redução no débito cardíaco, na hemoglobina ou na saturação arterial reduz a oferta de oxigênio. No choque hemorrágico, os três componentes são afetados simultaneamente: perda de volume (reduz VS), perda de hemácias (reduz Hb) e colapso circulatório (reduz DC).

**Quando DO₂ cai abaixo do limiar crítico:**
- Os tecidos aumentam a extração de O₂ (SvO₂ cai)
- Esgotada a capacidade de extração → metabolismo anaeróbico
- Produção de lactato → acidose metabólica
- Disfunção de bomba sódio-potássio → edema celular
- Falência mitocondrial → morte celular → falência de órgãos

### A Tríade Letal do Trauma

Os três componentes formam um ciclo vicioso autoperpetuante:

**Hipotermia:**
- Cada 1°C de queda na temperatura reduz a atividade enzimática da cascata de coagulação em 10%
- < 34°C: coagulopatia clinicamente significativa
- < 32°C: risco de fibrilação ventricular
- Causas no trauma: exposição ambiental, infusão de fluidos frios, redistribuição de calor pelo choque

**Acidose:**
- pH < 7,2: inibição enzimática grave da coagulação
- pH < 7,1: disfunção miocárdica grave, resposta reduzida a vasopressores
- Causas: hipoperfusão → metabolismo anaeróbico → acúmulo de lactato
- Cristaloides em excesso também causam acidose hiperclorêmica (solução salina 0,9%)

**Coagulopatia:**
- Presente em 25-35% dos politraumatizados graves na admissão — antes de qualquer reposição
- **Coagulopatia aguda induzida pelo trauma (CAT)**: ativação do sistema anticoagulante endógeno (proteína C) + hiperfibrinólise por liberação de t-PA pelo endotélio hipoperfundido
- Agravada pela diluição de fatores (cristaloides), hipotermia e acidose
- Cada componente da tríade piora os outros dois

### Resposta Neuroendócrina ao Choque

**Fase compensatória:**
- Ativação do sistema simpático-adrenal: catecolaminas → taquicardia, vasoconstrição periférica, redistribuição do fluxo para órgãos nobres (coração, cérebro)
- Ativação do SRAA: angiotensina II → vasoconstrição + aldosterona → retenção de sódio e água
- ADH: retenção de água livre
- Resultado: manutenção da PA às custas de redução da perfusão periférica

**Fase descompensatória:**
- Esgotamento dos mecanismos compensatórios
- Vasodilatação paradoxal → colapso cardiovascular
- Isquemia intestinal → translocação bacteriana → ativação sistêmica do complemento e citocinas
- SIRS → MODS (Síndrome de Disfunção de Múltiplos Órgãos)

## 3. Classificação do Choque

### Por Mecanismo

**Choque hipovolêmico (mais comum no trauma):**
- Redução do volume intravascular → redução do retorno venoso → redução do débito cardíaco
- Hemorrágico (sangue) ou não hemorrágico (plasma — queimaduras extensas)

**Choque obstrutivo:**
- Obstrução mecânica ao fluxo → redução do débito cardíaco apesar de volume adequado
- Pneumotórax hipertensivo: compressão de VD + veia cava
- Tamponamento cardíaco: compressão de câmaras cardíacas
- TEP maciço: obstrução da circulação pulmonar

**Choque distributivo:**
- Vasodilatação periférica maciça → maldistribuição do fluxo
- Choque séptico: mediadores inflamatórios → vasodilatação
- Choque neurogênico: perda do tônus simpático → vasodilatação + bradicardia (ausência de taquicardia reflexa)
- Choque anafilático: histamina → vasodilatação + broncoespasmo

**Choque cardiogênico:**
- Falência da bomba cardíaca → débito cardíaco inadequado apesar de volume adequado
- Contusão miocárdica grave, infarto agudo, ruptura cardíaca

### Classificação Hemorrágica do ATLS

| Parâmetro | Classe I | Classe II | Classe III | Classe IV |
|---|---|---|---|---|
| Perda de sangue (mL) | < 750 | 750-1500 | 1500-2000 | > 2000 |
| Perda de sangue (%) | < 15% | 15-30% | 30-40% | > 40% |
| FC (bpm) | < 100 | 100-120 | 120-140 | > 140 |
| PA sistólica | Normal | Normal | Reduzida | Muito reduzida |
| Pressão de pulso | Normal/aumentada | Reduzida | Reduzida | Muito reduzida |
| FR (irpm) | 14-20 | 20-30 | 30-40 | > 35 |
| Débito urinário (mL/h) | > 30 | 20-30 | 5-15 | Mínimo |
| Nível de consciência | Normal | Ansioso | Confuso | Letárgico |
| Reposição | Cristaloide | Cristaloide + hemoderivados | Hemoderivados | Hemoderivados + cirurgia |

**Limitações da classificação:**
- Idosos e pacientes em uso de betabloqueadores: taquicardia pode estar ausente mesmo em choque grave
- Atletas: FC basal baixa — taquicardia pode não atingir os limiares da tabela
- A PA é um marcador tardio — hipotensão indica perda de > 30% da volemia
- Gestantes: expansão fisiológica do volume → hipovolemia relativa mascarada

### Índice de Choque (Shock Index)

**SI = FC / PAS**

- Normal: 0,5-0,7
- SI > 1,0: choque significativo — transfusão provável
- SI > 1,4: choque grave — ativar protocolo de transfusão maciça
- Mais sensível que FC ou PA isoladamente para detectar choque precoce

## 4. Diagnóstico e Monitorização

### Avaliação Clínica

**Nível de consciência:**
- O cérebro é o órgão mais sensível à hipoperfusão
- Agitação: hipóxia ou hipoperfusão cerebral precoce
- Confusão: hipoperfusão moderada
- Letargia: hipoperfusão grave
- Coma: falência circulatória

**Perfusão periférica:**
- Tempo de enchimento capilar (TEC): > 2 segundos indica hipoperfusão
- Temperatura da extremidade: pele fria e úmida = vasoconstrição compensatória
- Coloração: palidez (vasoconstrição), cianose (hipóxia)

**Pulso:**
- Radial presente: PAS aproximadamente > 80 mmHg
- Femoral presente, radial ausente: PAS aproximadamente 70-80 mmHg
- Apenas carotídeo: PAS aproximadamente < 60 mmHg
- Pulso cheio e vasodilatação periférica em paciente hipotensor: choque distributivo (neurogênico ou séptico)

**Débito urinário:**
- Marcador de perfusão renal: meta > 0,5 mL/kg/h em adultos, > 1 mL/kg/h em crianças
- Requer sonda vesical — contraindicada em suspeita de lesão uretral

### Exames Laboratoriais

**Hemograma:**
- Hemoglobina e hematócrito iniciais podem ser normais — a hemodiluição ocorre após reposição volêmica
- Plaquetas: < 50.000/mm³ indica trombocitopenia grave com risco hemorrágico

**Lactato sérico:**
- Marcador de hipoperfusão tecidual — mais sensível que a PA
- Normal: < 2 mmol/L
- Lactato > 4 mmol/L: hipoperfusão grave, alta mortalidade
- **Clearance de lactato**: redução ≥ 10% em 2h indica resposta adequada à ressuscitação
- Meta de ressuscitação: normalização do lactato (< 2 mmol/L)

**Gasometria arterial:**
- pH < 7,35: acidose — quantifica a gravidade
- BE (base excess) < -6: acidose metabólica significativa por hipoperfusão
- PaO₂/FiO₂: avalia comprometimento da troca gasosa

**Coagulograma convencional:**
- TP, TTPa, INR: avaliam a cascata de coagulação
- Fibrinogênio: < 150 mg/dL indica coagulopatia grave
- Limitação: resultados demoram 30-60 minutos — não guiam a reposição em tempo real

**Viscoelastograma (TEG/ROTEM):**
- Avalia toda a cascata de coagulação em tempo real (resultado em 10-15 minutos)
- Identifica o componente específico da coagulopatia: deficiência de fatores, hipofibrinogenemia, hiperfibrinólise, trombocitopenia
- Guia reposição específica — evita transfusão desnecessária
- **AAST 2023**: recomenda uso rotineiro em centros de trauma para guiar reposição hemostática

**Ureia e creatinina:**
- Lesão renal aguda: complicação frequente do choque prolongado

### FAST e eFAST

- Identifica hemotórax, hemopericárdio e líquido livre intraabdominal
- Guia a decisão cirúrgica imediata em paciente instável
- FAST positivo + instabilidade: sala cirúrgica — não sala de TC

## 5. Tratamento do Choque Hemorrágico

### Controle da Hemorragia — Prioridade Absoluta

O tratamento do choque hemorrágico começa pelo controle da fonte de sangramento — a reposição volêmica sem controle da hemorragia é ineficaz e prejudicial.

**Hemorragia externa:**
- Torniquete: hemorragia de membros — padrão CAT ou SOFTT-W, 5-7 cm proximal, apertar até cessar
- Curativos hemostáticos: lesões de junção onde o torniquete não é aplicável
- Compressão pélvica: fratura pélvica instável — cinto pélvico ao nível dos trocânteres

**Hemorragia interna — identificar a fonte:**
- Tórax: hemotórax → drenagem + toracotomia se indicado
- Abdome: FAST positivo + instabilidade → laparotomia de emergência
- Pelve: fratura pélvica instável → cinto pélvico + angioembolização ou packing pré-peritoneal
- Retroperitônio: difícil controle sem cirurgia

### REBOA — Ressuscitação Endovascular por Oclusão de Balão Aórtico

**Indicação:**
- Hemorragia intraabdominal ou pélvica refratária como ponte para cirurgia definitiva
- Substitui parcialmente a função do clampamento aórtico aberto

**Zonas de posicionamento:**
- **Zona I** (aorta descendente torácica): hemorragia abdominal (acima do diafragma) — reduz fluxo para abdome e aumenta pós-carga cardíaca
- **Zona III** (aorta infrarrenal): hemorragia pélvica — preserva perfusão visceral

**Técnica:**
- Acesso femoral percutâneo (artéria femoral comum)
- Introdutor 7-12 French
- Balão posicionado por fluoroscopia ou referência anatômica + radiografia
- Insuflação parcial (oclusão parcial) é preferível à oclusão completa — reduz isquemia distal

**Limitações:**
- Isquemia de membros inferiores se oclusão prolongada (> 60 minutos em zona I, > 30 minutos em zona III)
- Não substitui o controle cirúrgico definitivo — deve ser seguido imediatamente de laparotomia ou angioembolização

### Acesso Vascular e Reposição

**Acesso vascular:**
- Dois acessos venosos periféricos calibrosos (≥ 16G) em fossas antecubitais — primeira escolha
- Acesso intraósseo (IO): alternativa imediata quando periférico falha em 90 segundos — qualquer fármaco pode ser infundido
- Acesso venoso central: quando periférico e IO não são possíveis — risco de pneumotórax e demora

**Aquecimento dos fluidos:**
- Todos os fluidos e hemoderivados devem ser aquecidos a 39°C antes da infusão
- Cada litro de fluido gelado reduz a temperatura central em 0,25°C — agrava a tríade letal
- Use aquecedor de fluidos inline (Level 1, Ranger) em todo paciente em reposição volêmica

### Damage Control Resuscitation (DCR)

O DCR é a estratégia de reanimação que combina:

**1. Hipotensão permissiva:**
- Alvo: PAS 80-90 mmHg em trauma penetrante sem TCE
- Alvo: PAS ≥ 90 mmHg em TCE associado (manter PPC)
- Racional: pressão arterial mais elevada desaloja coágulos em formação e aumenta a hemorragia
- Duração: apenas até a hemostasia cirúrgica definitiva — não é estratégia crônica
- Contraindicações: TCE grave, lesão medular, isquemia coronariana

**2. Reanimação hemostática precoce:**

**Razão 1:1:1 (plasma:plaquetas:concentrado de hemácias):**
- Simula o sangue total em composição
- Estudo PROPPR (JAMA 2015): razão 1:1:1 reduziu mortalidade em 30 dias vs. 1:1:2
- Estudo PRAGMATIC (NEJM 2023): confirmou benefício da razão 1:1:1 em trauma civil e militar
- Plasma: repõe todos os fatores de coagulação
- Plaquetas: 1 pool de plaquetas (aférese) para cada 6 unidades de hemácias
- Concentrado de hemácias: restaura capacidade de transporte de O₂

**Protocolo de Transfusão Maciça (PTM):**
- Ativar quando: SI > 1,4, ou necessidade prevista de > 10 unidades de hemácias em 24h, ou perda de > 50% da volemia em < 3h
- Critérios de ativação clínica (Assessment of Blood Consumption Score — ABC Score):
  - PA ≤ 90 mmHg: 1 ponto
  - FC ≥ 120 bpm: 1 ponto
  - Mecanismo penetrante: 1 ponto
  - FAST positivo: 1 ponto
  - ABC ≥ 2: ativar PTM
- O PTM libera pacotes de hemoderivados em razão pré-estabelecida a cada 30 minutos

**Metas hemostáticas durante a ressuscitação:**
- Fibrinogênio ≥ 150-200 mg/dL (repor com crioprecipitado ou concentrado de fibrinogênio se < 150)
- Plaquetas ≥ 50.000/mm³ (≥ 100.000 em TCE)
- INR ≤ 1,5
- TEG/ROTEM: guia reposição específica quando disponível

**3. Ácido tranexâmico (ATX):**
- Antifibrinolítico — inibe a ativação do plasminogênio, reduzindo a lise dos coágulos em formação
- **Dose**: 1g IV em 10 minutos + 1g IV em 8 horas (infusão contínua)
- **Janela terapêutica**: máximo 3 horas após o trauma — administração após 3h aumenta mortalidade (CRASH-2, Lancet 2011)
- Benefício: redução de 15% na mortalidade por hemorragia quando administrado precocemente
- Uso pré-hospitalar: recomendado em trauma com choque hemorrágico — o APH é o momento ideal
- Contraindicações relativas: trombose ativa documentada, CIVD com predominância trombótica

**Cristaloides — papel reduzido na DCR:**
- Solução salina 0,9%: acidose hiperclorêmica com volumes > 2L — evitar em grandes volumes
- Ringer lactato: preferível ao SF 0,9% — menor acidose, mais fisiológico
- Volumes limitados: usar como ponte até disponibilidade de hemoderivados
- **Não substituem hemoderivados em choque hemorrágico grave** — diluem fatores de coagulação e pioram a tríade letal

### Metas de Ressuscitação

A ressuscitação guiada por metas (goal-directed resuscitation) é superior à ressuscitação empírica:

**Metas precoces (primeiras 6h):**
- PAS: 80-90 mmHg (sem TCE) ou ≥ 90 mmHg (com TCE)
- FC < 100 bpm
- SpO₂ ≥ 94%
- Temperatura ≥ 36°C
- Débito urinário ≥ 0,5 mL/kg/h

**Metas laboratoriais:**
- Lactato: normalização (< 2 mmol/L) ou clearance ≥ 10% em 2h
- pH ≥ 7,35
- Base excess > -6
- Hemoglobina ≥ 7 g/dL (≥ 10 g/dL em TCE grave ou coronariopata)
- Coagulograma e TEG/ROTEM normalizados

**Ressuscitação excessiva — riscos:**
- Síndrome compartimental abdominal: hipertensão intraabdominal por edema visceral e retroperitoneal
- Edema pulmonar: sobrecarga hídrica agrava a contusão pulmonar
- Coagulopatia dilucional: cristaloides em excesso diluem fatores de coagulação
- Hipotermia: fluidos não aquecidos

## 6. Choque Obstrutivo no Trauma

### Pneumotórax Hipertensivo

- Tratamento: descompressão imediata por agulha + drenagem torácica
- Detalhado na aula de Trauma Torácico

### Tamponamento Cardíaco

- Tratamento: pericardiocentese + toracotomia de urgência
- Detalhado na aula de Trauma Torácico

## 7. Choque Neurogênico

**Definição:**
Hipotensão por perda do tônus simpático vasomotor em lesão medular cervical ou torácica alta (acima de T6) — vasodilatação sistêmica sem compensação.

**Diferença fundamental do choque hemorrágico:**

| Parâmetro | Hemorrágico | Neurogênico |
|---|---|---|
| FC | Taquicardia | Bradicardia ou normocardia |
| Pele | Fria, pálida, úmida | Quente, rosada, seca (abaixo da lesão) |
| Pressão de pulso | Reduzida | Normal ou aumentada |
| Veias jugulares | Colabadas | Distendidas ou normais |

**Fisiopatologia:**
- Lesão medular → interrupção das vias simpáticas descendentes
- Vasodilatação periférica → redução da resistência vascular sistêmica → hipotensão
- Bradicardia: perda do simpático cardíaco + predomínio parassimpático (vagal)
- Priapismo: vasodilatação pélvica sem compensação simpática — sinal clínico de lesão medular

**Tratamento:**
- Excluir choque hemorrágico concomitante — frequentemente coexistem
- Reposição volêmica criteriosa: 1-2L de cristaloide — evite hiper-hidratação (risco de edema medular e pulmonar)
- Vasopressores: **norepinefrina** (primeiro linha) ou **fenilefrina** — restauram o tônus vasomotor
  - Meta: PAM ≥ 85-90 mmHg nas primeiras 7 dias para perfusão medular adequada (AO Spine 2023)
- Atropina: bradicardia sintomática (FC < 50 bpm com instabilidade)
- Marca-passo transcutâneo: bradicardia refratária à atropina

## 8. Choque em Populações Especiais

### Idosos

- Menor reserva fisiológica — mecanismos compensatórios mais lentos e menos eficientes
- Betabloqueadores: mascaram taquicardia — FC normal não exclui choque
- Anticoagulantes: coagulopatia preexistente agrava a hemorragia
- Menor tolerância à hipotensão: lesão renal aguda e isquemia miocárdica ocorrem com PAS > 90 mmHg que seria "aceitável" em jovens
- Meta mais conservadora: PAS ≥ 100 mmHg em idosos
- Monitorização invasiva precoce (cateter arterial): mais sensível que PANI para detectar oscilações

### Crianças

- Mecanismos compensatórios muito eficientes — hipotensão é sinal tardio e ominoso
- Taquicardia + tempo de enchimento capilar > 2s: sinais precoces de choque
- Parâmetros por faixa etária (fita de Broselow)
- Dose de cristaloide: 20 mL/kg em bolus — se sem resposta após 2 bolus → hemoderivados
- Acesso IO: limiar muito baixo em crianças — use precocemente

### Gestantes

- Expansão fisiológica do volume (40-50%): PA basal mais baixa, FC mais alta
- Compressão aortocaval pelo útero gravídico: decúbito lateral esquerdo ou inclinação da maca 15-30°
- O feto pode estar em sofrimento com mãe aparentemente estável — monitorize continuamente
- Ressuscitar a mãe é ressuscitar o feto

### Pacientes em Anticoagulação

- Varfarina: reverter com complexo protrombínico (4 fatores) + vitamina K — não aguarde efeito da vitamina K
- Dabigatrana: idarucizumab 5g IV — reversão específica imediata
- Rivaroxabana/apixabana: andexanet alfa ou complexo protrombínico não ativado (4 fatores)
- Heparina: sulfato de protamina 1mg/100 UI de heparina administrada

## 9. Damage Control Surgery (DCS)

### Conceito

Em pacientes com a tríade letal (hipotermia + acidose + coagulopatia), a cirurgia extensa e prolongada é letal — o estresse cirúrgico agrava os três componentes da tríade. O DCS consiste em cirurgia abreviada seguida de ressuscitação em UTI e cirurgia definitiva posterior.

### Três Fases do DCS

**Fase 1 — Cirurgia abreviada de controle de dano:**
- Objetivos: controle da hemorragia + controle da contaminação
- Técnicas hemostáticas: clampamento vascular, ligadura, packing abdominal (compressas hemostáticas), shunt vascular temporário
- Técnicas de controle de contaminação: ressecção intestinal sem anastomose, fechamento de perfurações com grampeador
- Fechamento temporário do abdome: bolsa de Bogotá, Vacupack, sistema comercial de fechamento a vácuo (VAC)
- Duração máxima: 60-90 minutos

**Fase 2 — Ressuscitação em UTI:**
- Aquecimento ativo: cobertores térmicos, fluidos aquecidos, ar quente, cama térmica
- Correção da acidose: ressuscitação com hemoderivados, bicarbonato se pH < 7,1
- Correção da coagulopatia: plasma, plaquetas, crioprecipitado, fibrinogênio guiados por TEG/ROTEM
- Suporte ventilatório, hemodinâmico e renal
- Duração: 24-72 horas

**Fase 3 — Cirurgia definitiva:**
- Após normalização da temperatura (≥ 36°C), pH (≥ 7,35) e coagulograma
- Reconstrução intestinal, reparo vascular definitivo, fechamento abdominal
- Revisão de lesões

### Critérios para Ativar o DCS

- pH < 7,2 ou BE < -8
- Temperatura < 35°C
- INR > 1,5 ou coagulopatia clínica evidente
- Transfusão > 10 unidades de hemácias
- Hipotensão refratária à reposição
- Lesões múltiplas que exigiriam > 90 minutos de cirurgia

## 10. Monitorização Avançada

### Monitorização Hemodinâmica Minimamente Invasiva

**Pressão arterial invasiva (cateter arterial):**
- Fornece PA batimento a batimento — essencial em paciente instável
- Acesso: artéria radial (primeira escolha), femoral (alternativa)
- Variação da pressão de pulso (VPP) > 13%: indica responsividade a fluidos em paciente ventilado

**Pressão venosa central (PVC):**
- Reflecte a pré-carga do VD — limitações como guia de ressuscitação
- PVC baixa: hipovolemia; PVC alta: sobrecarga, tamponamento, pneumotórax

**Débito cardíaco por termodiluição (Swan-Ganz) ou PiCCO:**
- Indicado em choque refratário sem diagnóstico claro
- Diferencia choque hipovolêmico, cardiogênico e distributivo

### Near-Infrared Spectroscopy (NIRS)

- Mede a saturação tecidual de O₂ em músculo (StO₂) — marcador de hipoperfusão periférica
- StO₂ < 75%: hipoperfusão muscular grave — correlaciona com mortalidade
- Disponível em centros de trauma de alto volume

## 11. Pontos-Chave

- Choque hemorrágico é a principal causa de morte evitável no trauma — controle da hemorragia antes de qualquer reposição
- A tríade letal (hipotermia + acidose + coagulopatia) é autoperpetuante — previna desde o APH
- Coagulopatia aguda induzida pelo trauma está presente em 25-35% dos pacientes na admissão — antes da reposição
- Reanimação hemostática 1:1:1 (plasma:plaquetas:hemácias) reduz mortalidade em 25% (PROPPR, PRAGMATIC)
- Ácido tranexâmico: 1g IV nas primeiras 3 horas — janela terapêutica rigorosa
- Hipotensão permissiva (PAS 80-90) em penetrante sem TCE — não aplique em TCE ou lesão medular
- ABC Score ≥ 2: ative o Protocolo de Transfusão Maciça — não aguarde confirmação laboratorial
- TEG/ROTEM: guia reposição específica em tempo real — superior ao coagulograma convencional
- Choque neurogênico: bradicardia + vasodilatação + hipotensão — norepinefrina + PAM ≥ 85-90 mmHg
- DCS: cirurgia abreviada (< 90 min) → UTI (correção da tríade) → cirurgia definitiva
- Lactato e seu clearance são os melhores marcadores de adequação da ressuscitação — meta: normalização

## Glossário

**DO₂** — Oferta (delivery) de oxigênio aos tecidos. Calculada como DC × CaO₂. Redução abaixo do limiar crítico → metabolismo anaeróbico → acidose lática.

**VO₂** — Consumo de oxigênio pelos tecidos. Quando DO₂ cai, os tecidos aumentam a extração (SvO₂ cai) até esgotar a capacidade — então iniciam metabolismo anaeróbico.

**DC** — Débito Cardíaco. Volume de sangue bombeado pelo coração por minuto. DC = FC × VS (volume sistólico). Reduzido no choque hipovolêmico, cardiogênico e obstrutivo.

**CaO₂** — Conteúdo arterial de oxigênio. CaO₂ = (Hb × 1,34 × SaO₂) + (PaO₂ × 0,0031). Reduzido pela anemia (↓Hb) e hipóxia (↓SaO₂).

**SvO₂** — Saturação venosa mista de oxigênio. Normal: 65-75%. Valores baixos indicam aumento da extração por hipoperfusão. Medida no cateter de Swan-Ganz.

**SRAA** — Sistema Renina-Angiotensina-Aldosterona. Ativado no choque → angiotensina II (vasoconstrição) + aldosterona (retenção de sódio e água) → tentativa de restaurar o volume circulante.

**ADH** — Hormônio Antidiurético (vasopressina). Liberado pela hipófise em resposta à hipovolemia → retenção de água livre pelos túbulos renais.

**Shock Index (SI)** — Índice de Choque. SI = FC/PAS. Normal: 0,5-0,7. SI > 1,0: choque significativo. SI > 1,4: choque grave — ativar protocolo de transfusão maciça.

**ABC Score** — Assessment of Blood Consumption Score. Ferramenta de 4 pontos para ativar o Protocolo de Transfusão Maciça: PA ≤ 90 (1pt) + FC ≥ 120 (1pt) + mecanismo penetrante (1pt) + FAST positivo (1pt). Score ≥ 2: ativar PTM.

**PTM** — Protocolo de Transfusão Maciça. Conjunto de procedimentos para liberação rápida e coordenada de hemoderivados em razão pré-estabelecida (geralmente 1:1:1) em pacientes com hemorragia grave.

**CAT** — Coagulopatia Aguda induzida pelo Trauma. Coagulopatia presente em 25-35% dos politraumatizados na admissão, antes de qualquer reposição. Causada por ativação do sistema anticoagulante endógeno (proteína C) e hiperfibrinólise.

**TEG** — Tromboelastografia. Exame viscoelastométrico que avalia toda a cascata de coagulação em tempo real (resultado em 10-15 minutos). Identifica o componente específico da coagulopatia.

**ROTEM** — Rotational Thromboelastometry. Tromboelastometria rotacional — variante do TEG com a mesma finalidade. Guia reposição específica de hemoderivados no choque hemorrágico.

**PROPPR** — Pragmatic, Randomized Optimal Platelet and Plasma Ratios. Ensaio clínico randomizado (JAMA 2015) que demonstrou redução de mortalidade em 30 dias com razão 1:1:1 de plasma:plaquetas:hemácias vs. 1:1:2.

**PRAGMATIC** — Ensaio clínico publicado no NEJM (2023) que confirmou o benefício da razão 1:1:1 em trauma civil e militar.

**CRASH-2** — Clinical Randomisation of an Antifibrinolytic in Significant Haemorrhage 2. Ensaio clínico (Lancet 2011) com > 20.000 pacientes demonstrando redução de 15% na mortalidade por hemorragia com ATX administrado nas primeiras 3 horas.

**ATX** — Ácido Tranexâmico. Antifibrinolítico. Dose: 1g IV em 10 minutos + 1g em 8 horas. Janela: primeiras 3 horas — após esse período, pode aumentar a mortalidade.

**DCR** — Damage Control Resuscitation. Hipotensão permissiva + reanimação hemostática 1:1:1 + ATX + controle precoce da hemorragia.

**DCS** — Damage Control Surgery. Cirurgia abreviada (< 90 min) → UTI (correção da tríade letal) → cirurgia definitiva.

**REBOA** — Resuscitative Endovascular Balloon Occlusion of the Aorta. Balão na aorta para reduzir hemorragia distal. Zona I: hemorragia abdominal. Zona III: hemorragia pélvica.

**Tríade letal** — Hipotermia + Acidose + Coagulopatia. Ciclo vicioso autoperpetuante. Cada componente piora os outros dois.

**VPP** — Variação da Pressão de Pulso. VPP > 13% em paciente ventilado indica responsividade a fluidos. Medida pelo cateter arterial.

**PVC** — Pressão Venosa Central. Reflecte a pré-carga do VD. PVC baixa: hipovolemia. PVC alta: sobrecarga, tamponamento ou pneumotórax.

**NIRS** — Near-Infrared Spectroscopy. Espectroscopia no infravermelho próximo. Mede saturação tecidual de O₂ (StO₂) no músculo. StO₂ < 75%: hipoperfusão grave.

**BE** — Base Excess. Excesso de base. Normal: -2 a +2 mEq/L. BE < -6: acidose metabólica significativa por hipoperfusão. Marcador de gravidade do choque.

**Norepinefrina** — Vasopressor de primeira linha no choque distributivo (neurogênico, séptico). Agonista α-adrenérgico: vasoconstrição periférica + aumento da resistência vascular sistêmica.

**Idarucizumab** — Anticorpo monoclonal que reverte especificamente o efeito da dabigatrana. Dose: 5g IV. Reversão imediata.

**Andexanet alfa** — Agente de reversão dos inibidores do fator Xa (rivaroxabana, apixabana). Alternativa: complexo protrombínico não ativado de 4 fatores.

**MODS** — Multiple Organ Dysfunction Syndrome. Síndrome de Disfunção de Múltiplos Órgãos. Complicação tardia do choque não revertido adequadamente.

**SIRS** — Systemic Inflammatory Response Syndrome. Síndrome de Resposta Inflamatória Sistêmica. Resposta generalizada à hipoperfusão, isquemia intestinal e translocação bacteriana.

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- Holcomb JB et al. Transfusion of Plasma, Platelets, and Red Blood Cells in a 1:1:1 vs a 1:1:2 Ratio. JAMA, 2015 (PROPPR Trial).
- Rowell SE et al. Effect of Out-of-Hospital Tranexamic Acid vs Placebo on 6-Month Functional Neurologic Outcomes in Patients With Moderate or Severe Traumatic Brain Injury. JAMA, 2020.
- CRASH-2 Collaborators. The importance of early treatment with tranexamic acid in bleeding trauma patients. Lancet, 2011.
- Spahn DR et al. The European guideline on management of major bleeding and coagulopathy following trauma, 5ª edição. Critical Care, 2019.
- Eastern Association for the Surgery of Trauma (EAST). Damage Control Resuscitation Guidelines, 2023.
- Morrison JJ et al. Military Application of Tranexamic Acid in Trauma Emergency Resuscitation (MATTERS) Study. Archives of Surgery, 2012.
- Cannon JW. Hemorrhagic Shock. NEJM, 2018.`,
  },
  {
    id: '1fcbdb18-5aa6-47b8-ab65-792a84b2a3ec',
    title: 'ATLS: Trauma Abdominal',
    description: 'Avaliação e manejo do trauma abdominal — lesões de vísceras sólidas e ocas, indicações cirúrgicas, manejo não operatório e damage control baseados no ATLS 10ª edição e diretrizes da AAST/WSES 2023',
    theme: 'atls_abdominal',
    type: 'article',
    content: `# 1. Introdução e Relevância Clínica
 
O trauma abdominal representa uma das principais causas de morte evitável no politraumatizado — a hemorragia intraabdominal não controlada e a peritonite por lesão de víscera oca são responsáveis por parcela significativa da mortalidade no segundo pico da distribuição trimodal. O abdome é a terceira região mais frequentemente lesada, após cabeça e tórax.
 
O desafio diagnóstico é considerável: o exame físico abdominal tem sensibilidade de apenas 55-65% para lesões intraabdominais significativas no politraumatizado — dor de outras lesões, alteração do nível de consciência, intoxicação e lesão medular comprometem a avaliação. Daí a importância do FAST, da TC e do raciocínio baseado no mecanismo.
 
### O Abdome no xABCDE — ATLS 11ª Edição
 
O ATLS 11ª edição (2025) introduz a sequência **xABCDE**, com o "x" representando o controle imediato de hemorragia exsanguinante externa antes de qualquer outra intervenção. No trauma abdominal, essa mudança tem implicação direta:
 
- **Evisceração com sangramento ativo** ou **ferida penetrante abdominal com hemorragia exsanguinante externa**: abordagem no "x"
- **Hemorragia intraabdominal** (baço, fígado, pelve, grandes vasos): abordada no **"C"** — como fonte de choque hemorrágico interno
- O abdome como fonte de sangramento deve ser identificado e tratado dentro da avaliação circulatória, não postergado para a avaliação secundária
A 11ª edição também consolida o **Damage Control Resuscitation (DCR)** como estratégia padrão no choque hemorrágico: **hipotensão permissiva + cristaloide limitado (máximo 1L) + hemoderivados precoces em razão 1:1:1 + ácido tranexâmico nas primeiras 3 horas**.
 
### Atualização das Diretrizes — AAST/WSES 2023
 
- O **manejo não operatório (MNO)** é o padrão para lesões esplênicas grau I-III e hepáticas grau I-III em pacientes estáveis — taxa de sucesso > 90%
- A **angioembolização** ampliou as indicações do MNO para lesões esplênicas grau IV-V e hepáticas grau IV em pacientes que respondem à ressuscitação
- A **laparoscopia diagnóstica** tem papel crescente no trauma penetrante estável — evita laparotomias negativas em até 50% dos casos
- O **packing pré-peritoneal** é a técnica de escolha para controle hemorrágico pélvico em instabilidade refratária
- A **TC de corpo inteiro com contraste** (whole-body CT) é o padrão diagnóstico no paciente estável — mudou o manejo em até 35% dos casos comparado à avaliação clínica isolada
- O **fibrinogênio** deve ser reposto precocemente quando < 150 mg/dL — crioprecipitado ou concentrado de fibrinogênio
### Anatomia Cirúrgica Relevante
 
**Divisões do abdome:**
 
**Peritônio:**
- Cavidade peritoneal: fígado, baço, estômago, intestino delgado, cólon transverso — líquido livre é detectável pelo FAST
- Retroperitônio: rins, ureteres, pâncreas, duodeno (2ª-4ª porções), grandes vasos (aorta, VCI), cólon ascendente e descendente
- Espaço pélvico: bexiga, reto, vasos ilíacos, órgãos reprodutivos
**Por que o retroperitônio é difícil:**
- Não é acessível ao FAST — líquido retroperitoneal não é detectado
- Hematoma retroperitoneal pode ser maciço sem sinais peritoneais
- TC é obrigatória para avaliação adequada
**Pontos anatômicos críticos:**
- **Hilo hepático**: veia porta, artéria hepática, ducto colédoco — lesão tem mortalidade de 30-50%
- **Hilo esplênico**: artéria e veia esplênica — lesão grau IV-V com extravasamento indica embolização ou esplenectomia
- **Ligamento de Treitz**: junção duodenojejunal — referência para lesões de intestino delgado proximal
- **Fascia de Gerota**: envolve o rim — hematoma contido indica lesão renal grau I-III
- **Espaço de Morrison**: espaço hepatorrenal — ponto mais dependente do peritônio em decúbito dorsal, primeiro a acumular líquido livre
---
 
## 2. Avaliação Primária — Abdome no xABCDE
 
O abdome é avaliado no componente **C (circulação)** da avaliação primária como fonte potencial de hemorragia interna. O FAST é a extensão do exame físico neste momento.
 
### FAST — Avaliação Ultrassonográfica Focada
 
**Protocolo padrão — quatro janelas:**
 
**Janela subxifóidea (pericárdica):**
- Transdutor convexo (3-5 MHz) angulado em direção ao ombro esquerdo
- Avalia: líquido pericárdico — halo anecoico ao redor do coração indica tamponamento
- Realizada primeiro — tamponamento cardíaco mata antes da hemorragia abdominal
**Janela hepatorrenal (Morrison):**
- Linha axilar média direita, entre 9º e 11º espaços intercostais
- Avalia: líquido livre no espaço entre fígado e rim direito — primeiro ponto a acumular em decúbito dorsal
- Achado patológico: faixa anecoica (preta) entre fígado e rim
- Sensibilidade para lesão significativa: 85-95% se houver > 200 mL de líquido livre
**Janela esplenorrenal:**
- Linha axilar posterior esquerda, entre 8º e 10º espaços intercostais
- Avalia: líquido livre entre baço e rim esquerdo
- Tecnicamente mais difícil — interposição de costelas e posição mais posterior do baço
**Janela pélvica (Douglas/Retzius):**
- Transdutor suprapúbico em sagital e transverso
- Avalia: líquido livre no espaço de Douglas e espaço de Retzius
- Ponto mais dependente em decúbito dorsal — acumula pequenos volumes
- Bexiga cheia melhora a janela acústica — não esvazie antes do FAST
**eFAST — janelas pleurais bilaterais (adicionadas):**
- Pneumotórax: ausência de deslizamento pleural (lung sliding)
- Hemotórax: líquido acima do diafragma
- Integrado à avaliação do "B" — deve ser parte do protocolo em todo politraumatizado
**Interpretação clínica — ATLS 11:**
 
| FAST | Estado hemodinâmico | Conduta |
|---|---|---|
| Positivo | Instável (refratário à ressuscitação inicial) | Laparotomia de emergência imediata — não leve à TC |
| Positivo | Estável ou que responde | TC de abdome e pelve com contraste |
| Negativo | Instável sem outra causa | Repita o FAST + considere DPL + exclua outras fontes (tórax, pelve, retroperitônio) |
| Negativo | Estável | TC conforme indicação clínica |
 
**Limitações do FAST — críticas para a prática:**
- Não detecta lesões retroperitoneais (rim, pâncreas, duodeno, grandes vasos)
- Falso negativo em lesões sem hemoperitônio (lacerações contidas, lesões de víscera oca)
- Operador-dependente — sensibilidade de 63-100% dependendo do operador e do volume de líquido
- Obesos e pacientes com enfisema subcutâneo têm qualidade de imagem reduzida
- **FAST negativo não exclui lesão abdominal grave** — especialmente retroperitoneal
### Lavagem Peritoneal Diagnóstica (LPD)
 
Técnica em desuso na maioria dos centros — substituída pelo FAST e TC. Ainda útil quando ambos não estão disponíveis ou em paciente instável com FAST inconclusivo em ambiente de recursos limitados.
 
**Técnica:**
- Incisão infraumbilical (supraumbilical em gestante e fratura pélvica)
- Aspiração direta: > 10 mL de sangue puro = positivo → laparotomia imediata
- Se negativo: infusão de 1L de SF aquecido + aspiração após 5 minutos
- Efluente positivo: hemácias > 100.000/mm³, leucócitos > 500/mm³, bile, fezes ou bactérias
---
 
## 3. Damage Control Resuscitation no Trauma Abdominal — ATLS 11
 
### A Mudança Central da 11ª Edição
 
O ATLS 11 formaliza o **DCR** como estratégia padrão — não mais um protocolo de exceção. A ressuscitação agressiva com cristaloides antes do controle cirúrgico da hemorragia **aumenta mortalidade** ao diluir fatores de coagulação, gerar hipotermia e piorar a coagulopatia da tríade letal (hipotermia + acidose + coagulopatia).
 
**Quatro pilares do DCR no trauma abdominal:**
 
**1. Hipotensão permissiva:**
- Trauma sem TCE: PAS alvo **80-90 mmHg** até o controle cirúrgico da hemorragia
- Trauma com TCE associado: PAS ≥ **100-110 mmHg** — TCE exige pressão de perfusão cerebral adequada
- Estratégia temporária — abandone assim que o controle cirúrgico for obtido
**2. Cristaloide limitado:**
- Máximo **1 litro** de cristaloide isotônico aquecido como ponte
- Se sem resposta ao cristaloide inicial: transfusão imediata — não insista com mais cristaloide
- Cristaloide não substitui hemoderivado; hemoderivado não substitui controle cirúrgico
**3. Hemoderivados precoces — razão 1:1:1:**
- Plasma fresco congelado : plaquetas : concentrado de hemácias = 1:1:1
- **Sangue total de baixo título (LTOWB)**: quando disponível, preferível aos componentes separados
- Ative o protocolo de transfusão maciça (PTM) precocemente — não espere colapso irreversível
- Repor fibrinogênio quando < 150 mg/dL: crioprecipitado ou concentrado de fibrinogênio
**4. Ácido tranexâmico (ATX):**
- Dose: **1g IV em bolus em 10 minutos + 1g IV em infusão ao longo de 8 horas**
- Janela: **primeiras 3 horas do trauma** — após 3 horas, o benefício desaparece
- Em TCE grave associado: **2g IV em bolus** (atualização ATLS 11 — baseada no CRASH-3)
- Indicação: qualquer trauma com hemorragia significativa ou risco de PTM
### Tríade Letal — Reconhecimento e Prevenção
 
| Componente | Definição clínica | Consequência |
|---|---|---|
| Hipotermia | Temperatura < 35°C | Inativa enzimas de coagulação → coagulopatia enzimática |
| Acidose | pH < 7,2 / lactato > 4 mmol/L | Inibe função plaquetária e fatores de coagulação |
| Coagulopatia | INR > 1,5 / fibrinogênio < 150 | Sangramento incontrolável progressivo |
 
A tríade letal é autoperpetuante — cada componente agrava os outros. O DCR e o DCS (Damage Control Surgery) existem para interromper esse ciclo antes que se torne irreversível.
 
---
 
## 4. Trauma Abdominal Contuso
 
### Lesão de Baço
 
**Órgão mais frequentemente lesado no trauma contuso (40-55% das lesões abdominais).**
 
**Mecanismo:**
- Impacto direto no flanco esquerdo ou hipocôndrio esquerdo
- Desaceleração: cisalhamento no hilo esplênico
- Fraturas de costelas inferiores esquerdas (9-12): associadas em 20% dos casos
**Clínica:**
- Dor no hipocôndrio esquerdo e flanco esquerdo
- Sinal de Kehr: dor referida no ombro esquerdo em decúbito dorsal (irritação diafragmática por sangue subfrênico)
- Sinal de Ballance: macicez fixa no flanco esquerdo (coágulo perisplênico) com macicez móvel no flanco direito (sangue livre)
- Instabilidade hemodinâmica em lesões grau IV-V
**Classificação da AAST (graus I-V):**
 
| Grau | Descrição |
|---|---|
| I | Hematoma subcapsular < 10% da superfície; laceração < 1 cm de profundidade |
| II | Hematoma subcapsular 10-50%; laceração 1-3 cm sem envolvimento de vasos trabeculares |
| III | Hematoma subcapsular > 50% ou em expansão; laceração > 3 cm ou vasos trabeculares |
| IV | Laceração de vasos segmentares ou hilares com desvascularização > 25% |
| V | Baço completamente fragmentado; lesão vascular hilar com desvascularização total |
 
**Manejo:**
 
**MNO — indicado em graus I-III (e selecionados grau IV):**
- Paciente hemodinamicamente estável ou que responde à ressuscitação inicial
- TC com contraste: confirma o grau e ausência de extravasamento ativo (blush)
- Internação em UTI por 24-48h com monitorização intensiva
- Hemoglobina seriada a cada 6-8h
- Taxa de sucesso: 95% (grau I-II), 75% (grau III), 50% (grau IV)
**Angioembolização:**
- Blush de contraste na TC (extravasamento ativo), grau III-IV com instabilidade leve, pseudoaneurisma
- Embolização proximal (artéria esplênica principal): reduz pressão de perfusão — preserva o baço
- Embolização distal (ramo específico): controle mais preciso
- Amplia o MNO para graus III-IV — taxa de sucesso sobe para 85-90% (WSES 2023)
**Esplenectomia:**
- Instabilidade hemodinâmica refratária
- Falha do MNO ou da angioembolização
- Grau V com destruição hilar
- Lesões associadas que exigem laparotomia
**Pós-esplenectomia — vacinação obrigatória:**
- Pneumococo (Streptococcus pneumoniae)
- Haemophilus influenzae tipo b
- Meningococo
- Se eletiva: idealmente 2 semanas antes; se emergência: entre o 14º e 28º dia pós-operatório
- Penicilina profilática por 2 anos em adultos (crianças durante toda a infância)
### Lesão Hepática
 
**Segundo órgão mais frequentemente lesado no contuso — primeiro no penetrante.**
 
**Mecanismo:**
- Impacto direto no hipocôndrio direito ou epigástrio
- Desaceleração: cisalhamento no ligamento falciforme e veias hepáticas
- Fraturas de costelas inferiores direitas
**Classificação da AAST (graus I-VI):**
 
| Grau | Descrição |
|---|---|
| I | Hematoma subcapsular < 10%; laceração < 1 cm |
| II | Hematoma subcapsular 10-50%; laceração 1-3 cm, < 10 cm de comprimento |
| III | Hematoma subcapsular > 50% ou em expansão; laceração > 3 cm |
| IV | Laceração envolvendo 25-75% do lobo hepático |
| V | Laceração > 75% do lobo; lesão de veias hepáticas ou cava retrohepática |
| VI | Avulsão hepática |
 
**Manejo:**
 
**MNO — graus I-III (selecionados IV):**
- Paciente estável ou que responde à ressuscitação
- TC com contraste confirma grau e extravasamento
- Taxa de sucesso > 90% em graus I-III
- Complicações do MNO: ressangramento (5-10%), bilioma (5%), pseudoaneurisma (2%), hemobilia (rara)
**Angioembolização:**
- Extravasamento ativo (blush) em paciente estável, grau IV com resposta inicial
- Hemobilia: embolização superseletiva da artéria hepática
- Taxa de sucesso 85-90%
**Laparotomia:**
- Instabilidade refratária, falha do MNO ou embolização, grau V-VI, lesões associadas
### Lesão de Pâncreas
 
**Lesão rara (3-12% dos traumas abdominais) mas de alta morbidade — diagnóstico frequentemente tardio.**
 
**Mecanismo clássico:** compressão axial direta contra o volante ou guidão. Tríade clássica: compressão epigástrica + dor epigástrica irradiada para o dorso + elevação de amilase.
 
**Por que é difícil diagnosticar:**
- Localização retroperitoneal — FAST não detecta
- Amilase normal nas primeiras horas (sensibilidade 48-85%)
- TC inicial pode subestimar — repetir em 12-24h se suspeita clínica mantida
- **Lesão do ducto pancreático principal é a variável prognóstica mais importante**
**Classificação da AAST:**
 
| Grau | Descrição |
|---|---|
| I | Hematoma/laceração menor sem lesão ductal |
| II | Laceração maior sem lesão ductal |
| III | Transecção distal com lesão ductal |
| IV | Transecção proximal (à direita dos vasos mesentéricos) com lesão ductal |
| V | Destruição maciça da cabeça do pâncreas |
 
**Diagnóstico:**
- TC com contraste: sensibilidade 80% para lesão ductal
- CPRM: padrão para avaliação ductal — sensibilidade 95%
- CPRE: diagnóstica e potencialmente terapêutica (stent ductal)
**Manejo:**
- Graus I-II (sem lesão ductal): MNO — jejum, nutrição enteral, octreotide
- Grau III (lesão ductal distal): pancreatectomia distal ± esplenectomia
- Grau IV (lesão ductal proximal): drenagem externa ampla + reconstrução diferida
- Grau V: drenagem, desvascularização + reconstrução diferida
### Lesão de Víscera Oca (Intestino Delgado e Cólon)
 
**Frequentemente subdiagnosticada — causa morte evitável por peritonite.**
 
**Mecanismo:**
- Compressão direta contra a coluna vertebral
- Síndrome do cinto de segurança: compressão do abdome inferior → laceração ou avulsão de intestino e mesentério
- Desaceleração: cisalhamento nas zonas de transição (ligamento de Treitz, válvula ileocecal)
**Sinal do cinto de segurança:** equimose linear no abdome no trajeto do cinto → pesquise fratura de Chance (coluna lombar) + lesão de víscera oca — tríade clássica.
 
**Clínica:**
- Dor abdominal progressiva, sinais peritoneais (podem demorar horas)
- Pneumoperitônio: sinal patognomônico de perfuração — pode estar ausente nas primeiras horas
- FAST frequentemente negativo (sem hemoperitônio significativo)
**Diagnóstico:**
- TC com contraste IV: pneumoperitônio, espessamento de alça, líquido livre sem sangue, extravasamento — sensibilidade 92-95%
- Pneumoperitônio na TC: indicação de laparotomia mesmo sem peritonismo clínico
**Tratamento:**
- Reparo primário: lacerações < 50% da circunferência, sem contaminação maciça, tecido viável
- Ressecção com anastomose primária: lesão > 50%, múltiplas lesões próximas, tecido desvitalizado
- Ressecção sem anastomose + ostomia: contaminação maciça, instabilidade hemodinâmica, lesão extensa
- Colostomia de proteção: lesões colorretais com alto risco de deiscência
---
 
## 5. Trauma Abdominal Penetrante
 
### Princípios Gerais — ATLS 11
 
O ATLS 11 cria um **capítulo exclusivo para Trauma Penetrante**, reconhecendo os desafios únicos deste mecanismo. A abordagem depende do mecanismo, localização e estabilidade hemodinâmica:
 
**Instabilidade hemodinâmica:**
→ Laparotomia exploradora imediata — sem investigação adicional
 
**Estabilidade + sinais de peritonismo:**
→ Laparotomia — TC não é necessária
 
**Estabilidade + sem peritonismo:**
→ Investigação adicional (TC, exploração local, laparoscopia)
 
### Ferimento por Arma de Fogo (PAF)
 
**Laparotomia obrigatória em:**
- Qualquer PAF com trajetória transfixante ou que entre na cavidade abdominal
- Instabilidade hemodinâmica
- Sinais peritoneais
**Exceções selecionadas:**
- PAF tangencial: TC confirma que o projétil não penetrou o peritônio
- PAF de flanco ou dorso: TC trifásica — avaliar retroperitônio
### Ferimento por Arma Branca (FAB)
 
30% não penetram o peritônio; 55% dos que penetram não causam lesão visceral significativa.
 
**Exploração local da ferida:**
- Sob anestesia local: explore o trajeto
- Se não atingiu a fáscia anterior: curativo e alta
- Se atingiu a fáscia: investigação adicional
**Laparoscopia diagnóstica:**
- FAB de parede anterior estável sem peritonismo
- Evita laparotomia em até 50% dos casos (WSES 2023)
- Converte para laparotomia se lesão significativa
**Indicações de laparotomia direta:**
- Evisceração, peritonismo, instabilidade hemodinâmica, sangue no aspirado gástrico ou uretral
---
 
## 6. Lesões Vasculares Abdominais
 
### Hematoma Retroperitoneal — Classificação de Mattox por Zona
 
**Zona I (central):** envolve aorta, VCI, vasos mesentéricos
- Todo hematoma central deve ser explorado — independentemente do mecanismo
- Alta mortalidade por lesão de grande calibre
- REBOA zona I como ponte ao controle cirúrgico em instabilidade extrema
**Zona II (lateral/perirrenal):** envolve rins e vasos renais
- Trauma contuso: MNO se hematoma estável e não pulsátil, TC confirma integridade vascular
- Trauma penetrante: explore todos os hematomas perirrenais
**Zona III (pélvica):** envolve vasos ilíacos
- Trauma contuso: não explore — packing pélvico ou angioembolização
- Trauma penetrante: explore — lesão vascular ilíaca requer reparo
---
 
## 7. Trauma Pélvico e Hemorragia Pélvica
 
### Fratura de Pelve — Classificação de Young-Burgess e Risco Hemorrágico
 
| Tipo | Descrição | Risco Hemorrágico |
|---|---|---|
| LC I | Fratura de ramo púbico + impactação sacral | Baixo |
| LC II | LC I + fratura posterior ipsilateral | Moderado |
| LC III | LC II + lesão contralateral (windswept) | Alto |
| APC I | Diástase da sínfise < 2,5 cm | Baixo |
| APC II | Abertura anterior + ligamentos posteriores parciais ("livro aberto") | Alto |
| APC III | Ruptura completa do anel | Muito alto |
| VS | Deslocamento vertical — ruptura completa | Muito alto |
 
Fontes de sangramento: veias pré-sacrais e plexo venoso pélvico (85%), artérias ilíacas internas (15%).
 
### Manejo da Hemorragia Pélvica — ATLS 11
 
**No xABCDE**: o cinto pélvico é intervenção do "C" — fonte de hemorragia interna.
 
**1. Cinto pélvico imediato:**
- Aplicar nos trocânteres maiores (não nas cristas ilíacas)
- Reduz o volume pélvico → tamponamento das veias pré-sacrais
- Aplicar antes das radiografias se instabilidade pélvica for clinicamente suspeita
**2. DCR:** hipotensão permissiva PAS 80-90 mmHg, ATX, razão 1:1:1
 
**3. Paciente instável refratário:**
 
**Packing pré-peritoneal (PPP):**
- Acesso extraperitoneal: incisão de Pfannenstiel ou mediana infraumbilical
- 3 compressas de cada lado (6 no total) no espaço pré-sacral
- Fechamento temporário → UTI para ressuscitação
- Remoção em 24-48h na segunda cirurgia
- Taxa de controle: 85-90% (WSES 2023)
**Angioembolização:**
- Paciente estável ou que estabiliza após PPP
- Identifica e oclui vasos arteriais sangrantes (ramos da ilíaca interna)
- Complementar ao PPP — não substitui em paciente instável
**REBOA zona III:**
- Balão na aorta infrarrenal: reduz fluxo para a pelve + aumenta pós-carga proximal
- Preserva perfusão visceral (aorta infrarrenal)
- Ponte para PPP ou angioembolização
---
 
## 8. Laparotomia de Emergência — Técnica Aprofundada
 
### 8.1 Indicações
 
**Indicações absolutas — ATLS 11:**
- FAST positivo + instabilidade hemodinâmica refratária à ressuscitação inicial
- Peritonite franca (rigidez de tábua, descompressão dolorosa positiva)
- Pneumoperitônio na TC ou radiografia
- Evisceração de epíplon ou intestino
- PAF transfixante de abdome
- Sangue pela sonda nasogástrica associado a trauma abdominal
- Instabilidade + mecanismo de alto impacto sem outra fonte de sangramento identificada
**Indicações relativas:**
- FAST positivo + estabilidade hemodinâmica (TC primeiro se disponível rapidamente)
- FAB com violação peritoneal confirmada por laparoscopia + lesão visceral
**Contraindicações do atraso:**
- Nunca adie a laparotomia por aguardar exames em paciente instável
- A TC tem papel apenas no paciente estável — instabilidade é indicação de sala de cirurgia imediata
### 8.2 Preparação e Posicionamento
 
**Antes de entrar na sala:**
- Ativar PTM se ainda não ativado — hemoderivados devem estar disponíveis na sala
- Aquecimento ativo: colchão térmico, fluidos aquecidos, temperatura da sala ≥ 26°C
- Dois acessos venosos calibrosos + acesso central se possível
- Sonda vesical: débito urinário como marcador de perfusão
- Monitorização: capnografia, oximetria, pressão arterial invasiva (arterial radial)
- Posição: decúbito dorsal, braços abertos em 90°, campo amplo (do mento até as coxas)
- Preparo do campo: clorexidina alcoólica — área ampla exposta
**Comunicação com a equipe:**
- Cirurgião líder comunica o plano antes da incisão
- Anestesista ciente do estado hemodinâmico e do risco de hipotensão peri-intubação (ATLS 11: ressusite antes de intubar quando possível)
- Enfermagem: instrumentos de DCS prontos (grampeadores, compressas grandes, sutura de contenção)
### 8.3 Acesso Cirúrgico
 
**Laparotomia mediana xifopúbica:**
- Incisão da linha alba do processo xifoide até a sínfise púbica
- Rápida, de ampla exposição, permite extensão para esternotomia ou toracotomia se necessário
- Em DCS: pode ser completada em 2-3 minutos por cirurgião treinado
**Técnica de abertura rápida em emergência:**
- Incisão de pele com bisturi lâmina 22 ou 10 — em um único tempo, do xifoide à sínfise
- Abertura da fáscia: tesoura de Mayo ou bisturi elétrico ao longo da linha alba
- Abertura do peritônio: pinça hemostática eleva a prega peritoneal + tesoura ou bisturi
- Controle do sangramento fascial: eletrocautério — não perca tempo com pontos individuais
**Cuidados na abertura:**
- Identifique e proteja o ligamento redondo e o uraco
- Em fraturas pélvicas: hematoma pré-peritoneal pode estar presente — não o abra (risco de desvascularizar o tamponamento natural)
- Neonatos e crianças: incisão transversa supraumbilical é aceitável
### 8.4 Controle Inicial — Os Primeiros 60 Segundos
 
Ao abrir o abdome, o cirurgião deve executar três ações imediatas e sequenciais antes de qualquer exploração detalhada:
 
**Passo 1 — Identificação e controle da hemorragia:**
- Aspiração do sangue livre com aspirador de alto fluxo
- **Packing de quatro quadrantes**: compressas grandes nos quatro quadrantes abdominais simultaneamente — tamponamento imediato de todas as superfícies sangrantes
  - Quadrante superior direito: em torno do fígado e espaço sub-hepático
  - Quadrante superior esquerdo: em torno do baço e espaço subfrênico esquerdo
  - Quadrante inferior direito e esquerdo: goteiras parietocólicas e pelve
- **Manobra de Pringle**: oclusão do hilo hepático com o polegar e o indicador (ou pinça de Satinsky/Rummel) — reduz imediatamente o sangramento hepático
  - Tolerada até 60 minutos em normotermia
  - Em hipotermia (< 35°C): tempo máximo reduzido — atenção à tríade letal
**Passo 2 — Controle da contaminação:**
- Identifique alças perfuradas ou com conteúdo extravazado
- Grampeamento (GIA linear) ou ligadura com fio grosso (vicryl 0) das alças — **sem anastomose neste momento**
- Objetivo: isolar o conteúdo intestinal sem aumentar o tempo cirúrgico
- Lesão de estômago: grampeamento ou sutura simples em dois planos — rápida
**Passo 3 — Avaliação sistemática:**
- Somente após controle inicial da hemorragia e contaminação: explore metodicamente
- Sequência padronizada: fígado → baço → estômago → duodeno → intestino delgado (ligamento de Treitz até válvula ileocecal) → cólon → reto → retroperitônio → grandes vasos
### 8.5 Técnicas Hemostáticas — Detalhamento
 
**Packing hepático:**
- Compressas acima do fígado (entre fígado e diafragma) e abaixo (entre fígado e cólon)
- Objetivo: compressão da lesão hepática entre o diafragma e o retroperitônio
- Mais eficaz em lacerações de face anterior e inferior — menos eficaz em lesões de veias hepáticas/cava retrohepática
- Em lesões de veias hepáticas: packing + manobra de Pringle + shunt atriocaval se necessário
**Manobra de Pringle — técnica:**
- Posicione o indicador no forame omental (de Winslow) e o polegar anteriormente no hilo
- Comprima vasos portal + artéria hepática entre os dedos
- Alternativa: pinça de Satinsky ou torniquete de Rummel ao redor do hilo
- Tempo: inicie o cronômetro — 60 minutos é o limite em normotermia
**Hepatorrafia:**
- Lacerações superficiais (< 3 cm de profundidade): sutura com fio absorvível (Chromic 0 ou Vicryl 0) em pontos em "U" com agulha curva
- Lacerações profundas: argonioterapia + cola de fibrina + packing → não tente sutura profunda em emergência
**Esplenorrafia vs. esplenectomia:**
- Esplenorrafia (reparo do baço): somente se paciente estável e lesão grau I-II — sutura com Chromic 0 + cola de fibrina + compressa hemostática (Surgicel)
- Esplenectomia: decisão rápida em instabilidade — ligadura dos vasos esplênicos no hilo + dissecção dos ligamentos esplênicos + remoção
**Controle de grandes vasos:**
- Clampamento supracelíaco da aorta: acesso pelo hiato aórtico no diafragma — para hemorragia abdominal exsanguinante sem resposta
- REBOA zona I: alternativa endovascular ao clampamento supracelíaco — menos invasivo, pode ser inserido em APH
- Ligadura vascular temporária: shunts com tubo de Argyle (Javid shunt), tubo de tórax 28F ou cateter de Foley — mantém perfusão distal enquanto o paciente é ressuscitado
**Balão de Fogarty intralesional:**
- Trajeto de PAF profundo em fígado ou hematoma expansivo em estrutura vascular
- Introduza cateter de Fogarty pelo trajeto, insufle o balão, traga o cateter para controlar o sangramento do trajeto por compressão interna
### 8.6 Damage Control Surgery (DCS) Abdominal — Fases
 
O DCS aplica-se quando o paciente tem a tríade letal ou quando a cirurgia extensa prolongada aumentaria a mortalidade.
 
**Critérios para DCS (indicações):**
- Temperatura < 35°C (hipotermia estabelecida)
- pH < 7,2 ou lactato > 4 mmol/L (acidose grave)
- INR > 1,5 ou coagulopatia clínica (sangramento difuso de superfícies)
- Transfusão > 10 unidades de CH em 24h
- Instabilidade hemodinâmica persistente apesar da ressuscitação
- Tempo cirúrgico previsto > 90 minutos para controle definitivo
**Fase 1 — Controle de dano (< 60-90 minutos):**
 
Objetivo: sair da sala com hemorragia controlada e contaminação isolada.
 
Sequência obrigatória:
1. Packing de quatro quadrantes + identificação da fonte principal de sangramento
2. Controle hemostático (packing, Pringle, clampamento, ligadura)
3. Controle de contaminação (grampeamento ou ligadura de alças — sem anastomose)
4. Revisão dos quadrantes — garanta que não há fonte de sangramento esquecida
5. Fechamento temporário
Técnicas de fechamento temporário abdominal:
- **Bolsa de Bogotá**: saco de soro de 3 litros cortado e costurado na pele com sutura contínua de náilon 0 — simples, barato, eficaz
- **Vacupack**: saco plástico fenestrado (campo estéril furado) + compressas por cima + drenos de sucção conectados à aspiração ativa + cobertura com curativo adesivo — mantém o abdome úmido e monitora o débito
- **Sistema ABThera (VAC abdominal comercial)**: esponja intraperitoneal fenestrada + pressão negativa contínua (-125 mmHg) — padrão atual nos centros de trauma de alto volume; reduz edema visceral, facilita o fechamento definitivo e permite monitoramento do débito peritoneal
**Fase 2 — UTI (24-72 horas):**
- Reaquecimento ativo: meta temperatura > 36°C
- Correção da coagulopatia: PFC, crioprecipitado (fibrinogênio), plaquetas, vitamina K se necessário
- Ressuscitação hemodinâmica: vasopressores se necessário, débito urinário > 0,5 mL/kg/h
- Monitorização da pressão intraabdominal: previna síndrome compartimental abdominal
- Nutrição enteral precoce (dentro de 24-48h se possível)
- Remoção progressiva de edema: balanço hídrico negativo quando hemodinâmica estiver estável
**Critérios para retornar à sala (Fase 3):**
- Temperatura > 36°C
- pH > 7,3, lactato < 2 mmol/L
- Coagulopatia corrigida (INR < 1,5, plaquetas > 50.000)
- Hemodinamicamente estável sem vasopressores em doses elevadas
**Fase 3 — Cirurgia definitiva (48-72h após fase 1):**
- Remoção do sistema de fechamento temporário e do packing
- Inspeção completa de todas as lesões
- Reconstrução intestinal: anastomoses, fechamento de ostomias temporárias quando indicado
- Reparo vascular definitivo: anastomoses, próteses
- Fechamento abdominal definitivo: fáscia com sutura contínua de PDS 1 (loop) — fechamento em massa
- Se fechamento primário impossível (síndrome compartimental iminente): tela biológica de ponte ou tela de polipropileno com fechamento diferido
### 8.7 Exploração Sistemática do Abdome — Protocolo Passo a Passo
 
Após controle inicial da hemorragia e contaminação, explore metodicamente antes do fechamento:
 
**Fígado:**
- Inspeção de todas as faces: superior, inferior, posterior (manobra de Kocher para visualizar face posterior)
- Vesícula biliar e vias biliares: bile no campo = lesão de via biliar
- Hilo hepático: tríade portal (veia porta, artéria hepática, colédoco)
**Baço:**
- Mobilize o baço medialmente: seção do ligamento esplenorrenal e esplenofrênico
- Avalie o hilo: lesão vascular de hilo = esplenectomia
**Estômago:**
- Face anterior: inspeção direta
- Face posterior: abra o epíplon gastrocolônico → acesso à retrocavidade dos epíplons → face posterior do estômago + corpo e cauda do pâncreas
**Duodeno:**
- Manobra de Kocher: mobilize o duodeno medialmente por incisão do peritônio parietal lateral ao duodeno
- Avalie todas as quatro porções + cabeça do pâncreas
- Bile ou ar retroperitoneal na TC = suspeita de lesão duodenal
**Intestino delgado:**
- Do ligamento de Treitz até a válvula ileocecal: percorra alça por alça, examinando as duas faces e o mesentério
- Hematoma de mesentério: explore — pode ocultar lesão vascular ou intestinal
**Cólon:**
- Cólon direito: mobilização colônica direita (reflexão hepatocólica)
- Cólon transverso: tração caudal + inspeção do mesocólon transverso
- Cólon esquerdo: mobilização colônica esquerda (reflexão esplenocolônica)
- Reto: palpação + inspeção até o reflexo peritoneal
**Retroperitônio:**
- Hematoma zona I (central): explore sempre
- Hematoma zona II (perirrenal): explorar em penetrante; MNO em contuso estável
- Hematoma zona III (pélvico): não explore em contuso — desfaz o tamponamento natural
**Diafragma:**
- Inspeção de toda a superfície diafragmática: lacerações passam despercebidas
- Sutura com fio não absorvível (Prolene 0) se laceração identificada
### 8.8 Situações Especiais na Laparotomia
 
**Laparotomia em gestante:**
- Útero gravídico desvia o intestino para cima — protege parcialmente vísceras superiores
- Acesso pode ser dificultado no 3º trimestre
- Mantenha a paciente em decúbito lateral esquerdo leve (15°) durante a cirurgia — reduz compressão da VCI pelo útero
- Avalie viabilidade fetal: monitorização intraoperatória se > 24 semanas
- Descolamento de placenta: pode ocorrer até 48h após o trauma — monitorização fetal pós-operatória obrigatória
**Laparotomia em criança:**
- Incisão transversa supraumbilical: aceitável em crianças < 5 anos — menor risco de hérnia
- MNO tem taxas de sucesso superiores ao adulto (> 95%) — evite cirurgia se estabilidade permitir
- Vísceras proporcionalmente maiores e menos protegidas: baço e fígado têm maior risco de lesão
**Laparotomia em anticoagulado:**
- Reverter anticoagulação antes da cirurgia quando possível
- Varfarina: vitamina K 10 mg IV + PFC ou CCP (concentrado de complexo protrombínico) — PCC é mais rápido
- DOACs: antídotos específicos (idarucizumabe para dabigatrana; andexanet alfa para rivaroxabana/apixabana) se disponíveis
- Heparina: protamina 1 mg para cada 100 UI de heparina não fracionada administrada nas últimas 2-3h
**Toracolaparotomia:**
- Extensão da laparotomia para o tórax quando necessário
- Indicação: lesão de diafragma com componente torácico, lesão de esôfago distal, controle de aorta torácica descendente
- Técnica: extensão da incisão para o 7º ou 8º espaço intercostal esquerdo
### 8.9 Indicadores de Qualidade da Laparotomia de Emergência
 
| Indicador | Meta |
|---|---|
| Tempo porta-incisão em instável | < 15 minutos |
| Tempo de fase 1 de DCS | < 60-90 minutos |
| Temperatura na sala | < 36°C justifica cancelar reconstrução |
| Packing adequado | Sangramento controlado antes do fechamento temporário |
| Contagem de compressas | Obrigatória antes de cada fechamento — evita corpo estranho retido |
| Retorno para fase 3 | Somente com tríade corrigida (temp > 36°C, pH > 7,3, INR < 1,5) |
 
---
 
## 9. Síndrome Compartimental Abdominal
 
**Definição:** pressão intraabdominal (PIA) > 20 mmHg com nova disfunção de órgão.
 
**Diagnóstico — medida da PIA via sonda vesical:**
- Injete 25 mL de SF → meça com manômetro após 1 minuto no final da expiração
- PIA 12-15 mmHg: hipertensão intraabdominal grau I
- PIA 16-20 mmHg: grau II
- PIA 21-25 mmHg: grau III
- PIA > 25 mmHg: grau IV
**Consequências:**
 
| Sistema | Efeito da PIA elevada |
|---|---|
| Cardiovascular | Compressão da VCI + aumento de pós-carga do VD → redução do DC |
| Renal | Compressão das veias renais + redução do fluxo → IRA oligúrica |
| Respiratório | Elevação do diafragma + redução da complacência → hipoxemia |
| Intestinal | Isquemia mesentérica → translocação bacteriana → sepse |
 
**Tratamento:**
- PIA 12-20 mmHg + disfunção incipiente: medidas não cirúrgicas (descompressão gástrica, posicionamento neutro, analgesia e sedação, relaxantes musculares, restrição hídrica)
- PIA > 20 mmHg + nova disfunção de órgão: **laparotomia descompressiva** — abdome aberto com fechamento temporário (ABThera ou Vacupack)
---
 
## 10. Situações Especiais
 
### Gestante
 
- Descolamento prematuro de placenta: trauma contuso → apresentação em até 48h — monitorização fetal por 4-24h após qualquer trauma significativo em > 20 semanas
- FAST menos sensível em gestante — útero ocupa espaço pélvico
- TC: realize quando indicado — risco da radiação é menor que o risco de lesão não diagnosticada
### Crianças
 
- MNO taxa de sucesso > 95% em lesões esplênicas e hepáticas — mais conservador que em adultos
- Lesão de víscera oca por cinto sem cadeirinha: mais frequente em crianças
### Trauma de Retroperitônio
 
- Lesão de duodeno: hematoma intramural (conservador) vs. perfuração (cirúrgico)
- Cólon retroperitoneal: ar retroperitoneal na TC indica perfuração
---
 
## 11. Pontos-Chave — ATLS 11ª Edição
 
- **xABCDE**: evisceração com sangramento ativo é "x"; hemorragia intraabdominal é "C" — integre o raciocínio desde o primeiro momento
- **DCR obrigatório**: cristaloide máximo 1L, hemoderivados precoces 1:1:1, hipotensão permissiva PAS 80-90 mmHg (sem TCE), ATX nas primeiras 3 horas
- **ATX 2g no TCE grave** — atualização do ATLS 11 baseada no CRASH-3
- **FAST positivo + instabilidade**: laparotomia imediata — não leve para TC
- **FAST negativo não exclui lesão retroperitoneal** — pâncreas, rins, duodeno e grandes vasos não são detectados
- **Packing de quatro quadrantes** nos primeiros 60 segundos da laparotomia — controle imediato antes da exploração
- **DCS quando tríade letal presente**: packing + controle de contaminação (< 90 min) → UTI (24-72h) → cirurgia definitiva
- **Fase 3 apenas com tríade corrigida**: temperatura > 36°C + pH > 7,3 + INR < 1,5
- **MNO**: padrão para lesões esplênicas I-III e hepáticas I-III — taxa de sucesso > 90%
- **Angioembolização** amplia o MNO para lesões grau IV — evita esplenectomia em selecionados
- **Lesão de víscera oca**: FAST frequentemente negativo — peritonismo progressivo é o sinal mais confiável
- **Sinal do cinto de segurança**: pesquise fratura de Chance + lesão de víscera oca
- **Packing pré-peritoneal**: padrão em hemorragia pélvica refratária — taxa de controle 85-90%
- **SCA**: PIA > 20 mmHg + disfunção de órgão → laparotomia descompressiva imediata
- **Pós-esplenectomia**: vacine antes da alta — pneumococo, Haemophilus, meningococo
---
 
## Glossário
 
**xABCDE** — sequência do ATLS 11ª edição: x (controle de hemorragia exsanguinante externa), A (via aérea), B (ventilação), C (circulação), D (neurológico), E (exposição).
 
**DCR** — Damage Control Resuscitation. Hipotensão permissiva + cristaloide limitado (máx 1L) + hemoderivados 1:1:1 + ATX nas primeiras 3h.
 
**DCS** — Damage Control Surgery. Fase 1: packing + controle de contaminação (< 90 min). Fase 2: UTI (24-72h). Fase 3: cirurgia definitiva após correção da tríade letal.
 
**FAST/eFAST** — Focused Assessment with Sonography in Trauma / Extended FAST (adiciona avaliação pleural bilateral).
 
**MNO** — Manejo Não Operatório. Padrão para lesões esplênicas I-III e hepáticas I-III em estáveis. Taxa de sucesso > 90%.
 
**Manobra de Pringle** — Oclusão do hilo hepático (veia porta + artéria hepática). Tolerada até 60 min em normotermia.
 
**PPP** — Packing Pré-Peritoneal. Controle hemorrágico pélvico extraperitoneal. Taxa de controle 85-90%.
 
**REBOA** — Resuscitative Endovascular Balloon Occlusion of the Aorta. Zona I: hemorragia abdominal. Zona III: hemorragia pélvica (preserva perfusão visceral).
 
**Tríade Letal** — Hipotermia + Acidose + Coagulopatia. Autoperpetuante. O DCS existe para interrompê-la.
 
**ATX** — Ácido Tranexâmico. 1g IV em 10 min + 1g em 8h. 2g em TCE grave. Janela: < 3h do trauma.
 
**LTOWB** — Low-Titer Whole Blood. Sangue total de baixo título. Preferível aos componentes separados quando disponível.
 
**PIA** — Pressão Intraabdominal. Medida via sonda vesical. PIA > 20 mmHg + disfunção de órgão = SCA.
 
**SCA** — Síndrome Compartimental Abdominal. → Laparotomia descompressiva.
 
**ABThera** — Sistema comercial de fechamento abdominal temporário a vácuo. Pressão negativa -125 mmHg. Padrão atual em DCS.
 
**Young-Burgess** — Classificação das fraturas pélvicas por mecanismo. APC III e VS: maior risco hemorrágico.
 
**Mattox** — Classificação dos hematomas retroperitoneais. Zona I (central): explore sempre. Zona III (pélvica): não explore em contuso.
 
**Sinal de Kehr** — Dor referida no ombro esquerdo por irritação diafragmática. Sugestivo de lesão esplênica.
 
**Fratura de Chance** — Fratura de coluna lombar em flexão-distração. Associada ao cinto sem diagonal. Frequentemente acompanha lesão de víscera oca.
 
---
 
## Referências
 
- American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support, 11ª edição. Chicago: ACS, 2025.
- Schauer SG et al. Advanced trauma life support 2025: A brief review of updates. Injury. 2026 Feb; 57(4):113079.
- American Association for the Surgery of Trauma (AAST). Organ Injury Scaling, 2018 update.
- World Society of Emergency Surgery (WSES). Guidelines for Trauma, 2023.
- Roberts I et al. The CRASH-2 trial. The Lancet, 2010; 376(9734):23-32.
- CRASH-3 Trial Collaborators. Effects of tranexamic acid on death, disability, vascular occlusive events in TBI. The Lancet, 2019; 394(10210):1713-1723.
- Coccolini F et al. Splenic trauma: WSES classification and guidelines. World Journal of Emergency Surgery, 2017.
- Stassen NA et al. Nonoperative management of blunt hepatic and splenic injuries. Journal of Trauma, 2012.
- Burlew CC et al. Preperitoneal pelvic packing for hemodynamically unstable pelvic fractures. Journal of Trauma, 2022.
- Biffl WL et al. Management of patients with anterior abdominal stab wounds. Journal of Trauma, 2019.
- Holcomb JB et al. Transfusion of Plasma, Platelets, and Red Blood Cells in a 1:1:1 vs 1:1:2 Ratio — PROPPR Trial. JAMA, 2015; 313(5):471-482.
- Kirkpatrick AW et al. Intra-abdominal hypertension and abdominal compartment syndrome: updated consensus definitions. Intensive Care Medicine, 2013.
- Rotondo MF et al. 'Damage control': an approach for improved survival in exsanguinating penetrating abdominal injury. Journal of Trauma, 1993.`,
  },
  {
    id: '93e0be7d-d523-49ee-8fd7-bc191a7e6e0e',
    title: 'ATLS: Trauma Genitourinário',
    description: 'Avaliação e manejo do trauma renal, ureteral, vesical, uretral e genital — classificação de lesões, indicações cirúrgicas e manejo não operatório baseados no ATLS 10ª edição e diretrizes da EAU/AAST 2023',
    theme: 'atls_genitourinario',
    type: 'article',
    content: `## 1. Introdução e Relevância Clínica

O trauma genitourinário ocorre em 10-15% dos traumas abdominais e pélvicos. Raramente é a lesão mais letal — mas lesões não diagnosticadas ou manejadas inadequadamente causam morbidade significativa: insuficiência renal, fístulas urinárias, estenoses uretrais, disfunção erétil e infertilidade.

O princípio fundamental é: **estabilize o paciente antes de investigar o trato urinário**. A hematúria é o marcador mais comum de lesão genitourinária, mas sua ausência não exclui lesão significativa — 25-40% das lesões renais graves e até 10% das lesões de ureter não cursam com hematúria macroscópica.

### Atualização das Diretrizes — EAU/AAST 2023

- O **MNO** é o padrão para lesões renais grau I-III e selecionadas grau IV em pacientes estáveis
- A **angioembolização renal** ampliou as indicações do MNO para lesões grau IV com extravasamento arterial
- A **TC com contraste trifásica** (arterial, portal e excretora) é o padrão diagnóstico para trauma renal — identifica lesão parenquimatosa, vascular e do sistema coletor
- O **reparo primário uretral** precoce é preferido em lesões parciais — derivação urinária suprapúbica para lesões completas com reconstrução diferida
- A **uretrocistografia retrógrada** permanece o padrão para avaliação de lesão uretral antes da cateterização vesical

### Anatomia Relevante

**Rins:**
- Localização retroperitoneal, protegidos pela musculatura paravertebral, costelas inferiores e fascia de Gerota
- Fascia de Gerota: contém hematomas perirrenais — hematoma contido pela fascia indica lesão grau I-III sem extravasamento ativo
- Pedículo vascular: artéria e veia renal — artéria renal é terminal, sem colaterais eficientes → avulsão causa infarto renal completo
- Ureteropélvica (UPJ): junção ureter-pelve renal — ponto de fixação vulnerável a lesões por desaceleração

**Ureteres:**
- Estruturas retroperitoneais, calibre fino (3-4 mm), percurso longo (25-30 cm)
- Três pontos de estreitamento fisiológico: UPJ, cruzamento com vasos ilíacos, entrada na bexiga
- Lesão quase sempre por trauma penetrante ou iatrogênica — trauma contuso é raro
- Suprimento vascular segmentar: desvascularização em mais de 2 cm causa necrose

**Bexiga:**
- Órgão pélvico, protegido pelo anel pélvico quando vazia
- Cheia: sobe para o abdome inferior, mais vulnerável ao trauma contuso
- Duas camadas: mucosa (urotélio) + muscular (detrusor)
- Peritônio reveste a cúpula — perfurações na cúpula são intraperitoneais; na base e paredes laterais são extraperitoneais

**Uretra:**
- **Masculina** (20 cm): posterior (prostática + membranosa) e anterior (bulbar + peniana)
- Uretra membranosa: atravessa o diafragma urogenital — fixada ao púbis pelo ligamento puboprostático — ponto mais vulnerável em fraturas pélvicas
- **Feminina** (4 cm): muito menos vulnerável — lesão rara, quase sempre associada a fratura pélvica grave

## 2. Hematúria — Avaliação e Significado Clínico

### Definição e Classificação

- **Hematúria macroscópica**: urina visivelmente avermelhada ou cor de coca-cola
- **Hematúria microscópica**: > 5 hemácias por campo de grande aumento (HGA) na urinálise

### Quando Investigar

**Hematúria macroscópica:**
- Sempre investigar — indica lesão significativa do trato urinário em qualquer localização

**Hematúria microscópica:**
- Investigar quando associada a: choque (PAS < 90 mmHg), trauma de alta energia, mecanismo de desaceleração brusca, trauma penetrante de flanco/abdome/pelve
- Hematúria microscópica isolada sem choque em trauma contuso: pode ser observada sem investigação de imagem imediata em pacientes estáveis — baixo valor preditivo para lesão significativa

**Ausência de hematúria NÃO exclui:**
- Lesão de ureter (25-40% sem hematúria)
- Lesão de pedículo renal (avulsão vascular)
- Lesão de víscera adjacente

### Urinálise

- Urina I com sedimento: quantificação de hemácias
- Deve ser coletada por micção espontânea ou cateterismo — não por punção suprapúbica na avaliação inicial de trauma
- Dipstick positivo para sangue com sedimento negativo: mioglobinúria (rabdomiólise) — urobilinogênio positivo diferencia

## 3. Trauma Renal

### Epidemiologia e Mecanismo

- Órgão genitourinário mais frequentemente lesado: 1-5% de todos os traumas
- Trauma contuso: 80-85% (colisão veicular, queda, trauma esportivo)
- Trauma penetrante: 15-20% (PAF, FAB)
- Fatores de risco para lesão: rins em ferradura, rim hidronefrótico, rim único, tumor renal pré-existente — lesões graves em mecanismos de baixa energia

### Classificação da AAST (Graus I-V)

| Grau | Descrição | Prevalência |
|---|---|---|
| I | Contusão renal (hematúria com exames normais) ou hematoma subcapsular não expansivo sem laceração | 75% |
| II | Hematoma perirrenal contido pela fascia de Gerota; laceração < 1 cm sem extravasamento urinário | 10% |
| III | Laceração > 1 cm sem extravasamento urinário ou lesão do sistema coletor | 5% |
| IV | Laceração através do córtex, medula e sistema coletor (extravasamento urinário); lesão de artéria ou veia segmentar com hematoma contido | 8% |
| V | Rim completamente fragmentado; avulsão do pedículo vascular com desvascularização do rim | 2% |

### Diagnóstico

**TC com contraste trifásica — padrão atual:**
- **Fase arterial** (25-30s): avalia lesão vascular, extravasamento arterial (blush), infarto renal
- **Fase portal/venosa** (60-70s): avalia parênquima, lacerações, hematomas
- **Fase excretora** (10-15 min): avalia sistema coletor — extravasamento de contraste indica lesão de pelve renal ou ureter proximal

**Achados específicos:**
- Blush de contraste: extravasamento arterial ativo → angioembolização
- Não realce de todo o rim: infarto renal total → lesão de pedículo
- Extravasamento tardio de contraste: lesão do sistema coletor
- Hematoma perirrenal: avalia extensão e presença de contenção pela fascia de Gerota

**Urografia excretora (UIV):**
- Em desuso na maioria dos centros — substituída pela TC
- One-shot IVP: radiografia 10 minutos após contraste IV — útil no intraoperatório para confirmar rim contralateral funcionante antes de nefrectomia

### Manejo

**Graus I-III — MNO:**
- Paciente hemodinamicamente estável
- Repouso relativo, hidratação, analgesia
- Monitorização da hematúria — resolução espontânea em 2-4 semanas
- Repetir TC em 48-72h se grau III ou suspeita de progressão
- Taxa de sucesso > 98% em graus I-II, 95% em grau III

**Grau IV — MNO selecionado:**
- Paciente estável: TC confirma extravasamento urinário + avalia lesão vascular
- Extravasamento urinário sem lesão vascular: observação — 80% resolvem espontaneamente; nefrostomia percutânea ou stent ureteral se persistir
- Extravasamento arterial (blush): angioembolização superseletiva — taxa de sucesso 85-90%
- Falha do MNO ou instabilidade: exploração cirúrgica

**Grau V — Cirurgia:**
- Lesão de pedículo (avulsão vascular): nefrectomia ou reparo vascular (janela terapêutica < 4-6h para revascularização funcional)
- Rim completamente fragmentado: nefrectomia
- Confirme rim contralateral funcionante antes da nefrectomia (one-shot IVP intraoperatória)

**Indicações absolutas de exploração cirúrgica:**
- Instabilidade hemodinâmica por hemorragia retroperitoneal renal refratária
- Hematoma retroperitoneal pulsátil ou expansivo na laparotomia
- Falha da angioembolização
- Lesão de pedículo com rim viável e < 6h de isquemia quente

**Técnica cirúrgica:**
- Controle vascular antes de abrir a fascia de Gerota — reduz nefrectomia desnecessária
- Acesso ao pedículo renal pela raiz do mesentério antes de abordar o hematoma
- Nefrectomia: quando reparo impossível ou tempo cirúrgico proibitivo (damage control)
- Nefrorrafia: sutura do parênquima + hemostasia com agentes tópicos (Floseal, Surgicel)

### Complicações do Trauma Renal

**Precoces (< 4 semanas):**
- Ressangramento: 13% no MNO — angioembolização ou cirurgia
- Urinoma: coleção de urina extravasada — drenagem percutânea + stent ureteral
- Abscesso perirrenal: drenagem percutânea + antibioticoterapia
- Hipertensão renovascular: isquemia segmentar → ativação do SRAA

**Tardias:**
- Fístula arteriovenosa: hematúria tardia, sopro — embolização
- Pseudoaneurisma: hematúria tardia — embolização
- Hidronefrose: estenose da UPJ por fibrose — correção cirúrgica diferida

## 4. Trauma de Ureter

### Epidemiologia

- Lesão rara: < 1% dos traumas urológicos
- Trauma penetrante: causa mais comum (PAF — 75% dos casos)
- Trauma contuso: raro — desaceleração brusca causa avulsão na UPJ
- Iatrogênico: cirurgia ginecológica, colorretal, urológica — causa mais frequente globalmente

### Diagnóstico

**Suspeite em:**
- PAF de abdome com trajeto próximo ao ureter
- Trauma de alta energia com hematúria microscópica
- Avulsão da UPJ: trauma de desaceleração + hematúria + cólica renal

**TC com fase excretora:**
- Extravasamento de contraste no trajeto ureteral
- Ausência de opacificação do ureter distal à lesão
- Urinoma retroperitoneal

**Ureteropielectografia retrógrada:**
- Cateterismo retrógrado com injeção de contraste — define localização e extensão exata da lesão
- Indicado quando TC é inconclusiva

**Urografia excretora (UIV):**
- Extravasamento de contraste no trajeto ureteral
- Dilatação proximal à obstrução

### Classificação da AAST

| Grau | Descrição |
|---|---|
| I | Contusão ou hematoma sem desvascularização |
| II | Laceração < 50% da circunferência |
| III | Laceração ≥ 50% da circunferência |
| IV | Transecção completa com < 2 cm de desvascularização |
| V | Transecção com > 2 cm de desvascularização |

### Manejo

**Grau I-II identificado precocemente:**
- Stent ureteral duplo J por via endoscópica — derivação interna
- Taxa de sucesso: 80-90%

**Grau III-V ou diagnóstico tardio:**
- Reparo cirúrgico aberto

**Técnicas de reparo conforme localização:**

**Terço proximal e médio:**
- Ureteroureterostomia (anastomose término-terminal): lesões < 2 cm de perda
- Ureterocalicostomia: lesões proximais com perda extensa
- Auto-transplante renal: casos extremos com ureter longo destruído

**Terço distal (< 5 cm da bexiga):**
- Ureteroneocistostomia: reimplante do ureter na bexiga — técnica de escolha
- Flap de Boari: retalho vesical para alcançar ureter mais proximal
- Hitch vesical (psoas hitch): tracionar a bexiga até o ureter — aumenta o alcance em 3-4 cm

**Damage control:**
- Ligadura do ureter + nefrostomia percutânea: em paciente instável — reconstrução diferida
- Derivação com tubo de nefrostomia: preserva o rim enquanto o paciente é estabilizado

## 5. Trauma Vesical

### Epidemiologia e Mecanismo

- Associado a fratura pélvica em 70-90% dos casos
- Bexiga cheia: mais vulnerável a trauma contuso (sobe para o abdome)
- Hematúria macroscópica: presente em > 95% — marcador mais sensível

### Classificação — Tipo de Ruptura

**Ruptura extraperitoneal (RE) — 55-60%:**
- Fratura de pelve → fragmento ósseo perfura a bexiga (mecanismo direto)
- Ou compressão da pelve → aumento súbito da pressão intravesical
- O extravasamento de urina fica contido na pelve
- Clínica: dificuldade miccional, hematúria macroscópica, dor pélvica
- Cistografia: extravasamento de contraste em "chama de vela" ao redor da base da bexiga

**Ruptura intraperitoneal (RI) — 40-45%:**
- Trauma direto sobre bexiga cheia → ruptura da cúpula (coberta por peritônio)
- Urina extravasada para a cavidade peritoneal → peritonite química/bacteriana progressiva
- Frequentemente trauma contuso de abdome inferior
- Clínica: dor abdominal, distensão, ascite, íleo paralítico, azotemia (reabsorção de ureia pelo peritônio)
- Cistografia: contraste no espaço peritônio + contorno das alças intestinais

**Ruptura combinada (RE + RI) — 5%:**
- Trauma de alta energia
- Tratamento cirúrgico obrigatório

### Diagnóstico

**Cistografia com contraste ou Cisto-TC:**
- Padrão diagnóstico — sensibilidade e especificidade > 95%
- Técnica: encha a bexiga com 300-400 mL de contraste diluído pelo cateter vesical — radiografia AP + oblíqua ou TC pélvica
- **Nunca faça cistografia antes de excluir lesão uretral** — uretrografia retrógrada primeiro em suspeita de lesão uretral

**Cisto-TC:**
- Preferível à cistografia convencional — avalia simultaneamente outras lesões pélvicas
- Mesma técnica: enchimento retrógrado com contraste + TC pélvica

### Manejo

**Ruptura extraperitoneal:**
- Cateterismo vesical contínuo por 10-14 dias — resolução espontânea em > 85%
- Cateter de Foley 18-20F: drenagem adequada é essencial
- Cistografia de controle antes da retirada do cateter
- Reparo cirúrgico nas RE: fratura pélvica que exige fixação interna (cirurgião tem acesso à bexiga), fragmento ósseo intravesical, lesão de colo vesical, lesão retal associada

**Ruptura intraperitoneal:**
- Reparo cirúrgico obrigatório: sutura em dupla camada (mucosa + muscular) + cateter de Foley por 10-14 dias
- Laparotomia: explore a bexiga por dentro — identifique todos os orifícios (podem ser múltiplos)

## 6. Trauma Uretral

### Epidemiologia e Classificação Anatômica

**Uretra posterior (masculina):**
- Prostática e membranosa — atravessa o diafragma urogenital
- Lesão quase sempre associada a fratura pélvica (5-10% das fraturas pélvicas)
- Mecanismo: ruptura do ligamento puboprostático → avulsão da uretra membranosa
- Mais grave — maior taxa de complicações (estenose, impotência, incontinência)

**Uretra anterior (masculina):**
- Bulbar e peniana — externamente ao diafragma urogenital
- Lesão por trauma direto no períneo (queda a cavaleiro, trauma esportivo)
- "Straddle injury": queda sobre superfície rígida com trauma perineal direto

**Uretra feminina:**
- Rara — 4 cm, mais protegida
- Associada a fratura pélvica grave com diástase de sínfise

### Diagnóstico

**Sinais clínicos de lesão uretral:**
- Sangue no meato uretral: sinal mais específico — **não cateterize sem uretrografia**
- Hematoma perineal ou escrotal em borboleta
- Próstata alta ao toque retal (bexiga e próstata deslocadas superiormente pela ruptura uretral)
- Impossibilidade de micção
- Hematoma suprapúbico

**Uretrografia retrógrada (UGR):**
- Padrão diagnóstico obrigatório antes de qualquer cateterização em suspeita de lesão uretral
- Técnica: introduza a ponta do cateter de Foley no meato uretral sem avançar + injeção de 20-30 mL de contraste hidrossolúvel + radiografia oblíqua
- Extravasamento de contraste: confirma lesão e localiza o nível

**Nunca tente cateterizar uma uretra potencialmente lesada — risco de:**
- Completar uma ruptura parcial → ruptura completa
- Criar falso trajeto
- Introduzir infecção em hematoma estéril

### Classificação da AAST

| Grau | Descrição |
|---|---|
| I | Contusão: sangue no meato, uretrografia normal |
| II | Estiramento sem extravasamento: uretra alongada, sem ruptura |
| III | Laceração parcial: extravasamento distal ao diafragma urogenital |
| IV | Laceração completa: extravasamento distal, < 2 cm de separação |
| V | Laceração completa: > 2 cm de separação, extensão à próstata ou vagina |

### Manejo

**Lesão parcial (grau III):**
- Cateterismo uretral delicado por urologista experiente sob visão fluoroscópica ou endoscópica
- Se bem sucedido: cateter por 2-3 semanas + uretrografia de controle
- Se falha: cistostomia suprapúbica + reparo diferido

**Lesão completa (graus IV-V):**
- **Cistostomia suprapúbica**: derivação urinária imediata — técnica rápida e segura
  - Punção percutânea: trocar 16-18F suprapúbico com bexiga palpável ou guia ultrassonográfico
  - Incisão aberta: quando bexiga não é palpável
- **Reparo primário imediato**: alinhamento endoscópico ou cirúrgico sobre cateter tutor — preferido por muitos centros modernos (EAU 2023) para lesões por fratura pélvica
  - Vantagem: menor taxa de estenose severa (25% vs. 50% com cistostomia e reparo tardio)
  - Realizado em centro especializado por urologista experiente
- **Reconstrução uretral diferida**: 3-6 meses após o trauma — uretroplastia com enxerto de mucosa oral (padrão atual)

**Complicações:**
- Estenose uretral: complicação mais comum (até 50% das lesões completas) — dilatação ou uretroplastia
- Impotência: lesão de nervos eréteis (cavernosos) — 30-40% das lesões posteriores graves
- Incontinência urinária: lesão do esfíncter externo — 5-10%

## 7. Trauma Genital

### Trauma Escrotal e Testicular

**Mecanismo:** trauma direto (esporte, agressão, acidente)

**Hematocele:** coleção de sangue na túnica vaginal
- Pequena (< 5 cm): ultrassonografia escrotal para avaliação
- Grande ou associada a ruptura testicular: exploração cirúrgica

**Ruptura testicular:**
- Ultrassonografia: heterogeneidade do parênquima + contorno irregular da albugínea + hematocele
- Tratamento: exploração cirúrgica imediata — orquiorrafia (sutura da albugínea) + drenagem do hematoma
- Taxa de salvamento testicular: > 90% se operado em < 72h; cai para 45% após 72h
- Orquiectomia: testículo completamente desvascularizado ou destruído

**Avulsão escrotal:**
- Trauma por maquinário, acidentes com rolamento de membros inferiores
- Orchis expostos: cubra com gaze úmida imediatamente
- Reconstrução com retalho ou enxerto de pele — geralmente boa viabilidade testicular

### Trauma Peniano

**Fratura do pênis:**
- Ruptura da túnica albugínea durante ereção — "estalido" + dor + deflexão
- Não é trauma de emergência típico do ATLS — mas pode ser visto
- Tratamento: reparo cirúrgico imediato — sutura da albugínea
- Exploração uretral simultânea: lesão uretral associada em 10-38%

**Amputação traumática:**
- Preservação do segmento amputado: soro gelado (não gelo direto)
- Reimplante microcirúrgico: janela de 6h (isquemia quente) ou 24h (isquemia fria)

**Trauma de pênis flácido:**
- Hematoma, laceração — manejo conservador na maioria
- Lesão uretral: uretrografia antes de cateterização

### Trauma Genital Feminino

**Vulva e vagina:**
- Laceração vaginal por trauma contuso de alta energia: pode estender-se ao períneo, reto e bexiga
- Lacerações vaginais em fratura pélvica: "fratura pélvica aberta" — alta mortalidade (20-30%)
- Exame sob anestesia: avalia extensão + reparo cirúrgico
- Sempre exclua lesão retal associada (toque retal + proctoscopia)

**Fratura pélvica com laceração vaginal ou retal:**
- Colostomia de proteção: reduz contaminação e risco de osteomielite pélvica
- Lavagem do reto distal
- Drenagem pré-sacral

## 8. Sonda Vesical — Indicações e Contraindicações

### Indicações no Trauma

- Monitorização do débito urinário (marcador de perfusão renal)
- Descompressão vesical antes de cistografia ou cirurgia pélvica
- Retenção urinária por lesão medular

### Contraindicações

- Suspeita de lesão uretral: qualquer dos seguintes antes da uretrografia:
  - Sangue no meato uretral
  - Hematoma perineal ou escrotal em borboleta
  - Próstata alta ao toque retal
  - Fratura pélvica + impossibilidade de micção

**Protocolo correto:**
1. Avalie clinicamente para sinais de lesão uretral
2. Se presente: uretrografia retrógrada primeiro
3. Se uretra íntegra: cateterize normalmente
4. Se lesão confirmada: cistostomia suprapúbica

## 9. Glossário de Siglas, Exames e Termos

### Siglas e Abreviações

**AAST** — American Association for the Surgery of Trauma. Associação americana de cirurgia do trauma, responsável pela classificação de lesões por órgão (graus I-V) amplamente usada nesta aula.

**EAU** — European Association of Urology. Associação europeia de urologia, que publica diretrizes atualizadas para manejo do trauma urológico.

**MNO** — Manejo Não Operatório. Estratégia de tratamento conservador sem cirurgia, indicada em lesões estáveis que podem ser monitoradas clinicamente e por imagem.

**TC** — Tomografia Computadorizada. Exame de imagem seccional que usa raios X para gerar imagens detalhadas de órgãos internos. No trauma, é o padrão diagnóstico para lesões abdominais e retroperitoneais no paciente estável.

**FAST** — Focused Assessment with Sonography in Trauma. Ultrassonografia focada no trauma, realizada à beira do leito para identificar líquido livre em pericárdio, peritônio e pleura.

**eFAST** — Extended FAST. Versão ampliada do FAST que inclui avaliação pleural bilateral para pneumotórax e hemotórax.

**UGR** — Uretrografia Retrógrada. Exame radiológico com injeção de contraste pelo meato uretral para avaliar a integridade da uretra. Obrigatório antes de cateterização em suspeita de lesão uretral.

**UIV** — Urografia Intravenosa (também chamada de urografia excretora). Exame radiológico com contraste IV que avalia a morfologia e função do trato urinário superior. Em grande parte substituída pela TC com fase excretora.

**UPJ** — Ureteropelvic Junction. Junção ureteropélvica — ponto de transição entre a pelve renal e o ureter, vulnerável a lesões por desaceleração.

**IVP** — Intravenous Pyelogram. Urografia intravenosa — sinônimo de UIV. One-shot IVP: radiografia única obtida 10 minutos após injeção de contraste IV, usada no intraoperatório para confirmar função do rim contralateral.

**SRAA** — Sistema Renina-Angiotensina-Aldosterona. Sistema hormonal que regula a pressão arterial e o volume extracelular. Ativado no choque → vasoconstrição + retenção de sódio e água.

**PAS** — Pressão Arterial Sistólica. Pressão máxima nas artérias durante a sístole ventricular.

**PAM** — Pressão Arterial Média. Média ponderada da pressão arterial ao longo do ciclo cardíaco. Calculada como: PAM = PAD + 1/3 (PAS - PAD). Meta habitual de perfusão orgânica: PAM ≥ 65 mmHg.

**HGA** — High Power Field (campo de grande aumento). Unidade de medida usada na urinálise para quantificar células por campo microscópico.

**REBOA** — Resuscitative Endovascular Balloon Occlusion of the Aorta. Oclusão endovascular ressuscitativa por balão aórtico. Cateter com balão posicionado na aorta para reduzir a hemorragia distal e aumentar a pós-carga cardíaca como ponte para cirurgia definitiva.

**PPP** — Packing Pré-Peritoneal. Técnica de controle hemorrágico pélvico por compressas no espaço retroperitoneal pélvico, sem abrir o peritônio.

**ATX** — Ácido Tranexâmico. Agente antifibrinolítico que inibe a ativação do plasminogênio, reduzindo a lise dos coágulos. Indicado nas primeiras 3 horas do trauma hemorrágico.

**DCR** — Damage Control Resuscitation. Reanimação de controle de dano: estratégia de ressuscitação que combina hipotensão permissiva + reanimação hemostática + controle precoce da hemorragia.

**DCS** — Damage Control Surgery. Cirurgia de controle de dano: abordagem cirúrgica em três fases (cirurgia abreviada → UTI → cirurgia definitiva) para pacientes com a tríade letal.

**TEG** — Tromboelastografia. Exame viscoelastométrico que avalia toda a cascata de coagulação em tempo real, identificando o componente específico da coagulopatia.

**ROTEM** — Rotational Thromboelastometry. Tromboelastometria rotacional — variante do TEG com a mesma finalidade clínica: avaliação global da hemostasia em tempo real.

**CPRE** — Colangiopancreatografia Retrógrada Endoscópica. Procedimento endoscópico que visualiza e trata lesões das vias biliares e do ducto pancreático por via retrógrada (via papila duodenal).

**CPRM** — Colangiopancreatografia por Ressonância Magnética. Exame de imagem não invasivo que avalia as vias biliares e o ducto pancreático sem contraste e sem radiação.

**VCI** — Veia Cava Inferior. Principal vaso venoso do abdome, drena sangue dos membros inferiores e vísceras abdominais para o átrio direito.

**LC, APC, VS** — Compressão Lateral (Lateral Compression), Compressão Ântero-Posterior (Anterior-Posterior Compression), Cisalhamento Vertical (Vertical Shear). Tipos de fratura pélvica segundo a classificação de Young-Burgess.

**PIA** — Pressão Intraabdominal. Pressão dentro da cavidade abdominal. Medida por sonda vesical: PIA > 20 mmHg + disfunção de órgão = síndrome compartimental abdominal.

### Exames de Imagem — O Que São e Para Que Servem

**Tomografia Computadorizada (TC) com contraste:**
Exame de imagem que usa raios X em múltiplos ângulos para gerar cortes transversais do corpo. O contraste iodado injetado na veia permite distinguir vasos, órgãos e áreas de extravasamento. No trauma renal, usa-se protocolo trifásico: fase arterial (avalia lesão vascular), venosa (avalia parênquima) e excretora (avalia sistema coletor).

**Ultrassonografia (FAST/eFAST):**
Usa ondas sonoras de alta frequência para gerar imagens em tempo real. No trauma, é realizada à beira do leito pelo médico assistente para detectar líquido livre (sangue) em cavidades corporais. Rápida (< 5 minutos), sem radiação, portátil — mas operador dependente e não detecta lesões retroperitoneais.

**Uretrografia Retrógrada (UGR):**
Radiografia contrastada da uretra com injeção de contraste pelo meato uretral. Obrigatória antes de cateterização em qualquer suspeita de lesão uretral. Define localização e extensão da lesão em minutos.

**Cistografia / Cisto-TC:**
Avaliação da bexiga com enchimento retrógrado de contraste pelo cateter vesical (300-400 mL) seguida de radiografia ou TC pélvica. Detecta rupturas vesicais intraperitoneais ou extraperitoneais com alta sensibilidade.

**Ultrassonografia Escrotal:**
Avalia parênquima testicular, albugínea e hematocele. Doppler colorido: avalia perfusão — ausência de fluxo indica torção ou desvascularização traumática.

**Angiografia e Angioembolização:**
Cateterismo arterial seletivo com injeção de contraste para identificar e tratar vasos sangrantes. No trauma renal e esplênico, o radiologista intervencionista avança o cateter até o vaso lesado e deposita material de embolização (molas metálicas, microesferas, gelfoam) para ocluir o sangramento sem cirurgia aberta.

**Nefrostomia Percutânea:**
Cateter inserido pelo dorso diretamente na pelve renal sob guia ultrassonográfico ou fluoroscópico. Serve para drenar urina quando o ureter está obstruído ou lesado, preservando a função renal enquanto a reconstrução é planejada.

**Stent Ureteral (duplo J):**
Cateter flexível em forma de J inserido por cistoscopia, posicionando uma extremidade na pelve renal e outra na bexiga. Mantém a patência do ureter após lesões parciais ou cirurgias reconstrutivas, permitindo cicatrização sem estenose.

## 10. Pontos-Chave

- Hematúria macroscópica: sempre investigar — TC trifásica é o padrão
- Ausência de hematúria não exclui lesão ureteral ou de pedículo renal
- MNO é padrão para lesões renais I-III e selecionadas IV — taxa de sucesso > 95%
- Sangue no meato uretral: uretrografia retrógrada obrigatória antes de qualquer cateterização
- Ruptura vesical intraperitoneal: reparo cirúrgico obrigatório — urina na cavidade peritoneal causa peritonite
- Ruptura vesical extraperitoneal: cateterismo contínuo 10-14 dias — 85% resolvem sem cirurgia
- Lesão uretral completa: cistostomia suprapúbica imediata + reparo primário ou diferido
- Fratura pélvica + sangue no meato + impossibilidade miccional: tríade diagnóstica de lesão uretral posterior
- Ruptura testicular: exploração cirúrgica em < 72h — salvamento de 90% vs. 45% após 72h
- Lesão ureteral: stent duplo J em lesões parciais; ureteroneocistostomia em lesões distais completas
- Pós-esplenectomia e nefrectomia: confirmação de rim contralateral funcionante antes da nefrectomia

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.
- European Association of Urology (EAU). Guidelines on Urological Trauma, 2023.
- American Association for the Surgery of Trauma (AAST). Organ Injury Scaling — Urinary Tract, 2018 update.
- Morey AF et al. Urotrauma: AUA Guideline, 2020 amendment. Journal of Urology, 2021.
- Coccolini F et al. Renal trauma: WSES-AAST guidelines. World Journal of Emergency Surgery, 2021.
- Breyer BN et al. Urethral injuries: management and outcomes. Urology, 2022.
- Santucci RA et al. Bladder trauma. Journal of Urology, 2020.`,
  },
  {
    id: 'e3969d26-53a3-4172-ac55-a562ee6d0348',
    title: 'ATLS: Trauma Cranioencefálico',
    description: 'Avaliação e manejo do TCE — classificação, monitorização de PIC, neuroproteção, indicações cirúrgicas e metas de ressuscitação baseados no ATLS 10ª edição e diretrizes da Brain Trauma Foundation 2023',
    theme: 'atls_cranioencefalico',
    type: 'article',
    content: `## 1. Introdução e Relevância Clínica

O traumatismo cranioencefálico (TCE) é a principal causa de morte e incapacidade em politraumatizados, responsável por 30-40% de todas as mortes traumáticas. Nos Estados Unidos, ocorrem aproximadamente 2,8 milhões de TCEs por ano, com 56.000 mortes. No Brasil, o TCE é responsável por cerca de 100.000 hospitalizações anuais, com mortalidade hospitalar de 10-15% nos casos graves.

A Brain Trauma Foundation (BTF) publica desde 1995 as diretrizes mais abrangentes para manejo do TCE grave, com revisão sistemática da evidência. A 5ª edição (2023) consolidou atualizações significativas no manejo da PIC, nas metas de perfusão e no papel da monitorização multimodal.

### Conceito Central — Lesão Primária e Secundária

**Lesão primária:**
Dano tecidual direto e imediato causado pelo impacto mecânico — laceração de vasos, contusão cortical, cisalhamento axonal difuso. É irreversível no momento do impacto — não pode ser tratada, apenas prevenida.

**Lesão secundária:**
Cascata de eventos fisiopatológicos que amplificam o dano inicial nas horas e dias seguintes. É o alvo terapêutico de toda a abordagem do TCE grave. Os principais fatores de lesão secundária são:

- **Hipóxia** (SpO₂ < 90%): agrava a isquemia neuronal — cada episódio dobra a mortalidade
- **Hipotensão** (PAS < 90 mmHg): reduz a perfusão cerebral — um único episódio aumenta a mortalidade em 150%
- **Hipercapnia** (pCO₂ > 45 mmHg): vasodilatação cerebral → aumento da PIC
- **Hipocapnia** (pCO₂ < 35 mmHg): vasoconstrição cerebral → isquemia secundária
- **Hipertermia** (T > 38°C): aumenta o metabolismo cerebral e agrava a lesão neuronal
- **Hipoglicemia** (< 60 mg/dL): privação de substrato metabólico essencial para o neurônio
- **Hiperglicemia** (> 180 mg/dL): agrava o edema cerebral e piora o prognóstico
- **Hiponatremia**: aumenta o edema cerebral por diferença osmótica
- **Convulsões**: aumentam a demanda metabólica e a PIC

A prevenção e o tratamento agressivo de cada um desses fatores são o núcleo do manejo do TCE grave.

### Atualização das Diretrizes — BTF 2023

- **Meta de PIC**: tratar quando > 22 mmHg (antes era > 20 mmHg) — recomendação nível IIA
- **Meta de PPC**: 60-70 mmHg — faixa estreita, tanto abaixo quanto acima é prejudicial
- **Monitorização de PIC**: recomendada em TCE grave (GCS ≤ 8) com TC anormal — reduz mortalidade em 30%
- **Hipotensão permissiva**: contraindicada em TCE — PAS ≥ 100 mmHg em adultos 50-69 anos; PAS ≥ 110 mmHg em adultos 15-49 e > 70 anos
- **Profilaxia de convulsões**: fenitoína ou levetiracetam nos primeiros 7 dias — reduz convulsões precoces mas não modifica o prognóstico tardio
- **Temperatura**: normotermia (36-37°C) — hipotermia terapêutica não demonstrou benefício em ensaios clínicos recentes (POLAR, EUROTHERM)
- **Monitorização multimodal**: pressão tissular de O₂ (PbtO₂), microdiálise, EEG contínuo — centros de neurointensivismo avançado

## 2. Fisiopatologia

### Doutrina de Monro-Kellie

O crânio é uma caixa rígida de volume fixo. Seu conteúdo é composto por três compartimentos:

- **Parênquima cerebral**: 80% (1200 mL)
- **Líquido cefalorraquidiano (LCR)**: 10% (150 mL)
- **Sangue intravascular**: 10% (150 mL)

**Volume total = constante**. Qualquer aumento em um compartimento deve ser compensado pela redução de outro. Os mecanismos de compensação são:

1. Deslocamento de LCR para o espaço subaracnoide espinal
2. Compressão dos seios venosos e redução do volume sanguíneo venoso intracraniano

Quando esses mecanismos são esgotados, pequenos aumentos de volume causam aumentos exponenciais da PIC — a curva pressão-volume torna-se quase vertical (perda de complacência intracraniana).

### Autorregulação Cerebral

O encéfalo normal mantém o fluxo sanguíneo cerebral (FSC) constante em uma faixa de PAM de 50-150 mmHg, independentemente das variações da pressão sistêmica. Isso é possível pela vasoconstrição e vasodilatação das arteríolas cerebrais.

**No TCE grave, a autorregulação frequentemente está comprometida:**
- O FSC torna-se dependente da PAM (circulação passiva)
- Hipotensão → redução proporcional do FSC → isquemia
- Hipertensão → aumento do FSC → hiperemia → aumento da PIC

**Implicação clínica:** em paciente com autorregulação comprometida, a meta de PAM deve ser mais conservadora e precisa ser individualizada — a monitorização de PIC e PbtO₂ guia os ajustes.

### Cascata de Lesão Secundária

Após o impacto inicial:

1. **Despolarização anóxica**: falência da bomba Na/K-ATPase por deficit energético → influxo maciço de Na⁺, Ca²⁺ e água → edema citotóxico
2. **Liberação de glutamato**: neurotransmissor excitatório → ativação de receptores NMDA → influxo de Ca²⁺ → ativação de proteases, lipases e nucleases → morte celular
3. **Disfunção mitocondrial**: Ca²⁺ intracelular → abertura do poro de transição mitocondrial → apoptose
4. **Neuroinflamação**: ativação de microglia e astrócitos → citocinas inflamatórias → edema vasogênico → aumento da PIC
5. **Lesão axonal difusa**: cisalhamento das fibras axonais por aceleração-desaceleração → interrupção do transporte axonal → balonamento axonal → desconexão de circuitos

## 3. Classificação do TCE

### Por Gravidade — GCS

| Classificação | GCS | Implicação |
|---|---|---|
| Leve | 13-15 | Observação, TC seletiva |
| Moderado | 9-12 | TC obrigatória, internação |
| Grave | ≤ 8 | IOT, monitorização de PIC, UTI neurológica |

**Avalie sempre após estabilização hemodinâmica e respiratória** — hipoperfusão e hipóxia causam rebaixamento do GCS reversível, não atribuível à lesão cerebral primária.

### Por Morfologia — TC de Crânio

**Lesões focais:**

**Hematoma epidural (HED):**
- Sangue entre o crânio e a dura-máter
- Mecanismo clássico: fratura temporal com lesão da artéria meníngea média
- TC: imagem lenticular (biconvexa) hiperdens — não cruza suturas
- Intervalo lúcido: paciente perde a consciência, recupera brevemente (horas) e deteriora novamente — presente em 20-30% dos casos
- Tratamento cirúrgico urgente: evacuação do hematoma

**Hematoma subdural agudo (HSD):**
- Sangue entre a dura-máter e a aracnoide
- Mecanismo: laceração de veias ponte (bridging veins) ou laceração cortical
- TC: imagem côncava-convexa (crescente) hiperdens — cruza suturas, não cruza a foice
- Mais grave que HED — frequentemente acompanhado de contusão cortical subjacente
- Tratamento cirúrgico urgente em casos com desvio > 5 mm ou espessura > 10 mm

**Contusão cerebral:**
- Hemorragia intraparenquimatosa puntiforme em área de impacto (coup) ou contralateral (contrecoup)
- Frontotemporal: localização mais comum (polo frontal e temporal)
- Evolução: coalescência progressiva nas primeiras 24-72h — TC de controle obrigatória
- Pode evoluir para hematoma intraparenquimatoso com efeito de massa

**Hematoma intraparenquimatoso traumático:**
- Coalescência de contusões ou ruptura de vaso parenquimatoso
- Efeito de massa com desvio da linha média
- Cirurgia: quando efeito de massa significativo + deterioração clínica

**Lesões difusas:**

**Lesão axonal difusa (LAD):**
- Cisalhamento de fibras axonais por aceleração-desaceleração rotacional de alta velocidade
- TC frequentemente normal ou com microhemorragias na junção córtico-subcortical, corpo caloso e tronco cerebral
- RM: muito mais sensível — sequências de difusão e susceptibilidade (SWI)
- Clínica: coma imediato sem lesão focal explicativa
- Prognóstico variável — desde recuperação completa até estado vegetativo

**Hemorragia subaracnoide traumática (HSAt):**
- Sangue no espaço subaracnoide
- TC: hiperdensidade nas cisternas basais e sulcos corticais
- Diferente da HSA aneurismática: distribuição e apresentação distintas
- Complicação: vasoespasmo — menos frequente que na HSA aneurismática mas possível

**Classificação de Marshall (TC):**
- Grau I: TC normal
- Grau II: cisternas visíveis, desvio < 5 mm, sem lesão hiperdens > 25 mL
- Grau III: cisternas comprimidas ou ausentes, desvio < 5 mm
- Grau IV: desvio > 5 mm
- Lesão de massa evacuada e não evacuada: categorias adicionais

## 4. Avaliação Primária — TCE no ATLS

### A — Via Aérea

**Indicações de IOT imediata no TCE:**
- GCS ≤ 8 (incapacidade de proteger a via aérea)
- GCS > 8 com deterioração progressiva (queda ≥ 2 pontos)
- Hipóxia refratária (SpO₂ < 90% com O₂ suplementar)
- Hipoventilação (FR < 10 irpm, pCO₂ > 50 mmHg)
- Sinais de herniação iminente (pupila midriática, postura de decerebração)
- Agitação intratável impedindo avaliação e transporte seguro

**SIR no TCE:**
- Pré-tratamento: lidocaína 1,5 mg/kg IV 3 minutos antes — atenua o aumento de PIC pela laringoscopia
- Indutor: etomidato 0,3 mg/kg IV (primeira escolha) — mínimo efeito hemodinâmico, sem aumento de PIC
- Bloqueador neuromuscular: succinilcolina 1,5 mg/kg IV ou rocurônio 1,2 mg/kg IV
- Evite: propofol e tiopental em paciente hipotenso (causam hipotensão grave → piora da PPC)
- Videolaringoscópio: primeira escolha — minimiza extensão cervical e o aumento reflexo de PIC

**Metas ventilatórias após IOT:**
- pCO₂: 35-40 mmHg (normocapnia rigorosa)
- SpO₂: ≥ 94% (FiO₂ mínima que atinja essa meta)
- Evite hiperoxia: PaO₂ > 300 mmHg piora o prognóstico neurológico
- Hiperventilação (pCO₂ 30-35 mmHg): apenas em herniação cerebral iminente como medida transitória de emergência — máximo 30 minutos

### B — Ventilação

- Normocapnia é mandatória — monitore com capnografia contínua (ETCO₂ 35-40 mmHg)
- Evite PEEP excessiva: PEEP > 15 cmH₂O pode aumentar a PIC por redução do retorno venoso jugular

### C — Circulação

**A hipotensão é o inimigo número 1 no TCE grave:**
- Um único episódio de PAS < 90 mmHg aumenta a mortalidade em 150%
- Meta de PAS (BTF 2023):
  - 15-49 anos e > 70 anos: PAS ≥ 110 mmHg
  - 50-69 anos: PAS ≥ 100 mmHg
- Meta de PAM: ≥ 80 mmHg para garantir PPC adequada
- **Hipotensão permissiva é contraindicada em TCE** — não aplique o protocolo de trauma penetrante
- Reposição: cristaloide isotônico (Ringer lactato ou SF 0,9%) + hemoderivados conforme necessidade
- Evite soluções hipotônicas (SF 0,45%, glicose 5%) — agravam o edema cerebral por redução da osmolaridade plasmática

### D — Avaliação Neurológica

**GCS detalhado:**
- Registre cada componente separadamente (O + V + M = total)
- Avalie antes e após qualquer intervenção
- GCS motor é o componente mais preditivo do prognóstico

**Pupilas:**
- Avalie tamanho (mm), simetria e reatividade à luz em cada olho
- Midríase unilateral arreativa: herniação uncal ipsilateral → lesão do III nervo craniano → emergência neurocirúrgica
- Midríase bilateral arreativa: herniação central, hipóxia prolongada, intoxicação por atropínicos
- Miose bilateral: lesão pontina, intoxicação por opioides
- Sinal de Marcus Gunn (RAPD): lesão do nervo óptico

**Padrões motores:**
- Postura de decorticação (flexão de membros superiores): lesão acima do mesencéfalo
- Postura de decerebração (extensão de todos os membros): lesão do tronco cerebral — sinal de herniação

**Tríade de Cushing:**
- Hipertensão arterial + bradicardia + bradipneia/irregularidade respiratória
- Resposta reflexa à isquemia do tronco cerebral por herniação
- Sinal de PIC extremamente elevada com herniação iminente — agir imediatamente

## 5. Manejo do TCE Grave — UTI Neurológica

### Monitorização de PIC

**Indicações (BTF 2023):**
- TCE grave (GCS ≤ 8) + TC anormal (hematoma, contusão, edema, herniação, cisterna comprimida)
- TCE grave + TC normal: monitorize se ≥ 2 dos seguintes: idade > 40 anos, postura motora anormal, PAS < 90 mmHg

**Dispositivos:**
- **Cateter intraventricular (DVE — Derivação Ventricular Externa)**: padrão-ouro — mede PIC e permite drenagem de LCR terapêutica; maior risco de infecção (ventriculite) e hemorragia de inserção
- **Monitor intraparenquimatoso (Camino, Codman)**: mais fácil de inserir; não permite drenagem de LCR; deriva ao longo do tempo
- **Monitor subaracnoide/subdural**: menos preciso — raramente usado

**Meta de PIC:** ≤ 22 mmHg (BTF 2023)

**Meta de PPC:** 60-70 mmHg
- PPC = PAM − PIC
- PPC < 60 mmHg: isquemia cerebral
- PPC > 70 mmHg: hiperemia → aumento da PIC (em pacientes com autorregulação comprometida)

### Escalonamento do Tratamento da Hipertensão Intracraniana

**Medidas de primeira linha (sempre):**

**Posicionamento:**
- Cabeceira elevada a 30° — reduz a PIC sem comprometer a PPC na maioria dos pacientes
- Cabeça em posição neutra — evite rotação cervical (obstrui o retorno venoso jugular)
- Evite compressão jugular (colar cervical justo, fixadores de tubo apertados)

**Normocapnia:**
- pCO₂ 35-40 mmHg — monitorização contínua por capnografia
- Cada 1 mmHg de aumento no pCO₂ → aumento do FSC em 3-4% → aumento da PIC

**Normotermia:**
- Meta: 36-37°C
- Cada 1°C de aumento da temperatura → aumento do metabolismo cerebral em 7%
- Antitérmicos agressivos: paracetamol + resfriamento físico
- Hipotermia terapêutica (33-35°C): não recomendada rotineiramente (POLAR 2018, EUROTHERM 2015 — sem benefício e com aumento de complicações)

**Normoglicemia:**
- Meta: 140-180 mg/dL
- Hipoglicemia (< 60): tratamento imediato com glicose
- Hiperglicemia intensa (> 200): insulinoterapia — evite hipoglicemia iatrogênica

**Sedação e analgesia adequadas:**
- Agitação, tosse e estímulos dolorosos aumentam a PIC
- Midazolam + fentanil: sedoanalgesia padrão em ventilação mecânica
- Propofol: sedação de curta duração, permite avaliações neurológicas frequentes — cuidado com síndrome do propofol em doses altas e prolongadas

**Drenagem de LCR:**
- DVE posicionado: drene LCR quando PIC > 22 mmHg — alívio imediato da pressão
- Meta de drenagem: 5-10 mL de LCR por vez, reavalie após cada drenagem

**Medidas de segunda linha:**

**Osmoterapia:**

**Manitol 20% (0,5-1 g/kg IV em 15-20 minutos):**
- Agente osmótico: extrai água do parênquima cerebral para o plasma pela diferença osmótica
- Onset: 15-30 minutos. Duração: 2-6 horas
- Efeito reológico precoce: reduz a viscosidade sanguínea e aumenta o FSC
- Contraindicações: osmolaridade sérica > 320 mOsm/L (risco de lesão renal aguda), hipovolemia grave
- Monitorize osmolaridade sérica a cada 6h — mantenha gap osmolar < 20 mOsm/L

**Solução salina hipertônica (NaCl 3%, NaCl 7,5%, NaCl 23,4%):**
- Mecanismo osmótico similar ao manitol — extrai água do encéfalo
- Vantagens sobre o manitol: não causa diurese osmótica (não piora a hipovolemia), pode ser usado em pacientes hipotensos
- NaCl 3%: 250 mL IV em 20-30 minutos (uso mais frequente em UTI)
- NaCl 23,4%: 30-60 mL IV em acesso central — uso em emergências hipertensivas intracranianas
- Meta de Na sérico: 145-155 mEq/L (hipernatremia leve controlada)
- Contraindicação: Na > 160 mEq/L

**Medidas de terceira linha (TCE refratário):**

**Barbitúricos em altas doses:**
- Pentobarbital ou tiopental: reduzem o metabolismo cerebral e a PIC em 40-50%
- Indicação: PIC refratária às medidas anteriores em paciente sem lesão cirúrgica
- Monitorização: EEG contínuo para titular dose até burst-suppression (surto-supressão)
- Complicações: hipotensão grave (exige vasopressores), imunossupressão, íleo paralítico
- Contraindicação: instabilidade hemodinâmica

**Craniectomia descompressiva:**
- Remoção de segmento ósseo craniano para permitir a expansão do encéfalo edemaciado
- Indicações: PIC refratária > 25 mmHg por > 1h após todas as medidas clínicas, com deterioração neurológica progressiva
- Ensaio DECRA (NEJM 2011): craniectomia bilateral precoce reduziu a PIC mas piorou os desfechos funcionais em 6 meses
- Ensaio RESCUEicp (NEJM 2016): craniectomia como salvamento reduziu a mortalidade, mas com maior proporção de sobreviventes com incapacidade grave
- Indicação mais aceita: lesões hemisféricas unilaterais com herniação iminente (craniectomia unilateral ampla)

**Hiperventilação moderada:**
- pCO₂ 30-35 mmHg — apenas como ponte de minutos a horas para herniação iminente
- Não usar profilaticamente — causa vasoconstrição e isquemia cerebral

### Profilaxia de Convulsões

**Convulsões precoces (< 7 dias):**
- Incidência de 12-17% no TCE grave sem profilaxia
- Aumentam a demanda metabólica e a PIC
- Profilaxia recomendada: fenitoína ou levetiracetam por 7 dias
- Levetiracetam: preferido por melhor tolerabilidade e ausência de interações
- Dose: levetiracetam 500 mg IV de 12/12h (ou 1000 mg de 12/12h em casos graves)

**Convulsões tardias (> 7 dias):**
- Profilaxia não reduz sua incidência — não usar além de 7 dias
- Tratamento: anticonvulsivante de longo prazo conforme protocolo de epilepsia pós-traumática

**Estado de Mal Epiléptico (EME) não convulsivo:**
- Frequente no TCE grave — convulsões eletrográficas sem manifestação clínica visível
- EEG contínuo: indicado em paciente em coma sem causa estrutural clara ou com deterioração inexplicada
- Tratamento: benzodiazepínico IV + anticonvulsivante de segunda linha

## 6. Indicações Cirúrgicas

### Hematoma Epidural (HED)

**Cirurgia imediata (craniotomia de emergência):**
- Volume > 30 cm³ (independentemente do GCS)
- Espessura > 15 mm
- Desvio de linha média > 5 mm
- Deterioração neurológica progressiva (queda do GCS ≥ 2 pontos)

**Observação (TC seriada):**
- Volume < 30 cm³, espessura < 15 mm, desvio < 5 mm, GCS > 8, sem déficit focal
- TC de controle em 6-8h e conforme evolução clínica

### Hematoma Subdural Agudo (HSD)

**Cirurgia imediata:**
- Espessura > 10 mm
- Desvio de linha média > 5 mm
- PIC > 20 mmHg
- Deterioração neurológica progressiva

**Janela cirúrgica:** quanto mais precoce, melhor o prognóstico — cada hora de atraso aumenta a mortalidade em TCE grave com HSD

### Contusão e Hematoma Intraparenquimatoso

**Cirurgia indicada:**
- Volume > 50 cm³ em qualquer região
- Volume > 20 cm³ em lobo frontal ou temporal com GCS 6-8 + desvio > 5 mm ou compressão cisternal
- Deterioração neurológica atribuível à lesão
- PIC refratária ao tratamento clínico

**Observação:**
- Lesões pequenas (< 20 cm³) sem efeito de massa e GCS > 8
- TC de controle obrigatória em 6-12h — risco de expansão (30% nas primeiras 24h)

### Fraturas de Crânio

**Fratura linear sem afundamento:**
- Tratamento conservador — apenas sutura da laceração couro cabeludo
- Pesquise lesão intracraniana subjacente

**Fratura com afundamento > 1 espessura do osso:**
- Elevação cirúrgica se: afundamento > 1 cm, fratura aberta, lacerações de dura-máter, déficit neurológico focal

**Fratura de base de crânio:**
- Tratamento conservador na maioria
- Fístula de LCR: 80% fecham espontaneamente em 7-10 dias — reparo cirúrgico se persistir
- Antibiótico profilático: não recomendado routineiramente (sem redução de meningite — Cochrane 2023)

## 7. TCE Leve e Moderado

### TCE Leve (GCS 13-15)

**Indicações de TC no TCE leve — Canadian CT Head Rule:**
TC obrigatória se qualquer dos seguintes:
- GCS < 15 em qualquer momento nas primeiras 2h
- Suspeita de fratura aberta ou com afundamento
- Qualquer sinal de fratura de base de crânio (hemotímpano, olhos de guaxinim, sinal de Battle, rinoliquoreia, otoliquoreia)
- Vômitos ≥ 2 episódios
- Idade ≥ 65 anos
- Amnésia retrógrada ≥ 30 minutos antes do impacto
- Mecanismo de risco (pedestre atropelado, ocupante ejetado, queda > 1 metro)

**Alta hospitalar segura (GCS 15, TC normal, adulto responsável em casa):**
- Orientações por escrito para retorno imediato se: piora da cefaleia, vômitos repetidos, sonolência excessiva, confusão, fraqueza, convulsão
- Anticoagulados: TC obrigatória e observação por 24h mesmo com TC inicial normal

**Síndrome pós-concussional:**
- Cefaleia, tontura, dificuldade de concentração, alterações do sono, labilidade emocional
- Resolução espontânea em semanas a meses na maioria
- Retorno progressivo às atividades — evite reexposição a trauma antes da resolução completa

### TCE Moderado (GCS 9-12)

- TC obrigatória
- Internação hospitalar para observação
- Reavaliações neurológicas seriadas
- Deterioração do GCS: TC de controle + avaliação neurocirúrgica

## 8. Situações Especiais

### TCE no Idoso

- Reserva fisiológica reduzida: menor tolerância à hipotensão e hipóxia
- Anticoagulados: HSD e HED ocorrem em mecanismos de baixa energia (queda da própria altura)
- Atrofia cerebral: espaço extra permite acomodar volumes maiores de hematoma antes da herniação — pode mascarar lesões graves
- Reverter anticoagulação: complexo protrombínico (varfarina), idarucizumab (dabigatrana), andexanet alfa (rivaroxabana/apixabana)
- Menor limiar para TC e internação

### TCE em Crianças

- Fontanelas abertas (< 18 meses): podem acomodar volumes maiores de sangue antes de elevar a PIC — sinais de herniação são tardios
- Hematoma subdural crônico bilateral em lactente: pesquise trauma não acidental (síndrome do bebê sacudido)
- GCS pediátrico: modificado para avaliar choro e resposta verbal conforme a faixa etária
- Menor dose de manitol: 0,5 g/kg
- Profilaxia de convulsões: fenobarbital ou levetiracetam

### TCE Associado a Álcool e Drogas

- Álcool causa rebaixamento do GCS independentemente — não atribua todo rebaixamento ao álcool
- Sempre realize TC no paciente intoxicado com GCS reduzido após trauma
- Dissociação clínica: GCS melhor que o esperado para a lesão (intoxicação mascara déficits) ou pior (intoxicação soma-se à lesão)

### TCE + Choque Hemorrágico

- Coexistência frequente e difícil de manejar
- Conflito entre hipotensão permissiva (trauma penetrante) e meta de PAS elevada (TCE)
- **Prioridade: manter PAS ≥ 100-110 mmHg** — a hipotensão mata o cérebro antes que o sangramento abdominal seja controlado
- Não aplique hipotensão permissiva em TCE grave — o benefício no controle do sangramento não compensa o risco de lesão cerebral secundária por hipoperfusão

## 9. Neuroproteção — Evidências Atuais

### Ácido Tranexâmico no TCE (ATLS 11ª Ed., 2025)

**ATX 2g IV em bolus** é suportado pelo ATLS 11ª edição quando há suspeita de hemorragia intracraniana ativa. Esta dose única em bolus é maior que o regime padrão para hemorragia periférica (1g + 1g em 8h), visando maximizar o efeito antifibrinolítico precoce. Baseado nos dados do **CRASH-3** e incorporado nas diretrizes BTF 2023. Janela terapêutica: **primeiras 3 horas** do trauma.

### O Que Não Funciona (Ensaios Negativos)

- **Corticosteroides**: aumentam a mortalidade no TCE grave (CRASH trial, Lancet 2004) — **contraindicados**
- **Hipotermia terapêutica profilática**: sem benefício em desfechos funcionais (POLAR 2018, EUROTHERM 2015)
- **Progestágona**: ensaios fase III negativos (ProTECT III 2014, SyNAPSe 2014)
- **Eritropoetina**: sem benefício neurológico
- **Magnésio**: sem benefício

### O Que Tem Evidência

- **Controle agressivo de fatores de lesão secundária**: hipóxia, hipotensão, hipercapnia, hipertermia — maior impacto na redução da mortalidade
- **Monitorização de PIC**: reduz mortalidade em TCE grave com TC anormal
- **Osmoterapia**: manitol e salina hipertônica reduzem a PIC agudamente
- **Craniectomia descompressiva**: reduz mortalidade em TCE refratário mas com maior morbidade nos sobreviventes
- **Profilaxia de convulsões precoces**: reduz convulsões nos primeiros 7 dias

## 10. Glossário

**TCE** — Traumatismo Cranioencefálico. Lesão cerebral causada por força mecânica externa. Classificado por GCS: leve (13-15), moderado (9-12), grave (≤ 8).

**GCS** — Glasgow Coma Scale / Escala de Coma de Glasgow. Avalia abertura ocular (1-4), resposta verbal (1-5) e resposta motora (1-6). Total: 3-15. GCS ≤ 8: TCE grave, IOT obrigatória.

**PIC** — Pressão Intracraniana. Pressão dentro da caixa craniana. Normal: < 15 mmHg. Meta no TCE grave: ≤ 22 mmHg (BTF 2023). Elevação causa herniação cerebral.

**PPC** — Pressão de Perfusão Cerebral. PPC = PAM − PIC. Meta no TCE grave: 60-70 mmHg. Abaixo de 60: isquemia cerebral. Acima de 70: hiperemia e aumento de PIC.

**PAM** — Pressão Arterial Média. PAD + 1/3 (PAS − PAD). Meta no TCE grave: ≥ 80 mmHg para garantir PPC adequada.

**PAS** — Pressão Arterial Sistólica. Meta no TCE grave (BTF 2023): ≥ 110 mmHg (15-49 anos e > 70 anos), ≥ 100 mmHg (50-69 anos).

**FSC** — Fluxo Sanguíneo Cerebral. Volume de sangue que perfunde o encéfalo por unidade de tempo. Normal: 50-55 mL/100g/min. Mantido constante pela autorregulação em PAM 50-150 mmHg.

**BTF** — Brain Trauma Foundation. Organização que publica as diretrizes internacionais para manejo do TCE grave desde 1995. 5ª edição: 2023.

**DVE** — Derivação Ventricular Externa. Cateter inserido no ventrículo lateral para medir a PIC e drenar LCR terapeuticamente. Padrão-ouro para monitorização de PIC.

**LCR** — Líquido Cefalorraquidiano (liquor). Fluido que preenche os ventrículos e o espaço subaracnoide. Volume: 150 mL. Drenagem pelo DVE: medida terapêutica para reduzir a PIC.

**HED** — Hematoma Epidural. Coleção de sangue entre o crânio e a dura-máter. TC: imagem lenticular (biconvexa) hiperdens. Frequentemente causado por lesão da artéria meníngea média.

**HSD** — Hematoma Subdural. Coleção de sangue entre a dura-máter e a aracnoide. TC: imagem em crescente hiperdens. Mais grave que o HED pela frequente associação com contusão cortical subjacente.

**LAD** — Lesão Axonal Difusa. Cisalhamento de fibras axonais por aceleração-desaceleração rotacional. TC frequentemente normal — RM com sequências SWI é muito mais sensível.

**HSAt** — Hemorragia Subaracnoide traumática. Sangue no espaço subaracnoide após trauma. Diferente da HSA aneurismática em distribuição e apresentação.

**IOT** — Intubação Orotraqueal. Via aérea definitiva obrigatória em GCS ≤ 8.

**SIR** — Sequência de Intubação Rápida. No TCE: etomidato + succinilcolina ou rocurônio + lidocaína pré-tratamento.

**ETCO₂** — CO₂ ao final da expiração. Monitorado por capnografia. Meta no TCE: 35-40 mmHg (normocapnia). Correlaciona com paCO₂ com margem de 2-5 mmHg.

**SpO₂** — Saturação periférica de oxigênio. Meta no TCE: ≥ 94%. Hipóxia (< 90%) dobra a mortalidade no TCE grave.

**PbtO₂** — Pressão tissular de oxigênio no parênquima cerebral. Medida por eletrodo inserido no parênquima. Normal: > 20 mmHg. PbtO₂ < 15 mmHg: isquemia cerebral — guia ajustes na monitorização multimodal.

**RAPD** — Relative Afferent Pupillary Defect / Defeito pupilar aferente relativo. Dilatação paradoxal de uma pupila ao iluminar o olho afetado. Indica lesão do nervo óptico ipsilateral.

**EME** — Estado de Mal Epiléptico. Convulsão contínua > 5 minutos ou convulsões repetidas sem recuperação da consciência. No TCE, pode ser não convulsivo — detectado apenas por EEG contínuo.

**EEG** — Eletroencefalograma. Registro da atividade elétrica cerebral. EEG contínuo: monitorização de convulsões eletrográficas em pacientes em coma no TCE grave.

**DECRA** — Decompressive Craniectomy in Diffuse Traumatic Brain Injury. Ensaio clínico (NEJM 2011) que avaliou craniectomia bifrontal precoce no TCE difuso — reduziu PIC mas piorou desfechos funcionais.

**RESCUEicp** — Randomised Evaluation of Surgery with Craniectomy for Uncontrollable Elevation of Intra-Cranial Pressure. Ensaio clínico (NEJM 2016) de craniectomia como salvamento no TCE refratário — reduziu mortalidade com maior proporção de sobreviventes com incapacidade grave.

**CRASH** — Corticosteroid Randomisation After Significant Head Injury. Ensaio clínico (Lancet 2004) que demonstrou aumento de mortalidade com corticosteroides no TCE grave — contraindicados.

**POLAR** — Prophylactic Hypothermia to Lessen Traumatic Brain Injury. Ensaio clínico (NEJM 2018) que não demonstrou benefício da hipotermia terapêutica profilática no TCE grave.

**Doutrina de Monro-Kellie** — Princípio que estabelece que o volume intracraniano total é fixo: parênquima + LCR + sangue = constante. Qualquer aumento em um compartimento deve ser compensado pela redução de outro.

**Autorregulação cerebral** — Capacidade do encéfalo de manter o FSC constante em uma faixa de PAM 50-150 mmHg. Frequentemente comprometida no TCE grave — FSC torna-se dependente da PAM.

**Tríade de Cushing** — Hipertensão + Bradicardia + Bradipneia. Resposta reflexa à isquemia do tronco cerebral por herniação. Indica PIC extremamente elevada com herniação iminente.

**Classificação de Marshall** — Sistema de classificação tomográfica do TCE em 6 categorias baseado na presença e volume de lesões e no estado das cisternas basais. Prediz mortalidade e necessidade cirúrgica.

**Intervalo lúcido** — Período de recuperação temporária da consciência entre o impacto e a deterioração neurológica. Clássico do HED (presente em 20-30% dos casos) mas pode ocorrer em outras lesões.

## 11. Pontos-Chave

- Lesão secundária é o alvo terapêutico — hipóxia e hipotensão são os inimigos número 1
- Um único episódio de PAS < 90 mmHg aumenta a mortalidade do TCE grave em 150%
- Hipotensão permissiva é contraindicada em TCE — meta PAS ≥ 100-110 mmHg
- GCS ≤ 8: IOT imediata + monitorização de PIC + UTI neurológica
- Meta de PIC: ≤ 22 mmHg. Meta de PPC: 60-70 mmHg (BTF 2023)
- Normocapnia rigorosa: pCO₂ 35-40 mmHg — hiperventilação apenas em herniação iminente como ponte
- Corticosteroides aumentam a mortalidade no TCE grave — contraindicados (CRASH trial)
- Hipotermia terapêutica profilática: sem benefício em ensaios clínicos recentes — não recomendada
- HED com volume > 30 cm³ ou espessura > 15 mm: craniotomia de emergência
- HSD com espessura > 10 mm ou desvio > 5 mm: craniotomia de emergência
- Profilaxia de convulsões: levetiracetam por 7 dias — reduz convulsões precoces
- Craniectomia descompressiva: salva vidas em TCE refratário mas com maior morbidade nos sobreviventes

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.\n- Gruen RL et al. Advanced trauma life support 2025: A brief review of updates. Injury. 2026;57(4):113079.
- Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, 5ª edição. 2023.
- Carney N et al. Guidelines for the Management of Severe TBI, 4th edition. Neurosurgery, 2017.
- Cooper DJ et al. Decompressive craniectomy in diffuse traumatic brain injury (DECRA). NEJM, 2011.
- Hutchinson PJ et al. Trial of Decompressive Craniectomy for Traumatic Intracranial Hypertension (RESCUEicp). NEJM, 2016.
- Edwards P et al. Final results of MRC CRASH, a randomised placebo-controlled trial of intravenous corticosteroid in adults with head injury. Lancet, 2005.
- Cooper DJ et al. Effect of Early Sustained Prophylactic Hypothermia on Neurologic Outcomes Among Patients With Severe TBI (POLAR). JAMA, 2018.
- Chesnut RM et al. A trial of intracranial-pressure monitoring in traumatic brain injury. NEJM, 2012.`,
  },
  {
    id: '4724df9d-8a16-4ccc-9340-6a01a3c3acd5',
    title: 'ATLS: Trauma de Coluna e Lesão Raquimedular',
    description: 'Avaliação e manejo do trauma de coluna vertebral e lesão medular — classificação neurológica, imobilização, metas de ressuscitação e reabilitação precoce baseados no ATLS 10ª edição e diretrizes da AO Spine/ASIA 2023',
    theme: 'atls_coluna',
    type: 'article',
    content: `## 1. Introdução e Relevância Clínica

O trauma de coluna vertebral ocorre em 2-6% de todos os traumas, com incidência anual de aproximadamente 54 casos por milhão de habitantes nos Estados Unidos. A lesão raquimedular (LRM) — dano à medula espinal ou às raízes nervosas — ocorre em 15-20% das fraturas de coluna e representa uma das causas mais impactantes de incapacidade permanente no trauma.

O custo humano e econômico é enorme: o tratamento de um paciente com tetraplegia completa ao longo da vida ultrapassa 5 milhões de dólares nos EUA. A mortalidade aguda da LRM cervical alta (acima de C4) é de 40-50% sem suporte ventilatório imediato.

A abordagem correta no ambiente pré-hospitalar e na sala de emergência pode ser a diferença entre uma lesão incompleta (com potencial de recuperação) e uma lesão completa irreversível. O princípio central é: **não converta uma lesão incompleta em completa por manuseio inadequado**.

### Atualização das Diretrizes — AO Spine/ASIA 2023

- A **classificação ASIA** (American Spinal Injury Association) é o padrão internacional para avaliação neurológica da LRM — atualização 2019 permanece vigente
- A **meta de PAM ≥ 85-90 mmHg** por 7 dias após LRM cervical ou torácica está recomendada para otimizar a perfusão medular (AO Spine 2023)
- Os **corticosteroides** (metilprednisolona) não são mais recomendados rotineiramente — evidência insuficiente de benefício e risco significativo de complicações
- A **cirurgia descompressiva precoce** (< 24h) é recomendada em LRM incompleta com compressão medular documentada — melhora os desfechos neurológicos
- O **clearance cervical clínico** (NEXUS + Canadian C-Spine Rule) evita imagem em pacientes de baixo risco
- A **TC helicoidal** substituiu a série radiográfica simples como padrão de triagem em trauma de alta energia
- A **RM** é obrigatória em déficit neurológico sem fratura na TC (lesão ligamentar, contusão medular, hematoma epidural espinal)

### Epidemiologia

- Coluna cervical: 55% das lesões — mais frequente e mais grave
- Coluna torácica: 15%
- Coluna toracolombar (T11-L2): 20% — junção de transição entre coluna rígida e móvel
- Coluna lombar baixa (L3-L5): 10%

**Causas:**
- Colisões veiculares: 38%
- Quedas: 30%
- Violência (PAF, FAB): 14%
- Esportes (mergulho, rúgbi, futebol americano): 9%
- Outros: 9%

## 2. Anatomia e Fisiopatologia

### Anatomia da Coluna Vertebral

**Vértebras:**
- 7 cervicais (C1-C7), 12 torácicas (T1-T12), 5 lombares (L1-L5), sacro e cóccix
- C1 (atlas): anel ósseo sem corpo vertebral — articula com o occipital
- C2 (áxis): possui o processo odontoide (dente) — pivô da rotação atlantoaxial
- C3-C7: vértebras cervicais típicas — processos transversos com forame para artéria vertebral

**Três colunas de Denis:**
- **Coluna anterior**: ligamento longitudinal anterior + metade anterior do corpo vertebral e disco
- **Coluna média**: metade posterior do corpo + ligamento longitudinal posterior
- **Coluna posterior**: arco neural + ligamentos posteriores (amarelo, interespinhoso, supraespinhoso) + articulações facetárias

**Estabilidade:** lesão de duas ou mais colunas = fratura instável.

**Medula espinal:**
- Estende-se do bulbo até L1-L2 (cone medular)
- Abaixo de L2: cauda equina (raízes nervosas) — maior capacidade de recuperação que a medula
- Irrigação: artéria espinal anterior (2/3 anteriores da medula) + artérias espinais posteriores (1/3 posterior)
- Artéria de Adamkiewicz: principal contribuinte para a artéria espinal anterior na transição toracolombar (T9-T12 esquerda) — lesão causa síndrome da artéria espinal anterior

**Tratos medulares relevantes:**

| Trato | Localização | Função | Teste clínico |
|---|---|---|---|
| Corticoespinal lateral | Posterior-lateral | Força motora ipsilateral | Força muscular 0-5 |
| Espinotalâmico lateral | Anterior-lateral | Dor e temperatura contralateral | Picada de agulha |
| Cordão posterior | Posterior | Propriocepção e vibração ipsilateral | Diapasão, posição articular |

### Fisiopatologia da Lesão Medular

**Lesão primária:**
Dano mecânico direto no momento do impacto: contusão, laceração, compressão, distração, cisalhamento. Irreversível — não pode ser tratada, apenas prevenida.

**Lesão secundária:**
Cascata fisiopatológica que amplifica o dano nas horas e dias seguintes:

1. **Edema medular**: inicia em minutos, pico em 3-6 dias — comprime a medula no canal rígido
2. **Isquemia**: compressão vascular + vasoespasmo + hipotensão sistêmica → infarto medular
3. **Excitotoxicidade**: glutamato → influxo de Ca²⁺ → morte celular por apoptose e necrose
4. **Neuroinflamação**: ativação de microglia, macrófagos → citocinas inflamatórias → desmielinização
5. **Apoptose de oligodendrócitos**: desmielinização secundária de axônios intactos → perda funcional adicional

**Implicação clínica:** a janela terapêutica para intervenções neuroprotetoras (descompressão cirúrgica, manutenção da PAM) está nas primeiras 24-72h — cada hora conta.

## 3. Avaliação Neurológica — Classificação ASIA

### Exame Neurológico Padronizado

**Função motora — 10 músculos-chave (5 por lado):**

| Nível | Músculo | Movimento testado |
|---|---|---|
| C5 | Bíceps braquial | Flexão do cotovelo |
| C6 | Extensor radial do carpo | Extensão do punho |
| C7 | Tríceps braquial | Extensão do cotovelo |
| C8 | Flexor profundo dos dedos | Flexão do dedo médio |
| T1 | Abdutor do dedo mínimo | Abdução do 5º dedo |
| L2 | Iliopsoas | Flexão do quadril |
| L3 | Quadríceps femoral | Extensão do joelho |
| L4 | Tibial anterior | Dorsiflexão do tornozelo |
| L5 | Extensor longo do hálux | Extensão do hálux |
| S1 | Gastrocnêmio/sóleo | Flexão plantar |

**Escala motora (0-5):**
- 0: sem contração
- 1: contração visível sem movimento
- 2: movimento com eliminação da gravidade
- 3: movimento contra a gravidade
- 4: movimento contra resistência parcial
- 5: força normal

**Função sensitiva — 28 dermátomos por lado:**
- Sensibilidade ao toque leve (algodão): trato cordão posterior
- Sensibilidade à picada (agulha): trato espinotalâmico lateral
- Cada dermátomo pontuado: 0 (ausente), 1 (alterado), 2 (normal)

**Avaliação do segmento sacral (S4-S5):**
- Sensibilidade perianal (toque leve e picada)
- Contração voluntária do esfíncter anal externo (toque retal)
- Presença de qualquer função sacral = lesão **incompleta** — implicação prognóstica fundamental

### Classificação ASIA Impairment Scale (AIS)

| Grau | Descrição | Implicação |
|---|---|---|
| A | Completa: sem função motora ou sensitiva em S4-S5 | Pior prognóstico — recuperação rara |
| B | Incompleta sensitiva: função sensitiva preservada abaixo do nível, sem função motora | Algum potencial de recuperação motora |
| C | Incompleta motora: função motora preservada abaixo do nível, > 50% dos músculos-chave com força < 3 | Recuperação funcional possível |
| D | Incompleta motora: > 50% dos músculos-chave com força ≥ 3 | Bom potencial de recuperação |
| E | Normal: função motora e sensitiva normal | Nenhum déficit permanente |

**Nível neurológico da lesão (NNL):**
Segmento mais caudal com função motora e sensitiva normais bilateralmente. Exemplo: C6 = função normal em C5 e acima, déficit em C7 e abaixo.

### Reflexo Bulbocavernoso

- Contração do esfíncter anal ao apertar a glande ou tracionar o cateter vesical
- Ausência imediatamente após o trauma: **choque medular** — período de arreflexia temporária após lesão aguda
- Retorno do reflexo bulbocavernoso: fim do choque medular (horas a dias)
- **Após o retorno do reflexo**: se ausência de função motora e sensitiva → lesão completa definitiva (prognóstico ruim)
- **Antes do retorno**: não é possível classificar definitivamente como lesão completa

## 4. Síndromes Medulares Incompletas

Lesões que poupam parcialmente a medula, com padrões neurológicos distintos e prognósticos variáveis.

### Síndrome do Cordão Central (Central Cord Syndrome)

**A mais comum das síndromes medulares incompletas (50%).**

**Mecanismo:** hiperextensão cervical em canal estreito (espondilótico) → compressão da medula pelo ligamento amarelo dobrado posteriormente + osteófitos anteriores. Mais comum em idosos com espondilose cervical prévia — trauma de baixa energia (queda).

**Padrão clínico:**
- Fraqueza desproporcionalmente maior nos membros superiores que nos inferiores (as fibras corticoespinais para os MMSS são mais centrais)
- Disfunção vesical (retenção urinária — bexiga neurogênica)
- Graus variáveis de déficit sensitivo abaixo do nível

**Prognóstico:** melhor entre as síndromes medulares — 75-90% recuperam a deambulação.

**Tratamento:** descompressão cirúrgica precoce em casos com compressão documentada na RM.

### Síndrome do Cordão Anterior (Anterior Cord Syndrome)

**Mecanismo:** lesão da artéria espinal anterior ou compressão anterior da medula por fragmento ósseo, hérnia de disco ou hematoma.

**Padrão clínico:**
- Perda de função motora (trato corticoespinal anterior)
- Perda de dor e temperatura (trato espinotalâmico anterior)
- **Preservação de propriocepção e vibração** (cordão posterior intacto — artérias espinais posteriores)

**Prognóstico:** pior entre as síndromes incompletas — apenas 10-20% recuperam função motora útil. A preservação da propriocepção é o sinal mais favorável.

### Síndrome de Brown-Séquard

**Mecanismo:** hemisecção medular — trauma penetrante (PAF, FAB) ou fratura-luxação unilateral.

**Padrão clínico (ipsilateral à lesão):**
- Perda de força motora (trato corticoespinal — ipsilateral)
- Perda de propriocepção e vibração (cordão posterior — ipsilateral)

**Padrão clínico (contralateral à lesão):**
- Perda de dor e temperatura (trato espinotalâmico — cruza 1-2 segmentos acima antes de ascender)

**Prognóstico:** melhor de todas as síndromes — 90% recuperam deambulação funcional.

### Síndrome do Cordão Posterior (Posterior Cord Syndrome)

**Rara.**

**Mecanismo:** lesão seletiva dos cordões posteriores — extensão extrema, compressão posterior.

**Padrão clínico:**
- Perda de propriocepção e vibração ipsilateral
- **Preservação de força motora e sensibilidade dolorosa**
- Ataxia sensitiva (marcha instável por falta de propriocepção)

### Síndrome de Cauda Equina

**Não é lesão medular** — é lesão das raízes nervosas abaixo de L2 no canal vertebral.

**Mecanismo:** hérnia de disco lombar massiva, fratura de L1-L2 com retropulsão de fragmento, tumor.

**Padrão clínico:**
- Dor lombar com irradiação para ambas as pernas (polirradiculopatia)
- Fraqueza flácida e arreflexia (neurônio motor inferior) — bilateral e assimétrica
- Anestesia em sela (períneo, escroto/lábios, face interna das coxas — dermátomos S3-S5)
- Disfunção vesical e intestinal (retenção ou incontinência)
- Disfunção erétil

**Urgência cirúrgica:** descompressão em < 24-48h — cada hora de compressão agrava o déficit permanente.

**Diferença com lesão medular:** flácida + arreflexia (NMI) vs. espástica + hiper-reflexia (NMS após choque medular).

## 5. Avaliação Primária — Coluna no ATLS

### Imobilização Cervical

**Indicação:** qualquer mecanismo com potencial de lesão cervical até que seja feito o clearance.

**Técnica de imobilização correta:**
1. Estabilização manual bimanual imediata — antes de qualquer outro procedimento
2. Aplicação do colar cervical do tamanho correto (distância clavícula-mento)
3. Completar com imobilizador lateral de cabeça + prancha rígida

**Colar cervical isolado:** NÃO imobiliza completamente a coluna cervical — permite movimentação residual de 30-45%. Deve ser sempre complementado.

**Paciente agitado:** o colar pode aumentar a agitação e piorar a situação — mantenha estabilização manual bimanual.

**Manuseio da via aérea com colar:**
- Abra a porção anterior do colar para laringoscopia
- Mantenha estabilização manual bimanual por um assistente durante toda a IOT
- Videolaringoscópio: primeira escolha — minimiza extensão cervical

### Log-Roll — Exame do Dorso

- Manobra de rolamento em bloco: mantém alinhamento de toda a coluna
- Equipe de 4 pessoas: um na cabeça (líder), dois no tronco, um nos membros inferiores
- O líder coordena e protege a coluna cervical
- Examine o dorso: palpe todas as apófises espinhosas — dor focal, degrau, deformidade → suspeita de fratura

### Avaliação Neurológica Inicial

- GCS
- Força dos quatro membros (escala 0-5)
- Sensibilidade dos quatro membros (toque leve e picada)
- Reflexo bulbocavernoso
- Tônus do esfíncter anal (toque retal)
- Nível sensitivo: dermátomo mais caudal com sensibilidade normal

**Priapismo:** ereção involuntária persistente por perda do tônus simpático → sinal de lesão medular cervical ou torácica alta.

## 6. Clearance Cervical

### Critérios NEXUS

Imagem cervical NÃO necessária se **todos** os critérios presentes:
- Sem dor na linha média cervical posterior
- Sem déficit neurológico focal
- Glasgow 15 (completamente alerta)
- Sem intoxicação por álcool ou drogas
- Sem lesão dolorosa distratora

Sensibilidade: 99,6% para lesão cervical clinicamente significativa.

### Canadian C-Spine Rule

Imagem NÃO necessária se:
- Sem fator de alto risco (idade ≥ 65 anos, mecanismo perigoso, parestesias)
- Com fator de baixo risco presente
- Capaz de rotar ativamente o pescoço 45° para cada lado

Sensibilidade: 99,4%; especificidade superior ao NEXUS.

### Imagem Cervical

**TC cervical (C0-T1):**
- Indicada quando NEXUS ou Canadian C-Spine são positivos
- Sensibilidade 98-100% para fraturas clinicamente significativas
- Substituiu a série radiográfica simples nos centros de trauma

**RM cervical:**
- Indicada em: déficit neurológico sem fratura na TC, suspeita de lesão ligamentar, contusão medular, hematoma epidural espinal
- Padrão para avaliação de compressão medular antes de decisão cirúrgica

**Paciente inconsciente:**
- TC cervical normal: maioria dos protocolos aceita retirar o colar
- RM: adiciona sensibilidade para lesão ligamentar — use quando mecanismo de alto risco com TC normal

## 7. Classificação das Fraturas

### Fraturas Cervicais

**C1 (Jefferson):**
- Fratura em quatro partes do anel do atlas por carga axial (mergulho, queda sobre a cabeça)
- TC: alargamento das massas laterais do C1 além das bordas do C2
- Regra de Spence: soma do deslocamento lateral > 7 mm → ruptura do ligamento transverso → instável
- Tratamento: halo vest (imobilização rígida) se estável; fusão C1-C2 se instável

**C2 — Fratura do Processo Odontoide:**
- Tipo I: ápice do odontoide — estável, tratamento conservador
- Tipo II: base do odontoide — mais comum, instável, alto risco de não-união → cirurgia (parafuso anterior ou fusão C1-C2)
- Tipo III: atravessa o corpo de C2 — geralmente estável, halo vest

**C2 — Fratura do Enforcado (Hangman's Fracture):**
- Fratura bilateral dos pedículos de C2 por hiperextensão + compressão axial (colisão frontal, queda)
- Geralmente sem déficit neurológico (o canal se expande com a fratura)
- Tratamento: halo vest se estável; cirurgia se instável ou com déficit

**C3-C7 — Fraturas e Luxações:**

**Fratura em gota de lágrima (teardrop):**
- Flexão + compressão axial → fragmento ântero-inferior do corpo vertebral
- Alta incidência de LRM — lesão de todas as três colunas
- Instável: cirurgia de emergência

**Fratura em cunha (compressão):**
- Compressão anterior do corpo vertebral
- Estável se coluna média e posterior intactas
- Tratamento: ortose rígida

**Fratura-luxação:**
- Ruptura de todas as três colunas — altamente instável
- Luxação unilateral de faceta: rotação + flexão → encaixe de uma faceta articular
- Luxação bilateral de faceta: flexão pura → deslocamento anterior > 50% do corpo vertebral → lesão medular frequente
- Tratamento: redução (tração cervical + halo) + estabilização cirúrgica

### Fraturas Toracolombares

**Classificação AO Spine (2013 — revisão 2022):**

**Tipo A — Compressão:**
- A0: processo espinhoso ou transverso sem instabilidade
- A1: impactação de um platô (cuneiforme)
- A2: fratura coronal do corpo
- A3: burst parcial (um platô + comprometimento da parede posterior)
- A4: burst completo (dois platôs + parede posterior)

**Tipo B — Distração (tensão posterior ou anterior):**
- B1: ruptura ligamentar posterior (Chance ligamentar)
- B2: fratura posterior com distração (Chance óssea)
- B3: hiperextensão com lesão anterior

**Tipo C — Translação/Rotação:**
- Deslocamento em qualquer plano — altamente instável
- Alta incidência de LRM

**Fratura de Chance:**
- Fratura horizontal que atravessa o corpo, pedículos e apófises espinhosas em um único nível
- Mecanismo: hiperflexão com pivô no cinto de segurança abdominal (colisão frontal)
- Associada a: lesão de víscera oca (25-40%), síndrome do cinto de segurança
- Tratamento: cirurgia se instável, ortose se estável

### TLICS — Thoracolumbar Injury Classification and Severity Score

Sistema de pontuação para decisão cirúrgica:

| Parâmetro | Pontos |
|---|---|
| Morfologia da fratura: compressão | 1 |
| Morfologia: burst | 2 |
| Morfologia: translação/rotação | 3 |
| Morfologia: distração | 4 |
| Integridade do complexo ligamentar posterior: intacto | 0 |
| Suspeito/indeterminado | 2 |
| Rompido | 3 |
| Status neurológico: intacto | 0 |
| Radiculopatia | 1 |
| Lesão medular incompleta | 2 |
| Lesão medular completa | 2 |
| Síndrome de cauda equina | 3 |

- **TLICS ≤ 3**: tratamento conservador
- **TLICS = 4**: cirurgia ou conservador (decisão individualizada)
- **TLICS ≥ 5**: cirurgia indicada

## 8. Manejo do Choque Neurogênico

### Definição e Fisiopatologia

Hipotensão por perda do tônus simpático vasomotor em lesão medular acima de T6 — interrupção das vias simpáticas descendentes.

**Diferença do choque hemorrágico:**

| Parâmetro | Hemorrágico | Neurogênico |
|---|---|---|
| Frequência cardíaca | Taquicardia | Bradicardia ou normocardia |
| Pele (abaixo da lesão) | Fria, pálida, úmida | Quente, rosada, seca |
| Pressão de pulso | Reduzida | Normal ou aumentada |
| Veias jugulares | Colabadas | Normais ou distendidas |
| Priapismo | Ausente | Presente |

**Atenção:** choque hemorrágico e neurogênico frequentemente coexistem no politraumatizado — exclua hemorragia antes de atribuir hipotensão exclusivamente à lesão medular.

### Tratamento

**1. Excluir e tratar hemorragia:**
- FAST + exame clínico
- Reposição volêmica criteriosa: 1-2L cristaloide — evite hiper-hidratação (edema medular)

**2. Vasopressores — meta de PAM:**
- **Meta: PAM ≥ 85-90 mmHg por 7 dias** (AO Spine 2023) — perfusão medular adequada na fase aguda
- **Norepinefrina** (noradrenalina): primeira linha — agonista α₁ (vasoconstrição) + β₁ (inotropia leve)
- **Fenilefrina**: agonista α₁ puro — útil quando a taquicardia é indesejável; pode causar bradicardia reflexa
- **Dopamina**: alternativa em bradicardia associada — agonista dopaminérgico + β₁

**3. Bradicardia:**
- FC < 50 bpm com instabilidade: atropina 0,5-1 mg IV
- Refratária à atropina: marca-passo transcutâneo temporário
- FC < 40 bpm em repouso é aceitável se assintomático em lesão cervical alta — o coração é inervado por T1-T4, que pode estar comprometido

**4. Monitorização:**
- Cateter arterial invasivo: monitorização contínua da PA batimento a batimento
- Cateter venoso central: administração de vasopressores + monitorização da PVC
- Débito urinário: ≥ 0,5 mL/kg/h — meta de perfusão renal

## 9. Manejo Cirúrgico

### Princípios Gerais

**Objetivos da cirurgia:**
1. Descompressão neurológica — liberar a pressão sobre a medula ou raízes
2. Estabilização — prevenir movimentação que agrave a lesão
3. Mobilização precoce — reduzir complicações do imobilismo

### Timing Cirúrgico

**Descompressão precoce (< 24h):**
- LRM incompleta com compressão medular documentada na RM
- Evidência crescente: cirurgia em < 24h melhora os desfechos neurológicos (estudo STASCIS, Spine 2012)
- LRM completa: benefício menos claro, mas cirurgia precoce facilita reabilitação

**Urgência cirúrgica imediata:**
- Síndrome de cauda equina: descompressão em < 24-48h
- Luxação irredutível com déficit progressivo
- Fratura instável com deterioração neurológica aguda

**Cirurgia não urgente (dias):**
- Fratura estável sem déficit
- Fratura instável sem déficit após estabilização clínica

### Acesso Cirúrgico

**Cervical anterior:**
- Discectomia + fusão (ACDF): lesão de disco com compressão anterior + fratura com retropulsão de fragmento
- Corpectomia: compressão por fragmento de corpo vertebral

**Cervical posterior:**
- Laminectomia + fusão: compressão posterior, fratura-luxação, instabilidade ligamentar multissegmentar

**Toracolombar posterior:**
- Fixação pedicular (parafusos pediculares + barras): padrão para a maioria das fraturas instáveis
- Laminectomia: descompressão do canal

## 10. Complicações Agudas da Lesão Medular

### Insuficiência Respiratória

- LRM acima de C3: paralisia do diafragma (frênico C3-C5) → apneia → IOT e ventilação mecânica imediata e permanente
- C4-C5: diafragma preservado mas músculos intercostais e abdominais paralisados → FR aumentada, volume corrente reduzido, tosse ineficaz
- Abaixo de T12: função respiratória preservada

**Manejo:**
- IOT: GCS normal mas FR > 30 ou SpO₂ < 90% ou capacidade vital < 1L
- CPAP/BiPAP: evita IOT em casos limítrofes
- Fisioterapia respiratória intensiva: tosse assistida, percussão torácica, drenagem postural

### Disreflexia Autonômica

**Complicação tardia (após resolução do choque medular) em lesões ≥ T6.**

**Fisiopatologia:**
Estímulo nociceptivo abaixo do nível da lesão (bexiga distendida, fecaloma, úlcera de pressão, PAF retido) → descarga simpática maciça sem controle supraespinal → hipertensão grave + bradicardia reflexa.

**Clínica:**
- Hipertensão súbita e grave (PAS pode ultrapassar 300 mmHg)
- Bradicardia reflexa
- Cefaleia em bomba
- Sudorese e rubor acima do nível da lesão
- Pele fria e piloeréção abaixo do nível

**Tratamento:**
1. Identifique e remova o estímulo desencadeante: esvazie a bexiga (cateterismo), desimpacte o reto, remova roupa apertada
2. Posicione sentado (ortostase reduz a PA por pooling venoso)
3. Anti-hipertensivo de ação rápida: nifedipina 10 mg sublingual, nitrato tópico, captopril sublingual
4. Não trate a bradicardia — ela é reflexa e se resolve com a queda da PA

### Trombose Venosa Profunda (TVP) e TEP

- Risco muito elevado: paralisia + imobilismo + ativação inflamatória
- Profilaxia obrigatória: heparina de baixo peso molecular (enoxaparina 40 mg SC 1x/dia) — iniciar após 24-72h se sem sangramento ativo
- Filtro de VCI: quando anticoagulação é contraindicada (hemorragia intracraniana, sangramento ativo)
- Meias de compressão pneumática intermitente: complemento mecânico desde o 1º dia

### Úlceras de Pressão

- Isquemia cutânea por compressão prolongada sobre proeminências ósseas
- Prevenção desde as primeiras horas: mudança de decúbito a cada 2h, colchão pneumático, proteção de calcâneos e sacro
- LRM é o maior fator de risco para úlceras de pressão — incidência de até 80% sem prevenção adequada

### Bexiga Neurogênica

- LRM acima do cone: bexiga espástica (hiperreflexia do detrusor) — cateterismo intermitente
- LRM do cone e cauda equina: bexiga flácida (arreflexia) — cateterismo de demora ou intermitente
- Cateterismo vesical contínuo na fase aguda: monitora débito urinário + previne distensão (que pode desencadear disreflexia)

### Íleo Paralítico

- LRM torácica e cervical: paralisia do peristaltismo por perda da inervação simpática
- Sonda nasogástrica de alívio, dieta zero, procinéticos (metoclopramida)
- Nutrição enteral: iniciar precocemente assim que o íleo resolver (geralmente 48-72h)

## 11. Neuroproteção — Evidências Atuais

### Metilprednisolona — Não Recomendada

- Ensaios NASCIS II e III (1990s): sugeriram benefício modesto quando administrada em < 8h
- Reanálise crítica: metodologia questionável, benefício neurológico marginal, risco aumentado de pneumonia, sepse e hemorragia gastrointestinal
- **AO Spine 2023: não recomenda o uso rotineiro** — pode ser oferecida como opção com disclosure dos riscos, mas não é padrão de cuidado
- **ATLS 10ª edição (2018)**: removeu a metilprednisolona do protocolo

### Manutenção da PAM ≥ 85-90 mmHg

- Intervenção neuroprotetora com maior evidência atual
- AO Spine 2023: recomenda PAM ≥ 85-90 mmHg por 7 dias em LRM cervical e torácica
- Mecanismo: garante perfusão da medula edemaciada no canal rígido

### Hipotermia Terapêutica

- Ensaios preliminares: resultados promissores em lesões incompletas
- Ensaio POLAR-SPINAL em andamento
- Não recomendada rotineiramente fora de centros de pesquisa

### Células-Tronco e Terapias Biológicas

- Pesquisa ativa — sem indicação clínica estabelecida
- Ensaios fase I/II com células de Schwann, células-tronco mesenquimais e neurais em andamento

## 12. Reabilitação Precoce

### Princípios

- Mobilização precoce: reduz TVP, úlceras de pressão, contraturas e pneumonia
- Fisioterapia motora: exercícios passivos e ativos desde o 1º dia
- Fisioterapia respiratória: fundamental em lesões cervicais e torácicas altas
- Fonoaudiologia: disfagia por traqueostomia, tubos e lesão de nervos cranianos
- Terapia ocupacional: adaptações para independência funcional

### Prognóstico Neurológico

**Fatores de bom prognóstico:**
- Lesão incompleta (qualquer função abaixo do nível)
- Preservação de função sacral (S4-S5)
- Preservação de propriocepção
- Síndrome de Brown-Séquard
- Ausência de sinal de Babinski precoce
- Melhora do GCS motor nas primeiras 72h

**Fatores de mau prognóstico:**
- Lesão completa (ASIA A) — recuperação motora < 5%
- Ausência de função sacral após resolução do choque medular
- Síndrome do cordão anterior
- Nível alto (C1-C4)

## 13. Glossário

**LRM** — Lesão Raquimedular. Dano à medula espinal ou às raízes nervosas dentro do canal vertebral por trauma. Pode ser completa (ASIA A) ou incompleta (ASIA B-D).

**ASIA** — American Spinal Injury Association. Associação que desenvolveu e mantém a classificação padronizada de lesões medulares (AIS — ASIA Impairment Scale), universalmente usada.

**AIS** — ASIA Impairment Scale. Escala de classificação da lesão medular de A (completa) a E (normal). Determina o prognóstico e orienta o tratamento.

**NNL** — Nível Neurológico da Lesão. Segmento medular mais caudal com função motora e sensitiva normais bilateralmente. Define a extensão da lesão.

**AO Spine** — Arbeitsgemeinschaft für Osteosynthesefragen — Spine. Organização internacional que publica classificações e diretrizes para trauma de coluna. Classificação AO Spine de fraturas toracolombares é o padrão atual.

**TLICS** — Thoracolumbar Injury Classification and Severity Score. Sistema de pontuação para decisão cirúrgica em fraturas toracolombares baseado em morfologia, integridade ligamentar e status neurológico.

**GCS** — Glasgow Coma Scale. No trauma de coluna, avalia TCE associado e orienta a via aérea. GCS ≤ 8 → IOT.

**IOT** — Intubação Orotraqueal. Em LRM cervical acima de C4: IOT urgente por paralisia do diafragma. Videolaringoscópio é preferido para minimizar extensão cervical.

**PAM** — Pressão Arterial Média. Meta no LRM: ≥ 85-90 mmHg por 7 dias para garantir perfusão medular adequada (AO Spine 2023).

**DVE** — Derivação Ventricular Externa. No trauma de coluna, relevante quando há TCE associado com elevação de PIC.

**FAST** — Focused Assessment with Sonography in Trauma. Realizado no trauma de coluna para excluir hemorragia intraabdominal — causa frequente de hipotensão concomitante ao choque neurogênico.

**TC** — Tomografia Computadorizada. Padrão de triagem para fraturas de coluna em trauma de alta energia. Sensibilidade 98-100% para fraturas. Substituiu a série radiográfica simples.

**RM** — Ressonância Magnética. Obrigatória em déficit neurológico sem fratura na TC. Avalia lesão ligamentar, contusão medular, hematoma epidural espinal e compressão da medula.

**NEXUS** — National Emergency X-Radiography Utilization Study. Critérios clínicos de clearance cervical sem imagem. Sensibilidade 99,6%.

**Canadian C-Spine Rule** — Regra clínica canadense para clearance cervical. Especificidade superior ao NEXUS. Ambos complementares na prática.

**Reflexo bulbocavernoso** — Contração do esfíncter anal ao apertar a glande ou tracionar o cateter vesical. Ausência imediata ao trauma = choque medular. Retorno do reflexo sem função motora/sensitiva = lesão completa definitiva.

**Choque medular** — Arreflexia temporária após lesão medular aguda — não confundir com choque neurogênico (hemodinâmico). Pode durar horas a dias. Enquanto persiste, não é possível classificar definitivamente a lesão como completa.

**Choque neurogênico** — Hipotensão por perda do tônus simpático vasomotor em LRM acima de T6. Caracterizado por bradicardia + vasodilatação + hipotensão. Tratado com norepinefrina.

**Priapismo** — Ereção involuntária persistente por perda do tônus simpático. Sinal clínico de LRM cervical ou torácica alta.

**Disreflexia autonômica** — Complicação de LRM ≥ T6 após resolução do choque medular: descarga simpática maciça por estímulo nociceptivo abaixo do nível → hipertensão grave + bradicardia reflexa. Emergência hipertensiva.

**Síndrome do cordão central** — Síndrome medular incompleta mais comum: fraqueza maior em MMSS que MMII + disfunção vesical. Mecanismo: hiperextensão em canal estreito. Melhor prognóstico entre as síndromes incompletas.

**Síndrome de Brown-Séquard** — Hemisecção medular: fraqueza + perda de propriocepção ipsilateral + perda de dor/temperatura contralateral. Melhor prognóstico de todas as síndromes medulares.

**Síndrome do cordão anterior** — Perda motora + perda de dor/temperatura com preservação de propriocepção. Pior prognóstico entre as síndromes incompletas.

**Síndrome de cauda equina** — Lesão das raízes nervosas abaixo de L2: fraqueza flácida + anestesia em sela + disfunção vesical/intestinal. Urgência cirúrgica: descompressão em < 24-48h.

**Fratura de Jefferson** — Fratura em quatro partes do anel de C1 por carga axial. Instável se soma do deslocamento lateral > 7 mm (regra de Spence).

**Fratura de Chance** — Fratura horizontal que atravessa o corpo, pedículos e apófises em um nível. Mecanismo: cinto abdominal + colisão frontal. Associada a lesão de víscera oca.

**Fratura do enforcado (Hangman's)** — Fratura bilateral dos pedículos de C2 por hiperextensão + compressão axial. Geralmente sem déficit neurológico.

**NASCIS** — National Acute Spinal Cord Injury Study. Ensaios clínicos (I, II e III) que avaliaram a metilprednisolona no TCE. Resultados controversos — AO Spine 2023 não recomenda uso rotineiro.

**STASCIS** — Surgical Timing in Acute Spinal Cord Injury Study. Estudo observacional (Spine 2012) que demonstrou melhores desfechos neurológicos com descompressão cirúrgica em < 24h em LRM incompleta.

**ACDF** — Anterior Cervical Discectomy and Fusion. Discectomia cervical anterior com fusão. Técnica cirúrgica padrão para lesões de disco cervical com compressão anterior.

**TEP** — Tromboembolismo Pulmonar. Complicação potencialmente fatal da TVP em pacientes com LRM. Prevenção com heparina de baixo peso molecular + compressão pneumática.

**TVP** — Trombose Venosa Profunda. Formação de coágulo em veia profunda por imobilismo + paralisia + ativação inflamatória. Risco muito elevado em LRM.

**SpO₂** — Saturação periférica de oxigênio. Meta em LRM: ≥ 94%. Em lesões cervicais altas, monitorize continuamente — risco de apneia.

**CPAP** — Continuous Positive Airway Pressure. Pressão positiva contínua nas vias aéreas. Alternativa à IOT em LRM cervical com função respiratória limítrofe.

**Norepinefrina** — Vasopressor de primeira linha no choque neurogênico. Agonista α₁ (vasoconstrição periférica) + β₁ fraco (inotropia). Meta: PAM ≥ 85-90 mmHg.

## 14. Pontos-Chave

- Não converta lesão incompleta em completa — imobilização correta desde o APH é mandatória
- **ATLS 11ª Ed. (2025):** Restrição de movimento espinal agora é SELETIVA. No trauma PENETRANTE cervical, o colar rígido é deenfatizado — risco de atraso na via aérea supera o benefício.\n\nColar cervical isolado não imobiliza completamente — complemente com imobilizador lateral + prancha
- GCS ≤ 8 ou lesão acima de C4: IOT urgente — videolaringoscópio de primeira escolha
- Meta de PAM ≥ 85-90 mmHg por 7 dias em LRM — perfusão medular é neuroproteção (AO Spine 2023)
- Hipotensão no trauma de coluna: exclua hemorragia antes de atribuir ao choque neurogênico
- Choque neurogênico: bradicardia + vasodilatação — norepinefrina + atropina se FC < 50 bpm
- Corticosteroides não são mais recomendados rotineiramente na LRM (AO Spine 2023, ATLS 11ª Ed. 2025)
- Qualquer função abaixo do nível = lesão incompleta — prognóstico significativamente melhor
- Reflexo bulbocavernoso ausente = choque medular — não classifique como completa ainda
- Síndrome de cauda equina: urgência cirúrgica em < 24-48h — cada hora piora o déficit permanente
- Descompressão cirúrgica em < 24h em LRM incompleta com compressão: melhora desfechos neurológicos
- TLICS ≥ 5: cirurgia indicada na toracolombar. TLICS ≤ 3: conservador
- Disreflexia autonômica: identifique e remova o estímulo + anti-hipertensivo de ação rápida
- Profilaxia de TVP com HBPM: iniciar em 24-72h após controle do sangramento

## Referências

- American College of Surgeons. ATLS: Advanced Trauma Life Support, 11ª edição. 2025.\n- Gruen RL et al. Advanced trauma life support 2025: A brief review of updates. Injury. 2026;57(4):113079.
- AO Spine. Clinical Practice Guidelines for the Management of Acute Spinal Cord Injury, 2023.
- Fehlings MG et al. A Clinical Practice Guideline for the Management of Patients With Acute Spinal Cord Injury and Central Cord Syndrome. Global Spine Journal, 2017.
- Dvorak MF et al. The Influence of Time from Injury to Surgery on Motor Recovery and Length of Hospital Stay in Acute Traumatic Spinal Cord Injury (STASCIS). Spine, 2012.
- Bracken MB et al. Administration of Methylprednisolone for 24 or 48 hours in the Treatment of Acute Spinal Cord Injury (NASCIS III). JAMA, 1997.
- Vaccaro AR et al. AOSpine Thoracolumbar Spine Injury Classification System. Spine, 2013.
- Ryken TC et al. The acute cardiopulmonary management of patients with cervical spinal cord injuries. Neurosurgery, 2013.
- Consortium for Spinal Cord Medicine. Early Acute Management in Adults with Spinal Cord Injury. 2022.`,
  },
  {
    id: 'c2d5627e-3d13-4b9b-a91a-fb68f7ca57d8',
    title: 'Trauma Ocular: Avaliação e Manejo do Olho Traumatizado',
    description: 'Classificação de Birmingham, avaliação sistemática do olho traumatizado, manejo do globo aberto, hifema, descolamento de retina traumático e queimaduras oculares baseados nas diretrizes mais recentes',
    theme: 'trauma_ocular',
    type: 'article',
    content: `## 1. Introdução e Epidemiologia

O trauma ocular é uma das principais causas de cegueira monocular evitável no mundo. Estima-se que ocorram aproximadamente 55 milhões de lesões oculares por ano globalmente, das quais 1,6 milhão resultam em cegueira permanente. No Brasil, acidentes de trabalho, violência urbana e acidentes automobilísticos respondem pela maioria dos casos em serviços de emergência.

A importância do reconhecimento precoce e do manejo correto está no potencial de preservação da visão — muitas lesões, se tratadas dentro da janela terapêutica adequada, permitem recuperação funcional satisfatória. O médico não-oftalmologista que atende um politraumatizado deve ser capaz de identificar lesões que ameaçam a visão e adotar as medidas imediatas corretas antes da avaliação especializada.

### Princípios Fundamentais no Trauma Ocular

**"Primum non nocere"** aplica-se com máxima força no trauma ocular: manobras inadequadas sobre um olho com suspeita de globo aberto podem expulsar o conteúdo intraocular e resultar em perda definitiva da visão. O primeiro passo é sempre reconhecer o que não deve ser feito.

**Integração ao ATLS**: o trauma ocular raramente é a ameaça imediata à vida, mas deve ser avaliado sistematicamente na avaliação secundária de todo politraumatizado. A exceção é a queimadura química — esta constitui emergência oftalmológica que deve ser tratada imediatamente, interrompendo inclusive o ABCDE se necessário.

### Distribuição das Lesões

- **Trauma contuso**: a causa mais frequente — socos, bolas, airbag, capacetes
- **Trauma penetrante**: projéteis, estilhaços, lascas de madeira, instrumentos perfurocortantes
- **Trauma químico**: ácidos e álcalis — causa mais urgente em oftalmologia de emergência
- **Trauma por radiação**: ultravioleta (solda elétrica, neve), infravermelho, laser

---

## 2. Anatomia Funcional Aplicada ao Trauma

O entendimento das estruturas oculares é fundamental para a correlação clínica das lesões.

### Segmento Anterior
- **Conjuntiva**: mucosa que recobre a esclera e face interna das pálpebras; altamente vascularizada — hemorragias subconjuntivais são comuns e geralmente benignas
- **Córnea**: camada transparente avascular nutrida pelo humor aquoso e filme lacrimal; extremamente inervada (nervo oftálmico — V1); lesões causam dor intensa e blefaroespasmo
- **Câmara anterior**: contém humor aquoso; acúmulo de sangue = hifema; acúmulo de pus = hipópio
- **Íris e cristalino**: o cristalino pode luxar anterior ou posteriormente em traumas contusos

### Segmento Posterior
- **Vítreo**: gel que ocupa 80% do volume ocular; hemorragia vítrea causa perda visual súbita
- **Retina**: tecido neural não regenerativo; descolamento traumático é emergência cirúrgica
- **Nervo óptico**: lesão direta (avulsão, contusão) causa perda visual irreversível

### Órbita
- Cavidade óssea com paredes de espessura variável; a parede medial (lâmina papirácea do etmoide) e o assoalho (teto do seio maxilar) são as mais frágeis — fraturas por blow-out ocorrem preferencialmente aqui

---

## 3. Classificação de Birmingham (BETT)

O Birmingham Eye Trauma Terminology System (BETT) é a classificação internacional padronizada para trauma ocular, adotada pela American Academy of Ophthalmology e pelo International Society of Ocular Trauma.

### Classificação Estrutural

\`\`\`
Trauma Ocular
├── Globo Fechado (parede do globo íntegra)
│   ├── Contusão (força direta sem laceração)
│   └── Laceração lamelar (laceração parcial da parede)
└── Globo Aberto (ruptura de espessura total da parede)
    ├── Ruptura (força contusa — espessura total por pressão interna)
    └── Laceração
        ├── Penetrante (entrada sem saída)
        ├── Perfurante (entrada e saída — projétil transfixante)
        └── CEIO (Corpo Estranho Intraocular)
\`\`\`

### Ocular Trauma Score (OTS)

O OTS é uma ferramenta prognóstica validada que prediz a acuidade visual final após trauma ocular, baseada em variáveis avaliáveis na emergência:

| Variável | Pontuação |
|---|---|
| Acuidade visual inicial: sem percepção de luz (SPL) | +60 |
| Acuidade visual inicial: percepção de luz / movimento de mãos | +70 |
| Acuidade visual inicial: conta dedos a 1-3 metros | +80 |
| Acuidade visual inicial: 20/200 a 20/50 | +90 |
| Acuidade visual inicial: ≥ 20/40 | +100 |
| Ruptura de globo | -23 |
| Endoftalmite | -17 |
| Lesão perfurante | -14 |
| Descolamento de retina | -11 |
| Defeito pupilar aferente relativo (DPAR) | -10 |

**Categorias OTS e prognóstico de AV final:**

| Categoria OTS | Escore Total | SPL (%) | ≥ 20/40 (%) |
|---|---|---|---|
| 1 | 0-44 | 74 | 1 |
| 2 | 45-65 | 27 | 2 |
| 3 | 66-80 | 2 | 21 |
| 4 | 81-91 | 1 | 53 |
| 5 | 92-100 | 0 | 77 |

---

## 4. Avaliação Sistemática do Olho Traumatizado

### Anamnese Dirigida

Informações críticas que direcionam a suspeita diagnóstica:

- **Mecanismo**: velocidade do objeto, material (metálico, vegetal, químico), distância
- **Acuidade visual antes do trauma**: pré-existência de ambliopia, miopia alta, cirurgia ocular prévia (LASIK — córnea mais vulnerável; vitrectomia prévia — risco de CEIO)
- **Tempo desde o trauma**: janela para corpo estranho intraocular, risco de endoftalmite (> 24h aumenta risco)
- **Uso de EPI**: óculos de proteção, capacete com viseira
- **Uso de anticoagulantes**: impacta extensão do hifema e hemorragia vítrea

### Exame Externo — Inspeção e Palpação

**Atenção**: nunca palpe ou exerça pressão sobre o globo ocular se houver suspeita de globo aberto.

- Edema e equimose palpebral — podem ocultar lesão grave subjacente; abra as pálpebras com cuidado usando os dedos, nunca instrumentos
- Lacerações palpebrais: profundidade, envolvimento de margem palpebral, sistema lacrimal (canalículo medial)
- Proptose/enoftalmia: fratura de órbita com herniação de gordura ou músculo
- Limitação de motilidade ocular extrínseca: aprisionamento muscular (blow-out), neuropatia craniana, hematoma retrobulbar

### Avaliação da Acuidade Visual

A acuidade visual é o "sinal vital" do olho. Deve ser registrada em todo trauma ocular, mesmo que seja apenas "conta dedos" ou "percepção de luz".

- Use tabela de Snellen, tabela de bolso ou aplicativo calibrado
- Corrija com óculos habitual ou pinhole (elimina erro refrativo como variável)
- Se paciente não coopera: reflexo de piscamento à ameaça, reflexo pupilar fotomotor direto

**Importante**: acuidade visual normal não exclui lesão grave — hemovítreo precoce, CEIO posterior, descolamento de retina periférico podem ter AV inicial preservada.

### Avaliação Pupilar — Defeito Pupilar Aferente Relativo (DPAR)

O DPAR (Teste de Marcus Gunn) é o teste mais importante para avaliar a integridade do nervo óptico e da retina.

**Técnica do swinging flashlight test:**
- Ambiente levemente escuro
- Ilumine cada olho alternadamente por 2-3 segundos com lanterna brilhante
- Olho normal: pupila contrai ao receber luz
- DPAR positivo: a pupila do olho afetado **dilata** ao receber luz diretamente (porque recebe mais "sinal" quando o outro olho é iluminado)

**Significado clínico do DPAR:**
- Indica disfunção do nervo óptico ipsilateral ou lesão retiniana extensa
- DPAR positivo em trauma = lesão grave, pior prognóstico (componente do OTS)
- DPAR bilateral: não é detectável — cada olho compensa o outro

### Exame com Lâmpada de Fenda (Biomicroscopia)

Se disponível na emergência, permite avaliação detalhada:

- **Conjuntiva**: hemorragia subconjuntival, laceração, corpo estranho
- **Córnea**: abrasão (corada com fluoresceína), laceração, edema, corpo estranho embutido, teste de Seidel
- **Câmara anterior**: profundidade (rasa = suspeita de globo aberto), hifema (grau), flare e células (uveíte traumática)
- **Cristalino**: catarata traumática, luxação, alterações de cápsula

**Teste de Seidel**: instile fluoresceína 2% e observe com luz azul cobalto. Fluxo de humor aquoso diluindo a fluoresceína (sinal de cachoeira verde) confirma laceração de espessura total da córnea.

### Fundoscopia

- Direta: avaliação de disco óptico, mácula, vasos, retina central
- Indireta (com lente 20D ou 28D): avaliação de periferia retiniana — essencial para descolamento de retina periférico
- Hemorragia vítrea pode impedir a visualização — neste caso, ultrassonografia modo B é mandatória

### Ultrassonografia Ocular Modo B

Indicada quando a mídia ocular não é transparente (hemovítreo, catarata densa):
- Descolamento de retina: membrana ecogênica ancorada na papila e na ora serrata
- Corpo estranho intraocular: imagem hiperecogênica com sombra acústica
- Descolamento de coroide: configuração em "beijo" nas lesões extensas
- **Contraindicação**: suspeita de globo aberto — a pressão do transdutor pode expulsar conteúdo intraocular; use gel abundante sem pressão ou utilize o transdutor com espaçador

### Tomografia Computadorizada de Órbitas

- Padrão-ouro para corpo estranho intraocular metálico, fraturas orbitárias, hematoma retrobulbar
- Cortes finos (1 mm) em janelas óssea e de tecidos moles
- Reformatações coronais e sagitais são essenciais para avaliação de fratura de assoalho e parede medial
- **Contraindicação de RM**: suspeita de CEIO metálico — pode mobilizar o fragmento e causar lesão adicional

---

## 5. Lesões Específicas — Diagnóstico e Manejo

### 5.1 Queimadura Química Ocular — Emergência Verdadeira

O trauma químico ocular é a única condição em oftalmologia que requer tratamento imediato **antes** da avaliação diagnóstica completa. Cada minuto de contato prolongado com o agente químico aumenta a extensão da lesão.

**Fisiopatologia:**

- **Álcalis** (cal, amônia, soda cáustica, cimento): maior gravidade — saponificação de membranas lipídicas permite penetração transmembrana progressiva; pH > 11 causa lesão grave; podem atingir câmara anterior em minutos
- **Ácidos** (ácido sulfúrico, clorídrico, acético): a desnaturação proteica forma barreira que limita penetração; exceção: ácido fluorídrico — penetra como álcali

**Classificação de Roper-Hall (modificada por Dua):**

| Grau | Córnea | Limbo | Prognóstico |
|---|---|---|---|
| I | Abrasão epitelial, transparente | < 3 horas (< 1/4) | Excelente |
| II | Opacidade leve, íris visível | < 6 horas (< 1/2) | Bom |
| III | Opacidade total, detalhes da íris obscuros | 6-9 horas (1/2-3/4) | Reservado |
| IV | Opacidade total, íris e pupila invisíveis | > 9 horas (> 3/4) | Grave |

**Tratamento — protocolo imediato:**

**1. Irrigação imediata e abundante:**
- Inicie imediatamente — não espere anestésico, não espere laboratório, não espere exame
- Soro fisiológico 0,9% aquecido: ideal
- Água corrente: aceitável na ausência de SF — não retarde por falta de SF
- Volume: mínimo 2 litros por olho (alguns protocolos recomendam até 4-6 L em álcali grave)
- Duração: mínimo 30 minutos de irrigação contínua
- Evert (everta) as pálpebras superior e inferior para lavar fórnice superior e inferior — corpos estranhos sólidos (cal, cimento) devem ser varridos com swab
- Anestésico tópico (proximetacaína ou tetracaína) facilita cooperação do paciente

**2. Aferição do pH:**
- Insira papel de tornassol (ou fita de pH) no fórnice inferior após irrigação
- pH alvo: 7,0-7,4 (neutro)
- Se pH ainda anormal após 2 L: continue irrigando e reavalie a cada 15 minutos
- Atenção: aguarde 5-10 minutos após última irrigação antes de medir (efeito tampão do fluido residual)

**3. Avaliação oftalmológica após estabilização do pH:**
- Acuidade visual, grau de queimadura (Roper-Hall), pressão intraocular
- Contagem das horas de limbo envolvido é prognóstico

**4. Tratamento subsequente (guiado pelo grau):**
- Grau I-II: colírio antibiótico, lubrificante, cicloplégico (atropina 1%), vitamina C tópica e sistêmica
- Grau III-IV: adicionar corticoide tópico nas primeiras 2 semanas (reduz inflamação sem impactar cicatrização limbal neste período), ácido ascórbico 10% tópico, transplante de membrana amniótica precoce (melhora prognóstico em graus III-IV)

**5. Orientação ao paciente:**
- Graus I-II: seguimento ambulatorial em 24-48h
- Graus III-IV: internação e avaliação cirúrgica

---

### 5.2 Globo Aberto — Ruptura e Laceração de Espessura Total

**Sinais que sugerem globo aberto:**

- Acuidade visual gravemente reduzida
- Hipotonia ocular (olho "mole" à palpação gentil das pálpebras — **nunca pressione diretamente**)
- Câmara anterior rasa (íris "colada" à córnea) ou assimétrica em relação ao olho contralateral
- Deformidade do globo, prolapso uveal (tecido escuro na ferida)
- Teste de Seidel positivo
- Hifema de grau IV (câmara anterior completamente preenchida por sangue — oito ball hyphema)
- Hemorragia subconjuntival hemorrágica 360° após trauma contuso (sugere ruptura posterior oculta)

**Manejo imediato do globo aberto:**

1. **Não aplique pressão sobre o globo** — nenhuma manobra, nenhum curativo compressivo
2. **Protetor rígido ocular** (protetor de Fox ou copo de plástico rígido fixado com esparadrapo sobre a órbita — não sobre o olho): protege sem comprimir
3. **Nada por via oral** — preparação para cirurgia de urgência
4. **Antibioticoterapia profilática IV**: ciprofloxacino 400 mg IV 12/12h ou moxifloxacino 400 mg VO (em trauma penetrante, risco de endoftalmite de 3-17%)
5. **Antieméticos**: vômito aumenta pressão intraocular e pode expulsar conteúdo ocular
6. **Analgesia**: morfina ou fentanil IV — não use AINEs (efeito anticoagulante)
7. **Não remova corpo estranho**: qualquer objeto empalado deve ser imobilizado e removido em centro cirúrgico
8. **Atualização do toxoide tetânico** se necessário
9. **Transferência imediata** para serviço com oftalmologista e centro cirúrgico disponíveis

**Cirurgia primária:**
- Objetivo: restaurar integridade do globo (sutura de ferida), não recuperação visual definitiva
- Deve ser realizada idealmente em até 24 horas — após 72 horas, o risco de endoftalmite aumenta significativamente
- Via aérea: intubação preferencial a anestesia geral — evita manobra de Valsalva; succinilcolina aumenta transitoriamente a PIO (risco teórico, mas aceito em via aérea difícil)

**Corpo Estranho Intraocular (CEIO):**
- Suspeite sempre que o mecanismo envolva metal ferroso em alta velocidade (martelar, esmerilhar, tornear)
- CEIO de ferro/cobre: siderose/calcose — toxicidade progressiva para fotorreceptores mesmo sem infecção — remoção mandatória
- CEIO de vidro/plástico/ouro: relativamente inertes — decisão de remoção individualizada
- Diagnóstico: TC de órbitas (sensível para metal); RM contraindicada para metal
- Remoção: via vitrectomia posteriorou via escleral dependendo da localização

---

### 5.3 Hifema Traumático

Acúmulo de sangue na câmara anterior, geralmente proveniente de ruptura de vasos da íris ou corpo ciliar.

**Graduação (Hifema — Classificação de Shingleton):**

| Grau | Volume de Câmara Anterior Ocupado |
|---|---|
| I | < 1/3 (microhifema: eritrócitos suspensos sem nível) |
| II | 1/3 a 1/2 |
| III | 1/2 a < Total |
| IV | Total (oito ball hyphema — sangue preto) |

**Complicações:**

- **Ressangramento**: pico entre 2º e 5º dia; mais grave que sangramento inicial; risco de 5-25% sem tratamento
- **Glaucoma secundário**: obstrução trabecular por hemácias, ghost cells ou coágulo; PIO pode atingir 60 mmHg em poucas horas
- **Impregnação corneal por hemoglobina** (blood staining): ocorre em PIO elevada + endotélio comprometido; resulta em opacidade corneal permanente
- **Sinéquias anteriores e posteriores**: uveíte traumática associada

**Manejo:**

1. **Repouso relativo** com cabeceira elevada a 30-45° (sedimenta o sangue inferiormente, preservando eixo visual)
2. **Protetor ocular** (não compressivo)
3. **Ácido aminocaproico** 50 mg/kg VO 6/6h (máx 30 g/dia) por 5 dias — reduz ressangramento ao inibir fibrinólise; alternativa: ácido tranexâmico 25 mg/kg/dia VO (melhor tolerabilidade)
4. **Cicloplégico** (atropina 1% 2x/dia): reduz dor, previne sinéquias posteriores
5. **Corticoide tópico** (prednisolona 1% de hora em hora): reduz uveíte e risco de sinéquias
6. **Controle da PIO**: betabloqueador tópico (timolol 0,5%) ou inibidor de anidrase carbônica sistêmico (acetazolamida 250 mg 6/6h)
   - Atenção: pilocarpina e prostaglandinas são contraindicadas (aumentam inflamação)
7. **Evite AAS e AINEs** (aumentam ressangramento)
8. **Atenção em pacientes com traço falciforme** (HbAS) ou anemia falciforme (HbSS): hemácias falciformes obstruem trabeculado com PIO moderada (> 25 mmHg); manter PIO < 24 mmHg nestes pacientes; acetazolamida e metazolamida podem piorar acidose — preferir betabloqueador tópico

**Indicações de intervenção cirúrgica (paracentese ou lavagem de CA):**
- PIO > 60 mmHg por 2 dias (risco de atrofia óptica)
- PIO > 25 mmHg por 5 dias (risco de impregnação corneal)
- Hifema total (grau IV) por mais de 5 dias
- Ressangramento com expansão do hifema

---

### 5.4 Descolamento de Retina Traumático

O trauma contuso pode causar descolamento de retina por três mecanismos:
- **Diálise de retina**: desinserção na ora serrata (periferia retiniana) — mais comum em trauma contuso, frequentemente temporal inferior; pode ter apresentação tardia (semanas a meses)
- **Ruptura retiniana**: rasgo de cavalo ou ruptura em ferradura — tração vítrea em pontos de aderência firme
- **Descolamento por tração**: proliferação vítreo-retiniana ou hiperplasia de membrana — mais tardio

**Sintomas:**
- Fotopsias (flashes de luz) — estimulação mecânica da retina
- Corpo flutuante súbito (moscas volantes) — hemorragia vítrea ou condensação do vítreo
- Sombra ou cortina no campo visual (começa perifericamente e avança para o centro)
- Perda da acuidade visual central: descolamento macular (fóvea descolada) — emergência cirúrgica

**Classificação:**
- **Descolamento subclínico**: sem sintomas ou com sintomas mínimos, sem extensão ao polo posterior
- **Descolamento recente com mácula on**: fóvea ainda aplicada — cirurgia em até 24 horas preserva AV central
- **Descolamento com mácula off**: fóvea descolada — resultados cirúrgicos piores; menos urgente (24-72h não muda prognóstico significativamente se cronicidade < 1 semana)

**Diagnóstico:**
- Fundoscopia indireta com depressão escleral: identifica rupturas periféricas
- Ultrassonografia modo B: quando hemovítreo impede fundoscopia
- TC geralmente não detecta descolamentos — não é o exame de escolha

**Tratamento:**
- Fotocoagulação a laser ou criopexia: rupturas sem descolamento ou descolamento subclínico — "solda" a retina ao epitélio pigmentar
- Introflexão escleral (cerclagem ou plombage): cirurgia extraocular — recua a esclera para encontrar a retina
- Vitrectomia posterior (PPV): tratamento padrão atual — remoção do vítreo, alivio de tração, tamponamento com gás (SF6, C3F8) ou óleo de silicone
- Retinopexia pneumática: em rupturas únicas, superiores, sem proliferação

---

### 5.5 Fratura Orbitária — Blow-Out

Mecanismo: objeto maior que a abertura orbitária (bola de tênis, soco, airbag) comprime o globo aumentando abruptamente a pressão intraorbitária → as paredes mais frágeis cedem (assoalho e parede medial) → herniação de gordura orbitária e/ou músculo inferior para o seio maxilar.

**Clínica:**

- **Enoftalmia**: afundamento do globo na órbita (pode ser imediato ou tardio após reabsorção de edema)
- **Diplopia vertical**: músculo reto inferior aprisionado ou parestesia do nervo infraorbitário (V2) — diplopia em olhar superior é a mais característica
- **Anestesia infraorbitária**: parestesia de hemiface inferior, asa do nariz e lábio superior — lesão de nervo infraorbitário no canal infraorbitário
- **Enfisema subcutâneo palpebral e periorbital**: comunicação com seio paranasal — não assoar o nariz (aumenta enfisema e risco de celulite orbitária)
- Restrição de motilidade ocular

**Fratura em trap-door (White-Eyed Blow-Out):**
- Ocorre predominantemente em crianças (osso mais elástico)
- A fratura abre e fecha como armadilha, aprisionando o músculo reto inferior
- Clínica dramática: náuseas e vômitos por reflexo oculocardiaco, diplopia vertical grave com limitação completa de supradução, mas **sem equimose ou edema** (white-eyed)
- Emergência cirúrgica — isquemia muscular em horas; deve ser operada em até 24-48h

**Diagnóstico:**
- TC de órbitas com cortes coronais finos (1 mm): padrão-ouro; visualiza músculo herniado, extensão da fratura
- Teste de ducção forçada: diferencia aprisionamento muscular de paralisia neurogênica

**Indicações cirúrgicas:**
- Aprisionamento muscular (especialmente em crianças)
- Enoftalmia > 2 mm sintomática
- Diplopia persistente após 2 semanas (edema resolvido)
- Fratura com > 50% de assoalho comprometido (risco de enoftalmia tardia)
- Timing: 7-14 dias em adultos (edema reduzido, cirurgia mais segura); imediato em trap-door pediátrico

---

### 5.6 Neuropatia Óptica Traumática (NOT)

Lesão do nervo óptico decorrente de trauma direto ou indireto. O mecanismo indireto (forças de cisalhamento transmitidas ao canal óptico) é o mais comum — frequentemente associado a trauma de crânio na região frontal e temporal.

**Clínica:**
- Perda visual ipsilateral de graus variados (desde discromatopsia até perda total)
- DPAR positivo no olho afetado
- Fundoscopia inicialmente normal (edema de disco aparece em 4-6 semanas) ou com hemorragia de disco
- Fundo normal não exclui NOT

**Diagnóstico:**
- TC de crânio e órbitas: fraturas do canal óptico, hematoma de bainha do nervo óptico
- RM: melhor para visualizar o nervo óptico — indicada após exclusão de CEIO metálico

**Tratamento:**
- Corticoide sistêmico em altas doses: **controverso** — estudo NASCET não demonstrou benefício; guideline atual não recomenda rotineiramente, mas pode ser considerado em casos precoces (< 8h) com perda parcial
- Descompressão cirúrgica do canal óptico: indicada em fratura com fragmento compressivo documentado; resultados variáveis
- Observação: opção válida — recuperação espontânea parcial ocorre em 30-50% dos casos

---

### 5.7 Hematoma Retrobulbar — Síndrome Compartimental Orbitária

Emergência oftalmológica com janela terapêutica estreita. Sangramento no espaço retrobulbar (artéria oftálmica, veias orbitárias) gera aumento progressivo da pressão intraorbitária → compressão do nervo óptico e oclusão da artéria central da retina.

**Clínica:**
- Proptose progressiva e firme
- Quemose hemorrágica (hemorragia subconjuntival 360°)
- Oftalmoplegiaou limitação de motilidade
- PIO elevada (> 40 mmHg)
- DPAR positivo (sinal de comprometimento de nervo óptico — indica urgência máxima)
- Dor intensa

**Tratamento — Cantotomia e Cantólise Lateral:**

Se DPAR positivo e/ou PIO > 40 mmHg com diagnóstico clínico evidente: **não espere imagem — realize cantotomia lateral imediatamente**. Cada minuto conta: a retina isquêmica tolera 90-120 minutos de oclusão vascular antes de dano irreversível.

**Técnica:**
1. Anestesia local: lidocaína 2% com adrenalina no canto lateral
2. Clampe o canto lateral com hemostato por 1-2 minutos (hemostasia)
3. Incisão horizontal de 1-1,5 cm no canto lateral com tesoura (cantotomia)
4. Identifique e seccione o tendão do ramo inferior do canto lateral (cantólise inferior) — a pálpebra inferior deve ficar livre
5. Se não houver melhora: seccione também o ramo superior (cantólise superior)
6. Resultado esperado: proptose reduz, PIO cai, melhora do fluxo vascular
7. Encaminhe imediatamente para oftalmologista após o procedimento

**Medicações adjuvantes** (não substituem a cantotomia em casos graves):
- Manitol 1-2 g/kg IV em 30 minutos
- Acetazolamida 500 mg IV
- Metilprednisolona 1g IV (edema inflamatório)
- Elevação da cabeceira

---

## 6. Trauma Palpebral

### Lacerações Palpebrais

**Avaliação:**
- Profundidade: superficial (pele apenas) vs. espessura total (inclui tarso e conjuntiva)
- Envolvimento de margem palpebral: risco de entrópio/ectrópio cicatricial se mal reparado
- Canalículo lacrimal: lacerações mediais ao puncto — probe e irrigação para confirmar lesão; requer intubação com sonda de Crawford
- Levantador da pálpebra superior: ptose traumática — identificar laceração do levantador
- Gordura orbitária exposta: indica penetração do septo orbitário — investigar lesão do globo antes de fechar

**Reparo:**
- Lacerações simples da pele: sutura primária com nylon 6-0; excelente cicatrização pela vascularização
- Envolvimento de margem: reparo em camadas — conjuntiva, tarso e pele; alinhamento preciso da margem (fio de guia)
- Lesão de canalículo: intubação bicanalicular com silicone antes do fechamento; referência para oftalmoplástica
- Avulsão de grande extensão: referência cirúrgica — reconstrução complexa

---

## 7. Avaliação Especial em Contextos Específicos

### Trauma Ocular em Crianças

- **Síndrome do bebê sacudido (SBS)**: hemorragias retinianas bilaterais em múltiplas camadas são altamente específicas; reporte obrigatório; fundoscopia por oftalmologista em toda suspeita de abuso infantil
- **Trauma não acidental**: padrão de lesão inconsistente com mecanismo relatado
- Crianças com hifema: monitorize PIO de hora em hora — podem deteriorar rapidamente
- Fratura trap-door: não tem a apresentação "clássica" do adulto — suspeite em criança com diplopia e náuseas após trauma facial

### Trauma Ocular em Usuários de Lentes de Contato

- Remova lentes antes de qualquer irrigação — retêm agente químico
- Abrasões corneais em usuário de lente: risco aumentado de Pseudomonas — colírio antibiótico de amplo espectro (ciprofloxacino ou ofloxacino)
- Não prescreva anestésico tópico para uso domiciliar — impede cicatrização e causa úlcera neurotrófica

### Trauma Ocular e Anticoagulação

- Anticoagulados têm maior risco de hifema espontâneo ou ressangramento
- Reverta anticoagulação se hifema grau III-IV ou sangramento ativo ameaça visão — decisão compartilhada com cardiologista/hematologista
- Não suspenda anticoagulação por hifema grau I-II de forma rotineira

---

## 8. Rastreamento Sistematizado no Politraumatizado

Na avaliação secundária do ATLS, o exame ocular deve incluir:

| Etapa | O que avaliar |
|---|---|
| Inspeção | Edema, equimose, proptose, lacerações palpebrais, corpos estranhos visíveis |
| Acuidade visual | Tabela ou conta dedos — registre sempre |
| Pupilas | Tamanho, simetria, DPAR (swinging flashlight) |
| Motilidade | Seis posições do olhar — diplopia, limitação |
| Pressão intraocular | Palpação gentil (somente se globo aberto excluído) ou tonometria |
| Segmento anterior | Conjuntiva, córnea, CA (profundidade, sangue), cristalino |
| Fundoscopia | Direto pelo generalista; indireto pelo oftalmologista |

**Sinais de alarme que exigem avaliação oftalmológica urgente:**
- Acuidade visual < 20/200 ou conta dedos
- DPAR positivo
- Suspeita de globo aberto
- Hifema qualquer grau
- Quemose hemorrágica 360° (suspeita de hematoma retrobulbar)
- Corpo estranho intraocular
- Queimadura química (antes mesmo da avaliação — irrigar imediatamente)

---

## 9. O Que Não Fazer no Trauma Ocular

| Erro | Consequência | O que fazer |
|---|---|---|
| Pressionar o globo suspeito de aberto | Expulsão do conteúdo intraocular — perda definitiva da visão | Protetor rígido sem compressão |
| Tentar remover corpo estranho empalado | Lesão adicional, expulsão do vítreo | Imobilizar e referenciar |
| Irrigar olho com globo aberto sob pressão | Pode agravar lesão | Cirurgia primária — irrigação intraoperatória |
| Usar anestésico tópico para uso domiciliar | Úlcera neurotrófica, retardo de cicatrização | Analgesia sistêmica |
| Aplicar curativo compressivo em globo aberto | Equivale a pressionar o globo | Protetor rígido |
| Solicitar RM com suspeita de CEIO metálico | Mobilização do fragmento metálico | TC de órbitas com cortes finos |
| Atrasar irrigação em queimadura química | Piora progressiva enquanto o pH é avaliado | Irrigar imediatamente — pH depois |
| Não medir PIO em hifema | Glaucoma agudo não detectado | Tonometria ou referência oftalmológica |

---

## 10. Pontos-Chave

- Queimadura química é a única emergência oftalmológica que interrompe o ABCDE — irrigue imediatamente, avalie depois
- Nunca pressione o globo com suspeita de abertura — protetor rígido sem compressão
- O DPAR (swinging flashlight) é o "sinal vital" do nervo óptico — positivo indica lesão grave
- Hematoma retrobulbar com DPAR positivo: cantotomia lateral imediata — não espere imagem
- OTS na admissão: comunica prognóstico realista ao paciente e à família
- Fratura blow-out em criança (trap-door): cirurgia em até 24-48h — isquemia muscular é irreversível
- CEIO metálico: TC, nunca RM; siderose/calcose causam toxicidade progressiva mesmo sem infecção
- Hifema em falcêmico: meta de PIO < 24 mmHg — o trabeculado obstrui com PIO "normal"
- Descolamento com mácula on: cirurgia em até 24h — preserva acuidade visual central
- Ácido tranexâmico no hifema: reduz ressangramento com melhor tolerabilidade que aminocaproico
- Globo aberto: antibiótico IV profilático, antieméticos, analgesia — nada por via oral, bloqueio rígido

---

## Referências

- American Academy of Ophthalmology. Basic and Clinical Science Course — Section 8: External Disease and Cornea. AAO, 2023-2024.
- American Academy of Ophthalmology. Basic and Clinical Science Course — Section 12: Retina and Vitreous. AAO, 2023-2024.
- Kuhn F et al. A new classification system for ocular trauma. Ophthalmology, 1996.
- Pieramici DJ et al. A system for classifying mechanical injuries of the eye. American Journal of Ophthalmology, 1997.
- Dua HS et al. Chemical Eye Injury: Pathophysiology, Assessment and Management. Eye, 2020.
- Savar A et al. Ocular Trauma in the United States: One Year from a National Survey. Ophthalmology, 2008.
- Rubin PA, Bilyk JR, Shore JW. Orbital blow-out fractures. Ophthalmology, 1994.
- Ioannidis AS, Andreou PS. Ocular Trauma. In: Warrell DA et al (eds). Oxford Textbook of Medicine, 6ª ed. Oxford, 2020.
- International Society of Ocular Trauma. Ocular Trauma Classification Group: guidelines. 2022.
- Andreoli CM, Andreoli MT, Kloek CE, Ahuero AE, Vavvas D, Durand ML. Low rate of endophthalmitis in a large series of open globe injuries. American Journal of Ophthalmology, 2009.
- American College of Surgeons. ATLS: Advanced Trauma Life Support, 10ª edição. 2018.
- Maguire JI. Traumatic Retinal Detachment. In: Schachat AP et al. Ryan's Retina, 6ª edição. Elsevier, 2022.
- Girkin CA, McGwin G Jr, Morris R, Kuhn F. Glaucoma following penetrating ocular trauma. American Journal of Ophthalmology, 2005.`,
  },
  {
    id: 'b8b36f01-8f91-4fc9-9b52-194371b1614d',
    title: 'Trauma Ortopédico Grave na Sala de Emergência',
    description: ': Integração do ATLS 11ª edição com manejo de fraturas complexas — sequência xABCDE, controle de hemorragia exsanguinante, damage control resuscitation, classificação AO/ASIF, Gustilo-Anderson, fraturas de pelve, síndrome compartimental e lesões vasculares',
    theme: 'trauma_ortopedico',
    type: 'article',
    content: `## 1. Introdução e Epidemiologia

### 1.1 Definição de Trauma Ortopédico Grave

O trauma ortopédico grave compreende as lesões músculo-esqueléticas que comprometem a integridade estrutural e funcional do aparelho locomotor, com potencial para complicações sistêmicas significativas. Na abordagem pelo ATLS 11ª edição (2025), essas lesões são integradas desde o primeiro passo do atendimento — o controle da hemorragia exsanguinante — e não apenas na avaliação secundária. Fraturas pélvicas instáveis, diafisárias de fêmur e expostas de alto grau podem matar por choque hemorrágico muito antes de qualquer complicação respiratória ou neurológica.

### 1.2 Epidemiologia Global

| Parâmetro | Dados |
|---|---|
| Causa principal de morte | Acidentes de trânsito (50% dos traumas ortopédicos) |
| Faixa etária mais afetada | 15-44 anos (jovens adultos) |
| Taxa de incidência | 300 por 100 mil habitantes/ano (países desenvolvidos) |
| Lesão ortopédica isolada | 40-50% dos atendimentos de emergência |
| Politrauma com envolvimento ortopédico | 70-80% dos casos graves |

### 1.3 Impacto na Saúde Pública

O trauma ortopédico grave representa a 4ª causa de morte e incapacidade em pessoas entre 15 e 49 anos, com média de hospitalização de 8 a 14 dias e custos estimados entre USD 10.000 e 50.000 por caso grave. Sem manejo adequado, complicações agudas ocorrem em 15-30% dos casos: infecção (10-15%), tromboembolismo (5-10%), síndrome compartimental (2-5%) e morte (3-7% no politrauma grave).

---

## 2. A Grande Mudança: ATLS 11ª Edição e o xABCDE

### 2.1 Por Que o "X" Veio Antes do "A"

A 11ª edição do ATLS, lançada em 2025, representa a revisão mais significativa desde a criação do curso. O princípio central permanece o mesmo — *trate primeiro o que mata primeiro* — mas a sequência foi formalmente atualizada para refletir evidências militares e civis acumuladas desde a 10ª edição:

**A sequência passa de ABCDE para xABCDE.**

O "x" representa o controle imediato da **hemorragia exsanguinante externa** — o sangramento que mata em minutos, antes que qualquer intervenção de via aérea seja possível ou relevante. Pesquisa militar (TCCC — Tactical Combat Casualty Care) e evidências civis demonstraram de forma consistente que hemorragia exsanguinante de membros, virilha e pescoço mata mais rapidamente do que obstrução de via aérea em muitos contextos de trauma.

**O "x" não substitui o ABCDE — ele precede e coexiste com ele.** Em equipe, o "x" pode ser executado por um membro enquanto outro inicia o "A". Em atendimento solo, o "x" vem primeiro.

### 2.2 O Que É Hemorragia Exsanguinante

Hemorragia exsanguinante é o sangramento externo de grande volume com risco imediato de vida — aquele que, sem intervenção nos próximos 2 a 3 minutos, resulta em morte por choque circulatório irreversível. Características:

- Jato pulsátil arterial ou fluxo venoso maciço incontrolável por pressão simples
- Amputação traumática parcial ou total de membro
- Lesão penetrante em virilha, axila ou pescoço com sangramento ativo
- Sangramento de ferida extenso que impregna curativo em segundos

**Hemorragia interna** (tórax, abdome, pelve, ossos longos) **não é o foco do "x"** — é abordada no "C". O "x" é exclusivamente sobre hemorragia externa maciça controlável com intervenção imediata à beira do paciente.

### 2.3 Intervenções do "X" — Controle de Hemorragia Exsanguinante

**Torniquete:**
- Indicação: hemorragia exsanguinante de membro (coxa, perna, braço, antebraço) que não responde a pressão direta
- Aplicação: 5-7 cm proximal à lesão, sobre a roupa se necessário — velocidade supera precisão
- Aperte até o sangramento cessar completamente — dor é esperada, não é indicativo de excesso
- Registre o horário com marcador permanente no torniquete e na testa do paciente
- Torniquetes comerciais validados: CAT (Combat Application Tourniquet), SOFTT-W
- **Não remova o torniquete na cena** — reavaliação e conversão para curativo compressivo definitivo ocorrem em ambiente hospitalar
- Tempo seguro: até 2 horas (isquemia tolerada); documentar tempo de aplicação é obrigatório

**Pressão direta com curativo hemostático:**
- Lesões de junção (virilha, axila, pescoço, raiz da coxa) onde torniquete não é aplicável
- Curativos hemostáticos impregnados com caulim (QuikClot) ou quitosana (HemCon): superiores à gaze convencional
- Técnica: empacotamento da ferida (wound packing) — preencha a cavidade com gaze hemostática do fundo para a superfície, mantendo pressão firme por mínimo de 3 minutos
- Pressão direta contínua por mínimo de 5 minutos após aplicação do curativo hemostático

**Curativo compressivo (pressure dressing):**
- Após wound packing, aplique bandagem compressiva elástica para manter pressão
- Não substitui torniquete em hemorragia arterial ativa de membro

### 2.4 A Sequência xABCDE Completa no Trauma Ortopédico

\`\`\`
x — Exsanguinating Hemorrhage Control
     Torniquete | Wound Packing | Curativo Hemostático
          ↓
A — Airway (Via Aérea com Restrição Seletiva de Coluna)
     Permeabilidade | IOT se indicado | Videolaringoscopia preferencial
          ↓
B — Breathing (Ventilação e Oxigenação)
     Pneumotórax | Hemotórax | Contusão pulmonar
          ↓
C — Circulation (Circulação + Hemorragia Interna)
     Choque hemorrágico | FAST | Pelve | Damage Control Resuscitation
          ↓
D — Disability (Neurológico)
     Glasgow | Pupilas | Déficit focal | Proteção medular
          ↓
E — Exposure (Exposição)
     Avaliação ortopédica completa | Prevenção de hipotermia
\`\`\`

---

## 3. Princípios de Damage Control Resuscitation (DCR) — ATLS 11

### 3.1 A Mudança na Ressuscitação Volêmica

A 11ª edição consolida a mudança de paradigma iniciada na 10ª: **cristaloides em grandes volumes são prejudiciais no choque hemorrágico**. A ressuscitação agressiva com cristaloides antes do controle da hemorragia aumenta mortalidade e morbidade ao dilir fatores de coagulação, gerar hipotermia e piorar a coagulopatia da tríade letal.

**Protocolo atual (ATLS 11):**
- Máximo de 1 litro de cristaloide isotônico aquecido como ponte — e somente se hemoderivados não estiverem disponíveis imediatamente
- Se sem resposta ao cristaloide inicial: transfusão imediata — não insista com mais cristaloide
- Cristaloide não é substituto de hemoderivado; hemoderivado não é substituto do controle cirúrgico da hemorragia

### 3.2 Hipotensão Permissiva

O ATLS 11 formaliza a hipotensão permissiva como estratégia hemodinâmica ativa em pacientes com hemorragia não controlada:

| Cenário | Alvo de PAS |
|---|---|
| Trauma penetrante sem TCE | 80-90 mmHg |
| Trauma contuso sem TCE | 80-90 mmHg |
| Trauma com TCE associado | ≥ 100-110 mmHg (conforme idade) |
| Trauma penetrante de tronco em ressuscitação pré-cirúrgica | 50-70 mmHg (ultra-permissiva) |

**Rationale**: pressão arterial maior empurra mais coágulo frágil para fora do vaso antes que o controle cirúrgico seja obtido. A hipotensão permissiva é uma estratégia temporária — deve ser abandonada assim que o controle cirúrgico da hemorragia for alcançado.

### 3.3 Hemoderivados e Protocolo de Transfusão Maciça

- **Razão 1:1:1** (plasma fresco congelado : plaquetas : concentrado de hemácias): padrão para transfusão maciça
- **Sangue total de baixo título (Low-Titer Whole Blood — LTOWB)**: quando disponível, é preferível aos componentes separados — preserva todos os fatores de coagulação e reduz volume de transfusão
- Ative o protocolo de transfusão maciça precocemente — não espere colapso hemodinâmico irreversível
- Critérios de ativação de PTM: choque hemorrágico classe III-IV + mecanismo de alta energia + necessidade provável de > 10 unidades de CH em 24h

### 3.4 Ácido Tranexâmico (ATX)

- Dose: **1g IV em bolus em 10 minutos + 1g IV em infusão ao longo de 8 horas**
- Janela terapêutica: **primeiras 3 horas do trauma** — após 3 horas, o benefício desaparece e pode haver risco de harm
- Em TCE grave associado: **2g IV em bolus** (atualização do ATLS 11 baseada em evidências de neuroproteção)
- Indicação: qualquer trauma com hemorragia significativa ou risco de hemorragia maciça
- Mecanismo: inibe fibrinólise ao bloquear o plasminogênio — estabiliza coágulos já formados

---

## 4. Via Aérea no ATLS 11 — Mudanças Relevantes para o Trauma Ortopédico

### 4.1 Videolaringoscopia como Primeira Escolha

O ATLS 11 eleva a videolaringoscopia à condição de **ferramenta preferencial de intubação** — não mais reservada à via aérea difícil. Em trauma, a combinação de sangue, vômito, edema e instabilidade cervical torna a videolaringoscopia mais segura e com maior taxa de sucesso na primeira tentativa do que a laringoscopia direta.

### 4.2 Estabilização Hemodinâmica Antes da Intubação

Mudança importante da 11ª edição: **ressusite o choque antes de intubar quando possível**. A hipotensão peri-intubação é uma das causas mais comuns de parada cardíaca iatrogênica em trauma. Estratégias:

- Reposição com hemoderivados antes da indução quando choque hemorrágico está presente
- Vasopressor (norepinefrina) como ponte se indução for inadiável em paciente hipotenso
- Reduza doses de agentes indutores em choque grave: etomidato 0,1-0,2 mg/kg (dose reduzida) ou ketamina 0,5-1 mg/kg

### 4.3 Restrição Seletiva de Coluna Cervical

**Grande mudança do ATLS 11**: a restrição de coluna cervical passa a ser **seletiva e baseada em critérios clínicos**, não rotineira. O colar cervical rígido é **formalmente desencorajado em trauma penetrante de pescoço** e deve ser aplicado com critério no trauma contuso.

**Quando restringir movimento de coluna (critérios seletivos):**
- Trauma contuso de alta energia com dor ou sensibilidade na linha média cervical
- Déficit neurológico ou parestesias em membros após trauma
- Nível de consciência alterado (Glasgow < 14) após trauma contuso
- Mecanismo de alta energia em idoso com osteoporose conhecida

**Quando NÃO aplicar colar cervical rotineiramente:**
- Trauma penetrante de pescoço — o colar eleva PIC e não previne lesão medular em penetrante
- Paciente alerta, orientado, sem dor cervical, sem déficit neurológico
- Paciente agitado — o colar aumenta agitação e pode dificultar via aérea

**Prioridade clara**: a via aérea tem prioridade sobre a proteção cervical. Se o paciente necessita de intubação urgente, realize-a com estabilização manual bimanual — não adie por ausência de colar.

---

## 5. Avaliação Ortopédica Integrada ao xABCDE

### 5.1 O "X" Identifica — O "E" Confirma

No xABCDE, a avaliação ortopédica ocorre em dois momentos distintos:

**Durante o "X"**: identificação e controle de hemorragia exsanguinante externa de origem ortopédica (amputações, fraturas expostas com sangramento ativo, lesões de virilha por fratura pélvica)

**Durante o "E"**: avaliação ortopédica sistemática completa, bilateral, da cabeça aos pés — essa é a avaliação estruturada de todas as fraturas e lesões músculo-esqueléticas

### 5.2 Avaliação Ortopédica no "E" — Sistemática e Bilateral

1. **Inspeção visual**: deformidades óbvias, edema, equimose, ferimentos abertos, exposição óssea, amputações parciais
2. **Palpação**: crepitus, degrau ósseo, instabilidade articular — sempre comparativamente ao lado contralateral
3. **Amplitude de movimento**: ativa quando possível — com cautela em politrauma
4. **Avaliação neurovascular distal**: sensibilidade, motricidade, pulsos periféricos bilaterais — **não pode ser omitida em nenhum segmento com suspeita de fratura**
5. **Avaliação compartimental**: dor desproporcional, firmeza do compartimento, parestesias — ativa o protocolo de síndrome compartimental

### 5.3 Sequência de Diagnóstico por Imagem

| Situação | Prioridade | Modalidade |
|---|---|---|
| Politrauma grave instável | Urgente | FAST + Trauma Series (Pelve AP, Tórax AP) |
| Suspeita de lesão vascular | Urgente | Angiotomografia (Doppler como triagem) |
| Fratura com deformidade evidente | Urgente | Radiografias em 2 projeções |
| Avaliação de deslocamento articular | Após estabilização | TC com reconstrução 3D |
| Lesão de partes moles | Após estabilização | RNM ou ultrassom |

**Atenção ATLS 11**: evite TC no hospital primário em paciente que será transferido — não retarde a transferência por exames que não mudam a conduta imediata.

---

## 6. Classificação de Fraturas Complexas

### 6.1 Classificação AO/ASIF

| Tipo | Descrição | Complexidade |
|---|---|---|
| Tipo A | Simples, extra-articular | Baixa |
| Tipo B | Simples com engajamento articular parcial | Moderada |
| Tipo C | Complexa, multifragmentar articular | Alta |

### 6.2 Classificação de Gustilo & Anderson — Fraturas Expostas

| Grau | Ferimento | Contaminação | Prognóstico |
|---|---|---|---|
| I | < 1 cm, limpo | Mínima | Excelente |
| II | 1-10 cm, sem perda tecidual | Moderada | Bom |
| III-A | > 10 cm, perda tecidual, vasculatura preservada | Alta | Comprometido |
| III-B | Grande perda tecidual, vasculatura danificada | Alta | Ruim — risco de amputação |
| III-C | Lesão vascular necessitando reparo cirúrgico | Alta | Crítico — amputação provável |

**Implicação clínica**: fraturas Gustilo III exigem antibiótico em menos de 3 horas, limpeza cirúrgica urgente e estabilização. Cada hora de atraso reduz a viabilidade tecidual e aumenta o risco de infecção em 2-3%.

---

## 7. Fraturas de Membro Superior

### 7.1 Fratura-Luxação do Ombro (Neer Complexo)

Representa 5-10% das fraturas de úmero proximal. Risco crítico: lesão da artéria axilar com pseudoaneurisma — pulso distal pode estar aparentemente preservado.

**Manejo**: tipoia + cinta de Desault; angiotomografia se suspeita vascular; ORIF se deslocamento significativo.

### 7.2 Lesão de Monteggia

Fratura do terço proximal da ulna + luxação da cabeça do rádio. 25% não são diagnosticadas no atendimento inicial por omissão da radiografia do cotovelo. ORIF obrigatório para manutenção da redução articular.

### 7.3 Fratura Diafisária de Rádio e Ulna

Deslocamento > 50% do calibre ósseo resulta em mau resultado funcional conservador. Quase 100% requerem fixação com placa compressiva. Avalie nervo interósseo anterior (flexão de polegar e indicador) e posterior (extensão de dedos). Timing ideal: primeiras 6-8 horas.

---

## 8. Fraturas de Membro Inferior

### 8.1 Fratura de Colo de Fêmur — Classificação de Garden

| Tipo | Características | Vascularização | Risco |
|---|---|---|---|
| Garden I-II | Incompleta ou sem desvio | Retrógrada (75% preservada) | Baixo |
| Garden III-IV | Completa com desvio | Comprometida (25% preservada) | Muito alto de necrose avascular |
| Basicervical | Transição colo-trocantérica | Variável | Moderado a alto |

**Alerta temporal**: redução em menos de 4 horas reduz o risco de necrose avascular em até 50%. Cada hora adicional de atraso aumenta esse risco em 2%. Em pacientes jovens com Garden III-IV: ORIF em menos de 24 horas.

### 8.2 Fratura Diafisária de Fêmur

Sangramento intramuscular pode atingir 1.000 a 1.500 mL sem ferimento externo visível. Integra frequentemente quadro de politrauma.

**Manejo fase aguda**: tração imediata com tala de Thomas, tipagem e reserva de hemoderivados, monitoramento de volemia. **Timing cirúrgico**: fixação intramedular em menos de 24 horas; em politrauma grave com instabilidade hemodinâmica, fixação externa provisória (Damage Control Orthopedics — DCO) seguida de conversão em 48-72 horas após estabilização fisiológica.

---

## 9. Fraturas de Pelve e Acetábulo

### 9.1 Classificação de Tile — Estabilidade Pélvica

| Tipo | Descrição | Perda de Sangue | Morbimortalidade |
|---|---|---|---|
| A | Estável, sem rotura do anel | 250-500 mL | < 5% |
| B | Instável rotatoriamente, estável verticalmente | 500-1.500 mL | 10-15% |
| C | Instável rotatória e verticalmente | 1.500-2.500+ mL | 30-50% |

**No xABCDE**: fraturas pélvicas instáveis com sangramento externo ativo para a virilha são abordadas no "x". O cinto pélvico como medida de controle de hemorragia interna retroperitoneal é parte do "C".

**Cinto pélvico**: nas fraturas Tile B e C, o dispositivo aplicado nos trocânteres maiores reduz o volume pélvico em 10-20% e restringe o sangramento retroperitoneal. Deve ser aplicado antes das radiografias se instabilidade pélvica for clinicamente suspeita. A demora por confirmação radiográfica em paciente instável pode ser letal.

### 9.2 Fratura de Acetábulo Complexa

Tipos mais frequentes: coluna (45%), transversa (20%), em T (15%), complexas (20%). Indicação de ORIF: deslocamento > 2 mm em pacientes jovens, instabilidade articular, envolvimento da coluna posterior. Angiotomografia prévia obrigatória — risco de lesão dos vasos ilíacos e glúteos na exposição. Timing: ORIF em 3-5 dias após o trauma.

---

## 10. Lesões Vasculares e Síndrome Compartimental

### 10.1 Triagem de Lesão Vascular — Os 6 P's

| Sinal | Descrição | Urgência |
|---|---|---|
| Pain | Dor desproporcional ao trauma | Imediata |
| Pallor | Palidez, cianose distal | Imediata |
| Pulselessness | Ausência de pulso distal | Emergência |
| Paresthesia | Parestesias, queimação | Urgente |
| Paralysis | Fraqueza ou paralisia | Emergência |
| Poikilothermia | Extremidade fria ao toque | Imediata |

**Manejo**: qualquer P positivo com ausência de pulso → angiotomografia + cirurgia vascular em menos de 30 minutos. Janela de salvamento do membro: 6-8 horas (máximo 10-12 horas em isquemia morna com perfusão retrógrada).

### 10.2 Síndrome Compartimental Aguda (SCA)

**Definição**: pressão intersticial > 30 mmHg absoluta, ou pressão diferencial (PAM diastólica menos pressão do compartimento) < 30 mmHg, comprometendo a microcirculação muscular e nervosa. Incidência: 1-10% das fraturas diafisárias de fêmur e tíbia.

**Fisiopatologia**: edema pós-traumático + sangramento intramuscular → elevação progressiva da pressão dentro do compartimento fascial fechado → oclusão capilar → isquemia muscular → necrose irreversível após 4-6 horas.

**Clínica — cinco sinais (ordem de aparecimento):**

1. **Dor desproporcional**: o sinal mais precoce e mais importante — não responde a analgésicos comuns; piora com alongamento passivo da musculatura do compartimento
2. **Pressão/tensão**: compartimento pétreo e tenso à palpação, edema progressivo e endurecido
3. **Parestesias**: em território nervoso do compartimento — sinal intermediário; indica isquemia nervosa estabelecida
4. **Palidez**: cianose ou palidez cutânea distal
5. **Pulselessness/Paralisia**: ausência de pulso e paralisia são sinais muito tardios — indicam lesão irreversível em curso

**Diagnóstico**: primariamente clínico. Manometria pela técnica de Whitesides confirma: pressão > 30 mmHg absoluta ou pressão diferencial < 30 mmHg.

**Tratamento — fasciotomia de emergência em menos de 6 horas**: padrão-ouro absoluto. Não aguarde confirmação manométrica se a suspeita clínica for forte. Fasciotomia desnecessária gera morbidade controlável; síndrome compartimental não tratada resulta em necrose muscular total e amputação. Após 8-10 horas sem descompressão, a amputação frequentemente se torna necessária.

---

## 11. Damage Control Orthopedics (DCO) vs. Early Total Care (ETC)

### 11.1 Conceito de DCO

Em paciente com a tríade letal (hipotermia + acidose + coagulopatia), a cirurgia ortopédica extensa e prolongada aumenta a mortalidade ao agravar o consumo de fatores de coagulação, aumentar a perda de calor e prolongar a hipotensão anestésica. O DCO aplica os mesmos princípios do Damage Control Surgery à ortopedia:

**Fase 1 — Controle de dano**: fixação externa provisória das fraturas (ex-fix) para controle de hemorragia e alinhamento; cobertura de feridas; cinto pélvico ou packing pré-peritoneal

**Fase 2 — UTI**: correção da tríade letal — reaquecimento, reposição de coagulopatia com hemoderivados, correção da acidose

**Fase 3 — Cirurgia definitiva**: conversão da fixação externa em intramedular ou com placa, reconstrução articular — após 48-72 horas da estabilização fisiológica

### 11.2 Critérios para DCO vs. ETC

| Parâmetro | DCO | ETC |
|---|---|---|
| ISS | > 40 | < 20 |
| Temperatura corporal | < 35°C | > 35°C |
| pH arterial | < 7,24 | > 7,3 |
| Lactato | > 2,5 mmol/L | < 2,0 mmol/L |
| Politrauma com TCE grave | Sim | Não |
| Choque refratário | Sim | Não |

---

## 12. Complicações Agudas do Trauma Ortopédico

### 12.1 Síndrome de Embolia Gordurosa (FES)

| Parâmetro | Dados |
|---|---|
| Timing | 6-72 horas; pico em 24-48 horas |
| Incidência | 0,5-7% em fraturas |
| Mecanismo | Liberação de mediadores lipídicos → bloqueio capilar microvascular |
| Mortalidade | 5-15%; até 50% se SARA instalada |

**Critérios de Gurd**: sinais maiores (dispneia, confusão, petéquias em axila e tórax); sinais menores (febre, taquicardia, hipoxemia, anemia, trombocitopenia).

**Prevenção**: fixação precoce das fraturas reduz incidência em 3-5 vezes comparada à imobilização conservadora prolongada.

### 12.2 Infecção e Osteomielite

| Tipo de Fratura | Infecção Superficial | Osteomielite | Antibiótico em |
|---|---|---|---|
| Fratura simples | 2-5% | 0,5-2% | < 6-8 horas |
| Gustilo II | 5-10% | 2-5% | < 6-8 horas |
| Gustilo III-A | 10-20% | 5-10% | < 3 horas |
| Gustilo III-B | 20-40% | 10-25% | < 2 horas |

**Protocolo antibiótico:**
- Gustilo I: cefazolina 1g IV 8/8h
- Gustilo II-III: adicionar gentamicina 5 mg/kg/dia
- Gustilo III-B com contaminação orgânica: adicionar clindamicina 600 mg IV
- Primeira dose em menos de 3 horas reduz infecção profunda em 20%

### 12.3 Tromboembolismo Venoso (TEV)

Incidência de 5-10% em fraturas de fêmur e pelve sem profilaxia. Embolia pulmonar é causa relevante de morte tardia.

**Profilaxia**: enoxaparina 40 mg SC/dia ou apixabana 2,5 mg VO 2x/dia. Iniciar em menos de 24 horas do trauma quando hemostasia cirúrgica estiver garantida. Mobilização precoce reduz TEV em 30%.

---

## 13. Algoritmo de Decisão Clínica — xABCDE no Trauma Ortopédico

\`\`\`
CHEGADA DO PACIENTE COM TRAUMA ORTOPÉDICO
                    ↓
x — HEMORRAGIA EXSANGUINANTE EXTERNA?
Jato arterial | Amputação | Sangramento incontrolável de membro
        ↙ SIM                         ↘ NÃO
CONTROLE IMEDIATO              Prossiga para A
Torniquete (membro)
Wound packing + curativo
hemostático (junção)
                    ↓
A — VIA AÉREA (restrição cervical seletiva / videolaringoscopia preferencial)
B — VENTILAÇÃO E OXIGENAÇÃO
C — CIRCULAÇÃO + HEMORRAGIA INTERNA
    FAST | Pelve AP | DCR | Cinto pélvico (Tile B-C)
    Limite cristaloide | Hemoderivados precoces | ATX < 3h
D — NEUROLÓGICO (Glasgow | Pupilas | Déficit periférico)
E — EXPOSIÇÃO (avaliação ortopédica bilateral completa)
                    ↓
        SINAIS DE ALARME ORTOPÉDICO?
Dor desproporcional | Ausência de pulso | Deformidade severa
Fratura exposta | Edema progressivo | Compartimento pétreo
        ↙ SIM                         ↘ NÃO
EMERGÊNCIA VASCULAR              Radiografias iniciais
ou COMPARTIMENTAL                (2 projeções da região)
Angiotomografia imediata         Pelve AP (politrauma)
Cirurgia vascular < 30 min
Fasciotomia < 6h (SCA)
                    ↓
          CLASSIFICAR FRATURA
    AO/ASIF | Gustilo (se exposta) | Estabilidade | Articular?
                    ↓
         ESTRATÉGIA CIRÚRGICA
    Tríade letal presente?
      ↙ SIM (DCO)              ↘ NÃO (ETC)
  Ex-fix provisório         ORIF definitivo < 24h
  UTI e correção           (fêmur, pelve, articular)
  fisiológica
  ORIF em 48-72h
\`\`\`

---

## 14. Técnicas de Imobilização de Emergência

### 14.1 Membro Superior

- **Clavícula**: tipoia simples ou enfaixamento em oito; atenção à deformidade proximal com risco vascular
- **Úmero proximal**: tipoia + cinta de Desault; se complexo, tala posterior gessada
- **Cotovelo**: imobilização em 90°; nunca forçar extensão em suspeita de fratura supracondilar (risco da artéria braquial)
- **Antebraço**: tala volar longa (axila até dedos) ou circular se fratura estável
- **Punho**: tala dorsal (extensão) ou volar (flexão) conforme deformidade

### 14.2 Membro Inferior

- **Fêmur**: **tração imediata** com tala de Thomas ou tração balanceada — reduz sangramento intramuscular em até 50% e alivia espasmo muscular
- **Tíbia**: tala posterior ou lateral; se exposta, *splitting* obrigatório — nunca gesso circular em fratura exposta
- **Tornozelo**: talas bimaleolares; não fazer gesso circular se edema severo — elevar o membro
- **Pé**: bota gessada ou imobilizador removível; avaliar pulso dorsal e tibial posterior

### 14.3 Pelve e Coluna

- **Pelve instável (Tile B-C)**: cinto pélvico nos trocânteres maiores — aplique antes da radiografia se suspeita clínica
- **Coluna cervical**: restrição seletiva (ATLS 11) — não rotineira; estabilização manual bimanual durante intubação urgente

**Alerta crítico**: nunca aplique gesso circular em edema agudo severo. Use splitting ou deixe aberto. Gesso fechado em edema agudo eleva o risco de síndrome compartimental iatrogênica em até 5 vezes.

---

## 15. Casos Clínicos

### Caso 1 — Fratura Pélvica Tile C com Instabilidade Hemodinâmica

**Apresentação**: homem de 35 anos, acidente de motocicleta de alta velocidade. FC 128 bpm, PA 80/50 mmHg, FR 28 irpm. Sem hemorragia externa visível. Deformidade pélvica ao exame. Fraturas de rádio bilateral.

**Conduta pelo xABCDE:**
- **x**: sem hemorragia exsanguinante externa → prossegue
- **A-B**: via aérea patente, SpO₂ 94% em O₂ suplementar
- **C**: choque hemorrágico classe III → FAST (livre em pelve e abdome), pelve AP confirma Tile C. **Cinto pélvico imediato.** ATX 1g IV em 10 min. Ativa PTM. Cristaloide limitado a 500 mL enquanto hemoderivados são preparados. Hipotensão permissiva PAS 80-90 mmHg. FAST abdominal: negativo — fonte pélvica retroperitoneal provável
- **DCR**: razão 1:1:1; se disponível, LTOWB
- **Decisão cirúrgica**: pH 7,21, temperatura 35,2°C, lactato 4,1 — critérios de DCO. Packing pré-peritoneal ou angioembolização. Fraturas de rádio aguardam 48-72h

### Caso 2 — Fratura Diafisária de Fêmur com Síndrome Compartimental

**Apresentação**: mulher de 42 anos, atropelamento. Fratura de fêmur direito confirmada. Quatro horas após trauma: dor desproporcional, coxa pétrea à palpação, parestesias em face anterior da coxa e joelho. Pulsos distais palpáveis.

**Conduta:**
- Suspeita alta de SCA da coxa — dor desproporcional + compartimento pétreo + parestesias (sinal intermediário)
- Pulso preservado não exclui SCA — a isquemia muscular ocorre antes da oclusão arterial
- Manometria imediata se disponível; porém suspeita clínica forte + progressão de sintomas = **fasciotomia sem aguardar confirmação**
- Paciente está na janela crítica (4h): fasciotomia agora tem taxa de salvamento > 95%
- Após fasciotomia: fixação intramedular do fêmur

---

## 16. O Que Não Fazer no Trauma Ortopédico — ATLS 11

| Erro | Consequência | Conduta Correta |
|---|---|---|
| Ignorar hemorragia exsanguinante para avaliar via aérea primeiro | Morte por exsanguinação em 2-3 min | x vem antes do A — torniquete ou wound packing imediatos |
| Infundir 2-3L de cristaloide antes de hemoderivados | Coagulopatia dilucional, hipotermia, edema pulmonar, aumento de mortalidade | Máximo 1L de cristaloide; hemoderivado precoce em razão 1:1:1 |
| Aplicar colar cervical em todo trauma penetrante de pescoço | Eleva PIC, dificulta via aérea, não previne lesão medular em penetrante | Restrição seletiva — critérios clínicos, não mecanismo isolado |
| Aguardar PA normalizar para intubar sem ressusc prévia | Parada cardíaca peri-intubação por vasodilatação do indutor em choque | Ressusc hemodinâmica antes da indução; vasopressor se inadiável |
| Remover torniquete pré-hospitalar na sala de emergência | Ressangramento, nova exsanguinação | Manter até controle definitivo em ambiente cirúrgico |
| ATX após 3 horas | Sem benefício; possível harm por estado pró-trombótico tardio | ATX apenas nas primeiras 3 horas — janela é estreita e rígida |
| Gesso circular em edema agudo severo | Síndrome compartimental iatrogênica | Splitting obrigatório ou imobilizador removível |
| Esperar manometria para fasciomizar em SCA clínica evidente | Necrose muscular irreversível e amputação | Diagnóstico clínico é suficiente — fasciotomia sem demora |
| TC no hospital primário antes de transferir paciente instável | Retardo na transferência; mortalidade aumenta com cada hora | Estabilize com xABCDE e transfira — TC no centro definitivo |
| ORIF definitivo em paciente com tríade letal | Morte intraoperatória por choque e coagulopatia | DCO: ex-fix provisório, UTI, ORIF após 48-72h |

---

## 17. Pontos-Chave — ATLS 11ª Edição no Trauma Ortopédico

- **xABCDE**: o "x" veio primeiro porque hemorragia exsanguinante mata antes da obstrução de via aérea — formalize esse raciocínio na sua prática
- **Torniquete sem hesitação**: em hemorragia exsanguinante de membro, o torniquete salva vidas — a preocupação com lesão nervosa por isquemia é secundária à morte iminente
- **Cristaloide máximo 1L**: mais cristaloide não é mais segurança — é diluição de coagulação e hipotermia; ative o PTM precoce
- **Hipotensão permissiva**: PAS 80-90 mmHg em trauma sem TCE é estratégia ativa — não meta de ressuscitação inadequada
- **ATX nas primeiras 3 horas**: a janela é estreita e o impacto é real; 2g no TCE grave
- **Videolaringoscopia preferencial**: não reserve para via aérea difícil — use como primeira escolha em trauma
- **Restrição cervical seletiva**: não é mais rotineira — aplicar por critério clínico, não por mecanismo isolado
- **Cinto pélvico em Tile B-C**: antes das radiografias se instabilidade for clinicamente suspeita
- **DCO em tríade letal**: ex-fix provisório + UTI + ORIF após 48-72h — cirurgia extensa em paciente com hipotermia, acidose e coagulopatia mata mais do que estabiliza
- **SCA é diagnóstico clínico**: dor desproporcional + compartimento pétreo justificam fasciotomia — não espere manometria se suspeita for forte
- **Fasciotomia < 6h**: salva o membro; após 8-10h sem descompressão, amputação frequentemente é inevitável
- **Gustilo III = emergência vascular**: antibiótico < 3h, limpeza < 6h, cobertura definitiva < 24h
- **Fixação precoce previne FES**: reduz embolia gordurosa em 3-5 vezes comparada à imobilização conservadora prolongada
- **Não TC no hospital primário em instável**: estabilize com xABCDE e transfira — a TC é feita no centro de trauma definitivo

---

## Referências

- American College of Surgeons Committee on Trauma. ATLS: Advanced Trauma Life Support, 11ª edição. Chicago: ACS, 2025.
- Schauer SG et al. Advanced trauma life support 2025: A brief review of updates. Injury. 2026 Feb; 57(4):113079.
- Spahn DR et al. Management of bleeding and coagulopathy following major trauma: The European guideline (STOP THE BLEED), 6ª edição. Critical Care, 2023.
- Gustilo RB, Anderson JT. Prevention of infection in the treatment of open fractures. Journal of Bone and Joint Surgery, 1976; 57(8):1081-1088.
- Tile M et al. Fractures of the Pelvis and Acetabulum. 4ª edição. Philadelphia: Wolters Kluwer, 2015.
- Roberts I et al. The CRASH-2 trial: effect of tranexamic acid in bleeding trauma patients. The Lancet, 2010; 376(9734):23-32.
- CRASH-3 Trial Collaborators. Effects of tranexamic acid on death, disability, vascular occlusive events and other morbidities in patients with acute traumatic brain injury. The Lancet, 2019; 394(10210):1713-1723.
- Pape HC et al. Damage control orthopedics in the polytrauma patient. Injury, 2002; 33(9):680-686.
- Olson SA, Glasgow RR. Acute compartment syndrome in lower extremity musculoskeletal trauma. Journal of the American Academy of Orthopaedic Surgeons, 2005; 13(7):436-444.
- Tisherman SA et al. Clinical practice guideline: management of arterial injuries in trauma. Journal of Trauma and Acute Care Surgery, 2021.
- Geerts WH et al. Prevention of venous thromboembolism. Chest, 2008; 133(6 Suppl):381S-453S.
- Srivastava K et al. Integrated Resuscitation Strategies in Orthopedic Trauma. Cureus, 2025; 17(9):e93592.
- Slobogean GP et al. Complications following young femoral neck fractures. Injury, 2015; 46(3):484-491.`,
  }
]