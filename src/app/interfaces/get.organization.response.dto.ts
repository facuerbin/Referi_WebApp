export interface GetOrganizationResponseDto {
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
