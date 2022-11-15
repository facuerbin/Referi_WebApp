export interface ListPersonalOrganizacion {
  data: Personal[];
}

export interface Personal {
  id:                 string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
  organizacion:       Organizacion;
  rol:                Rol | null;
  personal:           Personal | null;
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

export interface Personal {
  id:                 string;
  email:              string;
  password:           string;
  nombre:             string;
  apellido:           string;
  dni:                number;
  telefono:           string;
  verificado:         boolean;
  fechaNacimiento:    Date;
  fotoPerfil:         string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}

export interface Rol {
  id:                 string;
  nombre:             string;
  descripcion:        string;
  fechaCreacion:      Date;
  fechaActualizacion: Date;
  fechaBaja:          null;
}
