export interface PlanillaAsistencia {
  id:           string;
  fecha:        Date;
  organizacion: Organizacion;
  asistentes:   Asistente[];
}

export interface Asistente {
  id:       string;
  hora:     string;
  nombre:   string;
  apellido: string;
  dni:      number;
}

export interface Organizacion {
  id:                 string;
  nombre:             string;
  logo:               string;
  descripcion:        string;
  telefono:           string;
  email:              string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
}
