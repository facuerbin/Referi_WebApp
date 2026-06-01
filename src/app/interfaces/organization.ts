export interface Organization {
  nombre:             string;
  direccion:          Direccion;
  logo:               string;
  descripcion:        string;
  telefono:           string;
  email:              string;
  tipo:               Tipo;
  fechaBaja:          null;
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
}

export interface Direccion {
  calle:     string;
  numero:    number;
  ciudad:    string;
  provincia: string;
  id:        string;
}

export interface Tipo {
  id:                 string;
  nombre:             string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
