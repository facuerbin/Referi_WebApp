export interface GetActividadDetail {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  cupo:               number;
  imgUrl:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  organizacion:       Organizacion;
  turnos:             Turno[];
  tipo:               Tipo;
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

export interface Tipo {
  id:            string;
  tipo:          string;
  imgUrl:        string;
  fechaCreacion: Date;
  fechaBaja:     Date | null;
}

export interface Turno {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  espacio:            Espacio;
  horarios:           Horario[];
  __tarifas__:        Tarifas[];
  inscriptos:         any[];
}

export interface Tarifas {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
}

export interface Espacio {
  id:                 string;
  nombre:             string;
  capacidad:          number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
}

export interface Horario {
  id:            string;
  diaSemana:     string;
  horaInicio:    number;
  minutosInicio: number;
  duracion:      number;
  fechaDesde:    Date;
}
