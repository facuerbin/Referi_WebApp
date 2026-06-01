export interface GetFrecuencia {
  data: Frecuencia[];
}

export interface Frecuencia {
  id:                 string;
  nombre:             string;
  cantDias:           number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
