export interface GetTarifasOrganizacion {
  data: Tarifa[];
}

export interface Tarifa {
  id:                 string;
  nombre:             string;
  monto:              number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          Date | null;
  organizacion:       Organizacion;
  frecuencia:         Frecuencia;
  actividades:        Actividade[];
}

export interface Actividade {
  id:                 string;
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
