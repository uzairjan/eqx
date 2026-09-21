import { SectorItem, JobVacancy, OperationalHub, Language } from '../types';

export const SECTORS_DATA: Record<Language, SectorItem[]> = {
  pt: [
    {
      id: 'renewables',
      number: '01 //',
      title: 'Energias Renováveis',
      category: 'wind_solar',
      badge: 'GWO & ONSHORE/OFFSHORE',
      badgeColor: 'cyan',
      description: 'Implementação e suporte contínuo para parques eólicos e solares de última geração em escala europeia.',
      bulletPoints: [
        'Montagem de aerogeradores de alta potência',
        'Manutenção corretiva e preventiva de turbinas eólicas',
        'Montagem de painéis fotovoltaicos e comissionamento de parques'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCce8UCwC9YLQqCpKfxYTG29KoS8xJNStUsQF_IMCleRtjUyfZmjb9OIzzMYzsILuZuV2wOwuluzDUBFPfc94IJE8-_RpET9eVmE1Bf4j_-CZVIgJ94e974ac1YmB2f6_F2B8dkZKmHixXzp4Q-57ep1OxVVcqLI_kJhiEPrbIfjGiXSyVY-QgFl5v9ATTP6J6eSQq-5hhEzgATaavnXKsqxoLmFiIyYZYcgt9F4GbTfMVOQNbkNpcE1A',
      altText: 'Técnicos certificados no topo de turbina eólica offshore',
      availability: 'Disponibilidade Imediata'
    },
    {
      id: 'naval',
      number: '02 //',
      title: 'Indústria Naval',
      category: 'naval',
      badge: 'ESTALEIROS EUROPEUS',
      badgeColor: 'amber',
      description: 'Soluções integradas de construção, eletrificação e adaptação estrutural para embarcações civis e militares.',
      bulletPoints: [
        'Instalações e montagens elétricas navais completas',
        'Metalomecânica pesada e caldeiraria naval especializada',
        'Tubagens marítimas, montagem mecânica e conversão naval'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzb9RkFweiHnOJa3lPADtvoZ8hHlciCzij2mYh999GzCdUcSSN0AHxoeFq_J6S0IxPfK36Ba9hz45OS5kBbIIb8UbrATWtP17IzQO_2bVVTOpmi37OhA6TFYH2NYXsXVL1AYS3yhWbTLKnvWpR84d87zmYtT7bDEHZ-3F4OIzEtYqmoIWVhuigoqaQiFZAKGPdc28Ba_fIb4LyHO4yDSJeCtsTWylNFvsNWdgSMa3PBANgLY4wOtIxeA',
      altText: 'Instalação elétrica de alta precisão em estaleiro naval',
      availability: 'Turnkey Shipyards'
    },
    {
      id: 'electricity',
      number: '03 //',
      title: 'Eletricidade Industrial',
      category: 'electrical',
      badge: 'BT / MT / ALTA TENSÃO',
      badgeColor: 'cyan',
      description: 'Manutenção e infraestruturas elétricas de alto rendimento para plantas fabris, refinarias e redes de energia.',
      bulletPoints: [
        'Manutenção preventiva e corretiva sistemática',
        'Instalações industriais de Baixa Tensão (BT) e Média Tensão (MT)',
        'Ligação, ensaios e comissionamento de quadros elétricos'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSDd9F-M3_Lx1jNDP_IzM2FTrwKEBjlrklR8ydu8wXFacypfvJ5cVkOlP3LI7jVoZ4d15t6vIwMcQxMAwZ_3eM1PlPvcvOVmv81OXUmGfhl6sBVZ2L-_3v1gtWB0Zq9iwCt0TMDAi7O0b7etlCuLkpNmt7GRFQN8qqBPGXrA5SAELyM0sTg6RkuAws3VbbrYAtA4mxPoGhm5fML3GLVNvfKYCQKTxvFi931ZtV03Apg-BWt9Yu4bElUg',
      altText: 'Comutação e comissionamento de quadros de média tensão',
      availability: 'Rápida Mobilização'
    },
    {
      id: 'metalwork',
      number: '04 //',
      title: 'Metalomecânica & Precisão',
      category: 'metalwork',
      badge: 'EN 1090 & TIG/MIG',
      badgeColor: 'amber',
      description: 'Soldadura avançada de tubagens e montagem de estruturas metálicas de alta envergadura.',
      bulletPoints: [
        'Serralharia industrial e transformação de perfis pesados',
        'Processamento e soldadura de alumínio, inox e aço carbono',
        'Montagem de estruturas metálicas complexas no terreno'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGv1T8VsEfeh4DKPtlqsR0P42PGVmE28Fx8qxuiJb5SoK48joyUSOSmI_dF0YynP2UOO1KDxuBpmAaBwxd-v2Q7_E6_IumdTj0CPlNWOrkGd9-3P1PtVffnQWWR_RqR3h4sOjYnL2TiQHuIric6jtgovqR7DOzpiuuCbMr9lMEUkBVNHJT2bw3z9TJ7a216bQaiIHdC588fU1rLY4-tZBX1HNB-zlTjs7bUAusD33UeN0R9e6eKdY0AA',
      altText: 'Soldador profissional homologado com arco elétrico em estrutura pesada',
      availability: 'Soldadores Homologados'
    }
  ],
  en: [
    {
      id: 'renewables',
      number: '01 //',
      title: 'Renewable Energy',
      category: 'wind_solar',
      badge: 'GWO & ONSHORE/OFFSHORE',
      badgeColor: 'cyan',
      description: 'Comprehensive deployment and continuous engineering support for modern onshore and offshore wind & solar installations.',
      bulletPoints: [
        'Assembly of high-capacity wind turbines',
        'Corrective and preventive turbine maintenance',
        'Photovoltaic solar park installation & grid commissioning'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCce8UCwC9YLQqCpKfxYTG29KoS8xJNStUsQF_IMCleRtjUyfZmjb9OIzzMYzsILuZuV2wOwuluzDUBFPfc94IJE8-_RpET9eVmE1Bf4j_-CZVIgJ94e974ac1YmB2f6_F2B8dkZKmHixXzp4Q-57ep1OxVVcqLI_kJhiEPrbIfjGiXSyVY-QgFl5v9ATTP6J6eSQq-5hhEzgATaavnXKsqxoLmFiIyYZYcgt9F4GbTfMVOQNbkNpcE1A',
      altText: 'Certified wind technicians working atop offshore wind turbine',
      availability: 'Immediate Availability'
    },
    {
      id: 'naval',
      number: '02 //',
      title: 'Naval Engineering',
      category: 'naval',
      badge: 'EUROPEAN SHIPYARDS',
      badgeColor: 'amber',
      description: 'Integrated construction, marine electrification and structural conversion solutions for civil and military vessels.',
      bulletPoints: [
        'Complete naval electrical installations and rewiring',
        'Heavy industrial boilermaking and naval structural steel',
        'Maritime piping, mechanical assembly and vessel conversion'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzb9RkFweiHnOJa3lPADtvoZ8hHlciCzij2mYh999GzCdUcSSN0AHxoeFq_J6S0IxPfK36Ba9hz45OS5kBbIIb8UbrATWtP17IzQO_2bVVTOpmi37OhA6TFYH2NYXsXVL1AYS3yhWbTLKnvWpR84d87zmYtT7bDEHZ-3F4OIzEtYqmoIWVhuigoqaQiFZAKGPdc28Ba_fIb4LyHO4yDSJeCtsTWylNFvsNWdgSMa3PBANgLY4wOtIxeA',
      altText: 'High-precision naval electrical engineering works',
      availability: 'Turnkey Shipyards'
    },
    {
      id: 'electricity',
      number: '03 //',
      title: 'Industrial Electrical Systems',
      category: 'electrical',
      badge: 'LV / MV / HIGH VOLTAGE',
      badgeColor: 'cyan',
      description: 'High-performance electrical power infrastructures and commissioning for manufacturing facilities, refineries, and grids.',
      bulletPoints: [
        'Systematic preventive and corrective maintenance',
        'Low Voltage (LV) and Medium Voltage (MV) facilities',
        'Switchboard connections, testing, and full energization'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSDd9F-M3_Lx1jNDP_IzM2FTrwKEBjlrklR8ydu8wXFacypfvJ5cVkOlP3LI7jVoZ4d15t6vIwMcQxMAwZ_3eM1PlPvcvOVmv81OXUmGfhl6sBVZ2L-_3v1gtWB0Zq9iwCt0TMDAi7O0b7etlCuLkpNmt7GRFQN8qqBPGXrA5SAELyM0sTg6RkuAws3VbbrYAtA4mxPoGhm5fML3GLVNvfKYCQKTxvFi931ZtV03Apg-BWt9Yu4bElUg',
      altText: 'Industrial switchboard testing and electrical busbar maintenance',
      availability: 'Rapid Mobilization'
    },
    {
      id: 'metalwork',
      number: '04 //',
      title: 'Precision Metalworking',
      category: 'metalwork',
      badge: 'EN 1090 & TIG/MIG',
      badgeColor: 'amber',
      description: 'Certified high-spec pipe welding and heavy steel structural assembly for critical European projects.',
      bulletPoints: [
        'Heavy industrial locksmithing and profile fabrication',
        'Specialized aluminum, stainless steel and carbon steel welding',
        'Erection and fitting of complex structural steel on-site'
      ],
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGv1T8VsEfeh4DKPtlqsR0P42PGVmE28Fx8qxuiJb5SoK48joyUSOSmI_dF0YynP2UOO1KDxuBpmAaBwxd-v2Q7_E6_IumdTj0CPlNWOrkGd9-3P1PtVffnQWWR_RqR3h4sOjYnL2TiQHuIric6jtgovqR7DOzpiuuCbMr9lMEUkBVNHJT2bw3z9TJ7a216bQaiIHdC588fU1rLY4-tZBX1HNB-zlTjs7bUAusD33UeN0R9e6eKdY0AA',
      altText: 'Certified welder performing precision TIG/MIG welding',
      availability: 'Certified Welders'
    }
  ]
};

export const JOB_VACANCIES: Record<Language, JobVacancy[]> = {
  pt: [
    {
      id: 'soldador-6g',
      title: 'Soldador Naval TIG / MIG / MAG 6G',
      department: 'Metalomecânica & Naval',
      location: 'Estaleiros Navais • França & Alemanha',
      contractType: 'Tempo Inteiro // Turnkey',
      status: 'Ativa',
      icon: 'precision_manufacturing',
      accentColor: 'amber'
    },
    {
      id: 'tecnico-eolico',
      title: 'Técnico de Manutenção Eólica (GWO)',
      department: 'Energias Renováveis',
      location: 'Parques Eólicos Onshore/Offshore • Escandinávia',
      contractType: 'Tempo Inteiro // Rotação',
      status: 'Ativa',
      icon: 'wind_power',
      accentColor: 'cyan'
    },
    {
      id: 'eletricista-mt-bt',
      title: 'Eletricista Industrial MT / BT',
      department: 'Eletricidade Industrial',
      location: 'Comissionamento de Quadros • Bélgica & Holanda',
      contractType: 'Tempo Inteiro // Turnkey',
      status: 'Ativa',
      icon: 'electric_meter',
      accentColor: 'amber'
    },
    {
      id: 'tubista-isometrista',
      title: 'Tubista Industrial & Isometrista Naval',
      department: 'Indústria Naval & Refinarias',
      location: 'Roterdão & Hamburgo',
      contractType: 'Tempo Inteiro // Imediato',
      status: 'Ativa',
      icon: 'plumbing',
      accentColor: 'cyan'
    }
  ],
  en: [
    {
      id: 'soldador-6g',
      title: 'Naval Welder TIG / MIG / MAG 6G',
      department: 'Naval & Metalworking',
      location: 'Shipyards • France & Germany',
      contractType: 'Full-time // Turnkey Mobility',
      status: 'Active',
      icon: 'precision_manufacturing',
      accentColor: 'amber'
    },
    {
      id: 'tecnico-eolico',
      title: 'Wind Turbine Technician (GWO)',
      department: 'Renewable Energies',
      location: 'Onshore/Offshore Wind Farms • Scandinavia',
      contractType: 'Full-time // Rotation',
      status: 'Active',
      icon: 'wind_power',
      accentColor: 'cyan'
    },
    {
      id: 'eletricista-mt-bt',
      title: 'Industrial Electrician (LV / MV)',
      department: 'Industrial Electrical',
      location: 'Switchboard Commissioning • Belgium & Netherlands',
      contractType: 'Full-time // Turnkey Mobility',
      status: 'Active',
      icon: 'electric_meter',
      accentColor: 'amber'
    },
    {
      id: 'tubista-isometrista',
      title: 'Industrial Pipefitter & Isometrist',
      department: 'Naval & Chemical Refineries',
      location: 'Rotterdam & Hamburg',
      contractType: 'Full-time // Immediate',
      status: 'Active',
      icon: 'plumbing',
      accentColor: 'cyan'
    }
  ]
};

export const OPERATIONAL_HUBS: Record<Language, OperationalHub[]> = {
  pt: [
    {
      id: 'portugal',
      name: 'Portugal (Sede Operacional Gaia)',
      role: 'Coordenação Central & Headquarter',
      coordinates: '41.1333° N, 8.6167° W',
      activeSpecialists: 240,
      projectsCount: 120,
      highlight: 'Gestão executiva, triagem e logística continental'
    },
    {
      id: 'france-germany',
      name: 'França & Alemanha',
      role: 'Estaleiros Navais & MT',
      coordinates: '48.8566° N, 2.3522° E',
      activeSpecialists: 580,
      projectsCount: 185,
      highlight: 'Navios militares, cruzeiros de luxo e quadros MT'
    },
    {
      id: 'netherlands-belgium',
      name: 'Holanda & Bélgica',
      role: 'Eólica Offshore & Redes',
      coordinates: '51.9244° N, 4.4777° E',
      activeSpecialists: 420,
      projectsCount: 140,
      highlight: 'Porto de Roterdão, parques eólicos do Mar do Norte'
    },
    {
      id: 'scandinavia-spain',
      name: 'Escandinávia & Espanha',
      role: 'Montagem de Turbinas',
      coordinates: '59.3293° N, 18.0686° E',
      activeSpecialists: 290,
      projectsCount: 95,
      highlight: 'Subestações de alta montanha e turbinas offshore'
    }
  ],
  en: [
    {
      id: 'portugal',
      name: 'Portugal (Operational HQ Gaia)',
      role: 'Central Coordination & HQ',
      coordinates: '41.1333° N, 8.6167° W',
      activeSpecialists: 240,
      projectsCount: 120,
      highlight: 'Executive coordination, vetting and continental logistics'
    },
    {
      id: 'france-germany',
      name: 'France & Germany',
      role: 'Naval Shipyards & MV Systems',
      coordinates: '48.8566° N, 2.3522° E',
      activeSpecialists: 580,
      projectsCount: 185,
      highlight: 'Naval defense vessels, luxury liners, and MV electrical'
    },
    {
      id: 'netherlands-belgium',
      name: 'Netherlands & Belgium',
      role: 'Offshore Wind & Grids',
      coordinates: '51.9244° N, 4.4777° E',
      activeSpecialists: 420,
      projectsCount: 140,
      highlight: 'Rotterdam Port, North Sea offshore installations'
    },
    {
      id: 'scandinavia-spain',
      name: 'Scandinavia & Spain',
      role: 'Turbine Erection & Maintenance',
      coordinates: '59.3293° N, 18.0686° E',
      activeSpecialists: 290,
      projectsCount: 95,
      highlight: 'High-altitude sub-stations & offshore turbine fields'
    }
  ]
};

export const TRANSLATIONS = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Quem Somos',
      areas: 'Áreas de Atuação',
      portfolio: 'Portfólio',
      careers: 'Candidaturas',
      contacts: 'Contactos',
      applyAreaBtn: 'Área de Candidaturas →',
      hudBadge: '1,500+ Especialistas Desdobrados • Toda a Europa • 99.8% Precisão'
    },
    hero: {
      tag: 'Líder Europeu em Engenharia & Força de Trabalho Especializada',
      refId: '// REF_ID: PT-EU-2026',
      eyebrow: '[ 01 // QUEM SOMOS ]',
      titleStart: 'Empresa de prestação de',
      titleHighlight: 'serviços especializados',
      description: 'Somos o seu parceiro de negócios estratégico nas áreas das Energias Renováveis, Metalomecânica e Construção Naval. Da gestão de recursos humanos de alta qualificação ao alojamento, certificação e logística integral de mobilidade pan-europeia.',
      applyNow: 'Candidatar-se Agora',
      knowMore: 'Conheça-nos melhor',
      hudStatus: 'HUD Status: LIVE',
      iso: 'ISO 9001 & 45001',
      gwo: 'Certificação GWO',
      turnkey: 'Logística Europeia Turnkey',
      mobilization: 'Mobilização Ativa',
      countries: '7 Países Europeus',
      reliability: 'Índice Confiabilidade',
      sector01: '// SECTOR 01',
      renewables: 'Renováveis',
      renewablesDesc: 'Eólica Onshore & Offshore, Parques Solares e Manutenção.',
      sector02: '// SECTOR 02',
      naval: 'Naval',
      navalDesc: 'Construção, Eletricidade Naval e Conversão de Estruturas.'
    },
    stats: {
      humanCapital: 'CAPITAL HUMANO',
      specialists: '1,500+',
      specialistsUnit: 'Técnicos',
      specialistsDesc: 'Pessoas qualificadas e especializadas no terreno ativo em toda a Europa.',
      portfolio: 'PORTFÓLIO EXECUTADO',
      projects: '500+',
      projectsUnit: 'Projetos',
      projectsDesc: 'Concluídos com rigor e profissionalismo em múltiplos países da União Europeia.',
      turnkey: 'SERVIÇO CHAVE-NA-MÃO',
      turnkeyVal: '100%',
      turnkeyUnit: 'Logística',
      turnkeyDesc: 'Gestão total de viagens, alojamento de qualidade, vistos e conformidade legal.',
      disciplines: 'DISCIPLINAS TÉCNICAS',
      disciplinesVal: '5 Áreas',
      disciplinesUnit: 'Especializadas',
      disciplinesDesc: 'Montagem e manutenção de turbinas, eletricidade naval, alta tensão e soldadura pesada.'
    },
    areas: {
      eyebrow: '[ 02 // ESPECIALIZAÇÃO INDUSTRIAL ]',
      title: 'Áreas onde atuamos',
      subtitle: 'Soluções completas com técnicos credenciados para missões que exigem precisão cirúrgica e cumprimento rigoroso de prazos.',
      filterLabel: 'Filtro de Disciplina:',
      filterAll: 'Todos (04)',
      filterOffshore: 'Offshore & Wind',
      filterNaval: 'Estaleiros Navais',
      filterElectric: 'BT / MT',
      filterMetal: 'Metalomecânica',
      applyCard: 'Candidatar a esta área'
    },
    turnkey: {
      eyebrow: '[ 03 // MODELO OPERACIONAL TURNKEY ]',
      title: 'O que fazemos & como entregamos resultados',
      quote: '“From recruitment to travel and accommodation, we take care of all the paperwork so you can concentrate on your project.”',
      desc: 'Eliminamos o atrito na alocação transfronteiriça de recursos humanos. Assumimos a responsabilidade jurídica, os fluxos logísticos e a conformidade técnica para que a sua linha de produção nunca pare.',
      requestProposal: 'Solicitar Proposta Empresarial',
      step1Num: '01',
      step1Title: 'Seleção & Validação',
      step1Desc: 'Triagem rigorosa de certificados (GWO, ensaios não destrutivos e soldadura).',
      step2Num: '02',
      step2Title: 'Logística & Vistos',
      step2Desc: 'Tratamento total de transporte aéreo/terrestre, habitação condigna e licenças.',
      step3Num: '03',
      step3Title: 'Desdobramento Rápido',
      step3Desc: 'Integração imediata em estaleiros navais ou parques industriais no destino.',
      step4Num: '04',
      step4Title: 'Supervisão Contínua',
      step4Desc: 'Acompanhamento no terreno, segurança no trabalho e controlo de performance.'
    },
    careers: {
      eyebrow: '[ 04 // RECRUTAMENTO & CARREIRAS ]',
      title: 'Come and work with us!',
      quote: '“Se tem as competências que procuramos, preencha o formulário de candidatura espontânea. A oportunidade aparece quando menos espera!”',
      desc: 'Consulte a nossa ÁREA DE CANDIDATURAS e veja se temos a oportunidade que procura. Estamos permanentemente a contratar para diversas posições operacionais e de chefia técnica nos nossos clientes de primeira linha na Europa.',
      openingsTitle: 'Vagas em Destaque // Contratação Imediata',
      formTitle: 'Formulário de Candidatura Espontânea',
      formRef: 'COD // EQX-APP-DIRECT',
      nameLabel: 'Nome Completo *',
      namePlaceholder: 'Ex: Manuel Silva',
      phoneLabel: 'Contacto Telefónico *',
      phonePlaceholder: '+351 910 000 000',
      emailLabel: 'Email *',
      emailPlaceholder: 'candidato@email.com',
      areaLabel: 'Área Principal *',
      expLabel: 'Experiência & Certificações Relevantes',
      expPlaceholder: 'Indique anos de experiência, certificados (ex: GWO, soldadura) e disponibilidade de deslocação internacional...',
      attachCv: 'Anexar Curriculum Vitae (PDF / Word)',
      maxSize: 'Tamanho máximo: 10MB',
      submitBtn: 'Submeter Candidatura Espontânea →',
      gdpr: 'Dados protegidos pelo RGPD',
      whatsapp: 'Linha WhatsApp de Apoio',
      applySuccess: 'Candidatura submetida com sucesso! A equipa de recrutamento da EQX entrará em contacto nas próximas 24 horas.',
      liveLoadError: 'Não foi possível carregar as vagas em direto — a mostrar vagas em destaque.',
      chooseVacancy: 'Escolha primeiro uma vaga acima (botão Candidatar).',
      applyingTo: 'Candidatura a: {title}',
    },
    europe: {
      eyebrow: '[ 05 // LOGÍSTICA & PRESENÇA ]',
      title: 'EQX pela Europa',
      desc: 'Mais de 500 projetos executados com rigor e sucesso em estaleiros de referência, complexos industriais e parques de energias renováveis no norte e centro da Europa.',
      activeMap: 'MAPA OPERACIONAL ATIVO',
      connection: 'CONEXÃO ENGENHARIA EQX // DIRETA',
      status: 'STATUS: OPERACIONAL CONTÍNUO',
      hubsCount: '12+',
      hubsLabel: 'Hubs Logísticos',
      accomCount: '100%',
      accomLabel: 'Alojamento Garantido',
      stopsCount: '0',
      stopsLabel: 'Paragens não Planeadas'
    },
    contacts: {
      eyebrow: '[ 06 // CANAIS DIRETOS ]',
      title: 'Contactos & Sede Oficial',
      desc: 'Entre em contacto direto com a administração executiva e os coordenadores de mobilidade da EQX.',
      directLines: 'Linhas Diretas',
      directDesc: 'Atendimento administrativo e apoio operacional permanente.',
      telText: '+351 223 160 304',
      telNote: '(Chamada para a rede fixa nacional)',
      emailText: 'geral@eqx.pt',
      location: 'Localização',
      locationDesc: 'Sede e centro de operações técnicas:',
      street: 'Rua de Angola, nº. 40',
      postal: '4430-014 Vila Nova de Gaia',
      country: 'Porto • Portugal — União Europeia',
      mapsBtn: 'Abrir no Google Maps',
      social: 'Siga-nos',
      socialDesc: 'Acompanhe novos projetos industriais e aberturas de vagas em tempo real nas nossas redes.'
    },
    cookies: {
      title: 'Gerir o Consentimento de Cookies',
      desc: 'Para fornecer as melhores experiências, usamos tecnologias como cookies para armazenar e/ou aceder a informações do dispositivo. Consentir com essas tecnologias nos permitirá processar dados, como comportamento de navegação ou IDs exclusivos neste site. Não consentir ou retirar o consentimento pode afetar negativamente certos recursos e funções.',
      accept: 'Aceitar',
      deny: 'Negar',
      preferences: 'Ver preferências',
      cookiePolicy: 'Política de Cookies',
      privacyPolicy: 'Política de Privacidade'
    },
    footer: {
      tagline: 'Engenharia industrial de ponta, infraestruturas navais e redes de energia renovável. Mobilização de capital humano de alta precisão em escala continental.',
      hqTitle: 'Sede Operacional',
      hqAddress: 'Vila Nova de Gaia, Porto\nPortugal — European Union',
      certsTitle: 'Normas & Certificações',
      cert1: 'ISO 9001: Qualidade Industrial',
      cert2: 'ISO 45001: Segurança Offshore & Naval',
      cert3: 'GWO Certified (Wind Power Standards)',
      cert4: 'Diretiva Europeia de Soldadura EN 1090',
      telemetryTitle: 'Telemetria de Missão',
      inOperation: 'Técnicos em Operação',
      inOpVal: '1,540+',
      relIndex: 'Índice de Confiabilidade',
      relVal: '99.8%',
      hubsVal: '12 Países',
      hubsLabel: 'Hubs Continentais',
      continuousRecruitment: 'Recrutamento Contínuo',
      directLine: 'Linha Direta',
      copyright: '© 2025 EQX Empower Solutions. Todos os direitos reservados. Vila Nova de Gaia, Portugal.',
      terms: 'Termos de Serviço',
      complaints: 'Livro de Reclamações'
    },
    b2bModal: {
      title: 'Solicitar Proposta Empresarial Turnkey',
      subtitle: 'Para contratação de equipas técnicas especializadas ou projetos industriais na Europa.',
      company: 'Nome da Empresa *',
      person: 'Pessoa de Contacto *',
      email: 'Email Corporativo *',
      phone: 'Telefone / WhatsApp *',
      sector: 'Sector de Atuação *',
      headcount: 'Número Estimado de Especialistas *',
      location: 'País / Localização do Projeto *',
      details: 'Especificações Técnicas do Projeto',
      detailsPlaceholder: 'Descreva os perfis desejados, datas de mobilização e requisitos específicos de certificação...',
      submit: 'Enviar Pedido de Proposta →',
      cancel: 'Cancelar',
      success: 'Pedido de proposta recebido com sucesso! O nosso Diretor de Operações entrará em contacto em menos de 12 horas.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      areas: 'Sectors',
      portfolio: 'Portfolio',
      careers: 'Careers',
      contacts: 'Contacts',
      applyAreaBtn: 'Candidate Portal →',
      hudBadge: '1,500+ Specialists Deployed • Across Europe • 99.8% Mission Accuracy'
    },
    hero: {
      tag: 'European Leader in Engineering & Specialized Workforce',
      refId: '// REF_ID: PT-EU-2026',
      eyebrow: '[ 01 // WHO WE ARE ]',
      titleStart: 'Provider of specialized',
      titleHighlight: 'engineering services',
      description: 'Your strategic business partner in Renewable Energy, Metalworking, and Naval Construction. From high-grade technical talent acquisition to accommodation, certification, and full pan-European logistics mobility.',
      applyNow: 'Apply Now',
      knowMore: 'Discover Our Sectors',
      hudStatus: 'HUD Status: LIVE',
      iso: 'ISO 9001 & 45001',
      gwo: 'GWO Certified',
      turnkey: 'European Turnkey Logistics',
      mobilization: 'Active Mobilization',
      countries: '7 European Countries',
      reliability: 'Reliability Index',
      sector01: '// SECTOR 01',
      renewables: 'Renewables',
      renewablesDesc: 'Onshore & Offshore Wind, Solar Parks and Maintenance.',
      sector02: '// SECTOR 02',
      naval: 'Naval',
      navalDesc: 'Construction, Naval Electrification and Vessel Conversion.'
    },
    stats: {
      humanCapital: 'HUMAN CAPITAL',
      specialists: '1,500+',
      specialistsUnit: 'Technicians',
      specialistsDesc: 'Certified, highly qualified professionals operating live across Europe.',
      portfolio: 'EXECUTED PORTFOLIO',
      projects: '500+',
      projectsUnit: 'Projects',
      projectsDesc: 'Delivered with surgical rigor across multiple European Union nations.',
      turnkey: 'TURNKEY SERVICE',
      turnkeyVal: '100%',
      turnkeyUnit: 'Logistics',
      turnkeyDesc: 'Complete management of flights, high-standard housing, visas, and legal compliance.',
      disciplines: 'TECHNICAL DISCIPLINES',
      disciplinesVal: '5 Areas',
      disciplinesUnit: 'Specialized',
      disciplinesDesc: 'Turbine erection, marine electrical, high voltage grids, and heavy-spec welding.'
    },
    areas: {
      eyebrow: '[ 02 // INDUSTRIAL SPECIALIZATION ]',
      title: 'Our Areas of Operation',
      subtitle: 'Complete solutions with accredited technicians for missions requiring surgical precision and strict adherence to project deadlines.',
      filterLabel: 'Discipline Filter:',
      filterAll: 'All (04)',
      filterOffshore: 'Offshore & Wind',
      filterNaval: 'Naval Shipyards',
      filterElectric: 'LV / MV Power',
      filterMetal: 'Metalworking',
      applyCard: 'Apply to this area'
    },
    turnkey: {
      eyebrow: '[ 03 // TURNKEY OPERATIONAL MODEL ]',
      title: 'What we do & how we deliver results',
      quote: '“From recruitment to travel and accommodation, we take care of all the paperwork so you can concentrate on your project.”',
      desc: 'We eliminate friction in cross-border human resource mobilization. We take full legal, logistical, and technical compliance responsibility so your production line never stops.',
      requestProposal: 'Request Corporate Proposal',
      step1Num: '01',
      step1Title: 'Selection & Vetting',
      step1Desc: 'Rigorous vetting of certifications (GWO, non-destructive testing, ASME/EN welding).',
      step2Num: '02',
      step2Title: 'Logistics & Visas',
      step2Desc: 'End-to-end air and ground transit, dignified housing, and work permits.',
      step3Num: '03',
      step3Title: 'Rapid Deployment',
      step3Desc: 'Immediate integration into shipyards or industrial sites at destination.',
      step4Num: '04',
      step4Title: 'Continuous Supervision',
      step4Desc: 'On-site monitoring, work safety compliance, and operational quality control.'
    },
    careers: {
      eyebrow: '[ 04 // RECRUITMENT & CAREERS ]',
      title: 'Come and work with us!',
      quote: '“If you have the technical skills we look for, submit your spontaneous application. Opportunities appear when you least expect them!”',
      desc: 'Visit our CANDIDATE PORTAL and find your next international challenge. We are permanently hiring across technical and supervisory positions for tier-1 industrial clients across Europe.',
      openingsTitle: 'Featured Openings // Immediate Placement',
      formTitle: 'Direct Candidate Application Form',
      formRef: 'COD // EQX-APP-DIRECT',
      nameLabel: 'Full Name *',
      namePlaceholder: 'e.g. John Doe',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: '+351 910 000 000',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'candidate@domain.com',
      areaLabel: 'Primary Discipline *',
      expLabel: 'Relevant Experience & Certifications',
      expPlaceholder: 'Describe your years of experience, certificates (GWO, weld certifications), and international availability...',
      attachCv: 'Attach Curriculum Vitae (PDF / Word)',
      maxSize: 'Maximum file size: 10MB',
      submitBtn: 'Submit Spontaneous Application →',
      gdpr: 'Protected under EU GDPR regulations',
      whatsapp: 'WhatsApp Support Line',
      applySuccess: 'Application submitted successfully! The EQX recruitment team will reach out within 24 hours.',
      liveLoadError: 'Could not load live vacancies — showing featured openings.',
      chooseVacancy: 'Please choose a vacancy above first (Apply button).',
      applyingTo: 'Applying to: {title}',
    },
    europe: {
      eyebrow: '[ 05 // PRESENCE & LOGISTICS ]',
      title: 'EQX Across Europe',
      desc: 'Over 500 projects successfully executed across tier-1 European shipyards, manufacturing gigafactories, and offshore wind complexes.',
      activeMap: 'ACTIVE OPERATIONAL MAP',
      connection: 'EQX DIRECT ENGINEERING TELEMETRY',
      status: 'STATUS: CONTINUOUS LIVE OPS',
      hubsCount: '12+',
      hubsLabel: 'Logistics Hubs',
      accomCount: '100%',
      accomLabel: 'Guaranteed Housing',
      stopsCount: '0',
      stopsLabel: 'Unplanned Downtime'
    },
    contacts: {
      eyebrow: '[ 06 // DIRECT CHANNELS ]',
      title: 'Contacts & Official Headquarters',
      desc: 'Connect directly with executive administration and EQX European mobility coordinators.',
      directLines: 'Direct Phone Lines',
      directDesc: 'Administrative desk and continuous operational support.',
      telText: '+351 223 160 304',
      telNote: '(National landline call rate)',
      emailText: 'geral@eqx.pt',
      location: 'Location',
      locationDesc: 'Headquarters & technical operations center:',
      street: 'Rua de Angola, nº. 40',
      postal: '4430-014 Vila Nova de Gaia',
      country: 'Porto • Portugal — European Union',
      mapsBtn: 'Open in Google Maps',
      social: 'Follow Us',
      socialDesc: 'Track live industrial projects, offshore milestones, and immediate job openings.'
    },
    cookies: {
      title: 'Manage Cookie Consent',
      desc: 'To provide the best experiences, we use technologies like cookies to store and/or access device information. Consenting to these technologies will allow us to process data such as browsing behavior or unique IDs on this site. Not consenting or withdrawing consent may adversely affect certain features.',
      accept: 'Accept',
      deny: 'Deny',
      preferences: 'View preferences',
      cookiePolicy: 'Cookie Policy',
      privacyPolicy: 'Privacy Policy'
    },
    footer: {
      tagline: 'Precision industrial engineering, naval infrastructures and renewable power grids. Mobilizing high-grade technical talent at continental scale.',
      hqTitle: 'Operational Headquarters',
      hqAddress: 'Vila Nova de Gaia, Porto\nPortugal — European Union',
      certsTitle: 'Standards & Certifications',
      cert1: 'ISO 9001: Industrial Quality Management',
      cert2: 'ISO 45001: Offshore & Naval Occupational Health',
      cert3: 'GWO Certified (Wind Power Safety Standards)',
      cert4: 'European Structural Welding Directive EN 1090',
      telemetryTitle: 'Mission Telemetry',
      inOperation: 'Active Technicians',
      inOpVal: '1,540+',
      relIndex: 'Reliability Index',
      relVal: '99.8%',
      hubsVal: '12 Countries',
      hubsLabel: 'Continental Hubs',
      continuousRecruitment: 'Continuous Recruitment',
      directLine: 'Direct Line',
      copyright: '© 2025 EQX Empower Solutions. All rights reserved. Vila Nova de Gaia, Portugal.',
      terms: 'Terms of Service',
      complaints: 'Consumer Complaints Portal'
    },
    b2bModal: {
      title: 'Request Turnkey Corporate Proposal',
      subtitle: 'To hire certified technical teams or deploy turn-key workforce projects in Europe.',
      company: 'Company Name *',
      person: 'Contact Person *',
      email: 'Corporate Email *',
      phone: 'Phone / WhatsApp *',
      sector: 'Industrial Sector *',
      headcount: 'Estimated Technical Headcount *',
      location: 'Project Country / Location *',
      details: 'Technical Scope & Timing Requirements',
      detailsPlaceholder: 'Detail required technical roles, mobilization dates, and specific certifications needed...',
      submit: 'Send Proposal Request →',
      cancel: 'Cancel',
      success: 'Proposal request received! Our Chief of Operations will contact you within 12 hours.'
    }
  }
};
