export interface GetActividadesOrganizacion {
  data: Actividad[];
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
  tipo:               Tipo;
  turnos:             any[];
}

export interface Tipo {
  id:            string;
  tipo:          string;
  imgUrl:        string;
  fechaCreacion: Date;
  fechaBaja:     Date | null;
}
