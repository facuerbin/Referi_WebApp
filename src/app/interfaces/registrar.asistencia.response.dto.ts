export interface RegistrarAsistenciaResponse {
  data: Data;
}

export interface Data {
  hora:     Date;
  dni:      number;
  nombre:   string;
  apellido: string;
  planilla: Planilla;
  id:       string;
}

export interface Planilla {
  id:           string;
  fecha:        Date;
  organizacion: Organizacion;
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
