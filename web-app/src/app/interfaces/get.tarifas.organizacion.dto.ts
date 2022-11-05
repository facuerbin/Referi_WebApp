export interface GetTarifasByOrganizacion {
  data: Tarifa[];
}

export interface Tarifa {
  id:                 string;
  nombre:             string;
  monto:              number;
  esOpcional:         boolean;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
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
  fechaBaja:          Date | null;
}

export interface Frecuencia {
  id:                 string;
  nombre:             string;
  cantDias:           number;
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
