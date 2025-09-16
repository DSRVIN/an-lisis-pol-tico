
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el seed de la base de datos...');

  // 1. Crear temas políticos
  console.log('📝 Creando temas políticos...');
  const temas = [
    {
      nombre: 'Economía',
      descripcion: 'Políticas económicas, empleo, inflación, crecimiento',
      icono: 'DollarSign',
      color: '#10B981',
      orden: 1,
    },
    {
      nombre: 'Educación',
      descripcion: 'Sistema educativo, universidades, formación técnica',
      icono: 'GraduationCap',
      color: '#3B82F6',
      orden: 2,
    },
    {
      nombre: 'Salud',
      descripcion: 'Sistema de salud, hospitales, medicinas',
      icono: 'Heart',
      color: '#EF4444',
      orden: 3,
    },
    {
      nombre: 'Seguridad',
      descripcion: 'Seguridad ciudadana, criminalidad, fuerzas policiales',
      icono: 'Shield',
      color: '#F59E0B',
      orden: 4,
    },
    {
      nombre: 'Corrupción',
      descripcion: 'Lucha anticorrupción, transparencia, reforma del Estado',
      icono: 'AlertTriangle',
      color: '#8B5CF6',
      orden: 5,
    },
    {
      nombre: 'Infraestructura',
      descripcion: 'Obras públicas, carreteras, servicios básicos',
      icono: 'Building',
      color: '#06B6D4',
      orden: 6,
    },
    {
      nombre: 'Medio Ambiente',
      descripcion: 'Políticas ambientales, cambio climático, recursos naturales',
      icono: 'Leaf',
      color: '#22C55E',
      orden: 7,
    },
    {
      nombre: 'Minería',
      descripcion: 'Sector minero, regalías, impacto ambiental',
      icono: 'Mountain',
      color: '#78716C',
      orden: 8,
    },
  ];

  const temasCreados = await Promise.all(
    temas.map(async (tema) => {
      return await prisma.tema.upsert({
        where: { nombre: tema.nombre },
        update: tema,
        create: tema,
      });
    })
  );

  // 2. Crear partidos políticos
  console.log('🏛️  Creando partidos políticos...');
  const partidos = [
    {
      nombre: 'Fuerza Popular',
      siglas: 'FP',
      ideologia: 'Derecha conservadora, fujimorismo',
      descripcion: 'Partido político de derecha que defiende el modelo económico neoliberal y los valores conservadores.',
      logoUrl: 'https://logosenvector.com/logo/img/fuerza-popular-37425.png',
      fundacion: 2010,
      afiliados: 58779,
      colorPrimario: '#FF4500',
      colorSecundario: '#FF6347',
      sitioWeb: 'https://fuerzapopular.pe',
      redes: {
        facebook: 'https://facebook.com/fuerzapopularperu',
        twitter: 'https://twitter.com/fuerzapopularpe',
        instagram: 'https://instagram.com/fuerzapopular'
      },
    },
    {
      nombre: 'Renovación Popular',
      siglas: 'RP',
      ideologia: 'Ultraconservadora, derecha religiosa',
      descripcion: 'Partido de ultraderecha conservadora que defiende valores tradicionales y políticas de mano dura.',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Logo_Renovaci%C3%B3n_Popular_2023.png',
      fundacion: 2020,
      afiliados: 42000,
      colorPrimario: '#1E40AF',
      colorSecundario: '#3B82F6',
      sitioWeb: 'https://renovacionpopular.pe',
      redes: {
        facebook: 'https://facebook.com/renovacionpopular',
        twitter: 'https://twitter.com/RenovPopular',
        instagram: 'https://instagram.com/renovacionpopular'
      },
    },
    {
      nombre: 'País para Todos',
      siglas: 'PPT',
      ideologia: 'Centroderecha populista',
      descripcion: 'Partido político que busca representar a todos los peruanos con enfoque pragmático.',
      logoUrl: 'https://logosenvector.com/logo/img/logo-partido-politico-pais-para-todos-38054.png',
      fundacion: 2023,
      afiliados: 28500,
      colorPrimario: '#DC2626',
      colorSecundario: '#F87171',
      sitioWeb: null,
      redes: {
        facebook: 'https://facebook.com/paisparatodosperu',
        instagram: 'https://instagram.com/paisparatodos'
      },
    },
    {
      nombre: 'Alianza para el Progreso',
      siglas: 'APP',
      ideologia: 'Centro-derecha populista',
      descripcion: 'Partido político comprometido con el desarrollo y el progreso del país.',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Alianza_para_el_Progreso_Peru.svg/2048px-Alianza_para_el_Progreso_Peru.svg.png',
      fundacion: 2001,
      afiliados: 367700,
      colorPrimario: '#059669',
      colorSecundario: '#10B981',
      sitioWeb: 'https://app.pe',
      redes: {
        facebook: 'https://facebook.com/alianzaparaelprogresoapp',
        twitter: 'https://twitter.com/APPPeru',
        instagram: 'https://instagram.com/appperu'
      },
    },
    {
      nombre: 'Ahora Nación',
      siglas: 'AN',
      ideologia: 'Centroizquierda socialdemócrata',
      descripcion: 'Partido político que busca la reingeniería del Estado y el desarrollo nacional.',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Ahora_Naci%C3%B3n.jpg',
      fundacion: 2023,
      afiliados: 35250,
      colorPrimario: '#7C3AED',
      colorSecundario: '#A855F7',
      sitioWeb: 'https://ahoranacion.pe',
      redes: {
        facebook: 'https://facebook.com/ahoranacion',
        instagram: 'https://instagram.com/ahoranacion'
      },
    },
    {
      nombre: 'Perú Libre',
      siglas: 'PL',
      ideologia: 'Izquierda marxista-leninista',
      descripcion: 'Partido de izquierda que busca la transformación radical del Estado peruano.',
      logoUrl: 'https://logosenvector.com/logo/img/peru-libre-4357.png',
      fundacion: 2008,
      afiliados: 89000,
      colorPrimario: '#DC2626',
      colorSecundario: '#F87171',
      sitioWeb: 'https://perulibre.pe',
      redes: {
        facebook: 'https://facebook.com/perulibre',
        twitter: 'https://twitter.com/perulibrepe',
        instagram: 'https://instagram.com/perulibre'
      },
    },
    {
      nombre: 'Partido Aprista Peruano',
      siglas: 'APRA',
      ideologia: 'Centroderecha (evolución desde izquierda histórica)',
      descripcion: 'Partido histórico del Perú con propuestas de renovación y cambio generacional.',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/APRA_Peru_logo.svg/2048px-APRA_Peru_logo.svg.png',
      fundacion: 1930,
      afiliados: 64161,
      colorPrimario: '#DC2626',
      colorSecundario: '#F87171',
      sitioWeb: 'https://apra.pe',
      redes: {
        facebook: 'https://facebook.com/apraperu',
        twitter: 'https://twitter.com/APRA_PERU',
        instagram: 'https://instagram.com/apraperu'
      },
    },
    {
      nombre: 'Partido Morado',
      siglas: 'PM',
      ideologia: 'Centro republicano',
      descripcion: 'Partido que promueve el republicanismo moderno y las reformas institucionales.',
      logoUrl: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100064561037326',
      fundacion: 2018,
      afiliados: 45000,
      colorPrimario: '#7C3AED',
      colorSecundario: '#A855F7',
      sitioWeb: 'https://partidomorado.pe',
      redes: {
        facebook: 'https://facebook.com/partidomorado',
        twitter: 'https://twitter.com/PartidoMorado',
        instagram: 'https://instagram.com/partidomorado'
      },
    },
    {
      nombre: 'Avanza País',
      siglas: 'AP',
      ideologia: 'Derecha liberal',
      descripcion: 'Partido que defiende la libertad, la vida y la propiedad privada.',
      logoUrl: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100068986576901',
      fundacion: 2020,
      afiliados: 38500,
      colorPrimario: '#0EA5E9',
      colorSecundario: '#38BDF8',
      sitioWeb: 'https://avanzapais.pe',
      redes: {
        facebook: 'https://facebook.com/avanzapais',
        twitter: 'https://twitter.com/AvanzaPais',
        instagram: 'https://instagram.com/avanzapais'
      },
    },
  ];

  const partidosCreados = await Promise.all(
    partidos.map(async (partido) => {
      return await prisma.partido.upsert({
        where: { nombre: partido.nombre },
        update: partido,
        create: partido,
      });
    })
  );

  // 3. Crear candidatos presidenciales
  console.log('👥 Creando candidatos presidenciales...');
  const candidatos = [
    {
      nombres: 'Keiko Sofía',
      apellidos: 'Fujimori Higuchi',
      nombreCompleto: 'Keiko Sofía Fujimori Higuchi',
      edad: 49,
      lugarNacimiento: 'Lima, Perú',
      profesion: 'Administradora de empresas',
      biografia: 'Política peruana, excongresista y presidenta de Fuerza Popular. Hija del expresidente Alberto Fujimori. Ha sido candidata presidencial en tres ocasiones (2011, 2016, 2021).',
      fotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Keiko_Fujimori_2.jpg',
      partidoId: partidosCreados.find(p => p.nombre === 'Fuerza Popular')?.id || '',
      posicionEncuesta: 1,
      porcentajeIntencion: 11.0,
      experienciaPolitica: 'Excongresista (2006-2011), candidata presidencial (2011, 2016, 2021), presidenta de Fuerza Popular',
      logrosDestacados: [
        'Líder política con mayor votación en segunda vuelta (2016, 2021)',
        'Presidenta del partido político más grande del país',
        'Excongresista con experiencia legislativa'
      ],
      controversias: [
        'Procesos judiciales por presunto lavado de activos',
        'Vinculación con caso Odebrecht',
        'Polarización política en el país'
      ],
      educacion: 'Boston University (Administración de Empresas), Columbia Business School',
      experienciaLaboral: 'Empresaria, Primera Dama del Perú (1994-2000)',
      eslogan: 'La fuerza de la experiencia',
      redesSociales: {
        twitter: 'https://twitter.com/KeikoFujimori',
        facebook: 'https://facebook.com/keikofujimori',
        instagram: 'https://instagram.com/keikofujimori'
      },
      sitioWeb: 'https://keikofujimori.pe',
    },
    {
      nombres: 'Rafael Bernardo',
      apellidos: 'López Aliaga Cazorla',
      nombreCompleto: 'Rafael Bernardo López Aliaga Cazorla',
      edad: 60,
      lugarNacimiento: 'Lima, Perú',
      profesion: 'Empresario y comunicador',
      biografia: 'Alcalde de Lima desde 2023, empresario y político peruano. Fundador de Renovación Popular y excandidato presidencial en 2021.',
      fotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Rafael_L%C3%B3pez_Aliaga_2024.jpg',
      partidoId: partidosCreados.find(p => p.nombre === 'Renovación Popular')?.id || '',
      posicionEncuesta: 2,
      porcentajeIntencion: 6.0,
      experienciaPolitica: 'Alcalde de Lima (2023-presente), candidato presidencial (2021), fundador de Renovación Popular',
      logrosDestacados: [
        'Alcalde de Lima metropolitana',
        'Empresario exitoso del sector construcción',
        'Líder del movimiento conservador peruano'
      ],
      controversias: [
        'Propuestas controvertidas sobre derechos humanos',
        'Declaraciones sobre pena de muerte',
        'Posiciones extremas en temas sociales'
      ],
      educacion: 'Universidad del Pacífico, estudios en España',
      experienciaLaboral: 'Empresario constructor, comunicador, conductor de radio y TV',
      eslogan: 'Lima no para',
      redesSociales: {
        twitter: 'https://twitter.com/rlopezaliaga1',
        facebook: 'https://facebook.com/rafaellopezaliaga',
        instagram: 'https://instagram.com/rafaellopezaliaga'
      },
      sitioWeb: 'https://rafaellopezaliaga.pe',
    },
    {
      nombres: 'Carlos Efraín',
      apellidos: 'Álvarez González',
      nombreCompleto: 'Carlos Efraín Álvarez González',
      edad: 61,
      lugarNacimiento: 'Lima, Perú',
      profesion: 'Comediante, imitador y comunicador',
      biografia: 'Conocido popularmente como "Álvarez", es un comediante peruano especializado en imitación política. Se ha lanzado como candidato presidencial representando a País para Todos.',
      fotoUrl: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3697141621832809472',
      partidoId: partidosCreados.find(p => p.nombre === 'País para Todos')?.id || '',
      posicionEncuesta: 3,
      porcentajeIntencion: 6.0,
      experienciaPolitica: 'Sin experiencia previa en cargos públicos. Candidatura como outsider político.',
      logrosDestacados: [
        'Comediante reconocido a nivel nacional',
        'Especialista en sátira política',
        'Gran popularidad en medios de comunicación'
      ],
      controversias: [
        'Falta de experiencia política',
        'Propuestas extremas sobre seguridad',
        'Transición del entretenimiento a la política'
      ],
      educacion: 'Estudios en comunicaciones',
      experienciaLaboral: 'Comediante profesional, conductor de TV, imitador',
      eslogan: 'El cambio que necesitamos',
      redesSociales: {
        facebook: 'https://facebook.com/carlosalvarez',
        instagram: 'https://instagram.com/carlosalvarez'
      },
    },
    {
      nombres: 'César Manuel',
      apellidos: 'Acuña Peralta',
      nombreCompleto: 'César Manuel Acuña Peralta',
      edad: 72,
      lugarNacimiento: 'Cajamarca, Perú',
      profesion: 'Empresario educativo',
      biografia: 'Gobernador regional de La Libertad desde 2023, fundador de universidades y empresario del sector educativo. Ha sido candidato presidencial en múltiples ocasiones.',
      fotoUrl: 'https://lookaside.instagram.com/seo/google_widget/crawler/?media_id=3697095866163133666',
      partidoId: partidosCreados.find(p => p.nombre === 'Alianza para el Progreso')?.id || '',
      posicionEncuesta: 4,
      porcentajeIntencion: 5.5,
      experienciaPolitica: 'Gobernador regional de La Libertad, alcalde de Trujillo, excandidato presidencial (2016, 2021)',
      logrosDestacados: [
        'Fundador de la Universidad César Vallejo',
        'Gobernador regional exitoso',
        'Empresario educativo reconocido'
      ],
      controversias: [
        'Cuestionamientos sobre calidad educativa de sus universidades',
        'Investigaciones por presunta corrupción',
        'Uso político de sus instituciones educativas'
      ],
      educacion: 'Universidad Nacional de Trujillo, estudios de posgrado',
      experienciaLaboral: 'Empresario educativo, fundador de universidades',
      eslogan: 'Educación y trabajo',
      redesSociales: {
        facebook: 'https://facebook.com/cesaracunaperalta',
        twitter: 'https://twitter.com/CesarAcunaP',
        instagram: 'https://instagram.com/cesaracuna'
      },
      sitioWeb: 'https://cesaracuna.pe',
    },
    {
      nombres: 'Alfonso José',
      apellidos: 'López Chau',
      nombreCompleto: 'Alfonso José López Chau',
      edad: 74,
      lugarNacimiento: 'Callao, Perú',
      profesion: 'Economista',
      biografia: 'Doctor en Economía, exrector de la Universidad Nacional de Ingeniería y exdirector del Banco Central de Reserva del Perú. Fundador del partido Ahora Nación.',
      fotoUrl: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=122173337084130844',
      partidoId: partidosCreados.find(p => p.nombre === 'Ahora Nación')?.id || '',
      posicionEncuesta: 5,
      porcentajeIntencion: 4.0,
      experienciaPolitica: 'Director del BCR (2006-2012), fundador de Ahora Nación (2023), exrector UNI',
      logrosDestacados: [
        'Exdirector del Banco Central de Reserva',
        'Exrector de la Universidad Nacional de Ingeniería',
        'Doctor en Economía con amplia experiencia académica'
      ],
      controversias: [
        'Poca experiencia en campaña política',
        'Candidatura académica vs. popular'
      ],
      educacion: 'Doctor en Economía por la UNAM (México), economista',
      experienciaLaboral: 'Catedrático, director del BCR, rector universitario',
      eslogan: 'Experiencia y conocimiento',
      redesSociales: {
        facebook: 'https://facebook.com/ahoranacion'
      },
    },
    {
      nombres: 'Vladimir',
      apellidos: 'Cerrón Rojas',
      nombreCompleto: 'Vladimir Cerrón Rojas',
      edad: 54,
      lugarNacimiento: 'Junín, Perú',
      profesion: 'Médico neurocirujano',
      biografia: 'Fundador y secretario general de Perú Libre, exgobernador regional de Junín. Actualmente prófugo de la justicia por múltiples procesos penales.',
      fotoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Vladimir_Cerr%C3%B3n_%28cropped%29.JPG',
      partidoId: partidosCreados.find(p => p.nombre === 'Perú Libre')?.id || '',
      posicionEncuesta: 6,
      porcentajeIntencion: 3.5,
      experienciaPolitica: 'Fundador de Perú Libre, exgobernador de Junín (2011-2014), candidato presidencial (2021)',
      logrosDestacados: [
        'Fundador de Perú Libre',
        'Exgobernador regional de Junín',
        'Líder de la izquierda peruana'
      ],
      controversias: [
        'Prófugo de la justicia',
        'Múltiples procesos penales por corrupción',
        'Impedimentos legales para participar'
      ],
      educacion: 'Universidad Nacional Mayor de San Marcos (Medicina), especialización en neurocirugía',
      experienciaLaboral: 'Médico neurocirujano, político',
      eslogan: 'No más pobres en un país rico',
      estado: 'suspendido',
      redesSociales: {
        facebook: 'https://facebook.com/vladimircerron',
        twitter: 'https://twitter.com/vladimirperuli'
      },
    },
  ];

  const candidatosCreados = await Promise.all(
    candidatos.map(async (candidato) => {
      return await prisma.candidato.create({
        data: candidato,
      });
    })
  );

  // 4. Crear propuestas de candidatos
  console.log('📋 Creando propuestas de candidatos...');

  // Obtener IDs de temas
  const economiaId = temasCreados.find(t => t.nombre === 'Economía')?.id || '';
  const educacionId = temasCreados.find(t => t.nombre === 'Educación')?.id || '';
  const saludId = temasCreados.find(t => t.nombre === 'Salud')?.id || '';
  const seguridadId = temasCreados.find(t => t.nombre === 'Seguridad')?.id || '';
  const corrupcionId = temasCreados.find(t => t.nombre === 'Corrupción')?.id || '';
  const infraestructuraId = temasCreados.find(t => t.nombre === 'Infraestructura')?.id || '';

  // Propuestas de Keiko Fujimori
  const keikoId = candidatosCreados.find(c => c.nombreCompleto === 'Keiko Sofía Fujimori Higuchi')?.id || '';
  if (keikoId) {
    const propuestasKeiko = [
      {
        titulo: 'Generación de 2 millones de empleos',
        descripcion: 'Programa masivo de generación de empleo mediante obras públicas y promoción del sector privado.',
        detalle: 'Crear 2 millones de empleos a través de inversión en infraestructura, obras públicas y promoción de la inversión privada en sectores productivos.',
        candidatoId: keikoId,
        temaId: economiaId,
        prioridad: 'alta',
        costo: '10,000 millones de soles',
        plazo: '5 años',
        fuente: 'Plan de Gobierno 2026-2031'
      },
      {
        titulo: 'Cero impuestos para mypes por dos años',
        descripcion: 'Eliminación total de impuestos para micro y pequeñas empresas durante dos años.',
        detalle: 'Política de incentivos tributarios para promover la formalización y crecimiento de las mypes durante los dos primeros años de gobierno.',
        candidatoId: keikoId,
        temaId: economiaId,
        prioridad: 'alta',
        plazo: '2 años',
        fuente: 'Propuesta electoral'
      },
      {
        titulo: 'Seguridad social universal',
        descripcion: 'Unificación del sistema de salud integrando EsSalud y Minsa.',
        detalle: 'Crear un sistema único de salud que integre EsSalud, SIS y Minsa para garantizar cobertura universal.',
        candidatoId: keikoId,
        temaId: saludId,
        prioridad: 'alta',
        costo: '1% del PBI anual adicional',
        plazo: '4 años',
        fuente: 'Plan de Gobierno'
      },
      {
        titulo: 'Programa Distrito Seguro',
        descripcion: 'Fortalecimiento de comisarías y seguridad ciudadana a nivel distrital.',
        detalle: 'Programa para fortalecer la presencia policial en cada distrito con nuevas comisarías y equipamiento moderno.',
        candidatoId: keikoId,
        temaId: seguridadId,
        prioridad: 'alta',
        plazo: '5 años',
        fuente: 'Propuesta de seguridad'
      }
    ];

    await Promise.all(propuestasKeiko.map(p => prisma.propuesta.create({ data: p })));
  }

  // Propuestas de Rafael López Aliaga
  const rafaelId = candidatosCreados.find(c => c.nombreCompleto === 'Rafael Bernardo López Aliaga Cazorla')?.id || '';
  if (rafaelId) {
    const propuestasRafael = [
      {
        titulo: 'Programa Hambre Cero',
        descripcion: 'Garantizar acceso alimentario para familias en extrema pobreza.',
        detalle: 'Programa social para erradicar el hambre mediante distribución de alimentos y programas de desarrollo rural.',
        candidatoId: rafaelId,
        temaId: economiaId,
        prioridad: 'alta',
        plazo: '2 años',
        fuente: 'Plan de Gobierno'
      },
      {
        titulo: 'Bachillerato Técnico y Universitario',
        descripcion: 'Reforma del sistema educativo con doble vía técnica y universitaria.',
        detalle: 'Implementar bachillerato técnico que permita acceso tanto al mercado laboral como a la educación superior.',
        candidatoId: rafaelId,
        temaId: educacionId,
        prioridad: 'alta',
        plazo: '4 años',
        fuente: 'Propuesta educativa'
      },
      {
        titulo: 'Mano dura contra la delincuencia',
        descripcion: 'Políticas de seguridad sin limitaciones para combatir el crimen.',
        detalle: 'Propuestas controversiales para dar herramientas policiales sin limitaciones y autodefensa vecinal organizada.',
        candidatoId: rafaelId,
        temaId: seguridadId,
        prioridad: 'alta',
        factibilidad: 'Controvertida por aspectos de derechos humanos',
        fuente: 'Propuestas de seguridad'
      }
    ];

    await Promise.all(propuestasRafael.map(p => prisma.propuesta.create({ data: p })));
  }

  // Propuestas de Carlos Álvarez
  const carlosId = candidatosCreados.find(c => c.nombreCompleto === 'Carlos Efraín Álvarez González')?.id || '';
  if (carlosId) {
    const propuestasCarlos = [
      {
        titulo: 'Pena de muerte para criminales en flagrancia',
        descripcion: 'Implementar pena de muerte para delincuentes capturados en flagrante delito.',
        detalle: 'Propuesta para modificar la constitución e implementar pena de muerte para casos de flagrancia criminal.',
        candidatoId: carlosId,
        temaId: seguridadId,
        prioridad: 'alta',
        factibilidad: 'Requiere reforma constitucional',
        fuente: 'Propuesta electoral'
      },
      {
        titulo: 'Expulsión de delincuentes extranjeros',
        descripcion: 'Deportación inmediata de criminales extranjeros.',
        detalle: 'Política de deportación automática para extranjeros que cometan delitos en territorio peruano.',
        candidatoId: carlosId,
        temaId: seguridadId,
        prioridad: 'alta',
        plazo: '6 meses',
        fuente: 'Plan de seguridad'
      },
      {
        titulo: 'Guerra contra la delincuencia',
        descripcion: 'Declarar guerra frontal contra la criminalidad siguiendo el modelo de El Salvador.',
        detalle: 'Implementar políticas de seguridad similares a las del presidente Nayib Bukele en El Salvador.',
        candidatoId: carlosId,
        temaId: seguridadId,
        prioridad: 'alta',
        factibilidad: 'Controvertida',
        fuente: 'Propuesta principal'
      }
    ];

    await Promise.all(propuestasCarlos.map(p => prisma.propuesta.create({ data: p })));
  }

  // Propuestas de César Acuña
  const cesarId = candidatosCreados.find(c => c.nombreCompleto === 'César Manuel Acuña Peralta')?.id || '';
  if (cesarId) {
    const propuestasCesar = [
      {
        titulo: 'Inversión de 6% del PBI en educación',
        descripcion: 'Incrementar la inversión educativa hasta el 6% del PBI nacional.',
        detalle: 'Quinquenio de la educación pública con inversión masiva en infraestructura, tecnología y formación docente.',
        candidatoId: cesarId,
        temaId: educacionId,
        prioridad: 'alta',
        costo: '6% del PBI anual',
        plazo: '5 años',
        fuente: 'Plan Educativo'
      },
      {
        titulo: 'Modelo asiático de desarrollo',
        descripcion: 'Implementar estrategias de desarrollo económico basadas en experiencias asiáticas exitosas.',
        detalle: 'Adoptar políticas de desarrollo económico inspiradas en países asiáticos con crecimiento sostenido.',
        candidatoId: cesarId,
        temaId: economiaId,
        prioridad: 'alta',
        plazo: '10 años',
        fuente: 'Propuesta económica'
      },
      {
        titulo: 'Inversión de US$100,000 millones en infraestructura',
        descripcion: 'Programa masivo de inversión en infraestructura nacional.',
        detalle: 'Plan decenal de inversión en carreteras, puertos, aeropuertos y servicios básicos.',
        candidatoId: cesarId,
        temaId: infraestructuraId,
        prioridad: 'alta',
        costo: 'US$100,000 millones',
        plazo: '10 años',
        fuente: 'Plan de infraestructura'
      }
    ];

    await Promise.all(propuestasCesar.map(p => prisma.propuesta.create({ data: p })));
  }

  // Propuestas de Alfonso López Chau
  const alfonsoId = candidatosCreados.find(c => c.nombreCompleto === 'Alfonso José López Chau')?.id || '';
  if (alfonsoId) {
    const propuestasAlfonso = [
      {
        titulo: 'Nueva Constitución manteniendo economía social de mercado',
        descripcion: 'Reforma constitucional preservando el modelo económico actual.',
        detalle: 'Propuesta de nueva constitución que mantenga la economía social de mercado pero modernice instituciones.',
        candidatoId: alfonsoId,
        temaId: corrupcionId,
        prioridad: 'alta',
        plazo: '4 años',
        factibilidad: 'Requiere referéndum',
        fuente: 'Propuesta institucional'
      },
      {
        titulo: 'Plan Marshall contra la anemia y abandono amazónico',
        descripcion: 'Programa masivo de inversión en salud y desarrollo amazónico.',
        detalle: 'Inversión masiva para combatir la anemia infantil y desarrollar la región amazónica.',
        candidatoId: alfonsoId,
        temaId: saludId,
        prioridad: 'alta',
        costo: 'No especificado',
        plazo: '5 años',
        fuente: 'Plan de desarrollo'
      },
      {
        titulo: 'Reorganización integral de la Policía Nacional',
        descripcion: 'Reforma completa de la institución policial.',
        detalle: 'Reestructuración de la PNP con reinstauración de la Policía de Investigaciones y mejora tecnológica.',
        candidatoId: alfonsoId,
        temaId: seguridadId,
        prioridad: 'media',
        plazo: '3 años',
        fuente: 'Plan de seguridad'
      }
    ];

    await Promise.all(propuestasAlfonso.map(p => prisma.propuesta.create({ data: p })));
  }

  // Propuestas de Vladimir Cerrón
  const vladimirId = candidatosCreados.find(c => c.nombreCompleto === 'Vladimir Cerrón Rojas')?.id || '';
  if (vladimirId) {
    const propuestasVladimir = [
      {
        titulo: 'Nacionalización de recursos estratégicos',
        descripcion: 'Nacionalizar sectores clave como minería, gas y telecomunicaciones.',
        detalle: 'Programa de nacionalización progresiva de sectores estratégicos para garantizar soberanía económica.',
        candidatoId: vladimirId,
        temaId: economiaId,
        prioridad: 'alta',
        factibilidad: 'Controvertida, requiere cambios legales mayores',
        fuente: 'Ideario del partido'
      },
      {
        titulo: 'Asamblea Constituyente',
        descripcion: 'Convocar asamblea constituyente para cambiar modelo económico.',
        detalle: 'Cambio radical de la constitución actual para implementar socialismo democrático peruano.',
        candidatoId: vladimirId,
        temaId: corrupcionId,
        prioridad: 'alta',
        factibilidad: 'Requiere mayoría legislativa',
        plazo: '2 años',
        fuente: 'Plan de gobierno'
      },
      {
        titulo: 'Expulsión de la DEA',
        descripcion: 'Retirar presencia de agencias antidrogas estadounidenses del país.',
        detalle: 'Política antidrogas sin injerencia externa, expulsando agencias estadounidenses del territorio.',
        candidatoId: vladimirId,
        temaId: seguridadId,
        prioridad: 'media',
        factibilidad: 'Controvertida internacionalmente',
        fuente: 'Propuesta de soberanía'
      }
    ];

    await Promise.all(propuestasVladimir.map(p => prisma.propuesta.create({ data: p })));
  }

  // 5. Crear algunas noticias de ejemplo
  console.log('📰 Creando noticias de ejemplo...');
  const noticias = [
    {
      titulo: 'Encuesta: Keiko Fujimori lidera intención de voto con 11%',
      resumen: 'Última encuesta de abril 2025 muestra a la líder de Fuerza Popular en primer lugar, seguida por López Aliaga con 6%.',
      contenido: 'La más reciente encuesta electoral muestra un panorama fragmentado en las preferencias electorales...',
      fuente: 'Ipsos-Perú21',
      fechaPublicacion: new Date('2024-12-15'),
      tags: ['encuestas', 'elecciones', 'política'],
      relevancia: 'alta',
      verificada: true,
      candidatosRelacionados: [keikoId, rafaelId],
    },
    {
      titulo: 'Debate sobre seguridad ciudadana marca campaña electoral',
      resumen: 'Candidatos presentan propuestas controversiales para combatir la alta criminalidad en el país.',
      contenido: 'La seguridad ciudadana se ha convertido en el tema central de la campaña electoral...',
      fuente: 'El Comercio',
      fechaPublicacion: new Date('2024-12-10'),
      tags: ['seguridad', 'debate', 'criminalidad'],
      relevancia: 'alta',
      verificada: true,
      candidatosRelacionados: [carlosId, rafaelId],
      temasRelacionados: [seguridadId],
    }
  ];

  await Promise.all(
    noticias.map(noticia => prisma.noticia.create({ data: noticia }))
  );

  console.log('✅ Seed completado exitosamente!');
  console.log(`Creados: ${temasCreados.length} temas, ${partidosCreados.length} partidos, ${candidatosCreados.length} candidatos`);
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
