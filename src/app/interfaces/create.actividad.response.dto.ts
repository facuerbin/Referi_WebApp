export interface CreateActividadResponse {
  nombre:             string;
  descripcion:        string;
  organizacion:       Organizacion;
  tipo:               Tipo;
  cupo:               string;
  turno:              null;
  imgUrl:             string;
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
}

export interface Direccion {
  id:        string;
  calle:     string;
  numero:    number;
  ciudad:    string;
  provincia: string;
}

export interface Espacio {
  id:                 string;
  nombre:             string;
  capacidad:          number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}

export interface Tipo {
  id:            string;
  tipo:          string;
  imgUrl:        string;
  fechaCreacion: Date;
  fechaBaja:     null;
}
