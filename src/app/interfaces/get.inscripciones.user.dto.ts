export interface GetUserInscripciones {
  data: Inscripcion[];
}

export interface Inscripcion {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  turnoActividad:     TurnoActividad;
  organizacion:       Organizacion;
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

export interface TurnoActividad {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  actividad:          Actividad;
  horarios:           HorarioElement[];
}

export interface Actividad {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  cupo:               number;
  imgUrl:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
}

export interface HorarioElement {
  id:         string;
  fechaDesde: Date;
  espacio:    Espacio;
  horario:    HorarioHorario;
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
