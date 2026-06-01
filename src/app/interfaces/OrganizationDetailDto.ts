export interface OrganizationDetailDto {
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
  espacios:           Tipo[];
  tipo:               Tipo;
}

export interface Direccion {
  id?:        string;
  calle:     string;
  numero:    number;
  ciudad:    string;
  provincia: string;
}

export interface Tipo {
  id:                 string;
  nombre:             string;
  capacidad?:         number;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
