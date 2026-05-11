import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { THEMES, StudyTheme } from '@/services/supabaseClient'

// ─── MOCK_DIR completo — cole em DiretrizesPage.tsx ───────────────────────────

export const MOCK_DIR = [

  // ── 1. AVALIAÇÃO DA CENA ────────────────────────────────────────────────
  {
    id: 'd_ac_01',
    title: 'Segurança da Cena e Atendimento Pré-Hospitalar',
    fonte: 'PHTLS 9ª Ed. / TCCC 2023',
    resumo: 'Princípios de segurança da cena, triagem START, protocolo MARCH e decisão de transporte no ambiente pré-hospitalar.',
    tema: 'avaliacao_cena' as any,
    conteudo: [
      'Segurança da cena é a primeira prioridade absoluta — socorrista ferido vira mais uma vítima e sobrecarrega o sistema de resposta.',
      'Avalie o mnemônico CENA: Contaminação CBRN, Estrutura instável, Natureza da violência, Acidente de trânsito com tráfego não controlado.',
      'No TCCC, o mnemônico MARCH precede o ABCDE: Massive hemorrhage → Airway → Respiration → Circulation → Hypothermia.',
      'Sistema START: deambulação → respiração (FR > 30 = vermelho) → perfusão (TEC > 2s = vermelho) → neurológico (não obedece = vermelho).',
      'Ácido tranexâmico (ATX): 1g IV em 10 min + 1g em 8h — janela máxima de 3 horas; após esse prazo, pode aumentar a mortalidade.',
      'Hipotensão permissiva: PAS 80-90 mmHg em trauma penetrante sem TCE — não aplique em TCE ou lesão medular.',
      'Torniquete: 5-7 cm proximal à lesão, apertado até o sangramento CESSAR, horário anotado no próprio torniquete.',
      'Tempo na cena < 10 minutos em trauma grave — intervenções realizáveis no transporte devem ser feitas no transporte.',
      'Destino = centro de trauma mais adequado, não o hospital mais próximo — desvio inadequado mata.',
      'MIST deve ser comunicado DURANTE o transporte, não na chegada — prepare a equipe receptora antes de chegar.',
    ]
  },

  // ── 2. CINEMÁTICA DO TRAUMA ─────────────────────────────────────────────
  {
    id: 'd_ct_01',
    title: 'Cinemática do Trauma — Princípios e Padrões de Lesão',
    fonte: 'ATLS 10ª Ed. / PHTLS 9ª Ed.',
    resumo: 'Aplicação dos princípios físicos para antecipar lesões antes do exame físico — base do raciocínio cinemático.',
    tema: 'cinetica_trauma' as any,
    conteudo: [
      'EC = ½mv² — a velocidade é elevada ao quadrado: dobrar a velocidade quadruplica a energia cinética e o potencial de lesão.',
      'Em colisão veicular, 5 impactos ocorrem sequencialmente: veículo × obstáculo → ocupante × veículo → órgãos × parede → objetos soltos → colisão secundária.',
      'Ejeção do veículo aumenta a mortalidade em 6x — sempre critério de centralização em centro de trauma.',
      'Fratura de 1ª e 2ª costelas = trauma de alta energia: investigue lesão de subclávia, carótida e aorta.',
      'Fratura de costelas 10-12: investigue fígado (direita), baço (esquerda) e rins (ambos).',
      'Tríade de Don Juan (queda de altura em pé): fratura bilateral de calcâneo + fratura de compressão lombar L1-L2 + TCE.',
      'Tríade de Waddell (atropelamento): fratura de tíbia/fíbula ipsilateral + lesão de quadril/pelve contralateral + TCE.',
      'Lesão de blast: afeta preferencialmente interfaces ar-líquido — pulmão, ouvido médio e intestino.',
      'Fratura de tímpano após explosão = marcador de exposição à onda de blast → investigue lesões internas invisíveis.',
      'Objeto empalado: nunca remova no APH — pode estar tamponando hemorragia vascular letal.',
    ]
  },

  // ── 3. ATLS INICIAL ─────────────────────────────────────────────────────
  {
    id: 'd_ai_01',
    title: 'ATLS — Atendimento Inicial ao Politraumatizado',
    fonte: 'ATLS 10ª Ed. (ACS)',
    resumo: 'Sequência ABCDE, reanimação simultânea, FAST, DCR e Damage Control Surgery no politraumatizado grave.',
    tema: 'atls_inicial' as any,
    conteudo: [
      'ABCDE reflete a ordem de letalidade — trate primeiro o que mata primeiro, independentemente do diagnóstico definitivo.',
      'FAST positivo + instabilidade hemodinâmica = laparotomia de emergência imediata — não leve para TC.',
      'Damage Control Resuscitation (DCR): hipotensão permissiva + 1:1:1 (plasma:plaquetas:hemácias) + ATX nas primeiras 3h.',
      'ABC Score ≥ 2 → ativar Protocolo de Transfusão Maciça — não aguarde confirmação laboratorial.',
      'Damage Control Surgery: cirurgia abreviada (< 90 min) → UTI (correção da tríade letal) → cirurgia definitiva.',
      'Critérios para DCS: pH < 7,2, temperatura < 35°C, INR > 1,5, transfusão > 10 unidades, hipotensão refratária.',
      'Corticosteroide no TCE: aumenta a mortalidade — contraindicado (CRASH Trial, Lancet 2004).',
      'Hipotensão permissiva é contraindicada no TCE — meta PAS ≥ 100-110 mmHg conforme a faixa etária (BTF 2023).',
      'Avaliação secundária só começa após ABCDE completo e paciente estabilizado.',
      'Lactato e seu clearance (≥ 10% em 2h) são os melhores marcadores de adequação da ressuscitação.',
    ]
  },

  // ── 4. VIA AÉREA ────────────────────────────────────────────────────────
  {
    id: 'd_va_01',
    title: 'ATLS — Via Aérea e Ventilação no Trauma',
    fonte: 'ATLS 10ª Ed. / DAS Guidelines 2015',
    resumo: 'Manejo progressivo da via aérea no trauma — manobras básicas, SIR, via aérea difícil e ventilação protetora.',
    tema: 'atls_via_aerea' as any,
    conteudo: [
      'Obstrução de via aérea mata em 3-5 minutos — é a primeira prioridade absoluta do ATLS.',
      'GCS ≤ 8 = via aérea definitiva imediata — não espere deterioração adicional.',
      'Via aérea difícil prevista (LEMON positivo): acorde o plano B ANTES de paralisar — videolaringoscópio, bougie e cricotireoidostomia abertos.',
      'Pré-oxigenação adequada com máscara com reservatório por 3-5 minutos antes da SIR é obrigatória.',
      'Etomidato 0,3 mg/kg: indutor de escolha no trauma por mínimo efeito hemodinâmico.',
      'Succinilcolina: contraindicada em hipercalemia, esmagamento > 24h, queimaduras extensas > 24h e miopatias.',
      'Rocurônio 1,2 mg/kg: alternativa à succinilcolina — use sempre com sugammadex disponível.',
      'Capnografia (ETCO₂): padrão-ouro para confirmação do tubo — ETCO₂ > 20 mmHg com forma de onda confirma posição traqueal.',
      'CICO (can\'t intubate, can\'t oxygenate): cricotireoidostomia cirúrgica imediata — não perca tempo em tentativas repetidas.',
      'Ventilação protetora: volume corrente 6-8 mL/kg de peso predito — evita lesão pulmonar induzida pelo ventilador.',
    ]
  },

  // ── 5. TRAUMA DE FACE ────────────────────────────────────────────────────
  {
    id: 'd_tf_01',
    title: 'ATLS — Trauma Maxilofacial',
    fonte: 'ATLS 10ª Ed. / IATSIC 2023',
    resumo: 'Prioridades no trauma de face — via aérea, controle de hemorragia, classificação de Le Fort e urgências oftalmológicas.',
    tema: 'atls_face' as any,
    conteudo: [
      'Via aérea é a primeira prioridade no trauma de face — a lesão estética é absolutamente secundária.',
      'Hematoma retrobulbar: cantotomia lateral de emergência em até 90-120 minutos — janela para preservar a visão.',
      'Hematoma de septo nasal: drenagem imediata — sem tratamento, causa necrose da cartilagem e "nariz em sela" irreversível.',
      'Intubação nasotraqueal é contraindicada em suspeita de fratura de base de crânio — risco de inserção intracraniana.',
      'Telecanto traumático (distância intercantal > 35 mm) é sinal patognomônico de fratura NOE com avulsão do tendão cantal medial.',
      'Angioembolização da artéria maxilar interna é o padrão atual para hemorragia maxilofacial refratária ao tamponamento (IATSIC 2023).',
      'Fratura de Le Fort: mobilidade do terço médio ao segurar os dentes superiores — o nível depende do que se move junto.',
      'Fístula de LCR: confirme com β-2 transferrina — 80% fecham espontaneamente em 7-10 dias.',
      'O manejo definitivo das fraturas pode ser postergado 7-10 dias sem comprometer o resultado funcional.',
      'TC com reconstrução 3D é o padrão diagnóstico atual — radiografias simples têm papel muito limitado.',
    ]
  },

  // ── 6. TRAUMA DE PESCOÇO ────────────────────────────────────────────────
  {
    id: 'd_tp_01',
    title: 'ATLS — Trauma de Pescoço',
    fonte: 'ATLS 10ª Ed. / EAST 2023',
    resumo: 'Zonas cervicais, sinais duros e moles, BCVI, lesão esofágica e clearance cervical no trauma penetrante e contuso.',
    tema: 'atls_pescoco' as any,
    conteudo: [
      'Hematoma cervical expansivo: via aérea definitiva imediata — não aguarde obstrução completa.',
      'Sinais duros no trauma penetrante: exploração cirúrgica imediata — sem investigação adicional.',
      'Angio-TC substituiu a exploração mandatória de Zona II como avaliação inicial no paciente estável (EAST 2023).',
      'Lesão esofágica: esofagografia + esofagoscopia combinadas atingem sensibilidade > 95% — a mais frequentemente perdida.',
      'BCVI: rastreie com angio-TC em todos com fatores de risco (Denver Criteria) — AVC isquêmico em 10-58% sem tratamento.',
      'Síndrome de Horner após trauma cervical = lesão de carótida interna até que se prove o contrário.',
      'Biffl grau I-II: antiagregação com AAS; grau III: stent endovascular; grau IV: anticoagulação.',
      'NEXUS e Canadian C-Spine Rule: evitam imagem cervical em até 85% dos pacientes de baixo risco.',
      'Nunca clampee vasos cervicais cegamente — risco de lesão dos nervos vago, hipoglosso e frênico.',
      'Enfisema subcutâneo cervical: investigue sempre lesão de traqueia e esôfago.',
    ]
  },

  // ── 7. TRAUMA TORÁCICO ──────────────────────────────────────────────────
  {
    id: 'd_tt_01',
    title: 'ATLS — Trauma Torácico',
    fonte: 'ATLS 10ª Ed. / AAST 2023',
    resumo: '6 lesões que matam na avaliação primária, 6 que matam na secundária, hemotórax residual e lesão de aorta traumática.',
    tema: 'atls_toracico' as any,
    conteudo: [
      'Pneumotórax hipertensivo: diagnóstico CLÍNICO — descompressão imediata no 2º EIC linha hemiclavicular, sem aguardar imagem.',
      'Hemotórax maciço: > 1500 mL inicial ou > 200 mL/h por 4h → toracotomia de urgência.',
      'Tamponamento cardíaco: Tríade de Beck presente em apenas 30-40% — use o FAST para confirmar (sensibilidade > 95%).',
      'Tórax instável: analgesia regional reduz complicações pulmonares em 30% — bloqueio ESP ou intercostal são padrão (AAST 2023).',
      'Lesão de aorta grau III-IV: TEVAR é a primeira escolha — mortalidade 2-3% vs 10-20% da cirurgia aberta.',
      'Hemotórax residual > 500 mL: trombolítico intrapleural (alteplase 25 mg) reduz necessidade de VATS em 40% (AAST 2023).',
      'Fratura de 1ª-2ª costelas: trauma de alta energia — investigue lesão vascular de grande calibre.',
      'Fratura de costelas inferiores: investigue fígado, baço e rins — TC de abdome obrigatória.',
      'Lesão esofágica torácica: esofagografia + esofagoscopia — diagnóstico tardio causa mediastinite com mortalidade > 50%.',
      'Pneumomediastino: sempre investigue lesão de traqueia ou esôfago antes de atribuir a outra causa.',
    ]
  },

  // ── 8. CHOQUE ───────────────────────────────────────────────────────────
  {
    id: 'd_ch_01',
    title: 'ATLS — Choque no Trauma',
    fonte: 'ATLS 10ª Ed. / EAST 2023 / PROPPR / CRASH-2',
    resumo: 'Classificação do choque hemorrágico, DCR, reanimação hemostática e Damage Control Surgery.',
    tema: 'atls_choque' as any,
    conteudo: [
      'Hemorragia não controlada é a principal causa de morte evitável no trauma — controle da fonte antes da reposição.',
      'Tríade letal (hipotermia + acidose + coagulopatia): ciclo vicioso — prevenção desde o APH é mais eficaz que tratamento.',
      'Coagulopatia aguda induzida pelo trauma (CAT): presente em 25-35% dos pacientes na admissão, antes de qualquer reposição.',
      'Razão 1:1:1 (plasma:plaquetas:hemácias) reduz mortalidade em 25% vs 1:1:2 — PROPPR Trial (JAMA 2015).',
      'ATX: 1g IV nas primeiras 3 horas — janela terapêutica rigorosa; após 3h pode aumentar a mortalidade (CRASH-2).',
      'TEG/ROTEM: guia reposição específica em tempo real — superior ao coagulograma convencional.',
      'Hipotensão permissiva (PAS 80-90) em penetrante sem TCE — contraindicada em TCE, lesão medular e idosos.',
      'ABC Score ≥ 2: ative o PTM sem aguardar laboratório.',
      'Choque neurogênico: bradicardia + vasodilatação — norepinefrina + PAM ≥ 85-90 mmHg por 7 dias (AO Spine 2023).',
      'Lactato e seu clearance são os melhores marcadores de adequação da ressuscitação — meta: normalização (< 2 mmol/L).',
    ]
  },

  // ── 9. TRAUMA ABDOMINAL ─────────────────────────────────────────────────
  {
    id: 'd_ab_01',
    title: 'ATLS — Trauma Abdominal',
    fonte: 'ATLS 10ª Ed. / AAST 2023 / WSES 2023',
    resumo: 'FAST, manejo não operatório, angioembolização, packing pélvico e síndrome compartimental abdominal.',
    tema: 'atls_abdominal' as any,
    conteudo: [
      'FAST positivo + instabilidade: laparotomia imediata — não leve para TC.',
      'FAST negativo não exclui lesão retroperitoneal — pâncreas, rins, duodeno e grandes vasos não são detectados.',
      'MNO é padrão para lesões esplênicas I-III e hepáticas I-III em pacientes estáveis — taxa de sucesso > 90%.',
      'Angioembolização amplia o MNO para lesões grau IV esplênicas e hepáticas — taxa de sucesso 85-90%.',
      'Lesão de víscera oca: FAST frequentemente negativo — peritonismo progressivo é o sinal mais confiável.',
      'Sinal do cinto de segurança: pesquise fratura de Chance + lesão de víscera oca.',
      'Pós-esplenectomia: vacinar para pneumococo, Haemophilus e meningococo entre 14-28 dias do pós-operatório.',
      'Fratura pélvica instável: cinto pélvico ao nível dos trocânteres + PPP em instabilidade refratária.',
      'SCA: PIA > 20 mmHg + nova disfunção de órgão → laparotomia descompressiva obrigatória.',
      'DCS: packing + controle de contaminação (< 90 min) → UTI (24-72h) → cirurgia definitiva.',
    ]
  