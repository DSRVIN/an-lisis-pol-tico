
export interface Candidato {
  id: string;
  nombreCompleto: string;
  apellidos: string;
  profesion: string;
  edad: number | null;
  fotoUrl: string | null;
  experienciaPolitica: string | null;
  logrosDestacados: string[];
  controversias: string[];
  educacion: string | null;
  partido: { 
    id: string;
    nombre: string; 
    colorPrimario: string | null;
  };
  propuestas: Array<{
    id: string;
    titulo: string;
    descripcion: string;
    tema: { 
      id: string;
      nombre: string;
      color: string | null;
    };
    prioridad: string;
  }>;
}

export interface Tema {
  id: string;
  nombre: string;
  color: string | null;
  descripcion?: string | null;
  icono?: string | null;
  orden?: number;
}

export interface Partido {
  id: string;
  nombre: string;
  siglas: string | null;
  ideologia: string;
  descripcion: string | null;
  logoUrl: string | null;
  colorPrimario: string | null;
  colorSecundario: string | null;
}

export interface Propuesta {
  id: string;
  titulo: string;
  descripcion: string;
  detalle: string | null;
  candidatoId: string;
  temaId: string;
  prioridad: string;
  candidato: {
    id: string;
    nombreCompleto: string;
    apellidos: string;
    partido: Partido;
  };
  tema: Tema;
}

export interface Noticia {
  id: string;
  titulo: string;
  resumen: string;
  fuente: string;
  url: string | null;
  fechaPublicacion: Date;
  imagenUrl: string | null;
  relevancia: string;
  tags: string[];
  candidatosRelacionados: string[];
  temasRelacionados: string[];
  createdAt: Date;
}
