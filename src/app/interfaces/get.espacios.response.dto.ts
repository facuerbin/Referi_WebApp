export interface GetEspacioResponse {
  data: Espacio[];
}

export interface Espacio {
  id:                 string;
  nombre:             string;
  capacidad:          number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
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
  fechaBaja:          null;
}
