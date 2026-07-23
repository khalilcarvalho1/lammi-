// src/services/content-hierarchy.ts
// Catálogo completo: 25 áreas → temas → subtemas

export interface Area {
  id: string
  label: string
  emoji: string
  cor: string
  temas: Tema[]
}

export interface Tema {
  id: string
  label: string
  subtemas: Subtema[]
}

export interface Subtema {
  id: string
  label: string
}

export const AREAS: Area[] = [
  // ── 1. Medicina Militar (LAMMI original) ───────────────────────────────────
  {
    id: 'medicina_militar',
    label: 'Medicina Militar',
    emoji: '🪖',
    cor: '#c0392b',
    temas: [
      {
        id: 'mm_avaliacao',
        label: 'Avaliação e Cinemática',
        subtemas: [
          { id: 'avaliacao_cena',  label: 'Avaliação da Cena e Atendimento Inicial' },
          { id: 'cinetica_trauma', label: 'Cinética do Trauma' },
        ]
      },
      {
        id: 'mm_atls',
        label: 'ATLS — Protocolo de Trauma',
        subtemas: [
          { id: 'atls_inicial',          label: 'Atendimento Inicial (xABCDE)' },
          { id: 'atls_via_aerea',        label: 'Via Aérea e Ventilação' },
          { id: 'atls_choque',           label: 'Choque e DCR' },
          { id: 'atls_toracico',         label: 'Trauma Torácico' },
          { id: 'atls_abdominal',        label: 'Trauma Abdominal' },
          { id: 'atls_cranioencefalico', label: 'TCE Grave' },
          { id: 'atls_coluna',           label: 'Trauma de Coluna e TRM' },
          { id: 'atls_face',             label: 'Trauma Maxilofacial' },
          { id: 'atls_pescoco',          label: 'Trauma de Pescoço' },
          { id: 'atls_genitourinario',   label: 'Trauma Genitourinário' },
        ]
      },
    ]
  },

  // ── 2. Cardiologia ─────────────────────────────────────────────────────────
  {
    id: 'cardiologia',
    label: 'Cardiologia',
    emoji: '❤️',
    cor: '#e74c3c',
    temas: [
      {
        id: 'cardio_has',
        label: 'Hipertensão Arterial',
        subtemas: [
          { id: 'has_dx',         label: 'Diagnóstico e classificação' },
          { id: 'has_tto',        label: 'Tratamento farmacológico' },
          { id: 'has_resistente', label: 'HAS resistente' },
          { id: 'has_emerg',      label: 'Emergências hipertensivas' },
          { id: 'has_gestante',   label: 'HAS na gestação' },
        ]
      },
      {
        id: 'cardio_ic',
        label: 'Insuficiência Cardíaca',
        subtemas: [
          { id: 'ic_fer',   label: 'ICFEr — diagnóstico e tratamento' },
          { id: 'ic_fep',   label: 'ICFEp — particularidades' },
          { id: 'ic_desc',  label: 'IC descompensada' },
          { id: 'ic_disp',  label: 'Dispositivos (CDI, TRC)' },
        ]
      },
      {
        id: 'cardio_sca',
        label: 'Síndromes Coronarianas',
        subtemas: [
          { id: 'sca_iamcst', label: 'IAMCST' },
          { id: 'sca_iamsst', label: 'IAMSST e Angina instável' },
          { id: 'sca_dac',    label: 'DAC estável' },
          { id: 'sca_posiam', label: 'Pós-IAM e prevenção secundária' },
        ]
      },
      {
        id: 'cardio_arritmias',
        label: 'Arritmias',
        subtemas: [
          { id: 'arr_fa',    label: 'Fibrilação atrial' },
          { id: 'arr_tsv',   label: 'TSV' },
          { id: 'arr_tv',    label: 'TV e Torsades' },
          { id: 'arr_brady', label: 'Bradiarritmias e marcapasso' },
        ]
      },
      {
        id: 'cardio_valvopatias',
        label: 'Valvopatias',
        subtemas: [
          { id: 'valv_ea', label: 'Estenose aórtica' },
          { id: 'valv_ia', label: 'Insuficiência aórtica' },
          { id: 'valv_em', label: 'Estenose mitral' },
          { id: 'valv_im', label: 'Insuficiência mitral' },
          { id: 'valv_ei', label: 'Endocardite infecciosa' },
        ]
      },
      {
        id: 'cardio_perimio',
        label: 'Pericárdio e Miocárdio',
        subtemas: [
          { id: 'peri_aguda',   label: 'Pericardite aguda' },
          { id: 'peri_tampon',  label: 'Tamponamento cardíaco' },
          { id: 'mio_dilat',    label: 'Cardiomiopatia dilatada' },
          { id: 'mio_hipertrof',label: 'CMPH' },
          { id: 'mio_amiloide', label: 'Amiloidose cardíaca' },
        ]
      },
    ]
  },

  // ── 3. Pneumologia ─────────────────────────────────────────────────────────
  {
    id: 'pneumologia',
    label: 'Pneumologia',
    emoji: '🫁',
    cor: '#3498db',
    temas: [
      {
        id: 'pneumo_dpoc',
        label: 'DPOC',
        subtemas: [
          { id: 'dpoc_dx',   label: 'Diagnóstico (GOLD)' },
          { id: 'dpoc_tto',  label: 'Tratamento escalonado' },
          { id: 'dpoc_exac', label: 'Exacerbação aguda' },
        ]
      },
      {
        id: 'pneumo_asma',
        label: 'Asma',
        subtemas: [
          { id: 'asma_dx',    label: 'Diagnóstico e classificação (GINA)' },
          { id: 'asma_tto',   label: 'Tratamento por etapas' },
          { id: 'asma_crise', label: 'Crise asmática' },
        ]
      },
      {
        id: 'pneumo_tep',
        label: 'TEP e TVP',
        subtemas: [
          { id: 'tep_dx',  label: 'Estratificação e diagnóstico' },
          { id: 'tep_tto', label: 'Anticoagulação e trombólise' },
          { id: 'tep_prof', label: 'Profilaxia de TEV' },
        ]
      },
      {
        id: 'pneumo_pna',
        label: 'Pneumonias',
        subtemas: [
          { id: 'pna_pac',  label: 'PAC — diagnóstico e tratamento' },
          { id: 'pna_pah',  label: 'PAH e PAVM' },
          { id: 'pna_asp',  label: 'Pneumonia aspirativa' },
          { id: 'pna_imuno',label: 'Pneumonia no imunossuprimido' },
        ]
      },
      {
        id: 'pneumo_tb',
        label: 'Tuberculose',
        subtemas: [
          { id: 'tb_dx',   label: 'Diagnóstico' },
          { id: 'tb_tto',  label: 'Esquema RIPE' },
          { id: 'tb_mdr',  label: 'TB multirresistente' },
          { id: 'tb_lat',  label: 'TB latente (ILTB)' },
        ]
      },
      {
        id: 'pneumo_neoplasias',
        label: 'Câncer de Pulmão',
        subtemas: [
          { id: 'cap_dx',  label: 'Diagnóstico e estadiamento' },
          { id: 'cap_tto', label: 'Tratamento' },
          { id: 'cap_nod', label: 'Nódulo pulmonar solitário' },
        ]
      },
    ]
  },

  // ── 4. Neurologia ──────────────────────────────────────────────────────────
  {
    id: 'neurologia',
    label: 'Neurologia',
    emoji: '🧠',
    cor: '#9b59b6',
    temas: [
      {
        id: 'neuro_avc',
        label: 'AVC',
        subtemas: [
          { id: 'avc_isq',  label: 'AVC isquêmico — trombólise e trombectomia' },
          { id: 'avc_hem',  label: 'AVC hemorrágico' },
          { id: 'avc_hsa',  label: 'HSA — diagnóstico e complicações' },
          { id: 'avc_prev', label: 'Prevenção primária e secundária' },
        ]
      },
      {
        id: 'neuro_epilepsia',
        label: 'Epilepsia',
        subtemas: [
          { id: 'epi_dx',  label: 'Classificação e diagnóstico' },
          { id: 'epi_tto', label: 'Anticonvulsivantes' },
          { id: 'epi_em',  label: 'Estado de mal epiléptico' },
        ]
      },
      {
        id: 'neuro_cefaleia',
        label: 'Cefaleia',
        subtemas: [
          { id: 'cef_migranea', label: 'Migrânea' },
          { id: 'cef_tensional',label: 'Cefaleia tensional' },
          { id: 'cef_salvas',   label: 'Cefaleia em salvas' },
          { id: 'cef_sec',      label: 'Cefaleia secundária — sinais de alarme' },
        ]
      },
      {
        id: 'neuro_demencia',
        label: 'Demências',
        subtemas: [
          { id: 'dem_alz',  label: 'Doença de Alzheimer' },
          { id: 'dem_vasc', label: 'Demência vascular' },
          { id: 'dem_lewy', label: 'Corpos de Lewy' },
          { id: 'dem_ccl',  label: 'Comprometimento cognitivo leve' },
        ]
      },
      {
        id: 'neuro_parkinson',
        label: 'Parkinson e Movimento',
        subtemas: [
          { id: 'park_dx',  label: 'Diagnóstico' },
          { id: 'park_tto', label: 'Tratamento' },
          { id: 'park_dif', label: 'Diagnóstico diferencial (tremor essencial)' },
        ]
      },
      {
        id: 'neuro_em',
        label: 'Esclerose Múltipla',
        subtemas: [
          { id: 'em_dx',  label: 'Diagnóstico (McDonald 2017)' },
          { id: 'em_tto', label: 'Tratamento — imunomoduladores' },
        ]
      },
    ]
  },

  // ── 5. Gastroenterologia ───────────────────────────────────────────────────
  {
    id: 'gastroenterologia',
    label: 'Gastroenterologia',
    emoji: '🍴',
    cor: '#e67e22',
    temas: [
      {
        id: 'gastro_drge',
        label: 'DRGE e Esôfago',
        subtemas: [
          { id: 'drge_dx',  label: 'Diagnóstico e tratamento' },
          { id: 'drge_be',  label: 'Esôfago de Barrett' },
          { id: 'drge_acal',label: 'Acalasia' },
        ]
      },
      {
        id: 'gastro_dup',
        label: 'Doença Ulcerosa Péptica',
        subtemas: [
          { id: 'dup_hp',   label: 'H. pylori' },
          { id: 'dup_aine', label: 'Úlcera por AINE' },
          { id: 'dup_hda',  label: 'HDA por úlcera' },
        ]
      },
      {
        id: 'gastro_dii',
        label: 'DII',
        subtemas: [
          { id: 'dii_dc',  label: 'Doença de Crohn' },
          { id: 'dii_rcu', label: 'Retocolite ulcerativa' },
        ]
      },
      {
        id: 'gastro_cirrose',
        label: 'Cirrose e Hepatopatias',
        subtemas: [
          { id: 'cirr_dx',    label: 'Diagnóstico e Child-Pugh/MELD' },
          { id: 'cirr_compl', label: 'Complicações (PBE, EH, varizes, SHR)' },
          { id: 'cirr_nafld', label: 'NAFLD/NASH' },
          { id: 'cirr_tp',    label: 'Indicação de transplante' },
        ]
      },
      {
        id: 'gastro_hepatites',
        label: 'Hepatites Virais',
        subtemas: [
          { id: 'hep_a', label: 'Hepatite A' },
          { id: 'hep_b', label: 'Hepatite B' },
          { id: 'hep_c', label: 'Hepatite C' },
        ]
      },
      {
        id: 'gastro_pancreatite',
        label: 'Pancreatite',
        subtemas: [
          { id: 'panc_ag',   label: 'Pancreatite aguda' },
          { id: 'panc_cron', label: 'Pancreatite crônica' },
          { id: 'panc_ca',   label: 'Câncer de pâncreas' },
        ]
      },
      {
        id: 'gastro_intestino',
        label: 'Intestino',
        subtemas: [
          { id: 'int_ccr',   label: 'Câncer colorretal' },
          { id: 'int_celiac',label: 'Doença celíaca' },
          { id: 'int_hdb',   label: 'Hemorragia digestiva baixa' },
          { id: 'int_sii',   label: 'SII' },
        ]
      },
    ]
  },

  // ── 6. Endocrinologia ──────────────────────────────────────────────────────
  {
    id: 'endocrinologia',
    label: 'Endocrinologia',
    emoji: '🩺',
    cor: '#f39c12',
    temas: [
      {
        id: 'endo_dm',
        label: 'Diabetes Mellitus',
        subtemas: [
          { id: 'dm_dx',    label: 'Diagnóstico e classificação' },
          { id: 'dm_tto',   label: 'Antidiabéticos e insulina' },
          { id: 'dm_cad',   label: 'CAD e EHH' },
          { id: 'dm_compl', label: 'Complicações crônicas' },
          { id: 'dm_gest',  label: 'Diabetes gestacional' },
        ]
      },
      {
        id: 'endo_tireoide',
        label: 'Tireoide',
        subtemas: [
          { id: 'tir_hipo',  label: 'Hipotireoidismo' },
          { id: 'tir_hiper', label: 'Hipertireoidismo' },
          { id: 'tir_nod',   label: 'Nódulo e câncer de tireoide' },
          { id: 'tir_crise', label: 'Crise tireotóxica e coma mixedematoso' },
        ]
      },
      {
        id: 'endo_adrenal',
        label: 'Adrenal',
        subtemas: [
          { id: 'adr_cush',    label: 'Síndrome de Cushing' },
          { id: 'adr_addison', label: 'Insuficiência adrenal' },
          { id: 'adr_feo',     label: 'Feocromocitoma' },
          { id: 'adr_conn',    label: 'Hiperaldosteronismo primário' },
        ]
      },
      {
        id: 'endo_hipofise',
        label: 'Hipófise',
        subtemas: [
          { id: 'hip_acrom', label: 'Acromegalia' },
          { id: 'hip_prol',  label: 'Prolactinoma' },
          { id: 'hip_di',    label: 'Diabetes insipidus' },
        ]
      },
      {
        id: 'endo_metabolismo',
        label: 'Metabolismo',
        subtemas: [
          { id: 'met_dislip', label: 'Dislipidemia' },
          { id: 'met_obes',   label: 'Obesidade' },
          { id: 'met_osteo',  label: 'Osteoporose' },
        ]
      },
    ]
  },

  // ── 7. Nefrologia ──────────────────────────────────────────────────────────
  {
    id: 'nefrologia',
    label: 'Nefrologia',
    emoji: '💧',
    cor: '#16a085',
    temas: [
      {
        id: 'nefro_lra',
        label: 'Lesão Renal Aguda',
        subtemas: [
          { id: 'lra_pre',   label: 'Pré-renal' },
          { id: 'lra_renal', label: 'Renal (NTA, NIA)' },
          { id: 'lra_pos',   label: 'Pós-renal' },
        ]
      },
      {
        id: 'nefro_drc',
        label: 'Doença Renal Crônica',
        subtemas: [
          { id: 'drc_dx',     label: 'Diagnóstico e estágios (KDIGO)' },
          { id: 'drc_compl',  label: 'Complicações' },
          { id: 'drc_dialise',label: 'Diálise e transplante' },
        ]
      },
      {
        id: 'nefro_glomero',
        label: 'Glomerulopatias',
        subtemas: [
          { id: 'glom_nefrotica',  label: 'Síndrome nefrótica' },
          { id: 'glom_nefritica',  label: 'Síndrome nefrítica' },
          { id: 'glom_iga',        label: 'Nefropatia por IgA' },
        ]
      },
      {
        id: 'nefro_dhe',
        label: 'Distúrbios Hidroeletrolíticos',
        subtemas: [
          { id: 'dhe_na', label: 'Sódio (hipo/hipernatremia)' },
          { id: 'dhe_k',  label: 'Potássio (hipo/hipercalemia)' },
          { id: 'dhe_ca', label: 'Cálcio e fósforo' },
        ]
      },
      {
        id: 'nefro_ab',
        label: 'Equilíbrio Ácido-Base',
        subtemas: [
          { id: 'ab_met',   label: 'Acidose e alcalose metabólica' },
          { id: 'ab_resp',  label: 'Acidose e alcalose respiratória' },
          { id: 'ab_misto', label: 'Distúrbios mistos' },
        ]
      },
      {
        id: 'nefro_litiase',
        label: 'Nefrolitíase',
        subtemas: [
          { id: 'lit_dx',  label: 'Diagnóstico' },
          { id: 'lit_tto', label: 'Tratamento e prevenção' },
        ]
      },
    ]
  },

  // ── 8. Reumatologia ────────────────────────────────────────────────────────
  {
    id: 'reumatologia',
    label: 'Reumatologia',
    emoji: '🦴',
    cor: '#c0392b',
    temas: [
      {
        id: 'reu_ar',
        label: 'Artrite Reumatoide',
        subtemas: [
          { id: 'ar_dx',  label: 'Diagnóstico (ACR/EULAR 2010)' },
          { id: 'ar_tto', label: 'DMARDs e biológicos' },
        ]
      },
      {
        id: 'reu_les',
        label: 'LES',
        subtemas: [
          { id: 'les_dx',      label: 'Critérios diagnósticos' },
          { id: 'les_nefrite', label: 'Nefrite lúpica' },
          { id: 'les_tto',     label: 'Tratamento' },
        ]
      },
      {
        id: 'reu_espondilo',
        label: 'Espondiloartrites',
        subtemas: [
          { id: 'esp_ea',  label: 'Espondilite anquilosante' },
          { id: 'esp_aps', label: 'Artrite psoriásica' },
        ]
      },
      {
        id: 'reu_vasculites',
        label: 'Vasculites',
        subtemas: [
          { id: 'vasc_grandes',  label: 'Grandes vasos (Takayasu, ACG)' },
          { id: 'vasc_anca',     label: 'Pequenos vasos ANCA' },
        ]
      },
      {
        id: 'reu_gota',
        label: 'Gota e Cristais',
        subtemas: [
          { id: 'gota_aguda', label: 'Crise gotosa aguda' },
          { id: 'gota_cron',  label: 'Profilaxia e hiperuricemia' },
        ]
      },
    ]
  },

  // ── 9. Infectologia ────────────────────────────────────────────────────────
  {
    id: 'infectologia',
    label: 'Infectologia',
    emoji: '🦠',
    cor: '#27ae60',
    temas: [
      {
        id: 'inf_hiv',
        label: 'HIV/AIDS',
        subtemas: [
          { id: 'hiv_dx',   label: 'Diagnóstico e estágios' },
          { id: 'hiv_tarv', label: 'TARV — regimes' },
          { id: 'hiv_io',   label: 'Infecções oportunistas' },
          { id: 'hiv_prep', label: 'PrEP e PEP' },
        ]
      },
      {
        id: 'inf_sepse',
        label: 'Sepse',
        subtemas: [
          { id: 'sep_dx',  label: 'Diagnóstico (SOFA, qSOFA)' },
          { id: 'sep_tto', label: 'Bundle 1h e vasopressores' },
        ]
      },
      {
        id: 'inf_itu',
        label: 'ITU',
        subtemas: [
          { id: 'itu_baixa', label: 'Cistite' },
          { id: 'itu_alta',  label: 'Pielonefrite' },
          { id: 'itu_compl', label: 'ITU complicada e na gestação' },
        ]
      },
      {
        id: 'inf_isc',
        label: 'Infecções de Pele',
        subtemas: [
          { id: 'isc_celul',  label: 'Celulite e erisipela' },
          { id: 'isc_fasci',  label: 'Fasciíte necrotizante' },
        ]
      },
      {
        id: 'inf_dengue',
        label: 'Arboviroses',
        subtemas: [
          { id: 'arb_dengue', label: 'Dengue' },
          { id: 'arb_zika',   label: 'Zika e chikungunya' },
        ]
      },
    ]
  },

  // ── 10. Hematologia ────────────────────────────────────────────────────────
  {
    id: 'hematologia',
    label: 'Hematologia',
    emoji: '🩸',
    cor: '#c0392b',
    temas: [
      {
        id: 'hem_anemia',
        label: 'Anemias',
        subtemas: [
          { id: 'an_ferro',  label: 'Ferropriva' },
          { id: 'an_megalo', label: 'Megaloblástica' },
          { id: 'an_hemol',  label: 'Hemolítica' },
          { id: 'an_falci',  label: 'Anemia falciforme' },
        ]
      },
      {
        id: 'hem_leuc',
        label: 'Leucemias',
        subtemas: [
          { id: 'leuc_aguda', label: 'LMA e LLA' },
          { id: 'leuc_cron',  label: 'LMC e LLC' },
        ]
      },
      {
        id: 'hem_linf',
        label: 'Linfomas',
        subtemas: [
          { id: 'linf_hodg', label: 'Hodgkin' },
          { id: 'linf_nh',   label: 'Não-Hodgkin' },
        ]
      },
      {
        id: 'hem_coag',
        label: 'Coagulopatias',
        subtemas: [
          { id: 'coag_hemo', label: 'Hemofilias' },
          { id: 'coag_pti',  label: 'PTI e PTT' },
          { id: 'coag_civd', label: 'CIVD' },
        ]
      },
      {
        id: 'hem_mm',
        label: 'Mieloma Múltiplo',
        subtemas: [
          { id: 'mm_dx',  label: 'Diagnóstico' },
          { id: 'mm_tto', label: 'Tratamento' },
        ]
      },
    ]
  },

  // ── 11. Oncologia ──────────────────────────────────────────────────────────
  {
    id: 'oncologia',
    label: 'Oncologia',
    emoji: '🎗️',
    cor: '#8e44ad',
    temas: [
      {
        id: 'onc_mama',
        label: 'Câncer de Mama',
        subtemas: [
          { id: 'mama_rastreio', label: 'Rastreio e diagnóstico' },
          { id: 'mama_tto',      label: 'Tratamento por subtipo molecular' },
        ]
      },
      {
        id: 'onc_colorretal',
        label: 'Câncer Colorretal',
        subtemas: [
          { id: 'cr_rastreio', label: 'Rastreio e estadiamento' },
          { id: 'cr_tto',      label: 'Tratamento' },
        ]
      },
      {
        id: 'onc_prostata',
        label: 'Câncer de Próstata',
        subtemas: [
          { id: 'pro_rastreio', label: 'Rastreio (PSA)' },
          { id: 'pro_tto',      label: 'Tratamento' },
        ]
      },
      {
        id: 'onc_cuidados',
        label: 'Cuidados Paliativos',
        subtemas: [
          { id: 'cp_dor',    label: 'Controle da dor oncológica' },
          { id: 'cp_sintom', label: 'Controle de sintomas' },
          { id: 'cp_fim',    label: 'Cuidados de fim de vida' },
        ]
      },
    ]
  },

  // ── 12. Geriatria ──────────────────────────────────────────────────────────
  {
    id: 'geriatria',
    label: 'Geriatria',
    emoji: '👴',
    cor: '#7f8c8d',
    temas: [
      {
        id: 'ger_sindromes',
        label: 'Síndromes Geriátricas',
        subtemas: [
          { id: 'ger_quedas',   label: 'Quedas' },
          { id: 'ger_inc',      label: 'Incontinência' },
          { id: 'ger_delirium', label: 'Delirium' },
        ]
      },
      {
        id: 'ger_demencia',
        label: 'Demência',
        subtemas: [
          { id: 'ger_dem_dx',  label: 'Avaliação cognitiva' },
          { id: 'ger_dem_tto', label: 'Manejo' },
        ]
      },
      {
        id: 'ger_polifarmacia',
        label: 'Polifarmácia',
        subtemas: [
          { id: 'ger_beers', label: 'Critérios de Beers 2023' },
          { id: 'ger_stopp', label: 'STOPP/START' },
        ]
      },
      {
        id: 'ger_avaliacao',
        label: 'Avaliação Geriátrica Ampla',
        subtemas: [
          { id: 'ger_func', label: 'AVDs e AIVDs' },
          { id: 'ger_frag', label: 'Fragilidade e sarcopenia' },
        ]
      },
    ]
  },

  // ── 13. Pediatria ──────────────────────────────────────────────────────────
  {
    id: 'pediatria',
    label: 'Pediatria',
    emoji: '👶',
    cor: '#1abc9c',
    temas: [
      {
        id: 'ped_neo',
        label: 'Neonatologia',
        subtemas: [
          { id: 'neo_reanim',   label: 'Reanimação neonatal (NRP)' },
          { id: 'neo_icter',    label: 'Icterícia neonatal' },
          { id: 'neo_pre',      label: 'Prematuridade' },
          { id: 'neo_sepse',    label: 'Sepse neonatal' },
        ]
      },
      {
        id: 'ped_imuniza',
        label: 'Imunizações',
        subtemas: [
          { id: 'imun_pni', label: 'Calendário PNI' },
          { id: 'imun_esp', label: 'Situações especiais' },
        ]
      },
      {
        id: 'ped_cresce',
        label: 'Crescimento e Desenvolvimento',
        subtemas: [
          { id: 'cresce_curvas', label: 'Curvas OMS' },
          { id: 'cresce_dnpm',   label: 'Marcos do DNPM' },
          { id: 'cresce_pub',    label: 'Puberdade' },
        ]
      },
      {
        id: 'ped_inf',
        label: 'Infecções Pediátricas',
        subtemas: [
          { id: 'ped_oma',   label: 'OMA' },
          { id: 'ped_bronco',label: 'Bronquiolite' },
          { id: 'ped_crupe', label: 'Crupe' },
          { id: 'ped_exant', label: 'Exantemáticas' },
        ]
      },
      {
        id: 'ped_emerg',
        label: 'Emergências Pediátricas',
        subtemas: [
          { id: 'ped_pals',  label: 'PCR pediátrico (PALS)' },
          { id: 'ped_asma',  label: 'Asma aguda grave' },
          { id: 'ped_mening',label: 'Meningite' },
        ]
      },
    ]
  },

  // ── 14. Ginecologia ────────────────────────────────────────────────────────
  {
    id: 'ginecologia',
    label: 'Ginecologia',
    emoji: '♀️',
    cor: '#e91e63',
    temas: [
      {
        id: 'gin_ciclo',
        label: 'Ciclo Menstrual',
        subtemas: [
          { id: 'gin_sua',  label: 'Sangramento uterino anormal' },
          { id: 'gin_amen', label: 'Amenorreia' },
          { id: 'gin_sop',  label: 'SOP' },
        ]
      },
      {
        id: 'gin_climat',
        label: 'Climatério',
        subtemas: [
          { id: 'clim_dx', label: 'Diagnóstico e manifestações' },
          { id: 'clim_th', label: 'Terapia hormonal' },
        ]
      },
      {
        id: 'gin_cancer',
        label: 'Oncologia Ginecológica',
        subtemas: [
          { id: 'go_colo', label: 'Câncer de colo' },
          { id: 'go_end',  label: 'Câncer de endométrio' },
          { id: 'go_ova',  label: 'Câncer de ovário' },
        ]
      },
      {
        id: 'gin_ist',
        label: 'ISTs',
        subtemas: [
          { id: 'ist_corr', label: 'Corrimentos vaginais' },
          { id: 'ist_ulc',  label: 'Úlceras genitais' },
          { id: 'ist_dip',  label: 'DIP' },
        ]
      },
      {
        id: 'gin_anticonc',
        label: 'Anticoncepção',
        subtemas: [
          { id: 'anti_metodos', label: 'Métodos disponíveis' },
          { id: 'anti_emerg',   label: 'Anticoncepção de emergência' },
        ]
      },
    ]
  },

  // ── 15. Obstetrícia ────────────────────────────────────────────────────────
  {
    id: 'obstetricia',
    label: 'Obstetrícia',
    emoji: '🤰',
    cor: '#ad1457',
    temas: [
      {
        id: 'obs_prenatal',
        label: 'Pré-natal',
        subtemas: [
          { id: 'pn_habitual', label: 'Pré-natal de risco habitual' },
          { id: 'pn_alto',     label: 'Pré-natal de alto risco' },
          { id: 'pn_exames',   label: 'Exames de rotina' },
        ]
      },
      {
        id: 'obs_parto',
        label: 'Parto',
        subtemas: [
          { id: 'par_normal',  label: 'Mecanismos do parto' },
          { id: 'par_cesarea', label: 'Indicações de cesariana' },
          { id: 'par_inducao', label: 'Indução do parto' },
        ]
      },
      {
        id: 'obs_dheg',
        label: 'DHEG',
        subtemas: [
          { id: 'dheg_pe',    label: 'Pré-eclâmpsia' },
          { id: 'dheg_ec',    label: 'Eclâmpsia' },
          { id: 'dheg_hellp', label: 'HELLP' },
        ]
      },
      {
        id: 'obs_sangramento',
        label: 'Sangramentos',
        subtemas: [
          { id: 'sg_1tr', label: 'Aborto e gravidez ectópica' },
          { id: 'sg_2tr', label: 'Placenta prévia e DPP' },
          { id: 'sg_hpp', label: 'Hemorragia pós-parto' },
        ]
      },
    ]
  },

  // ── 16. Cirurgia Geral ─────────────────────────────────────────────────────
  {
    id: 'cirurgia',
    label: 'Cirurgia Geral',
    emoji: '🔪',
    cor: '#95a5a6',
    temas: [
      {
        id: 'cir_abdome',
        label: 'Abdome Agudo',
        subtemas: [
          { id: 'aa_apend', label: 'Apendicite aguda' },
          { id: 'aa_colec', label: 'Colecistite aguda' },
          { id: 'aa_diver', label: 'Diverticulite aguda' },
          { id: 'aa_obstr', label: 'Obstrução intestinal' },
          { id: 'aa_perf',  label: 'Perfuração de víscera oca' },
        ]
      },
      {
        id: 'cir_hernias',
        label: 'Hérnias',
        subtemas: [
          { id: 'her_ing',  label: 'Hérnia inguinal' },
          { id: 'her_inci', label: 'Hérnia incisional' },
          { id: 'her_umb',  label: 'Hérnia umbilical' },
        ]
      },
      {
        id: 'cir_biliar',
        label: 'Vias Biliares',
        subtemas: [
          { id: 'bil_colel',  label: 'Colelitíase' },
          { id: 'bil_coled',  label: 'Coledocolitíase' },
          { id: 'bil_colang', label: 'Colangite aguda' },
        ]
      },
      {
        id: 'cir_preop',
        label: 'Peri-operatório',
        subtemas: [
          { id: 'preop_risco',label: 'Avaliação de risco cirúrgico' },
          { id: 'pos_compl',  label: 'Complicações pós-operatórias' },
        ]
      },
    ]
  },

  // ── 17. Ortopedia ──────────────────────────────────────────────────────────
  {
    id: 'ortopedia',
    label: 'Ortopedia',
    emoji: '🦴',
    cor: '#34495e',
    temas: [
      {
        id: 'orto_fraturas',
        label: 'Fraturas',
        subtemas: [
          { id: 'fr_clas',  label: 'Classificação AO' },
          { id: 'fr_mmss',  label: 'MMSS comuns' },
          { id: 'fr_mmii',  label: 'MMII comuns' },
          { id: 'fr_quadril',label: 'Quadril e pelve' },
        ]
      },
      {
        id: 'orto_joelho',
        label: 'Joelho e Quadril',
        subtemas: [
          { id: 'jq_lca',     label: 'Lesão de LCA' },
          { id: 'jq_menisco', label: 'Meniscopatia' },
          { id: 'jq_artrose', label: 'Osteoartrose' },
        ]
      },
      {
        id: 'orto_coluna',
        label: 'Coluna',
        subtemas: [
          { id: 'col_lombal', label: 'Lombalgia' },
          { id: 'col_hernia', label: 'Hérnia de disco' },
        ]
      },
      {
        id: 'orto_emerg',
        label: 'Emergências Ortopédicas',
        subtemas: [
          { id: 'ort_sc',  label: 'Síndrome compartimental' },
          { id: 'ort_lux', label: 'Luxações agudas' },
        ]
      },
    ]
  },

  // ── 18. Dermatologia ───────────────────────────────────────────────────────
  {
    id: 'dermatologia',
    label: 'Dermatologia',
    emoji: '🩹',
    cor: '#d4a574',
    temas: [
      {
        id: 'der_eczemas',
        label: 'Eczemas e Psoríase',
        subtemas: [
          { id: 'ecz_atop', label: 'Dermatite atópica' },
          { id: 'ecz_cont', label: 'Dermatite de contato' },
          { id: 'pso_dx',   label: 'Psoríase' },
        ]
      },
      {
        id: 'der_cancer',
        label: 'Câncer de Pele',
        subtemas: [
          { id: 'cap_cbc', label: 'CBC' },
          { id: 'cap_cec', label: 'CEC' },
          { id: 'cap_mel', label: 'Melanoma' },
        ]
      },
      {
        id: 'der_hans',
        label: 'Hanseníase',
        subtemas: [
          { id: 'han_dx',  label: 'Diagnóstico' },
          { id: 'han_tto', label: 'Tratamento (PQT)' },
        ]
      },
    ]
  },

  // ── 19. Oftalmologia ───────────────────────────────────────────────────────
  {
    id: 'oftalmologia',
    label: 'Oftalmologia',
    emoji: '👁️',
    cor: '#2980b9',
    temas: [
      {
        id: 'oft_glauc',
        label: 'Glaucoma',
        subtemas: [
          { id: 'gl_aberto',  label: 'Ângulo aberto' },
          { id: 'gl_fechado', label: 'Ângulo fechado (urgência)' },
        ]
      },
      {
        id: 'oft_retina',
        label: 'Retinopatias',
        subtemas: [
          { id: 'ret_dm',  label: 'Retinopatia diabética' },
          { id: 'ret_has', label: 'Retinopatia hipertensiva' },
        ]
      },
      {
        id: 'oft_vermelho',
        label: 'Olho Vermelho',
        subtemas: [
          { id: 'or_conj',  label: 'Conjuntivite' },
          { id: 'or_uvei',  label: 'Uveíte' },
          { id: 'or_cerat', label: 'Ceratite' },
        ]
      },
    ]
  },

  // ── 20. Otorrino ───────────────────────────────────────────────────────────
  {
    id: 'otorrino',
    label: 'Otorrinolaringologia',
    emoji: '👂',
    cor: '#16a085',
    temas: [
      {
        id: 'orl_ouvido',
        label: 'Ouvido',
        subtemas: [
          { id: 'oma_dx',  label: 'OMA — diagnóstico e tratamento' },
          { id: 'sur_cond',label: 'Surdez condutiva' },
          { id: 'sur_neuro',label:'Surdez neurossensorial' },
        ]
      },
      {
        id: 'orl_nariz',
        label: 'Nariz e Seios',
        subtemas: [
          { id: 'rin_alerg', label: 'Rinite alérgica' },
          { id: 'sin_aguda', label: 'Sinusite aguda' },
          { id: 'epi_nasal', label: 'Epistaxe' },
        ]
      },
      {
        id: 'orl_vertigem',
        label: 'Vertigem',
        subtemas: [
          { id: 'vert_bppv',   label: 'BPPV — manobra de Epley' },
          { id: 'vert_menie',  label: 'Doença de Menière' },
          { id: 'vert_central',label: 'Vertigem central' },
        ]
      },
    ]
  },

  // ── 21. Psiquiatria ────────────────────────────────────────────────────────
  {
    id: 'psiquiatria',
    label: 'Psiquiatria',
    emoji: '🧘',
    cor: '#9b59b6',
    temas: [
      {
        id: 'psi_dep',
        label: 'Depressão',
        subtemas: [
          { id: 'dep_dx',  label: 'Diagnóstico (DSM-5)' },
          { id: 'dep_tto', label: 'Tratamento — antidepressivos' },
          { id: 'dep_res', label: 'Depressão resistente' },
        ]
      },
      {
        id: 'psi_ans',
        label: 'Ansiedade',
        subtemas: [
          { id: 'ans_tag',   label: 'TAG' },
          { id: 'ans_panic', label: 'Transtorno do pânico' },
          { id: 'ans_toc',   label: 'TOC' },
        ]
      },
      {
        id: 'psi_bipo',
        label: 'Transtorno Bipolar',
        subtemas: [
          { id: 'bipo_dx',  label: 'Tipos I e II' },
          { id: 'bipo_tto', label: 'Estabilizadores de humor' },
        ]
      },
      {
        id: 'psi_esquizo',
        label: 'Esquizofrenia',
        subtemas: [
          { id: 'esq_dx',  label: 'Diagnóstico' },
          { id: 'esq_tto', label: 'Antipsicóticos' },
        ]
      },
      {
        id: 'psi_suicidio',
        label: 'Suicídio',
        subtemas: [
          { id: 'sui_aval',  label: 'Avaliação de risco' },
          { id: 'sui_manejo',label: 'Manejo na urgência' },
        ]
      },
    ]
  },

  // ── 22. MFC ────────────────────────────────────────────────────────────────
  {
    id: 'mfc',
    label: 'Medicina de Família',
    emoji: '🏠',
    cor: '#27ae60',
    temas: [
      {
        id: 'mfc_aps',
        label: 'Atenção Primária',
        subtemas: [
          { id: 'aps_princ', label: 'Princípios da APS' },
          { id: 'aps_esf',   label: 'ESF e NASF' },
          { id: 'aps_prev4', label: 'Prevenção quaternária' },
        ]
      },
      {
        id: 'mfc_rastreio',
        label: 'Rastreio e Prevenção',
        subtemas: [
          { id: 'rast_canc', label: 'Rastreio de câncer' },
          { id: 'rast_dcnt', label: 'DCNT' },
          { id: 'imun_adult',label: 'Imunizações no adulto' },
        ]
      },
    ]
  },

  // ── 23. Emergência ─────────────────────────────────────────────────────────
  {
    id: 'emergencia',
    label: 'Emergência',
    emoji: '🚨',
    cor: '#c0392b',
    temas: [
      {
        id: 'emerg_acls',
        label: 'ACLS',
        subtemas: [
          { id: 'acls_pcr',    label: 'PCR — ritmos e manejo' },
          { id: 'acls_pospcr', label: 'Síndrome pós-PCR' },
          { id: 'acls_arr',    label: 'Arritmias na emergência' },
        ]
      },
      {
        id: 'emerg_pals',
        label: 'PALS',
        subtemas: [
          { id: 'pals_pcr',   label: 'PCR pediátrico' },
          { id: 'pals_choque',label: 'Choque na criança' },
        ]
      },
      {
        id: 'emerg_outros',
        label: 'Outras Emergências',
        subtemas: [
          { id: 'emg_choque',  label: 'Choque — tipos e manejo' },
          { id: 'emg_avc',     label: 'AVE — janela terapêutica' },
          { id: 'emg_intox',   label: 'Intoxicações' },
          { id: 'emg_anafilax',label: 'Anafilaxia' },
        ]
      },
    ]
  },

  // ── 24. UTI ────────────────────────────────────────────────────────────────
  {
    id: 'uti',
    label: 'UTI / Intensivo',
    emoji: '💊',
    cor: '#34495e',
    temas: [
      {
        id: 'uti_sepse',
        label: 'Sepse',
        subtemas: [
          { id: 'uti_sep_dx',  label: 'Diagnóstico e bundle' },
          { id: 'uti_sep_atb', label: 'Antibióticos na UTI' },
        ]
      },
      {
        id: 'uti_vm',
        label: 'Ventilação Mecânica',
        subtemas: [
          { id: 'vm_modos',  label: 'Modos e parâmetros' },
          { id: 'vm_ards',   label: 'ARDS — ventilação protetora' },
          { id: 'vm_desmame',label: 'Desmame e extubação' },
        ]
      },
      {
        id: 'uti_drogas',
        label: 'Drogas Vasoativas',
        subtemas: [
          { id: 'dva_vaso', label: 'Vasopressores' },
          { id: 'dva_ino',  label: 'Inotrópicos' },
        ]
      },
      {
        id: 'uti_suporte',
        label: 'Suporte',
        subtemas: [
          { id: 'sup_nutri',  label: 'Nutrição na UTI' },
          { id: 'sup_sedacao',label: 'Sedoanalgesia' },
        ]
      },
    ]
  },

  // ── 25. Radiologia ─────────────────────────────────────────────────────────
  {
    id: 'radiologia',
    label: 'Radiologia',
    emoji: '📷',
    cor: '#7f8c8d',
    temas: [
      {
        id: 'rad_torax',
        label: 'Tórax',
        subtemas: [
          { id: 'rx_torax', label: 'RX de tórax — interpretação' },
          { id: 'tc_torax', label: 'TC de tórax' },
        ]
      },
      {
        id: 'rad_abdome',
        label: 'Abdome',
        subtemas: [
          { id: 'us_abd',  label: 'USG abdominal' },
          { id: 'tc_abd',  label: 'TC de abdome' },
        ]
      },
      {
        id: 'rad_cranio',
        label: 'Neuroimagem',
        subtemas: [
          { id: 'tc_cran', label: 'TC de crânio na urgência' },
          { id: 'rm_cran', label: 'RM — indicações' },
        ]
      },
      {
        id: 'rad_us',
        label: 'POCUS',
        subtemas: [
          { id: 'pocus_fast',  label: 'FAST no trauma' },
          { id: 'pocus_pulm',  label: 'Ultrassom pulmonar' },
          { id: 'pocus_vasc',  label: 'POCUS vascular' },
        ]
      },
    ]
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

export function findArea(areaId: string): Area | undefined {
  return AREAS.find(a => a.id === areaId)
}

export function findTema(temaId: string): { area: Area; tema: Tema } | null {
  for (const area of AREAS) {
    const tema = area.temas.find(t => t.id === temaId)
    if (tema) return { area, tema }
  }
  return null
}

export function findSubtema(subtemaId: string): { area: Area; tema: Tema; subtema: Subtema } | null {
  for (const area of AREAS) {
    for (const tema of area.temas) {
      const subtema = tema.subtemas.find(s => s.id === subtemaId)
      if (subtema) return { area, tema, subtema }
    }
  }
  return null
}

export function getAllSubtemaIds(areaId: string): string[] {
  const area = findArea(areaId)
  if (!area) return []
  return area.temas.flatMap(t => t.subtemas.map(s => s.id))
}

export function countByArea(areaId: string, items: { theme: string }[]): number {
  const ids = getAllSubtemaIds(areaId)
  // também conta itens com theme direto de tema (LAMMI legado)
  const area = findArea(areaId)
  const temaIds = area?.temas.map(t => t.id) ?? []
  return items.filter(i => ids.includes(i.theme) || temaIds.includes(i.theme)).length
}

export function countByTema(temaId: string, items: { theme: string }[]): number {
  const found = findTema(temaId)
  if (!found) return 0
  const subIds = found.tema.subtemas.map(s => s.id)
  return items.filter(i => subIds.includes(i.theme) || i.theme === temaId).length
}