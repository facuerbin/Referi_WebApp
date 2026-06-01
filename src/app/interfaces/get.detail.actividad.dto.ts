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
  __tarifas__:        Tarifas[];
  turnos:             Turno[];
  tipo:               Tipo;
}

export interface Tarifas {
  id:                 string;
  nombre:             string;
  monto:              number;
  esOpcional:         boolean;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
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
  fechaBaja:     null;
}

export interface Turno {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  espacio:            null;
  horarios:           HorarioElement[];
  inscriptos:         any[];
}

export interface HorarioElement {
  id:         string;
  fechaDesde: Date;
  horario:    HorarioHorario;
  espacio:    Espacio;
}

export interface Espacio {
  id:                 string;
  nombre:             string;
  capacidad:          number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
}

export interface HorarioHorario {
  id:            string;
  diaSemana:     string;
  horaInicio:    number;
  minutosInicio: number;
  duracion:      number;
  fechaDesde:    Date;
}
