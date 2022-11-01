export interface GetTarifasActividadDto {
  data: Tarifas[];
}

export interface Tarifas {
  id:                 string;
  nombre:             string;
  monto:              number;
  esOpcional:         boolean;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  organizacion:       Organizacion;
  frecuencia:         Frecuencia;
  actividad:          Actividad;
}

export interface Actividad {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  cupo:               number;
  imgUrl:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}

export interface Frecuencia {
  id:                 string;
  nombre:             string;
  cantDias:           number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
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
  fechaBaja:          null;
}
