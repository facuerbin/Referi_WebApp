export interface CreateEspacioResponse {
  nombre:             string;
  capacidad:         number;
  organizacion:      Organizacion;
  fechaBaja:          null;
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
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
  direccion:          Direccion;
  espacios:           Espacio[];
  tipo:               TipoOrg;
}

export interface Espacio {
  id:                 string;
  nombre:             string;
  capacidad:         number;
  fechaBaja:          null;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface TipoOrg {
  id:                 string;
  nombre:             string;
  fechaBaja:          null;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface Direccion {
  id:        string;
  calle:     string;
  numero:    number;
  ciudad:    string;
  provincia: string;
}
